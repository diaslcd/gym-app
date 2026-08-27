/* Tela inicial: indicadores, ação principal e calendário de treinos. */
const Dashboard = (() => {
  const SEMANA = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

  let raiz = null;
  let mesRef = null;        // primeiro dia do mês exibido no calendário
  let diaAberto = null;     // data com a folha de detalhes aberta
  let aviso = null;         // confirmação depois de encerrar o treino
  let relogioAviso = null;
  let diasEmSequencia = null; // datas que formam a sequência atual

  function cabecalho() {
    return `
      <header class="header">
        <h1 class="brand">${Dados.app.nome}</h1>
      </header>`;
  }

  function metrica(cor, icone, numero, rotulo, extra, atributos) {
    const marcacao = atributos || '';
    const tag = atributos ? 'button' : 'article';
    return `
      <${tag} class="metrica metrica--${cor}${extra ? ' ' + extra : ''}" ${marcacao}>
        <span class="metrica__icone">${icone}</span>
        <span class="metrica__dados">
          <span class="metrica__num">${numero}</span>
          <span class="metrica__rotulo">${rotulo}</span>
        </span>
      </${tag}>`;
  }

  function indicadores() {
    const atual = Utils.sequenciaAtual(Dados.treinos);
    const titulo = Dados.tituloDaSequencia(atual);
    const proximo = Dados.proximoTitulo(atual);

    return `
      <section class="metricas">
        <article class="metrica metrica--hero">
          ${titulo ? `<span class="titulo">${titulo}</span>` : ''}
          <span class="metrica__icone">${Icones.chama}</span>
          <span class="metrica__dados">
            <span class="metrica__num">${atual}</span>
            <span class="metrica__rotulo">${atual === 1 ? 'dia em sequência' : 'dias em sequência'}</span>
          </span>
        </article>

        <div class="metricas__par">
          ${metrica('recorde', Icones.trofeu, Utils.maiorSequencia(Dados.treinos), 'recorde')}
          ${metrica('total', Icones.equipamento('halteres'), Dados.treinos.size, 'treinos · ver histórico', '', 'data-historico type="button"')}
        </div>

        ${proximo ? `<span class="metrica__proximo">faltam ${proximo.faltam} para ${proximo.nome}</span>` : ''}
      </section>`;
  }

  function acaoPrincipal() {
    if (Sessao.emAndamento()) {
      const tipo = Dados.tipoPorId(Sessao.tipoEmAndamento());
      return `
        <button class="btn btn--andamento" data-retomar>
          <span class="btn__rotulo">${tipo ? tipo.nome : 'Treino'} em andamento</span>
          <span class="btn__tempo">${Sessao.formatar(Sessao.decorrido())}</span>
        </button>`;
    }
    return `<button class="btn btn--primary" data-acao="iniciar">Iniciar treino</button>`;
  }


  function celula(ano, mes, dia, hojeIso, ordem, ultimoDia) {
    const data = new Date(ano, mes, dia);
    const dataIso = Utils.iso(data);
    const registro = Dados.registroDe(dataIso);
    const treinou = !!registro;
    const hoje = dataIso === hojeIso;
    const passado = dataIso < hojeIso;
    const coluna = data.getDay();
    const naSequencia = diasEmSequencia.has(dataIso);

    const naSequenciaEm = (deslocamento) =>
      diasEmSequencia.has(Utils.iso(Utils.somarDias(data, deslocamento)));

    const classes = ['cal__day'];
    let faixa = '';
    let enfeite = '';
    let marca = '';

    if (treinou) {
      classes.push('cal__day--treino');
      // Faixa da cor do treino feito naquele dia.
      const tipo = Dados.tipoPorId(registro.tipoId);
      if (tipo) marca = `<span class="cal__tipo" style="--tipo:${tipo.cor}"></span>`;
    } else if (passado) {
      // Folga numa semana que aguentou é descanso; numa semana que
      // não aguentou, é a falta que derrubou a sequência.
      if (Utils.semanaSustenta(Dados.treinos, data)) {
        classes.push('cal__day--descanso');
      } else {
        classes.push('cal__day--gelou');
        enfeite = `<span class="cal__floco">${Icones.floco}</span>`;
      }
    }

    if (naSequencia) {
      // Trilho: corre por baixo de toda a sequência viva.
      classes.push('cal__day--corrida');
      if (!naSequenciaEm(-1) || coluna === 0 || dia === 1) classes.push('cal__day--inicio');
      if (!naSequenciaEm(1) || coluna === 6 || dia === ultimoDia) classes.push('cal__day--fim');
      faixa = '<span class="cal__faixa"></span>';
    }

    if (hoje) {
      classes.push('cal__day--today');
      if (treinou) enfeite = `<span class="cal__fogo">${Icones.chama}</span>`;
    }

    // Dia com treino vira botão: abre o que foi feito.
    const tag = treinou ? 'button' : 'span';
    const extra = treinou ? ` type="button" data-dia="${dataIso}"` : '';

    return `<${tag} class="${classes.join(' ')}"${extra} style="--i:${ordem}">` +
      `${faixa}${enfeite}<span class="cal__dot">${dia}${marca}</span></${tag}>`;
  }

  function diasDoMes() {
    const ano = mesRef.getFullYear();
    const mes = mesRef.getMonth();
    const vazios = new Date(ano, mes, 1).getDay();
    const total = new Date(ano, mes + 1, 0).getDate();
    const hojeIso = Utils.iso(Utils.hoje());

    let html = '';
    for (let i = 0; i < vazios; i++) {
      html += '<span class="cal__day cal__day--out" aria-hidden="true"></span>';
    }
    for (let d = 1; d <= total; d++) {
      html += celula(ano, mes, d, hojeIso, vazios + d - 1, total);
    }
    return html;
  }

  function calendario() {
    const h = Utils.hoje();
    const noMesAtual =
      mesRef.getFullYear() === h.getFullYear() && mesRef.getMonth() === h.getMonth();

    return `
      <section class="cal">
        <div class="cal__head">
          <span class="cal__title">${Utils.mesAno(mesRef)}</span>
          <div class="cal__nav">
            <button class="cal__btn" data-mes="-1" aria-label="Mês anterior">‹</button>
            <button class="cal__btn" data-mes="1" aria-label="Próximo mês" ${noMesAtual ? 'disabled' : ''}>›</button>
          </div>
        </div>
        <div class="cal__grid">
          ${SEMANA.map((d) => `<span class="cal__wd">${d}</span>`).join('')}
          ${diasDoMes()}
        </div>
      </section>`;
  }

  /** Folha com o que foi feito no dia escolhido. */
  function folhaDoDia() {
    return diaAberto ? Componentes.folhaDoDia(diaAberto) : '';
  }

  function render() {
    raiz.innerHTML =
      cabecalho() + indicadores() + acaoPrincipal() + calendario() +
      folhaDoDia() + faixaDeAviso();

    Sessao.observar((segundos) => {
      const campo = raiz.querySelector('.btn__tempo');
      if (campo) campo.textContent = Sessao.formatar(segundos);
    });
  }

  function faixaDeAviso() {
    return aviso ? `<div class="aviso"><span>✓ ${aviso}</span></div>` : '';
  }


  function aoClicar(evento) {
    if (evento.target.closest('[data-acao="iniciar"]')) {
      Router.ir('selecao');
      return;
    }

    if (evento.target.closest('[data-historico]')) {
      Router.ir('historico');
      return;
    }

    if (evento.target.closest('[data-retomar]')) {
      Router.ir('exercicios', { tipoId: Sessao.tipoEmAndamento() });
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
      return;
    }

    const botao = evento.target.closest('[data-mes]');
    if (!botao) return;
    mesRef = new Date(mesRef.getFullYear(), mesRef.getMonth() + Number(botao.dataset.mes), 1);
    render();
  }

  function montar(elemento, params) {
    raiz = elemento;
    raiz.classList.add('arcade');
    diaAberto = null;
    aviso = null;
    clearTimeout(relogioAviso);

    // Chega com aviso quando o usuário acabou de encerrar um treino.
    if (params && params.registrado) {
      aviso = `${params.registrado.nome} registrado · ${params.registrado.minutos} min`;
      relogioAviso = setTimeout(() => {
        if (!raiz.isConnected) return;
        aviso = null;
        render();
      }, 4000);
    }

    const h = Utils.hoje();
    mesRef = new Date(h.getFullYear(), h.getMonth(), 1);
    diasEmSequencia = Utils.diasDaSequenciaAtual(Dados.treinos);
    raiz.addEventListener('click', aoClicar);
    render();
  }

  return { montar };
})();
