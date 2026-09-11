/* Grupos: lista, criação e detalhe.

   Três telas seriam demais para o que é, na prática, uma lista curta e
   um formulário de cinco campos. A criação abre como folha sobre a
   lista; o detalhe é tela própria porque tem o ranking interno e a
   saída do grupo, que merecem espaço.

   Quem cria entra como dono e participante — grupo sem o criador dentro
   seria só uma lista de outras pessoas. */
const Grupos = (() => {
  let raiz = null;
  let criando = false;
  let rascunho = null;
  let erro = null;

  const EMOJIS = ['🔥', '💪', '⚡', '🏆', '🌊', '🦍', '🚀', '🎯'];

  function rascunhoNovo() {
    return { nome: '', descricao: '', emoji: '🔥', privado: true, convidados: [] };
  }

  function cartao(g) {
    return `
      <li class="grupoCard" data-abrir="${g.id}">
        <span class="grupoCard__emoji">${g.emoji}</span>
        <span class="grupoCard__texto">
          <span class="grupoCard__nome">${g.nome}</span>
          <span class="grupoCard__meta">
            ${g.quantos} ${g.quantos === 1 ? 'participante' : 'participantes'} ·
            ${g.pontos.toLocaleString('pt-BR')} pts
          </span>
        </span>
        <span class="grupoCard__tipo">${g.privado ? '🔒' : '🌎'}</span>
      </li>`;
  }

  /* Convidar, hoje, é escolher entre os perfis de demonstração. É o que
     dá para fazer sem servidor, e deixa a mecânica do grupo — somar a
     pontuação de várias pessoas — funcionando de verdade. */
  function convidados() {
    return `
      <div class="convidar">
        <span class="pub__rotulo">Quem participa <span class="pub__opcional">demonstração</span></span>
        <div class="convidar__lista">
          ${Comunidade.perfisDemo().map((p) => {
            const dentro = rascunho.convidados.indexOf(p.id) !== -1;
            return `
              <button class="convidado${dentro ? ' convidado--on' : ''}" type="button"
                      data-convidar="${p.id}" aria-pressed="${dentro}">
                <span class="convidado__avatar">${p.avatar}</span>
                <span class="convidado__nome">${p.nome}</span>
              </button>`;
          }).join('')}
        </div>
      </div>`;
  }

  function folhaDeCriacao() {
    if (!criando) return '';

    return `
      <div class="folha">
        <div class="folha__fundo" data-fechar-criar></div>
        <div class="folha__painel">
          <div class="folha__topo">
            <span class="folha__titulo">Novo grupo</span>
            <button class="folha__fechar" data-fechar-criar aria-label="Fechar">✕</button>
          </div>

          <div class="pub">
            <div class="emojis">
              ${EMOJIS.map((e) => `
                <button class="emojiOpcao${rascunho.emoji === e ? ' emojiOpcao--on' : ''}"
                        type="button" data-emoji="${e}" aria-pressed="${rascunho.emoji === e}">${e}</button>`).join('')}
            </div>

            <label class="pub__legenda">
              <span class="pub__rotulo">Nome do grupo</span>
              <input class="pub__texto" type="text" data-nome maxlength="40"
                     value="${rascunho.nome}" placeholder="Projeto Verão">
            </label>

            <label class="pub__legenda">
              <span class="pub__rotulo">Descrição <span class="pub__opcional">opcional</span></span>
              <input class="pub__texto" type="text" data-descricao maxlength="140"
                     value="${rascunho.descricao}" placeholder="Para que serve este grupo?">
            </label>

            <div class="pub__quemVe">
              <span class="pub__rotulo">Privacidade</span>
              <div class="opcoesVer opcoesVer--duas">
                <button class="verOpcao${rascunho.privado ? ' verOpcao--on' : ''}" type="button"
                        data-privado="1" aria-pressed="${rascunho.privado}">
                  <span class="verOpcao__icone">🔒</span>
                  <span class="verOpcao__nome">Privado</span>
                </button>
                <button class="verOpcao${rascunho.privado ? '' : ' verOpcao--on'}" type="button"
                        data-privado="0" aria-pressed="${!rascunho.privado}">
                  <span class="verOpcao__icone">🌎</span>
                  <span class="verOpcao__nome">Público</span>
                </button>
              </div>
              <p class="bloco__nota">${rascunho.privado
                ? 'Só quem você convidar entra.'
                : 'Outras pessoas podem encontrar e pedir para entrar.'}</p>
            </div>

            ${convidados()}
            ${erro ? `<p class="pub__erro">${erro}</p>` : ''}
            <button class="pub__enviar" data-criar type="button">Criar grupo</button>
          </div>
        </div>
      </div>`;
  }

  function render() {
    const meus = Comunidade.grupos().map((g) => Comunidade.grupoCompleto(g.id)).filter(Boolean);

    raiz.innerHTML =
      Componentes.topo('Grupos', 'competição em equipe') +
      `<div class="gruposTela">
        ${meus.length
          ? `<ul class="grupoLista">${meus.map(cartao).join('')}</ul>`
          : `<div class="socialVazio">
              <span class="socialVazio__icone" aria-hidden="true">👥</span>
              <p class="socialVazio__titulo">Nenhum grupo ainda</p>
              <p class="socialVazio__texto">
                Num grupo, a pontuação de cada participante soma para a equipe.
                Serve para academia, turma de treino, família ou um desafio entre amigos.
              </p>
            </div>`}

        <button class="pub__enviar" data-novo type="button">Criar grupo</button>
        <button class="rankTela__criar" data-ranking type="button">Ver ranking de grupos</button>
      </div>` + folhaDeCriacao();
  }

  function criar() {
    if (!rascunho.nome.trim()) {
      erro = 'Dê um nome ao grupo.';
      render();
      return;
    }
    const g = Comunidade.criarGrupo({
      nome: rascunho.nome,
      descricao: rascunho.descricao,
      emoji: rascunho.emoji,
      privado: rascunho.privado,
      participantes: rascunho.convidados
    });
    criando = false;
    erro = null;
    Router.ir('grupo', { id: g.id });
  }

  function aoClicar(evento) {
    const alvo = (s) => evento.target.closest(s);

    if (alvo('[data-voltar]')) { history.back(); return; }
    if (alvo('[data-ranking]')) { Router.ir('ranking', { aba: 'grupos' }); return; }

    if (alvo('[data-novo]')) {
      criando = true;
      rascunho = rascunhoNovo();
      erro = null;
      render();
      return;
    }

    if (alvo('[data-fechar-criar]')) { criando = false; render(); return; }
    if (alvo('[data-criar]')) { criar(); return; }

    const emoji = alvo('[data-emoji]');
    if (emoji) { rascunho.emoji = emoji.dataset.emoji; render(); return; }

    const priv = alvo('[data-privado]');
    if (priv) { rascunho.privado = priv.dataset.privado === '1'; render(); return; }

    const convidar = alvo('[data-convidar]');
    if (convidar) {
      const id = convidar.dataset.convidar;
      const i = rascunho.convidados.indexOf(id);
      if (i === -1) rascunho.convidados.push(id);
      else rascunho.convidados.splice(i, 1);
      render();
      return;
    }

    const abrir = alvo('[data-abrir]');
    if (abrir) Router.ir('grupo', { id: abrir.dataset.abrir });
  }

  /* Os campos de texto não repintam a tela a cada tecla — isso tiraria
     o foco. O rascunho guarda o valor e a folha só é refeita quando
     algum botão muda o estado. */
  function aoDigitar(evento) {
    if (!criando) return;
    const campo = evento.target;
    if (campo.matches('[data-nome]')) rascunho.nome = campo.value;
    if (campo.matches('[data-descricao]')) rascunho.descricao = campo.value;
  }

  function montar(elemento) {
    raiz = elemento;
    raiz.classList.add('arcade', 'arcade--social');
    criando = false;
    rascunho = rascunhoNovo();
    erro = null;
    raiz.addEventListener('click', aoClicar);
    raiz.addEventListener('input', aoDigitar);
    render();
  }

  return { montar };
})();


