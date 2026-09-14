# Recorta a arte de cada treino a partir dos renders em arte-fonte/.
#
# Roda no próprio Windows, sem Node nem Python: usa o System.Drawing que
# já vem com o sistema.
#
#   powershell -ExecutionPolicy Bypass -File scripts/recortar-treinos.ps1
#
# COMO O QUADRO É ESCOLHIDO
# O enquadramento não é escrito à mão. O primeiro recorte usava
# coordenadas fixas, e o resultado cortava braço e deixava a figura fora
# do centro: cada render tem o boneco num lugar e numa pose. Agora o
# script acha a figura sozinho, tratando como boneco tudo que foge da cor
# do fundo lilás. A partir dessa caixa:
#   - a largura inteira da figura sempre cabe, com folga dos dois lados;
#   - a altura vai do topo da cabeça até `corte` (tronco) ou até os pés;
#   - o quadro é centralizado nesse trecho.
# O que o quadro pegar fora da imagem, ou do lado da outra figura quando o
# render traz duas, é pintado com a cor do fundo em vez de cortado.
#
# Para trocar a arte de um treino: ponha o render em arte-fonte/ com o id
# do treino, confira a linha dele na tabela e rode de novo.
#
# Atenção ao editar: variável em PowerShell não diferencia maiúsculas,
# então $LADO e $lado são a mesma.

param([string]$Destino = 'assets/treinos')

Add-Type -AssemblyName System.Drawing

$LADO = 224        # triplo do quadro de 72 px do cartão
$QUALIDADE = 90
$FOLGA = 1.12      # respiro em volta da figura
$LIMIAR = 42       # distância de cor a partir da qual o pixel é figura

# zona: faixa horizontal (px do render) onde está a figura escolhida.
#       Renders com frente e costas lado a lado têm uma em cada metade.
# corte: até onde vai a altura, em px do render. 0 = até os pés.
# folga: respiro em volta da figura (padrão $FOLGA); corpo inteiro usa
#        menos, porque a figura alta e estreita já sobra dos lados.
# tampas: retângulos pintados com o fundo antes de tudo, para apagar
#         defeito da geração (ex.: mão solta flutuando).
$treinos = @(
  @{ id = 'peito-triceps';     zona = @(0, 2048);    corte = 1480 }  # figura única
  @{ id = 'costas-biceps';     zona = @(0, 1010);    corte = 1090 }  # variação da esquerda
  @{ id = 'perna';             zona = @(0, 1100);    corte = 0; folga = 1.05 }     # frente, corpo inteiro
  @{ id = 'superiores';        zona = @(0, 1050);    corte = 1180 }  # frente
  @{ id = 'empurrar';          zona = @(0, 1100);    corte = 1080;   # frente
     tampas = @(@{ x = 717; y = 330; largura = 215; altura = 165 }) }
  @{ id = 'puxar';             zona = @(1000, 2048); corte = 1080 }  # costas: dorsais e trapézio
  @{ id = 'ombro-trapezio';    zona = @(1070, 2048); corte = 1080 }  # costas: trapézio
  @{ id = 'bracos';            zona = @(0, 1024);    corte = 1130 }  # frente
  @{ id = 'gluteos-posterior'; zona = @(1000, 2048); corte = 0; folga = 1.05 }     # costas, corpo inteiro
  @{ id = 'corpo-inteiro';     zona = @(0, 2048);    corte = 0; folga = 1.05 }     # figura única
)

function Tampar($imagem, $tampa) {
  # Cada linha copia a cor do fundo logo à direita: o fundo tem degradê
  # vertical suave, e uma cor única deixaria a marca da tampa.
  $referencia = [Math]::Min($imagem.Width - 1, $tampa.x + $tampa.largura + 12)
  for ($linha = $tampa.y; $linha -lt ($tampa.y + $tampa.altura); $linha++) {
    $cor = $imagem.GetPixel($referencia, $linha)
    for ($coluna = $tampa.x; $coluna -lt ($tampa.x + $tampa.largura); $coluna++) {
      $imagem.SetPixel($coluna, $linha, $cor)
    }
  }
}

