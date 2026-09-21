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

{{CHECKLIST}}
