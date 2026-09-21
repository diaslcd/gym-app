# Prompts das animações dos exercícios

41 exercícios — os 45 dos treinos principais, menos 4 que são o mesmo movimento e
reaproveitam a animação (Supino, Puxada, Rosca e Tríceps usam as de Supino reto,
Puxada frontal, Rosca direta e Tríceps pulley).

## Como usar

**Passo 0 — ficha do personagem (uma vez só).** No Gemini, aba **Imagens**, anexe
`arte-fonte/peito-triceps.jpg` e envie:

```
Usando EXATAMENTE o personagem e o estilo da imagem anexa (boneco 3D de massinha, sem rosto, cabelo castanho, bermuda roxa, pulseiras pretas, pés descalços), crie uma ficha de referência de personagem.

Mostre o mesmo boneco em 3 vistas lado a lado, em pé e relaxado, braços ao lado do corpo: frente, perfil esquerdo e costas. Mesma altura, escala e iluminação nas três. Nenhum músculo colorido: pele toda na cor normal.

Fundo liso lilás claro (#E9E4FF), sem sombra de cenário, sem texto. Formato 16:9.
```

Salve como `arte-fonte/exercicios/_personagem.png`.

**Para cada exercício:**

1. **Imagens** — conversa nova, anexe a ficha `_personagem.png` e envie os prompts
   **1**, **2** e **3**, um depois do outro, na mesma conversa. Salve como
   `arte-fonte/exercicios/<id>-1.png`, `<id>-2.png` e `<id>-3.png`.
2. **Vídeos** — anexe a pose inicial (`<id>-1.png`) e envie o prompt **4**.
   Salve como `arte-fonte/exercicios/<id>.mp4`.
3. Rode `scripts/preparar-animacoes.ps1` (ou me peça).

**Por que fazer as duas coisas.** Quando o vídeo presta, o script tira as poses dele:
o loop e a lista ficam iguais e o movimento é fluido. Mas o Veo erra de dois jeitos —
ele aproxima a câmera e corta o boneco (aconteceu no tríceps pulley e no francês), ou
troca o exercício por outro parecido (o crucifixo virou supino com halteres). Nesses
casos o vídeo vai fora e as poses salvam o exercício, que entra no app animado do
mesmo jeito. Dos 6 primeiros, 2 ficaram com vídeo e 4 só com poses.

O script faz o resto sozinho: acha as pausas e corta **uma repetição em loop**, tira a
**estrela do Gemini** do canto, remove o som e comprime (o vídeo do supino foi de 1,6 MB
para 59 KB). Pose quase igual a outra é descartada com aviso.

**Quando a pose 2 ou 3 voltar igual à anterior** (o Gemini às vezes devolve a mesma
imagem em vez de mudar a posição), use o **Plano B** que fica no fim de cada
exercício: ele pede as 3 fases numa imagem só, lado a lado. Nascendo juntas, as poses
saem obrigatoriamente diferentes. Salve como `<id>-fases.png` — o script fatia sozinho
e nem precisa das poses separadas.

**Antes de salvar, confira:**
- **o enquadramento** — o boneco e o equipamento aparecem inteiros? Se o vídeo cortou
  cabeça, pés ou anilhas, peça de novo com o texto que está no fim de cada exercício;
- **a técnica** — é mesmo o exercício? O app mostra a animação como exemplo de
  execução, então um movimento errado ensina errado;
- **as poses** — a 2 mudou de verdade em relação à 1, e a 3 está no meio das duas?

## Cores dos músculos

| Grupo | Cor |
|---|---|
| Peito | rosa `#FF3D81` |
| Dorsais e costas | azul `#2B4BFF` |
| Ombros e trapézio | vermelho `#E63946` |
| Bíceps e tríceps | verde `#8AC926` |
| Quadríceps, posteriores e panturrilhas | roxo `#9B5CFF` |
| Glúteos | magenta `#B5179E` |
| Abdômen | menta `#00E5A0` |

## Progresso

Marque conforme for fazendo.

**Peito e Tríceps**

- [x] 1. Supino reto (`supino-reto`) - pose [x] - vídeo [x]
- [x] 2. Supino inclinado (`supino-inclinado`) - pose [x] - vídeo [x]
- [x] 3. Crucifixo (`crucifixo`) - pose [x] - vídeo [x]
- [x] 4. Crossover (`crossover`) - pose [x] - vídeo [x]
- [ ] 5. Tríceps pulley (`triceps-pulley`) - pose [x] - vídeo [ ] — refazer o vídeo (o 1º cortou a cabeça e as pernas)
- [ ] 6. Tríceps francês (`triceps-frances`) - pose [x] - vídeo [ ] — refazer o vídeo (o 1º cortou a cabeça)
- [ ] 7. Tríceps testa (`triceps-testa`) - pose [x] - vídeo [ ] — falta o vídeo

**Costas e Bíceps**

- [ ] 8. Puxada frontal (`puxada-frontal`) - pose [x] - vídeo [ ] — refazer as poses de costas (as 1as pintaram o peito de azul) e fazer o vídeo
- [x] 9. Remada baixa (`remada-baixa`) - pose [x] - vídeo [x]
- [x] 10. Remada articulada (`remada-articulada`) - pose [x] - vídeo [x]
- [ ] 11. Pulldown (`pulldown`) - pose [ ] - vídeo [ ]
- [ ] 12. Rosca direta (`rosca-direta`) - pose [ ] - vídeo [ ]
- [ ] 13. Rosca alternada (`rosca-alternada`) - pose [ ] - vídeo [ ]
- [ ] 14. Rosca martelo (`rosca-martelo`) - pose [ ] - vídeo [ ]

**Perna**

- [ ] 15. Agachamento (`agachamento`) - pose [ ] - vídeo [ ]
- [ ] 16. Leg press (`leg-press`) - pose [ ] - vídeo [ ]
- [ ] 17. Cadeira extensora (`cadeira-extensora`) - pose [ ] - vídeo [ ]
- [ ] 18. Mesa flexora (`mesa-flexora`) - pose [ ] - vídeo [ ]
- [ ] 19. Cadeira flexora (`cadeira-flexora`) - pose [ ] - vídeo [ ]
- [ ] 20. Panturrilha (`panturrilha`) - pose [ ] - vídeo [ ]
- [ ] 21. Hack squat (`hack-squat`) - pose [ ] - vídeo [ ]

**Superiores, Empurrar, Puxar e Ombro**

- [ ] 22. Remada curvada (`remada`) - pose [ ] - vídeo [ ]
- [ ] 23. Desenvolvimento (`desenvolvimento`) - pose [ ] - vídeo [ ]
- [ ] 24. Elevação lateral (`elevacao-lateral`) - pose [ ] - vídeo [ ]
- [ ] 25. Supino inclinado com halteres (`supino-incl-halter`) - pose [ ] - vídeo [ ]
- [ ] 26. Barra fixa (`barra-fixa`) - pose [ ] - vídeo [ ]
- [ ] 27. Remada serrote (`remada-serrote`) - pose [ ] - vídeo [ ]
- [ ] 28. Encolhimento (`encolhimento`) - pose [ ] - vídeo [ ]
- [ ] 29. Desenvolvimento com barra (`desenvolvimento-barra`) - pose [ ] - vídeo [ ]
- [ ] 30. Elevação frontal (`elevacao-frontal`) - pose [ ] - vídeo [ ]
- [ ] 31. Crucifixo inverso (`crucifixo-inverso`) - pose [ ] - vídeo [ ]
- [ ] 32. Desenvolvimento na máquina (`desenvolvimento-maq`) - pose [ ] - vídeo [ ]
- [ ] 33. Remada alta (`remada-alta`) - pose [ ] - vídeo [ ]

**Braços**

- [ ] 34. Rosca scott (`rosca-scott`) - pose [ ] - vídeo [ ]
- [ ] 35. Rosca concentrada (`rosca-concentrada`) - pose [ ] - vídeo [ ]
- [ ] 36. Tríceps na corda (`triceps-corda`) - pose [ ] - vídeo [ ]

**Glúteos e Posterior**

- [ ] 37. Elevação pélvica (`elevacao-pelvica`) - pose [ ] - vídeo [ ]
- [ ] 38. Agachamento búlgaro (`agachamento-bulgaro`) - pose [ ] - vídeo [ ]
- [ ] 39. Afundo (`afundo`) - pose [ ] - vídeo [ ]
- [ ] 40. Stiff (`stiff`) - pose [ ] - vídeo [ ]

**Corpo Inteiro**

- [ ] 41. Abdominal (`abdominal`) - pose [ ] - vídeo [ ]

## Peito e Tríceps

---

### 1. Supino reto — `supino-reto` · também usado por `supino`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `supino-reto-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício SUPINO RETO na POSIÇÃO INICIAL.

