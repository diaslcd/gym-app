/* Navegação entre telas: cada view recebe um container novo,
   então listeners antigos morrem junto com o nó anterior. */
const Router = (() => {
  const telas = {};
  let raiz = null;

  function registrar(nome, view) {
    telas[nome] = view;
  }

  function ir(nome, params) {
    // A tela que sai deixa de receber o tique do cronômetro.
    if (typeof Sessao !== 'undefined') Sessao.observar(null);

    const tela = document.createElement('div');
    tela.className = 'tela';
    raiz.replaceChildren(tela);
    telas[nome].montar(tela, params);
    window.scrollTo(0, 0);
  }

  function iniciar(elemento, telaInicial) {
    raiz = elemento;
    ir(telaInicial);
  }

  return { registrar, ir, iniciar };
})();
