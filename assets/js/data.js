/* Catálogo de treinos e exercícios; o histórico é o que o usuário
   registrar. */
const Dados = (() => {
  const app = { nome: 'BunnyGym' };

  // Tipos de treino disponíveis.
  const tipos = [
    {
      id: 'peito-triceps',
      nome: 'Peito e Tríceps',
      cor: '#FF3D81',
      tinta: '#FFFFFF',
      descricao: 'Movimentos de empurrar: supino, crucifixo e extensões.'
    },
    {
      id: 'costas-biceps',
      nome: 'Costas e Bíceps',
      cor: '#2B4BFF',
      tinta: '#FFFFFF',
      descricao: 'Movimentos de puxar: remadas, pulldown e roscas.'
    },
    {
      id: 'perna',
      nome: 'Perna',
      cor: '#9B5CFF',
      tinta: '#FFFFFF',
      descricao: 'Quadríceps, posterior, glúteos e panturrilhas.'
    },
    {
      id: 'superiores',
      nome: 'Superiores',
      cor: '#00E5A0',
      tinta: '#12101A',
      descricao: 'Ombros, braços e core num treino único.'
    },
    {
      id: 'empurrar',
      nome: 'Empurrar',
      cor: '#FF7A00',
      tinta: '#12101A',
      descricao: 'O push do push/pull/legs: peito, ombro e tríceps.'
    },
    {
      id: 'puxar',
      nome: 'Puxar',
      cor: '#00B0F0',
      tinta: '#12101A',
      descricao: 'O pull do push/pull/legs: dorsais, bíceps e trapézio.'
    },
    {
      id: 'ombro-trapezio',
      nome: 'Ombro e Trapézio',
      cor: '#E63946',
      tinta: '#FFFFFF',
      descricao: 'O dia extra do ABCD: as três porções do deltoide e o trapézio.'
    },
    {
      id: 'bracos',
      nome: 'Braços',
      cor: '#8AC926',
      tinta: '#12101A',
      descricao: 'Bíceps e tríceps juntos, o dia clássico do ABCDE.'
    },
    {
      id: 'gluteos-posterior',
      nome: 'Glúteos e Posterior',
      cor: '#B5179E',
      tinta: '#FFFFFF',
      descricao: 'Quadril e cadeia posterior: elevação pélvica, stiff e flexoras.'
    },
    {
      id: 'corpo-inteiro',
      nome: 'Corpo Inteiro',
      cor: '#457B9D',
      tinta: '#FFFFFF',
      descricao: 'Full body: um movimento por padrão, para treinar 3x na semana.'
    }
  ];

  /* Como as fichas de academia costumam agrupar os treinos. Cada treino
     aparece uma vez só, no sistema onde ele nasceu — Perna é o C do ABC
     e também a perna do push/pull/legs, mas repetir o card confundiria
     mais do que ajudaria. */
  const sistemas = [
    {
      nome: 'ABC e derivados',
      resumo: 'Um ou dois grupos por dia, de 3 a 5 treinos na semana. Os dois últimos entram no ABCD e no ABCDE.',
      treinos: ['peito-triceps', 'costas-biceps', 'perna', 'ombro-trapezio', 'bracos']
    },
    {
      nome: 'Push · Pull · Legs',
      resumo: 'Empurrar, puxar e perna. O Perna do grupo acima fecha o ciclo.',
      treinos: ['empurrar', 'puxar']
    },
    {
      nome: 'Poucos dias na semana',
      resumo: 'O corpo todo em um ou dois treinos, para quem vai duas ou três vezes.',
      treinos: ['superiores', 'corpo-inteiro']
    },
    {
      nome: 'Foco',
      resumo: 'Quando um grupo pede atenção extra.',
      treinos: ['gluteos-posterior']
    }
  ];

  /** Sistemas com os tipos já resolvidos; o que sobrar cai em "Outros". */
  function porSistema() {
    const usados = {};
    const grupos = sistemas.map((s) => {
      const lista = s.treinos.map((id) => {
        usados[id] = true;
        return tipoPorId(id);
      }).filter(Boolean);
      return { nome: s.nome, resumo: s.resumo, tipos: lista };
    }).filter((g) => g.tipos.length);

    const sobras = tipos.filter((t) => !usados[t.id]);
    if (sobras.length) {
      grupos.push({ nome: 'Outros', resumo: '', tipos: sobras });
    }
    return grupos;
  }

  // Exercícios de cada treino. 'icone' aponta para Icones.equipamento().
  const exercicios = {
    'peito-triceps': [
      { id: 'supino-reto',      nome: 'Supino reto',      grupo: 'Peito',    equipamento: 'Barra e banco reto',   icone: 'barra' },
      { id: 'supino-inclinado', nome: 'Supino inclinado', grupo: 'Peito',    equipamento: 'Barra e banco inclinado', icone: 'barra' },
      { id: 'crucifixo',        nome: 'Crucifixo',        grupo: 'Peito',    equipamento: 'Halteres',             icone: 'halteres' },
      { id: 'crossover',        nome: 'Crossover',        grupo: 'Peito',    equipamento: 'Polia alta',           icone: 'polia' },
      { id: 'triceps-pulley',   nome: 'Tríceps pulley',   grupo: 'Tríceps',  equipamento: 'Polia alta com barra', icone: 'polia' },
      { id: 'triceps-frances',  nome: 'Tríceps francês',  grupo: 'Tríceps',  equipamento: 'Halter',               icone: 'halteres' },
      { id: 'triceps-testa',    nome: 'Tríceps testa',    grupo: 'Tríceps',  equipamento: 'Barra W e banco',      icone: 'barra' }
    ],
    'costas-biceps': [
      { id: 'puxada-frontal',    nome: 'Puxada frontal',    grupo: 'Dorsais', equipamento: 'Polia alta',         icone: 'polia' },
      { id: 'remada-baixa',      nome: 'Remada baixa',      grupo: 'Dorsais', equipamento: 'Polia baixa',        icone: 'polia' },
      { id: 'remada-articulada', nome: 'Remada articulada', grupo: 'Dorsais', equipamento: 'Máquina articulada', icone: 'maquina' },
      { id: 'pulldown',          nome: 'Pulldown',          grupo: 'Dorsais', equipamento: 'Polia alta com corda', icone: 'polia' },
      { id: 'rosca-direta',      nome: 'Rosca direta',      grupo: 'Bíceps',  equipamento: 'Barra W',            icone: 'barra' },
      { id: 'rosca-alternada',   nome: 'Rosca alternada',   grupo: 'Bíceps',  equipamento: 'Halteres',           icone: 'halteres' },
      { id: 'rosca-martelo',     nome: 'Rosca martelo',     grupo: 'Bíceps',  equipamento: 'Halteres',           icone: 'halteres' }
    ],
    'perna': [
      { id: 'agachamento',       nome: 'Agachamento',       grupo: 'Quadríceps',  equipamento: 'Barra e rack',    icone: 'barra' },
      { id: 'leg-press',         nome: 'Leg press',         grupo: 'Quadríceps',  equipamento: 'Leg press 45°',   icone: 'maquina' },
      { id: 'cadeira-extensora', nome: 'Cadeira extensora', grupo: 'Quadríceps',  equipamento: 'Máquina',         icone: 'maquina' },
      { id: 'mesa-flexora',      nome: 'Mesa flexora',      grupo: 'Posteriores', equipamento: 'Máquina deitada', icone: 'maquina' },
      { id: 'cadeira-flexora',   nome: 'Cadeira flexora',   grupo: 'Posteriores', equipamento: 'Máquina sentada', icone: 'maquina' },
      { id: 'panturrilha',       nome: 'Panturrilha',       grupo: 'Panturrilhas', equipamento: 'Máquina em pé',  icone: 'maquina' },
      { id: 'hack-squat',        nome: 'Hack squat',        grupo: 'Quadríceps',  equipamento: 'Máquina hack',    icone: 'maquina' }
    ],
    'superiores': [
      { id: 'supino',           nome: 'Supino',           grupo: 'Peito',   equipamento: 'Barra e banco reto', icone: 'barra' },
      { id: 'remada',           nome: 'Remada',           grupo: 'Costas',  equipamento: 'Barra curvada',      icone: 'barra' },
      { id: 'puxada',           nome: 'Puxada',           grupo: 'Dorsais', equipamento: 'Polia alta',         icone: 'polia' },
      { id: 'desenvolvimento',  nome: 'Desenvolvimento',  grupo: 'Ombros',  equipamento: 'Halteres',           icone: 'halteres' },
      { id: 'elevacao-lateral', nome: 'Elevação lateral', grupo: 'Ombros',  equipamento: 'Halteres',           icone: 'halteres' },
      { id: 'rosca',            nome: 'Rosca',            grupo: 'Bíceps',  equipamento: 'Barra W',            icone: 'barra' },
      { id: 'triceps',          nome: 'Tríceps',          grupo: 'Tríceps', equipamento: 'Polia alta',         icone: 'polia' }
    ],
    // Push do PPL: peito, ombro e tríceps na mesma sessão.
    'empurrar': [
      { id: 'supino-reto',        nome: 'Supino reto',        grupo: 'Peito',   equipamento: 'Barra e banco reto',   icone: 'barra' },
      { id: 'supino-incl-halter', nome: 'Supino inclinado com halteres', grupo: 'Peito', equipamento: 'Halteres e banco inclinado', icone: 'halteres' },
      { id: 'crossover',          nome: 'Crossover',          grupo: 'Peito',   equipamento: 'Polia alta',           icone: 'polia' },
      { id: 'desenvolvimento',    nome: 'Desenvolvimento',    grupo: 'Ombros',  equipamento: 'Halteres',             icone: 'halteres' },
      { id: 'elevacao-lateral',   nome: 'Elevação lateral',   grupo: 'Ombros',  equipamento: 'Halteres',             icone: 'halteres' },
      { id: 'triceps-pulley',     nome: 'Tríceps pulley',     grupo: 'Tríceps', equipamento: 'Polia alta com barra', icone: 'polia' },
      { id: 'triceps-frances',    nome: 'Tríceps francês',    grupo: 'Tríceps', equipamento: 'Halter',               icone: 'halteres' }
    ],
    // Pull do PPL: tudo que puxa, incluindo o trapézio.
    'puxar': [
      { id: 'barra-fixa',      nome: 'Barra fixa',      grupo: 'Dorsais',  equipamento: 'Barra fixa',     icone: 'barra' },
      { id: 'puxada-frontal',  nome: 'Puxada frontal',  grupo: 'Dorsais',  equipamento: 'Polia alta',     icone: 'polia' },
      { id: 'remada-baixa',    nome: 'Remada baixa',    grupo: 'Dorsais',  equipamento: 'Polia baixa',    icone: 'polia' },
      { id: 'remada-serrote',  nome: 'Remada serrote',  grupo: 'Dorsais',  equipamento: 'Halter e banco', icone: 'halteres' },
      { id: 'encolhimento',    nome: 'Encolhimento',    grupo: 'Trapézio', equipamento: 'Halteres',       icone: 'halteres' },
      { id: 'rosca-direta',    nome: 'Rosca direta',    grupo: 'Bíceps',   equipamento: 'Barra W',        icone: 'barra' },
      { id: 'rosca-martelo',   nome: 'Rosca martelo',   grupo: 'Bíceps',   equipamento: 'Halteres',       icone: 'halteres' }
    ],
    // O quarto dia do ABCD: as três porções do deltoide, e o trapézio no fim.
    'ombro-trapezio': [
      { id: 'desenvolvimento-barra', nome: 'Desenvolvimento com barra', grupo: 'Ombros', equipamento: 'Barra e banco', icone: 'barra' },
      { id: 'elevacao-lateral',    nome: 'Elevação lateral',   grupo: 'Ombros',   equipamento: 'Halteres',    icone: 'halteres' },
      { id: 'elevacao-frontal',    nome: 'Elevação frontal',   grupo: 'Ombros',   equipamento: 'Halteres',    icone: 'halteres' },
      { id: 'crucifixo-inverso',   nome: 'Crucifixo inverso',  grupo: 'Ombros',   equipamento: 'Halteres e banco inclinado', icone: 'halteres' },
      { id: 'desenvolvimento-maq', nome: 'Desenvolvimento na máquina', grupo: 'Ombros', equipamento: 'Máquina sentada', icone: 'maquina' },
      { id: 'remada-alta',         nome: 'Remada alta',        grupo: 'Ombros',   equipamento: 'Barra',       icone: 'barra' },
      { id: 'encolhimento',        nome: 'Encolhimento',       grupo: 'Trapézio', equipamento: 'Halteres',    icone: 'halteres' }
    ],
    // O dia de braço do ABCDE: bíceps e tríceps alternados.
    'bracos': [
      { id: 'rosca-direta',      nome: 'Rosca direta',      grupo: 'Bíceps',  equipamento: 'Barra W',              icone: 'barra' },
      { id: 'rosca-scott',       nome: 'Rosca scott',       grupo: 'Bíceps',  equipamento: 'Banco scott e barra W', icone: 'barra' },
      { id: 'rosca-martelo',     nome: 'Rosca martelo',     grupo: 'Bíceps',  equipamento: 'Halteres',             icone: 'halteres' },
      { id: 'rosca-concentrada', nome: 'Rosca concentrada', grupo: 'Bíceps',  equipamento: 'Halter',               icone: 'halteres' },
      { id: 'triceps-pulley',    nome: 'Tríceps pulley',    grupo: 'Tríceps', equipamento: 'Polia alta com barra', icone: 'polia' },
      { id: 'triceps-testa',     nome: 'Tríceps testa',     grupo: 'Tríceps', equipamento: 'Barra W e banco',      icone: 'barra' },
      { id: 'triceps-corda',     nome: 'Tríceps na corda',  grupo: 'Tríceps', equipamento: 'Polia alta com corda', icone: 'polia' }
    ],
    // Quadril e cadeia posterior, o treino mais pedido depois do de perna.
    'gluteos-posterior': [
      { id: 'elevacao-pelvica',    nome: 'Elevação pélvica',    grupo: 'Glúteos',      equipamento: 'Barra e banco',    icone: 'barra' },
      { id: 'agachamento-bulgaro', nome: 'Agachamento búlgaro', grupo: 'Glúteos',      equipamento: 'Halteres e banco', icone: 'halteres' },
      { id: 'afundo',              nome: 'Afundo',              grupo: 'Glúteos',      equipamento: 'Halteres',         icone: 'halteres' },
      { id: 'stiff',               nome: 'Stiff',               grupo: 'Posteriores',  equipamento: 'Barra',            icone: 'barra' },
      { id: 'mesa-flexora',        nome: 'Mesa flexora',        grupo: 'Posteriores',  equipamento: 'Máquina deitada',  icone: 'maquina' },
      { id: 'cadeira-flexora',     nome: 'Cadeira flexora',     grupo: 'Posteriores',  equipamento: 'Máquina sentada',  icone: 'maquina' },
      { id: 'panturrilha',         nome: 'Panturrilha',         grupo: 'Panturrilhas', equipamento: 'Máquina em pé',    icone: 'maquina' }
    ],
    // Full body: um movimento por padrão — agachar, empurrar, puxar, dobrar.
    'corpo-inteiro': [
      { id: 'agachamento',     nome: 'Agachamento',     grupo: 'Quadríceps',  equipamento: 'Barra e rack',       icone: 'barra' },
      { id: 'supino-reto',     nome: 'Supino reto',     grupo: 'Peito',       equipamento: 'Barra e banco reto', icone: 'barra' },
      { id: 'remada-baixa',    nome: 'Remada baixa',    grupo: 'Dorsais',     equipamento: 'Polia baixa',        icone: 'polia' },
      { id: 'stiff',           nome: 'Stiff',           grupo: 'Posteriores', equipamento: 'Barra',              icone: 'barra' },
      { id: 'desenvolvimento', nome: 'Desenvolvimento', grupo: 'Ombros',      equipamento: 'Halteres',           icone: 'halteres' },
      { id: 'rosca-direta',    nome: 'Rosca direta',    grupo: 'Bíceps',      equipamento: 'Barra W',            icone: 'barra' },
      { id: 'abdominal',       nome: 'Abdominal',       grupo: 'Core',        equipamento: 'Peso do corpo',      icone: 'maquina' }
    ]
  };

  // Títulos conquistados conforme a sequência cresce (do maior para o menor).
  const titulos = [
    { dias: 365, nome: 'Um ano sem falhar' },
    { dias: 180, nome: 'Meio ano de chama' },
    { dias: 100, nome: 'Clube dos 100' },
    { dias: 60, nome: 'Dois meses de brasa' },
    { dias: 30, nome: 'Mês fechado' },
    { dias: 21, nome: 'Hábito formado' },
    { dias: 14, nome: 'Quinzena de ferro' },
    { dias: 7, nome: 'Semana cheia' },
    { dias: 3, nome: 'Aquecido' },
    { dias: 1, nome: 'Primeiro dia' }
  ];

  /** Título correspondente à sequência (vazio quando não há sequência). */
  function tituloDaSequencia(dias) {
    const faixa = titulos.find((t) => dias >= t.dias);
    return faixa ? faixa.nome : '';
  }

  /** Próximo título a conquistar, com quantos dias faltam. */
  function proximoTitulo(dias) {
    const acima = titulos.filter((t) => t.dias > dias);
    if (!acima.length) return null;
    const alvo = acima[acima.length - 1];
    return { nome: alvo.nome, faltam: alvo.dias - dias };
  }

  /**
   * Registro dos treinos por data: qual treino foi feito, quais
   * exercícios, as séries executadas e quanto durou. Nasce vazio — o que
   * entra aqui é o que o usuário registrou, recuperado do localStorage
   * logo abaixo. Map: `has` e `size` funcionam como no Set anterior,
   * então os cálculos de sequência não mudam.
   */
  const treinos = new Map();

  /** O que foi feito naquele dia, ou null. */
  function registroDe(dataIso) {
    return treinos.get(dataIso) || null;
  }

  // Datas ordenadas em cache: o histórico é lido várias vezes por render.
  let datasOrdenadas = null;

  function invalidarCache() {
    datasOrdenadas = null;
  }

  function datasRecentesPrimeiro() {
    if (!datasOrdenadas) datasOrdenadas = Array.from(treinos.keys()).sort().reverse();
    return datasOrdenadas;
  }

  /** Treinos realizados, do mais recente para o mais antigo. */
  function historico() {
    return datasRecentesPrimeiro()
      .map((data) => Object.assign({ data: data }, treinos.get(data)));
  }

  /** Soma de repetições × carga de um treino. */
  function volumeDoTreino(registro) {
    if (!registro || !registro.fichas) return 0;
    return Object.keys(registro.fichas).reduce((total, id) => {
      const series = registro.fichas[id].series || [];
      return total + series.reduce((soma, s) => {
        return s.feita === false ? soma : soma + (s.reps || 0) * (s.carga || 0);
      }, 0);
    }, 0);
  }

  /**
   * Carga de topo de um exercício em cada treino em que ele apareceu,
   * do mais antigo para o mais recente.
   */
  function evolucaoDe(exercicioId) {
    const pontos = [];
    const datas = datasRecentesPrimeiro();
    for (let i = datas.length - 1; i >= 0; i--) {
      const registro = treinos.get(datas[i]);
      const ficha = registro.fichas && registro.fichas[exercicioId];
      if (!ficha) continue;
      const carga = (ficha.series || []).reduce((maior, s) => Math.max(maior, s.carga || 0), 0);
      if (carga > 0) pontos.push({ data: datas[i], carga: carga });
    }
    return pontos;
  }

  /** Exercícios com histórico suficiente para comparar carga. */
  function exerciciosComEvolucao(limite) {
    const contagem = {};
    treinos.forEach((registro) => {
      Object.keys(registro.fichas || {}).forEach((id) => {
        contagem[id] = (contagem[id] || 0) + 1;
      });
    });
    return Object.keys(contagem)
      .filter((id) => contagem[id] >= 2)
      .sort((a, b) => contagem[b] - contagem[a])
      .slice(0, limite || 8)
      .map(exercicioGlobal)
      .filter(Boolean);
  }

  /* ── Banco de substituições ───────────────────────────
     Exercícios que existem só como alternativa. Cada exercício do
     treino recebe cinco opções daqui — nunca colegas da própria
     lista —, então sempre sobram pelo menos quatro para escolher. */
  const catalogo = {
    // Peito
    'supino-halteres':     { id: 'supino-halteres',     nome: 'Supino com halteres',      grupo: 'Peito', equipamento: 'Halteres e banco reto' },
    'supino-smith':        { id: 'supino-smith',        nome: 'Supino no Smith',          grupo: 'Peito', equipamento: 'Smith e banco' },
    'chest-press':         { id: 'chest-press',         nome: 'Chest press',              grupo: 'Peito', equipamento: 'Máquina sentada' },
    'supino-incl-halter':  { id: 'supino-incl-halter',  nome: 'Supino inclinado com halteres', grupo: 'Peito', equipamento: 'Halteres e banco inclinado' },
    'supino-declinado':    { id: 'supino-declinado',    nome: 'Supino declinado',         grupo: 'Peito', equipamento: 'Barra e banco declinado' },
    'crucifixo-maquina':   { id: 'crucifixo-maquina',   nome: 'Crucifixo na máquina',     grupo: 'Peito', equipamento: 'Peck deck' },
    'crucifixo-inclinado': { id: 'crucifixo-inclinado', nome: 'Crucifixo inclinado',      grupo: 'Peito', equipamento: 'Halteres e banco inclinado' },
    'crossover-baixo':     { id: 'crossover-baixo',     nome: 'Crossover baixo',          grupo: 'Peito', equipamento: 'Polia baixa' },
    'flexao':              { id: 'flexao',              nome: 'Flexão de braço',          grupo: 'Peito', equipamento: 'Peso corporal' },

    // Tríceps
    'triceps-corda':       { id: 'triceps-corda',       nome: 'Tríceps na corda',         grupo: 'Tríceps', equipamento: 'Polia alta com corda' },
    'triceps-coice':       { id: 'triceps-coice',       nome: 'Tríceps coice',            grupo: 'Tríceps', equipamento: 'Halter' },
    'triceps-testa-halt':  { id: 'triceps-testa-halt',  nome: 'Tríceps testa com halteres', grupo: 'Tríceps', equipamento: 'Halteres e banco' },
    'triceps-maquina':     { id: 'triceps-maquina',     nome: 'Tríceps na máquina',       grupo: 'Tríceps', equipamento: 'Máquina sentada' },
    'mergulho-banco':      { id: 'mergulho-banco',      nome: 'Mergulho no banco',        grupo: 'Tríceps', equipamento: 'Peso corporal' },
    'triceps-unilateral':  { id: 'triceps-unilateral',  nome: 'Tríceps unilateral',       grupo: 'Tríceps', equipamento: 'Polia alta, um braço' },

    // Dorsais
    'barra-fixa':          { id: 'barra-fixa',          nome: 'Barra fixa',               grupo: 'Dorsais', equipamento: 'Peso corporal' },
    'puxada-neutra':       { id: 'puxada-neutra',       nome: 'Puxada com triângulo',     grupo: 'Dorsais', equipamento: 'Polia alta, pegada neutra' },
    'remada-serrote':      { id: 'remada-serrote',      nome: 'Remada serrote',           grupo: 'Dorsais', equipamento: 'Halter e banco' },
    'remada-cavalinho':    { id: 'remada-cavalinho',    nome: 'Remada cavalinho',         grupo: 'Dorsais', equipamento: 'Barra T' },
    'remada-halteres':     { id: 'remada-halteres',     nome: 'Remada curvada com halteres', grupo: 'Dorsais', equipamento: 'Halteres' },
    'remada-unilateral':   { id: 'remada-unilateral',   nome: 'Remada unilateral',        grupo: 'Dorsais', equipamento: 'Máquina, um braço' },
    'pullover':            { id: 'pullover',            nome: 'Pullover na polia',        grupo: 'Dorsais', equipamento: 'Polia alta' },

    // Bíceps
    'rosca-scott':         { id: 'rosca-scott',         nome: 'Rosca scott',              grupo: 'Bíceps', equipamento: 'Banco scott e barra W' },
    'rosca-polia':         { id: 'rosca-polia',         nome: 'Rosca na polia',           grupo: 'Bíceps', equipamento: 'Polia baixa' },
    'rosca-corda':         { id: 'rosca-corda',         nome: 'Rosca com corda',          grupo: 'Bíceps', equipamento: 'Polia baixa com corda' },
    'rosca-concentrada':   { id: 'rosca-concentrada',   nome: 'Rosca concentrada',        grupo: 'Bíceps', equipamento: 'Halter e banco' },
    'rosca-inversa':       { id: 'rosca-inversa',       nome: 'Rosca inversa',            grupo: 'Bíceps', equipamento: 'Barra W, pegada pronada' },
    'rosca-inclinada':     { id: 'rosca-inclinada',     nome: 'Rosca inclinada',          grupo: 'Bíceps', equipamento: 'Halteres e banco inclinado' },

    // Quadríceps
    'agachamento-smith':   { id: 'agachamento-smith',   nome: 'Agachamento no Smith',     grupo: 'Quadríceps', equipamento: 'Smith' },
    'agachamento-frontal': { id: 'agachamento-frontal', nome: 'Agachamento frontal',      grupo: 'Quadríceps', equipamento: 'Barra' },
    'agachamento-bulgaro': { id: 'agachamento-bulgaro', nome: 'Agachamento búlgaro',      grupo: 'Quadríceps', equipamento: 'Halteres e banco' },
    'afundo':              { id: 'afundo',              nome: 'Afundo',                   grupo: 'Quadríceps', equipamento: 'Halteres' },
    'passada':             { id: 'passada',             nome: 'Passada',                  grupo: 'Quadríceps', equipamento: 'Halteres' },
    'extensora-unilateral':{ id: 'extensora-unilateral',nome: 'Extensora unilateral',     grupo: 'Quadríceps', equipamento: 'Máquina, uma perna' },

    // Posteriores
    'stiff':               { id: 'stiff',               nome: 'Stiff',                    grupo: 'Posteriores', equipamento: 'Barra' },
    'stiff-halteres':      { id: 'stiff-halteres',      nome: 'Stiff com halteres',       grupo: 'Posteriores', equipamento: 'Halteres' },
    'terra':               { id: 'terra',               nome: 'Levantamento terra',       grupo: 'Posteriores', equipamento: 'Barra' },
    'flexora-em-pe':       { id: 'flexora-em-pe',       nome: 'Flexora em pé',            grupo: 'Posteriores', equipamento: 'Máquina em pé' },
    'elevacao-pelvica':    { id: 'elevacao-pelvica',    nome: 'Elevação pélvica',         grupo: 'Posteriores', equipamento: 'Barra e banco' },

    // Panturrilhas
    'panturrilha-sentado': { id: 'panturrilha-sentado', nome: 'Panturrilha sentado',      grupo: 'Panturrilhas', equipamento: 'Máquina sentada' },
    'panturrilha-leg':     { id: 'panturrilha-leg',     nome: 'Panturrilha no leg',       grupo: 'Panturrilhas', equipamento: 'Leg press 45°' },
    'panturrilha-smith':   { id: 'panturrilha-smith',   nome: 'Panturrilha no Smith',     grupo: 'Panturrilhas', equipamento: 'Smith e step' },
    'panturrilha-livre':   { id: 'panturrilha-livre',   nome: 'Panturrilha no step',      grupo: 'Panturrilhas', equipamento: 'Peso corporal' },

    // Ombros
    'desenvolvimento-maq': { id: 'desenvolvimento-maq', nome: 'Desenvolvimento na máquina', grupo: 'Ombros', equipamento: 'Máquina sentada' },
    'desenvolvimento-barra': { id: 'desenvolvimento-barra', nome: 'Desenvolvimento com barra', grupo: 'Ombros', equipamento: 'Barra' },
    'arnold':              { id: 'arnold',              nome: 'Desenvolvimento Arnold',   grupo: 'Ombros', equipamento: 'Halteres' },
    'elevacao-polia':      { id: 'elevacao-polia',      nome: 'Elevação lateral na polia', grupo: 'Ombros', equipamento: 'Polia baixa' },
    'elevacao-frontal':    { id: 'elevacao-frontal',    nome: 'Elevação frontal',         grupo: 'Ombros', equipamento: 'Halteres' },
    'elevacao-maquina':    { id: 'elevacao-maquina',    nome: 'Elevação lateral na máquina', grupo: 'Ombros', equipamento: 'Máquina' },
    'remada-alta':         { id: 'remada-alta',         nome: 'Remada alta',              grupo: 'Ombros', equipamento: 'Barra' },

    // Trapézio
    'encolhimento':        { id: 'encolhimento',        nome: 'Encolhimento',             grupo: 'Trapézio', equipamento: 'Halteres' },
    'encolhimento-barra':  { id: 'encolhimento-barra',  nome: 'Encolhimento com barra',   grupo: 'Trapézio', equipamento: 'Barra' },
    'encolhimento-smith':  { id: 'encolhimento-smith',  nome: 'Encolhimento no Smith',    grupo: 'Trapézio', equipamento: 'Smith' },

    // Deltoide posterior
    'crucifixo-inverso':   { id: 'crucifixo-inverso',   nome: 'Crucifixo inverso',        grupo: 'Ombros', equipamento: 'Halteres e banco inclinado' },
    'crucifixo-inv-maq':   { id: 'crucifixo-inv-maq',   nome: 'Crucifixo inverso na máquina', grupo: 'Ombros', equipamento: 'Peck deck invertido' },

    // Core
    'abdominal':           { id: 'abdominal',           nome: 'Abdominal',                grupo: 'Core', equipamento: 'Peso do corpo' },
    'prancha':             { id: 'prancha',             nome: 'Prancha',                  grupo: 'Core', equipamento: 'Peso do corpo' },
    'elevacao-pernas':     { id: 'elevacao-pernas',     nome: 'Elevação de pernas',       grupo: 'Core', equipamento: 'Banco ou paralela' },
    'abdominal-maquina':   { id: 'abdominal-maquina',   nome: 'Abdominal na máquina',     grupo: 'Core', equipamento: 'Máquina sentada' },
    'abdominal-infra':     { id: 'abdominal-infra',     nome: 'Abdominal infra',          grupo: 'Core', equipamento: 'Peso do corpo' }
  };

  /* Alternativas por exercício: mesmo grupo, movimento e estímulo
     equivalentes, variando o equipamento — que é o que costuma
     faltar na academia. */
  const alternativas = {
    'supino-reto':       ['supino-halteres', 'chest-press', 'supino-smith', 'supino-declinado', 'flexao'],
    'supino-inclinado':  ['supino-incl-halter', 'crucifixo-inclinado', 'chest-press', 'supino-smith', 'flexao'],
    'crucifixo':         ['crucifixo-maquina', 'crucifixo-inclinado', 'crossover-baixo', 'supino-halteres', 'flexao'],
    'crossover':         ['crucifixo-maquina', 'crossover-baixo', 'crucifixo-inclinado', 'supino-halteres', 'chest-press'],
    'triceps-pulley':    ['triceps-corda', 'triceps-maquina', 'triceps-unilateral', 'mergulho-banco', 'triceps-coice'],
    'triceps-frances':   ['triceps-testa-halt', 'triceps-corda', 'triceps-coice', 'triceps-maquina', 'mergulho-banco'],
    'triceps-testa':     ['triceps-testa-halt', 'triceps-corda', 'triceps-maquina', 'mergulho-banco', 'triceps-unilateral'],

    'puxada-frontal':    ['barra-fixa', 'puxada-neutra', 'remada-unilateral', 'pullover', 'remada-cavalinho'],
    'remada-baixa':      ['remada-serrote', 'remada-cavalinho', 'remada-halteres', 'remada-unilateral', 'barra-fixa'],
    'remada-articulada': ['remada-serrote', 'remada-cavalinho', 'remada-halteres', 'remada-unilateral', 'barra-fixa'],
    'pulldown':          ['pullover', 'barra-fixa', 'puxada-neutra', 'remada-unilateral', 'remada-cavalinho'],
    'rosca-direta':      ['rosca-scott', 'rosca-polia', 'rosca-concentrada', 'rosca-inclinada', 'rosca-inversa'],
    'rosca-alternada':   ['rosca-inclinada', 'rosca-scott', 'rosca-concentrada', 'rosca-polia', 'rosca-corda'],
    'rosca-martelo':     ['rosca-corda', 'rosca-inversa', 'rosca-concentrada', 'rosca-polia', 'rosca-scott'],

    'agachamento':       ['agachamento-smith', 'agachamento-frontal', 'agachamento-bulgaro', 'afundo', 'passada'],
    'leg-press':         ['agachamento-smith', 'afundo', 'agachamento-bulgaro', 'passada', 'agachamento-frontal'],
    'cadeira-extensora': ['extensora-unilateral', 'agachamento-smith', 'afundo', 'agachamento-bulgaro', 'passada'],
    'mesa-flexora':      ['stiff', 'stiff-halteres', 'flexora-em-pe', 'terra', 'elevacao-pelvica'],
    'cadeira-flexora':   ['flexora-em-pe', 'stiff', 'stiff-halteres', 'elevacao-pelvica', 'terra'],
    'panturrilha':       ['panturrilha-sentado', 'panturrilha-leg', 'panturrilha-smith', 'panturrilha-livre'],
    'hack-squat':        ['agachamento-smith', 'agachamento-frontal', 'agachamento-bulgaro', 'afundo', 'passada'],

    'supino':            ['supino-halteres', 'chest-press', 'supino-smith', 'supino-incl-halter', 'flexao'],
    'remada':            ['remada-serrote', 'remada-cavalinho', 'remada-halteres', 'remada-unilateral', 'barra-fixa'],
    'puxada':            ['barra-fixa', 'puxada-neutra', 'pullover', 'remada-unilateral', 'remada-cavalinho'],
    'desenvolvimento':   ['desenvolvimento-maq', 'desenvolvimento-barra', 'arnold', 'elevacao-frontal', 'remada-alta'],
    'elevacao-lateral':  ['elevacao-polia', 'elevacao-maquina', 'elevacao-frontal', 'arnold', 'remada-alta'],
    'rosca':             ['rosca-scott', 'rosca-polia', 'rosca-concentrada', 'rosca-inclinada', 'rosca-corda'],
    'triceps':           ['triceps-corda', 'triceps-maquina', 'mergulho-banco', 'triceps-coice', 'triceps-unilateral'],

    // Exercícios que chegaram com os treinos novos
    'barra-fixa':         ['puxada-frontal', 'puxada-neutra', 'pulldown', 'remada-unilateral', 'remada-cavalinho'],
    'remada-serrote':     ['remada-halteres', 'remada-unilateral', 'remada-cavalinho', 'remada-baixa', 'barra-fixa'],
    'supino-incl-halter': ['supino-inclinado', 'crucifixo-inclinado', 'chest-press', 'supino-smith', 'supino-halteres'],
    'encolhimento':       ['encolhimento-barra', 'encolhimento-smith', 'remada-alta', 'elevacao-lateral'],
    'crucifixo-inverso':  ['crucifixo-inv-maq', 'remada-alta', 'elevacao-polia', 'elevacao-lateral'],
    'desenvolvimento-barra': ['desenvolvimento-maq', 'arnold', 'desenvolvimento', 'elevacao-frontal', 'remada-alta'],
    'desenvolvimento-maq': ['desenvolvimento-barra', 'arnold', 'desenvolvimento', 'elevacao-frontal', 'remada-alta'],
    'elevacao-frontal':   ['elevacao-lateral', 'elevacao-polia', 'elevacao-maquina', 'remada-alta', 'arnold'],
    'remada-alta':        ['elevacao-lateral', 'encolhimento', 'elevacao-frontal', 'desenvolvimento-maq'],
    'rosca-scott':        ['rosca-concentrada', 'rosca-polia', 'rosca-inclinada', 'rosca-direta', 'rosca-corda'],
    'rosca-concentrada':  ['rosca-scott', 'rosca-alternada', 'rosca-polia', 'rosca-inclinada', 'rosca-corda'],
    'triceps-corda':      ['triceps-pulley', 'triceps-maquina', 'triceps-unilateral', 'mergulho-banco', 'triceps-coice'],
    'elevacao-pelvica':   ['agachamento-bulgaro', 'stiff', 'afundo', 'mesa-flexora', 'passada'],
    'agachamento-bulgaro': ['afundo', 'passada', 'elevacao-pelvica', 'leg-press', 'agachamento'],
    'afundo':             ['passada', 'agachamento-bulgaro', 'elevacao-pelvica', 'leg-press', 'agachamento'],
    'stiff':              ['stiff-halteres', 'terra', 'mesa-flexora', 'flexora-em-pe', 'elevacao-pelvica'],
    'abdominal':          ['prancha', 'abdominal-maquina', 'elevacao-pernas', 'abdominal-infra']
  };

  /** Procura um exercício em qualquer treino e, depois, no catálogo. */
  function exercicioGlobal(id) {
    let achado = null;
    Object.keys(exercicios).some((tipoId) => {
      achado = exercicios[tipoId].find((e) => e.id === id);
      return !!achado;
    });
    return achado || catalogo[id] || null;
  }

  /** Substituições sugeridas para um exercício. */
  function alternativasDe(exercicioId) {
    return (alternativas[exercicioId] || []).map(exercicioGlobal).filter(Boolean);
  }

  /* O que o usuário registrou fica no localStorage e é lido na abertura. */
  const CHAVE_HISTORICO = 'gym:historico';

  function historicoSalvo() {
    try {
      const bruto = localStorage.getItem(CHAVE_HISTORICO);
      return bruto ? JSON.parse(bruto) : {};
    } catch (erro) {
      return {};
    }
  }

  function guardarHistorico(mapa) {
    try {
      localStorage.setItem(CHAVE_HISTORICO, JSON.stringify(mapa));
    } catch (erro) {
      // Sem storage: o registro vale só para esta sessão.
    }
  }

  const salvos = historicoSalvo();
  Object.keys(salvos).forEach((data) => treinos.set(data, salvos[data]));
  invalidarCache();

  /** Grava o treino de hoje no calendário e no armazenamento local. */
  function registrarTreino(tipoId, exercicioIds, minutos, fichas) {
    const hoje = Utils.iso(Utils.hoje());
    const registro = {
      tipoId: tipoId,
      exercicios: exercicioIds.slice(),
      fichas: fichas || {},
      duracao: Math.max(1, minutos)
    };
    treinos.set(hoje, registro);
    invalidarCache();

    const mapa = historicoSalvo();
    mapa[hoje] = registro;
    guardarHistorico(mapa);

    return hoje;
  }


  /** Todos os exercícios conhecidos: os dos treinos e os do catálogo. */
  function todosOsExercicios() {
    const vistos = {};
    const lista = [];
    Object.keys(exercicios).forEach((tipoId) => {
      exercicios[tipoId].forEach((e) => {
        if (!vistos[e.id]) { vistos[e.id] = true; lista.push(e); }
      });
    });
    Object.keys(catalogo).forEach((id) => {
      if (!vistos[id]) { vistos[id] = true; lista.push(catalogo[id]); }
    });
    return lista;
  }

  /**
   * Candidatos para acrescentar ao treino: só os grupos musculares
   * que aquele treino já trabalha, e sem repetir o que está na lista.
   */
  function candidatosPara(tipoId, idsAtuais) {
    const grupos = exerciciosDe(tipoId).map((e) => e.grupo);
    return todosOsExercicios()
      .filter((e) => grupos.indexOf(e.grupo) !== -1 && idsAtuais.indexOf(e.id) === -1)
      .sort((a, b) => {
        const ordem = grupos.indexOf(a.grupo) - grupos.indexOf(b.grupo);
        return ordem !== 0 ? ordem : a.nome.localeCompare(b.nome, 'pt-BR');
      });
  }

  /** Tipo de treino pelo identificador. */
  function tipoPorId(id) {
    return tipos.find((t) => t.id === id);
  }

  /** Exercícios de um tipo de treino. */
  function exerciciosDe(tipoId) {
    return exercicios[tipoId] || [];
  }

  return {
    app, treinos, tipos, porSistema, tipoPorId, exerciciosDe, exercicioGlobal,
    alternativasDe, registroDe, registrarTreino, candidatosPara,
    historico, volumeDoTreino, evolucaoDe, exerciciosComEvolucao,
    titulos, tituloDaSequencia, proximoTitulo
  };
})();
