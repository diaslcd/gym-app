/* Plano da semana: quantos dias o usuário treina e qual divisão isso
   recomenda.

   As combinações seguem o que aparece em quase toda ficha de academia —
   corpo inteiro para quem vai poucas vezes, push/pull/legs em três dias,
   um grupo por dia conforme a semana abre. Ninguém é obrigado a seguir:
   o plano é sugestão, e a tela de treinos continua inteira. */
const Plano = (() => {
  const CHAVE = 'gym:semana';
  const MINIMO = 2;
  const MAXIMO = 6;

  const DIVISOES = {
    2: ['corpo-inteiro', 'corpo-inteiro'],
    3: ['empurrar', 'puxar', 'perna'],
    4: ['peito-triceps', 'costas-biceps', 'perna', 'ombro-trapezio'],
    5: ['peito-triceps', 'costas-biceps', 'perna', 'ombro-trapezio', 'bracos'],
    6: ['empurrar', 'puxar', 'perna', 'empurrar', 'puxar', 'perna']
  };

  const NOTAS = {
    2: 'Corpo inteiro nas duas sessões: assim cada grupo é treinado duas vezes na semana.',
    3: 'Empurrar, puxar e perna — a divisão mais usada por quem treina três vezes.',
    4: 'Um ou dois grupos por dia, com o ombro ganhando um dia só dele.',
    5: 'Um grupo por dia, com o braço fechando a semana.',
    6: 'Empurrar, puxar e perna repetidos: cada grupo duas vezes na semana.'
  };

  function dias() {
    try {
      const salvo = Number(localStorage.getItem(CHAVE));
      return salvo >= MINIMO && salvo <= MAXIMO ? salvo : 0;
    } catch (erro) {
      return 0;
    }
  }

  function escolhido() {
    return dias() > 0;
  }

  function definir(quantos) {
    const valor = Math.min(MAXIMO, Math.max(MINIMO, Number(quantos) || 0));
    try {
      localStorage.setItem(CHAVE, String(valor));
    } catch (erro) {
      // Sem storage: a escolha vale só enquanto o app estiver aberto.
    }
    return valor;
  }

  /** Treinos recomendados para a semana, na ordem sugerida. */
  function treinosDe(quantos) {
    return (DIVISOES[quantos] || []).map(Dados.tipoPorId).filter(Boolean);
  }

  function notaDe(quantos) {
    return NOTAS[quantos] || '';
  }

  return { dias, escolhido, definir, treinosDe, notaDe, MINIMO, MAXIMO };
})();
