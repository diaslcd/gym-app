/* As três áreas do app e a barra que troca entre elas.

   Até aqui o app tinha uma tela-raiz só, o painel, e tudo saía dela.
   Com uma terceira área isso deixou de servir: Nutrição e Social não são
   destinos do treino, são vizinhos dele. A barra inferior põe as três no
   mesmo nível e a um toque de distância.

   Quem mais sente a mudança é o botão voltar do Android, que antes
   sabia que "estou no painel" significava "cheguei ao fim". Agora há
   três raízes, e a regra passa a ser a do Material Design: de uma aba
   secundária o voltar leva à aba inicial; só da inicial ele sai do app.
   Assim o voltar nunca fecha o app de surpresa vindo do Social. */
const Abas = (() => {

  /* A ordem aqui é a ordem na barra. Treino vem primeiro por ser a
     aba inicial — a que o app abre e a que o voltar procura. */
  const abas = [
    {
      id: 'treino',
      nome: 'Treino',
      icone: '🏋️',
      raiz: 'dashboard',
      // Telas que pertencem a esta aba, para a barra saber qual acender.
      telas: ['dashboard', 'selecao', 'exercicios', 'detalhe', 'historico', 'plano']
    },
    {
      id: 'nutricao',
      nome: 'Nutrição',
      icone: '🥗',
      raiz: 'nutricao',
      telas: ['nutricao', 'alimento']
    },
    {
      id: 'social',
      nome: 'Social',
      icone: '👥',
      raiz: 'social',
      telas: ['social', 'perfil', 'ranking', 'grupos', 'grupo', 'desafios', 'desafio', 'conquistas', 'publicar']
    }
  ];

  const INICIAL = 'treino';

  /* Telas onde a barra não aparece.

     A entrada fica fora porque ainda não há para onde ir.
     A execução do treino fica fora por outro motivo: ali embaixo já mora
     a barra do treino em andamento, e duas barras empilhadas comem a
     tela do celular justamente na hora em que a pessoa está de pé, com o
     aparelho na mão, tentando marcar uma série. */
  const SEM_BARRA = ['login', 'exercicios', 'detalhe'];

  function lista() {
    return abas;
  }

  function porId(id) {
    return abas.find((a) => a.id === id) || null;
  }

  /** A qual aba pertence uma tela; null para as que não são de aba nenhuma. */
  function daTela(tela) {
    return abas.find((a) => a.telas.indexOf(tela) !== -1) || null;
  }

  function mostraBarra(tela) {
    return SEM_BARRA.indexOf(tela) === -1 && !!daTela(tela);
  }

  function ehRaiz(tela) {
    return abas.some((a) => a.raiz === tela);
  }

  function abaInicial() {
    return porId(INICIAL);
  }

  function ehRaizInicial(tela) {
    return tela === abaInicial().raiz;
  }

  /* ── A barra ─────────────────────────────────────────── */

  let barra = null;

  /* A barra vive fora do container de telas, presa ao rodapé.

     Se fosse filha da tela, sairia junto na animação de troca e piscaria
     a cada navegação. Fora dela, fica parada enquanto o conteúdo desliza
     por baixo — que é como barra de abas se comporta em app nativo. */
  function criar() {
    if (barra) return barra;
    barra = document.createElement('nav');
    barra.className = 'abas';
    barra.setAttribute('aria-label', 'Áreas do aplicativo');
    document.body.appendChild(barra);
    barra.addEventListener('click', (evento) => {
      const alvo = evento.target.closest('[data-aba]');
      if (!alvo) return;
      ir(alvo.dataset.aba);
    });
    return barra;
  }

  /**
   * Vai para uma aba. Tocar na aba em que já se está volta para a raiz
   * dela — é o que se espera de barra de abas, e serve de atalho para
   * sair de uma tela funda sem apertar voltar várias vezes.
   */
  function ir(id) {
    const aba = porId(id);
    if (!aba) return;
    if (Router.telaAtual() === aba.raiz) return;
    Router.ir(aba.raiz);
  }

  /** Repinta a barra para a tela atual; esconde onde ela não cabe. */
  function atualizar(tela) {
    criar();
    const visivel = mostraBarra(tela);
    barra.hidden = !visivel;
    document.body.classList.toggle('temAbas', visivel);
    if (!visivel) return;

    const atual = daTela(tela);
    barra.innerHTML = abas.map((a) => {
      const ligada = atual && atual.id === a.id;
      return `
        <button class="aba${ligada ? ' aba--on' : ''}" type="button" data-aba="${a.id}"
                aria-current="${ligada ? 'page' : 'false'}">
          <span class="aba__icone" aria-hidden="true">${a.icone}</span>
          <span class="aba__nome">${a.nome}</span>
        </button>`;
    }).join('');
  }

  return { lista, porId, daTela, mostraBarra, ehRaiz, abaInicial, ehRaizInicial, ir, atualizar };
})();
