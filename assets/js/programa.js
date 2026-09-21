/* Programa de treino: o treino escolhido, adaptado a quem treina.

   O catálogo tem 7 exercícios por treino, de 3 séries e 90 s de descanso.
   Isso serve a uma pessoa média que não existe: quem tem 30 minutos não
   termina, quem vai com calma faz metade, quem treina há anos acha pouco.
   Aqui o treino é montado a partir de cinco respostas, e muda com o tempo.

   DUAS COISAS ACONTECEM AQUI
   1. Montagem — tempo na academia, quantidade de exercícios de costume e
      experiência viram um número de exercícios, de séries e de descanso
      que cabe no tempo de verdade. Quando é preciso cortar, o corte é
      por rodízio de grupo muscular: Peito e Tríceps com 4 exercícios fica
      com 2 de cada, não com 4 de peito.
   2. Renovação — a cada 2 ou 3 meses (a pessoa escolhe) cada exercício é
      trocado por uma alternativa do mesmo grupo. O corpo se adapta ao
      mesmo estímulo; variar máquina e ângulo é o que a ficha de academia
      faz quando o professor "troca o treino". A escolha é determinística
      por ciclo: o treino fica igual o ciclo inteiro, e muda junto para
      todos os tipos na virada.

   O QUE NÃO MUDA
   Ajuste da sessão (remover, trocar, acrescentar) continua em Treino, por
   cima do que sai daqui. Histórico e evolução de carga continuam por id
   de exercício: voltar a um exercício num ciclo futuro retoma a curva. */
