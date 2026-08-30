/* Seleção do tipo de treino. */
const Selecao = (() => {
  /** Arte do treino quando houver; o pictograma do músculo enquanto não. */
  function arte(tipo) {
    const imagem = Ilustracoes.de(tipo.id);
    return imagem
      ? `<img class="opcao__arte" src="${imagem}" alt="" loading="lazy">`
      : Icones.musculo(tipo.id);
  }

  function opcao(tipo, indice) {
    return `
      <button class="opcao" data-tipo="${tipo.id}"
              style="--cor:${tipo.cor}; --tinta:${tipo.tinta}; --giro:${indice % 2 ? 1 : -1}deg">
        <span class="opcao__icone">${arte(tipo)}</span>
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
