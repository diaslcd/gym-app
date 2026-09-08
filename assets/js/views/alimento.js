/* Detalhe nutricional de um alimento ou de um prato.

   A regra que organiza esta tela: nenhum número aparece sem a
   quantidade a que ele corresponde. A porção fica no topo, grande, e
   muda junto com os valores — trocar de "1 filé" para "180 g" recalcula
   tudo à vista, então dá para entender que o número depende do peso e
   não é uma propriedade fixa do alimento.

   Prato composto mostra a conta aberta, item por item, porque o total
   sozinho esconde de onde veio. */
const Alimento = (() => {
  let raiz = null;
  let item = null;
  let ePrato = false;
  let gramas = 100;     // quantidade em uso para alimento simples
  let porcaoAtiva = 0;  // índice da porção escolhida, -1 quando digitada

  function macro(rotulo, valor, unidadeMacro, cor) {
    return `
      <div class="macroCard" style="--cor:${cor}">
        <span class="macroCard__valor">${valor}<small>${unidadeMacro}</small></span>
        <span class="macroCard__rotulo">${rotulo}</span>
      </div>`;
  }

  /* As quatro caixas de macro. A caloria fica sozinha em cima porque é
     o número que a maioria procura primeiro. */
  function painelDeMacros(v) {
    return `
      <div class="macroKcal">
        <span class="macroKcal__valor">${v.kcal}</span>
        <span class="macroKcal__rotulo">kcal</span>
      </div>
      <div class="macros">
        ${macro('proteínas', v.prot, 'g', '#FF3D81')}
        ${macro('carboidratos', v.carb, 'g', '#FF7A00')}
        ${macro('gorduras', v.gord, 'g', '#00B0F0')}
      </div>`;
  }

  /* ── Alimento simples ──────────────────────────────── */

  function seletorDePorcoes() {
    const u = Nutricao.unidade(item);
    const opcoes = (item.porcoes || []).map((p, i) => `
      <button class="porcao${porcaoAtiva === i ? ' porcao--on' : ''}" type="button"
              data-porcao="${i}" aria-pressed="${porcaoAtiva === i}">
        <span class="porcao__nome">${p.nome}</span>
        <span class="porcao__peso">${p.g} ${u}</span>
      </button>`).join('');

    const cem = `
      <button class="porcao${porcaoAtiva === -2 ? ' porcao--on' : ''}" type="button"
              data-porcao="-2" aria-pressed="${porcaoAtiva === -2}">
        <span class="porcao__nome">Tabela</span>
        <span class="porcao__peso">100 ${u}</span>
      </button>`;

    return `
      <section class="bloco">
        <h2 class="bloco__titulo">Porção</h2>
        <div class="porcoes">${opcoes}${cem}</div>
        <label class="pesoLivre">
          <span class="pesoLivre__rotulo">ou digite a quantidade</span>
          <span class="pesoLivre__campo">
            <input type="number" data-peso value="${gramas}" min="1" max="5000"
                   inputmode="numeric" aria-label="Quantidade em ${u}">
            <span class="pesoLivre__unidade">${u}</span>
          </span>
        </label>
      </section>`;
  }

  function conteudoAlimento() {
    const v = Nutricao.calcular(item, gramas);
    const u = Nutricao.unidade(item);
    const cat = Nutricao.categoriaPorId(item.cat);
    const base = Nutricao.calcular(item, 100);

    return `
      <div class="alimento">
        <header class="alimento__topo" style="--cor:${cat ? cat.cor : '#8AC926'}">
          <span class="alimento__emoji">${cat ? cat.emoji : '🍽️'}</span>
          <span class="alimento__texto">
            <h1 class="alimento__nome">${item.nome}</h1>
            <span class="alimento__cat">${cat ? cat.nome : ''}</span>
          </span>
          <button class="alimento__fav${Nutricao.eFavorito(item.id) ? ' alimento__fav--on' : ''}"
                  type="button" data-fav aria-pressed="${Nutricao.eFavorito(item.id)}"
                  aria-label="Favorito">★</button>
        </header>

        <!-- A quantidade vem antes dos números, e não depois: é ela que
             dá sentido a eles. -->
        <p class="referencia">
          Valores para <strong>${gramas} ${u}</strong>
        </p>

        ${painelDeMacros(v)}
        ${seletorDePorcoes()}

        <section class="bloco">
          <h2 class="bloco__titulo">Na tabela (100 ${u})</h2>
          <ul class="tabela100">
            <li><span>Calorias</span><strong>${base.kcal} kcal</strong></li>
            <li><span>Proteínas</span><strong>${base.prot} g</strong></li>
            <li><span>Carboidratos</span><strong>${base.carb} g</strong></li>
            <li><span>Gorduras</span><strong>${base.gord} g</strong></li>
          </ul>
        </section>

        ${item.nota ? `<p class="alimento__nota">${item.nota}</p>` : ''}
        ${rodapeDeOrigem()}
      </div>`;
  }

  /* ── Prato composto ────────────────────────────────── */

  function conteudoPrato() {
    const conta = Nutricao.calcularPrato(item);

    const linhas = conta.linhas.map((l) => {
      const u = Nutricao.unidade(l.alimento);
      return `
        <li class="composicao__linha">
          <button class="composicao__item" type="button" data-ir="${l.alimento.id}">
            <span class="composicao__nome">${l.alimento.nome}</span>
            <span class="composicao__peso">${l.gramas} ${u}</span>
          </button>
          <span class="composicao__valores">
            <span class="composicao__kcal">${l.valores.kcal} kcal</span>
            <span class="composicao__macro">P ${l.valores.prot} · C ${l.valores.carb} · G ${l.valores.gord}</span>
          </span>
        </li>`;
    }).join('');

    return `
      <div class="alimento">
        <header class="alimento__topo" style="--cor:#00E5A0">
          <span class="alimento__emoji">🍽️</span>
          <span class="alimento__texto">
            <h1 class="alimento__nome">${item.nome}</h1>
            <span class="alimento__cat">Refeição composta</span>
          </span>
          <button class="alimento__fav${Nutricao.eFavorito(item.id) ? ' alimento__fav--on' : ''}"
                  type="button" data-fav aria-pressed="${Nutricao.eFavorito(item.id)}"
                  aria-label="Favorito">★</button>
        </header>

        <p class="referencia">
          Total do prato · <strong>${conta.total.gramas} g</strong> somando ${conta.linhas.length} itens
        </p>

        ${painelDeMacros(conta.total)}

        <section class="bloco">
          <h2 class="bloco__titulo">De onde vêm os valores</h2>
          <p class="bloco__nota">
            Estas são as porções usadas na conta. Toque em um item para ver
            e ajustar a quantidade dele.
          </p>
          <ul class="composicao">${linhas}</ul>
        </section>

        <p class="alimento__aviso">
          As quantidades acima são de um prato comum. O seu pode ter mais arroz,
          menos carne ou mais óleo — e aí os valores mudam junto.
        </p>
        ${rodapeDeOrigem()}
      </div>`;
  }

  function rodapeDeOrigem() {
    return `
      <p class="alimento__fonte">
        Composição de referência: TACO (Unicamp) e USDA FoodData Central.
      </p>`;
  }

  function render() {
    raiz.innerHTML =
      Componentes.topo(ePrato ? 'Refeição' : 'Alimento', 'informação nutricional') +
      (ePrato ? conteudoPrato() : conteudoAlimento());
  }

  function aoClicar(evento) {
    if (evento.target.closest('[data-voltar]')) {
      history.back();
      return;
    }

    if (evento.target.closest('[data-fav]')) {
      Nutricao.alternarFavorito(item.id);
      render();
      return;
    }

    const ir = evento.target.closest('[data-ir]');
    if (ir) {
      Router.ir('alimento', { id: ir.dataset.ir, tipo: 'alimento' });
      return;
    }

    const p = evento.target.closest('[data-porcao]');
    if (p) {
      const i = Number(p.dataset.porcao);
      porcaoAtiva = i;
      gramas = i === -2 ? 100 : item.porcoes[i].g;
      render();
    }
  }

  /* Peso digitado: limita a uma faixa plausível para o campo não virar
     uma calculadora de valores absurdos por um zero a mais. */
  function aoDigitar(evento) {
    if (!evento.target.matches('[data-peso]')) return;
    const valor = Number(evento.target.value);
    if (!valor || valor < 1) return;
    gramas = Math.min(5000, Math.round(valor));
    porcaoAtiva = -1;

    // Repinta só o que depende do peso: refazer a tela inteira tiraria
    // o foco do campo no meio da digitação.
    const v = Nutricao.calcular(item, gramas);
    const u = Nutricao.unidade(item);
    const ref = raiz.querySelector('.referencia');
    if (ref) ref.innerHTML = `Valores para <strong>${gramas} ${u}</strong>`;
    const kcal = raiz.querySelector('.macroKcal__valor');
    if (kcal) kcal.textContent = v.kcal;
    const caixas = raiz.querySelectorAll('.macroCard__valor');
    const valores = [v.prot, v.carb, v.gord];
    caixas.forEach((caixa, i) => {
      caixa.innerHTML = valores[i] + '<small>g</small>';
    });
    raiz.querySelectorAll('.porcao--on').forEach((b) => {
      b.classList.remove('porcao--on');
      b.setAttribute('aria-pressed', 'false');
    });
  }

  function montar(elemento, params) {
    raiz = elemento;
    raiz.classList.add('arcade', 'arcade--nutri');

    ePrato = params && params.tipo === 'prato';
    item = ePrato ? Nutricao.pratoPorId(params.id) : Nutricao.porId(params && params.id);

    // Id que não existe mais (favorito antigo, link velho): volta em vez
    // de pintar uma tela quebrada.
    if (!item) {
      Router.ir('nutricao');
      return;
    }

    Nutricao.registrarVisita(item.id);

    if (!ePrato) {
      const primeira = item.porcoes && item.porcoes[0];
      porcaoAtiva = primeira ? 0 : -2;
      gramas = primeira ? primeira.g : 100;
    }

    raiz.addEventListener('click', aoClicar);
    raiz.addEventListener('input', aoDigitar);
    render();
  }

  return { montar };
})();
