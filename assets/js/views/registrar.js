/* Registrar um treino que já passou.

   Para dois casos que o cronômetro não cobre: o dia em que a pessoa
   treinou e esqueceu de abrir o app, e o histórico de antes de o app
   existir no celular. Sem isso, o calendário acusava falta num dia de
   academia e a sequência caía por esquecimento, não por preguiça.

   A tela pede o mínimo para o treino ser útil depois — dia, qual treino,
   quanto tempo e o que foi feito — e deixa tudo pré-preenchido: os
   exercícios do treino já vêm marcados, com 3 × 12 e a última carga
   conhecida. O caso comum ("fiz o treino inteiro, como sempre") termina
   em três toques; ajustar série por série é opcional.

   A regra de pontos fica escrita na própria tela e muda com a data:
   ontem e anteontem pontuam; mais para trás, não. Regra que só aparece
   depois, no ranking, parece castigo; dita antes, é só a regra. */
const TelaRegistrar = (() => {
  const PADRAO = { series: 3, reps: 12 };
  const LIMITES = {
    series: { min: 1, max: 15, passo: 1 },
    reps:   { min: 1, max: 100, passo: 1 },
    carga:  { min: 0, max: 500, passo: 5 },
    minutos: { min: 5, max: 300, passo: 5 }
  };

  let raiz = null;
  let data = null;       // dia do treino, em ISO
  let tipoId = null;
  let minutos = 50;
  let itens = [];        // { id, on, series, reps, carga, extra }
  let mostrarMais = false;

  /* ── Estado ────────────────────────────────────────── */

  function hojeIso() {
    return Utils.iso(Utils.hoje());
  }

  function diasAtras(n) {
    return Utils.iso(Utils.somarDias(Utils.hoje(), -n));
  }

  // A carga de partida é a última que a pessoa usou naquele exercício:
  // quem anota costuma lembrar que "foi o de sempre".
  function ultimaCarga(exercicioId) {
    const pontos = Dados.evolucaoDe(exercicioId);
    return pontos.length ? pontos[pontos.length - 1].carga : 0;
  }

  function novoItem(exercicio, marcado, extra) {
    return {
      id: exercicio.id,
      on: marcado,
      series: Programa.respondido() ? Programa.seriesPadrao() : PADRAO.series,
      reps: PADRAO.reps,
      carga: ultimaCarga(exercicio.id),
      extra: !!extra
    };
  }

  function escolherTipo(id) {
    if (id === tipoId) return;
    tipoId = id;
    mostrarMais = false;
    // A ficha atual do programa: é o que a pessoa costuma fazer agora.
    itens = Programa.base(id).map((e) => novoItem(e, true, false));
  }

  function itemPorId(id) {
    return itens.find((i) => i.id === id) || null;
  }

  function limitar(campo, valor) {
    const l = LIMITES[campo];
    const n = Number(String(valor).replace(',', '.'));
    if (!isFinite(n)) return null;
    // Carga aceita meio quilo; o resto é inteiro.
    const arredondado = campo === 'carga' ? Math.round(n * 2) / 2 : Math.round(n);
    return Math.min(l.max, Math.max(l.min, arredondado));
  }

  /* ── Peças ─────────────────────────────────────────── */

  function blocoDaData() {
    const escolhas = [
      { iso: diasAtras(1), nome: 'Ontem' },
      { iso: diasAtras(2), nome: 'Anteontem' },
      { iso: hojeIso(), nome: 'Hoje' }
    ];

    const jaTem = Dados.registrosDe(data).length;
    const extenso = Utils.dataPorExtenso(new Date(data + 'T00:00:00'));

    return `
      <section class="bloco anotar">
        <h2 class="bloco__titulo">Quando foi</h2>
        <div class="anotar__dias">
          ${escolhas.map((e) => `
            <button class="anotar__dia${data === e.iso ? ' anotar__dia--on' : ''}" type="button"
                    data-data="${e.iso}" aria-pressed="${data === e.iso}">${e.nome}</button>`).join('')}
        </div>
        <label class="anotar__campoData">
          <span class="anotar__rotulo">Outro dia</span>
          <input class="anotar__data" type="date" data-campo-data
                 value="${data}" min="${Dados.dataMaisAntiga()}" max="${hojeIso()}">
        </label>
        <p class="anotar__extenso">${extenso}</p>
        ${jaTem ? `<p class="bloco__nota">Já há ${jaTem} ${jaTem === 1 ? 'treino' : 'treinos'} neste dia. Este entra junto, sem apagar nada.</p>` : ''}
      </section>`;
  }

  function blocoDoTipo() {
    return `
      <section class="bloco anotar">
        <h2 class="bloco__titulo">Qual treino</h2>
        <div class="anotar__tipos">
          ${Dados.tipos.map((t) => `
            <button class="anotar__tipo${tipoId === t.id ? ' anotar__tipo--on' : ''}" type="button"
                    data-tipo="${t.id}" aria-pressed="${tipoId === t.id}"
                    style="--cor:${t.cor}; --tinta:${t.tinta}">
              <span class="anotar__tipoIcone" aria-hidden="true">${Icones.musculo(t.id)}</span>
              <span class="anotar__tipoNome">${t.nome}</span>
            </button>`).join('')}
        </div>
      </section>`;
  }

  /** Controle de − valor +, com o valor digitável. */
  function passo(rotulo, campo, valor, alvo, largo) {
    const l = LIMITES[campo];
    const chave = alvo ? `${alvo}:${campo}` : campo;
    return `
      <div class="ajuste${largo ? ' ajuste--largo' : ''}">
        <span class="ajuste__rotulo">${rotulo}</span>
        <div class="ajuste__ctrl">
          <button class="ajuste__btn" type="button" data-passo="${chave}" data-quanto="-${l.passo}"
                  aria-label="Diminuir ${rotulo}" ${valor <= l.min ? 'disabled' : ''}>−</button>
          <input class="ajuste__valor" type="number" inputmode="decimal"
                 min="${l.min}" max="${l.max}" step="${campo === 'carga' ? '0.5' : '1'}"
                 value="${valor}" data-valor="${chave}" aria-label="${rotulo}">
          <button class="ajuste__btn ajuste__btn--mais" type="button" data-passo="${chave}" data-quanto="${l.passo}"
                  aria-label="Aumentar ${rotulo}" ${valor >= l.max ? 'disabled' : ''}>+</button>
        </div>
      </div>`;
  }

  function blocoDaDuracao() {
    return `
      <section class="bloco anotar">
        <h2 class="bloco__titulo">Duração</h2>
        ${passo('minutos', 'minutos', minutos, null, true)}
      </section>`;
  }

  function exercicio(item) {
    const e = Dados.exercicioGlobal(item.id);
    if (!e) return '';

    /* Os números ficam recolhidos: com sete exercícios abertos a tela
       vira um formulário de três telas de altura, e o normal é não mexer
       em nada. O resumo "3 × 12 · 20 kg" já mostra o que vai ser gravado;
       quem precisa corrigir abre só aquele. */
    return `
      <li class="anotarEx${item.on ? ' anotarEx--on' : ''}">
        <div class="anotarEx__linha">
          <button class="anotarEx__marca" type="button" data-marcar="${item.id}" aria-pressed="${item.on}">
            <span class="anotarEx__caixa" aria-hidden="true">${item.on ? '✓' : ''}</span>
            <span class="anotarEx__img">${IconesExercicios.porId(item.id)}</span>
            <span class="anotarEx__texto">
              <span class="anotarEx__nome">${e.nome}</span>
              <span class="anotarEx__meta">${item.on
                ? `${item.series} × ${item.reps}${item.carga ? ` · ${String(item.carga).replace('.', ',')} kg` : ''}`
                : e.grupo}</span>
            </span>
          </button>
          ${item.on ? `
            <button class="anotarEx__ajustar${item.aberto ? ' anotarEx__ajustar--on' : ''}" type="button"
                    data-abrir="${item.id}" aria-expanded="${!!item.aberto}">
              ${item.aberto ? 'pronto' : 'ajustar'}
            </button>` : ''}
        </div>
        ${item.on && item.aberto ? `
          <div class="anotarEx__numeros">
            ${passo('séries', 'series', item.series, item.id)}
            ${passo('repetições', 'reps', item.reps, item.id)}
            ${passo('carga (kg)', 'carga', item.carga, item.id, true)}
          </div>` : ''}
      </li>`;
  }

  function blocoDosExercicios() {
    const marcados = itens.filter((i) => i.on).length;
    const visiveis = itens.filter((i) => !i.extra || i.on || mostrarMais);
    const temMais = Dados.candidatosPara(tipoId, itens.map((i) => i.id)).length > 0 ||
      itens.some((i) => i.extra && !i.on);

    return `
      <section class="bloco anotar">
        <div class="bloco__topoLinha">
          <h2 class="bloco__titulo">O que você fez</h2>
          <span class="bloco__contagem">${marcados} ${marcados === 1 ? 'marcado' : 'marcados'}</span>
        </div>
        <p class="bloco__nota">Desmarque o que ficou de fora. Séries e carga já vêm com o de costume — toque em ajustar se foi diferente.</p>
        <ul class="anotar__lista">${visiveis.map(exercicio).join('')}</ul>
        ${temMais ? `
          <button class="hist__mais" type="button" data-mais>
            ${mostrarMais ? 'Esconder os outros exercícios' : 'Mostrar mais exercícios'}
          </button>` : ''}
      </section>`;
  }

  function rodape() {
    const pronto = tipoId && itens.some((i) => i.on);
    // A regra muda com a data escolhida, então o aviso muda junto — é
    // aqui, antes de salvar, que a pessoa precisa saber se vai pontuar.
    const regra = Dados.anotadoPontua(data)
      ? `<span>Treino de até 2 dias atrás <strong>vale pontos</strong> e conta em
         desafios, como um treino normal — só não ganha bônus de recorde, porque a
         carga foi digitada.</span>`
      : `<span>Treino anotado entra no calendário, na sequência e no histórico.
         <strong>Só pontua se for de ontem ou anteontem</strong> — fora disso não vale
         pontos nem conta em desafios.</span>`;
    return `
      <p class="anotar__regra${Dados.anotadoPontua(data) ? ' anotar__regra--vale' : ''}">
        <span aria-hidden="true">${Dados.anotadoPontua(data) ? '⭐' : '🛡️'}</span>
        ${regra}
      </p>
      <button class="btn btn--primary" type="button" data-salvar ${pronto ? '' : 'disabled'}>
        Salvar treino
      </button>
      ${pronto ? '' : `<p class="anotar__falta">${tipoId ? 'Marque pelo menos um exercício.' : 'Escolha qual treino foi.'}</p>`}`;
  }

  function render() {
    // Repintar não pode jogar a pessoa de volta ao topo da tela.
    const rolagem = window.scrollY;
    raiz.innerHTML =
      Componentes.topo('Registrar treino', 'um treino que ficou sem registro') +
      blocoDaData() +
      blocoDoTipo() +
      (tipoId ? blocoDaDuracao() + blocoDosExercicios() : '') +
      rodape();
    window.scrollTo(0, rolagem);
  }

  /* ── Ações ─────────────────────────────────────────── */

  function salvar() {
    const tipo = Dados.tipoPorId(tipoId);
    const marcados = itens.filter((i) => i.on);
    if (!tipo || !marcados.length || !Dados.dataPermitida(data)) return;

    const fichas = {};
    let series = 0;
    marcados.forEach((i) => {
      fichas[i.id] = {
        series: Array.from({ length: i.series }, () => ({ reps: i.reps, carga: i.carga, feita: true }))
      };
      series += i.series;
    });

    const gravado = Dados.registrarTreino(tipoId, marcados.map((i) => i.id), minutos, fichas, { data: data });
    if (!gravado) return;

    const valePontos = Dados.anotadoPontua(data);
    const registro = SocialDados.registrarAnotado({
      data: data,
      titulo: tipo.nome,
      tipoId: tipoId,
      minutos: minutos,
      series: series,
      valePontos: valePontos,
      sequencia: Utils.sequenciaAtual(Dados.treinosValidos())
    });
    const conquistas = SocialDados.conferirConquistas();

    /* Treino que pontua fecha como o cronometrado: com a folha de
       resultado e a conta aberta. Mesmo que as regras do dia neguem os
       pontos, a folha diz por quê — sumir com a explicação seria pior. */
    if (valePontos) {
      Router.ir('dashboard', {
        registrado: {
          nome: tipo.nome,
          anotadoEm: data,
          minutos: minutos,
          series: series,
          atividadeId: registro.atividade.id,
          pontos: registro.atividade.pontos,
          conta: registro.conta,
          semPontos: registro.permissao.pode ? null : registro.permissao.motivo,
          conquistas: conquistas
        }
      });
      return;
    }

    Router.ir('dashboard', {
      anotado: { data: data, nome: tipo.nome, conquistas: conquistas }
    });
  }

  function aoClicar(evento) {
    const alvo = (s) => evento.target.closest(s);

    if (alvo('[data-voltar]')) { history.back(); return; }

    const dia = alvo('[data-data]');
    if (dia) { data = dia.dataset.data; render(); return; }

    const tipo = alvo('[data-tipo]');
    if (tipo) { escolherTipo(tipo.dataset.tipo); render(); return; }

    const marcar = alvo('[data-marcar]');
    if (marcar) {
      const item = itemPorId(marcar.dataset.marcar);
      if (item) item.on = !item.on;
      render();
      return;
    }

    const abrir = alvo('[data-abrir]');
    if (abrir) {
      const item = itemPorId(abrir.dataset.abrir);
      if (item) item.aberto = !item.aberto;
      render();
      return;
    }

    const botao = alvo('[data-passo]');
    if (botao) {
      mudar(botao.dataset.passo, (atual) => atual + Number(botao.dataset.quanto));
      render();
      return;
    }

    if (alvo('[data-mais]')) {
      mostrarMais = !mostrarMais;
      if (mostrarMais) {
        const extras = Dados.candidatosPara(tipoId, itens.map((i) => i.id));
        itens = itens.concat(extras.map((e) => novoItem(e, false, true)));
      }
      render();
      return;
    }

    if (alvo('[data-salvar]')) salvar();
  }

  /** Aplica uma mudança num número: da duração ou de um exercício. */
  function mudar(chave, calcular) {
    const partes = chave.split(':');
    if (partes.length === 1) {
      const novo = limitar('minutos', calcular(minutos));
      if (novo !== null) minutos = novo;
      return;
    }
    const item = itemPorId(partes[0]);
    if (!item) return;
    const novo = limitar(partes[1], calcular(item[partes[1]]));
    if (novo !== null) item[partes[1]] = novo;
  }

  /* Campo digitado só é lido ao sair dele: repintar a cada tecla tiraria
     o foco do campo no meio da digitação. */
  function aoMudar(evento) {
    const campoData = evento.target.closest('[data-campo-data]');
    if (campoData) {
      // Data fora da janela volta à que estava, em vez de gravar errado.
      if (Dados.dataPermitida(campoData.value)) data = campoData.value;
      render();
      return;
    }

    const valor = evento.target.closest('[data-valor]');
    if (valor) {
      mudar(valor.dataset.valor, () => valor.value);
      render();
    }
  }

  function montar(elemento, params) {
    raiz = elemento;
    raiz.classList.add('arcade');

    const pedida = params && params.data;
    data = Dados.dataPermitida(pedida) ? pedida : diasAtras(1);
    tipoId = null;
    itens = [];
    minutos = 50;
    mostrarMais = false;

    raiz.addEventListener('click', aoClicar);
    raiz.addEventListener('change', aoMudar);
    render();
  }

  return { montar };
})();
