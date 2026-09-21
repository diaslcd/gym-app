/* Detalhes do exercício: como executar, o que trabalha e o que evitar.
   Com o treino em andamento, ganha o painel de execução — séries,
   carga, observação, descanso e encerramento. */
const Detalhe = (() => {
  let raiz = null;
  let tipoId = null;
  let exercicio = null;
  let aviso = null;
  // Como fazer e Erros comuns chegam fechados: a tela abre no que importa.
  const aberto = { fazer: false, erros: false };
  let relogio = null;

  function executando() {
    return Sessao.emAndamento() && Sessao.tipoEmAndamento() === tipoId;
  }

  /* ── Painel de execução ────────────────────────────── */

  /* Atalhos de preenchimento da série.

     Digitar número em teclado de celular é o gesto mais caro desta
     tela, e é feito de pé, no meio do treino, muitas vezes com uma mão
     só. Na prática a série seguinte quase sempre repete a anterior ou
     sobe um degrau redondo — então os dois casos viram um toque.

     O "=" só aparece da segunda série em diante, porque não há o que
     repetir na primeira, e mostra o que vai copiar em vez de obrigar a
     lembrar. Os degraus somam à carga; para baixar, o campo continua
     digitável, que é o caso raro. */
  function atalhos(indice, anterior) {
    /* O botão de repetir mostra o valor que vai copiar e o rótulo do
       que faz. Só "=" não dizia nada a quem abre a tela pela primeira
       vez; com a seta de repetição e a palavra, a ação fica óbvia sem
       precisar tocar para descobrir. */
    const repetir = anterior
      ? `<button class="rapido rapido--igual" type="button" data-repetir="${indice}"
                 aria-label="Repetir a série anterior: ${anterior.carga} kg e ${anterior.reps} repetições">
           <span class="rapido__seta" aria-hidden="true">↻</span>
           <span class="rapido__texto">
             <span class="rapido__acao">repetir</span>
             <span class="rapido__valor">${anterior.carga} kg · ${anterior.reps}</span>
           </span>
         </button>`
      : '<span class="rapido__vazio">primeira série</span>';

    /* Os degraus vêm num grupo colado, com a unidade escrita uma vez
       no começo. Antes eram "+5" e "+10" soltos, e não se sabia se
       mexiam na carga ou nas repetições. */
    return `
      <div class="serie__atalhos">
        ${repetir}
        <div class="degraus" role="group" aria-label="Ajustar a carga da série ${indice + 1}">
          <span class="degraus__un" aria-hidden="true">kg</span>
          <button class="degrau" type="button" data-somar="${indice}" data-quanto="-5"
                  aria-label="Tirar 5 kg da série ${indice + 1}">−5</button>
          <button class="degrau degrau--mais" type="button" data-somar="${indice}" data-quanto="5"
                  aria-label="Somar 5 kg à série ${indice + 1}">+5</button>
          <button class="degrau degrau--mais" type="button" data-somar="${indice}" data-quanto="10"
                  aria-label="Somar 10 kg à série ${indice + 1}">+10</button>
        </div>
      </div>`;
  }

  function serie(indice, dados, anterior) {
    return `
      <li class="serie${dados.feita ? ' serie--feita' : ''}">
        <div class="serie__linha">
          <span class="serie__num">${indice + 1}</span>
          <label class="campo">
            <input class="campo__valor" type="number" inputmode="numeric" min="1" step="1"
                   value="${dados.reps}" data-reps="${indice}" aria-label="Repetições da série ${indice + 1}">
            <span class="campo__un">reps</span>
          </label>
          <label class="campo">
            <input class="campo__valor" type="number" inputmode="decimal" min="0" step="2.5"
                   value="${dados.carga}" data-carga="${indice}" aria-label="Carga da série ${indice + 1}">
            <span class="campo__un">kg</span>
          </label>
          <button class="serie__ok" data-serie="${indice}" aria-pressed="${dados.feita}"
                  aria-label="Marcar série ${indice + 1}">✓</button>
        </div>
        ${atalhos(indice, anterior)}
      </li>`;
  }

  function descanso(f) {
    const falta = Execucao.descansoRestante();
    if (falta > 0) {
      return `
        <div class="descanso">
          <span class="descanso__rotulo">Descanso</span>
          <span class="descanso__tempo">${Sessao.formatar(falta)}</span>
          <button class="descanso__pular" data-pular>Pular</button>
        </div>`;
    }
    return `
      <div class="descanso__ajuste">
        <button class="conta__btn" data-descanso-menos aria-label="Menos descanso">−</button>
        <button class="descanso__iniciar" data-descansar>Descansar ${f.descanso}s</button>
        <button class="conta__btn" data-descanso-mais aria-label="Mais descanso">+</button>
      </div>`;
  }

  function painelDeExecucao() {
    const f = Execucao.ficha(tipoId, exercicio.id);

    return `
      <section class="bloco exec${f.concluido ? ' exec--pronto' : ''}">
        <h2 class="bloco__titulo">Registrar séries${f.concluido ? ' · concluído' : ''}</h2>

        <ul class="exec__series">
          ${f.series.map((s, i) => serie(i, s, i > 0 ? f.series[i - 1] : null)).join('')}
        </ul>

        <div class="exec__quantas">
          <button class="conta__btn" data-serie-menos aria-label="Tirar série">−</button>
          <span class="exec__quantasRotulo">${f.series.length} séries</span>
          <button class="conta__btn" data-serie-mais aria-label="Mais uma série">+</button>
        </div>

        ${descanso(f)}

        <button class="exec__fim" data-concluir>
          ${f.concluido ? 'Reabrir exercício' : 'Finalizar exercício'}
        </button>
      </section>`;
  }

  /* ── Conteúdo de referência ────────────────────────── */

  function passo(numero, titulo, texto) {
    return `
      <li class="passo">
        <span class="passo__num">${numero}</span>
        <span class="passo__texto">
          <span class="passo__titulo">${titulo}</span>
          <span class="passo__desc">${texto}</span>
        </span>
      </li>`;
  }

  function bloco(titulo, conteudo, modificador) {
    return `
      <section class="bloco${modificador ? ' bloco--' + modificador : ''}">
        <h2 class="bloco__titulo">${titulo}</h2>
        ${conteudo}
      </section>`;
  }


  /** Bloco que só mostra o conteúdo depois do toque. */
  function sanfona(chave, titulo, conteudo, modificador) {
    const on = aberto[chave];
    return `
      <section class="bloco${modificador ? ' bloco--' + modificador : ''}">
        <button class="bloco__abrir" data-secao="${chave}" type="button" aria-expanded="${on}">
          <span class="bloco__titulo">${titulo}</span>
          <span class="bloco__seta${on ? ' bloco__seta--on' : ''}" aria-hidden="true">▾</span>
        </button>
        ${on ? conteudo : ''}
      </section>`;
  }
  function acao() {
    if (executando()) {
      return `
        <div class="acaoFim">
          <button class="acaoFim__encerrar" data-encerrar-treino>Finalizar treino</button>
        </div>`;
    }
    const noTreino = Treino.lista(tipoId).some((e) => e.id === exercicio.id);
    if (noTreino) {
      return '<div class="acaoFim"><span class="detalhe__jaTem">Já está no treino de hoje</span></div>';
    }
    return `
      <div class="acaoFim">
        <button class="acaoFim__botao" data-adicionar>Adicionar ao treino</button>
      </div>`;
  }

  /* Palco da animação do exercício.

     A tela é repintada a cada série marcada e a cada tique do descanso.
     Repintar o vídeo junto faria ele voltar ao começo toda vez — então o
     palco é montado uma vez e só trocado de lugar entre uma pintura e
     outra. Tirar e recolocar o nó no mesmo instante não pausa o vídeo.

     Com o treino rodando ele encolhe: ali o que importa são as séries, e
     a animação vira lembrete do movimento, não a atração da tela. */
  function palco() {
    const conteudo = Animacoes.palco(exercicio);
    if (!conteudo) return null;
    const no = document.createElement('div');
    no.className = 'demo demo--anim';
    no.dataset.exercicio = exercicio.id;
    no.innerHTML = conteudo;
    return no;
  }

  function render() {
    const guia = Guia.para(exercicio);
    const anterior = raiz.querySelector('.demo--anim');
    const noPalco = anterior && anterior.dataset.exercicio === exercicio.id ? anterior : palco();

    raiz.innerHTML =
      Componentes.topo(exercicio.nome, `${exercicio.grupo} · ${exercicio.equipamento}`) +

      (noPalco ? '<div data-palco></div>' : '') +

      (executando() ? painelDeExecucao() : '') +

      sanfona('fazer', 'Como fazer', `
        <ol class="passos">
          ${passo(1, 'Posição inicial', guia.inicial)}
          ${passo(2, 'Movimento', guia.movimento)}
          ${passo(3, 'Posição final', guia.final)}
        </ol>`) +

      bloco('Músculos trabalhados', `
        <ul class="musculos">
          ${guia.musculos.map((m) => `<li class="musculo">${m}</li>`).join('')}
        </ul>`) +

      sanfona('erros', 'Erros comuns', `
        <ul class="dicas dicas--erro">
          ${guia.erros.map((e) => `<li>${e}</li>`).join('')}
        </ul>`, 'erro') +

      acao() +
      (aviso ? `<div class="aviso"><span>✓ ${aviso}</span></div>` : '');

    const lugar = raiz.querySelector('[data-palco]');
    if (lugar && noPalco) {
      noPalco.classList.toggle('demo--compacto', executando());
      lugar.replaceWith(noPalco);
    }

    // Um tique só: atualiza o descanso enquanto o treino corre.
    Sessao.observar(() => {
      const campo = raiz.querySelector('.descanso__tempo');
      if (!campo) return;
      const falta = Execucao.descansoRestante();
      if (falta > 0) {
        campo.textContent = Sessao.formatar(falta);
        return;
      }
      // Chegou a zero neste tique: avisa uma vez e repinta sem o relógio.
      Alerta.descansoAcabou(`${exercicio.nome} · hora da próxima série`);
      render();
    });
  }

  function avisar(texto) {
    aviso = texto;
    clearTimeout(relogio);
    relogio = setTimeout(() => {
      // A tela pode ter saído: não repinta nó solto.
      if (!raiz.isConnected) return;
      aviso = null;
      render();
    }, 4000);
  }

  /* ── Ações ─────────────────────────────────────────── */

  function aoClicar(evento) {
    const alvo = (seletor) => evento.target.closest(seletor);

    if (alvo('[data-voltar]')) {
      Router.ir('exercicios', { tipoId: tipoId });
      return;
    }

    const secao = alvo('[data-secao]');
    if (secao) {
      aberto[secao.dataset.secao] = !aberto[secao.dataset.secao];
      render();
      return;
    }

    /* Copia carga e repetições da série de cima. Na maior parte dos
       treinos as séries se repetem, e isso poupa dois teclados. */
    const repetir = alvo('[data-repetir]');
    if (repetir) {
      const indice = Number(repetir.dataset.repetir);
      const series = Execucao.ficha(tipoId, exercicio.id).series;
      const de = series[indice - 1];
      if (de) {
        Execucao.definirSerie(tipoId, exercicio.id, indice, 'reps', de.reps);
        Execucao.definirSerie(tipoId, exercicio.id, indice, 'carga', de.carga);
        render();
      }
      return;
    }

    /* Degrau de carga. Anilha de 5 e de 10 é o que existe na academia,
       e somar é mais rápido que abrir o teclado para trocar 40 por 45.
       O piso é zero: carga negativa não existe, e deixar o número virar
       -5 por um toque a mais seria só confusão. */
    const somar = alvo('[data-somar]');
    if (somar) {
      const indice = Number(somar.dataset.somar);
      const quanto = Number(somar.dataset.quanto);
      const atual = Execucao.ficha(tipoId, exercicio.id).series[indice];
      if (atual) {
        const novo = Math.max(0, (atual.carga || 0) + quanto);
        Execucao.definirSerie(tipoId, exercicio.id, indice, 'carga',
          Math.round(novo * 10) / 10);
        render();
      }
      return;
    }

    if (alvo('[data-serie-menos]')) {
      Execucao.ajustarSeries(tipoId, exercicio.id, -1);
      render();
      return;
    }

    if (alvo('[data-serie-mais]')) {
      Execucao.ajustarSeries(tipoId, exercicio.id, 1);
      render();
      return;
    }

    if (alvo('[data-descanso-menos]')) {
      Execucao.ajustarDescanso(tipoId, exercicio.id, -1);
      render();
      return;
    }

    if (alvo('[data-descanso-mais]')) {
      Execucao.ajustarDescanso(tipoId, exercicio.id, 1);
      render();
      return;
    }

    const marca = alvo('[data-serie]');
    if (marca) {
      const indice = Number(marca.dataset.serie);
      const feita = Execucao.ficha(tipoId, exercicio.id).series[indice];
      const marcando = feita && !feita.feita;
      Execucao.alternarSerie(tipoId, exercicio.id, indice);
      // Marcar a série é o gesto de quem acabou de terminá-la: o descanso
      // começa sozinho. Desmarcar é correção, e não dispara nada.
      if (marcando) {
        Alerta.pedirPermissao();
        Execucao.iniciarDescanso(Execucao.descansoDe(tipoId, exercicio.id));
      }
      render();
      return;
    }

    if (alvo('[data-descansar]')) {
      Alerta.pedirPermissao();
      Execucao.iniciarDescanso(Execucao.descansoDe(tipoId, exercicio.id));
      render();
      return;
    }

    if (alvo('[data-pular]')) {
      Execucao.pararDescanso();
      render();
      return;
    }

    if (alvo('[data-concluir]')) {
      // Guarda o estado antes de mudar: a ficha é o mesmo objeto.
      const estavaConcluido = Execucao.ficha(tipoId, exercicio.id).concluido;
      Execucao.concluir(tipoId, exercicio.id, !estavaConcluido);
      if (!estavaConcluido) {
        Execucao.iniciarDescanso(Execucao.descansoDe(tipoId, exercicio.id));
        Router.ir('exercicios', { tipoId: tipoId });
        return;
      }
      render();
      return;
    }


    if (alvo('[data-encerrar-treino]')) {
      Componentes.encerrarTreino(tipoId);
      return;
    }

    if (alvo('[data-adicionar]')) {
      Treino.acrescentar(tipoId, exercicio.id);
      avisar('Adicionado ao treino');
      render();
    }
  }

  function aoDigitar(evento) {
    const campo = evento.target;

    if (campo.matches('[data-reps]')) {
      Execucao.definirSerie(tipoId, exercicio.id, Number(campo.dataset.reps),
        'reps', Math.round(Number(campo.value) || 0));
      return;
    }

    if (campo.matches('[data-carga]')) {
      Execucao.definirSerie(tipoId, exercicio.id, Number(campo.dataset.carga),
        'carga', Number(campo.value) || 0);
    }
  }

  function montar(elemento, params) {
    raiz = elemento;
    tipoId = params.tipoId;
    // exercicioGlobal também acha substitutos, que não estão na lista do treino.
    exercicio = Dados.exercicioGlobal(params.exercicioId);
    aviso = null;
    aberto.fazer = false;
    aberto.erros = false;
    clearTimeout(relogio);
    raiz.classList.add('arcade');
    raiz.addEventListener('click', aoClicar);
    raiz.addEventListener('input', aoDigitar);
    render();
  }

  return { montar };
})();
