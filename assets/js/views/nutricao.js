/* Área de Nutrição: pesquisa de alimentos e pratos.

   Mora no mesmo app do treino e usa os mesmos blocos — topo, cards de
   borda grossa, sombra sólida. O que a distingue é a cor: a seção puxa
   para o verde, então dá para saber onde se está sem ler o título.

   A tela abre com o campo de busca em foco e o teclado já disponível,
   porque quem entra aqui quase sempre veio procurar alguma coisa. Quem
   não sabe o que procurar tem categorias, favoritos e o que consultou
   por último logo abaixo. */
const NutricaoView = (() => {
  let raiz = null;
  let consulta = '';
  let categoriaAberta = null;

  /* Quantos resultados mostrar. Passar disso vira rolagem longa no
     celular e a busca perde a graça — quem não achou nos primeiros
     refina o termo. */
  const MAX_RESULTADOS = 12;

  function macrosResumo(v) {
    return `
      <span class="nutriItem__macros">
        <span class="nutriMacro nutriMacro--kcal">${v.kcal} kcal</span>
        <span class="nutriMacro">P ${v.prot}</span>
        <span class="nutriMacro">C ${v.carb}</span>
        <span class="nutriMacro">G ${v.gord}</span>
      </span>`;
  }

  /* Uma linha da lista. Mostra sempre a porção a que os números se
     referem — número solto não diz nada, e é o erro clássico de app de
     nutrição. */
  function linha(entrada) {
    const item = entrada.item;
    const ePrato = entrada.tipo === 'prato';
    const favorito = Nutricao.eFavorito(item.id);

    let valores;
    let referencia;
    if (ePrato) {
      const conta = Nutricao.calcularPrato(item);
      valores = conta.total;
      referencia = `prato de ${conta.total.gramas} g · ${item.itens.length} itens`;
    } else {
      const porcao = item.porcoes && item.porcoes[0];
      const g = porcao ? porcao.g : 100;
      valores = Nutricao.calcular(item, g);
      referencia = porcao
        ? `${porcao.nome} · ${g} ${Nutricao.unidade(item)}`
        : `100 ${Nutricao.unidade(item)}`;
    }

    const cat = ePrato ? null : Nutricao.categoriaPorId(item.cat);

    return `
      <li class="nutriItem${ePrato ? ' nutriItem--prato' : ''}">
        <button class="nutriItem__abrir" type="button"
                data-abrir="${item.id}" data-tipo="${entrada.tipo}">
          <span class="nutriItem__topo">
            <span class="nutriItem__selo" style="--cor:${ePrato ? '#00E5A0' : (cat ? cat.cor : '#8AC926')}">
              ${ePrato ? '🍽️' : (cat ? cat.emoji : '🍽️')}
            </span>
            <span class="nutriItem__texto">
              <span class="nutriItem__nome">${item.nome}</span>
              <span class="nutriItem__ref">${referencia}</span>
            </span>
          </span>
          ${macrosResumo(valores)}
        </button>
        <button class="nutriItem__fav${favorito ? ' nutriItem__fav--on' : ''}"
                type="button" data-fav="${item.id}"
                aria-label="${favorito ? 'Tirar dos favoritos' : 'Guardar nos favoritos'}"
                aria-pressed="${favorito}">★</button>
      </li>`;
  }

  function lista(entradas) {
    return `<ul class="nutriLista">${entradas.map(linha).join('')}</ul>`;
  }

  function campoDeBusca() {
    return `
      <div class="nutriBusca">
        <span class="nutriBusca__lupa" aria-hidden="true">🔎</span>
        <input class="nutriBusca__campo" type="search" data-busca
               value="${consulta}" placeholder="Arroz, frango, pizza…"
               enterkeyhint="search" autocomplete="off"
               autocapitalize="none" autocorrect="off"
               aria-label="Pesquisar alimento ou prato">
        ${consulta ? '<button class="nutriBusca__limpar" type="button" data-limpar aria-label="Limpar busca">✕</button>' : ''}
      </div>`;
  }

  function blocoCategorias() {
    if (categoriaAberta) {
      const cat = Nutricao.categoriaPorId(categoriaAberta);
      const itens = Nutricao.porCategoria(categoriaAberta)
        .map((a) => ({ item: a, tipo: 'alimento' }));
      return `
        <section class="nutriBloco">
          <div class="nutriBloco__topo">
            <h2 class="nutriBloco__titulo">${cat.emoji} ${cat.nome}</h2>
            <button class="nutriBloco__acao" type="button" data-fechar-cat>voltar</button>
          </div>
          ${lista(itens)}
        </section>`;
    }

    return `
      <section class="nutriBloco">
        <h2 class="nutriBloco__titulo">Categorias</h2>
        <div class="nutriCats">
          ${Nutricao.categorias.map((c) => `
            <button class="nutriCat" type="button" data-cat="${c.id}" style="--cor:${c.cor}">
              <span class="nutriCat__emoji">${c.emoji}</span>
              <span class="nutriCat__nome">${c.nome}</span>
            </button>`).join('')}
        </div>
      </section>`;
  }

  function blocoPratos() {
    const itens = Nutricao.pratos.slice(0, 4).map((p) => ({ item: p, tipo: 'prato' }));
    return `
      <section class="nutriBloco">
        <h2 class="nutriBloco__titulo">Refeições prontas</h2>
        <p class="nutriBloco__nota">Pratos montados com porções comuns. Dá para ver e ajustar de onde vem cada valor.</p>
        ${lista(itens)}
      </section>`;
  }

  function blocoFavoritos() {
    const favs = Nutricao.listaFavoritos();
    if (!favs.length) return '';
    return `
      <section class="nutriBloco">
        <h2 class="nutriBloco__titulo">★ Favoritos</h2>
        ${lista(favs)}
      </section>`;
  }

  function blocoRecentes() {
    const recs = Nutricao.listaRecentes();
    if (!recs.length) return '';
    return `
      <section class="nutriBloco">
        <div class="nutriBloco__topo">
          <h2 class="nutriBloco__titulo">Consultados por último</h2>
          <button class="nutriBloco__acao" type="button" data-limpar-recentes>limpar</button>
        </div>
        ${lista(recs)}
      </section>`;
  }

  function resultados() {
    const achados = Nutricao.buscar(consulta, MAX_RESULTADOS);

    if (!achados.length) {
      return `
        <section class="nutriBloco">
          <div class="nutriVazio">
            <p class="nutriVazio__titulo">Nada encontrado para “${consulta}”.</p>
            <p class="nutriVazio__dica">Tente o nome simples do alimento — “frango”, “arroz”, “pão” — ou escolha uma categoria abaixo.</p>
          </div>
          ${blocoCategorias()}
        </section>`;
    }

    return `
      <section class="nutriBloco">
        <h2 class="nutriBloco__titulo">${achados.length} ${achados.length === 1 ? 'resultado' : 'resultados'}</h2>
        ${lista(achados)}
      </section>`;
  }

  function render(manterFoco) {
    const posicao = manterFoco ? consulta.length : null;

    raiz.innerHTML = `
      ${Componentes.topo('Nutrição', 'o que tem no seu prato')}
      <div class="nutri">
        ${campoDeBusca()}
        ${consulta
          ? resultados()
          : blocoCategorias() + blocoFavoritos() + blocoRecentes() + blocoPratos()}
        <p class="nutriRodape">
          Valores de referência da <strong>TACO/Unicamp</strong> e do <strong>USDA</strong>, por
          100 ${'g'} do alimento. O que está no seu prato varia com o corte, o preparo e a
          quantidade — use como orientação, não como medida exata.
        </p>
      </div>`;

    // Digitar não pode perder o foco a cada tecla: o campo é reposto e
    // o cursor volta para o fim do que já estava escrito.
    if (manterFoco) {
      const campo = raiz.querySelector('[data-busca]');
      if (campo) {
        campo.focus();
        try { campo.setSelectionRange(posicao, posicao); } catch (erro) { /* type=search recusa em alguns motores */ }
      }
    }
  }

  function aoDigitar(evento) {
    if (!evento.target.matches('[data-busca]')) return;
    consulta = evento.target.value;
    categoriaAberta = null;
    render(true);
  }

  function aoClicar(evento) {
    const abrir = evento.target.closest('[data-abrir]');
    if (abrir) {
      Router.ir('alimento', { id: abrir.dataset.abrir, tipo: abrir.dataset.tipo });
      return;
    }

    const fav = evento.target.closest('[data-fav]');
    if (fav) {
      Nutricao.alternarFavorito(fav.dataset.fav);
      render();
      return;
    }

    const cat = evento.target.closest('[data-cat]');
    if (cat) {
      categoriaAberta = cat.dataset.cat;
      render();
      return;
    }

    if (evento.target.closest('[data-fechar-cat]')) {
      categoriaAberta = null;
      render();
      return;
    }

    if (evento.target.closest('[data-limpar]')) {
      consulta = '';
      render(true);
      return;
    }

    if (evento.target.closest('[data-limpar-recentes]')) {
      Nutricao.limparRecentes();
      render();
      return;
    }

    if (evento.target.closest('[data-voltar]')) {
      history.back();
    }
  }

  /* Enter fecha o teclado em vez de submeter: já mostramos o resultado
     enquanto digita, então o que a pessoa quer nesse momento é enxergar
     a lista que o teclado está cobrindo. */
  function aoTeclar(evento) {
    if (evento.key === 'Enter' && evento.target.matches('[data-busca]')) {
      evento.preventDefault();
      evento.target.blur();
    }
  }

  function montar(elemento) {
    raiz = elemento;
    raiz.classList.add('arcade', 'arcade--nutri');
    consulta = '';
    categoriaAberta = null;
    raiz.addEventListener('click', aoClicar);
    raiz.addEventListener('input', aoDigitar);
    raiz.addEventListener('keydown', aoTeclar);
    render();
  }

  return { montar };
})();
