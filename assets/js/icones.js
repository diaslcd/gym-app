/* Ícones em SVG inline (herdam a cor do elemento pai). */
const Icones = (() => {
  const base = (conteudo) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${conteudo}</svg>`;

  const equipamentos = {
    barra: base('<path d="M2 12h2.5M19.5 12H22M6 8v8M18 8v8M9.5 10v4M14.5 10v4M9.5 12h5"/>'),
    halteres: base('<rect x="3" y="8.5" width="4" height="7" rx="1.4"/><rect x="17" y="8.5" width="4" height="7" rx="1.4"/><path d="M7 12h10"/>'),
    polia: base('<path d="M3 3.5h18"/><circle cx="12" cy="6.6" r="1.6"/><path d="M12 8.2v4.6M7.5 12.8h9M9.5 12.8v3.2M14.5 12.8v3.2"/>'),
    maquina: base('<path d="M6 3v18M18 3v18M6 3.5h12M12 3.5v3.5"/><rect x="8.5" y="7" width="7" height="2.6" rx="1"/><rect x="8.5" y="10.6" width="7" height="2.6" rx="1"/><rect x="8.5" y="14.2" width="7" height="2.6" rx="1"/>')
  };

  /** Troféu, usado no indicador de recorde. */
  const trofeu = base(
    '<path d="M7 4h10v5.4a5 5 0 0 1-10 0V4Z"/>' +
    '<path d="M7 5.9H4.4v1.2a3.6 3.6 0 0 0 3.2 3.5"/>' +
    '<path d="M17 5.9h2.6v1.2a3.6 3.6 0 0 1-3.2 3.5"/>' +
    '<path d="M12 14.4v2.4M9.4 20h5.2M10.3 16.8h3.4"/>'
  );

  /** Chama usada para indicar sequência de treinos. */
  const chama =
    '<svg class="ico-chama" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path class="chama__corpo" d="M12.6 1.5c.9 2.7-.1 4.7-1.4 6.4-.4-.8-.7-1.6-.8-2.5-1.6 1.7-2.6 3.3-3.2 4.9' +
    '-.6-.5-1-1.2-1.2-2C4.6 10.6 3.9 13 3.9 15.4c0 4.6 3.6 8 8.1 8s8.1-3.4 8.1-8' +
    'c0-2.9-1.2-5.2-2.8-7.3-.3 1.1-.9 1.9-1.8 2.4.4-3.7-1-6.9-2.9-9Z" ' +
    'fill="#FF9F0A" stroke="#12101A" stroke-width="1.7" stroke-linejoin="round"/>' +
    '<path class="chama__nucleo" d="M12 13c1.8 1.8 2.8 3.2 2.8 4.7 0 1.7-1.3 3-2.8 3s-2.8-1.3-2.8-3c0-1.5 1-2.9 2.8-4.7Z" ' +
    'fill="#FFD23F" stroke="#12101A" stroke-width="1.5" stroke-linejoin="round"/>' +
    '</svg>';


  /** Setas cruzadas: substituir por outro exercício. */
  const trocar = base(
    '<path d="M3.6 9h13.2l-3.4-3.4"/>' +
    '<path d="M20.4 15H7.2l3.4 3.4"/>'
  );

  /** Lixeira: tirar o exercício do treino de hoje. */
  const remover = base(
    '<path d="M4.4 6.8h15.2"/>' +
    '<path d="M9.6 6.8V5.4a1.2 1.2 0 0 1 1.2-1.2h2.4a1.2 1.2 0 0 1 1.2 1.2v1.4"/>' +
    '<path d="M6.8 6.8 7.6 19a1.8 1.8 0 0 0 1.8 1.7h5.2a1.8 1.8 0 0 0 1.8-1.7l.8-12.2"/>'
  );

  /** Floco: marca a falta que derrubou a sequência. */
  const floco = (() => {
    const eixos = 'M12 2.6v18.8M4.1 7.3l15.8 9.4M19.9 7.3 4.1 16.7';
    return '<svg class="ico-floco" viewBox="0 0 24 24" aria-hidden="true">' +
      '<g fill="none" stroke-linecap="round" stroke-linejoin="round">' +
      `<path d="${eixos}" stroke="#12101A" stroke-width="6.4"/>` +
      `<path d="${eixos}" stroke="#5BC8F5" stroke-width="3.4"/>` +
      '</g>' +
      '<circle class="floco__centro" cx="12" cy="12" r="2.9" fill="#FFFFFF" stroke="#12101A" stroke-width="1.7"/>' +
      '</svg>';
  })();

  /** Cadeado: título que a sequência ainda não alcançou. */
  const cadeado = base(
    '<rect x="4.6" y="10.4" width="14.8" height="9.6" rx="2.4"/>' +
    '<path d="M8.4 10.4V7.8a3.6 3.6 0 0 1 7.2 0v2.6"/>' +
    '<path d="M12 14.2v2.4"/>'
  );



  /* ── Músculos trabalhados em cada treino ─────────────── */
  const corpo = (conteudo) =>
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<g stroke="#12101A" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round">' +
    conteudo +
    '</g></svg>';

  // Tronco visto de frente, base de três dos quatro ícones.
  const TRONCO =
    '<circle cx="12" cy="3.4" r="2.4" fill="#fff"/>' +
    '<path d="M8.4 6.6h7.2c2.3 0 4.1 1.7 4.4 4l.4 3.3-3 .6-.5-3v9.2c0 .4-.3.7-.7.7H7.8' +
    'c-.4 0-.7-.3-.7-.7v-9.2l-.5 3-3-.6.4-3.3c.3-2.3 2.1-4 4.4-4Z" fill="#fff"/>';

  // Regiões destacadas, reaproveitadas entre os treinos que as compartilham.
  const PEITO =
    '<path d="M11.4 9.1v3.7c0 .6-.5 1.1-1.1 1.1H8.4c-1.1 0-2-.9-2-2v-1.5c0-.7.5-1.2 1.2-1.3' +
    'l2.5-.3c.7-.1 1.3.4 1.3 1.3Z" fill="currentColor"/>' +
    '<path d="M12.6 9.1v3.7c0 .6.5 1.1 1.1 1.1h1.9c1.1 0 2-.9 2-2v-1.5c0-.7-.5-1.2-1.2-1.3' +
    'l-2.5-.3c-.7-.1-1.3.4-1.3 1.3Z" fill="currentColor"/>';

  const DORSAIS =
    '<path d="M11.4 8.4v8.9c0 .5-.5.8-.9.6L7 15.6c-.6-.3-.9-1-.7-1.7l1.4-4.9c.2-.6.7-1 1.3-1.1' +
    'l1-.1c.2 0 .4.3.4.6Z" fill="currentColor"/>' +
    '<path d="M12.6 8.4v8.9c0 .5.5.8.9.6l3.5-2.3c.6-.3.9-1 .7-1.7l-1.4-4.9c-.2-.6-.7-1-1.3-1.1' +
    'l-1-.1c-.2 0-.4.3-.4.6Z" fill="currentColor"/>';

  const BRACOS =
    '<path d="M8 7.3c1.4 0 2.1.9 1.9 2.2l-.4 2.8c-.1.9-.9 1.6-1.9 1.6H5.8c-1 0-1.8-.9-1.6-2' +
    'l.5-2.7c.3-1.3 1.5-1.9 3.3-1.9Z" fill="currentColor"/>' +
    '<path d="M16 7.3c-1.4 0-2.1.9-1.9 2.2l.4 2.8c.1.9.9 1.6 1.9 1.6h1.8c1 0 1.8-.9 1.6-2' +
    'l-.5-2.7c-.3-1.3-1.5-1.9-3.3-1.9Z" fill="currentColor"/>';

  // Antebraços, para o dia em que o braço inteiro é o assunto.
  const ANTEBRACOS =
    '<path d="M5.6 14.4h2.2c.7 0 1.2.6 1.1 1.3l-.5 3.6c-.1.7-.7 1.2-1.4 1.2s-1.3-.5-1.4-1.2' +
    'l-.5-3.6c-.1-.7.4-1.3 1.1-1.3Z" fill="currentColor"/>' +
    '<path d="M18.4 14.4h-2.2c-.7 0-1.2.6-1.1 1.3l.5 3.6c.1.7.7 1.2 1.4 1.2s1.3-.5 1.4-1.2' +
    'l.5-3.6c.1-.7-.4-1.3-1.1-1.3Z" fill="currentColor"/>';

  // Só as cabeças do deltoide, sem descer para o braço.
  const OMBROS =
    '<path d="M7.6 7.2c1.6 0 2.4.8 2.2 2.1l-.2 1.4c-.1.7-.7 1.2-1.4 1.2H6.6c-.9 0-1.6-.8-1.4-1.7' +
    'l.3-1.5c.2-1 1.1-1.5 2.1-1.5Z" fill="currentColor"/>' +
    '<path d="M16.4 7.2c-1.6 0-2.4.8-2.2 2.1l.2 1.4c.1.7.7 1.2 1.4 1.2h1.6c.9 0 1.6-.8 1.4-1.7' +
    'l-.3-1.5c-.2-1-1.1-1.5-2.1-1.5Z" fill="currentColor"/>';

  const TRAPEZIO =
    '<path d="M12 5.4 8.2 7.2c-.6.3-1 .8-1.1 1.5l-.2 1.2 5.1-1.7 5.1 1.7-.2-1.2' +
    'c-.1-.7-.5-1.2-1.1-1.5L12 5.4Z" fill="currentColor"/>';

  const musculos = {
    'peito-triceps': corpo(TRONCO + PEITO),

    'costas-biceps': corpo(TRONCO + DORSAIS),

    'perna': corpo(
      '<path d="M6.6 2.4h10.8c.7 0 1.2.6 1.1 1.3l-.5 3.6c-.2 1.4-.8 2.7-1.8 3.7l-.9 10.6' +
      'c0 .5-.4.8-.9.8h-2.1c-.5 0-.8-.3-.9-.8l-.8-8.4h-.3l-.8 8.4c0 .5-.4.8-.9.8H6.5' +
      'c-.5 0-.8-.3-.9-.8l-.9-10.6c-1-1-1.6-2.3-1.8-3.7L2.4 3.7c-.1-.7.4-1.3 1.1-1.3h3.1Z" fill="#fff"/>' +
      '<path d="M8.6 4.2c1.3 0 2 .7 2 2.1l-.3 5c0 1-.8 1.7-1.8 1.7s-1.8-.7-1.9-1.7l-.5-5' +
      'c-.1-1.4.9-2.1 2.5-2.1Z" fill="currentColor"/>' +
      '<path d="M15.4 4.2c-1.3 0-2 .7-2 2.1l.3 5c0 1 .8 1.7 1.8 1.7s1.8-.7 1.9-1.7l.5-5' +
      'c.1-1.4-.9-2.1-2.5-2.1Z" fill="currentColor"/>'),

    'superiores': corpo(TRONCO + BRACOS),

    // Push: o peito manda, o ombro entra junto.
    'empurrar': corpo(TRONCO + PEITO + OMBROS),

    // Pull: dorsais e braço que dobra.
    'puxar': corpo(TRONCO + DORSAIS + BRACOS),

    'ombro-trapezio': corpo(TRONCO + TRAPEZIO + OMBROS),

    // Braço inteiro: do deltoide ao antebraço.
    'bracos': corpo(TRONCO + BRACOS + ANTEBRACOS),

    // Perna vista por trás: glúteo e posterior de coxa.
    'gluteos-posterior': corpo(
      '<path d="M6.6 2.4h10.8c.7 0 1.2.6 1.1 1.3l-.5 3.6c-.2 1.4-.8 2.7-1.8 3.7l-.9 10.6' +
      'c0 .5-.4.8-.9.8h-2.1c-.5 0-.8-.3-.9-.8l-.8-8.4h-.3l-.8 8.4c0 .5-.4.8-.9.8H6.5' +
      'c-.5 0-.8-.3-.9-.8l-.9-10.6c-1-1-1.6-2.3-1.8-3.7L2.4 3.7c-.1-.7.4-1.3 1.1-1.3h3.1Z" fill="#fff"/>' +
      '<path d="M12 3c2.6 0 4.2 1 4.2 2.8S14.8 8.4 12 8.4 7.8 7.6 7.8 5.8 9.4 3 12 3Z" fill="currentColor"/>' +
      '<path d="M8.8 9.4c1.2 0 1.8.6 1.7 1.8l-.4 4.2c-.1.9-.7 1.5-1.6 1.5s-1.5-.6-1.6-1.5' +
      'l-.4-4.2c-.1-1.2.9-1.8 2.3-1.8Z" fill="currentColor"/>' +
      '<path d="M15.2 9.4c-1.2 0-1.8.6-1.7 1.8l.4 4.2c.1.9.7 1.5 1.6 1.5s1.5-.6 1.6-1.5' +
      'l.4-4.2c.1-1.2-.9-1.8-2.3-1.8Z" fill="currentColor"/>'),

    // Full body: o tronco inteiro aceso.
    'corpo-inteiro': corpo(
      '<circle cx="12" cy="3.4" r="2.4" fill="#fff"/>' +
      '<path d="M8.4 6.6h7.2c2.3 0 4.1 1.7 4.4 4l.4 3.3-3 .6-.5-3v9.2c0 .4-.3.7-.7.7H7.8' +
      'c-.4 0-.7-.3-.7-.7v-9.2l-.5 3-3-.6.4-3.3c.3-2.3 2.1-4 4.4-4Z" fill="currentColor"/>')
  };

  /** Músculo trabalhado no treino; a parte destacada herda a cor. */
  function musculo(tipoId) {
    return musculos[tipoId] || '';
  }

  /** SVG do equipamento; usa a máquina como padrão. */
  function equipamento(tipo) {
    return equipamentos[tipo] || equipamentos.maquina;
  }

  return { equipamento, musculo, chama, trofeu, floco, cadeado, trocar, remover };
})();
