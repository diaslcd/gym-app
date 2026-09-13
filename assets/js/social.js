/* Camada de dados da área Social: pontos, atividades e conquistas.

   ONDE ISSO VIVE HOJE
   No localStorage do aparelho, como o resto do app. Não há servidor, e
   sem servidor não existe comunidade de verdade: os outros perfis do
   ranking são de demonstração e estão marcados como tal na interface.
   Preferir isso a fingir uma rede social que não existe.

   POR QUE ESTÁ ISOLADO ASSIM
   Todo acesso a dado passa por `Fonte`, embaixo. É um adaptador de duas
   funções — ler e gravar — e é o único ponto do módulo que sabe que o
   armazenamento é local. Quando houver back-end, troca-se `Fonte` por
   chamadas de rede e o resto continua igual: as regras de pontuação, as
   conquistas e o formato das atividades não mudam.

   O QUE NÃO ESTÁ AQUI
   Ranking, grupos e desafios entram nos próximos passos, e o formato de
   `atividade` já foi desenhado para caber neles: cada uma carrega autor,
   data e pontos, que é o que ranking e grupo precisam somar. */
const SocialDados = (() => {

  /* ── Adaptador de armazenamento ──────────────────────── */

  /* A única parte que conhece o localStorage. Trocar isto por fetch é
     o que transforma o app local em app conectado. */
  const Fonte = {
    ler(chave, padrao) {
      try {
        const bruto = localStorage.getItem(chave);
        return bruto ? JSON.parse(bruto) : padrao;
      } catch (erro) {
        return padrao;
      }
    },
    gravar(chave, valor) {
      try {
        localStorage.setItem(chave, JSON.stringify(valor));
        return true;
      } catch (erro) {
        // Cota estourada ou navegação privada: o app segue funcionando,
        // só não lembra na próxima abertura.
        return false;
      }
    }
  };

  const CHAVE_ATIVIDADES = 'gym:social:atividades';
  const CHAVE_CONQUISTAS = 'gym:social:conquistas';

  /* ── Regras de pontuação ─────────────────────────────── */

  /* Base fixa para todo treino concluído, mais bônus por esforço que só
     existe se houver execução registrada de verdade.

     A base é igual para todos porque o que se quer premiar é aparecer:
     quem treina leve, quem está voltando de lesão e quem faz perna sem
     carga contam o mesmo por terem ido. Os bônus separam o treino de
     vinte minutos do de uma hora sem transformar isso em corrida de
     carga — pontuar por repetição vezes peso favoreceria quem levanta
     mais e convidaria a inflar número na ficha. */
  const REGRAS = {
    BASE_TREINO: 100,

    // 1 ponto por minuto, até uma hora. Depois disso o corpo cansa e a
    // contagem também: treino de três horas não vale três vezes mais.
    PONTO_POR_MINUTO: 1,
    TETO_MINUTOS: 60,

    // Série marcada como feita, não série que existe na ficha.
    PONTO_POR_SERIE: 2,
    TETO_SERIES: 20,

    // A sequência é o que o app já mede; aqui ela vira recompensa.
    PONTO_POR_DIA_DE_SEQUENCIA: 5,
    TETO_SEQUENCIA: 50,

    // Carga máxima superada num exercício.
    BONUS_RECORDE: 50,

    /* ── Limites contra abuso ── */

    // Dois treinos por dia é o que o app já permite registrar; o
    // terceiro não pontua. Quem treina duas vezes no dia existe; quem
    // "treina" oito, não.
    TREINOS_PONTUAVEIS_POR_DIA: 2,

    // Treino relâmpago não pontua. Cinco minutos é curto o bastante
    // para não atrapalhar quem faz uma sessão rápida de verdade, e
    // longo o bastante para impedir abrir-e-encerrar em sequência.
    MINUTOS_MINIMOS: 5,

    // Intervalo entre dois treinos pontuados no mesmo dia. Ninguém
    // termina um treino e começa outro completo em vinte minutos.
    MINUTOS_ENTRE_TREINOS: 30,

    // Teto diário, rede de segurança para qualquer combinação que
    // escape das regras acima.
    TETO_DIARIO: 400
  };

  /**
   * Quanto vale um treino, item a item.
   *
   * Função pura: recebe o que aconteceu, devolve a conta aberta. Fica
   * separada da gravação de propósito — assim dá para mostrar ao
   * usuário de onde vem cada ponto, e para conferir a regra sem
   * precisar registrar nada.
   */
  function calcularPontos(dados) {
    const minutos = Math.max(0, dados.minutos || 0);
    const series = Math.max(0, dados.series || 0);
    const sequencia = Math.max(0, dados.sequencia || 0);

    const linhas = [{ rotulo: 'Treino concluído', pontos: REGRAS.BASE_TREINO }];

    const porTempo = Math.min(minutos, REGRAS.TETO_MINUTOS) * REGRAS.PONTO_POR_MINUTO;
    if (porTempo > 0) {
      linhas.push({ rotulo: `${Math.min(minutos, REGRAS.TETO_MINUTOS)} min de treino`, pontos: porTempo });
    }

    const porSeries = Math.min(series, REGRAS.TETO_SERIES) * REGRAS.PONTO_POR_SERIE;
    if (porSeries > 0) {
      linhas.push({ rotulo: `${Math.min(series, REGRAS.TETO_SERIES)} séries executadas`, pontos: porSeries });
    }

    const porSequencia = Math.min(
      sequencia * REGRAS.PONTO_POR_DIA_DE_SEQUENCIA, REGRAS.TETO_SEQUENCIA);
    if (porSequencia > 0) {
      linhas.push({
        rotulo: `${sequencia} ${sequencia === 1 ? 'dia' : 'dias'} em sequência`,
        pontos: porSequencia
      });
    }

    if (dados.recorde) {
      linhas.push({ rotulo: 'Recorde pessoal', pontos: REGRAS.BONUS_RECORDE });
    }

    const bruto = linhas.reduce((soma, l) => soma + l.pontos, 0);
    const total = Math.min(bruto, REGRAS.TETO_DIARIO);

    return {
      linhas: linhas,
      bruto: bruto,
      total: total,
      limitado: total < bruto
    };
  }

  /* ── Fair play ───────────────────────────────────────── */

  /**
   * O treino pode pontuar agora? Devolve { pode, motivo }.
   *
   * As regras não tentam adivinhar se a pessoa treinou de verdade —
   * isso um app sem sensor não consegue saber. Elas fecham as portas
   * óbvias: registrar dez treinos seguidos, encerrar na mesma hora que
   * começou, repetir sem intervalo. Quem quiser burlar ainda consegue,
   * mas vai levar o dia inteiro, o que já tira a graça.
   */
  function podePontuar(dataIso, minutos, agora) {
    const momento = agora || Date.now();

    if (minutos < REGRAS.MINUTOS_MINIMOS) {
      return {
        pode: false,
        motivo: `Treinos com menos de ${REGRAS.MINUTOS_MINIMOS} minutos não pontuam.`,
        tipo: 'curto'
      };
    }

    const doDia = atividadesDe(dataIso).filter((a) => a.pontos > 0);

    if (doDia.length >= REGRAS.TREINOS_PONTUAVEIS_POR_DIA) {
      return {
        pode: false,
        motivo: `Você já pontuou ${REGRAS.TREINOS_PONTUAVEIS_POR_DIA} treinos hoje. O treino fica registrado, mas sem pontos.`,
        tipo: 'limite-diario'
      };
    }

    const ultima = doDia[doDia.length - 1];
    if (ultima && ultima.em) {
      const minutosDesde = (momento - ultima.em) / 60000;
      if (minutosDesde < REGRAS.MINUTOS_ENTRE_TREINOS) {
        const falta = Math.ceil(REGRAS.MINUTOS_ENTRE_TREINOS - minutosDesde);
        return {
          pode: false,
          motivo: `Faltam ${falta} min para o próximo treino valer pontos.`,
          tipo: 'intervalo'
        };
      }
    }

    // Teto diário: soma o que já caiu hoje.
    const jaHoje = doDia.reduce((soma, a) => soma + a.pontos, 0);
    if (jaHoje >= REGRAS.TETO_DIARIO) {
      return { pode: false, motivo: 'Teto de pontos do dia atingido.', tipo: 'teto' };
    }

    return { pode: true, jaHoje: jaHoje };
  }

  /* ── Atividades ──────────────────────────────────────── */

  /* Uma atividade é o que aparece no feed e o que o ranking soma.
     O formato já prevê o que ainda não existe — autor, grupo, tipo —
     para não precisar migrar dado quando essas partes chegarem.

     { id, tipo, autor, data, em, titulo, tipoId, minutos, series,
       pontos, detalhe, foto, legenda, curtidas, publicada } */

  function todas() {
    const lista = Fonte.ler(CHAVE_ATIVIDADES, []);
    return Array.isArray(lista) ? lista : [];
  }

  function atividadesDe(dataIso) {
    return todas().filter((a) => a.data === dataIso);
  }

  function salvarTodas(lista) {
    return Fonte.gravar(CHAVE_ATIVIDADES, lista);
  }

  function novoId() {
    return 'a' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  /**
   * Registra o treino como atividade e devolve o que foi criado, com a
   * conta dos pontos para a tela poder mostrar de onde vieram.
   *
   * A atividade nasce sempre — o treino aconteceu, e o histórico não
   * depende de pontuar. O que a checagem de fair play decide é quantos
   * pontos ela carrega, não se ela existe.
   */
  function registrarTreino(dados) {
    const dataIso = dados.data || Utils.iso(Utils.hoje());
    const agora = Date.now();

    const permissao = podePontuar(dataIso, dados.minutos, agora);
    const conta = permissao.pode
      ? calcularPontos(dados)
      : { linhas: [], bruto: 0, total: 0, limitado: false };

    // Respeita o teto do dia quando já há pontos acumulados.
    let pontos = conta.total;
    if (permissao.pode && permissao.jaHoje) {
      pontos = Math.min(pontos, REGRAS.TETO_DIARIO - permissao.jaHoje);
    }

    const atividade = {
      id: novoId(),
      tipo: 'treino',
      autor: 'eu',
      data: dataIso,
      em: agora,             // carimbo de hora, para o intervalo mínimo
      titulo: dados.titulo || 'Treino',
      tipoId: dados.tipoId || null,
      minutos: dados.minutos || 0,
      series: dados.series || 0,
      pontos: pontos,
      recorde: !!dados.recorde,
      foto: null,
      legenda: '',
      publicada: false,      // vira true quando vai para o feed
      curtidas: 0
    };

    const lista = todas().concat([atividade]);
    salvarTodas(lista);

    return {
      atividade: atividade,
      conta: conta,
      permissao: permissao
    };
  }

  /**
   * Registra como atividade um treino anotado depois, e devolve no mesmo
   * formato de `registrarTreino` — { atividade, conta, permissao }.
   *
   * Anotado de ontem ou anteontem pontua como treino normal, com três
   * diferenças, todas pelo mesmo motivo — o que foi digitado não tem
   * como ser conferido:
   *   - sem bônus de recorde: carga digitada é a mais fácil de inflar;
   *   - sem a regra de intervalo, que mede hora de encerramento, e um
   *     treino anotado não tem hora;
   *   - o limite de treinos e o teto do dia valem para o dia DO treino,
   *     somando com o que já pontuou nele. Anotar não abre um dia novo.
   *
   * Mais para trás, vale zero: quem anota trinta dias seguidos subiria
   * no ranking sem pisar na academia. O treino continua sendo dele —
   * aparece no feed, pode ser publicado e conta nas conquistas de volume.
   */
  function registrarAnotado(dados) {
    let permissao = {
      pode: false,
      motivo: 'Treinos anotados de mais de 2 dias atrás entram no histórico, mas não valem pontos.',
      tipo: 'anotado-antigo'
    };
    if (dados.valePontos) {
      // Carimbo bem no passado: a regra de intervalo não se aplica.
      permissao = podePontuar(dados.data, dados.minutos, Number.MAX_SAFE_INTEGER);
      if (!permissao.pode && permissao.tipo === 'limite-diario') {
        permissao.motivo = `Esse dia já tem ${REGRAS.TREINOS_PONTUAVEIS_POR_DIA} treinos pontuados. O treino fica registrado, mas sem pontos.`;
      }
    }

    const conta = permissao.pode
      ? calcularPontos(Object.assign({}, dados, { recorde: false }))
      : { linhas: [], bruto: 0, total: 0, limitado: false };

    let pontos = conta.total;
    if (permissao.pode && permissao.jaHoje) {
      pontos = Math.min(pontos, REGRAS.TETO_DIARIO - permissao.jaHoje);
    }

    const atividade = {
      id: novoId(),
      tipo: 'treino',
      autor: 'eu',
      data: dados.data,
      em: Date.now(),
      titulo: dados.titulo || 'Treino',
      tipoId: dados.tipoId || null,
      minutos: dados.minutos || 0,
      series: dados.series || 0,
      pontos: pontos,
      recorde: false,
      anotado: true,
      foto: null,
      legenda: '',
      publicada: false,
      curtidas: 0
    };

    salvarTodas(todas().concat([atividade]));
    return { atividade: atividade, conta: conta, permissao: permissao };
  }

  /* O feed segue a data do treino, não a ordem em que foi gravado: um
     treino de semana passada anotado hoje vai para o lugar dele, e não
     para o topo como se fosse novidade. */
  function porData() {
    return todas().slice().sort((a, b) =>
      a.data === b.data ? (a.em || 0) - (b.em || 0) : (a.data < b.data ? -1 : 1));
  }

  /** Atualiza uma atividade — usado ao publicar, anexar foto ou legenda. */
  function atualizar(id, mudancas) {
    const lista = todas();
    const i = lista.findIndex((a) => a.id === id);
    if (i === -1) return null;
    lista[i] = Object.assign({}, lista[i], mudancas);
    salvarTodas(lista);
    return lista[i];
  }

  function porId(id) {
    return todas().find((a) => a.id === id) || null;
  }

  function remover(id) {
    salvarTodas(todas().filter((a) => a.id !== id));
  }

  /* ── Totais ──────────────────────────────────────────── */

  function pontosTotais() {
    return todas().reduce((soma, a) => soma + (a.pontos || 0), 0);
  }

  function pontosDe(dataIso) {
    return atividadesDe(dataIso).reduce((soma, a) => soma + (a.pontos || 0), 0);
  }

  /** Pontos dos últimos N dias, do mais antigo ao mais recente. */
  function pontosPorDia(dias) {
    const hoje = Utils.hoje();
    const saida = [];
    for (let i = dias - 1; i >= 0; i--) {
      const d = Utils.somarDias(hoje, -i);
      const iso = Utils.iso(d);
      saida.push({ data: iso, pontos: pontosDe(iso) });
    }
    return saida;
  }

  function totalDeTreinos() {
    return todas().filter((a) => a.tipo === 'treino').length;
  }

  /* ── Conquistas ──────────────────────────────────────── */

  /* Cada conquista sabe sozinha se foi alcançada, olhando o estado do
     app. Isso evita guardar contador em paralelo — que sairia do ar
     assim que alguém apagasse um treino — e faz a lista continuar certa
     mesmo se as regras mudarem. */
  const CONQUISTAS = [
    { id: 'primeiro-treino', nome: 'Primeiro treino', icone: '🏆',
      descricao: 'Você começou.',
      alcancada: (e) => e.treinos >= 1 },

    { id: 'sequencia-7', nome: '7 dias seguidos', icone: '🔥',
      descricao: 'Uma semana inteira de sequência viva.',
      alcancada: (e) => e.recorde >= 7 },

    { id: 'sequencia-30', nome: '30 dias seguidos', icone: '🔥',
      descricao: 'Um mês sem deixar a sequência cair.',
      alcancada: (e) => e.recorde >= 30 },

    { id: 'treinos-10', nome: '10 treinos', icone: '💪',
      descricao: 'Dez sessões registradas.',
      alcancada: (e) => e.treinos >= 10 },

    { id: 'treinos-50', nome: '50 treinos', icone: '💪',
      descricao: 'Cinquenta sessões registradas.',
      alcancada: (e) => e.treinos >= 50 },

    { id: 'treinos-100', nome: '100 treinos', icone: '💪',
      descricao: 'Cem sessões. Isso é rotina, não fase.',
      alcancada: (e) => e.treinos >= 100 },

    { id: 'pontos-1000', nome: '1.000 pontos', icone: '⭐',
      descricao: 'Mil pontos acumulados.',
      alcancada: (e) => e.pontos >= 1000 },

    { id: 'pontos-5000', nome: '5.000 pontos', icone: '🌟',
      descricao: 'Cinco mil pontos acumulados.',
      alcancada: (e) => e.pontos >= 5000 },

    { id: 'primeira-foto', nome: 'Primeira publicação', icone: '📷',
      descricao: 'Você mostrou seu treino.',
      alcancada: (e) => e.publicadas >= 1 },

    { id: 'recorde-pessoal', nome: 'Recorde pessoal', icone: '🏅',
      descricao: 'Você bateu sua própria carga.',
      alcancada: (e) => e.recordes >= 1 }
  ];

  /** Estado que as conquistas consultam, montado uma vez por checagem. */
  function estadoAtual() {
    const lista = todas();
    return {
      treinos: Dados.totalDeTreinos(),
      pontos: pontosTotais(),
      recorde: Utils.maiorSequencia(Dados.treinos),
      sequencia: Utils.sequenciaAtual(Dados.treinos),
      publicadas: lista.filter((a) => a.publicada).length,
      recordes: lista.filter((a) => a.recorde).length
    };
  }

  function conquistas() {
    const estado = estadoAtual();
    const guardadas = Fonte.ler(CHAVE_CONQUISTAS, {});
    return CONQUISTAS.map((c) => ({
      id: c.id,
      nome: c.nome,
      icone: c.icone,
      descricao: c.descricao,
      alcancada: c.alcancada(estado),
      em: guardadas[c.id] || null
    }));
  }

  /**
   * Confere as conquistas e devolve as que acabaram de cair.
   *
   * A data de quando cada uma foi alcançada é guardada — é a única
   * coisa que não dá para recalcular depois, e é o que permite mostrar
   * "conquistada em março" no perfil.
   */
  function conferirConquistas() {
    const estado = estadoAtual();
    const guardadas = Fonte.ler(CHAVE_CONQUISTAS, {});
    const novas = [];

    CONQUISTAS.forEach((c) => {
      if (!c.alcancada(estado) || guardadas[c.id]) return;
      guardadas[c.id] = Utils.iso(Utils.hoje());
      novas.push({ id: c.id, nome: c.nome, icone: c.icone, descricao: c.descricao });
    });

    if (novas.length) Fonte.gravar(CHAVE_CONQUISTAS, guardadas);
    return novas;
  }

  return {
    REGRAS,
    calcularPontos, podePontuar,
    registrarTreino, registrarAnotado, atualizar, porId, remover,
    todas, porData, atividadesDe,
    pontosTotais, pontosDe, pontosPorDia, totalDeTreinos,
    conquistas, conferirConquistas
  };
})();
