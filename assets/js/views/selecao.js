/* Seleção do tipo de treino. */
const Selecao = (() => {
  /* Quando há arte, o card é a arte: o render já traz nome, descrição e
     contagem desenhados, e repetir isso por fora seria dizer duas vezes.
     O nome vai no aria-label, para quem navega por leitor de tela. */
  function cartaz(tipo, indice) {
    return `
      <button class="opcao opcao--arte" data-tipo="${tipo.id}"
              style="--giro:${indice % 2 ? 1 : -1}deg"
              aria-label="${tipo.nome} · ${Dados.exerciciosDe(tipo.id).length} exercícios">
        <img class="opcao__arte" src="${Ilustracoes.de(tipo.id)}" alt="" loading="lazy">
      </button>`;
  }

  function opcao(tipo, indice) {
    if (Ilustracoes.de(tipo.id)) return cartaz(tipo, indice);

    return `
      <button class="opcao" data-tipo="${tipo.id}"
              style="--cor:${tipo.cor}; --tinta:${tipo.tinta}; --giro:${indice % 2 ? 1 : -1}deg">
        <span class="opcao__icone">${Icones.musculo(tipo.id)}</span>
        <span class="opcao__texto">
          <span class="opcao__nome">${tipo.nome}</span>
          <span class="opcao__desc">${tipo.descricao}</span>
          <span class="opcao__tag">${Dados.exerciciosDe(tipo.id).length} exercícios</span>
        </span>
        <span class="opcao__seta" aria-hidden="true">→</span>
      </button>`;
  }

  function aoClicar(evento) {
    if (evento.target.closest('[data-voltar]')) {
      Router.ir('dashboard');
      return;
    }
    const escolha = evento.target.closest('[data-tipo]');
    if (escolha) Router.ir('exercicios', { tipoId: escolha.dataset.tipo });
  }

  function montar(raiz) {
    raiz.classList.add('arcade');
    raiz.innerHTML = `
      ${Componentes.topo('Escolha o treino', 'Selecione o grupo muscular de hoje')}
      <section class="opcoes">
        ${Dados.tipos.map(opcao).join('')}
      </section>`;
    raiz.addEventListener('click', aoClicar);
  }

  return { montar };
})();
