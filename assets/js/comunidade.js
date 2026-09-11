/* Comunidade: ranking, grupos e desafios.

   AVISO QUE PRECISA FICAR NO TOPO
   Os outros perfis daqui são de demonstração. O app não tem servidor,
   então não existe ninguém do outro lado — e um ranking contra pessoas
   inventadas, apresentado como se fosse real, seria mentira da parte do
   app. Cada perfil fictício carrega `demo: true` e a interface o marca.

   O que é de verdade: a sua pontuação, os seus treinos, a sua sequência
   e o seu progresso nos desafios. Tudo isso sai de `SocialDados`, que
   por sua vez sai dos treinos que você realmente registrou.

   COMO ISSO VIRA REAL
   As funções abaixo têm a forma que teriam se buscassem do servidor —
   recebem quem pergunta, devolvem lista pronta e ordenada. Trocar a
   origem dos participantes é trocar `perfisDemo()` por uma chamada de
   rede; ranking, grupo e desafio continuam somando do mesmo jeito. */
const Comunidade = (() => {
  const CHAVE_GRUPOS = 'gym:social:grupos';
  const CHAVE_DESAFIOS = 'gym:social:desafios';

  function ler(chave, padrao) {
    try {
      const bruto = localStorage.getItem(chave);
      const v = bruto ? JSON.parse(bruto) : padrao;
      return v === null || v === undefined ? padrao : v;
    } catch (erro) {
      return padrao;
    }
  }

  function gravar(chave, valor) {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
      return true;
    } catch (erro) {
      return false;
    }
  }

  /* ── Perfis de demonstração ──────────────────────────── */

  /* Pontuações fixas, não sorteadas a cada abertura: ranking que muda
     sozinho quando ninguém treinou não é ranking, é ruído. Elas ficam
     espalhadas o bastante para que a sua posição mude de verdade
     conforme você acumula pontos. */
  const DEMOS = [
    { id: 'demo-1', nome: 'Rafael',  avatar: '🦊', pontos: 5240, treinos: 112, sequencia: 31, demo: true },
    { id: 'demo-2', nome: 'Camila',  avatar: '🐯', pontos: 4680, treinos: 98,  sequencia: 18, demo: true },
    { id: 'demo-3', nome: 'Diego',   avatar: '🐻', pontos: 3915, treinos: 84,  sequencia: 12, demo: true },
    { id: 'demo-4', nome: 'Juliana', avatar: '🦉', pontos: 3120, treinos: 67,  sequencia: 9,  demo: true },
    { id: 'demo-5', nome: 'Marcos',  avatar: '🐺', pontos: 2450, treinos: 52,  sequencia: 6,  demo: true },
    { id: 'demo-6', nome: 'Bia',     avatar: '🐨', pontos: 1780, treinos: 38,  sequencia: 4,  demo: true },
    { id: 'demo-7', nome: 'Thiago',  avatar: '🦁', pontos: 980,  treinos: 21,  sequencia: 3,  demo: true },
    { id: 'demo-8', nome: 'Letícia', avatar: '🐰', pontos: 420,  treinos: 9,   sequencia: 2,  demo: true }
  ];

  function perfisDemo() {
    return DEMOS.slice();
  }

  /** Você, no mesmo formato dos demais, para as listas não terem exceção. */
  function eu() {
    return {
      id: 'eu',
      nome: Perfil.nome() || 'Você',
      avatar: '💪',
      pontos: SocialDados.pontosTotais(),
      treinos: Dados.totalDeTreinos(),
      sequencia: Utils.sequenciaAtual(Dados.treinos),
      demo: false,
      souEu: true
    };
  }

  /* ── Ranking individual ──────────────────────────────── */

  /**
   * Todos ordenados por pontos, com a posição já calculada.
   *
   * Quem desliga "aparecer no ranking" some da lista, mas continua
   * vendo o ranking — escolher não competir não é o mesmo que escolher
   * não acompanhar.
   */
  function ranking() {
    const lista = perfisDemo();
    if (Privacidade.apareceNoRanking()) lista.push(eu());

    lista.sort((a, b) => b.pontos - a.pontos || a.nome.localeCompare(b.nome, 'pt-BR'));
    return lista.map((p, i) => Object.assign({}, p, { posicao: i + 1 }));
  }

  /** Sua linha no ranking, ou null quando você optou por ficar fora. */
  function minhaPosicao() {
    return ranking().find((p) => p.souEu) || null;
  }

  /* ── Grupos ──────────────────────────────────────────── */

  /* Um grupo guarda quem participa por id. A pontuação não é gravada:
     é somada na hora, a partir dos participantes — assim ela nunca fica
     defasada em relação aos treinos de quem está dentro. */

  function grupos() {
    const lista = ler(CHAVE_GRUPOS, []);
    return Array.isArray(lista) ? lista : [];
  }

  function grupoPorId(id) {
    return grupos().find((g) => g.id === id) || null;
  }

  function novoId(prefixo) {
    return prefixo + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  /**
   * Cria um grupo. Quem cria entra como participante e dono — grupo sem
   * o próprio criador dentro seria só uma lista.
   */
  function criarGrupo(dados) {
    const grupo = {
      id: novoId('g'),
      nome: (dados.nome || 'Meu grupo').trim().slice(0, 40),
      descricao: (dados.descricao || '').trim().slice(0, 140),
      emoji: dados.emoji || '🔥',
      privado: dados.privado !== false,   // privado por padrão
      dono: 'eu',
      participantes: ['eu'].concat(dados.participantes || []),
      criadoEm: Utils.iso(Utils.hoje())
    };
    gravar(CHAVE_GRUPOS, grupos().concat([grupo]));
    return grupo;
  }

  function atualizarGrupo(id, mudancas) {
    const lista = grupos();
    const i = lista.findIndex((g) => g.id === id);
    if (i === -1) return null;
    lista[i] = Object.assign({}, lista[i], mudancas);
    gravar(CHAVE_GRUPOS, lista);
    return lista[i];
  }

  function sairDoGrupo(id) {
    const g = grupoPorId(id);
    if (!g) return;
    // Dono que sai leva o grupo junto: sem ele não há quem administre.
    if (g.dono === 'eu') gravar(CHAVE_GRUPOS, grupos().filter((x) => x.id !== id));
    else atualizarGrupo(id, { participantes: g.participantes.filter((p) => p !== 'eu') });
  }

  function perfilPorId(id) {
    if (id === 'eu') return eu();
    return DEMOS.find((d) => d.id === id) || null;
  }

  /** Grupo com participantes resolvidos e pontuação somada. */
  function grupoCompleto(id) {
    const g = grupoPorId(id);
    if (!g) return null;

    const membros = g.participantes.map(perfilPorId).filter(Boolean)
      .sort((a, b) => b.pontos - a.pontos);

    return Object.assign({}, g, {
      membros: membros,
      pontos: membros.reduce((s, m) => s + m.pontos, 0),
      quantos: membros.length
    });
  }

  /**
   * Ranking de grupos: os seus, somados e ordenados.
   *
   * Grupos de demonstração entram para a comparação existir mesmo antes
   * de você criar o primeiro — e são marcados como tal, pelo mesmo
   * motivo dos perfis.
   */
  function rankingDeGrupos() {
    const meus = grupos().map((g) => grupoCompleto(g.id)).filter(Boolean);

    const exemplos = [
      { id: 'gdemo-1', nome: 'Fábrica de Monstro', emoji: '👹', pontos: 41200, quantos: 11, demo: true },
      { id: 'gdemo-2', nome: 'Projeto Verão',      emoji: '🌊', pontos: 33850, quantos: 8,  demo: true },
      { id: 'gdemo-3', nome: 'Turma da Manhã',     emoji: '🌅', pontos: 26400, quantos: 7,  demo: true }
    ];

    return meus.concat(exemplos)
      .sort((a, b) => b.pontos - a.pontos)
      .map((g, i) => Object.assign({}, g, { posicao: i + 1 }));
  }

  /* ── Desafios ────────────────────────────────────────── */

  /* Cada desafio sabe medir o próprio progresso a partir do que já está
     registrado. Nada é contado à parte: o número que aparece vem dos
     mesmos treinos do calendário, então não há como divergir. */
  const MODELOS = [
    {
      id: 'd-30dias',
      nome: 'Desafio 30 dias',
      emoji: '📅',
      descricao: 'Treine pelo menos 20 dias nos próximos 30.',
      alvo: 20,
      unidade: 'treinos',
      dias: 30,
      premio: 500,
      medir: function (inicio, fim) {
        return diasComTreino(inicio, fim);
      }
    },
    {
      id: 'd-consistencia',
      nome: 'Consistência',
      emoji: '🔁',
      descricao: 'Não fique mais de 2 dias sem registrar treino.',
      alvo: 14,
      unidade: 'dias mantidos',
      dias: 14,
      premio: 300,
      medir: function (inicio, fim) {
        return diasSemFalhaLonga(inicio, fim);
      }
    },
    {
      id: 'd-pontos',
      nome: 'Corrida de pontos',
      emoji: '⚡',
      descricao: 'Faça 3.000 pontos dentro do mês.',
      alvo: 3000,
      unidade: 'pontos',
      dias: 30,
      premio: 400,
      medir: function (inicio, fim) {
        return pontosEntre(inicio, fim);
      }
    }
  ];

  function diasComTreino(inicio, fim) {
    let total = 0;
    for (let d = new Date(inicio); d <= fim; d = Utils.somarDias(d, 1)) {
      if (Dados.registrosDe(Utils.iso(d)).length) total++;
    }
    return total;
  }

  /* Quantos dias desde o início sem que houvesse três dias seguidos sem
     treino. Para no primeiro buraco grande: é essa a regra do desafio. */
  function diasSemFalhaLonga(inicio, fim) {
    let seguidosSemTreino = 0;
    let dias = 0;
    for (let d = new Date(inicio); d <= fim; d = Utils.somarDias(d, 1)) {
      if (Dados.registrosDe(Utils.iso(d)).length) seguidosSemTreino = 0;
      else seguidosSemTreino++;
      if (seguidosSemTreino > 2) break;
      dias++;
    }
    return dias;
  }

  function pontosEntre(inicio, fim) {
    let total = 0;
    for (let d = new Date(inicio); d <= fim; d = Utils.somarDias(d, 1)) {
      total += SocialDados.pontosDe(Utils.iso(d));
    }
    return total;
  }

  function inscricoes() {
    const v = ler(CHAVE_DESAFIOS, {});
    return v && typeof v === 'object' ? v : {};
  }

  /** Entra no desafio. A data de início é hoje, e é ela que ancora tudo. */
  function entrarNoDesafio(modeloId) {
    const modelo = MODELOS.find((m) => m.id === modeloId);
    if (!modelo) return null;
    const todas = inscricoes();
    todas[modeloId] = { inicio: Utils.iso(Utils.hoje()), premiado: false };
    gravar(CHAVE_DESAFIOS, todas);
    return todas[modeloId];
  }

  function sairDoDesafio(modeloId) {
    const todas = inscricoes();
    delete todas[modeloId];
    gravar(CHAVE_DESAFIOS, todas);
  }

  /**
   * Todos os desafios com o estado de cada um: inscrito ou não, quanto
   * já foi feito, quanto falta e quantos dias restam.
   */
  function desafios() {
    const todas = inscricoes();
    const hoje = Utils.hoje();

    return MODELOS.map((m) => {
      const inscricao = todas[m.id];
      if (!inscricao) {
        return Object.assign({}, m, { inscrito: false, feito: 0, progresso: 0 });
      }

      const inicio = new Date(inscricao.inicio + 'T00:00:00');
      const termina = Utils.somarDias(inicio, m.dias);
      const limite = hoje < termina ? hoje : termina;
      const feito = m.medir(inicio, limite);
      const restam = Math.max(0, Math.round((termina - hoje) / 86400000));

      return Object.assign({}, m, {
        inscrito: true,
        inicio: inscricao.inicio,
        feito: feito,
        progresso: Math.min(100, Math.round((feito / m.alvo) * 100)),
        concluido: feito >= m.alvo,
        diasRestantes: restam,
        expirado: restam === 0 && feito < m.alvo
      });
    });
  }

  return {
    perfisDemo, eu, perfilPorId,
    ranking, minhaPosicao,
    grupos, grupoPorId, grupoCompleto, criarGrupo, atualizarGrupo, sairDoGrupo,
    rankingDeGrupos,
    desafios, entrarNoDesafio, sairDoDesafio
  };
})();
