# Prepara as animações dos exercícios geradas no Gemini.
#
#   powershell -ExecutionPolicy Bypass -File scripts/preparar-animacoes.ps1
#
# ENTRADA (arte-fonte/exercicios/, ver PROMPTS.md):
#   <id>.mp4                              vídeo do Veo (mp4, mov ou webm)
#   <id>-1.png, <id>-2.png, <id>-3.png   poses — só usadas sem vídeo
#   <id>-fases.png                        2 ou 3 fases numa imagem larga;
#                                         o script fatia e dispensa as poses
#
# A ordem de preferência é vídeo > fases > poses soltas.
#
# SAÍDA:
#   assets/exercicios/<id>.mp4     uma repetição em loop, sem som, sem marca
#   assets/exercicios/<id>-N.jpg   poses da lista, 480 px quadradas
#   assets/js/animacoes-lista.js   o que existe, para o app saber
#
# O QUE O SCRIPT FAZ COM O VÍDEO
# O Veo entrega 16:9 com som, uns 10 s, a estrela do Gemini no canto e,
# às vezes, a câmera se ajustando no começo e o boneco parado no fim. Aqui:
#   1. mede o movimento quadro a quadro e acha os trechos parados;
#   2. corta o loop entre dois deles — pausa curta no alto e uma
#      repetição inteira —, então o fim emenda no começo sem salto;
#   3. tira uma faixa igual dos dois lados, o que some com a marca e
#      mantém o boneco no centro;
#   4. tira do próprio vídeo as poses da lista: alto, meio e fundo do
#      movimento. Pedir poses separadas ao Gemini deu errado no primeiro
#      teste (as três saíram iguais); do vídeo, saem sempre certas.
#
# O que não mudou desde a última vez é pulado (use -Refazer para forçar).
# Precisa do ffmpeg (winget install Gyan.FFmpeg).

param(
  [string]$Fonte = 'arte-fonte/exercicios',
  [string]$Destino = 'assets/exercicios',
  [string]$Lista = 'assets/js/animacoes-lista.js',
  [int]$Lado = 480,
  [int]$LarguraVideo = 640,
  [double]$CorteLateral = 0.12,   # fração tirada de cada lado do vídeo
  [double]$Duracao = 8,           # teto quando não dá para achar o loop
  [switch]$Refazer
)

$ErrorActionPreference = 'Stop'

function AcharFfmpeg {
  $cmd = Get-Command ffmpeg -ErrorAction SilentlyContinue
  if ($cmd) { return $cmd.Source }
  $winget = Join-Path $env:LOCALAPPDATA 'Microsoft\WinGet\Packages'
  if (Test-Path $winget) {
    $achado = Get-ChildItem $winget -Recurse -Filter ffmpeg.exe -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($achado) { return $achado.FullName }
  }
  throw 'ffmpeg não encontrado. Instale com: winget install Gyan.FFmpeg'
}

$ffmpeg = AcharFfmpeg
# O ffprobe vem junto com o ffmpeg e serve para medir sem gerar arquivo.
$ffprobe = Join-Path (Split-Path $ffmpeg) 'ffprobe.exe'
New-Item -ItemType Directory -Force $Destino | Out-Null
if (-not (Test-Path $Fonte)) { New-Item -ItemType Directory -Force $Fonte | Out-Null }
$temporaria = Join-Path ([IO.Path]::GetTempPath()) 'bunnygym-animacoes'
New-Item -ItemType Directory -Force $temporaria | Out-Null

$quadrado = "crop='min(iw,ih)':'min(iw,ih)',scale=${Lado}:${Lado}:flags=lanczos"
$semMarca = "crop=iw*$(1 - 2 * $CorteLateral):ih"

function Desatualizado($entrada, $saida) {
  if ($Refazer -or -not (Test-Path $saida)) { return $true }
  return (Get-Item $entrada).LastWriteTime -gt (Get-Item $saida).LastWriteTime
}

