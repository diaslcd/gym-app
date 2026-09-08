/* Tela inicial: indicadores, ação principal e calendário de treinos. */
const Dashboard = (() => {
  const SEMANA = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

  let raiz = null;
  let mesRef = null;        // primeiro dia do mês exibido no calendário
  let diaAberto = null;     // data com a folha de detalhes aberta
  let titulosAbertos = false; // folha com a lista de títulos
  let aviso = null;         // confirmação depois de encerrar o treino
  let relogioAviso = null;
  let diasEmSequencia = null; // datas que formam a sequência atual
  let inicioDeUso = null;     // primeiro dia do app neste aparelho
  let contaAberta = false;    // folha de conta e ajustes de entrada
  let bioDisponivel = false;  // o aparelho tem sensor utilizável?
  let bioOcupada = false;     // aguardando resposta do sensor
  let bioErro = null;

  function cabecalho() {
    const nome = Perfil.nome();
    return `
      <header class="header">
        <h1 class="brand">${Dados.app.nome}</h1>
        ${nome ? `<button class="header__perfil" data-conta type="button">
                    <span class="header__nome">${nome}</span>
                    <span class="header__sair">conta</span>
                  </button>` : ''}
      </header>`;
  }

  /* Folha da conta: onde ficam os ajustes de entrada e a saída.

     O botão do topo abria a sessão direto para fora. Agora abre esta
     folha, porque a biometria precisava de um lugar para ser ligada e
     desligada, e criar uma tela de configurações inteira para uma
     chave só seria peso demais. Sair continua aqui, um toque adiante. */
  function folhaDaConta() {
    if (!contaAberta) return '';

    const ligada = Biometria.ativa();

    /* Três estados, três textos. O aparelho sem sensor não recebe um
       botão desligado sem explicação: recebe o motivo. */
    let bloco;
    if (!bioDisponivel) {
      bloco = `
        <p class="conta__indisponivel">
          Este aparelho não tem biometria configurada, ou o navegador não
          oferece esse recurso. Sua entrada continua pelo PIN.
        </p>`;
    } else {
      bloco = `
        <button class="conta__opcao" data-bio-toggle type="button"
                aria-pressed="${ligada}" ${bioOcupada ? 'disabled' : ''}>
          <span class="conta__icone">${Icones.digital}</span>
          <span class="conta__texto">
            <span class="conta__nome">Entrar com biometria</span>
            <span class="conta__sub">${bioOcupada
              ? 'aguardando o sensor…'
              : (ligada ? 'ativada neste aparelho' : 'usar a digital em vez do PIN')}</span>
          </span>
          <span class="chave${ligada ? ' chave--on' : ''}" aria-hidden="true"></span>
        </button>
        ${bioErro ? `<p class="conta__erro">${bioErro}</p>` : ''}
        <p class="conta__nota">
          A digital é lida e conferida pelo sistema do celular. O app não recebe
          nem guarda nenhum dado biométrico — só a informação de que a
          confirmação deu certo.
        </p>`;
    }

    return `
      <div class="folha">
        <div class="folha__fundo" data-fechar-conta></div>
        <div class="folha__painel">
          <div class="folha__topo">
            <span class="folha__titulo">${Perfil.nome()}</span>
            <button class="folha__fechar" data-fechar-conta aria-label="Fechar">✕</button>
          </div>
          <div class="conta">
            ${bloco}
            <button class="conta__sair" data-sair type="button">Sair da conta</button>
          </div>
        </div>
      </div>`;
  }

  /* Liga ou desliga a biometria. Desligar é imediato; ligar precisa da
     confirmação no sensor, senão ficaria ativada sem nunca ter sido
     testada — e a pessoa só descobriria na próxima abertura. */
  async function alternarBiometria() {
    if (bioOcupada) return;
    bioErro = null;

    if (Biometria.ativa()) {
      Biometria.desativar();
      render();
      return;
    }

    bioOcupada = true;
    render();
    const r = await Biometria.ativar(Perfil.nome());
    bioOcupada = false;
    if (!r.ok) bioErro = r.motivo;
    render();
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
          ${metrica('total', Icones.equipamento('halteres'), Dados.totalDeTreinos(), 'treinos · ver histórico', '', 'data-historico type="button"')}
        </div>

        <button class="metrica__proximo" type="button" data-titulos>
          <span class="metrica__proximoTexto">${proximo
            ? `faltam ${proximo.faltam} para ${proximo.nome}`
            : 'todos os títulos conquistados'}</span>
          <span class="metrica__proximoVer">títulos</span>
        </button>
      </section>`;
  }


  /** Faixa do plano: quantos treinos a semana pede e quais são. */
  function planoDaSemana() {
    if (!Plano.escolhido()) {
      return `
        <button class="planoFaixa planoFaixa--vazia" data-plano type="button">
          <span class="planoFaixa__texto">Monte seu plano da semana</span>
          <span class="planoFaixa__acao">escolher</span>
        </button>`;
    }

    const dias = Plano.dias();
    const treinos = Plano.treinosDe(dias);
    const pontos = treinos
      .map((t) => `<span class="planoFaixa__ponto" style="--cor:${t.cor}" title="${t.nome}"></span>`)
      .join('');

    return `
      <button class="planoFaixa" data-plano type="button">
        <span class="planoFaixa__texto">${treinos.length} treinos na semana</span>
        <span class="planoFaixa__pontos">${pontos}</span>
      </button>`;
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

  /* Porta de entrada da Nutrição.

     O app não tem barra de abas: o painel é a raiz e tudo sai daqui,
     inclusive histórico e plano. Criar uma barra inferior só para a
     segunda seção traria dois problemas — passaria a existir mais de
     uma tela-raiz, e o voltar do Android, que hoje sai do app no
     painel, precisaria decidir qual raiz é o fim. Então a Nutrição
     entra pelo mesmo caminho das outras seções, com o peso visual de
     seção principal: bloco largo, logo abaixo da ação de treino.

     O verde é só dela e se repete lá dentro, para dar identidade sem
     romper a linguagem do app. */
  function portaDaNutricao() {
    return `
      <button class="secaoNutri" data-nutricao type="button">
        <span class="secaoNutri__icone" aria-hidden="true">🥗</span>
        <span class="secaoNutri__texto">
          <span class="secaoNutri__nome">Nutrição</span>
          <span class="secaoNutri__sub">calorias e macros de alimentos e pratos</span>
        </span>
        <span class="secaoNutri__seta" aria-hidden="true">›</span>
      </button>`;
  }

  function celula(ano, mes, dia, hojeIso, ordem, ultimoDia) {
    const data = new Date(ano, mes, dia);
    const dataIso = Utils.iso(data);
    const doDia = Dados.registrosDe(dataIso);
    const treinou = doDia.length > 0;
    const hoje = dataIso === hojeIso;
    // Antes de o app existir no aparelho não havia como registrar nada:
    // dia anterior a isso fica neutro, nem descanso nem falta.
    const passado = dataIso < hojeIso && dataIso >= inicioDeUso;
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
      // Uma barrinha por treino do dia, na cor de cada um.
      const barras = doDia
        .map((registro) => Dados.tipoPorId(registro.tipoId))
        .filter(Boolean)
        .map((tipo) => `<span class="cal__tipo" style="--tipo:${tipo.cor}"></span>`)
        .join('');
      if (barras) marca = `<span class="cal__tipos">${barras}</span>`;
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


  /** Folha com todos os títulos: o que já caiu, o atual e o que falta. */
  function folhaDeTitulos() {
    if (!titulosAbertos) return '';

    const atual = Utils.sequenciaAtual(Dados.treinos);
    const recorde = Utils.maiorSequencia(Dados.treinos);
    const doAtual = Dados.tituloDaSequencia(atual);
    // Do mais fácil ao mais longe: a lista vem do maior para o menor.
    const lista = Dados.titulos.slice().reverse();
    const conquistados = lista.filter((t) => recorde >= t.dias).length;

    const linhas = lista.map((t, i) => {
      const feito = recorde >= t.dias;
      const eAtual = t.nome === doAtual;
      const classe = eAtual ? 'tit--atual' : (feito ? 'tit--feito' : 'tit--travado');
      const estado = eAtual
        ? 'agora'
        : (feito ? '✓' : `faltam ${t.dias - atual}`);

      return `
        <li class="tit ${classe}" style="--i:${i}">
          <span class="tit__selo">${feito ? Icones.chama : Icones.cadeado}</span>
          <span class="tit__texto">
            <span class="tit__nome">${t.nome}</span>
            <span class="tit__meta">${t.dias} ${t.dias === 1 ? 'dia' : 'dias'} em sequência</span>
          </span>
          <span class="tit__estado">${estado}</span>
        </li>`;
    }).join('');

    return `
      <div class="folha">
        <div class="folha__fundo" data-fechar-titulos></div>
        <div class="folha__painel">
          <div class="folha__topo">
            <span class="folha__titulo">Títulos</span>
            <button class="folha__fechar" data-fechar-titulos aria-label="Fechar">✕</button>
          </div>
          <p class="folha__sub">
            <strong>${conquistados} de ${lista.length}</strong> já alcançados ·
            sequência agora: <strong>${atual}</strong> ·
            recorde: <strong>${recorde}</strong>
          </p>
          <ul class="folha__opcoes">${linhas}</ul>
        </div>
      </div>`;
  }

  /** Folha com o que foi feito no dia escolhido. */
  function folhaDoDia() {
    return diaAberto ? Componentes.folhaDoDia(diaAberto) : '';
  }

  function render() {
    raiz.innerHTML =
      cabecalho() + indicadores() + planoDaSemana() + acaoPrincipal() + portaDaNutricao() + calendario() +
      folhaDoDia() + folhaDeTitulos() + folhaDaConta() + faixaDeAviso();

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

    if (evento.target.closest('[data-nutricao]')) {
      Router.ir('nutricao');
      return;
    }

    if (evento.target.closest('[data-plano]')) {
      Router.ir('plano');
      return;
    }

    if (evento.target.closest('[data-conta]')) {
      diaAberto = null;
      titulosAbertos = false;
      bioErro = null;
      contaAberta = true;
      render();
      return;
    }

    if (evento.target.closest('[data-fechar-conta]')) {
      contaAberta = false;
      render();
      return;
    }

    if (evento.target.closest('[data-bio-toggle]')) {
      alternarBiometria();
      return;
    }

    if (evento.target.closest('[data-sair]')) {
      Perfil.sair();
      Router.ir('login');
      return;
    }

    if (evento.target.closest('[data-retomar]')) {
      Router.ir('exercicios', { tipoId: Sessao.tipoEmAndamento() });
      return;
    }

    if (evento.target.closest('[data-titulos]')) {
      diaAberto = null;
      titulosAbertos = true;
      render();
      return;
    }

    if (evento.target.closest('[data-fechar-titulos]')) {
      titulosAbertos = false;
      render();
      return;
    }

    if (diaAberto) {
      const acao = Componentes.cliqueNaFolha(evento, diaAberto);
      if (acao === 'fechar') {
        diaAberto = null;
        render();
        return;
      }
      if (acao === 'repintar') {
        render();
        return;
      }
    }

    const dia = evento.target.closest('[data-dia]');
    if (dia) {
      diaAberto = dia.dataset.dia;
      Componentes.abrirFolha();
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
    titulosAbertos = false;
    contaAberta = false;
    bioOcupada = false;
    bioErro = null;
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
    inicioDeUso = Dados.inicioDeUso();
    raiz.addEventListener('click', aoClicar);
    render();

    // Saber se há sensor é assíncrono: pinta agora e corrige a folha
    // quando a resposta chega, o que acontece antes de alguém abri-la.
    Biometria.disponivel().then((tem) => {
      if (!raiz.isConnected) return;
      bioDisponivel = tem;
      if (contaAberta) render();
    });
  }

  return { montar };
})();
