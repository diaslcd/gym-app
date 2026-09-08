/* Aba Social: comunidade, pontos e progresso.

   Esta é a casca da área — o feed, o ranking e os grupos entram nos
   próximos passos. O que já existe aqui é a estrutura de tela e o estado
   vazio, que é a primeira coisa que qualquer pessoa vê e a última que
   costuma ser feita com cuidado.

   O estado vazio não diz "nada aqui": diz o que fazer para preencher, e
   leva até lá. Quem abre o Social antes de treinar precisa entender que
   é o treino que alimenta esta aba, não o contrário. */
const Social = (() => {
  let raiz = null;

  function cabecalho() {
    return `
      <header class="socialTopo">
        <h1 class="socialTopo__titulo">Social</h1>
        <p class="socialTopo__sub">seu progresso e o da sua turma</p>
      </header>`;
  }

  function estadoVazio() {
    return `
      <div class="socialVazio">
        <span class="socialVazio__icone" aria-hidden="true">🔥</span>
        <p class="socialVazio__titulo">Sua atividade aparece aqui</p>
        <p class="socialVazio__texto">
          Cada treino concluído vira pontos e uma publicação — se você quiser.
          Comece treinando; o resto se preenche sozinho.
        </p>
        <button class="socialVazio__acao" data-treinar type="button">Ir para o treino</button>
      </div>`;
  }

  function render() {
    raiz.innerHTML = cabecalho() + estadoVazio();
  }

  function aoClicar(evento) {
    if (evento.target.closest('[data-treinar]')) Abas.ir('treino');
  }

  function montar(elemento) {
    raiz = elemento;
    raiz.classList.add('arcade', 'arcade--social');
    raiz.addEventListener('click', aoClicar);
    render();
  }

  return { montar };
})();
