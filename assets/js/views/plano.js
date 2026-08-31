/* Escolha de quantos dias por semana o usuário treina, e a divisão que
   isso recomenda. Aparece na primeira abertura e pode ser reaberta pelo
   painel para trocar. */
const TelaPlano = (() => {
  let raiz = null;
  let escolha = 0;
  let primeiraVez = false;

  function botaoDia(n) {
    const on = escolha === n;
    return `
      <button class="plano__dia${on ? ' plano__dia--on' : ''}" data-dias="${n}"
              type="button" aria-pressed="${on}">${n}</button>`;
  }

  function treinoSugerido(tipo, indice) {
    return `
      <li class="plano__treino" style="--cor:${tipo.cor}; --tinta:${tipo.tinta}">
        <span class="plano__ordem">${indice + 1}</span>
        <span class="plano__nome">${tipo.nome}</span>
      </li>`;
  }

  function sugestao() {
    if (!escolha) {
      return `<p class="plano__vazio">Escolha quantos dias e a divisão aparece aqui.</p>`;
    }

    const treinos = Plano.treinosDe(escolha);
    return `
      <div class="plano__sugestao">
        <p class="plano__contagem">
          <strong>${treinos.length} treinos</strong> na semana
        </p>
        <p class="plano__nota">${Plano.notaDe(escolha)}</p>
        <ol class="plano__lista">${treinos.map(treinoSugerido).join('')}</ol>
      </div>`;
  }

  function render() {
    const dias = [];
    for (let n = Plano.MINIMO; n <= Plano.MAXIMO; n++) dias.push(botaoDia(n));

    raiz.innerHTML = `
      <div class="plano">
        ${primeiraVez ? '' : Componentes.topo('Plano da semana', 'Quantos dias você treina')}
        ${primeiraVez ? '<h1 class="plano__titulo">Quantos dias<span>por semana?</span></h1>' : ''}

        <div class="plano__dias">${dias.join('')}</div>

        ${sugestao()}

        <button class="entrada__ir" data-seguir type="button" ${escolha ? '' : 'disabled'}>
          ${primeiraVez ? 'Bora treinar' : 'Salvar'}
        </button>
      </div>`;
  }

  function aoClicar(evento) {
    if (evento.target.closest('[data-voltar]')) {
      Router.ir('dashboard');
      return;
    }

    const dia = evento.target.closest('[data-dias]');
    if (dia) {
      escolha = Number(dia.dataset.dias);
      Plano.definir(escolha);
      render();
      return;
    }

    if (evento.target.closest('[data-seguir]') && escolha) {
      Router.ir('dashboard');
    }
  }

  function montar(elemento, params) {
    raiz = elemento;
    primeiraVez = !!(params && params.primeiraVez);
    escolha = Plano.dias();
    raiz.classList.add('arcade');
    raiz.addEventListener('click', aoClicar);
    render();
  }

  return { montar };
})();
