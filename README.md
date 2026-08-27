# GYM

Aplicativo web de treino de academia, feito para uso no celular. Acompanha a
sequência de treinos, adapta o treino do dia ao que a academia tem livre,
registra séries e cargas, e guarda o histórico com evolução de carga e volume.

Sem build, sem dependências, sem framework: HTML, CSS e JavaScript puro.

## Como rodar

O app é estático. Qualquer servidor local serve:

```bash
python -m http.server 5173
```

Depois abra `http://localhost:5173`. No Windows sem Python, o PowerShell
resolve com um servidor de uma linha, ou use a extensão Live Server do VS Code.

Abrir o `index.html` direto pelo `file://` funciona parcialmente — alguns
navegadores bloqueiam `localStorage` nesse contexto e o histórico não persiste.

## O que faz

**Painel** — sequência atual com título por marco alcançado, recorde, total de
treinos e um calendário mensal onde cada dia mostra o que aconteceu:

| | |
|---|---|
| 🟨 amarelo sobre o trilho | treinou, dentro da sequência |
| ⬜ branco sobre o trilho | descanso — a sequência continua |
| 🟦 azul claro com floco | falta que rompeu a sequência |
| ▬ trilho preto | a sequência viva passa por aqui |
| 🟩 anel verde | hoje |

A barra colorida na base de cada dia indica qual treino foi feito. Tocar no dia
abre o que foi executado, série por série.

**Regra da sequência** — descansar faz parte: faltar 1 ou 2 dias na semana não
quebra nada. Na terceira falta da mesma semana, a sequência cai. Por isso ela é
medida em dias corridos, folgas incluídas.

**Treino do dia** — quatro divisões (Peito e Tríceps, Costas e Bíceps, Perna,
Superiores) com 7 exercícios cada. Na lista dá para **remover**, **substituir**
e **acrescentar** exercício. Cada exercício tem pelo menos 4 alternativas do
mesmo grupo muscular, variando o equipamento — para quando a máquina está
ocupada. Os ajustes valem para a sessão e um botão devolve o treino programado.

**Execução** — cronômetro do treino, cada série com repetições e carga próprias,
séries marcáveis, observação e cronômetro de descanso ajustável por exercício.

**Histórico** — treinos realizados com data, tipo, duração, exercícios e cada
série executada. Mais dois gráficos: **volume por treino** (repetições × carga)
e **evolução de carga** por exercício.

## Arquitetura

```
index.html
assets/css/styles.css        tokens + componentes, tudo num arquivo
assets/js/
  utils.js                   datas e regra de sequência
  data.js                    exercícios, alternativas e registro de treinos
  treino.js                  ajustes do treino na sessão
  sessao.js                  cronômetro do treino
  execucao.js                séries, cargas e descanso
  icones.js                  ícones de interface e músculo
  icones-exercicios.js       pictogramas dos exercícios
  guia.js                    guia de execução por família de movimento
  demonstracao.js            encaixe de mídia da demonstração
  componentes.js             peças compartilhadas entre telas
  router.js                  troca de telas
  views/                     painel, seleção, exercícios, detalhe, histórico
```

Cada módulo é uma IIFE que expõe o mínimo. As views recebem um container novo a
cada navegação, então listeners antigos morrem com o nó anterior.

**Pictogramas.** Os 78 exercícios são desenhados em SVG inline a partir de 29
movimentos base — variações que mudam só o equipamento compartilham o desenho da
mecânica, e o texto do equipamento faz a distinção. Nenhuma imagem externa.

**Demonstração substituível.** A área de execução na tela de detalhes aceita
foto ou vídeo sem mudar a interface:

```js
Demonstracao.definir('supino-reto', { tipo: 'imagem', src: 'assets/midia/supino-reto.webp' });
```

## Dados

O histórico que vem no app é **de demonstração**, gerado a partir de datas
relativas a hoje — então o calendário nunca parece velho. Treinos que você
registra de verdade ficam no `localStorage` e entram por cima:

| Chave | Guarda |
|---|---|
| `gym:historico` | treinos registrados |
| `gym:sessao` | treino em andamento |
| `gym:execucao` | séries e descanso do treino atual |
| `gym:ajustes` | remoções, trocas e acréscimos |

Todo acesso ao storage é protegido: em navegação privada o app funciona igual,
só não persiste.

## Instalar no celular

O app é um PWA: abra a URL publicada no navegador do celular e use
**Adicionar à tela inicial**. Ele passa a abrir em tela cheia, com ícone
próprio, e o service worker guarda os arquivos — funciona na academia mesmo
sem sinal.

Não existe APK: é um app web. Se você precisar de um `.apk` de verdade para
instalar ou publicar na Play Store, o [PWABuilder](https://www.pwabuilder.com)
gera um a partir da URL pública.

## Estado do projeto

Protótipo funcional. Não tem back-end, autenticação nem sincronização entre
dispositivos — tudo vive no navegador. A demonstração dos exercícios usa
pictogramas, não vídeo real.