/* Detalhe do grupo: quem está dentro e quanto cada um somou. */
const Grupo = (() => {
  let raiz = null;
  let grupo = null;
  let confirmandoSaida = false;

  function render() {
    const posicao = Comunidade.rankingDeGrupos().find((g) => g.id === grupo.id);

    raiz.innerHTML =
      Componentes.topo(grupo.nome, grupo.privado ? 'grupo privado' : 'grupo público') +
      `<div class="grupoTela">
        <div class="grupoCapa" style="--cor:#7C5CFF">
          <span class="grupoCapa__emoji">${grupo.emoji}</span>
          <span class="grupoCapa__pontos">${grupo.pontos.toLocaleString('pt-BR')}</span>
          <span class="grupoCapa__rotulo">pontos da equipe</span>
          ${posicao ? `<span class="grupoCapa__posicao">${posicao.posicao}º no ranking de grupos</span>` : ''}
        </div>

        ${grupo.descricao ? `<p class="grupoTela__desc">${grupo.descricao}</p>` : ''}

        <section class="bloco">
          <div class="bloco__topoLinha">
            <h2 class="bloco__titulo">Participantes</h2>
            <span class="bloco__contagem">${grupo.quantos}</span>
          </div>
          <ul class="rankLista">
            ${grupo.membros.map((m, i) => `
              <li class="rank${m.souEu ? ' rank--eu' : ''}">
                <span class="rank__pos">${i + 1}º</span>
                <span class="rank__avatar" aria-hidden="true">${m.avatar}</span>
                <span class="rank__quem">
                  <span class="rank__nome">
                    ${m.nome}${m.demo ? '<span class="selo-demo">demonstração</span>' : ''}
                  </span>
                  <span class="rank__meta">${m.treinos} treinos</span>
                </span>
                <span class="rank__pontos">${m.pontos.toLocaleString('pt-BR')}</span>
              </li>`).join('')}
          </ul>
        </section>

        ${confirmandoSaida
          ? `<div class="grupoTela__confirma">
              <p class="grupoTela__confirmaTexto">
                ${grupo.dono === 'eu'
                  ? 'Você criou este grupo. Sair apaga o grupo para todos.'
                  : 'Sair do grupo? Sua pontuação deixa de contar para a equipe.'}
              </p>
              <div class="grupoTela__confirmaBotoes">
                <button class="dia__cancelar" data-cancelar type="button">Manter</button>
                <button class="dia__apagar" data-confirmar type="button">
                  ${grupo.dono === 'eu' ? 'Apagar grupo' : 'Sair'}
                </button>
              </div>
            </div>`
          : `<button class="grupoTela__sair" data-sair-grupo type="button">
              ${grupo.dono === 'eu' ? 'Apagar grupo' : 'Sair do grupo'}
            </button>`}
      </div>`;
  }

  function aoClicar(evento) {
    const alvo = (s) => evento.target.closest(s);

    if (alvo('[data-voltar]')) { history.back(); return; }
    if (alvo('[data-sair-grupo]')) { confirmandoSaida = true; render(); return; }
    if (alvo('[data-cancelar]')) { confirmandoSaida = false; render(); return; }

    if (alvo('[data-confirmar]')) {
      Comunidade.sairDoGrupo(grupo.id);
      Router.ir('grupos');
    }
  }

  function montar(elemento, params) {
    raiz = elemento;
    raiz.classList.add('arcade', 'arcade--social');
    grupo = params && params.id ? Comunidade.grupoCompleto(params.id) : null;
    // Grupo apagado noutra tela: volta em vez de pintar vazio.
    if (!grupo) { Router.ir('grupos'); return; }

    confirmandoSaida = false;
    raiz.addEventListener('click', aoClicar);
    render();
  }

  return { montar };
})();
