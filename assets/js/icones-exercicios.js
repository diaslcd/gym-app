/* Pictogramas de exercício.
   Família visual: vista de perfil (frontal só quando o movimento é
   lateral), figura de traço 1.7, cabeça cheia de raio 1.6, equipamento
   no mesmo traço e uma seta indicando a direção do movimento. */
const IconesExercicios = (() => {
  const svg = (conteudo) =>
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + conteudo + '</svg>';

  /* ── Peças reutilizáveis ─────────────────────────────── */

  const cabeca = (x, y) =>
    `<circle cx="${x}" cy="${y}" r="1.6" fill="currentColor" stroke="none"/>`;

  /** Banco: tábua com dois pés. */
  const banco = (x1, x2, y) =>
    `<path d="M${x1} ${y}h${x2 - x1}"/>` +
    `<path d="M${x1 + 1.5} ${y}v${21 - y}M${x2 - 1.5} ${y}v${21 - y}"/>`;

  /** Barra com anilhas nas pontas. */
  const barra = (x1, x2, y) =>
    `<path d="M${x1} ${y}h${x2 - x1}"/>` +
    `<path d="M${x1 + 0.8} ${y - 1.9}v3.8M${x2 - 0.8} ${y - 1.9}v3.8"/>`;

  /** Halter visto de lado: barra curta entre dois blocos. */
  const halter = (x, y) =>
    `<path d="M${x - 2.2} ${y}h4.4"/>` +
    `<path d="M${x - 2.2} ${y - 1.5}v3M${x + 2.2} ${y - 1.5}v3"/>`;

  /** Halter em pegada neutra: bloco vertical. */
  const halterVertical = (x, y) =>
    `<path d="M${x} ${y - 2.2}v4.4"/>` +
    `<path d="M${x - 1.5} ${y - 2.2}h3M${x - 1.5} ${y + 2.2}h3"/>`;

  /** Torre de polia: travessão no topo e cabo descendo. */
  const cabo = (x, ate) =>
    `<path d="M${x - 3} 2.4h6"/><path d="M${x} 2.4V${ate}"/>`;

  /** Pilha de pesos da máquina. */
  const pilha = (x, y) =>
    `<path d="M${x - 2} ${y}h4M${x - 2} ${y + 2.4}h4M${x - 2} ${y + 4.8}h4"/>`;

  const setaCima = (x, y) => `<path d="M${x} ${y + 3.4}V${y}M${x - 1.4} ${y + 1.4} ${x} ${y} ${x + 1.4} ${y + 1.4}"/>`;
  const setaBaixo = (x, y) => `<path d="M${x} ${y}v3.4M${x - 1.4} ${y + 2} ${x} ${y + 3.4} ${x + 1.4} ${y + 2}"/>`;
  const setaEsq = (x, y) => `<path d="M${x + 3.4} ${y}H${x}M${x + 1.4} ${y - 1.4} ${x} ${y} ${x + 1.4} ${y + 1.4}"/>`;
  const setaDir = (x, y) => `<path d="M${x} ${y}h3.4M${x + 2} ${y - 1.4} ${x + 3.4} ${y} ${x + 2} ${y + 1.4}"/>`;

  /* ── Exercícios ──────────────────────────────────────── */

  const desenhos = {
    // ── Peito ──────────────────────────────────────────
    'supino-reto': svg(
      banco(4, 16, 15) +
      cabeca(5.4, 12.6) +
      '<path d="M7.2 13.4h6.6l2.4 3.4"/>' +
      '<path d="M9 13.2 9.4 8.6M12.6 13.2 12.2 8.6"/>' +
      barra(6, 18, 8) +
      setaCima(20.4, 9)
    ),

    'supino-inclinado': svg(
      '<path d="M4.6 19.4 12.6 11"/>' +
      '<path d="M12.6 11h3.6l1.6 3.2"/>' +
      '<path d="M6.6 19.4h9"/>' +
      cabeca(6.4, 16.6) +
      '<path d="m8.6 14.6 1.4-4M12 12.6l.6-3.6"/>' +
      barra(7, 17, 7.4) +
      setaCima(20.4, 8.4)
    ),

    'crucifixo': svg(
      banco(4, 16, 16) +
      cabeca(5.4, 13.6) +
      '<path d="M7.2 14.4h6.6l2.4 3"/>' +
      '<path d="M10 14.2c-1 -3 1 -5.6 4-6"/>' +
      halter(16, 7.4) +
      '<path d="M13.6 4.6a7 7 0 0 1 4.8 3" stroke-dasharray="0.1 2.6"/>' +
      setaDir(18.6, 11.6)
    ),

    'crossover': svg(
      '<path d="M3 2.6h4M21 2.6h-4"/>' +
      '<path d="M5 2.6 9.6 10M19 2.6 14.4 10"/>' +
      cabeca(12, 4.6) +
      '<path d="M12 6.6v7.4M9.6 10h4.8"/>' +
      '<path d="M12 14 9.8 21M12 14l2.2 7"/>' +
      setaDir(6.4, 13.4) + setaEsq(15.6, 13.4)
    ),

    'triceps-pulley': svg(
      cabo(17.4, 9) +
      cabeca(8.4, 5.4) +
      '<path d="M8.6 7.2 9 14M9 14l-1.4 7M9 14l2.4 7"/>' +
      '<path d="M8.8 8.6 12 11.6l5.4-2.4"/>' +
      '<path d="m12 11.6 5.4 3.4"/>' +
      setaBaixo(20.6, 10.4)
    ),

    'triceps-frances': svg(
      cabeca(8.4, 8.4) +
      '<path d="M8.6 10.2 9 17M9 17l-1.6 4M9 17l2.6 4"/>' +
      '<path d="M9 10.6 11 5.2"/>' +
      '<path d="M11 5.2 8 3.2"/>' +
      halter(6.6, 2.8) +
      setaCima(14.4, 3.6)
    ),

    'triceps-testa': svg(
      banco(4, 16, 16) +
      cabeca(5.6, 13.6) +
      '<path d="M7.4 14.4h6.4l2.2 3"/>' +
      // cotovelos apontando para cima, antebraço dobrando até a testa
      '<path d="M9.6 14.2 10.2 7.2"/>' +
      '<path d="M10.2 7.2 6.4 5.4"/>' +
      barra(3.4, 9.4, 4.8) +
      '<path d="M12.4 6a5 5 0 0 0-3.6-2.2" stroke-dasharray="0.1 2.2"/>' +
      setaCima(14.4, 4)
    ),

    // ── Costas e bíceps ────────────────────────────────
    'puxada-frontal': svg(
      cabo(12, 7) +
      barra(6.6, 17.4, 7) +
      cabeca(9.6, 10.4) +
      '<path d="M9.8 12.2v3.6h4.6"/>' +
      '<path d="M14.4 15.8v4.4"/>' +
      '<path d="M9.8 12.6 7.8 7.4M11.6 12.4l2.6-5"/>' +
      '<path d="M6.6 15.8h3.2"/>' +
      setaBaixo(20.4, 10.4)
    ),

    'remada-baixa': svg(
      cabeca(7.6, 8.4) +
      '<path d="M7.8 10.2v4.4h5.6"/>' +
      '<path d="M13.4 14.6h4.6"/>' +
      '<path d="M9 12.4h3.6"/>' +
      '<path d="M12.6 12.4 20 13.6"/>' +
      pilha(20.4, 15) +
      '<path d="M4.6 14.6v6"/>' +
      setaEsq(9.6, 5.6)
    ),

    'remada-articulada': svg(
      '<path d="M15.4 3.4v17.2"/>' +
      '<path d="M15.4 8.4h-2.6"/>' +
      cabeca(9.4, 6.4) +
      '<path d="M9.6 8.2v6.4h3.6"/>' +
      '<path d="M13.2 14.6v5.6"/>' +
      '<path d="M9.8 9.4 5.6 11M9.8 11.6 5.6 13"/>' +
      '<path d="M5.6 9.6v3.8"/>' +
      setaDir(3 - 0.4, 7.2)
    ),

    // Braços retos varrendo de cima para baixo — separa do tríceps,
    // que mantém os cotovelos presos ao tronco.
    'pulldown': svg(
      cabo(14, 5.4) +
      '<path d="M12.6 5.4h2.8"/>' +
      '<path d="M13.2 5.6 12.8 8.8M14.8 5.6l.4 3.2"/>' +
      cabeca(7.4, 6.2) +
      '<path d="M7.6 8 8 14.6M8 14.6l-1.4 6.4M8 14.6l2.6 6.4"/>' +
      '<path d="M8 9.4 14 12.4"/>' +
      '<path d="M14.6 8.8a5.6 5.6 0 0 1 .2 4.2" stroke-dasharray="0.1 2.2"/>' +
      setaBaixo(19.8, 9.4)
    ),

    'rosca-direta': svg(
      cabeca(8.4, 5) +
      '<path d="M8.6 6.8 9 14M9 14l-1.4 7M9 14l2.4 7"/>' +
      '<path d="M9 8.4v4.6"/>' +
      '<path d="M9 13 14.6 11.4"/>' +
      barra(12.4, 19.4, 11) +
      '<path d="M11.6 15.2a4.4 4.4 0 0 1 3.4-3.6" stroke-dasharray="0.1 2.4"/>' +
      setaCima(21, 12.6)
    ),

    'rosca-alternada': svg(
      cabeca(12, 4.6) +
      '<path d="M12 6.4v7.6M12 14l-2 7M12 14l2 7"/>' +
      '<path d="M12 8 8.6 11.4l1 3.6"/>' +
      '<path d="M12 8l3.4 3.4-.4 3.4"/>' +
      halter(9.4, 15.6) +
      halter(15.2, 7.4) +
      setaCima(20.4, 10) + setaBaixo(3.6, 10)
    ),

    'rosca-martelo': svg(
      cabeca(8.4, 5) +
      '<path d="M8.6 6.8 9 14M9 14l-1.4 7M9 14l2.4 7"/>' +
      '<path d="M9 8.4 12.4 11.6"/>' +
      '<path d="M12.4 11.6 13.8 7.4"/>' +
      halterVertical(14.2, 5.8) +
      setaCima(19.6, 8.6)
    ),

    // ── Perna ──────────────────────────────────────────
    'agachamento': svg(
      barra(4.6, 15.6, 7.4) +
      cabeca(11, 5.6) +
      '<path d="M10.6 7.6 10 12.6l4.4 2.6"/>' +
      '<path d="M14.4 15.2 9 18.4v2.6"/>' +
      '<path d="M8.4 21h8.4"/>' +
      setaBaixo(19.4, 9.4)
    ),

    'leg-press': svg(
      '<path d="M20 6 12.4 13.6"/>' +
      '<path d="M18 4.4 21.6 8"/>' +
      cabeca(5.4, 16.6) +
      '<path d="M7.2 17h4.4"/>' +
      '<path d="M4 19.4h9"/>' +
      '<path d="M9.4 16.6 13.4 13M12.4 18.2l3.4-3.4"/>' +
      '<path d="m13.4 13 3 1.8"/>' +
      setaDir(15.4, 19) + setaCima(4.4, 8.6)
    ),

    'cadeira-extensora': svg(
      '<path d="M4.6 6.6v14"/>' +
      cabeca(7, 8.4) +
      '<path d="M7.2 10.2v4.4h5"/>' +
      '<path d="M12.2 14.6 17 10.6"/>' +
      `<circle cx="18" cy="9.6" r="1.7" fill="currentColor" stroke="none"/>` +
      '<path d="M4.6 14.6h3"/>' +
      '<path d="M13.4 17.6a6 6 0 0 0 3.4-4.6" stroke-dasharray="0.1 2.4"/>' +
      setaCima(20.6, 12.4)
    ),

    'mesa-flexora': svg(
      '<path d="M3.4 15h13"/>' +
      '<path d="M5.4 15v5.6M14.6 15v5.6"/>' +
      cabeca(4.6, 12.6) +
      '<path d="M6.4 13.4h8.2"/>' +
      '<path d="M14.6 13.4 18.4 9.4"/>' +
      `<circle cx="19.4" cy="8.4" r="1.7" fill="currentColor" stroke="none"/>` +
      setaCima(21.2, 12.4)
    ),

    'cadeira-flexora': svg(
      '<path d="M4.6 4.6v16"/>' +
      cabeca(7, 7.4) +
      '<path d="M7.2 9.2v4.4h5.4"/>' +
      '<path d="M12.6 13.6 15 18.4"/>' +
      `<circle cx="15.8" cy="19.6" r="1.7" fill="currentColor" stroke="none"/>` +
      '<path d="M4.6 13.6h3"/>' +
      setaBaixo(19.8, 13)
    ),

    'panturrilha': svg(
      '<path d="M3.4 20.6h7.4v-3.4H17"/>' +
      cabeca(13.4, 5.4) +
      '<path d="M13.6 7.2 14 13.4"/>' +
      '<path d="M14 13.4 12.6 17.2"/>' +
      '<path d="M12.6 17.2h3.2"/>' +
      '<path d="M14.6 8.6 17 12"/>' +
      setaCima(19.8, 8.4)
    ),

    'hack-squat': svg(
      '<path d="M20.4 3.4 8 15.8"/>' +
      '<path d="M18.4 8.4 21.4 11.4"/>' +
      '<path d="M4.6 20.6h10"/>' +
      cabeca(15.4, 8.2) +
      '<path d="m14.2 9.8-3.2 3.2 3.4 2.6"/>' +
      '<path d="M14.4 15.6 9.6 18.2v2.4"/>' +
      setaBaixo(4.6, 8) + setaCima(6.6, 8)
    ),

    'chest-press': svg(
      '<path d="M18.4 4.6v16"/>' +
      '<path d="M18.4 10.4h-3.4"/>' +
      cabeca(7.4, 7.4) +
      '<path d="M7.6 9.2v5.4h4.6"/>' +
      '<path d="M12.2 14.6v5.6"/>' +
      '<path d="M4.6 14.6h3"/>' +
      '<path d="M8 10.4 12 12l3-1.6"/>' +
      setaDir(3.4, 6.4)
    ),

    'crucifixo-maquina': svg(
      '<path d="M12 2.6v4"/>' +
      cabeca(12, 8.4) +
      '<path d="M12 10.2v5.4M12 15.6l-2 5.4M12 15.6l2 5.4"/>' +
      '<path d="M12 11.4 6.6 9.4M12 11.4l5.4-2"/>' +
      '<path d="M6.6 6.4v5.4M17.4 6.4v5.4"/>' +
      setaDir(3.4, 14.4) + setaEsq(17.2, 14.4)
    ),

    'barra-fixa': svg(
      '<path d="M3 3.4h18"/>' +
      cabeca(12, 8.4) +
      '<path d="M12 10.2v6.2M12 16.4l-1.6 4.4M12 16.4l1.6 4.4"/>' +
      '<path d="M12 10.6 8.6 3.6M12 10.6l3.4-7"/>' +
      setaCima(19.4, 11.4)
    ),

    'afundo': svg(
      cabeca(11, 4.6) +
      '<path d="M11 6.4v6.2"/>' +
      '<path d="M11 12.6 6.6 16.4v4.2"/>' +
      '<path d="M11 12.6 16 15.6v5"/>' +
      '<path d="M6.6 16.4H4.4"/>' +
      halter(8.2, 11.4) +
      halter(14.4, 11.4) +
      setaBaixo(20.4, 8.4)
    ),

    'stiff': svg(
      cabeca(7.4, 5.4) +
      '<path d="M7.8 7.2 13 10.4"/>' +
      '<path d="M13 10.4v4.2l-.6 6"/>' +
      '<path d="M10.6 8.8v6.4"/>' +
      barra(6.4, 14.4, 15.4) +
      '<path d="M16.4 8.6a6 6 0 0 1-1.6 4.4" stroke-dasharray="0.1 2.2"/>' +
      setaCima(19.4, 10.4)
    ),

    // ── Superiores (exclusivos) ────────────────────────
    'remada': svg(
      cabeca(7.4, 6.4) +
      '<path d="M7.8 8.2 13 11.4"/>' +
      '<path d="M13 11.4v3.4l-1.4 6M13 14.8l2.6 5.8"/>' +
      '<path d="M10.4 9.8v4.4"/>' +
      barra(6.4, 14.4, 14.2) +
      setaCima(18.4, 11.4)
    ),

    'desenvolvimento': svg(
      cabeca(12, 8.6) +
      '<path d="M12 10.4v5.6M12 16l-2 5M12 16l2 5"/>' +
      '<path d="M12 11.6 8.6 8.6 8.6 5M12 11.6l3.4-3 0 -3"/>' +
      halter(8.6, 3.6) +
      halter(15.4, 3.6) +
      setaCima(20.4, 6.6)
    ),

    'elevacao-lateral': svg(
      cabeca(12, 5) +
      '<path d="M12 6.8v7.4M12 14.2l-2 6.8M12 14.2l2 6.8"/>' +
      '<path d="M12 9 5.8 10.6M12 9l6.2 1.6"/>' +
      halter(4.6, 10.4) +
      halter(19.4, 10.4) +
      '<path d="M6.4 14.4a7 7 0 0 1-1.6-2.6" stroke-dasharray="0.1 2.2"/>' +
      setaCima(4.6, 5.6) + setaCima(19.4, 5.6)
    ),

    // Ombros subindo em direção às orelhas, halteres pendurados.
    'encolhimento': svg(
      cabeca(12, 5.4) +
      '<path d="M12 7.2v7M12 14.2l-2 6.6M12 14.2l2 6.6"/>' +
      '<path d="M8.6 9.2 8.6 15M15.4 9.2 15.4 15"/>' +
      '<path d="M8.6 9.2h6.8"/>' +
      halter(8.6, 16) +
      halter(15.4, 16) +
      setaCima(5.6, 7.4) + setaCima(18.4, 7.4)
    ),

    // Tronco inclinado à frente, braços abrindo para trás.
    'crucifixo-inverso': svg(
      cabeca(7.4, 9.8) +
      '<path d="M9.2 10.6h6.6M15.8 10.6l1.4 5.2M10.4 12.4v3.6"/>' +
      '<path d="M12.4 11.4 8 15.6M12.4 11.4l4.2 4.2"/>' +
      halter(7.2, 16.4) +
      halter(17.4, 16.4) +
      setaCima(4.6, 11.4) + setaCima(20, 11.4)
    ),

    // Tronco enrolando em direção aos joelhos.
    'abdominal': svg(
      banco(3.4, 20.6, 18.4) +
      cabeca(7.6, 11.4) +
      '<path d="M9.2 12.4 13.4 15.6M13.4 15.6h3.6M17 15.6l1.6-3.4"/>' +
      '<path d="M9.2 12.4 6.4 9.6"/>' +
      setaCima(7.6, 6.6)
    )
  };

  // Exercícios que repetem um movimento já desenhado. Mudam o
  // equipamento ou o lado, não a mecânica — o pictograma é o mesmo
  // de propósito, e o texto do equipamento faz a diferenciação.
  const equivalentes = {
    supino: 'supino-reto',
    puxada: 'puxada-frontal',
    rosca: 'rosca-direta',
    triceps: 'triceps-pulley',

    // Peito
    'supino-halteres': 'supino-reto',
    'supino-smith': 'supino-reto',
    'supino-declinado': 'supino-reto',
    'flexao': 'supino-reto',
    'supino-incl-halter': 'supino-inclinado',
    'crucifixo-inclinado': 'crucifixo',
    'crossover-baixo': 'crossover',

    // Tríceps
    'triceps-corda': 'triceps-pulley',
    'triceps-maquina': 'triceps-pulley',
    'triceps-unilateral': 'triceps-pulley',
    'triceps-coice': 'triceps-frances',
    'triceps-testa-halt': 'triceps-testa',
    'mergulho-banco': 'triceps-testa',

    // Dorsais
    'puxada-neutra': 'puxada-frontal',
    'pullover': 'pulldown',
    'remada-serrote': 'remada',
    'remada-halteres': 'remada',
    'remada-cavalinho': 'remada-baixa',
    'remada-unilateral': 'remada-articulada',

    // Bíceps
    'rosca-scott': 'rosca-direta',
    'rosca-polia': 'rosca-direta',
    'rosca-inversa': 'rosca-direta',
    'rosca-corda': 'rosca-martelo',
    'rosca-concentrada': 'rosca-alternada',
    'rosca-inclinada': 'rosca-alternada',

    // Quadríceps
    'agachamento-smith': 'agachamento',
    'agachamento-frontal': 'agachamento',
    'agachamento-bulgaro': 'afundo',
    'passada': 'afundo',
    'extensora-unilateral': 'cadeira-extensora',

    // Posteriores
    'stiff-halteres': 'stiff',
    'terra': 'stiff',
    'elevacao-pelvica': 'stiff',
    'flexora-em-pe': 'cadeira-flexora',

    // Panturrilhas
    'panturrilha-sentado': 'panturrilha',
    'panturrilha-smith': 'panturrilha',
    'panturrilha-livre': 'panturrilha',
    'panturrilha-leg': 'leg-press',

    // Ombros
    'desenvolvimento-maq': 'desenvolvimento',
    'desenvolvimento-barra': 'desenvolvimento',
    'arnold': 'desenvolvimento',
    'elevacao-polia': 'elevacao-lateral',
    'elevacao-frontal': 'elevacao-lateral',
    'elevacao-maquina': 'elevacao-lateral',
    'remada-alta': 'elevacao-lateral',
    'encolhimento-barra': 'encolhimento',
    'encolhimento-smith': 'encolhimento',
    'crucifixo-inv-maq': 'crucifixo-inverso',
    'prancha': 'abdominal',
    'elevacao-pernas': 'abdominal',
    'abdominal-maquina': 'abdominal',
    'abdominal-infra': 'abdominal'
  };



  /** Movimento base do exercício: ele mesmo ou o que ele repete. */
  function baseDe(id) {
    if (desenhos[id]) return id;
    return equivalentes[id] || null;
  }

  /** Pictograma do exercício pelo identificador. */
  function porId(id) {
    const base = baseDe(id);
    return base ? desenhos[base] : '';
  }

  return { porId, baseDe };
})();
