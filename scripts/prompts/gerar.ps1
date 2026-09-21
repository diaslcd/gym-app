param([string]$Saida)
$aqui = Split-Path -Parent $MyInvocation.MyCommand.Path
$utf8 = New-Object System.Text.UTF8Encoding $false
$dados = [IO.File]::ReadAllText((Join-Path $aqui 'dados.json'), $utf8) | ConvertFrom-Json
$cabecalho = [IO.File]::ReadAllText((Join-Path $aqui 'cabecalho.md'), $utf8)
$modelo = [IO.File]::ReadAllText((Join-Path $aqui 'exercicio.md'), $utf8)

# Progresso já marcado no arquivo atual: regerar não pode apagar o que
# foi feito. Cada linha da lista é guardada pelo id do exercício.
$progresso = @{}
if (Test-Path $Saida) {
  foreach ($linha in [IO.File]::ReadAllLines($Saida, $utf8)) {
    if ($linha -match '^- \[.\] \d+\..*`(?<id>[a-z0-9-]+)`') { $progresso[$Matches.id] = $linha }
  }
}

$corpo = New-Object System.Text.StringBuilder
$lista = New-Object System.Text.StringBuilder
$num = 0
foreach ($d in $dados) {
  if ($d.treino) {
    [void]$corpo.AppendLine("`n## " + $d.treino)
    [void]$lista.AppendLine("`n**" + $d.treino + "**`n")
    continue
  }
  $num++
  $veo = if ($d.veo) { $d.veo } else { 'parte da posição da imagem, vai até a fase final (' + $d.final + ') e volta devagar à posição inicial' }
  $naopinte = if ($d.naopinte) { "
NÃO PINTE: " + $d.naopinte + '.' } else { '' }
  $correcao = if ($d.correcao) { $d.correcao } else { 'A posição não está certa. O correto é: ' + $d.inicial + '. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.' }
  $reuso = if ($d.reuso) { ' · também usado por `' + $d.reuso + '`' } else { '' }
  $bloco = $modelo.
    Replace('{{NUM}}', [string]$num).
    Replace('{{NOME}}', $d.nome).
    Replace('{{NOMEMAIUSC}}', $d.nome.ToUpper()).
    Replace('{{ID}}', $d.id).
    Replace('{{REUSO}}', $reuso).
    Replace('{{INICIAL}}', $d.inicial).
    Replace('{{FINAL}}', $d.final).
    Replace('{{EQUIPAMENTO}}', $d.equipamento).
    Replace('{{MUSCULOS}}', $d.musculos).
    Replace('{{NAOPINTE}}', $naopinte).
    Replace('{{CORRECAO}}', $correcao).
    Replace('{{CAMERA}}', $d.camera).
    Replace('{{MOVEM}}', $d.movem).
    Replace('{{VEO}}', $veo)
  [void]$corpo.Append($bloco)
  $marca = if ($progresso[$d.id]) { $progresso[$d.id] } else { '- [ ] ' + $num + '. ' + $d.nome + ' (`' + $d.id + '`) - pose [ ] - vídeo [ ]' }
  [void]$lista.AppendLine($marca)
}

$texto = $cabecalho.Replace('{{CHECKLIST}}', $lista.ToString().Trim()) + $corpo.ToString()
[IO.File]::WriteAllText($Saida, $texto, $utf8)
Write-Host "exercicios: $num  |  progresso preservado: $($progresso.Count)"
