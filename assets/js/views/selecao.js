/* Seleção do tipo de treino: primeiro o que o plano da semana
   recomenda, depois o resto agrupado pelo sistema de divisão. */
const Selecao = (() => {
  /* Só quem tem arte mostra o quadro. Os treinos sem imagem ficam sem
     ícone de propósito, até a arte deles ficar pronta — um pictograma
     genérico ao lado de uma foto parecia descuido, não escolha. */
  function arte(tipo) {
    const imagem = Ilustracoes.de(tipo.id);
    return imagem
      ? `<span class="opcao__icone"><img class="opcao__arte" src="${imagem}" alt="" loading="lazy"></span>`
      : '';
  }

  function opcao(tipo, indice) {
    return `
      <button class="opcao" data-tipo="${tipo.id}"
              style="--cor:${tipo.cor}; --tinta:${tipo.tinta}; --giro:${indice % 2 ? 1 : -1}deg">
        ${arte(tipo)}
        <span class="opcao__texto">
          <span class="opcao__nome">${tipo.nome}</span>
          <span class="opcao__desc">${tipo.descricao}</span>
          <span class="opcao__tag">${Dados.exerciciosDe(tipo.id).length} exercícios</span>
        </span>
        <span class="opcao__seta" aria-hidden="true">→</span>
      </button>`;
  }

  function sistema(grupo) {
    return `
      <section class="sistema${grupo.destaque ? ' sistema--plano' : ''}">
        <h2 class="sistema__nome">${grupo.nome}</h2>
        ${grupo.resumo ? `<p class="sistema__resumo">${grupo.resumo}</p>` : ''}
        <div class="opcoes">${grupo.tipos.map(opcao).join('')}</div>
      </section>`;
  }

  /* O plano repete treino quando a semana pede — dois dias é corpo
     inteiro duas vezes. Na lista cada um aparece uma vez só. */
  function semRepetir(tipos) {
    const vistos = {};
    return tipos.filter((tipo) => {
      if (vistos[tipo.id]) return false;
      vistos[tipo.id] = true;
      return true;
    });
  }

  /** Plano no topo; o resto do catálogo abaixo, sem repetir o que subiu. */
  function grupos() {
    if (!Plano.escolhido()) return Dados.porSistema();

    const dias = Plano.dias();
    const recomendados = semRepetir(Plano.treinosDe(dias));
    if (!recomendados.length) return Dados.porSistema();

    const noPlano = {};
    recomendados.forEach((tipo) => { noPlano[tipo.id] = true; });

    const resto = Dados.porSistema()
      .map((grupo) => ({
        nome: grupo.nome,
        resumo: grupo.resumo,
        tipos: grupo.tipos.filter((tipo) => !noPlano[tipo.id])
      }))
      .filter((grupo) => grupo.tipos.length);

    return [{
      nome: 'Seu plano da semana',
      resumo: Plano.notaDe(dias),
      tipos: recomendados,
      destaque: true
    }].concat(resto);
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
      ${grupos().map(sistema).join('')}`;
    raiz.addEventListener('click', aoClicar);
  }

  return { montar };
})();
