/* Controle de privacidade da área Social.

   Fica num módulo próprio, e não espalhado pelas telas, porque
   privacidade só funciona quando há um lugar único que responde
   "quem pode ver isto?". Espalhada, cada tela responde à sua maneira e
   uma delas esquece.

   Hoje o app não tem servidor: nada sai do aparelho, e portanto nada
   vaza de fato. Essas escolhas existem para que o dia em que houver
   servidor não seja o dia em que se começa a pensar no assunto — a
   visibilidade já vem gravada em cada publicação desde agora, e é isso
   que o envio vai respeitar. */
const Privacidade = (() => {
  const CHAVE = 'gym:social:privacidade';

  /* Três níveis, nesta ordem de abertura. Mais que isso vira menu que
     ninguém lê, e menos não cobre o caso de quem treina mas não quer
     aparecer para estranhos. */
  const OPCOES = [
    { id: 'publico', nome: 'Todos', icone: '🌎',
      descricao: 'Qualquer pessoa no app pode ver.' },
    { id: 'amigos', nome: 'Amigos', icone: '👥',
      descricao: 'Só quem você segue e quem te segue.' },
    { id: 'privado', nome: 'Só eu', icone: '🔒',
      descricao: 'Fica no seu histórico e não aparece para ninguém.' }
  ];

  const PADRAO = {
    // O padrão é o meio-termo, não o mais aberto: quem quiser expor
    // mais escolhe, e quem não reparar na opção não é exposto por
    // omissão.
    publicacao: 'amigos',
    perfil: 'amigos',
    // Estes três já existem no formato para quando houver com quem
    // interagir; hoje não há, e a interface não os oferece ainda.
    quemPodeSeguir: 'todos',
    quemPodeComentar: 'amigos',
    quemPodeAdicionarEmGrupo: 'amigos',
    // Aparecer no ranking é escolha à parte: dá para competir sem
    // publicar nada, e dá para publicar sem entrar no ranking.
    apareceNoRanking: true
  };

  function ler() {
    try {
      const bruto = localStorage.getItem(CHAVE);
      const salvo = bruto ? JSON.parse(bruto) : {};
      return Object.assign({}, PADRAO, salvo);
    } catch (erro) {
      return Object.assign({}, PADRAO);
    }
  }

  function gravar(mudancas) {
    const novo = Object.assign(ler(), mudancas);
    try {
      localStorage.setItem(CHAVE, JSON.stringify(novo));
    } catch (erro) {
      // Sem storage: vale só nesta sessão.
    }
    return novo;
  }

  function tudo() {
    return ler();
  }

  function opcaoPorId(id) {
    return OPCOES.find((o) => o.id === id) || OPCOES[1];
  }

  function dePublicacao() {
    return ler().publicacao;
  }

  function definirDePublicacao(id) {
    return gravar({ publicacao: opcaoPorId(id).id });
  }

  function doPerfil() {
    return ler().perfil;
  }

  function definirDoPerfil(id) {
    return gravar({ perfil: opcaoPorId(id).id });
  }

  function apareceNoRanking() {
    return ler().apareceNoRanking !== false;
  }

  function definirRanking(valor) {
    return gravar({ apareceNoRanking: !!valor });
  }

  /**
   * A publicação pode ser vista por quem está olhando?
   *
   * Hoje só existe uma pessoa — a dona do aparelho — e ela vê tudo que
   * é dela. A função já recebe quem observa para que a regra fique
   * escrita num lugar só quando houver mais gente.
   */
  function podeVer(publicacao, observador) {
    if (!publicacao) return false;
    const quem = observador || 'eu';

    // O dono sempre vê o que é dele, inclusive o que marcou como privado.
    if (publicacao.autor === quem) return true;

    const nivel = publicacao.visibilidade || 'amigos';
    if (nivel === 'privado') return false;
    if (nivel === 'publico') return true;
    // 'amigos': depende de uma relação que ainda não existe no app.
    return !!publicacao.deAmigo;
  }

  return {
    OPCOES, PADRAO,
    tudo, opcaoPorId,
    dePublicacao, definirDePublicacao,
    doPerfil, definirDoPerfil,
    apareceNoRanking, definirRanking,
    podeVer
  };
})();
