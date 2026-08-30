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

  function serie(indice, dados) {
    return `
      <li class="serie${dados.feita ? ' serie--feita' : ''}">
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
          ${f.series.map((s, i) => serie(i, s)).join('')}
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

  function render() {
    const guia = Guia.para(exercicio);

    raiz.innerHTML =
      Componentes.topo(exercicio.nome, `${exercicio.grupo} · ${exercicio.equipamento}`) +

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