# Acha a caixa da figura numa cópia reduzida (1/8): o render tem 4 milhões
# de pixels, e varrer isso em PowerShell levaria minutos. A reduzida tem
# precisão de 8 px, de sobra para enquadrar.
function Medir($imagem, $zona, $corte) {
  $F = 8
  $w = [int]($imagem.Width / $F); $h = [int]($imagem.Height / $F)
  $mini = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $g = [System.Drawing.Graphics]::FromImage($mini)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBilinear
  $g.DrawImage($imagem, 0, 0, $w, $h)
  $g.Dispose()

  $dados = $mini.LockBits((New-Object System.Drawing.Rectangle 0, 0, $w, $h),
    [System.Drawing.Imaging.ImageLockMode]::ReadOnly,
    [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $passo = $dados.Stride
  $bytes = New-Object byte[] ($passo * $h)
  [System.Runtime.InteropServices.Marshal]::Copy($dados.Scan0, $bytes, 0, $bytes.Length)
  $mini.UnlockBits($dados); $mini.Dispose()

  # Cor do fundo: média dos quatro cantos da reduzida.
  $soma = @(0, 0, 0); $n = 0
  foreach ($cy in @(2, ($h - 3))) { foreach ($cx in @(2, ($w - 3))) {
    $i = $cy * $passo + $cx * 3
    $soma[0] += $bytes[$i + 2]; $soma[1] += $bytes[$i + 1]; $soma[2] += $bytes[$i]; $n++
  } }
  $fr = $soma[0] / $n; $fg = $soma[1] / $n; $fb = $soma[2] / $n

  # A redução escurece a borda de 1 px da cópia. Sem descontar isso, a
  # moldura escura conta como figura e a caixa vira a imagem inteira.
  $x1 = [Math]::Max(2, [int]($zona[0] / $F)); $x2 = [int]([Math]::Min($w - 2, $zona[1] / $F))
  $limiteY = if ($corte -gt 0) { [int]($corte / $F) } else { $h - 2 }
  $minX = $w; $maxX = -1; $minY = $h; $maxY = -1
  $l2 = $LIMIAR * $LIMIAR

  for ($y = 2; $y -lt $limiteY; $y++) {
    $base = $y * $passo
    for ($x = $x1; $x -lt $x2; $x++) {
      $i = $base + $x * 3
      $dr = $bytes[$i + 2] - $fr; $dg = $bytes[$i + 1] - $fg; $db = $bytes[$i] - $fb
      if (($dr * $dr + $dg * $dg + $db * $db) -gt $l2) {
        if ($x -lt $minX) { $minX = $x }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }

  return @{
    x1 = $minX * $F; x2 = ($maxX + 1) * $F
    topo = $minY * $F
    base = if ($corte -gt 0) { $corte } else { ($maxY + 1) * $F }
    fundo = [System.Drawing.Color]::FromArgb([int]$fr, [int]$fg, [int]$fb)
  }
}

$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' }
$parametros = New-Object System.Drawing.Imaging.EncoderParameters 1
$parametros.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, [long]$QUALIDADE)

New-Item -ItemType Directory -Force $Destino | Out-Null

foreach ($t in $treinos) {
  $fonte = Join-Path 'arte-fonte' "$($t.id).jpg"
  if (-not (Test-Path $fonte)) { Write-Host "sem render: $fonte"; continue }

  $original = [System.Drawing.Bitmap]::FromFile((Resolve-Path $fonte))
  $imagem = New-Object System.Drawing.Bitmap $original
  $original.Dispose()

  foreach ($tampa in @($t.tampas)) { if ($tampa) { Tampar $imagem $tampa } }

  $m = Medir $imagem $t.zona $t.corte
  $largura = $m.x2 - $m.x1
  $altura = $m.base - $m.topo
  $respiro = if ($t.folga) { $t.folga } else { $FOLGA }
  $quadro = [Math]::Max($largura, $altura) * $respiro
  $sx = ($m.x1 + $m.x2) / 2 - $quadro / 2
  $sy = ($m.topo + $m.base) / 2 - $quadro / 2

  # Parte do quadro que existe de fato: dentro da imagem e da zona.
  $ix1 = [Math]::Max($sx, $t.zona[0]); $ix2 = [Math]::Min($sx + $quadro, [Math]::Min($t.zona[1], $imagem.Width))
  $iy1 = [Math]::Max($sy, 0);          $iy2 = [Math]::Min($sy + $quadro, $imagem.Height)
  $escala = $LADO / $quadro

  $saida = New-Object System.Drawing.Bitmap $LADO, $LADO
  $g = [System.Drawing.Graphics]::FromImage($saida)
  $g.Clear($m.fundo)

  # Sobra dos lados: cada linha pintada com a cor do fundo naquela altura,
  # lida numa coluna logo dentro da beirada. O fundo escurece de cima para
  # baixo, e pintar tudo com a cor dos cantos deixava uma linha visível
  # onde a imagem de verdade começa.
  $dx1 = ($ix1 - $sx) * $escala; $dx2 = ($ix2 - $sx) * $escala
  if ($dx1 -gt 0.5 -or $dx2 -lt ($LADO - 0.5)) {
    $colunaEsq = [int]$ix1 + 4; $colunaDir = [int]$ix2 - 5
    $corEsq = $m.fundo; $corDir = $m.fundo
    for ($linha = 0; $linha -lt $LADO; $linha++) {
      $yFonte = [int]($sy + ($linha + 0.5) / $escala)
      if ($yFonte -lt 0 -or $yFonte -ge $imagem.Height) { continue }
      # Só aceita a amostra se ela for fundo; se a beirada passa por um
      # braço, repete a cor da linha anterior.
      foreach ($beira in @('esq', 'dir')) {
        $col = if ($beira -eq 'esq') { $colunaEsq } else { $colunaDir }
        $px = $imagem.GetPixel($col, $yFonte)
        $d = [Math]::Pow($px.R - $m.fundo.R, 2) + [Math]::Pow($px.G - $m.fundo.G, 2) + [Math]::Pow($px.B - $m.fundo.B, 2)
        if ($d -lt ($LIMIAR * $LIMIAR)) { if ($beira -eq 'esq') { $corEsq = $px } else { $corDir = $px } }
      }
      if ($dx1 -gt 0.5) {
        $pincel = New-Object System.Drawing.SolidBrush $corEsq
        $g.FillRectangle($pincel, 0, $linha, [Math]::Ceiling($dx1) + 1, 1); $pincel.Dispose()
      }
      if ($dx2 -lt ($LADO - 0.5)) {
        $pincel = New-Object System.Drawing.SolidBrush $corDir
        $g.FillRectangle($pincel, [Math]::Floor($dx2) - 1, $linha, $LADO, 1); $pincel.Dispose()
      }
    }
  }
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  # Espelhar a borda ao amostrar: sem isso a reamostragem mistura o pixel
  # da beirada com transparente, e surge um fio claro onde a imagem
  # encontra o fundo pintado ao lado.
  $atributos = New-Object System.Drawing.Imaging.ImageAttributes
  $atributos.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY)
  $ex = [Math]::Round(($ix1 - $sx) * $escala); $ey = [Math]::Round(($iy1 - $sy) * $escala)
  $ew = [int]([Math]::Round(($ix2 - $sx) * $escala) - $ex); $eh = [int]([Math]::Round(($iy2 - $sy) * $escala) - $ey)
  $area = New-Object System.Drawing.Rectangle ([int]$ex), ([int]$ey), $ew, $eh
  $g.DrawImage($imagem, $area, [single]$ix1, [single]$iy1, [single]($ix2 - $ix1), [single]($iy2 - $iy1),
    [System.Drawing.GraphicsUnit]::Pixel, $atributos)
  $atributos.Dispose()

  $arquivo = Join-Path (Resolve-Path $Destino) "$($t.id).jpg"
  $saida.Save($arquivo, $jpeg, $parametros)
  Write-Host ("{0}: figura {1}x{2} em ({3},{4}), quadro {5} px, {6} KB" -f $t.id, $largura, $altura, $m.x1, $m.topo, [int]$quadro, [Math]::Round((Get-Item $arquivo).Length / 1024))

  $g.Dispose(); $saida.Dispose(); $imagem.Dispose()
}
