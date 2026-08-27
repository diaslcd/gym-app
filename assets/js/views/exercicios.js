/* Lista de exercícios do treino escolhido, ajustável na hora:
   dá para remover, trocar e acrescentar exercício, e é daqui que o
   treino começa e termina. Os ajustes valem para a sessão — o treino
   programado continua intacto e volta com "Restaurar treino". */
const Exercicios = (() => {
  let raiz = null;
  let tipo = null;
  let confirmando = null; // chave do exercício aguardando confirmar remoção
  let folha = null;       // chave do exercício com a folha de troca aberta
  let adicionando = false; // folha de acrescentar aberta
  let aviso = null;       // { texto, desfazer }
  let relogio = null;

  /* ── Peças ─────────────────────────────────────────── */

  function item(exercicio) {
    if (confirmando === exercicio.chave) {
      return `
        <li class="item item--confirma">
          <span class="item__texto">
            <span class="item__nome">Remover do treino?</span>
            <span class="item__meta">${exercicio.nome}</span>
          </span>
          <span class="item__acoes">
            <button class="item__acao item__acao--nao" data-cancelar>Não</button>
            <button class="item__acao item__acao--sim" data-confirmar="${exercicio.chave}">Sim</button>
          </span>
        </li>`;
    }

    return `
      <li class="item">
        <button class="item__abrir" data-exercicio="${exercicio.id}">
          <span class="item__img">${IconesExercicios.porId(exercicio.id)}</span>
          <span class="item__texto">
            <span class="item__nome">${exercicio.nome}${Execucao.estaConcluido(tipo.id, exercicio.id) ? ' <span class="item__ok">feito</span>' : ''}</span>
            <span class="item__meta">${exercicio.grupo} · ${exercicio.equipamento}</span>
            ${exercicio.origem ? `<span class="item__trocado">no lugar de ${exercicio.origem.nome}</span>` : ''}
          </span>
        </button>
        <span class="item__acoes">
          <button class="item__acao item__acao--trocar" data-trocar="${exercicio.chave}"
                  aria-label="Substituir ${exercicio.nome}">${Icones.trocar}</button>
          <button class="item__acao item__acao--remover" data-remover="${exercicio.chave}"
                  aria-label="Remover ${exercicio.nome}">${Icones.remover}</button>
        </span>
      </li>`;
  }

  function opcaoDaFolha(exercicio, acao, rotulo) {
    return `
      <li class="alt">
        <span class="alt__img">${IconesExercicios.porId(exercicio.id)}</span>
        <span class="alt__texto">
          <span class="alt__nome">${exercicio.nome}</span>
          <span class="alt__meta">${exercicio.grupo} · ${exercicio.equipamento}</span>
        </span>
        <button class="alt__btn" ${acao}="${exercicio.id}">${rotulo}</button>
      </li>`;
  }

  function painelDeTroca(lista) {
    const atual = lista.find((e) => e.chave === folha);
    if (!atual) return '';

    const naLista = lista.map((e) => e.id);
    const opcoes = Dados.alternativasDe(atual.origem ? atual.origem.id : atual.id)
      .filter((alt) => alt.id === atual.id || naLista.indexOf(alt.id) === -1);

    return `
      <div class="folha">
        <div class="folha__fundo" data-fechar></div>
        <div class="folha__painel" style="--cor:${tipo.cor}">
          <div class="folha__topo">
            <span class="folha__titulo">Substituir exercício</span>
            <button class="folha__fechar" data-fechar aria-label="Fechar">✕</button>
          </div>
          <p class="folha__sub">Troque <strong>${atual.nome}</strong> por uma alternativa do mesmo grupo.</p>
          <ul class="folha__opcoes">
            ${opcoes.map((o) => opcaoDaFolha(o, 'data-alternativa', 'Substituir')).join('')}
          </ul>
          ${atual.origem ? `<button class="folha__original" data-original>Voltar para ${atual.origem.nome}</button>` : ''}
        </div>
      </div>`;
  }

  function painelDeAdicao(lista) {
    if (!adicionando) return '';
    const candidatos = Dados.candidatosPara(tipo.id, lista.map((e) => e.id));

    return `
      <div class="folha">
        <div class="folha__fundo" data-fechar></div>
        <div class="folha__painel" style="--cor:${tipo.cor}">
          <div class="folha__topo">
            <span class="folha__titulo">Adicionar exercício</span>
            <button class="folha__fechar" data-fechar aria-label="Fechar">✕</button>
          </div>
          <p class="folha__sub">Exercícios dos grupos que <strong>${tipo.nome}</strong> trabalha.</p>
          <ul class="folha__opcoes">
            ${candidatos.map((c) => opcaoDaFolha(c, 'data-acrescentar', 'Adicionar')).join('')}
          </ul>
        </div>
      </div>`;
  }

  function barraDoTreino(lista) {
    // Já existe treino aberto de outro tipo: leva até ele em vez de
    // começar um novo por cima, o que apagaria o cronômetro anterior.
    if (Sessao.emAndamento() && Sessao.tipoEmAndamento() !== tipo.id) {
      const outro = Dados.tipoPorId(Sessao.tipoEmAndamento());
      return `
        <div class="barra">
          <button class="barra__outro" data-ir-outro>
            ${outro ? outro.nome : 'Outro treino'} em andamento · ir para ele
          </button>
        </div>`;
    }

    if (!Sessao.emAndamento()) {
      return `
        <div class="barra">
          <button class="barra__comecar" data-comecar>Começar treino</button>
        </div>`;
    }

    return `
      <div class="barra barra--ativa">
        <span class="barra__tempo">${Sessao.formatar(Sessao.decorrido())}</span>
        <span class="barra__rotulo">${lista.length} exercícios</span>
        <button class="barra__encerrar" data-encerrar>Encerrar</button>
      </div>`;
  }

  function faixaDeAviso() {
    if (!aviso) return '';
    return `
      <div class="aviso">
        <span>✓ ${aviso.texto}</span>
        ${aviso.desfazer ? '<button data-desfazer>Desfazer</button>' : ''}
      </div>`;
  }

  /* ── Render ────────────────────────────────────────── */

  function render() {
    const lista = Treino.lista(tipo.id);
    raiz.innerHTML =
      Componentes.topo(tipo.nome, `${lista.length} exercícios`) +
      `<ul class="lista" style="--cor:${tipo.cor}">${lista.map(item).join('')}</ul>` +
      '<button class="adicionar" data-adicionar>+ Adicionar exercício</button>' +
      (Treino.ajustado(tipo.id)
        ? '<button class="restaurar" data-restaurar>Restaurar treino programado</button>'
        : '') +
      barraDoTreino(lista) +
      painelDeTroca(lista) +
      painelDeAdicao(lista) +
      faixaDeAviso();

    // O relógio só repinta o tempo, para não fechar folhas abertas.
    Sessao.observar((segundos) => {
      const campo = raiz.querySelector('.barra__tempo');
      if (campo) campo.textContent = Sessao.formatar(segundos);
    });
  }

  function avisar(texto, desfazer) {
    aviso = { texto: texto, desfazer: desfazer };
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
      Router.ir('selecao');
      return;
    }

    // Cronômetro.
    if (alvo('[data-ir-outro]')) {
      Router.ir('exercicios', { tipoId: Sessao.tipoEmAndamento() });
      return;
    }

    if (alvo('[data-comecar]')) {
      Sessao.iniciar(tipo.id);
      render();
      return;
    }

    if (alvo('[data-encerrar]')) {
      Componentes.encerrarTreino(tipo.id);
      return;
    }

    // Remoção: pede confirmação antes.
    const pedirRemocao = alvo('[data-remover]');
    if (pedirRemocao) {
      confirmando = pedirRemocao.dataset.remover;
      folha = null;
      adicionando = false;
      render();
      return;
    }

    if (alvo('[data-cancelar]')) {
      confirmando = null;
      render();
      return;
    }

    const confirmar = alvo('[data-confirmar]');
    if (confirmar) {
      const chave = confirmar.dataset.confirmar;
      confirmando = null;
      Treino.remover(tipo.id, chave);
      avisar('Exercício removido', () => Treino.devolver(tipo.id, chave));
      render();
      return;
    }

    // Substituição.
    const abrirTroca = alvo('[data-trocar]');
    if (abrirTroca) {
      folha = abrirTroca.dataset.trocar;
      confirmando = null;
      adicionando = false;
      render();
      return;
    }

    // Acréscimo.
    if (alvo('[data-adicionar]')) {
      adicionando = true;
      folha = null;
      confirmando = null;
      render();
      return;
    }

    if (alvo('[data-fechar]')) {
      folha = null;
      adicionando = false;
      render();
      return;
    }

    const novo = alvo('[data-acrescentar]');
    if (novo) {
      const id = novo.dataset.acrescentar;
      Treino.acrescentar(tipo.id, id);
      adicionando = false;
      avisar('Exercício adicionado', () => Treino.remover(tipo.id, id));
      render();
      return;
    }

    const escolha = alvo('[data-alternativa]');
    if (escolha) {
      const chave = folha;
      Treino.trocar(tipo.id, chave, escolha.dataset.alternativa);
      folha = null;
      avisar('Exercício substituído', () => Treino.desfazerTroca(tipo.id, chave));
      render();
      return;
    }

    if (alvo('[data-original]')) {
      Treino.desfazerTroca(tipo.id, folha);
      folha = null;
      avisar('Exercício original de volta');
      render();
      return;
    }

    if (alvo('[data-desfazer]')) {
      if (aviso && aviso.desfazer) aviso.desfazer();
      aviso = null;
      clearTimeout(relogio);
      render();
      return;
    }

    if (alvo('[data-restaurar]')) {
      Treino.restaurar(tipo.id);
      avisar('Treino programado restaurado');
      render();
      return;
    }

    const abrir = alvo('[data-exercicio]');
    if (abrir) {
      Router.ir('detalhe', { tipoId: tipo.id, exercicioId: abrir.dataset.exercicio });
    }
  }

  function montar(elemento, params) {
    raiz = elemento;
    tipo = Dados.tipoPorId(params.tipoId);
    confirmando = null;
    folha = null;
    adicionando = false;
    aviso = null;
    clearTimeout(relogio);
    raiz.classList.add('arcade');
    raiz.addEventListener('click', aoClicar);
    render();
  }

  return { montar };
})();