function Rodar($argumentos) {
  $saida = & $ffmpeg -hide_banner -loglevel error -y @argumentos 2>&1
  if ($LASTEXITCODE -ne 0) { throw "ffmpeg falhou: $saida" }
}

function Texto([double]$n) { $n.ToString('0.00', [Globalization.CultureInfo]::InvariantCulture) }

# ── Análise de movimento ─────────────────────────────────
# Cópia minúscula em cinza, 10 quadros por segundo: 64x48 bastam para
# medir o quanto a imagem muda, e a conta roda em menos de um segundo.
$AMOSTRAS = 10
$PIXELS = 64 * 48

function Quadros($arquivo) {
  $raw = Join-Path $temporaria 'cinza.raw'
  Rodar @('-i', $arquivo, '-vf', "fps=$AMOSTRAS,scale=64:48,format=gray", '-f', 'rawvideo', $raw)
  return [IO.File]::ReadAllBytes($raw)
}

function Diferenca($bytes, $i, $j) {
  $soma = 0; $a = $i * $PIXELS; $b = $j * $PIXELS
  for ($k = 0; $k -lt $PIXELS; $k++) { $soma += [Math]::Abs([int]$bytes[$a + $k] - [int]$bytes[$b + $k]) }
  return $soma / $PIXELS
}

function DiferencaRapida($bytes, $i, $j) {
  $soma = 0; $a = $i * $PIXELS; $b = $j * $PIXELS
  for ($k = 0; $k -lt $PIXELS; $k += 4) { $soma += [Math]::Abs([int]$bytes[$a + $k] - [int]$bytes[$b + $k]) }
  return $soma * 4 / $PIXELS
}

<#
  Acha o loop e as poses. Devolve tempos em segundos:
  { inicio, fim, alto, meio, fundo, achou }
