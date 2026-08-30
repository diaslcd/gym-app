/* Histórico de treinos e evolução de carga.
   Lê o que já foi registrado — não guarda nada por conta própria. */
const Historico = (() => {
  const PREVIA = 4;

  let raiz = null;
  let diaAberto = null;
  let filtro = null;      // tipo de treino escolhido nas fichas
  let aberta = false;     // lista inteira ou só a prévia

  /* ── Evolução de carga ─────────────────────────────── */

  function barras(pontos) {
    const cargas = pontos.map((p) => p.carga);
    const menor = Math.min.apply(null, cargas);
    const maior = Math.max.apply(null, cargas);
    // Escala pela faixa, não pelo zero: senão a evolução some no gráfico.
    return pontos.map((p) => {
      const altura = maior === menor
        ? 60
        : 22 + Math.round(((p.carga - menor) / (maior - menor)) * 78);
      return `<span class="evo__barra" style="height:${altura}%"
                    title="${p.data}: ${p.carga} kg"></span>`;
    }).join('');
  }

  function evolucao(exercicio) {
    const pontos = Dados.evolucaoDe(exercicio.id);
    if (pontos.length < 2) return '';

    const ultimos = pontos.slice(-8);
    const primeiro = ultimos[0].carga;
    const atual = ultimos[ultimos.length - 1].carga;
    const delta = Math.round((atual - primeiro) * 10) / 10;
    const sinal = delta > 0 ? 'sobe' : (delta < 0 ? 'desce' : 'igual');

    return `
      <li class="evo" data-evolucao="${exercicio.id}">
        <div class="evo__topo">
          <span class="evo__img">${IconesExercicios.porId(exercicio.id)}</span>
          <span class="evo__texto">
            <span class="evo__nome">${exercicio.nome}</span>
            <span class="evo__meta">${primeiro} kg → ${atual} kg · ${ultimos.length} treinos</span>
          </span>
          <span class="evo__delta evo__delta--${sinal}">
            ${delta > 0 ? '+' : ''}${delta} kg
          </span>
        </div>
        <div class="evo__grafico">${barras(ultimos)}</div>
      </li>`;
  }

  function blocoDeEvolucao() {
    const exercicios = Dados.exerciciosComEvolucao(6);
    const linhas = exercicios.map(evolucao).filter(Boolean).join('');
    if (!linhas) return '';

    return `
      <section class="bloco">
        <h2 class="bloco__titulo">Evolução de carga</h2>
        <p class="evo__legenda">Carga da série mais pesada em cada treino.</p>
        <ul class="evo__lista">${linhas}</ul>
      </section>`;
  }

  /* ── Volume por treino ─────────────────────────────── */

  function blocoDeVolume(lista) {
    const pontos = lista.slice(0, 12).reverse()
      .map((r) => ({
        data: r.data,
        tipoId: r.tipoId,
        volume: Dados.volumeDoTreino(r)
      }))
      .filter((p) => p.volume > 0);

    if (pontos.length < 2) return '';

    const volumes = pontos.map((p) => p.volume);
    const menor = Math.min.apply(null, volumes);
    const maior = Math.max.apply(null, volumes);
    const ultimo = pontos[pontos.length - 1];
    const anterior = pontos[pontos.length - 2];
    const variacao = Math.round(((ultimo.volume - anterior.volume) / anterior.volume) * 100);

    const barras = pontos.map((p) => {
      const tipo = Dados.tipoPorId(p.tipoId);
      const altura = maior === menor
        ? 60
        : 22 + Math.round(((p.volume - menor) / (maior - menor)) * 78);
      return `<span class="vol__barra" style="height:${altura}%; background:${tipo ? tipo.cor : '#FFD23F'}"
                    title="${p.data}: ${milhar(p.volume)} kg"></span>`;
    }).join('');

    return `
      <section class="bloco">
        <h2 class="bloco__titulo">Volume por treino</h2>
        <p class="evo__legenda">Repetições × carga somadas em cada treino.</p>
        <div class="vol__resumo">
          <span class="vol__numero">${milhar(ultimo.volume)}<small>kg</small></span>
          <span class="vol__delta vol__delta--${variacao >= 0 ? 'sobe' : 'desce'}">
            ${variacao > 0 ? '+' : ''}${variacao}% vs. anterior
          </span>
        </div>
        <div class="vol__grafico">${barras}</div>
      </section>`;
  }

  function milhar(n) {
    return Math.round(n).toLocaleString('pt-BR');
  }

  /* ── Treinos realizados ────────────────────────────── */

  function totalDeSeries(registro) {
    return Object.keys(registro.fichas || {}).reduce((soma, id) => {
      const series = registro.fichas[id].series || [];
      return soma + series.filter((s) => s.feita !== false).length;
    }, 0);
  }

  function cargaMaxima(registro) {
    let maior = 0;
    Object.keys(registro.fichas || {}).forEach((id) => {
      (registro.fichas[id].series || []).forEach((s) => {
        if (s.carga > maior) maior = s.carga;
      });
    });
    return maior;
  }

  function treino(registro) {
    const tipo = Dados.tipoPorId(registro.tipoId);
    const data = new Date(registro.data + 'T00:00:00');
    const series = totalDeSeries(registro);
    const carga = cargaMaxima(registro);

    return `
      <li class="hist">
        <button class="hist__abrir" data-dia="${registro.data}">
          <span class="hist__faixa" style="background:${tipo ? tipo.cor : '#FFD23F'}"></span>
          <span class="hist__texto">
            <span class="hist__data">${data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
            <span class="hist__nome">${tipo ? tipo.nome : 'Treino'}</span>
            <span class="hist__meta">
              ${registro.exercicios.length} exercícios · ${series} séries · ${registro.duracao} min${carga ? ` · até ${carga} kg` : ''}
            </span>
          </span>
          <span class="hist__seta" aria-hidden="true">→</span>
        </button>
      </li>`;
  }


  /* ── Treinos realizados ────────────────────────────── */

  /** Fichas por tipo de treino, para o usuário achar o que procura. */
  function filtros(lista) {
    const contagem = {};
    lista.forEach((r) => { contagem[r.tipoId] = (contagem[r.tipoId] || 0) + 1; });

    const ficha = (id, nome, total, cor) => `
      <button class="chip${filtro === id ? ' chip--on' : ''}"
              data-filtro="${id || ''}" type="button"
              style="--chip:${cor}">
        ${nome}<span class="chip__n">${total}</span>
      </button>`;

    const porTipo = Dados.tipos
      .filter((t) => contagem[t.id])
      .map((t) => ficha(t.id, t.nome, contagem[t.id], t.cor))
      .join('');

    return `<div class="chips">${ficha(null, 'Todos', lista.length, '#12101A')}${porTipo}</div>`;
  }

  /** A lista chega fechada: só os últimos treinos, o resto sob demanda. */
  function blocoDeTreinos(lista) {
    const filtrada = filtro ? lista.filter((r) => r.tipoId === filtro) : lista;
    const visiveis = aberta ? filtrada : filtrada.slice(0, PREVIA);
    const restam = filtrada.length - visiveis.length;

    const botao = (restam > 0 || aberta)
      ? `<button class="hist__mais" data-lista type="button">
           ${aberta ? 'Mostrar menos' : `Ver mais ${restam}`}
         </button>`
      : '';

    return `
      <section class="bloco">
        <h2 class="bloco__titulo">Treinos realizados</h2>
        ${filtros(lista)}
        <ul class="hist__lista">${visiveis.map(treino).join('')}</ul>
        ${botao}
      </section>`;
  }
  /* ── Render ────────────────────────────────────────── */

  function render() {
    const lista = Dados.historico();

    raiz.innerHTML =
      Componentes.topo('Histórico', `${lista.length} treinos realizados`) +
      blocoDeVolume(lista) +
      blocoDeEvolucao() +
      blocoDeTreinos(lista) +
      (diaAberto ? Componentes.folhaDoDia(diaAberto) : '');
  }

  function aoClicar(evento) {
    if (evento.target.closest('[data-voltar]')) {
      Router.ir('dashboard');
      return;
    }

    const ficha = evento.target.closest('[data-filtro]');
    if (ficha) {
      filtro = ficha.dataset.filtro || null;
      aberta = false;
      render();
      return;
    }

    if (evento.target.closest('[data-lista]')) {
      aberta = !aberta;
      render();
      return;
    }

    if (evento.target.closest('[data-fechar-dia]')) {
      diaAberto = null;
      render();
      return;
    }

    const dia = evento.target.closest('[data-dia]');
    if (dia) {
      diaAberto = dia.dataset.dia;
      render();
    }
  }

  function montar(elemento) {
    raiz = elemento;
    diaAberto = null;
    filtro = null;
    aberta = false;
    raiz.classList.add('arcade');
    raiz.addEventListener('click', aoClicar);
    render();
  }

  return { montar };
})();