const Programa = (() => {
  const CHAVE = 'gym:programa';
  const DIA_MS = 86400000;

  /* ── Perguntas ─────────────────────────────────────── */

  const PERGUNTAS = [
    {
      id: 'tempo',
      titulo: 'Quanto tempo você fica na academia?',
      opcoes: [
        { id: 30, nome: '30 min' },
        { id: 45, nome: '45 min' },
        { id: 60, nome: '1 hora' },
        { id: 90, nome: '1h30 ou mais' }
      ]
    },
    {
      id: 'exercicios',
      titulo: 'Quantos exercícios você costuma fazer?',
      opcoes: [
        { id: 'poucos', nome: '3 a 4', min: 3, max: 4 },
        { id: 'medio',  nome: '5 a 6', min: 5, max: 6 },
        { id: 'muitos', nome: '7 a 8', min: 7, max: 8 }
      ]
    },
    {
      id: 'nivel',
      titulo: 'Há quanto tempo você treina?',
      opcoes: [
        { id: 'iniciante',     nome: 'Começando',   detalhe: 'até 6 meses', series: 3, descanso: 60 },
        { id: 'intermediario', nome: 'Um tempo',    detalhe: '6 meses a 2 anos', series: 4, descanso: 75 },
        { id: 'avancado',      nome: 'Faz tempo',   detalhe: 'mais de 2 anos', series: 4, descanso: 90 }
      ]
    },
    {
      id: 'equipamento',
      titulo: 'Você prefere treinar com…',
      opcoes: [
        { id: 'maquinas', nome: 'Máquinas', detalhe: 'e polias' },
        { id: 'livres',   nome: 'Pesos livres', detalhe: 'barra e halteres' },
        { id: 'tanto',    nome: 'Tanto faz', detalhe: 'variar tudo' }
      ]
    },
    {
      id: 'renovacao',
      titulo: 'De quanto em quanto tempo renovar os exercícios?',
      opcoes: [
        { id: 2, nome: 'A cada 2 meses' },
        { id: 3, nome: 'A cada 3 meses' }
      ]
    }
  ];

  const PADRAO = { tempo: 60, exercicios: 'medio', nivel: 'intermediario', equipamento: 'tanto', renovacao: 2 };

  function opcao(perguntaId, valor) {
    const p = PERGUNTAS.find((q) => q.id === perguntaId);
    return p.opcoes.find((o) => o.id === valor) || p.opcoes.find((o) => o.id === PADRAO[perguntaId]);
  }

  /* ── Estado guardado ───────────────────────────────── */

  // { respostas, inicio: 'AAAA-MM-DD', deslocamento, aplicado, renovadoEm }
  function ler() {
    try {
      const bruto = localStorage.getItem(CHAVE);
      return bruto ? JSON.parse(bruto) : null;
    } catch (erro) {
      return null;
    }
  }

  function gravar(estado) {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(estado));
    } catch (erro) {
      // Sem storage: o programa vale só enquanto o app estiver aberto.
    }
    guardado = estado;
  }

  let guardado = ler();

  function respondido() {
    return !!(guardado && guardado.respostas);
  }

  function respostas() {
    return Object.assign({}, PADRAO, guardado && guardado.respostas);
  }

  /** Grava as respostas. O ciclo começa na primeira vez e não reinicia ao editar. */
  function salvar(novas) {
    const hoje = Utils.iso(Utils.hoje());
    const atual = guardado || {};
    gravar({
      respostas: Object.assign({}, PADRAO, novas),
      inicio: atual.inicio || hoje,
      deslocamento: atual.deslocamento || 0,
      aplicado: typeof atual.aplicado === 'number' ? atual.aplicado : 0,
      renovadoEm: atual.renovadoEm || null
    });
  }

  /* ── Ciclo de renovação ────────────────────────────── */

  function diasDoCiclo() {
    return opcao('renovacao', respostas().renovacao).id * 30;
  }

  /** Ciclo pelo calendário — o que deveria estar valendo hoje. */
  function cicloDoCalendario() {
    if (!respondido()) return 0;
    const inicio = new Date(guardado.inicio + 'T00:00:00');
    const passados = Math.max(0, Math.floor((Utils.hoje() - inicio) / DIA_MS));
    return (guardado.deslocamento || 0) + Math.floor(passados / diasDoCiclo());
  }

  /* O ciclo em uso é o gravado, não o do calendário. A virada é aplicada
     por verificarCiclo(), que espera não haver treino em andamento: trocar
     a lista no meio de um treino faria sumir o exercício que a pessoa
     está fazendo. */
  function cicloAtual() {
    return respondido() ? (guardado.aplicado || 0) : 0;
  }

  /**
   * Aplica a virada de ciclo se já passou a data. Devolve true quando
   * renovou agora — o painel usa isso para avisar.
   */
  function verificarCiclo() {
    if (!respondido()) return false;
    if (typeof Sessao !== 'undefined' && Sessao.emAndamento()) return false;

    const devido = cicloDoCalendario();
    if (devido === guardado.aplicado) return false;

    gravar(Object.assign({}, guardado, { aplicado: devido, renovadoEm: Utils.iso(Utils.hoje()) }));
    // Os ajustes da sessão apontam para exercícios do ciclo anterior.
    if (typeof Treino !== 'undefined') Treino.limparTodos();
    return devido > 0;
  }

  /** Começa um ciclo novo hoje, sem esperar a data. */
  function renovarAgora() {
    if (!respondido()) return;
    const proximo = cicloAtual() + 1;
    gravar(Object.assign({}, guardado, {
      inicio: Utils.iso(Utils.hoje()),
      deslocamento: proximo,
      aplicado: proximo,
      renovadoEm: Utils.iso(Utils.hoje())
    }));
    if (typeof Treino !== 'undefined') Treino.limparTodos();
  }

  /** Para a interface: número do ciclo, quando renova e se acabou de renovar. */
  function infoCiclo() {
    if (!respondido()) return null;
    const inicio = new Date(guardado.inicio + 'T00:00:00');
    const passados = Math.max(0, Math.floor((Utils.hoje() - inicio) / DIA_MS));
    const duracao = diasDoCiclo();
    const renovadoHa = guardado.renovadoEm
      ? Math.floor((Utils.hoje() - new Date(guardado.renovadoEm + 'T00:00:00')) / DIA_MS)
      : null;
    return {
      numero: cicloAtual() + 1,
      diasParaRenovar: duracao - (passados % duracao),
      renovadoHa: renovadoHa,
      recente: renovadoHa !== null && renovadoHa < 14 && cicloAtual() > 0
    };
  }

  /* ── Volume: séries, descanso e quantos exercícios cabem ── */

  const EXECUCAO_SERIE = 40;   // segundos fazendo a série
  const TROCA = 90;            // arrumar a máquina, carga, beber água
  const AQUECIMENTO = 5 * 60;

  function minutosPorExercicio(series, descanso) {
    return (series * (EXECUCAO_SERIE + descanso) + TROCA) / 60;
  }

  /** Séries, descanso e número de exercícios para as respostas dadas. */
  function volume(r) {
    const resp = r || respostas();
    const nivel = opcao('nivel', resp.nivel);
    const faixa = opcao('exercicios', resp.exercicios);
    const util = (opcao('tempo', resp.tempo).id * 60 - AQUECIMENTO) / 60;

    let series = nivel.series;
    let descanso = nivel.descanso;
    let cabem = Math.floor(util / minutosPorExercicio(series, descanso));

    /* Pouco tempo para o costume da pessoa: antes de tirar exercício,
       tira uma série e encurta o descanso. Fazer 4 exercícios com 3
       séries rende mais que 2 com 4. */
    if (cabem < faixa.min && series > 3) {
      series = 3;
      cabem = Math.floor(util / minutosPorExercicio(series, descanso));
    }
    if (cabem < faixa.min && descanso > 60) {
      descanso = 60;
      cabem = Math.floor(util / minutosPorExercicio(series, descanso));
    }

    const exercicios = Math.max(3, Math.min(faixa.max, cabem));
    return {
      series: series,
      descanso: descanso,
      exercicios: exercicios,
      minutos: Math.round(AQUECIMENTO / 60 + exercicios * minutosPorExercicio(series, descanso))
    };
  }

  function seriesPadrao() {
    return respondido() ? volume().series : 3;
  }

  function descansoPadrao() {
    return respondido() ? volume().descanso : 90;
  }

  /* ── Montagem da lista ─────────────────────────────── */

  /* Máquina ou peso livre, lido do nome do equipamento. Polia conta como
     máquina: é aparelho, com a carga guiada. */
  function categoria(exercicio) {
    const texto = (exercicio.equipamento || '').toLowerCase();
    if (/máquina|maquina|polia|smith|leg press|graviton|articulad|hack|cadeira|mesa|voador|pec deck/.test(texto)) return 'maquinas';
    return 'livres';
  }

  /** Rodízio por grupo: pega 1 de cada grupo, depois o 2º de cada… */
  function porRodizio(lista, quantos) {
    const grupos = [];
    const porGrupo = {};
    lista.forEach((e) => {
      if (!porGrupo[e.grupo]) { porGrupo[e.grupo] = []; grupos.push(e.grupo); }
      porGrupo[e.grupo].push(e);
    });

    const escolhidos = [];
    for (let rodada = 0; escolhidos.length < quantos; rodada++) {
      let pegou = false;
      grupos.forEach((g) => {
        if (escolhidos.length < quantos && porGrupo[g][rodada]) {
          escolhidos.push(porGrupo[g][rodada]);
          pegou = true;
        }
      });
      if (!pegou) break;
    }
    // Volta à ordem original: o composto pesado continua primeiro.
    return lista.filter((e) => escolhidos.indexOf(e) !== -1);
  }

  /* Opções de um lugar da ficha: o exercício e suas alternativas do mesmo
     grupo. Com preferência de equipamento, só as da categoria — desde que
     sobrem pelo menos duas, senão não haveria o que variar. */
  function opcoesDoLugar(exercicio, preferencia) {
    const todas = [exercicio].concat(Dados.alternativasDe(exercicio.id))
      .filter((e) => e.grupo === exercicio.grupo);
    if (preferencia === 'tanto') return todas;
    const daCategoria = todas.filter((e) => categoria(e) === preferencia);
    return daCategoria.length >= 2 ? daCategoria : todas;
  }

  /* Reserva de um grupo: todo exercício conhecido daquele grupo, na
     preferência de equipamento quando houver pelo menos dois. */
  function reservaDoGrupo(tipoId, grupo, preferencia) {
    const todos = Dados.candidatosPara(tipoId, []).filter((e) => e.grupo === grupo);
    if (preferencia === 'tanto') return todos;
    const daCategoria = todos.filter((e) => categoria(e) === preferencia);
    return daCategoria.length >= 2 ? daCategoria : todos;
  }

  /**
   * Escolhe o exercício de cada lugar para um ciclo, sem repetir na lista.
   *
   * Primeiro tenta as alternativas do próprio exercício, girando pelo
   * número do ciclo. Se todas já estão na lista — acontece com o exercício
   * extra, que não tem alternativas cadastradas, ou quando dois lugares
   * compartilham as mesmas —, vai à reserva do grupo. O lugar só fica
   * vazio se o grupo inteiro já estiver na ficha.
   */
  function escolherParaCiclo(tipoId, lugares, ciclo, preferencia) {
    const usados = {};
    const pegar = (opcoes) => {
      for (let k = 0; k < opcoes.length; k++) {
        const candidato = opcoes[(ciclo + k) % opcoes.length];
        if (!usados[candidato.id]) {
          usados[candidato.id] = true;
          return candidato;
        }
      }
      return null;
    };
    // Por último, o grupo sem filtro de equipamento: preferência é
    // preferência, e não pode deixar a ficha menor do que a pessoa pediu.
    return lugares.map((lugar) =>
      pegar(opcoesDoLugar(lugar, preferencia)) ||
      pegar(reservaDoGrupo(tipoId, lugar.grupo, preferencia)) ||
      pegar(reservaDoGrupo(tipoId, lugar.grupo, 'tanto'))
    ).filter(Boolean);
  }

  /**
   * Lista programada do treino para o ciclo em uso, já no tamanho certo.
   * Cada item pode trazer `novo: true` — mudou em relação ao ciclo anterior
   * e a renovação é recente.
   */
  function base(tipoId) {
    const catalogo = Dados.exerciciosDe(tipoId);
    if (!respondido()) return catalogo;

    const r = respostas();
    const alvo = volume(r).exercicios;

    // Os lugares da ficha: os programados, cortados por rodízio de grupo,
    // ou completados com exercícios do catálogo dos mesmos grupos.
    let lugares = porRodizio(catalogo, Math.min(alvo, catalogo.length));
    if (alvo > catalogo.length) {
      // O que entra a mais segue a preferência de equipamento, como o resto.
      let extras = Dados.candidatosPara(tipoId, catalogo.map((e) => e.id));
      const daCategoria = extras.filter((e) => categoria(e) === r.equipamento);
      if (r.equipamento !== 'tanto' && daCategoria.length >= alvo - catalogo.length) extras = daCategoria;
      lugares = lugares.concat(porRodizio(extras, alvo - catalogo.length));

      // E fica junto do seu grupo: o supino extra vem com os de peito, não
      // depois do último tríceps.
      const ordem = [];
      catalogo.forEach((e) => { if (ordem.indexOf(e.grupo) === -1) ordem.push(e.grupo); });
      lugares = lugares
        .map((e, i) => ({ e: e, i: i }))
        .sort((a, b) => (ordem.indexOf(a.e.grupo) - ordem.indexOf(b.e.grupo)) || (a.i - b.i))
        .map((x) => x.e);
    }

    const ciclo = cicloAtual();
    const agora = escolherParaCiclo(tipoId, lugares, ciclo, r.equipamento);
    if (ciclo === 0) return agora;

    const info = infoCiclo();
    const antes = escolherParaCiclo(tipoId, lugares, ciclo - 1, r.equipamento).map((e) => e.id);
    return agora.map((e) => (info.recente && antes.indexOf(e.id) === -1)
      ? Object.assign({}, e, { novo: true })
      : e);
  }

  return {
    PERGUNTAS, PADRAO,
    respondido, respostas, salvar, opcao,
    volume, seriesPadrao, descansoPadrao,
    base, infoCiclo, verificarCiclo, renovarAgora
  };
})();