#>
function Analisar($arquivo) {
  $bytes = Quadros $arquivo
  $n = [int]($bytes.Length / $PIXELS)
  <# O limite do "parado" é proporcional ao próprio vídeo. Quanto a imagem
     muda entre dois quadros depende de quanto o corpo ocupa da tela e de
     quanto ele se mexe: no supino o pico passa de 7, na remada baixa —
     boneco pequeno, só os braços puxando — o pico é 0,7. Um limite fixo
     de 0,6 dava certo no primeiro e classificava o segundo como parado
     do começo ao fim. #>
  $movimentos = @(1..($n - 1) | ForEach-Object { Diferenca $bytes $_ ($_ - 1) })
  $pico = ($movimentos | Measure-Object -Maximum).Maximum
  $LIMIAR_PARADO = [Math]::Max(0.15, $pico * 0.25)
  $MINIMO = 4        # 0,4 s parado para contar como pausa

  # Trechos parados.
  $trechos = @(); $comeco = -1
  for ($i = 1; $i -lt $n; $i++) {
    $quieto = $movimentos[$i - 1] -lt $LIMIAR_PARADO
    if ($quieto -and $comeco -lt 0) { $comeco = $i - 1 }
    if ((-not $quieto -or $i -eq $n - 1) -and $comeco -ge 0) {
      $fimTrecho = if ($quieto) { $i } else { $i - 1 }
      if ($fimTrecho - $comeco + 1 -ge $MINIMO) { $trechos += ,@($comeco, $fimTrecho) }
      $comeco = -1
    }
  }

  # Dois trechos parados na MESMA pose, com movimento entre eles = uma
  # repetição inteira. A mesma pose importa: no crossover o Veo para com
  # os braços abertos e também com eles fechados, e emendar uma pausa na
  # outra dava meia repetição e um salto na volta do loop.
  <# Entre todos os pares que servem, vale o mais curto: é uma repetição.
     Pegar o primeiro par que aparece levava o supino inclinado a emendar
     a primeira pausa com a última e repetir o movimento duas vezes. #>
  $escolhido = $null
  for ($t = 0; $t -lt $trechos.Count - 1; $t++) {
   for ($u = $t + 1; $u -lt $trechos.Count; $u++) {
    $a = $trechos[$t]; $b = $trechos[$u]
    if ($b[0] - $a[1] -lt 5) { continue }
    if ($escolhido -and ($b[0] - $a[1]) -ge $escolhido.duracao) { continue }
    if ((Diferenca $bytes $a[1] $b[0]) -ge 2.5) { continue }

    # Entre as duas pausas tem que haver movimento de verdade, senão é o
    # boneco parado em dois momentos do mesmo descanso.
    $ref = $a[1]
    $fundo = $ref; $maior = 0
    for ($i = $a[1]; $i -le $b[0]; $i++) {
      $d = Diferenca $bytes $i $ref
      if ($d -gt $maior) { $maior = $d; $fundo = $i }
    }
    if ($maior -lt $LIMIAR_PARADO * 3) { continue }

    $escolhido = @{ duracao = $b[0] - $a[1]; a = $a; b = $b; fundo = $fundo }
   }
  }

  if ($escolhido) {
    $a = $escolhido.a; $b = $escolhido.b
    $ini = [Math]::Max($a[0], $a[1] - 6)          # pausa de até 0,6 s no alto
    $fim = $b[0] + 1
    # Meio pelo tempo, não pela distância: a distância cresce rápido no
    # começo da descida e escolhia um quadro quase igual ao do alto.
    $meio = [int][Math]::Round(($a[1] + $escolhido.fundo) / 2)
    return @{ achou = $true; inicio = $ini / $AMOSTRAS; fim = $fim / $AMOSTRAS
              alto = $a[1] / $AMOSTRAS; meio = $meio / $AMOSTRAS; fundo = $escolhido.fundo / $AMOSTRAS }
  }

  # Sem pausas (movimento contínuo, como no crucifixo): procura dois quadros
  # quase iguais com uma repetição inteira entre eles. Os 2 primeiros
  # segundos ficam de fora — é quando o Veo ainda ajusta a câmera.
  # A busca compara 1 a cada 4 pixels: são milhares de pares, e a precisão
  # sobra para dizer se duas poses são a mesma.
  $melhor = $null; $custoMelhor = [double]::MaxValue
  for ($i = 20; $i -lt $n - 15; $i++) {
    for ($j = $i + 15; $j -le [Math]::Min($n - 1, $i + 45); $j++) {
      $custo = DiferencaRapida $bytes $i $j
      if ($custo -ge $custoMelhor) { continue }
      # Tem que haver movimento no meio, senão é só um trecho parado.
      $pico = 0
      for ($k = $i + 3; $k -lt $j; $k += 3) { $pico = [Math]::Max($pico, (DiferencaRapida $bytes $k $i)) }
      if ($pico -lt 6) { continue }
      $custoMelhor = $custo; $melhor = @($i, $j)
    }
  }
  if ($melhor -and $custoMelhor -lt 2.5) {
    $i = $melhor[0]; $j = $melhor[1]
    $fundo = $i; $maior = 0
    for ($k = $i; $k -le $j; $k++) {
      $d = Diferenca $bytes $k $i
      if ($d -gt $maior) { $maior = $d; $fundo = $k }
    }
    $meio = [int][Math]::Round(($i + $fundo) / 2)
    return @{ achou = $true; inicio = $i / $AMOSTRAS; fim = $j / $AMOSTRAS
              alto = $i / $AMOSTRAS; meio = $meio / $AMOSTRAS; fundo = $fundo / $AMOSTRAS }
  }

  # Nada disso: o vídeo inteiro até o teto, e poses por distância do
  # primeiro quadro.
  $limite = [Math]::Min($n - 1, [int]($Duracao * $AMOSTRAS))
  $fundo = 0; $maior = 0
  for ($i = 0; $i -le $limite; $i++) {
    $d = Diferenca $bytes $i 0
    if ($d -gt $maior) { $maior = $d; $fundo = $i }
  }
  return @{ achou = $false; inicio = 0; fim = $limite / $AMOSTRAS
            alto = 0; meio = [int]($fundo / 2) / $AMOSTRAS; fundo = $fundo / $AMOSTRAS }
}

