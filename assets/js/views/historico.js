/* Histórico de treinos e evolução de carga.
   Lê o que já foi registrado — não guarda nada por conta própria. */
const Historico = (() => {
  let raiz = null;
  let diaAberto = null;

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

  /* ── Render ────────────────────────────────────────── */

  function render() {
    const lista = Dados.historico();

    raiz.innerHTML =
      Componentes.topo('Histórico', `${lista.length} treinos realizados`) +
      blocoDeVolume(lista) +
      blocoDeEvolucao() +
      `<section class="bloco">
        <h2 class="bloco__titulo">Treinos realizados</h2>
        <ul class="hist__lista">${lista.map(treino).join('')}</ul>
      </section>` +
      (diaAberto ? Componentes.folhaDoDia(diaAberto) : '');
  }

  function aoClicar(evento) {
    if (evento.target.closest('[data-voltar]')) {
      Router.ir('dashboard');
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
    raiz.classList.add('arcade');
    raiz.addEventListener('click', aoClicar);
    render();
  }

  return { montar };
})();
