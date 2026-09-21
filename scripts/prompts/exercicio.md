
---

### {{NUM}}. {{NOME}} — `{{ID}}`{{REUSO}}

**1 · Pose inicial** (Imagens, com a ficha anexada) → `{{ID}}-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício {{NOMEMAIUSC}} na POSIÇÃO INICIAL.

POSIÇÃO: {{INICIAL}}.
EQUIPAMENTO: {{EQUIPAMENTO}}, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: {{MUSCULOS}}, como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.{{NAOPINTE}}
CÂMERA: {{CAMERA}}, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
{{CORRECAO}}
```

**2 · Pose final** (mesma conversa) → `{{ID}}-2.png`

```
Crie uma NOVA imagem do exercício {{NOMEMAIUSC}}, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): {{INICIAL}}.
AGORA (esta imagem): {{FINAL}}.

O que se move entre uma e outra: {{MOVEM}}. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se {{MOVEM}} estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `{{ID}}-3.png`

```
Crie uma NOVA imagem do exercício {{NOMEMAIUSC}}, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: {{INICIAL}}.
SEGUNDA imagem: {{FINAL}}.
ESTA imagem: exatamente o meio entre as duas — {{MOVEM}} percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `{{ID}}.mp4`

```
Anime o boneco de massinha da imagem fazendo {{NOMEMAIUSC}}.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: {{VEO}}. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas {{MOVEM}} se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `{{ID}}-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo {{NOMEMAIUSC}} em três momentos do movimento:

À ESQUERDA: {{INICIAL}}.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: {{FINAL}}.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento ({{EQUIPAMENTO}}), mesma câmera ({{CAMERA}}), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: {{MOVEM}}.

MÚSCULO EM DESTAQUE nas três: {{MUSCULOS}}.
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `{{ID}}-fases.png` na pasta.