$arquivos = Get-ChildItem $Fonte -File | Where-Object { -not $_.Name.StartsWith('_') }
$comVideo = @{}
$feitos = 0

# ── Vídeos ───────────────────────────────────────────────
foreach ($a in $arquivos) {
  if ($a.Name -notmatch '^(?<id>[a-z0-9-]+)\.(mp4|mov|webm)$') { continue }
  $id = $Matches.id
  $comVideo[$id] = $true
  $saida = Join-Path $Destino "$id.mp4"
  if (-not (Desatualizado $a.FullName $saida)) { continue }

  $m = Analisar $a.FullName
  Write-Host ("vídeo  {0}: loop {1}s a {2}s{3}" -f $id, (Texto $m.inicio), (Texto $m.fim), $(if ($m.achou) { '' } else { ' (sem pausa clara — vídeo inteiro)' }))

  Rodar @('-ss', (Texto $m.inicio), '-to', (Texto $m.fim), '-i', $a.FullName, '-an',
    '-vf', "$semMarca,scale=${LarguraVideo}:-2:flags=lanczos,fps=24",
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '28',
    '-pix_fmt', 'yuv420p', '-profile:v', 'main', '-movflags', '+faststart', $saida)
  Write-Host ("       {0} KB" -f [Math]::Round((Get-Item $saida).Length / 1024))

  # Poses da lista, na ordem que o app espera: 1 alto, 2 fundo, 3 meio.
  $poses = @(@(1, $m.alto), @(2, $m.fundo), @(3, $m.meio))
  foreach ($p in $poses) {
    Rodar @('-ss', (Texto $p[1]), '-i', $a.FullName, '-frames:v', '1',
      '-vf', "$semMarca,$quadrado", '-q:v', '4', (Join-Path $Destino "$id-$($p[0]).jpg"))
  }
  Write-Host ("       poses do vídeo: alto {0}s, meio {1}s, fundo {2}s" -f (Texto $m.alto), (Texto $m.meio), (Texto $m.fundo))
  $feitos++
}

<# ── Fases numa imagem só ─────────────────────────────────
   <id>-fases.png traz 2 ou 3 momentos do movimento lado a lado, numa
   imagem larga. É o plano B para quando o Gemini, ao editar a pose numa
   conversa, devolve a mesma posição de novo — nascendo juntas, as fases
   são obrigatoriamente diferentes. A ordem na imagem é início, meio, fim;
   no app a ordem dos arquivos é início (1), fim (2), meio (3). #>
$comFases = @{}
foreach ($a in $arquivos) {
  if ($a.Name -notmatch '^(?<id>[a-z0-9-]+)-fases\.(png|jpe?g|webp)$') { continue }
  $id = $Matches.id
  if ($comVideo[$id]) { continue }
  $comFases[$id] = $true
  $primeira = Join-Path $Destino "$id-1.jpg"
  if (-not (Desatualizado $a.FullName $primeira)) { continue }

  $medida = (& $ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 $a.FullName) -split ','
  $largura = [int]$medida[0]; $altura = [int]$medida[1]
  $partes = [Math]::Max(2, [Math]::Min(3, [int][Math]::Round($largura / $altura)))
  # Na imagem: início, meio, fim. Nos arquivos: 1 início, 2 fim, 3 meio.
  $nomes = if ($partes -eq 3) { @(1, 3, 2) } else { @(1, 2) }

  Get-ChildItem $Destino -File | Where-Object { $_.Name -match "^$([regex]::Escape($id))-\d+\.jpg$" } | Remove-Item
  for ($p = 0; $p -lt $partes; $p++) {
    $recorte = "crop=iw/${partes}:ih:x=iw*$p/${partes}:y=0"
    Rodar @('-i', $a.FullName, '-vf', "$recorte,$quadrado", '-q:v', '4', (Join-Path $Destino "$id-$($nomes[$p]).jpg"))
  }
  Write-Host ("fases  {0}: {1} partes de {2}x{3}" -f $id, $partes, $largura, $altura)
  $feitos++
}

