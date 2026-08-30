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
   Descomente conforme os arquivos entrarem em assets/treinos/. */
// Ilustracoes.definir('peito-triceps', 'assets/treinos/peito-triceps.png');
// Ilustracoes.definir('costas-biceps', 'assets/treinos/costas-biceps.png');
// Ilustracoes.definir('perna', 'assets/treinos/perna.png');
// Ilustracoes.definir('superiores', 'assets/treinos/superiores.png');
