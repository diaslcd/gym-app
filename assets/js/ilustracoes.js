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
   Renders 3D em massinha, um por treino, recortados de arte-fonte/ por
   scripts/recortar-treinos.ps1. Treino sem linha aqui mostra o pictograma. */
Ilustracoes.definir('peito-triceps', 'assets/treinos/peito-triceps.jpg');
Ilustracoes.definir('costas-biceps', 'assets/treinos/costas-biceps.jpg');
Ilustracoes.definir('perna', 'assets/treinos/perna.jpg');
Ilustracoes.definir('superiores', 'assets/treinos/superiores.jpg');
Ilustracoes.definir('empurrar', 'assets/treinos/empurrar.jpg');
Ilustracoes.definir('puxar', 'assets/treinos/puxar.jpg');
Ilustracoes.definir('ombro-trapezio', 'assets/treinos/ombro-trapezio.jpg');
Ilustracoes.definir('bracos', 'assets/treinos/bracos.jpg');
Ilustracoes.definir('gluteos-posterior', 'assets/treinos/gluteos-posterior.jpg');
Ilustracoes.definir('corpo-inteiro', 'assets/treinos/corpo-inteiro.jpg');