# ── Poses soltas (exercício sem vídeo) ───────────────────
$poseGrupos = @{}
foreach ($a in $arquivos) {
  if ($a.Name -notmatch '^(?<id>[a-z0-9-]+)-(?<n>\d+)\.(png|jpe?g|webp)$') { continue }
  $id = $Matches.id
  if ($comVideo[$id] -or $comFases[$id]) { continue }
  if (-not $poseGrupos[$id]) { $poseGrupos[$id] = @() }
  $poseGrupos[$id] += [pscustomobject]@{ n = [int]$Matches.n; arquivo = $a.FullName }
}

foreach ($id in $poseGrupos.Keys) {
  $ordenadas = @($poseGrupos[$id] | Sort-Object n)
  $primeira = Join-Path $Destino "$id-1.jpg"
  # Mudou se há pose mais nova que a saída, ou se há mais quadros gerados do
  # que poses na fonte — sinal de que alguma pose foi tirada da pasta.
  $geradas = @(Get-ChildItem $Destino -File | Where-Object { $_.Name -match "^$([regex]::Escape($id))-\d+\.jpg$" }).Count
  $mudou = $Refazer -or -not (Test-Path $primeira) -or $geradas -gt $ordenadas.Count -or
    @($ordenadas | Where-Object { (Get-Item $_.arquivo).LastWriteTime -gt (Get-Item $primeira).LastWriteTime }).Count -gt 0
  if (-not $mudou) { continue }

  # Pose quase igual a uma já aceita não entra: repetir o mesmo quadro na
  # sequência só faz a animação travar naquela posição.
  $raw = Join-Path $temporaria 'poses.raw'
  $entradas = @(); foreach ($p in $ordenadas) { $entradas += @('-i', $p.arquivo) }
  $filtro = (0..($ordenadas.Count - 1) | ForEach-Object { "[$($_):v]scale=64:48,format=gray[v$_]" }) -join ';'
  $filtro += ';' + ((0..($ordenadas.Count - 1) | ForEach-Object { "[v$_]" }) -join '') + "concat=n=$($ordenadas.Count):v=1:a=0"
  Rodar ($entradas + @('-filter_complex', $filtro, '-f', 'rawvideo', $raw))
  $bytes = [IO.File]::ReadAllBytes($raw)

  <# O limite é proporcional ao próprio exercício, não um número fixo.
     No supino inclinado o corpo inteiro se mexe e as poses diferentes dão
     14, enquanto a repetida dá 0,5. No tríceps pulley só o antebraço se
     move: a maior diferença é 3,2 e a pose final dá 2,2 — com limite fixo
     de 3 ela era descartada como repetida, justamente a que importa. #>
  $maiorDiferenca = 0
  for ($i = 0; $i -lt $ordenadas.Count; $i++) {
    for ($j = $i + 1; $j -lt $ordenadas.Count; $j++) {
      $maiorDiferenca = [Math]::Max($maiorDiferenca, (Diferenca $bytes $i $j))
    }
  }
  $limiteRepetida = [Math]::Max(0.8, $maiorDiferenca * 0.35)

  $mantidas = @(0)
  for ($i = 1; $i -lt $ordenadas.Count; $i++) {
    $repetida = $null
    foreach ($k in $mantidas) {
      $d = Diferenca $bytes $i $k
      if ($d -lt $limiteRepetida) { $repetida = @($k, $d); break }
    }
    if ($repetida) {
      Write-Host ("ATENÇÃO {0}: a pose {1} é quase igual à pose {2} (diferença {3}) e ficou de fora." -f $id, $ordenadas[$i].n, $ordenadas[$repetida[0]].n, (Texto $repetida[1]))
    } else {
      $mantidas += $i
    }
  }
  if ($mantidas.Count -lt 2) {
    Write-Host "ATENÇÃO ${id}: só há uma pose diferente — a animação vai ficar parada. Refaça a pose final."
  }

  # Cor do fundo, lida no canto: completa o quadrado quando a imagem não é
  # quadrada. Cortar no centro tiraria anilha e pé de exercício deitado.
  $rgb = Join-Path $temporaria 'fundo.raw'
  Rodar @('-i', $ordenadas[0].arquivo, '-vf', 'crop=24:24:4:4,scale=1:1', '-f', 'rawvideo', '-pix_fmt', 'rgb24', $rgb)
  $c = [IO.File]::ReadAllBytes($rgb)
  $fundo = '0x{0:X2}{1:X2}{2:X2}' -f $c[0], $c[1], $c[2]
  $caber = "scale=${Lado}:${Lado}:force_original_aspect_ratio=decrease:flags=lanczos,pad=${Lado}:${Lado}:(ow-iw)/2:(oh-ih)/2:color=$fundo"

  Get-ChildItem $Destino -File | Where-Object { $_.Name -match "^$([regex]::Escape($id))-\d+\.jpg$" } | Remove-Item
  for ($i = 0; $i -lt $mantidas.Count; $i++) {
    $origem = $ordenadas[$mantidas[$i]]
    $saida = Join-Path $Destino "$id-$($i + 1).jpg"
    Rodar @('-i', $origem.arquivo, '-vf', $caber, '-q:v', '4', $saida)
    Write-Host ("pose   {0}-{1} (da pose {2}): {3} KB" -f $id, ($i + 1), $origem.n, [Math]::Round((Get-Item $saida).Length / 1024))
  }
  $feitos++
}