POSIÇÃO: deitado de costas no banco, pés apoiados no chão, costas e cabeça no banco, braços estendidos segurando a barra acima do meio do peito, mãos um pouco mais afastadas que os ombros.
EQUIPAMENTO: banco reto e barra olímpica com uma anilha de cada lado, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: peitoral na cor rosa (#FF3D81); tríceps e parte da frente do ombro em rosa mais claro, como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, com a cabeça do personagem à esquerda, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: deitado de costas no banco, pés apoiados no chão, costas e cabeça no banco, braços estendidos segurando a barra acima do meio do peito, mãos um pouco mais afastadas que os ombros. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `supino-reto-2.png`

```
Crie uma NOVA imagem do exercício SUPINO RETO, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): deitado de costas no banco, pés apoiados no chão, costas e cabeça no banco, braços estendidos segurando a barra acima do meio do peito, mãos um pouco mais afastadas que os ombros.
AGORA (esta imagem): a barra desceu e encosta levemente no meio do peito, cotovelos dobrados e abertos cerca de 45 graus em relação ao tronco.

O que se move entre uma e outra: os braços e a barra. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os braços e a barra estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `supino-reto-3.png`

```
Crie uma NOVA imagem do exercício SUPINO RETO, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: deitado de costas no banco, pés apoiados no chão, costas e cabeça no banco, braços estendidos segurando a barra acima do meio do peito, mãos um pouco mais afastadas que os ombros.
SEGUNDA imagem: a barra desceu e encosta levemente no meio do peito, cotovelos dobrados e abertos cerca de 45 graus em relação ao tronco.
ESTA imagem: exatamente o meio entre as duas — os braços e a barra percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `supino-reto.mp4`

```
Anime o boneco de massinha da imagem fazendo SUPINO RETO.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (a barra desceu e encosta levemente no meio do peito, cotovelos dobrados e abertos cerca de 45 graus em relação ao tronco) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os braços e a barra se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `supino-reto-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo SUPINO RETO em três momentos do movimento:

À ESQUERDA: deitado de costas no banco, pés apoiados no chão, costas e cabeça no banco, braços estendidos segurando a barra acima do meio do peito, mãos um pouco mais afastadas que os ombros.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: a barra desceu e encosta levemente no meio do peito, cotovelos dobrados e abertos cerca de 45 graus em relação ao tronco.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (banco reto e barra olímpica com uma anilha de cada lado), mesma câmera (vista lateral, com a cabeça do personagem à esquerda), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os braços e a barra.

MÚSCULO EM DESTAQUE nas três: peitoral na cor rosa (#FF3D81); tríceps e parte da frente do ombro em rosa mais claro.
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `supino-reto-fases.png` na pasta.
---

### 2. Supino inclinado — `supino-inclinado`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `supino-inclinado-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício SUPINO INCLINADO na POSIÇÃO INICIAL.

POSIÇÃO: recostado no banco inclinado, pés no chão, braços estendidos segurando a barra acima da parte alta do peito.
EQUIPAMENTO: banco inclinado a cerca de 40 graus e barra olímpica com uma anilha de cada lado, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: parte alta do peitoral na cor rosa (#FF3D81); ombro da frente e tríceps em rosa mais claro, como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, com a cabeça do personagem à esquerda, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: recostado no banco inclinado, pés no chão, braços estendidos segurando a barra acima da parte alta do peito. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `supino-inclinado-2.png`

```
Crie uma NOVA imagem do exercício SUPINO INCLINADO, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): recostado no banco inclinado, pés no chão, braços estendidos segurando a barra acima da parte alta do peito.
AGORA (esta imagem): a barra desceu até a altura das clavículas, cotovelos dobrados abaixo da linha da barra.

O que se move entre uma e outra: os braços e a barra. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os braços e a barra estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `supino-inclinado-3.png`

```
Crie uma NOVA imagem do exercício SUPINO INCLINADO, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: recostado no banco inclinado, pés no chão, braços estendidos segurando a barra acima da parte alta do peito.
SEGUNDA imagem: a barra desceu até a altura das clavículas, cotovelos dobrados abaixo da linha da barra.
ESTA imagem: exatamente o meio entre as duas — os braços e a barra percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `supino-inclinado.mp4`

```
Anime o boneco de massinha da imagem fazendo SUPINO INCLINADO.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (a barra desceu até a altura das clavículas, cotovelos dobrados abaixo da linha da barra) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os braços e a barra se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `supino-inclinado-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo SUPINO INCLINADO em três momentos do movimento:

À ESQUERDA: recostado no banco inclinado, pés no chão, braços estendidos segurando a barra acima da parte alta do peito.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: a barra desceu até a altura das clavículas, cotovelos dobrados abaixo da linha da barra.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (banco inclinado a cerca de 40 graus e barra olímpica com uma anilha de cada lado), mesma câmera (vista lateral, com a cabeça do personagem à esquerda), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os braços e a barra.

MÚSCULO EM DESTAQUE nas três: parte alta do peitoral na cor rosa (#FF3D81); ombro da frente e tríceps em rosa mais claro.
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `supino-inclinado-fases.png` na pasta.
---

### 3. Crucifixo — `crucifixo`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `crucifixo-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício CRUCIFIXO na POSIÇÃO INICIAL.

POSIÇÃO: deitado de costas no banco, braços estendidos acima do peito com os halteres quase se tocando, cotovelos com leve flexão.
EQUIPAMENTO: banco reto e dois halteres, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: peitoral na cor rosa (#FF3D81); parte da frente do ombro em rosa mais claro, como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista frontal levemente de cima, a partir dos pés do banco, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: deitado de costas no banco, braços estendidos acima do peito com os halteres quase se tocando, cotovelos com leve flexão. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `crucifixo-2.png`

```
Crie uma NOVA imagem do exercício CRUCIFIXO, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): deitado de costas no banco, braços estendidos acima do peito com os halteres quase se tocando, cotovelos com leve flexão.
AGORA (esta imagem): braços abertos em arco para os lados até a linha dos ombros, cotovelos mantendo a mesma leve flexão.

O que se move entre uma e outra: os braços e os halteres. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os braços e os halteres estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `crucifixo-3.png`

```
Crie uma NOVA imagem do exercício CRUCIFIXO, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: deitado de costas no banco, braços estendidos acima do peito com os halteres quase se tocando, cotovelos com leve flexão.
SEGUNDA imagem: braços abertos em arco para os lados até a linha dos ombros, cotovelos mantendo a mesma leve flexão.
ESTA imagem: exatamente o meio entre as duas — os braços e os halteres percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `crucifixo.mp4`

```
Anime o boneco de massinha da imagem fazendo CRUCIFIXO.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: os braços abrem em arco para os lados, com os cotovelos QUASE RETOS e sempre na mesma leve flexão, até a linha dos ombros, e fecham pelo mesmo arco até os halteres quase se tocarem acima do peito. ATENÇÃO: não é supino — os cotovelos NÃO dobram e os halteres NÃO descem em linha reta até o peito; o braço inteiro gira no ombro como uma asa. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os braços e os halteres se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `crucifixo-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo CRUCIFIXO em três momentos do movimento:

À ESQUERDA: deitado de costas no banco, braços estendidos acima do peito com os halteres quase se tocando, cotovelos com leve flexão.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: braços abertos em arco para os lados até a linha dos ombros, cotovelos mantendo a mesma leve flexão.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (banco reto e dois halteres), mesma câmera (vista frontal levemente de cima, a partir dos pés do banco), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os braços e os halteres.

MÚSCULO EM DESTAQUE nas três: peitoral na cor rosa (#FF3D81); parte da frente do ombro em rosa mais claro.
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `crucifixo-fases.png` na pasta.
---

### 4. Crossover — `crossover`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `crossover-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício CROSSOVER na POSIÇÃO INICIAL.

POSIÇÃO: em pé no centro da estação, um pé um pouco à frente, tronco levemente inclinado, braços abertos para os lados e para cima segurando as alças.
EQUIPAMENTO: estação de crossover com duas polias altas e alças, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: peitoral na cor rosa (#FF3D81), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista frontal, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: em pé no centro da estação, um pé um pouco à frente, tronco levemente inclinado, braços abertos para os lados e para cima segurando as alças. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `crossover-2.png`

```
Crie uma NOVA imagem do exercício CROSSOVER, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): em pé no centro da estação, um pé um pouco à frente, tronco levemente inclinado, braços abertos para os lados e para cima segurando as alças.
AGORA (esta imagem): braços fechados em arco à frente do corpo, mãos se encontrando na altura do abdômen, cotovelos com leve flexão.

O que se move entre uma e outra: os braços e os cabos. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os braços e os cabos estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `crossover-3.png`

```
Crie uma NOVA imagem do exercício CROSSOVER, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: em pé no centro da estação, um pé um pouco à frente, tronco levemente inclinado, braços abertos para os lados e para cima segurando as alças.
SEGUNDA imagem: braços fechados em arco à frente do corpo, mãos se encontrando na altura do abdômen, cotovelos com leve flexão.
ESTA imagem: exatamente o meio entre as duas — os braços e os cabos percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `crossover.mp4`

```
Anime o boneco de massinha da imagem fazendo CROSSOVER.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: os braços, com os cotovelos quase retos e fixos, fecham em arco à frente do corpo até as mãos se encontrarem na altura do abdômen e voltam abrindo pelo mesmo arco. ATENÇÃO: não é um empurrar — os cotovelos não dobram e estendem; o braço inteiro gira no ombro. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os braços e os cabos se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `crossover-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo CROSSOVER em três momentos do movimento:

À ESQUERDA: em pé no centro da estação, um pé um pouco à frente, tronco levemente inclinado, braços abertos para os lados e para cima segurando as alças.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: braços fechados em arco à frente do corpo, mãos se encontrando na altura do abdômen, cotovelos com leve flexão.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (estação de crossover com duas polias altas e alças), mesma câmera (vista frontal), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os braços e os cabos.

MÚSCULO EM DESTAQUE nas três: peitoral na cor rosa (#FF3D81).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `crossover-fases.png` na pasta.
---

### 5. Tríceps pulley — `triceps-pulley` · também usado por `triceps`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `triceps-pulley-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício TRÍCEPS PULLEY na POSIÇÃO INICIAL.

POSIÇÃO: em pé de frente para a polia, cotovelos colados ao corpo e dobrados a 90 graus, barra na altura do peito.
EQUIPAMENTO: polia alta com barra reta curta, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: tríceps na cor verde (#8AC926), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: em pé de frente para a polia, cotovelos colados ao corpo e dobrados a 90 graus, barra na altura do peito. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `triceps-pulley-2.png`

```
Crie uma NOVA imagem do exercício TRÍCEPS PULLEY, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): em pé de frente para a polia, cotovelos colados ao corpo e dobrados a 90 graus, barra na altura do peito.
AGORA (esta imagem): braços estendidos para baixo, barra na frente das coxas, cotovelos parados ao lado do corpo.

O que se move entre uma e outra: os antebraços e a barra. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os antebraços e a barra estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `triceps-pulley-3.png`

```
Crie uma NOVA imagem do exercício TRÍCEPS PULLEY, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: em pé de frente para a polia, cotovelos colados ao corpo e dobrados a 90 graus, barra na altura do peito.
SEGUNDA imagem: braços estendidos para baixo, barra na frente das coxas, cotovelos parados ao lado do corpo.
ESTA imagem: exatamente o meio entre as duas — os antebraços e a barra percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `triceps-pulley.mp4`

```
Anime o boneco de massinha da imagem fazendo TRÍCEPS PULLEY.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (braços estendidos para baixo, barra na frente das coxas, cotovelos parados ao lado do corpo) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os antebraços e a barra se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `triceps-pulley-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo TRÍCEPS PULLEY em três momentos do movimento:

À ESQUERDA: em pé de frente para a polia, cotovelos colados ao corpo e dobrados a 90 graus, barra na altura do peito.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: braços estendidos para baixo, barra na frente das coxas, cotovelos parados ao lado do corpo.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (polia alta com barra reta curta), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os antebraços e a barra.

MÚSCULO EM DESTAQUE nas três: tríceps na cor verde (#8AC926).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `triceps-pulley-fases.png` na pasta.
---

### 6. Tríceps francês — `triceps-frances`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `triceps-frances-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício TRÍCEPS FRANCÊS na POSIÇÃO INICIAL.

POSIÇÃO: sentado no banco, costas retas, braços estendidos acima da cabeça segurando um halter com as duas mãos.
EQUIPAMENTO: banco com encosto e um halter, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: tríceps na cor verde (#8AC926), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: sentado no banco, costas retas, braços estendidos acima da cabeça segurando um halter com as duas mãos. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `triceps-frances-2.png`

```
Crie uma NOVA imagem do exercício TRÍCEPS FRANCÊS, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): sentado no banco, costas retas, braços estendidos acima da cabeça segurando um halter com as duas mãos.
AGORA (esta imagem): cotovelos dobrados apontando para cima, halter desceu atrás da cabeça.

O que se move entre uma e outra: os antebraços e o halter. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os antebraços e o halter estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `triceps-frances-3.png`

```
Crie uma NOVA imagem do exercício TRÍCEPS FRANCÊS, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: sentado no banco, costas retas, braços estendidos acima da cabeça segurando um halter com as duas mãos.
SEGUNDA imagem: cotovelos dobrados apontando para cima, halter desceu atrás da cabeça.
ESTA imagem: exatamente o meio entre as duas — os antebraços e o halter percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `triceps-frances.mp4`

```
Anime o boneco de massinha da imagem fazendo TRÍCEPS FRANCÊS.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (cotovelos dobrados apontando para cima, halter desceu atrás da cabeça) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os antebraços e o halter se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `triceps-frances-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo TRÍCEPS FRANCÊS em três momentos do movimento:

À ESQUERDA: sentado no banco, costas retas, braços estendidos acima da cabeça segurando um halter com as duas mãos.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: cotovelos dobrados apontando para cima, halter desceu atrás da cabeça.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (banco com encosto e um halter), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os antebraços e o halter.

MÚSCULO EM DESTAQUE nas três: tríceps na cor verde (#8AC926).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `triceps-frances-fases.png` na pasta.
---

### 7. Tríceps testa — `triceps-testa`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `triceps-testa-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício TRÍCEPS TESTA na POSIÇÃO INICIAL.

POSIÇÃO: deitado de costas no banco, braços estendidos acima do peito segurando a barra W.
EQUIPAMENTO: banco reto e barra W, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: tríceps na cor verde (#8AC926), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, com a cabeça do personagem à esquerda, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: deitado de costas no banco, braços estendidos acima do peito segurando a barra W. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `triceps-testa-2.png`

```
Crie uma NOVA imagem do exercício TRÍCEPS TESTA, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): deitado de costas no banco, braços estendidos acima do peito segurando a barra W.
AGORA (esta imagem): cotovelos dobrados e parados apontando para cima, barra desceu até perto da testa.

O que se move entre uma e outra: os antebraços e a barra. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os antebraços e a barra estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `triceps-testa-3.png`

```
Crie uma NOVA imagem do exercício TRÍCEPS TESTA, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: deitado de costas no banco, braços estendidos acima do peito segurando a barra W.
SEGUNDA imagem: cotovelos dobrados e parados apontando para cima, barra desceu até perto da testa.
ESTA imagem: exatamente o meio entre as duas — os antebraços e a barra percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `triceps-testa.mp4`

```
Anime o boneco de massinha da imagem fazendo TRÍCEPS TESTA.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (cotovelos dobrados e parados apontando para cima, barra desceu até perto da testa) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os antebraços e a barra se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `triceps-testa-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo TRÍCEPS TESTA em três momentos do movimento:

À ESQUERDA: deitado de costas no banco, braços estendidos acima do peito segurando a barra W.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: cotovelos dobrados e parados apontando para cima, barra desceu até perto da testa.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (banco reto e barra W), mesma câmera (vista lateral, com a cabeça do personagem à esquerda), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os antebraços e a barra.

MÚSCULO EM DESTAQUE nas três: tríceps na cor verde (#8AC926).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `triceps-testa-fases.png` na pasta.
## Costas e Bíceps

---

### 8. Puxada frontal — `puxada-frontal` · também usado por `puxada`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `puxada-frontal-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício PUXADA FRONTAL na POSIÇÃO INICIAL.

POSIÇÃO: sentado com as coxas presas sob o apoio, braços estendidos acima da cabeça segurando a barra com pegada aberta.
EQUIPAMENTO: máquina de puxada com polia alta, banco e apoio para as coxas, barra longa, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: os dorsais nas COSTAS em azul (#2B4BFF), formando o V das costas; bíceps em azul mais claro, como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
NÃO PINTE: o peito nem o abdômen — eles não trabalham neste exercício.
CÂMERA: vista de costas, com o boneco de costas para a câmera (é a única vista em que os dorsais aparecem), parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: sentado com as coxas presas sob o apoio, braços estendidos acima da cabeça segurando a barra com pegada aberta. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `puxada-frontal-2.png`

```
Crie uma NOVA imagem do exercício PUXADA FRONTAL, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): sentado com as coxas presas sob o apoio, braços estendidos acima da cabeça segurando a barra com pegada aberta.
AGORA (esta imagem): barra puxada até a parte alta do peito, cotovelos para baixo e para trás, peito aberto.

O que se move entre uma e outra: os braços e a barra. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os braços e a barra estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `puxada-frontal-3.png`

```
Crie uma NOVA imagem do exercício PUXADA FRONTAL, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: sentado com as coxas presas sob o apoio, braços estendidos acima da cabeça segurando a barra com pegada aberta.
SEGUNDA imagem: barra puxada até a parte alta do peito, cotovelos para baixo e para trás, peito aberto.
ESTA imagem: exatamente o meio entre as duas — os braços e a barra percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `puxada-frontal.mp4`

```
Anime o boneco de massinha da imagem fazendo PUXADA FRONTAL.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (barra puxada até a parte alta do peito, cotovelos para baixo e para trás, peito aberto) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os braços e a barra se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `puxada-frontal-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo PUXADA FRONTAL em três momentos do movimento:

À ESQUERDA: sentado com as coxas presas sob o apoio, braços estendidos acima da cabeça segurando a barra com pegada aberta.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: barra puxada até a parte alta do peito, cotovelos para baixo e para trás, peito aberto.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (máquina de puxada com polia alta, banco e apoio para as coxas, barra longa), mesma câmera (vista de costas, com o boneco de costas para a câmera (é a única vista em que os dorsais aparecem)), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os braços e a barra.

MÚSCULO EM DESTAQUE nas três: os dorsais nas COSTAS em azul (#2B4BFF), formando o V das costas; bíceps em azul mais claro.
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `puxada-frontal-fases.png` na pasta.
---

### 9. Remada baixa — `remada-baixa`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `remada-baixa-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício REMADA BAIXA na POSIÇÃO INICIAL.

POSIÇÃO: sentado, pés apoiados na plataforma, joelhos levemente dobrados, tronco ereto, braços estendidos à frente segurando o triângulo.
EQUIPAMENTO: polia baixa com banco, plataforma para os pés e puxador triângulo, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: dorsais e meio das costas na cor azul (#2B4BFF); bíceps em azul mais claro, como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: sentado, pés apoiados na plataforma, joelhos levemente dobrados, tronco ereto, braços estendidos à frente segurando o triângulo. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `remada-baixa-2.png`

```
Crie uma NOVA imagem do exercício REMADA BAIXA, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): sentado, pés apoiados na plataforma, joelhos levemente dobrados, tronco ereto, braços estendidos à frente segurando o triângulo.
AGORA (esta imagem): triângulo puxado até o abdômen, cotovelos para trás rentes ao corpo, peito aberto.

O que se move entre uma e outra: os braços e o cabo. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os braços e o cabo estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `remada-baixa-3.png`

```
Crie uma NOVA imagem do exercício REMADA BAIXA, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: sentado, pés apoiados na plataforma, joelhos levemente dobrados, tronco ereto, braços estendidos à frente segurando o triângulo.
SEGUNDA imagem: triângulo puxado até o abdômen, cotovelos para trás rentes ao corpo, peito aberto.
ESTA imagem: exatamente o meio entre as duas — os braços e o cabo percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `remada-baixa.mp4`

```
Anime o boneco de massinha da imagem fazendo REMADA BAIXA.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (triângulo puxado até o abdômen, cotovelos para trás rentes ao corpo, peito aberto) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os braços e o cabo se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `remada-baixa-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo REMADA BAIXA em três momentos do movimento:

À ESQUERDA: sentado, pés apoiados na plataforma, joelhos levemente dobrados, tronco ereto, braços estendidos à frente segurando o triângulo.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: triângulo puxado até o abdômen, cotovelos para trás rentes ao corpo, peito aberto.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (polia baixa com banco, plataforma para os pés e puxador triângulo), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os braços e o cabo.

MÚSCULO EM DESTAQUE nas três: dorsais e meio das costas na cor azul (#2B4BFF); bíceps em azul mais claro.
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `remada-baixa-fases.png` na pasta.
---

### 10. Remada articulada — `remada-articulada`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `remada-articulada-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício REMADA ARTICULADA na POSIÇÃO INICIAL.

POSIÇÃO: sentado DE FRENTE PARA A MÁQUINA, montado no banco com o PEITO e a barriga encostados no apoio acolchoado que fica à frente do corpo, queixo acima do apoio, pés no chão; braços estendidos à frente segurando as duas pegadas.
EQUIPAMENTO: máquina de remada sentada com apoio acolchoado alto para o PEITO na frente do assento e duas pegadas com alavancas, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: dorsais e meio das costas na cor azul (#2B4BFF); bíceps em azul mais claro, como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
NÃO PINTE: o peito nem o abdômen — o apoio cobre o peito e quem trabalha são as costas.
CÂMERA: vista lateral, com o boneco de perfil e a máquina à direita dele, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
O apoio acolchoado ficou ATRÁS das costas e o boneco está recostado, como num supino sentado. O apoio tem que ficar NA FRENTE do peito: o boneco senta de frente para a máquina e apoia o peito e a barriga na almofada, como quem abraça a almofada, com o queixo acima dela. Os braços saem por cima do apoio, estendidos à frente, segurando as pegadas. Refaça assim, mantendo o mesmo personagem, a mesma câmera e o mesmo enquadramento.
```

**2 · Pose final** (mesma conversa) → `remada-articulada-2.png`

```
Crie uma NOVA imagem do exercício REMADA ARTICULADA, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): sentado DE FRENTE PARA A MÁQUINA, montado no banco com o PEITO e a barriga encostados no apoio acolchoado que fica à frente do corpo, queixo acima do apoio, pés no chão; braços estendidos à frente segurando as duas pegadas.
AGORA (esta imagem): as pegadas foram puxadas para TRÁS até a lateral das costelas, cotovelos apontando para trás e passando da linha do tronco, escápulas juntas; o peito continua encostado no apoio e o tronco não se mexe.

O que se move entre uma e outra: os braços e as alavancas da máquina. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os braços e as alavancas da máquina estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `remada-articulada-3.png`

```
Crie uma NOVA imagem do exercício REMADA ARTICULADA, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: sentado DE FRENTE PARA A MÁQUINA, montado no banco com o PEITO e a barriga encostados no apoio acolchoado que fica à frente do corpo, queixo acima do apoio, pés no chão; braços estendidos à frente segurando as duas pegadas.
SEGUNDA imagem: as pegadas foram puxadas para TRÁS até a lateral das costelas, cotovelos apontando para trás e passando da linha do tronco, escápulas juntas; o peito continua encostado no apoio e o tronco não se mexe.
ESTA imagem: exatamente o meio entre as duas — os braços e as alavancas da máquina percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `remada-articulada.mp4`

```
Anime o boneco de massinha da imagem fazendo REMADA ARTICULADA.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: as mãos puxam as pegadas para trás, rente às costelas, e voltam à frente com o braço estendido. ATENÇÃO: não é supino nem desenvolvimento — o boneco NÃO empurra nada para a frente; o peito fica colado no apoio o tempo todo e só os braços se movem. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os braços e as alavancas da máquina se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `remada-articulada-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo REMADA ARTICULADA em três momentos do movimento:

À ESQUERDA: sentado DE FRENTE PARA A MÁQUINA, montado no banco com o PEITO e a barriga encostados no apoio acolchoado que fica à frente do corpo, queixo acima do apoio, pés no chão; braços estendidos à frente segurando as duas pegadas.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: as pegadas foram puxadas para TRÁS até a lateral das costelas, cotovelos apontando para trás e passando da linha do tronco, escápulas juntas; o peito continua encostado no apoio e o tronco não se mexe.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (máquina de remada sentada com apoio acolchoado alto para o PEITO na frente do assento e duas pegadas com alavancas), mesma câmera (vista lateral, com o boneco de perfil e a máquina à direita dele), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os braços e as alavancas da máquina.

MÚSCULO EM DESTAQUE nas três: dorsais e meio das costas na cor azul (#2B4BFF); bíceps em azul mais claro.
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `remada-articulada-fases.png` na pasta.
---

### 11. Pulldown — `pulldown`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `pulldown-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício PULLDOWN na POSIÇÃO INICIAL.

POSIÇÃO: em pé de frente para a polia, tronco levemente inclinado à frente, braços quase estendidos à frente e para cima segurando a corda.
EQUIPAMENTO: polia alta com corda, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: dorsais na cor azul (#2B4BFF), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: em pé de frente para a polia, tronco levemente inclinado à frente, braços quase estendidos à frente e para cima segurando a corda. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `pulldown-2.png`

```
Crie uma NOVA imagem do exercício PULLDOWN, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): em pé de frente para a polia, tronco levemente inclinado à frente, braços quase estendidos à frente e para cima segurando a corda.
AGORA (esta imagem): braços ainda quase estendidos, corda empurrada em arco para baixo até ao lado das coxas.

O que se move entre uma e outra: os braços e a corda. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os braços e a corda estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `pulldown-3.png`

```
Crie uma NOVA imagem do exercício PULLDOWN, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: em pé de frente para a polia, tronco levemente inclinado à frente, braços quase estendidos à frente e para cima segurando a corda.
SEGUNDA imagem: braços ainda quase estendidos, corda empurrada em arco para baixo até ao lado das coxas.
ESTA imagem: exatamente o meio entre as duas — os braços e a corda percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `pulldown.mp4`

```
Anime o boneco de massinha da imagem fazendo PULLDOWN.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (braços ainda quase estendidos, corda empurrada em arco para baixo até ao lado das coxas) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os braços e a corda se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `pulldown-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo PULLDOWN em três momentos do movimento:

À ESQUERDA: em pé de frente para a polia, tronco levemente inclinado à frente, braços quase estendidos à frente e para cima segurando a corda.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: braços ainda quase estendidos, corda empurrada em arco para baixo até ao lado das coxas.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (polia alta com corda), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os braços e a corda.

MÚSCULO EM DESTAQUE nas três: dorsais na cor azul (#2B4BFF).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `pulldown-fases.png` na pasta.
---

### 12. Rosca direta — `rosca-direta` · também usado por `rosca`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `rosca-direta-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício ROSCA DIRETA na POSIÇÃO INICIAL.

POSIÇÃO: em pé de frente para a câmera, braços estendidos para baixo com os cotovelos colados no tronco, segurando a barra W na frente das coxas por baixo, com as palmas das mãos viradas para a frente e para cima; o boneco nunca aparece de costas nem de perfil puro, porque o bíceps tem que ficar à vista.
EQUIPAMENTO: barra W, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: o bíceps na cor verde (#8AC926) — o músculo da FRENTE do braço, entre o cotovelo e o ombro, nos dois braços, como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
NÃO PINTE: o ombro, o tríceps (a parte de trás do braço) nem o antebraço — neste exercício quem trabalha é só o bíceps, na frente do braço.
CÂMERA: vista de três quartos pela frente, com o boneco girado uns 30 graus para o lado, mostrando o peito, a frente dos dois braços e as palmas das mãos, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
O boneco ficou de costas/de perfil para a câmera: não dá para ver o bíceps nem as palmas das mãos, e o verde acabou na parte de trás do braço. Refaça com o boneco DE FRENTE para a câmera, girado só uns 30 graus para o lado, mostrando o peito, a frente dos dois braços e as palmas viradas para cima. O verde (#8AC926) vai na FRENTE do braço, entre o cotovelo e o ombro — o ombro e a parte de trás do braço ficam na cor normal da pele. A barra W fica na frente das coxas, segura por baixo, e os cotovelos colados ao tronco. Mantenha o mesmo personagem, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `rosca-direta-2.png`

```
Crie uma NOVA imagem do exercício ROSCA DIRETA, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): em pé de frente para a câmera, braços estendidos para baixo com os cotovelos colados no tronco, segurando a barra W na frente das coxas por baixo, com as palmas das mãos viradas para a frente e para cima; o boneco nunca aparece de costas nem de perfil puro, porque o bíceps tem que ficar à vista.
AGORA (esta imagem): cotovelos dobrados e ainda colados ao tronco, sem sair do lugar, e a barra subida até a altura do peito, perto dos ombros, com as palmas viradas para cima em direção ao rosto.

O que se move entre uma e outra: os antebraços e a barra, girando no cotovelo. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os antebraços e a barra, girando no cotovelo estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `rosca-direta-3.png`

```
Crie uma NOVA imagem do exercício ROSCA DIRETA, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: em pé de frente para a câmera, braços estendidos para baixo com os cotovelos colados no tronco, segurando a barra W na frente das coxas por baixo, com as palmas das mãos viradas para a frente e para cima; o boneco nunca aparece de costas nem de perfil puro, porque o bíceps tem que ficar à vista.
SEGUNDA imagem: cotovelos dobrados e ainda colados ao tronco, sem sair do lugar, e a barra subida até a altura do peito, perto dos ombros, com as palmas viradas para cima em direção ao rosto.
ESTA imagem: exatamente o meio entre as duas — os antebraços e a barra, girando no cotovelo percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `rosca-direta.mp4`

```
Anime o boneco de massinha da imagem fazendo ROSCA DIRETA.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: os antebraços sobem girando no cotovelo e levam a barra das coxas até a altura do peito, e descem devagar pelo mesmo caminho até os braços ficarem estendidos. ATENÇÃO: os cotovelos ficam colados ao tronco e parados no lugar o tempo todo — não vão para a frente nem para trás; o tronco fica reto e firme, sem balançar nem jogar o corpo para trás; os ombros não sobem. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os antebraços e a barra, girando no cotovelo se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `rosca-direta-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo ROSCA DIRETA em três momentos do movimento:

À ESQUERDA: em pé de frente para a câmera, braços estendidos para baixo com os cotovelos colados no tronco, segurando a barra W na frente das coxas por baixo, com as palmas das mãos viradas para a frente e para cima; o boneco nunca aparece de costas nem de perfil puro, porque o bíceps tem que ficar à vista.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: cotovelos dobrados e ainda colados ao tronco, sem sair do lugar, e a barra subida até a altura do peito, perto dos ombros, com as palmas viradas para cima em direção ao rosto.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (barra W), mesma câmera (vista de três quartos pela frente, com o boneco girado uns 30 graus para o lado, mostrando o peito, a frente dos dois braços e as palmas das mãos), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os antebraços e a barra, girando no cotovelo.

MÚSCULO EM DESTAQUE nas três: o bíceps na cor verde (#8AC926) — o músculo da FRENTE do braço, entre o cotovelo e o ombro, nos dois braços.
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `rosca-direta-fases.png` na pasta.
---

### 13. Rosca alternada — `rosca-alternada`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `rosca-alternada-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício ROSCA ALTERNADA na POSIÇÃO INICIAL.

POSIÇÃO: em pé de frente para a câmera, braços estendidos para baixo ao lado do corpo com os cotovelos colados no tronco, um halter em cada mão, palmas viradas para dentro (uma de frente para a outra); o boneco nunca aparece de costas nem de perfil, porque o bíceps tem que ficar à vista.
EQUIPAMENTO: dois halteres, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: o bíceps na cor verde (#8AC926) — o músculo da FRENTE do braço, entre o cotovelo e o ombro, nos dois braços, como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
NÃO PINTE: o ombro, o tríceps (a parte de trás do braço) nem o antebraço — neste exercício quem trabalha é só o bíceps, na frente do braço.
CÂMERA: vista frontal, com o boneco de frente para a câmera, mostrando o peito e a frente dos dois braços, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: o boneco DE FRENTE para a câmera, em pé, os dois braços estendidos para baixo ao lado do corpo, cotovelos colados no tronco, um halter em cada mão com as palmas viradas para dentro, uma de frente para a outra. O verde (#8AC926) vai na FRENTE do braço, entre o cotovelo e o ombro — o ombro e a parte de trás do braço ficam na cor normal da pele. Refaça mantendo o mesmo personagem, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `rosca-alternada-2.png`

```
Crie uma NOVA imagem do exercício ROSCA ALTERNADA, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): em pé de frente para a câmera, braços estendidos para baixo ao lado do corpo com os cotovelos colados no tronco, um halter em cada mão, palmas viradas para dentro (uma de frente para a outra); o boneco nunca aparece de costas nem de perfil, porque o bíceps tem que ficar à vista.
AGORA (esta imagem): o braço DIREITO dobrado, com o cotovelo ainda colado ao tronco e o halter subido até a altura do ombro, com a palma girada para cima em direção ao rosto; o braço ESQUERDO continua totalmente estendido para baixo, com a palma virada para dentro, exatamente como estava.

O que se move entre uma e outra: um braço de cada vez — só o antebraço e o halter daquele lado, girando no cotovelo. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se um braço de cada vez — só o antebraço e o halter daquele lado, girando no cotovelo estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `rosca-alternada-3.png`

```
Crie uma NOVA imagem do exercício ROSCA ALTERNADA, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: em pé de frente para a câmera, braços estendidos para baixo ao lado do corpo com os cotovelos colados no tronco, um halter em cada mão, palmas viradas para dentro (uma de frente para a outra); o boneco nunca aparece de costas nem de perfil, porque o bíceps tem que ficar à vista.
SEGUNDA imagem: o braço DIREITO dobrado, com o cotovelo ainda colado ao tronco e o halter subido até a altura do ombro, com a palma girada para cima em direção ao rosto; o braço ESQUERDO continua totalmente estendido para baixo, com a palma virada para dentro, exatamente como estava.
ESTA imagem: exatamente o meio entre as duas — um braço de cada vez — só o antebraço e o halter daquele lado, girando no cotovelo percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `rosca-alternada.mp4`

```
Anime o boneco de massinha da imagem fazendo ROSCA ALTERNADA.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: sobe o halter DIREITO até a altura do ombro, girando a palma para cima durante a subida, e desce devagar até o braço ficar estendido; depois faz o mesmo com o ESQUERDO, alternando. ATENÇÃO: sobe um braço de cada vez, nunca os dois juntos — enquanto um sobe, o outro fica parado e estendido ao lado do corpo. Os cotovelos ficam colados ao tronco e parados no lugar, o tronco fica reto e firme, sem balançar. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas um braço de cada vez — só o antebraço e o halter daquele lado, girando no cotovelo se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `rosca-alternada-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo ROSCA ALTERNADA em três momentos do movimento:

À ESQUERDA: em pé de frente para a câmera, braços estendidos para baixo ao lado do corpo com os cotovelos colados no tronco, um halter em cada mão, palmas viradas para dentro (uma de frente para a outra); o boneco nunca aparece de costas nem de perfil, porque o bíceps tem que ficar à vista.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: o braço DIREITO dobrado, com o cotovelo ainda colado ao tronco e o halter subido até a altura do ombro, com a palma girada para cima em direção ao rosto; o braço ESQUERDO continua totalmente estendido para baixo, com a palma virada para dentro, exatamente como estava.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (dois halteres), mesma câmera (vista frontal, com o boneco de frente para a câmera, mostrando o peito e a frente dos dois braços), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: um braço de cada vez — só o antebraço e o halter daquele lado, girando no cotovelo.

MÚSCULO EM DESTAQUE nas três: o bíceps na cor verde (#8AC926) — o músculo da FRENTE do braço, entre o cotovelo e o ombro, nos dois braços.
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `rosca-alternada-fases.png` na pasta.
---

### 14. Rosca martelo — `rosca-martelo`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `rosca-martelo-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício ROSCA MARTELO na POSIÇÃO INICIAL.

POSIÇÃO: em pé de frente para a câmera, braços estendidos para baixo ao lado do corpo com os cotovelos colados no tronco, um halter em cada mão segurado como quem segura um martelo, com as palmas viradas para dentro, uma de frente para a outra; o boneco nunca aparece de costas nem de perfil, porque o bíceps tem que ficar à vista.
EQUIPAMENTO: dois halteres, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: o bíceps e o antebraço na cor verde (#8AC926) — a frente do braço, entre o cotovelo e o ombro, e a parte de cima do antebraço, nos dois braços, como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
NÃO PINTE: o ombro nem o tríceps (a parte de trás do braço) — eles não trabalham neste exercício.
CÂMERA: vista frontal, com o boneco de frente para a câmera, mostrando o peito e a frente dos dois braços, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
As mãos giraram e as palmas ficaram para cima: assim virou rosca direta. Na rosca martelo os halteres são segurados como martelos, com as palmas viradas para DENTRO, uma de frente para a outra, e continuam assim do começo ao fim. Refaça com o boneco de frente para a câmera, em pé, braços estendidos para baixo, cotovelos colados no tronco e os halteres na vertical. Mantenha o mesmo personagem, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `rosca-martelo-2.png`

```
Crie uma NOVA imagem do exercício ROSCA MARTELO, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): em pé de frente para a câmera, braços estendidos para baixo ao lado do corpo com os cotovelos colados no tronco, um halter em cada mão segurado como quem segura um martelo, com as palmas viradas para dentro, uma de frente para a outra; o boneco nunca aparece de costas nem de perfil, porque o bíceps tem que ficar à vista.
AGORA (esta imagem): os dois cotovelos dobrados ao mesmo tempo, ainda colados ao tronco, com os halteres subidos até a altura dos ombros e as palmas AINDA viradas para dentro, uma de frente para a outra — as mãos não giram em nenhum momento, os halteres continuam na vertical como dois martelos em pé.

O que se move entre uma e outra: os antebraços e os halteres, girando no cotovelo, sem as mãos rodarem. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os antebraços e os halteres, girando no cotovelo, sem as mãos rodarem estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `rosca-martelo-3.png`

```
Crie uma NOVA imagem do exercício ROSCA MARTELO, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: em pé de frente para a câmera, braços estendidos para baixo ao lado do corpo com os cotovelos colados no tronco, um halter em cada mão segurado como quem segura um martelo, com as palmas viradas para dentro, uma de frente para a outra; o boneco nunca aparece de costas nem de perfil, porque o bíceps tem que ficar à vista.
SEGUNDA imagem: os dois cotovelos dobrados ao mesmo tempo, ainda colados ao tronco, com os halteres subidos até a altura dos ombros e as palmas AINDA viradas para dentro, uma de frente para a outra — as mãos não giram em nenhum momento, os halteres continuam na vertical como dois martelos em pé.
ESTA imagem: exatamente o meio entre as duas — os antebraços e os halteres, girando no cotovelo, sem as mãos rodarem percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `rosca-martelo.mp4`

```
Anime o boneco de massinha da imagem fazendo ROSCA MARTELO.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: os dois antebraços sobem juntos, girando no cotovelo, e levam os halteres até a altura dos ombros, e descem devagar pelo mesmo caminho até os braços ficarem estendidos. ATENÇÃO: não é rosca direta — as palmas ficam viradas para DENTRO o tempo todo e os halteres continuam na vertical, sem girar nem na subida nem na descida. Os cotovelos ficam colados ao tronco e parados no lugar, o tronco fica reto e firme, sem balançar. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os antebraços e os halteres, girando no cotovelo, sem as mãos rodarem se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `rosca-martelo-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo ROSCA MARTELO em três momentos do movimento:

À ESQUERDA: em pé de frente para a câmera, braços estendidos para baixo ao lado do corpo com os cotovelos colados no tronco, um halter em cada mão segurado como quem segura um martelo, com as palmas viradas para dentro, uma de frente para a outra; o boneco nunca aparece de costas nem de perfil, porque o bíceps tem que ficar à vista.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: os dois cotovelos dobrados ao mesmo tempo, ainda colados ao tronco, com os halteres subidos até a altura dos ombros e as palmas AINDA viradas para dentro, uma de frente para a outra — as mãos não giram em nenhum momento, os halteres continuam na vertical como dois martelos em pé.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (dois halteres), mesma câmera (vista frontal, com o boneco de frente para a câmera, mostrando o peito e a frente dos dois braços), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os antebraços e os halteres, girando no cotovelo, sem as mãos rodarem.

MÚSCULO EM DESTAQUE nas três: o bíceps e o antebraço na cor verde (#8AC926) — a frente do braço, entre o cotovelo e o ombro, e a parte de cima do antebraço, nos dois braços.
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `rosca-martelo-fases.png` na pasta.
## Perna

---

### 15. Agachamento — `agachamento`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `agachamento-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício AGACHAMENTO na POSIÇÃO INICIAL.

POSIÇÃO: em pé, barra apoiada sobre os ombros atrás do pescoço, pés na largura dos ombros, tronco ereto.
EQUIPAMENTO: barra olímpica com uma anilha de cada lado, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: quadríceps na cor roxa (#9B5CFF); glúteos em magenta (#B5179E), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: em pé, barra apoiada sobre os ombros atrás do pescoço, pés na largura dos ombros, tronco ereto. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `agachamento-2.png`

```
Crie uma NOVA imagem do exercício AGACHAMENTO, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): em pé, barra apoiada sobre os ombros atrás do pescoço, pés na largura dos ombros, tronco ereto.
AGORA (esta imagem): agachado com as coxas paralelas ao chão, quadril para trás, tronco inclinado à frente com as costas retas, joelhos na direção da ponta dos pés.

O que se move entre uma e outra: o corpo inteiro subindo e descendo. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se o corpo inteiro subindo e descendo estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `agachamento-3.png`

```
Crie uma NOVA imagem do exercício AGACHAMENTO, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: em pé, barra apoiada sobre os ombros atrás do pescoço, pés na largura dos ombros, tronco ereto.
SEGUNDA imagem: agachado com as coxas paralelas ao chão, quadril para trás, tronco inclinado à frente com as costas retas, joelhos na direção da ponta dos pés.
ESTA imagem: exatamente o meio entre as duas — o corpo inteiro subindo e descendo percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `agachamento.mp4`

```
Anime o boneco de massinha da imagem fazendo AGACHAMENTO.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (agachado com as coxas paralelas ao chão, quadril para trás, tronco inclinado à frente com as costas retas, joelhos na direção da ponta dos pés) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas o corpo inteiro subindo e descendo se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `agachamento-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo AGACHAMENTO em três momentos do movimento:

À ESQUERDA: em pé, barra apoiada sobre os ombros atrás do pescoço, pés na largura dos ombros, tronco ereto.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: agachado com as coxas paralelas ao chão, quadril para trás, tronco inclinado à frente com as costas retas, joelhos na direção da ponta dos pés.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (barra olímpica com uma anilha de cada lado), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: o corpo inteiro subindo e descendo.

MÚSCULO EM DESTAQUE nas três: quadríceps na cor roxa (#9B5CFF); glúteos em magenta (#B5179E).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `agachamento-fases.png` na pasta.
---

### 16. Leg press — `leg-press`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `leg-press-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício LEG PRESS na POSIÇÃO INICIAL.

POSIÇÃO: recostado no encosto da máquina, pés apoiados na plataforma na largura dos ombros, pernas estendidas sem travar os joelhos.
EQUIPAMENTO: máquina de leg press 45 graus com plataforma para os pés, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: quadríceps na cor roxa (#9B5CFF); glúteos em magenta (#B5179E), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: recostado no encosto da máquina, pés apoiados na plataforma na largura dos ombros, pernas estendidas sem travar os joelhos. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `leg-press-2.png`

```
Crie uma NOVA imagem do exercício LEG PRESS, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): recostado no encosto da máquina, pés apoiados na plataforma na largura dos ombros, pernas estendidas sem travar os joelhos.
AGORA (esta imagem): joelhos dobrados a 90 graus, plataforma desceu em direção ao peito.

O que se move entre uma e outra: as pernas e a plataforma. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se as pernas e a plataforma estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `leg-press-3.png`

```
Crie uma NOVA imagem do exercício LEG PRESS, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: recostado no encosto da máquina, pés apoiados na plataforma na largura dos ombros, pernas estendidas sem travar os joelhos.
SEGUNDA imagem: joelhos dobrados a 90 graus, plataforma desceu em direção ao peito.
ESTA imagem: exatamente o meio entre as duas — as pernas e a plataforma percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `leg-press.mp4`

```
Anime o boneco de massinha da imagem fazendo LEG PRESS.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (joelhos dobrados a 90 graus, plataforma desceu em direção ao peito) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas as pernas e a plataforma se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `leg-press-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo LEG PRESS em três momentos do movimento:

À ESQUERDA: recostado no encosto da máquina, pés apoiados na plataforma na largura dos ombros, pernas estendidas sem travar os joelhos.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: joelhos dobrados a 90 graus, plataforma desceu em direção ao peito.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (máquina de leg press 45 graus com plataforma para os pés), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: as pernas e a plataforma.

MÚSCULO EM DESTAQUE nas três: quadríceps na cor roxa (#9B5CFF); glúteos em magenta (#B5179E).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `leg-press-fases.png` na pasta.
---

### 17. Cadeira extensora — `cadeira-extensora`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `cadeira-extensora-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício CADEIRA EXTENSORA na POSIÇÃO INICIAL.

POSIÇÃO: sentado, costas no encosto, joelhos dobrados a 90 graus, rolo apoiado na frente dos tornozelos.
EQUIPAMENTO: máquina cadeira extensora com rolo acolchoado, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: quadríceps na cor roxa (#9B5CFF), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: sentado, costas no encosto, joelhos dobrados a 90 graus, rolo apoiado na frente dos tornozelos. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `cadeira-extensora-2.png`

```
Crie uma NOVA imagem do exercício CADEIRA EXTENSORA, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): sentado, costas no encosto, joelhos dobrados a 90 graus, rolo apoiado na frente dos tornozelos.
AGORA (esta imagem): pernas estendidas à frente, rolo erguido.

O que se move entre uma e outra: as pernas e o rolo. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se as pernas e o rolo estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `cadeira-extensora-3.png`

```
Crie uma NOVA imagem do exercício CADEIRA EXTENSORA, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: sentado, costas no encosto, joelhos dobrados a 90 graus, rolo apoiado na frente dos tornozelos.
SEGUNDA imagem: pernas estendidas à frente, rolo erguido.
ESTA imagem: exatamente o meio entre as duas — as pernas e o rolo percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `cadeira-extensora.mp4`

```
Anime o boneco de massinha da imagem fazendo CADEIRA EXTENSORA.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (pernas estendidas à frente, rolo erguido) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas as pernas e o rolo se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `cadeira-extensora-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo CADEIRA EXTENSORA em três momentos do movimento:

À ESQUERDA: sentado, costas no encosto, joelhos dobrados a 90 graus, rolo apoiado na frente dos tornozelos.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: pernas estendidas à frente, rolo erguido.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (máquina cadeira extensora com rolo acolchoado), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: as pernas e o rolo.

MÚSCULO EM DESTAQUE nas três: quadríceps na cor roxa (#9B5CFF).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `cadeira-extensora-fases.png` na pasta.
---

### 18. Mesa flexora — `mesa-flexora`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `mesa-flexora-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício MESA FLEXORA na POSIÇÃO INICIAL.

POSIÇÃO: deitado de bruços na máquina, segurando as pegadas, pernas estendidas, rolo atrás dos tornozelos.
EQUIPAMENTO: máquina mesa flexora com rolo acolchoado, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: parte de trás das coxas na cor roxa (#9B5CFF), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: deitado de bruços na máquina, segurando as pegadas, pernas estendidas, rolo atrás dos tornozelos. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `mesa-flexora-2.png`

```
Crie uma NOVA imagem do exercício MESA FLEXORA, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): deitado de bruços na máquina, segurando as pegadas, pernas estendidas, rolo atrás dos tornozelos.
AGORA (esta imagem): joelhos dobrados, calcanhares puxados em direção aos glúteos.

O que se move entre uma e outra: as pernas e o rolo. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se as pernas e o rolo estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `mesa-flexora-3.png`

```
Crie uma NOVA imagem do exercício MESA FLEXORA, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: deitado de bruços na máquina, segurando as pegadas, pernas estendidas, rolo atrás dos tornozelos.
SEGUNDA imagem: joelhos dobrados, calcanhares puxados em direção aos glúteos.
ESTA imagem: exatamente o meio entre as duas — as pernas e o rolo percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `mesa-flexora.mp4`

```
Anime o boneco de massinha da imagem fazendo MESA FLEXORA.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (joelhos dobrados, calcanhares puxados em direção aos glúteos) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas as pernas e o rolo se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `mesa-flexora-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo MESA FLEXORA em três momentos do movimento:

À ESQUERDA: deitado de bruços na máquina, segurando as pegadas, pernas estendidas, rolo atrás dos tornozelos.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: joelhos dobrados, calcanhares puxados em direção aos glúteos.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (máquina mesa flexora com rolo acolchoado), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: as pernas e o rolo.

MÚSCULO EM DESTAQUE nas três: parte de trás das coxas na cor roxa (#9B5CFF).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `mesa-flexora-fases.png` na pasta.
---

### 19. Cadeira flexora — `cadeira-flexora`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `cadeira-flexora-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício CADEIRA FLEXORA na POSIÇÃO INICIAL.

POSIÇÃO: sentado, costas no encosto, pernas estendidas à frente, rolo atrás dos tornozelos.
EQUIPAMENTO: máquina cadeira flexora com rolo acolchoado, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: parte de trás das coxas na cor roxa (#9B5CFF), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: sentado, costas no encosto, pernas estendidas à frente, rolo atrás dos tornozelos. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `cadeira-flexora-2.png`

```
Crie uma NOVA imagem do exercício CADEIRA FLEXORA, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): sentado, costas no encosto, pernas estendidas à frente, rolo atrás dos tornozelos.
AGORA (esta imagem): joelhos dobrados, rolo empurrado para baixo e para trás.

O que se move entre uma e outra: as pernas e o rolo. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se as pernas e o rolo estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `cadeira-flexora-3.png`

```
Crie uma NOVA imagem do exercício CADEIRA FLEXORA, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: sentado, costas no encosto, pernas estendidas à frente, rolo atrás dos tornozelos.
SEGUNDA imagem: joelhos dobrados, rolo empurrado para baixo e para trás.
ESTA imagem: exatamente o meio entre as duas — as pernas e o rolo percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `cadeira-flexora.mp4`

```
Anime o boneco de massinha da imagem fazendo CADEIRA FLEXORA.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (joelhos dobrados, rolo empurrado para baixo e para trás) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas as pernas e o rolo se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `cadeira-flexora-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo CADEIRA FLEXORA em três momentos do movimento:

À ESQUERDA: sentado, costas no encosto, pernas estendidas à frente, rolo atrás dos tornozelos.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: joelhos dobrados, rolo empurrado para baixo e para trás.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (máquina cadeira flexora com rolo acolchoado), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: as pernas e o rolo.

MÚSCULO EM DESTAQUE nas três: parte de trás das coxas na cor roxa (#9B5CFF).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `cadeira-flexora-fases.png` na pasta.
---

### 20. Panturrilha — `panturrilha`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `panturrilha-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício PANTURRILHA na POSIÇÃO INICIAL.

POSIÇÃO: em pé sob os apoios dos ombros, ponta dos pés no degrau, calcanhares abaixo da linha do degrau.
EQUIPAMENTO: máquina de panturrilha em pé com apoios nos ombros e degrau, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: panturrilhas na cor roxa (#9B5CFF), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: em pé sob os apoios dos ombros, ponta dos pés no degrau, calcanhares abaixo da linha do degrau. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `panturrilha-2.png`

```
Crie uma NOVA imagem do exercício PANTURRILHA, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): em pé sob os apoios dos ombros, ponta dos pés no degrau, calcanhares abaixo da linha do degrau.
AGORA (esta imagem): na ponta dos pés, calcanhares elevados ao máximo.

O que se move entre uma e outra: os tornozelos, subindo e descendo o corpo. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os tornozelos, subindo e descendo o corpo estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `panturrilha-3.png`

```
Crie uma NOVA imagem do exercício PANTURRILHA, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: em pé sob os apoios dos ombros, ponta dos pés no degrau, calcanhares abaixo da linha do degrau.
SEGUNDA imagem: na ponta dos pés, calcanhares elevados ao máximo.
ESTA imagem: exatamente o meio entre as duas — os tornozelos, subindo e descendo o corpo percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `panturrilha.mp4`

```
Anime o boneco de massinha da imagem fazendo PANTURRILHA.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (na ponta dos pés, calcanhares elevados ao máximo) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os tornozelos, subindo e descendo o corpo se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `panturrilha-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo PANTURRILHA em três momentos do movimento:

À ESQUERDA: em pé sob os apoios dos ombros, ponta dos pés no degrau, calcanhares abaixo da linha do degrau.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: na ponta dos pés, calcanhares elevados ao máximo.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (máquina de panturrilha em pé com apoios nos ombros e degrau), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os tornozelos, subindo e descendo o corpo.

MÚSCULO EM DESTAQUE nas três: panturrilhas na cor roxa (#9B5CFF).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `panturrilha-fases.png` na pasta.
---

### 21. Hack squat — `hack-squat`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `hack-squat-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício HACK SQUAT na POSIÇÃO INICIAL.

POSIÇÃO: costas no encosto inclinado, ombros sob os apoios, pés na plataforma, pernas estendidas.
EQUIPAMENTO: máquina hack squat com encosto inclinado e apoios nos ombros, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: quadríceps na cor roxa (#9B5CFF); glúteos em magenta (#B5179E), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: costas no encosto inclinado, ombros sob os apoios, pés na plataforma, pernas estendidas. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `hack-squat-2.png`

```
Crie uma NOVA imagem do exercício HACK SQUAT, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): costas no encosto inclinado, ombros sob os apoios, pés na plataforma, pernas estendidas.
AGORA (esta imagem): agachado, coxas paralelas à plataforma, costas coladas no encosto.

O que se move entre uma e outra: as pernas e o carrinho da máquina. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se as pernas e o carrinho da máquina estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `hack-squat-3.png`

```
Crie uma NOVA imagem do exercício HACK SQUAT, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: costas no encosto inclinado, ombros sob os apoios, pés na plataforma, pernas estendidas.
SEGUNDA imagem: agachado, coxas paralelas à plataforma, costas coladas no encosto.
ESTA imagem: exatamente o meio entre as duas — as pernas e o carrinho da máquina percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `hack-squat.mp4`

```
Anime o boneco de massinha da imagem fazendo HACK SQUAT.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (agachado, coxas paralelas à plataforma, costas coladas no encosto) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas as pernas e o carrinho da máquina se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `hack-squat-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo HACK SQUAT em três momentos do movimento:

À ESQUERDA: costas no encosto inclinado, ombros sob os apoios, pés na plataforma, pernas estendidas.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: agachado, coxas paralelas à plataforma, costas coladas no encosto.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (máquina hack squat com encosto inclinado e apoios nos ombros), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: as pernas e o carrinho da máquina.

MÚSCULO EM DESTAQUE nas três: quadríceps na cor roxa (#9B5CFF); glúteos em magenta (#B5179E).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `hack-squat-fases.png` na pasta.
## Superiores, Empurrar, Puxar e Ombro

---

### 22. Remada curvada — `remada`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `remada-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício REMADA CURVADA na POSIÇÃO INICIAL.

POSIÇÃO: em pé, joelhos levemente dobrados, tronco inclinado à frente cerca de 45 graus com as costas retas, braços estendidos segurando a barra abaixo dos joelhos.
EQUIPAMENTO: barra olímpica com uma anilha de cada lado, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: costas na cor azul (#2B4BFF); bíceps em azul mais claro, como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: em pé, joelhos levemente dobrados, tronco inclinado à frente cerca de 45 graus com as costas retas, braços estendidos segurando a barra abaixo dos joelhos. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `remada-2.png`

```
Crie uma NOVA imagem do exercício REMADA CURVADA, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): em pé, joelhos levemente dobrados, tronco inclinado à frente cerca de 45 graus com as costas retas, braços estendidos segurando a barra abaixo dos joelhos.
AGORA (esta imagem): barra puxada até o abdômen, cotovelos para trás, tronco parado.

O que se move entre uma e outra: os braços e a barra. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os braços e a barra estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `remada-3.png`

```
Crie uma NOVA imagem do exercício REMADA CURVADA, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: em pé, joelhos levemente dobrados, tronco inclinado à frente cerca de 45 graus com as costas retas, braços estendidos segurando a barra abaixo dos joelhos.
SEGUNDA imagem: barra puxada até o abdômen, cotovelos para trás, tronco parado.
ESTA imagem: exatamente o meio entre as duas — os braços e a barra percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `remada.mp4`

```
Anime o boneco de massinha da imagem fazendo REMADA CURVADA.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (barra puxada até o abdômen, cotovelos para trás, tronco parado) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os braços e a barra se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `remada-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo REMADA CURVADA em três momentos do movimento:

À ESQUERDA: em pé, joelhos levemente dobrados, tronco inclinado à frente cerca de 45 graus com as costas retas, braços estendidos segurando a barra abaixo dos joelhos.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: barra puxada até o abdômen, cotovelos para trás, tronco parado.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (barra olímpica com uma anilha de cada lado), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os braços e a barra.

MÚSCULO EM DESTAQUE nas três: costas na cor azul (#2B4BFF); bíceps em azul mais claro.
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `remada-fases.png` na pasta.
---

### 23. Desenvolvimento — `desenvolvimento`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `desenvolvimento-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício DESENVOLVIMENTO na POSIÇÃO INICIAL.

POSIÇÃO: sentado com as costas no encosto, halteres na altura das orelhas, cotovelos dobrados a 90 graus, palmas para frente.
EQUIPAMENTO: banco com encosto vertical e dois halteres, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: ombros na cor vermelha (#E63946); tríceps em vermelho mais claro, como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista frontal, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: sentado com as costas no encosto, halteres na altura das orelhas, cotovelos dobrados a 90 graus, palmas para frente. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `desenvolvimento-2.png`

```
Crie uma NOVA imagem do exercício DESENVOLVIMENTO, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): sentado com as costas no encosto, halteres na altura das orelhas, cotovelos dobrados a 90 graus, palmas para frente.
AGORA (esta imagem): braços estendidos acima da cabeça, halteres quase se tocando.

O que se move entre uma e outra: os braços e os halteres. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os braços e os halteres estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `desenvolvimento-3.png`

```
Crie uma NOVA imagem do exercício DESENVOLVIMENTO, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: sentado com as costas no encosto, halteres na altura das orelhas, cotovelos dobrados a 90 graus, palmas para frente.
SEGUNDA imagem: braços estendidos acima da cabeça, halteres quase se tocando.
ESTA imagem: exatamente o meio entre as duas — os braços e os halteres percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `desenvolvimento.mp4`

```
Anime o boneco de massinha da imagem fazendo DESENVOLVIMENTO.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (braços estendidos acima da cabeça, halteres quase se tocando) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os braços e os halteres se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `desenvolvimento-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo DESENVOLVIMENTO em três momentos do movimento:

À ESQUERDA: sentado com as costas no encosto, halteres na altura das orelhas, cotovelos dobrados a 90 graus, palmas para frente.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: braços estendidos acima da cabeça, halteres quase se tocando.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (banco com encosto vertical e dois halteres), mesma câmera (vista frontal), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os braços e os halteres.

MÚSCULO EM DESTAQUE nas três: ombros na cor vermelha (#E63946); tríceps em vermelho mais claro.
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `desenvolvimento-fases.png` na pasta.
---

### 24. Elevação lateral — `elevacao-lateral`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `elevacao-lateral-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício ELEVAÇÃO LATERAL na POSIÇÃO INICIAL.

POSIÇÃO: em pé, braços ao lado do corpo segurando os halteres, cotovelos levemente dobrados.
EQUIPAMENTO: dois halteres, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: ombros na cor vermelha (#E63946), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista frontal, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: em pé, braços ao lado do corpo segurando os halteres, cotovelos levemente dobrados. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `elevacao-lateral-2.png`

```
Crie uma NOVA imagem do exercício ELEVAÇÃO LATERAL, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): em pé, braços ao lado do corpo segurando os halteres, cotovelos levemente dobrados.
AGORA (esta imagem): braços abertos para os lados até a altura dos ombros, formando um T, cotovelos levemente dobrados.

O que se move entre uma e outra: os braços e os halteres. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os braços e os halteres estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `elevacao-lateral-3.png`

```
Crie uma NOVA imagem do exercício ELEVAÇÃO LATERAL, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: em pé, braços ao lado do corpo segurando os halteres, cotovelos levemente dobrados.
SEGUNDA imagem: braços abertos para os lados até a altura dos ombros, formando um T, cotovelos levemente dobrados.
ESTA imagem: exatamente o meio entre as duas — os braços e os halteres percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `elevacao-lateral.mp4`

```
Anime o boneco de massinha da imagem fazendo ELEVAÇÃO LATERAL.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: os braços sobem abertos para os lados, com os cotovelos quase retos, até a altura dos ombros formando um T, e descem devagar pelo mesmo caminho. ATENÇÃO: os halteres não passam da altura dos ombros e os cotovelos não dobram. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os braços e os halteres se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `elevacao-lateral-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo ELEVAÇÃO LATERAL em três momentos do movimento:

À ESQUERDA: em pé, braços ao lado do corpo segurando os halteres, cotovelos levemente dobrados.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: braços abertos para os lados até a altura dos ombros, formando um T, cotovelos levemente dobrados.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (dois halteres), mesma câmera (vista frontal), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os braços e os halteres.

MÚSCULO EM DESTAQUE nas três: ombros na cor vermelha (#E63946).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `elevacao-lateral-fases.png` na pasta.
---

### 25. Supino inclinado com halteres — `supino-incl-halter`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `supino-incl-halter-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício SUPINO INCLINADO COM HALTERES na POSIÇÃO INICIAL.

POSIÇÃO: recostado no banco inclinado, braços estendidos segurando os halteres acima da parte alta do peito.
EQUIPAMENTO: banco inclinado a cerca de 40 graus e dois halteres, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: parte alta do peitoral na cor rosa (#FF3D81); ombro da frente e tríceps em rosa mais claro, como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, com a cabeça do personagem à esquerda, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: recostado no banco inclinado, braços estendidos segurando os halteres acima da parte alta do peito. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `supino-incl-halter-2.png`

```
Crie uma NOVA imagem do exercício SUPINO INCLINADO COM HALTERES, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): recostado no banco inclinado, braços estendidos segurando os halteres acima da parte alta do peito.
AGORA (esta imagem): halteres desceram ao lado da parte alta do peito, cotovelos dobrados.

O que se move entre uma e outra: os braços e os halteres. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os braços e os halteres estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `supino-incl-halter-3.png`

```
Crie uma NOVA imagem do exercício SUPINO INCLINADO COM HALTERES, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: recostado no banco inclinado, braços estendidos segurando os halteres acima da parte alta do peito.
SEGUNDA imagem: halteres desceram ao lado da parte alta do peito, cotovelos dobrados.
ESTA imagem: exatamente o meio entre as duas — os braços e os halteres percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `supino-incl-halter.mp4`

```
Anime o boneco de massinha da imagem fazendo SUPINO INCLINADO COM HALTERES.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (halteres desceram ao lado da parte alta do peito, cotovelos dobrados) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os braços e os halteres se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `supino-incl-halter-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo SUPINO INCLINADO COM HALTERES em três momentos do movimento:

À ESQUERDA: recostado no banco inclinado, braços estendidos segurando os halteres acima da parte alta do peito.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: halteres desceram ao lado da parte alta do peito, cotovelos dobrados.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (banco inclinado a cerca de 40 graus e dois halteres), mesma câmera (vista lateral, com a cabeça do personagem à esquerda), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os braços e os halteres.

MÚSCULO EM DESTAQUE nas três: parte alta do peitoral na cor rosa (#FF3D81); ombro da frente e tríceps em rosa mais claro.
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `supino-incl-halter-fases.png` na pasta.
---

### 26. Barra fixa — `barra-fixa`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `barra-fixa-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício BARRA FIXA na POSIÇÃO INICIAL.

POSIÇÃO: pendurado na barra com pegada aberta, braços estendidos, pernas levemente dobradas e cruzadas.
EQUIPAMENTO: barra fixa alta, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: dorsais na cor azul (#2B4BFF); bíceps em azul mais claro, como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista de costas, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: pendurado na barra com pegada aberta, braços estendidos, pernas levemente dobradas e cruzadas. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `barra-fixa-2.png`

```
Crie uma NOVA imagem do exercício BARRA FIXA, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): pendurado na barra com pegada aberta, braços estendidos, pernas levemente dobradas e cruzadas.
AGORA (esta imagem): corpo puxado para cima, queixo acima da barra, cotovelos apontando para baixo.

O que se move entre uma e outra: o corpo inteiro subindo e descendo. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se o corpo inteiro subindo e descendo estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `barra-fixa-3.png`

```
Crie uma NOVA imagem do exercício BARRA FIXA, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: pendurado na barra com pegada aberta, braços estendidos, pernas levemente dobradas e cruzadas.
SEGUNDA imagem: corpo puxado para cima, queixo acima da barra, cotovelos apontando para baixo.
ESTA imagem: exatamente o meio entre as duas — o corpo inteiro subindo e descendo percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `barra-fixa.mp4`

```
Anime o boneco de massinha da imagem fazendo BARRA FIXA.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (corpo puxado para cima, queixo acima da barra, cotovelos apontando para baixo) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas o corpo inteiro subindo e descendo se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `barra-fixa-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo BARRA FIXA em três momentos do movimento:

À ESQUERDA: pendurado na barra com pegada aberta, braços estendidos, pernas levemente dobradas e cruzadas.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: corpo puxado para cima, queixo acima da barra, cotovelos apontando para baixo.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (barra fixa alta), mesma câmera (vista de costas), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: o corpo inteiro subindo e descendo.

MÚSCULO EM DESTAQUE nas três: dorsais na cor azul (#2B4BFF); bíceps em azul mais claro.
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `barra-fixa-fases.png` na pasta.
---

### 27. Remada serrote — `remada-serrote`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `remada-serrote-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício REMADA SERROTE na POSIÇÃO INICIAL.

POSIÇÃO: joelho e mão esquerdos apoiados no banco, tronco paralelo ao chão, costas retas, braço direito estendido para baixo segurando o halter.
EQUIPAMENTO: banco reto e um halter, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: dorsais na cor azul (#2B4BFF); bíceps em azul mais claro, como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: joelho e mão esquerdos apoiados no banco, tronco paralelo ao chão, costas retas, braço direito estendido para baixo segurando o halter. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `remada-serrote-2.png`

```
Crie uma NOVA imagem do exercício REMADA SERROTE, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): joelho e mão esquerdos apoiados no banco, tronco paralelo ao chão, costas retas, braço direito estendido para baixo segurando o halter.
AGORA (esta imagem): halter puxado até a lateral da cintura, cotovelo direito para trás e para cima.

O que se move entre uma e outra: o braço direito e o halter. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se o braço direito e o halter estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `remada-serrote-3.png`

```
Crie uma NOVA imagem do exercício REMADA SERROTE, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: joelho e mão esquerdos apoiados no banco, tronco paralelo ao chão, costas retas, braço direito estendido para baixo segurando o halter.
SEGUNDA imagem: halter puxado até a lateral da cintura, cotovelo direito para trás e para cima.
ESTA imagem: exatamente o meio entre as duas — o braço direito e o halter percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `remada-serrote.mp4`

```
Anime o boneco de massinha da imagem fazendo REMADA SERROTE.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (halter puxado até a lateral da cintura, cotovelo direito para trás e para cima) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas o braço direito e o halter se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `remada-serrote-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo REMADA SERROTE em três momentos do movimento:

À ESQUERDA: joelho e mão esquerdos apoiados no banco, tronco paralelo ao chão, costas retas, braço direito estendido para baixo segurando o halter.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: halter puxado até a lateral da cintura, cotovelo direito para trás e para cima.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (banco reto e um halter), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: o braço direito e o halter.

MÚSCULO EM DESTAQUE nas três: dorsais na cor azul (#2B4BFF); bíceps em azul mais claro.
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `remada-serrote-fases.png` na pasta.
---

### 28. Encolhimento — `encolhimento`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `encolhimento-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício ENCOLHIMENTO na POSIÇÃO INICIAL.

POSIÇÃO: em pé, braços estendidos ao lado do corpo segurando os halteres, ombros relaxados.
EQUIPAMENTO: dois halteres, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: trapézio na cor vermelha (#E63946), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista frontal, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: em pé, braços estendidos ao lado do corpo segurando os halteres, ombros relaxados. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `encolhimento-2.png`

```
Crie uma NOVA imagem do exercício ENCOLHIMENTO, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): em pé, braços estendidos ao lado do corpo segurando os halteres, ombros relaxados.
AGORA (esta imagem): ombros elevados em direção às orelhas, braços continuam estendidos.

O que se move entre uma e outra: os ombros e os halteres. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os ombros e os halteres estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `encolhimento-3.png`

```
Crie uma NOVA imagem do exercício ENCOLHIMENTO, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: em pé, braços estendidos ao lado do corpo segurando os halteres, ombros relaxados.
SEGUNDA imagem: ombros elevados em direção às orelhas, braços continuam estendidos.
ESTA imagem: exatamente o meio entre as duas — os ombros e os halteres percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `encolhimento.mp4`

```
Anime o boneco de massinha da imagem fazendo ENCOLHIMENTO.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (ombros elevados em direção às orelhas, braços continuam estendidos) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os ombros e os halteres se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `encolhimento-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo ENCOLHIMENTO em três momentos do movimento:

À ESQUERDA: em pé, braços estendidos ao lado do corpo segurando os halteres, ombros relaxados.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: ombros elevados em direção às orelhas, braços continuam estendidos.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (dois halteres), mesma câmera (vista frontal), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os ombros e os halteres.

MÚSCULO EM DESTAQUE nas três: trapézio na cor vermelha (#E63946).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `encolhimento-fases.png` na pasta.
---

### 29. Desenvolvimento com barra — `desenvolvimento-barra`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `desenvolvimento-barra-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício DESENVOLVIMENTO COM BARRA na POSIÇÃO INICIAL.

POSIÇÃO: sentado com as costas no encosto, barra na frente do corpo na altura do queixo, cotovelos dobrados abaixo da barra.
EQUIPAMENTO: banco com encosto vertical e barra olímpica com uma anilha de cada lado, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: ombros na cor vermelha (#E63946); tríceps em vermelho mais claro, como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: sentado com as costas no encosto, barra na frente do corpo na altura do queixo, cotovelos dobrados abaixo da barra. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `desenvolvimento-barra-2.png`

```
Crie uma NOVA imagem do exercício DESENVOLVIMENTO COM BARRA, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): sentado com as costas no encosto, barra na frente do corpo na altura do queixo, cotovelos dobrados abaixo da barra.
AGORA (esta imagem): braços estendidos acima da cabeça, barra alinhada acima da cabeça.

O que se move entre uma e outra: os braços e a barra. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os braços e a barra estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `desenvolvimento-barra-3.png`

```
Crie uma NOVA imagem do exercício DESENVOLVIMENTO COM BARRA, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: sentado com as costas no encosto, barra na frente do corpo na altura do queixo, cotovelos dobrados abaixo da barra.
SEGUNDA imagem: braços estendidos acima da cabeça, barra alinhada acima da cabeça.
ESTA imagem: exatamente o meio entre as duas — os braços e a barra percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `desenvolvimento-barra.mp4`

```
Anime o boneco de massinha da imagem fazendo DESENVOLVIMENTO COM BARRA.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (braços estendidos acima da cabeça, barra alinhada acima da cabeça) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os braços e a barra se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `desenvolvimento-barra-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo DESENVOLVIMENTO COM BARRA em três momentos do movimento:

À ESQUERDA: sentado com as costas no encosto, barra na frente do corpo na altura do queixo, cotovelos dobrados abaixo da barra.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: braços estendidos acima da cabeça, barra alinhada acima da cabeça.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (banco com encosto vertical e barra olímpica com uma anilha de cada lado), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os braços e a barra.

MÚSCULO EM DESTAQUE nas três: ombros na cor vermelha (#E63946); tríceps em vermelho mais claro.
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `desenvolvimento-barra-fases.png` na pasta.
---

### 30. Elevação frontal — `elevacao-frontal`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `elevacao-frontal-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício ELEVAÇÃO FRONTAL na POSIÇÃO INICIAL.

POSIÇÃO: em pé, braços estendidos segurando os halteres na frente das coxas.
EQUIPAMENTO: dois halteres, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: parte da frente dos ombros na cor vermelha (#E63946), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: em pé, braços estendidos segurando os halteres na frente das coxas. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `elevacao-frontal-2.png`

```
Crie uma NOVA imagem do exercício ELEVAÇÃO FRONTAL, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): em pé, braços estendidos segurando os halteres na frente das coxas.
AGORA (esta imagem): braços estendidos elevados à frente até a altura dos ombros.

O que se move entre uma e outra: os braços e os halteres. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os braços e os halteres estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `elevacao-frontal-3.png`

```
Crie uma NOVA imagem do exercício ELEVAÇÃO FRONTAL, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: em pé, braços estendidos segurando os halteres na frente das coxas.
SEGUNDA imagem: braços estendidos elevados à frente até a altura dos ombros.
ESTA imagem: exatamente o meio entre as duas — os braços e os halteres percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `elevacao-frontal.mp4`

```
Anime o boneco de massinha da imagem fazendo ELEVAÇÃO FRONTAL.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (braços estendidos elevados à frente até a altura dos ombros) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os braços e os halteres se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `elevacao-frontal-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo ELEVAÇÃO FRONTAL em três momentos do movimento:

À ESQUERDA: em pé, braços estendidos segurando os halteres na frente das coxas.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: braços estendidos elevados à frente até a altura dos ombros.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (dois halteres), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os braços e os halteres.

MÚSCULO EM DESTAQUE nas três: parte da frente dos ombros na cor vermelha (#E63946).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `elevacao-frontal-fases.png` na pasta.
---

### 31. Crucifixo inverso — `crucifixo-inverso`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `crucifixo-inverso-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício CRUCIFIXO INVERSO na POSIÇÃO INICIAL.

POSIÇÃO: deitado de bruços no banco inclinado com o peito apoiado, braços pendurados para baixo segurando os halteres, cotovelos levemente dobrados.
EQUIPAMENTO: banco inclinado e dois halteres, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: a parte de TRÁS dos ombros em vermelho (#E63946); trapézio entre as escápulas em vermelho mais claro, como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
NÃO PINTE: a parte da frente do ombro nem o peito.
CÂMERA: vista de costas, a partir de trás do banco (é a vista em que a parte de trás do ombro aparece), parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: deitado de bruços no banco inclinado com o peito apoiado, braços pendurados para baixo segurando os halteres, cotovelos levemente dobrados. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `crucifixo-inverso-2.png`

```
Crie uma NOVA imagem do exercício CRUCIFIXO INVERSO, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): deitado de bruços no banco inclinado com o peito apoiado, braços pendurados para baixo segurando os halteres, cotovelos levemente dobrados.
AGORA (esta imagem): braços abertos para os lados até a linha dos ombros, escápulas juntas.

O que se move entre uma e outra: os braços e os halteres. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os braços e os halteres estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `crucifixo-inverso-3.png`

```
Crie uma NOVA imagem do exercício CRUCIFIXO INVERSO, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: deitado de bruços no banco inclinado com o peito apoiado, braços pendurados para baixo segurando os halteres, cotovelos levemente dobrados.
SEGUNDA imagem: braços abertos para os lados até a linha dos ombros, escápulas juntas.
ESTA imagem: exatamente o meio entre as duas — os braços e os halteres percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `crucifixo-inverso.mp4`

```
Anime o boneco de massinha da imagem fazendo CRUCIFIXO INVERSO.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: os braços, com os cotovelos quase retos, abrem em arco para os lados até a linha dos ombros, juntando as escápulas, e descem devagar pelo mesmo arco. ATENÇÃO: não é remada — os cotovelos não dobram puxando para trás; o braço inteiro gira no ombro. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os braços e os halteres se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `crucifixo-inverso-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo CRUCIFIXO INVERSO em três momentos do movimento:

À ESQUERDA: deitado de bruços no banco inclinado com o peito apoiado, braços pendurados para baixo segurando os halteres, cotovelos levemente dobrados.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: braços abertos para os lados até a linha dos ombros, escápulas juntas.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (banco inclinado e dois halteres), mesma câmera (vista de costas, a partir de trás do banco (é a vista em que a parte de trás do ombro aparece)), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os braços e os halteres.

MÚSCULO EM DESTAQUE nas três: a parte de TRÁS dos ombros em vermelho (#E63946); trapézio entre as escápulas em vermelho mais claro.
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `crucifixo-inverso-fases.png` na pasta.
---

### 32. Desenvolvimento na máquina — `desenvolvimento-maq`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `desenvolvimento-maq-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício DESENVOLVIMENTO NA MÁQUINA na POSIÇÃO INICIAL.

POSIÇÃO: sentado com as costas no encosto, segurando as pegadas na altura dos ombros, cotovelos dobrados.
EQUIPAMENTO: máquina de desenvolvimento sentado com duas pegadas, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: ombros na cor vermelha (#E63946); tríceps em vermelho mais claro, como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: sentado com as costas no encosto, segurando as pegadas na altura dos ombros, cotovelos dobrados. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `desenvolvimento-maq-2.png`

```
Crie uma NOVA imagem do exercício DESENVOLVIMENTO NA MÁQUINA, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): sentado com as costas no encosto, segurando as pegadas na altura dos ombros, cotovelos dobrados.
AGORA (esta imagem): braços estendidos acima da cabeça empurrando as pegadas.

O que se move entre uma e outra: os braços e as alavancas da máquina. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os braços e as alavancas da máquina estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `desenvolvimento-maq-3.png`

```
Crie uma NOVA imagem do exercício DESENVOLVIMENTO NA MÁQUINA, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: sentado com as costas no encosto, segurando as pegadas na altura dos ombros, cotovelos dobrados.
SEGUNDA imagem: braços estendidos acima da cabeça empurrando as pegadas.
ESTA imagem: exatamente o meio entre as duas — os braços e as alavancas da máquina percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `desenvolvimento-maq.mp4`

```
Anime o boneco de massinha da imagem fazendo DESENVOLVIMENTO NA MÁQUINA.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (braços estendidos acima da cabeça empurrando as pegadas) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os braços e as alavancas da máquina se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `desenvolvimento-maq-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo DESENVOLVIMENTO NA MÁQUINA em três momentos do movimento:

À ESQUERDA: sentado com as costas no encosto, segurando as pegadas na altura dos ombros, cotovelos dobrados.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: braços estendidos acima da cabeça empurrando as pegadas.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (máquina de desenvolvimento sentado com duas pegadas), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os braços e as alavancas da máquina.

MÚSCULO EM DESTAQUE nas três: ombros na cor vermelha (#E63946); tríceps em vermelho mais claro.
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `desenvolvimento-maq-fases.png` na pasta.
---

### 33. Remada alta — `remada-alta`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `remada-alta-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício REMADA ALTA na POSIÇÃO INICIAL.

POSIÇÃO: em pé, braços estendidos segurando a barra na frente das coxas com as mãos próximas.
EQUIPAMENTO: barra olímpica curta, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: ombros e trapézio na cor vermelha (#E63946), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista frontal, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: em pé, braços estendidos segurando a barra na frente das coxas com as mãos próximas. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `remada-alta-2.png`

```
Crie uma NOVA imagem do exercício REMADA ALTA, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): em pé, braços estendidos segurando a barra na frente das coxas com as mãos próximas.
AGORA (esta imagem): barra puxada rente ao corpo até a altura do peito, cotovelos abertos para os lados e acima das mãos.

O que se move entre uma e outra: os braços e a barra. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os braços e a barra estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `remada-alta-3.png`

```
Crie uma NOVA imagem do exercício REMADA ALTA, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: em pé, braços estendidos segurando a barra na frente das coxas com as mãos próximas.
SEGUNDA imagem: barra puxada rente ao corpo até a altura do peito, cotovelos abertos para os lados e acima das mãos.
ESTA imagem: exatamente o meio entre as duas — os braços e a barra percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `remada-alta.mp4`

```
Anime o boneco de massinha da imagem fazendo REMADA ALTA.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (barra puxada rente ao corpo até a altura do peito, cotovelos abertos para os lados e acima das mãos) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os braços e a barra se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `remada-alta-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo REMADA ALTA em três momentos do movimento:

À ESQUERDA: em pé, braços estendidos segurando a barra na frente das coxas com as mãos próximas.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: barra puxada rente ao corpo até a altura do peito, cotovelos abertos para os lados e acima das mãos.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (barra olímpica curta), mesma câmera (vista frontal), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os braços e a barra.

MÚSCULO EM DESTAQUE nas três: ombros e trapézio na cor vermelha (#E63946).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `remada-alta-fases.png` na pasta.
## Braços

---

### 34. Rosca scott — `rosca-scott`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `rosca-scott-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício ROSCA SCOTT na POSIÇÃO INICIAL.

POSIÇÃO: sentado no banco scott, parte de trás dos braços apoiada no apoio inclinado, braços quase estendidos segurando a barra W embaixo.
EQUIPAMENTO: banco scott com apoio inclinado para os braços e barra W, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: bíceps na cor verde (#8AC926), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: sentado no banco scott, parte de trás dos braços apoiada no apoio inclinado, braços quase estendidos segurando a barra W embaixo. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `rosca-scott-2.png`

```
Crie uma NOVA imagem do exercício ROSCA SCOTT, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): sentado no banco scott, parte de trás dos braços apoiada no apoio inclinado, braços quase estendidos segurando a barra W embaixo.
AGORA (esta imagem): cotovelos dobrados, barra perto dos ombros, braços continuam apoiados.

O que se move entre uma e outra: os antebraços e a barra. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os antebraços e a barra estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `rosca-scott-3.png`

```
Crie uma NOVA imagem do exercício ROSCA SCOTT, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: sentado no banco scott, parte de trás dos braços apoiada no apoio inclinado, braços quase estendidos segurando a barra W embaixo.
SEGUNDA imagem: cotovelos dobrados, barra perto dos ombros, braços continuam apoiados.
ESTA imagem: exatamente o meio entre as duas — os antebraços e a barra percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `rosca-scott.mp4`

```
Anime o boneco de massinha da imagem fazendo ROSCA SCOTT.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (cotovelos dobrados, barra perto dos ombros, braços continuam apoiados) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os antebraços e a barra se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `rosca-scott-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo ROSCA SCOTT em três momentos do movimento:

À ESQUERDA: sentado no banco scott, parte de trás dos braços apoiada no apoio inclinado, braços quase estendidos segurando a barra W embaixo.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: cotovelos dobrados, barra perto dos ombros, braços continuam apoiados.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (banco scott com apoio inclinado para os braços e barra W), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os antebraços e a barra.

MÚSCULO EM DESTAQUE nas três: bíceps na cor verde (#8AC926).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `rosca-scott-fases.png` na pasta.
---

### 35. Rosca concentrada — `rosca-concentrada`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `rosca-concentrada-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício ROSCA CONCENTRADA na POSIÇÃO INICIAL.

POSIÇÃO: sentado na ponta do banco, pernas afastadas, tronco inclinado à frente, cotovelo direito apoiado na parte interna da coxa direita, braço estendido para baixo segurando o halter.
EQUIPAMENTO: banco reto e um halter, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: bíceps na cor verde (#8AC926), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista 3/4 frontal, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: sentado na ponta do banco, pernas afastadas, tronco inclinado à frente, cotovelo direito apoiado na parte interna da coxa direita, braço estendido para baixo segurando o halter. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `rosca-concentrada-2.png`

```
Crie uma NOVA imagem do exercício ROSCA CONCENTRADA, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): sentado na ponta do banco, pernas afastadas, tronco inclinado à frente, cotovelo direito apoiado na parte interna da coxa direita, braço estendido para baixo segurando o halter.
AGORA (esta imagem): cotovelo direito dobrado, halter na altura do ombro, cotovelo continua apoiado na coxa.

O que se move entre uma e outra: o antebraço direito e o halter. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se o antebraço direito e o halter estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `rosca-concentrada-3.png`

```
Crie uma NOVA imagem do exercício ROSCA CONCENTRADA, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: sentado na ponta do banco, pernas afastadas, tronco inclinado à frente, cotovelo direito apoiado na parte interna da coxa direita, braço estendido para baixo segurando o halter.
SEGUNDA imagem: cotovelo direito dobrado, halter na altura do ombro, cotovelo continua apoiado na coxa.
ESTA imagem: exatamente o meio entre as duas — o antebraço direito e o halter percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `rosca-concentrada.mp4`

```
Anime o boneco de massinha da imagem fazendo ROSCA CONCENTRADA.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (cotovelo direito dobrado, halter na altura do ombro, cotovelo continua apoiado na coxa) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas o antebraço direito e o halter se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `rosca-concentrada-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo ROSCA CONCENTRADA em três momentos do movimento:

À ESQUERDA: sentado na ponta do banco, pernas afastadas, tronco inclinado à frente, cotovelo direito apoiado na parte interna da coxa direita, braço estendido para baixo segurando o halter.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: cotovelo direito dobrado, halter na altura do ombro, cotovelo continua apoiado na coxa.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (banco reto e um halter), mesma câmera (vista 3/4 frontal), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: o antebraço direito e o halter.

MÚSCULO EM DESTAQUE nas três: bíceps na cor verde (#8AC926).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `rosca-concentrada-fases.png` na pasta.
---

### 36. Tríceps na corda — `triceps-corda`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `triceps-corda-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício TRÍCEPS NA CORDA na POSIÇÃO INICIAL.

POSIÇÃO: em pé de frente para a polia, cotovelos colados ao corpo e dobrados a 90 graus, segurando as pontas da corda na altura do peito.
EQUIPAMENTO: polia alta com corda, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: tríceps na cor verde (#8AC926), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: em pé de frente para a polia, cotovelos colados ao corpo e dobrados a 90 graus, segurando as pontas da corda na altura do peito. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `triceps-corda-2.png`

```
Crie uma NOVA imagem do exercício TRÍCEPS NA CORDA, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): em pé de frente para a polia, cotovelos colados ao corpo e dobrados a 90 graus, segurando as pontas da corda na altura do peito.
AGORA (esta imagem): braços estendidos para baixo, pontas da corda afastadas para os lados na altura das coxas.

O que se move entre uma e outra: os antebraços e a corda. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se os antebraços e a corda estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `triceps-corda-3.png`

```
Crie uma NOVA imagem do exercício TRÍCEPS NA CORDA, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: em pé de frente para a polia, cotovelos colados ao corpo e dobrados a 90 graus, segurando as pontas da corda na altura do peito.
SEGUNDA imagem: braços estendidos para baixo, pontas da corda afastadas para os lados na altura das coxas.
ESTA imagem: exatamente o meio entre as duas — os antebraços e a corda percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `triceps-corda.mp4`

```
Anime o boneco de massinha da imagem fazendo TRÍCEPS NA CORDA.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (braços estendidos para baixo, pontas da corda afastadas para os lados na altura das coxas) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas os antebraços e a corda se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `triceps-corda-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo TRÍCEPS NA CORDA em três momentos do movimento:

À ESQUERDA: em pé de frente para a polia, cotovelos colados ao corpo e dobrados a 90 graus, segurando as pontas da corda na altura do peito.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: braços estendidos para baixo, pontas da corda afastadas para os lados na altura das coxas.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (polia alta com corda), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: os antebraços e a corda.

MÚSCULO EM DESTAQUE nas três: tríceps na cor verde (#8AC926).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `triceps-corda-fases.png` na pasta.
## Glúteos e Posterior

---

### 37. Elevação pélvica — `elevacao-pelvica`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `elevacao-pelvica-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício ELEVAÇÃO PÉLVICA na POSIÇÃO INICIAL.

POSIÇÃO: sentado no chão com a parte alta das costas apoiada na lateral do banco, joelhos dobrados, pés no chão, barra sobre o quadril, quadril baixo perto do chão.
EQUIPAMENTO: banco reto e barra olímpica com uma anilha de cada lado, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: glúteos na cor magenta (#B5179E); parte de trás das coxas em roxo (#9B5CFF), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: sentado no chão com a parte alta das costas apoiada na lateral do banco, joelhos dobrados, pés no chão, barra sobre o quadril, quadril baixo perto do chão. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `elevacao-pelvica-2.png`

```
Crie uma NOVA imagem do exercício ELEVAÇÃO PÉLVICA, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): sentado no chão com a parte alta das costas apoiada na lateral do banco, joelhos dobrados, pés no chão, barra sobre o quadril, quadril baixo perto do chão.
AGORA (esta imagem): quadril elevado, tronco e coxas alinhados paralelos ao chão, joelhos dobrados a 90 graus.

O que se move entre uma e outra: o quadril e a barra. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se o quadril e a barra estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `elevacao-pelvica-3.png`

```
Crie uma NOVA imagem do exercício ELEVAÇÃO PÉLVICA, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: sentado no chão com a parte alta das costas apoiada na lateral do banco, joelhos dobrados, pés no chão, barra sobre o quadril, quadril baixo perto do chão.
SEGUNDA imagem: quadril elevado, tronco e coxas alinhados paralelos ao chão, joelhos dobrados a 90 graus.
ESTA imagem: exatamente o meio entre as duas — o quadril e a barra percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `elevacao-pelvica.mp4`

```
Anime o boneco de massinha da imagem fazendo ELEVAÇÃO PÉLVICA.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (quadril elevado, tronco e coxas alinhados paralelos ao chão, joelhos dobrados a 90 graus) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas o quadril e a barra se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `elevacao-pelvica-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo ELEVAÇÃO PÉLVICA em três momentos do movimento:

À ESQUERDA: sentado no chão com a parte alta das costas apoiada na lateral do banco, joelhos dobrados, pés no chão, barra sobre o quadril, quadril baixo perto do chão.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: quadril elevado, tronco e coxas alinhados paralelos ao chão, joelhos dobrados a 90 graus.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (banco reto e barra olímpica com uma anilha de cada lado), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: o quadril e a barra.

MÚSCULO EM DESTAQUE nas três: glúteos na cor magenta (#B5179E); parte de trás das coxas em roxo (#9B5CFF).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `elevacao-pelvica-fases.png` na pasta.
---

### 38. Agachamento búlgaro — `agachamento-bulgaro`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `agachamento-bulgaro-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício AGACHAMENTO BÚLGARO na POSIÇÃO INICIAL.

POSIÇÃO: em pé, peito do pé de trás apoiado no banco, pé da frente plantado no chão à frente, braços estendidos segurando os halteres ao lado do corpo.
EQUIPAMENTO: banco reto atrás do personagem e dois halteres, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: glúteos na cor magenta (#B5179E); quadríceps em roxo (#9B5CFF), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: em pé, peito do pé de trás apoiado no banco, pé da frente plantado no chão à frente, braços estendidos segurando os halteres ao lado do corpo. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `agachamento-bulgaro-2.png`

```
Crie uma NOVA imagem do exercício AGACHAMENTO BÚLGARO, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): em pé, peito do pé de trás apoiado no banco, pé da frente plantado no chão à frente, braços estendidos segurando os halteres ao lado do corpo.
AGORA (esta imagem): agachado, joelho da frente dobrado a 90 graus, joelho de trás perto do chão, tronco levemente inclinado à frente.

O que se move entre uma e outra: o corpo inteiro subindo e descendo. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se o corpo inteiro subindo e descendo estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `agachamento-bulgaro-3.png`

```
Crie uma NOVA imagem do exercício AGACHAMENTO BÚLGARO, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: em pé, peito do pé de trás apoiado no banco, pé da frente plantado no chão à frente, braços estendidos segurando os halteres ao lado do corpo.
SEGUNDA imagem: agachado, joelho da frente dobrado a 90 graus, joelho de trás perto do chão, tronco levemente inclinado à frente.
ESTA imagem: exatamente o meio entre as duas — o corpo inteiro subindo e descendo percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `agachamento-bulgaro.mp4`

```
Anime o boneco de massinha da imagem fazendo AGACHAMENTO BÚLGARO.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (agachado, joelho da frente dobrado a 90 graus, joelho de trás perto do chão, tronco levemente inclinado à frente) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas o corpo inteiro subindo e descendo se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `agachamento-bulgaro-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo AGACHAMENTO BÚLGARO em três momentos do movimento:

À ESQUERDA: em pé, peito do pé de trás apoiado no banco, pé da frente plantado no chão à frente, braços estendidos segurando os halteres ao lado do corpo.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: agachado, joelho da frente dobrado a 90 graus, joelho de trás perto do chão, tronco levemente inclinado à frente.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (banco reto atrás do personagem e dois halteres), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: o corpo inteiro subindo e descendo.

MÚSCULO EM DESTAQUE nas três: glúteos na cor magenta (#B5179E); quadríceps em roxo (#9B5CFF).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `agachamento-bulgaro-fases.png` na pasta.
---

### 39. Afundo — `afundo`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `afundo-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício AFUNDO na POSIÇÃO INICIAL.

POSIÇÃO: em pé com as pernas afastadas, uma à frente e outra atrás, tronco ereto, braços estendidos segurando os halteres ao lado do corpo.
EQUIPAMENTO: dois halteres, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: glúteos na cor magenta (#B5179E); quadríceps em roxo (#9B5CFF), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: em pé com as pernas afastadas, uma à frente e outra atrás, tronco ereto, braços estendidos segurando os halteres ao lado do corpo. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `afundo-2.png`

```
Crie uma NOVA imagem do exercício AFUNDO, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): em pé com as pernas afastadas, uma à frente e outra atrás, tronco ereto, braços estendidos segurando os halteres ao lado do corpo.
AGORA (esta imagem): os dois joelhos dobrados a 90 graus, joelho de trás perto do chão, tronco continua ereto.

O que se move entre uma e outra: o corpo inteiro subindo e descendo. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se o corpo inteiro subindo e descendo estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `afundo-3.png`

```
Crie uma NOVA imagem do exercício AFUNDO, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: em pé com as pernas afastadas, uma à frente e outra atrás, tronco ereto, braços estendidos segurando os halteres ao lado do corpo.
SEGUNDA imagem: os dois joelhos dobrados a 90 graus, joelho de trás perto do chão, tronco continua ereto.
ESTA imagem: exatamente o meio entre as duas — o corpo inteiro subindo e descendo percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `afundo.mp4`

```
Anime o boneco de massinha da imagem fazendo AFUNDO.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (os dois joelhos dobrados a 90 graus, joelho de trás perto do chão, tronco continua ereto) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas o corpo inteiro subindo e descendo se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `afundo-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo AFUNDO em três momentos do movimento:

À ESQUERDA: em pé com as pernas afastadas, uma à frente e outra atrás, tronco ereto, braços estendidos segurando os halteres ao lado do corpo.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: os dois joelhos dobrados a 90 graus, joelho de trás perto do chão, tronco continua ereto.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (dois halteres), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: o corpo inteiro subindo e descendo.

MÚSCULO EM DESTAQUE nas três: glúteos na cor magenta (#B5179E); quadríceps em roxo (#9B5CFF).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `afundo-fases.png` na pasta.
---

### 40. Stiff — `stiff`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `stiff-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício STIFF na POSIÇÃO INICIAL.

POSIÇÃO: em pé, joelhos levemente dobrados, barra segura na frente das coxas com os braços estendidos.
EQUIPAMENTO: barra olímpica com uma anilha de cada lado, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: parte de trás das coxas na cor roxa (#9B5CFF); glúteos em magenta (#B5179E), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: em pé, joelhos levemente dobrados, barra segura na frente das coxas com os braços estendidos. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `stiff-2.png`

```
Crie uma NOVA imagem do exercício STIFF, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): em pé, joelhos levemente dobrados, barra segura na frente das coxas com os braços estendidos.
AGORA (esta imagem): quadril empurrado para trás, tronco inclinado à frente com as costas retas, barra desceu rente às pernas até a altura das canelas.

O que se move entre uma e outra: o tronco e a barra, dobrando no quadril. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se o tronco e a barra, dobrando no quadril estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `stiff-3.png`

```
Crie uma NOVA imagem do exercício STIFF, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: em pé, joelhos levemente dobrados, barra segura na frente das coxas com os braços estendidos.
SEGUNDA imagem: quadril empurrado para trás, tronco inclinado à frente com as costas retas, barra desceu rente às pernas até a altura das canelas.
ESTA imagem: exatamente o meio entre as duas — o tronco e a barra, dobrando no quadril percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `stiff.mp4`

```
Anime o boneco de massinha da imagem fazendo STIFF.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (quadril empurrado para trás, tronco inclinado à frente com as costas retas, barra desceu rente às pernas até a altura das canelas) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas o tronco e a barra, dobrando no quadril se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `stiff-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo STIFF em três momentos do movimento:

À ESQUERDA: em pé, joelhos levemente dobrados, barra segura na frente das coxas com os braços estendidos.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: quadril empurrado para trás, tronco inclinado à frente com as costas retas, barra desceu rente às pernas até a altura das canelas.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (barra olímpica com uma anilha de cada lado), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: o tronco e a barra, dobrando no quadril.

MÚSCULO EM DESTAQUE nas três: parte de trás das coxas na cor roxa (#9B5CFF); glúteos em magenta (#B5179E).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `stiff-fases.png` na pasta.
## Corpo Inteiro

---

### 41. Abdominal — `abdominal`

**1 · Pose inicial** (Imagens, com a ficha anexada) → `abdominal-1.png`

```
Usando EXATAMENTE o personagem da ficha anexa, crie a imagem do exercício ABDOMINAL na POSIÇÃO INICIAL.

POSIÇÃO: deitado de costas no colchonete, joelhos dobrados, pés no chão, mãos cruzadas sobre o peito.
EQUIPAMENTO: colchonete no chão, em estilo 3D de massinha, cinza e preto, simples.
MÚSCULO EM DESTAQUE: abdômen na cor menta (#00E5A0), como massinha colorida por cima da pele, igual às artes de referência. O resto do corpo na cor normal.
CÂMERA: vista lateral, parada, enquadrando o corpo inteiro e o equipamento com folga em volta.

Técnica correta, como um professor de academia demonstraria. Fundo liso lilás claro (#E9E4FF), sem cenário, sem texto, sem setas. Formato 1:1.
```

Se a pose sair errada, responda na mesma conversa:

```
A posição não está certa. O correto é: deitado de costas no colchonete, joelhos dobrados, pés no chão, mãos cruzadas sobre o peito. Refaça mantendo o mesmo personagem, a mesma câmera, o mesmo enquadramento e o mesmo fundo.
```

**2 · Pose final** (mesma conversa) → `abdominal-2.png`

```
Crie uma NOVA imagem do exercício ABDOMINAL, agora na POSIÇÃO FINAL. Não edite a imagem anterior: use ela apenas como referência do personagem, do equipamento, da câmera, do enquadramento, da luz e do fundo — tudo isso continua igual. O que muda é a posição do corpo.

ANTES (imagem anterior): deitado de costas no colchonete, joelhos dobrados, pés no chão, mãos cruzadas sobre o peito.
AGORA (esta imagem): tronco enrolado para cima, ombros e parte alta das costas fora do chão, lombar continua no chão.

O que se move entre uma e outra: o tronco. Desenhe esse movimento completo, até o fim: a diferença entre as duas imagens tem que ser visível de longe. O resto do corpo fica como estava.

CONFIRA ANTES DE RESPONDER: compare a sua imagem com a anterior. Se o tronco estiverem no mesmo lugar, a imagem está errada — refaça levando o movimento até o fim.
Formato 1:1.
```

**3 · Pose do meio** (mesma conversa) → `abdominal-3.png`

```
Crie uma NOVA imagem do exercício ABDOMINAL, agora no MEIO DO CAMINHO. Personagem, equipamento, câmera, enquadramento, luz e fundo continuam iguais aos das duas imagens anteriores; muda só a posição do corpo.

PRIMEIRA imagem: deitado de costas no colchonete, joelhos dobrados, pés no chão, mãos cruzadas sobre o peito.
SEGUNDA imagem: tronco enrolado para cima, ombros e parte alta das costas fora do chão, lombar continua no chão.
ESTA imagem: exatamente o meio entre as duas — o tronco percorreram metade do caminho. Não é o começo nem o fim: é a metade.

CONFIRA ANTES DE RESPONDER: esta imagem tem que ser diferente das duas anteriores. Se ficar igual a uma delas, refaça no meio.
Formato 1:1.
```

**4 · Vídeo** (Vídeos, anexando a pose inicial) → `abdominal.mp4`

```
Anime o boneco de massinha da imagem fazendo ABDOMINAL.

ENQUADRAMENTO (o mais importante): plano aberto, câmera longe, igual ao da imagem. O boneco aparece INTEIRO, da cabeça aos pés, junto com o equipamento inteiro, e ocupa no máximo 70% da altura do quadro, centralizado e com folga nas quatro bordas. A câmera fica imóvel do primeiro ao último quadro: não aproxima, não afasta, não acompanha o movimento, não corta. Nada de close no músculo.

MOVIMENTO: parte da posição da imagem, vai até a fase final (tronco enrolado para cima, ombros e parte alta das costas fora do chão, lombar continua no chão) e volta devagar à posição inicial. Faça 2 repetições completas, em ritmo lento e controlado, com técnica correta. Comece parado 1 segundo na posição inicial, pare 1 segundo entre as repetições e termine parado 1 segundo na mesma posição inicial.

REGRAS: o personagem, o equipamento, as cores e o fundo lilás não mudam. Apenas o tronco se movem; o resto do corpo fica firme. Sem texto, sem pessoas extras, sem música, sem som.
```

Se o vídeo sair aproximado, responda na mesma conversa:

```
Ficou aproximado demais e cortou parte do boneco. Refaça com a câmera bem mais longe: o corpo inteiro, da cabeça aos pés, dentro do quadro com folga, ocupando no máximo 70% da altura. Mesma pose, mesmo movimento, câmera imóvel.
```

**Plano B das poses — as 3 fases numa imagem só** (use quando a edição devolver a mesma posição) → `abdominal-fases.png`

```
Crie UMA única imagem, no formato 3:1 (bem mais larga que alta), dividida em três partes iguais lado a lado, com o mesmo boneco da ficha fazendo ABDOMINAL em três momentos do movimento:

À ESQUERDA: deitado de costas no colchonete, joelhos dobrados, pés no chão, mãos cruzadas sobre o peito.
NO MEIO: exatamente a metade do caminho entre a da esquerda e a da direita.
À DIREITA: tronco enrolado para cima, ombros e parte alta das costas fora do chão, lombar continua no chão.

Nas três partes tudo é igual — mesmo personagem, mesmo equipamento (colchonete no chão), mesma câmera (vista lateral), mesmo tamanho do boneco, mesma luz e fundo liso lilás claro (#E9E4FF). A única diferença entre elas é a posição: o tronco.

MÚSCULO EM DESTAQUE nas três: abdômen na cor menta (#00E5A0).
Sem linhas divisórias, sem moldura, sem texto, sem números, sem setas.
```

O script corta as três partes sozinho: basta salvar como `abdominal-fases.png` na pasta.