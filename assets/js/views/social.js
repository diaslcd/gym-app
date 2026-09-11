/* Aba Social: comunidade, pontos e progresso.

   O que a tela responde, de cima para baixo: quanto eu tenho, como
   estou indo, e o que aconteceu. Ranking e grupos entram nos próximos
   passos, no espaço abaixo do resumo.

   O estado vazio não diz "nada aqui": diz o que fazer para preencher, e
   leva até lá. Quem abre o Social antes de treinar precisa entender que
   é o treino que alimenta esta aba, não o contrário. */
const Social = (() => {
  let raiz = null;

  function cabecalho() {
    return `
      <header class="socialTopo">
        <h1 class="socialTopo__titulo">Social</h1>
        <p class="socialTopo__sub">seu progresso e o da sua turma</p>
      </header>`;
  }

  /* Cartão de pontos: o número grande e o que ele significa por perto.
     Pontos do dia e sequência ficam ao lado porque são o que muda com o
     treino de hoje — é a informação acionável. */
  function resumoDePontos() {
    const total = SocialDados.pontosTotais();
    const hoje = SocialDados.pontosDe(Utils.iso(Utils.hoje()));
    const sequencia = Utils.sequenciaAtual(Dados.treinos);

    return `
      <section class="pontos">
        <div class="pontos__total">
          <span class="pontos__num">${total.toLocaleString('pt-BR')}</span>
          <span class="pontos__rotulo">pontos no total</span>
        </div>
        <div class="pontos__par">
          <div class="pontos__caixa">
            <span class="pontos__caixaNum">${hoje > 0 ? '+' + hoje : '0'}</span>
            <span class="pontos__caixaRotulo">hoje</span>
          </div>
          <div class="pontos__caixa">
            <span class="pontos__caixaNum">${sequencia}</span>
            <span class="pontos__caixaRotulo">${sequencia === 1 ? 'dia seguido' : 'dias seguidos'}</span>
          </div>
        </div>
      </section>`;
  }

  /* Barra dos últimos sete dias. Um gráfico pequeno mostra o padrão que
     o número sozinho esconde — treinar seis dias e parar, ou manter três
     por semana, dão totais parecidos e hábitos diferentes. */
  function semana() {
    const dias = SocialDados.pontosPorDia(7);
    const maior = Math.max(1, ...dias.map((d) => d.pontos));
    const nomes = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

    const barras = dias.map((d) => {
      const data = new Date(d.data + 'T00:00:00');
      const altura = Math.round((d.pontos / maior) * 100);
      return `
        <div class="semana__col">
          <div class="semana__trilho">
            <div class="semana__barra${d.pontos ? '' : ' semana__barra--vazia'}"
                 style="height:${Math.max(altura, 3)}%"
                 title="${d.pontos} pontos"></div>
          </div>
          <span class="semana__dia">${nomes[data.getDay()]}</span>
        </div>`;
    }).join('');

    return `
      <section class="bloco">
        <h2 class="bloco__titulo">Últimos 7 dias</h2>
        <div class="semana">${barras}</div>
      </section>`;
  }

  function conquistas() {
    const lista = SocialDados.conquistas();
    const ganhas = lista.filter((c) => c.alcancada);
    if (!ganhas.length) return '';

    return `
      <section class="bloco">
        <div class="bloco__topoLinha">
          <h2 class="bloco__titulo">Conquistas</h2>
          <span class="bloco__contagem">${ganhas.length} de ${lista.length}</span>
        </div>
        <ul class="medalhas">
          ${ganhas.map((c) => `
            <li class="medalha" title="${c.descricao}">
              <span class="medalha__icone">${c.icone}</span>
              <span class="medalha__nome">${c.nome}</span>
            </li>`).join('')}
        </ul>
      </section>`;
  }

  function atividades() {
    const lista = SocialDados.todas().slice().reverse();
    if (!lista.length) return '';

    return `
      <section class="bloco">
        <h2 class="bloco__titulo">Sua atividade</h2>
        <ul class="feed">
          ${lista.slice(0, 12).map(cartao).join('')}
        </ul>
      </section>`;
  }

  /* Um treino no feed. O que precisa ser lido de relance, na ordem:
     quem, o quê, quando, quanto valeu. */
  function cartao(a) {
    const tipo = a.tipoId ? Dados.tipoPorId(a.tipoId) : null;
    const data = new Date(a.data + 'T00:00:00');

    return `
      <li class="post">
        <div class="post__topo">
          <span class="post__avatar" style="--cor:${tipo ? tipo.cor : '#7C5CFF'}">
            ${tipo ? Icones.musculo(a.tipoId) : '🏋️'}
          </span>
          <span class="post__quem">
            <span class="post__nome">${Perfil.nome() || 'Você'}</span>
            <span class="post__quando">${Utils.dataPorExtenso(data)}</span>
          </span>
          ${a.pontos > 0
            ? `<span class="post__pontos">+${a.pontos}</span>`
            : '<span class="post__pontos post__pontos--zero">sem pontos</span>'}
        </div>

        <p class="post__treino">
          <strong>${a.titulo}</strong>
          <span class="post__meta">${a.minutos} min · ${a.series} ${a.series === 1 ? 'série' : 'séries'}</span>
        </p>

        ${a.recorde ? '<p class="post__recorde">🏅 Recorde pessoal de carga</p>' : ''}
        ${a.legenda ? `<p class="post__legenda">${escapar(a.legenda)}</p>` : ''}
        ${a.foto ? `<img class="post__foto" src="${a.foto}" alt="Foto do treino" loading="lazy">` : ''}

        <div class="post__rodape">
          ${a.publicada
            ? `<span class="post__selo">${Privacidade.opcaoPorId(a.visibilidade).icone} ${Privacidade.opcaoPorId(a.visibilidade).nome}</span>`
            : `<button class="post__acao" type="button" data-publicar="${a.id}">📷 Publicar</button>`}
          <button class="post__curtir${a.curtidas ? ' post__curtir--on' : ''}" type="button"
                  data-curtir="${a.id}" aria-pressed="${a.curtidas > 0}">
            ❤️ ${a.curtidas || 0}
          </button>
        </div>
      </li>`;
  }

  /* A legenda é o único texto do feed escrito por alguém. Hoje esse
     alguém é a própria pessoa e o app é local, então não há a quem
     atacar — mas o dia em que o feed trouxer texto de outro aparelho, o
     caminho já estará fechado. */
  function escapar(texto) {
    return String(texto)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function estadoVazio() {
    return `
      <div class="socialVazio">
        <span class="socialVazio__icone" aria-hidden="true">🔥</span>
        <p class="socialVazio__titulo">Sua atividade aparece aqui</p>
        <p class="socialVazio__texto">
          Cada treino concluído vira pontos e uma publicação — se você quiser.
          Comece treinando; o resto se preenche sozinho.
        </p>
        <button class="socialVazio__acao" data-treinar type="button">Ir para o treino</button>
      </div>`;
  }

  /* Atalhos para o resto da área.

     Ficam logo abaixo dos pontos porque é ali que a pergunta seguinte
     aparece: "quanto isso vale perto dos outros?". Levam ranking,
     grupos, desafios e perfil sem empurrar cada um para uma aba
     própria — a barra inferior já tem três e não comporta mais. */
  function atalhos() {
    const eu = Comunidade.minhaPosicao();
    const desafiosAtivos = Comunidade.desafios().filter((d) => d.inscrito).length;
    const meusGrupos = Comunidade.grupos().length;

    const item = (destino, icone, nome, detalhe) => `
      <button class="atalho" type="button" data-ir="${destino}">
        <span class="atalho__icone" aria-hidden="true">${icone}</span>
        <span class="atalho__nome">${nome}</span>
        <span class="atalho__detalhe">${detalhe}</span>
      </button>`;

    return `
      <nav class="atalhos" aria-label="Áreas do Social">
        ${item('ranking', '🏆', 'Ranking', eu ? eu.posicao + 'º lugar' : 'fora da lista')}
        ${item('grupos', '👥', 'Grupos', meusGrupos ? meusGrupos + (meusGrupos === 1 ? ' grupo' : ' grupos') : 'criar')}
        ${item('desafios', '🎯', 'Desafios', desafiosAtivos ? desafiosAtivos + ' em curso' : 'participar')}
        ${item('perfil', '💪', 'Perfil', 'seus números')}
      </nav>`;
  }

  function render() {
    const temAtividade = SocialDados.todas().length > 0;
    raiz.innerHTML = cabecalho() + (temAtividade
      ? resumoDePontos() + atalhos() + semana() + conquistas() + atividades()
      : estadoVazio() + atalhos());
  }

  function aoClicar(evento) {
    if (evento.target.closest('[data-treinar]')) {
      Abas.ir('treino');
      return;
    }

    const ir = evento.target.closest('[data-ir]');
    if (ir) {
      Router.ir(ir.dataset.ir);
      return;
    }

    const publicar = evento.target.closest('[data-publicar]');
    if (publicar) {
      Router.ir('publicar', { id: publicar.dataset.publicar });
      return;
    }

    /* Curtir o próprio treino é estranho e vai deixar de existir quando
       houver feed de outras pessoas. Fica por ora como marcador do
       treino que valeu a pena — e o número já mora na atividade, que é
       onde vai continuar quando a curtida vier de fora. */
    const curtir = evento.target.closest('[data-curtir]');
    if (curtir) {
      const a = SocialDados.porId(curtir.dataset.curtir);
      if (a) SocialDados.atualizar(a.id, { curtidas: a.curtidas ? 0 : 1 });
      render();
    }
  }

  function montar(elemento) {
    raiz = elemento;
    raiz.classList.add('arcade', 'arcade--social');
    raiz.addEventListener('click', aoClicar);
    render();
  }

  return { montar };
})();
