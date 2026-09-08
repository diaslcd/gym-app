# BunnyGym

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

**Nutrição** — consulta de calorias e macros, alcançada pelo painel. Busca por
alimento ou por refeição inteira: digitar `frango com arroz e feijão` encontra o
prato composto e abre a conta item por item, com a gramagem de cada um. Toda
tela mostra a porção a que os números se referem — a porção vem antes do
número, nunca depois. Dá para trocar entre as medidas caseiras do alimento
(«1 filé médio», «1 escumadeira»), a referência de 100 g e um peso digitado.

Categorias, favoritos e histórico de consulta ficam na primeira tela, para quem
abriu sem saber o que procurar. Os valores são de referência da **TACO**
(Unicamp) e do **USDA**, e o app diz isso: corte, preparo e quantidade mudam o
resultado no prato real.

**Entrada por biometria** — opcional, ligada em *conta*, no topo do painel.
Usa WebAuthn, então quem lê e confere a digital é o sistema do aparelho; o app
recebe só a confirmação e guarda apenas o identificador público da credencial.
Nenhum dado biométrico passa pelo app. O PIN continua disponível o tempo todo
como alternativa — ver a ressalva de segurança em `assets/js/biometria.js`.

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
  perfil.js                  quem está usando o app
  biometria.js               entrada por digital (WebAuthn)
  nutricao.js                tabela de alimentos, pratos e busca
  icones.js                  ícones de interface e músculo
  icones-exercicios.js       pictogramas dos exercícios
  guia.js                    guia de execução por família de movimento
  demonstracao.js            encaixe de mídia da demonstração
  componentes.js             peças compartilhadas entre telas
  router.js                  troca de telas
  views/                     painel, seleção, exercícios, detalhe, histórico,
                             nutrição e alimento
```

Cada módulo é uma IIFE que expõe o mínimo. As views recebem um container novo a
cada navegação, então listeners antigos morrem com o nó anterior.

**Navegação.** Não há barra de abas: o painel é a raiz e todas as seções saem
dele, inclusive Nutrição. É proposital — com mais de uma tela-raiz, o botão
voltar do Android deixa de ter um fim óbvio, e hoje ele sai do app justamente
por saber que o painel é o fim da pilha.

**Responsividade.** Espaçamento e tipografia vêm de tokens fluidos com `clamp()`
em `:root`, então acompanham a largura da tela em vez de assumir um aparelho.
Duas defesas estruturais sustentam isso: `text-size-adjust: 100%`, que desliga o
aumento automático de fonte do WebView Android, e `minmax(0, 1fr)` na grade do
`.app`, que impede um filho grande de esticar o container. As duas estão
comentadas no CSS com o porquê e o que quebrava sem elas.

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
| `gym:perfil` | nome e PIN de quem usa o aparelho |
| `gym:biometria` | id público da credencial da digital — nada biométrico |
| `gym:nutri:favoritos` | alimentos e pratos marcados com estrela |
| `gym:nutri:recentes` | os últimos consultados na Nutrição |

Todo acesso ao storage é protegido: em navegação privada o app funciona igual,
só não persiste.

## Instalar no celular

O app é um PWA: abra a URL publicada no navegador do celular e use
**Adicionar à tela inicial**. Ele passa a abrir em tela cheia, com ícone
próprio, e o service worker guarda os arquivos — funciona na academia mesmo
sem sinal.

## Gerar o APK

O empacotamento Android usa [Capacitor](https://capacitorjs.com). O APK é
compilado no GitHub Actions, então não é preciso instalar Node, JDK nem
Android SDK na sua máquina:

1. Aba **Actions** do repositório → workflow **APK** → **Run workflow**
2. No fim da execução, baixe o arquivo em **Artifacts**
3. Transfira para o celular e instale permitindo "fontes desconhecidas"

O artefato sai com o número da versão do `package.json` no nome
(`bunnygym-1.1.0.apk`). Marcar uma tag `v*` também dispara a compilação,
que é como cada versão fica registrada.

É um APK de depuração, assinado com a chave de debug — serve para testar, não
para publicar na Play Store.

Para compilar na própria máquina, com Node 20, JDK 21 e Android SDK instalados:

```bash
npm install
npm run android:add     # só na primeira vez
npm run android:sync
cd android && ./gradlew assembleDebug
```

O app mora na raiz do repositório para o GitHub Pages servi-lo direto;
`npm run www` copia os arquivos para `www/`, que é a pasta que o Capacitor
empacota. As pastas `www/`, `android/` e `node_modules/` são geradas e não
entram no versionamento.

## Estado do projeto

Protótipo funcional de treino e nutrição. Não tem back-end nem sincronização
entre dispositivos — tudo vive no navegador. A demonstração dos exercícios usa
pictogramas, não vídeo real.

**Sobre a entrada.** Nem o PIN nem a biometria são autenticação de verdade,
porque não há servidor para conferir nada: valem como tranca contra quem pega o
celular na mão, no mesmo nível de antes. A biometria melhora a conveniência e
usa o mecanismo seguro do aparelho, mas o dado de treino continua em texto puro
no `localStorage`. O detalhe está comentado em `assets/js/biometria.js`, e
substituir por login real é trocar esse módulo e o `perfil.js`.

**Sobre a tabela nutricional.** São valores de referência de tabelas públicas,
não medição do prato de ninguém. O app declara isso na tela em vez de sugerir
precisão que não tem.