# ── Lista para o app ─────────────────────────────────────
$registros = @{}
Get-ChildItem $Destino -File | ForEach-Object {
  if ($_.Name -match '^(?<id>[a-z0-9-]+)-(?<n>\d+)\.jpg$') {
    if (-not $registros[$Matches.id]) { $registros[$Matches.id] = @{ quadros = 0; video = $false } }
  } elseif ($_.Name -match '^(?<id>[a-z0-9-]+)\.mp4$') {
    if (-not $registros[$Matches.id]) { $registros[$Matches.id] = @{ quadros = 0; video = $false } }
    $registros[$Matches.id].video = $true
  }
}
foreach ($id in @($registros.Keys)) {
  # Conta só quadros em sequência: um -3 sem -2 não entra.
  $n = 0
  while (Test-Path (Join-Path $Destino ("$id-" + ($n + 1) + '.jpg'))) { $n++ }
  $registros[$id].quadros = $n
}

$linhas = $registros.Keys | Sort-Object | ForEach-Object {
  $r = $registros[$_]
  "  '$_': { quadros: $($r.quadros), video: $(if ($r.video) { 'true' } else { 'false' }) }"
}
$texto = "/* Gerado por scripts/preparar-animacoes.ps1 — não editar à mão.`n" +
  "   Animações disponíveis em assets/exercicios/. */`n" +
  "Animacoes.registrar({`n" + (($linhas) -join ",`n") + "`n});`n"
$caminhoLista = if ([IO.Path]::IsPathRooted($Lista)) { $Lista } else { Join-Path (Get-Location).Path $Lista }
[IO.File]::WriteAllText($caminhoLista, $texto, (New-Object System.Text.UTF8Encoding $false))

Write-Host ("pronto: {0} exercício(s) processado(s), {1} com animação no app" -f $feitos, $registros.Count)
