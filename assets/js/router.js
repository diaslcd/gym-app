/* Navegação entre telas: cada view recebe um container novo,
   então listeners antigos morrem junto com o nó anterior.

   Cada tela também vira uma entrada no histórico do navegador. É o que
   faz o botão voltar do Android andar para trás dentro do app em vez de
   fechá-lo — sem isso o app é uma página só, e o sistema entende que
   voltar significa sair. No painel, que é a primeira entrada, voltar
   sai do app, que é o esperado. */
const Router = (() => {
  const telas = {};
  let raiz = null;
  let atual = null;

  function registrar(nome, view) {
    telas[nome] = view;
  }

  function pintar(nome, params) {
    // A tela que sai deixa de receber o tique do cronômetro.
    if (typeof Sessao !== 'undefined') Sessao.observar(null);

    atual = nome;
    const tela = document.createElement('div');
    tela.className = 'tela';
    raiz.replaceChildren(tela);
    telas[nome].montar(tela, params);
    window.scrollTo(0, 0);
  }

  function ir(nome, params) {
    try {
      history.pushState({ tela: nome, params: params || null }, '');
    } catch (erro) {
      // Sem history disponível: navega mesmo assim, só sem o voltar.
    }
    pintar(nome, params);
  }

  /** Voltar do sistema: repinta o que estiver na entrada anterior. */
  function aoVoltar(evento) {
    const estado = evento.state;
    if (!estado || !telas[estado.tela]) return;
    pintar(estado.tela, estado.params || undefined);
  }

  function iniciar(elemento, telaInicial) {
    raiz = elemento;
    try {
      history.replaceState({ tela: telaInicial, params: null }, '');
    } catch (erro) {
      // Idem: o app funciona, só sem integração com o voltar.
    }
    window.addEventListener('popstate', aoVoltar);
    pintar(telaInicial);
  }

  /** Tela visível agora, para quem precisa decidir com base nela. */
  function telaAtual() {
    return atual;
  }

  return { registrar, ir, iniciar, telaAtual };
})();
