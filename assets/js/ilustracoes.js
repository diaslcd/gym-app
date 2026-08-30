/* Encaixe de arte para os tipos de treino.
   Enquanto não houver imagem cadastrada, a tela de seleção continua
   usando o pictograma do músculo — mesma ideia do módulo Demonstracao. */
const Ilustracoes = (() => {
  const mapa = {};

  /** Registra a arte de um treino: Ilustracoes.definir('perna', 'assets/treinos/perna.png'). */
  function definir(tipoId, caminho) {
    mapa[tipoId] = caminho;
  }

  function de(tipoId) {
    return mapa[tipoId] || null;
  }

  return { definir, de };
})();

/* ── Arte de cada treino ──────────────────────────────────
   Renders do fliperama, um por treino. */
Ilustracoes.definir('peito-triceps', 'assets/treinos/peito-triceps.webp');
Ilustracoes.definir('costas-biceps', 'assets/treinos/costas-biceps.webp');
Ilustracoes.definir('perna', 'assets/treinos/perna.webp');
Ilustracoes.definir('superiores', 'assets/treinos/superiores.webp');
