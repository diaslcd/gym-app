/* Perfil: a página fitness de quem usa o app.

   Reúne o que já existe espalhado — pontos, sequência, treinos,
   conquistas, grupos e desafios — num lugar só, na ordem em que a
   pergunta aparece: quem sou, quanto já fiz, o que conquistei, de onde
   participo.

   Nada aqui é calculado por conta própria: tudo vem de SocialDados e de
   Comunidade, que por sua vez vêm dos treinos registrados. Perfil que
   guarda contador paralelo é perfil que um dia discorda do histórico. */
const TelaPerfil = (() => {
  let raiz = null;

  function cabecalho() {
    const eu = Comunidade.eu();
    const pos = Comunidade.minhaPosicao();

    return `
      <header class="perfil__topo">
        <span class="perfil__avatar" aria-hidden="true">${eu.avatar}</span>
        <span class="perfil__quem">
          <h1 class="perfil__nome">${eu.nome}</h1>
          <span class="perfil__desde">${pos ? `${pos.posicao}º no ranking` : 'fora do ranking'}</span>
        </span>
      </header>`;
  }

  function numeros() {
    const eu = Comunidade.eu();
    const recorde = Utils.maiorSequencia(Dados.treinos);

    const caixa = (num, rotulo) => `
      <div class="perfilNum">
        <span class="perfilNum__valor">${num}</span>
        <span class="perfilNum__rotulo">${rotulo}</span>
      </div>`;

    return `
      <section class="perfilNums">
        ${caixa(eu.pontos.toLocaleString('pt-BR'), 'pontos')}
        ${caixa(eu.treinos, eu.treinos === 1 ? 'treino' : 'treinos')}
        ${caixa(eu.sequencia, 'sequência')}
        ${caixa(recorde, 'recorde')}
      </section>`;
  }

  /* Todas as conquistas, inclusive as que faltam. Ver o que ainda não
     caiu é metade do motivo de existir uma lista dessas. */
  function conquistas() {
    const lista = SocialDados.conquistas();
    const ganhas = lista.filter((c) => c.alcancada).length;

    return `
      <section class="bloco">
        <div class="bloco__topoLinha">
          <h2 class="bloco__titulo">Conquistas</h2>
          <span class="bloco__contagem">${ganhas} de ${lista.length}</span>
        </div>
        <ul class="medalhas">
          ${lista.map((c) => `
            <li class="medalha${c.alcancada ? '' : ' medalha--travada'}" title="${c.descricao}">
              <span class="medalha__icone">${c.alcancada ? c.icone : '🔒'}</span>
              <span class="medalha__nome">${c.nome}</span>
            </li>`).join('')}
        </ul>
      </section>`;
  }

  function meusGrupos() {
    const lista = Comunidade.grupos().map((g) => Comunidade.grupoCompleto(g.id)).filter(Boolean);

    return `
      <section class="bloco">
        <div class="bloco__topoLinha">
          <h2 class="bloco__titulo">Grupos</h2>
          <button class="bloco__acao" type="button" data-grupos>ver todos</button>
        </div>
        ${lista.length
          ? `<ul class="listaSimples">
              ${lista.map((g) => `
                <li class="linhaItem" data-grupo="${g.id}">
                  <span class="linhaItem__icone">${g.emoji}</span>
                  <span class="linhaItem__texto">
                    <span class="linhaItem__nome">${g.nome}</span>
                    <span class="linhaItem__meta">${g.quantos} ${g.quantos === 1 ? 'participante' : 'participantes'} · ${g.pontos.toLocaleString('pt-BR')} pts</span>
                  </span>
                </li>`).join('')}
            </ul>`
          : '<p class="bloco__nota">Você ainda não participa de nenhum grupo.</p>'}
      </section>`;
  }

  function meusDesafios() {
    const ativos = Comunidade.desafios().filter((d) => d.inscrito);

    return `
      <section class="bloco">
        <div class="bloco__topoLinha">
          <h2 class="bloco__titulo">Desafios</h2>
          <button class="bloco__acao" type="button" data-desafios>ver todos</button>
        </div>
        ${ativos.length
          ? `<ul class="listaSimples">
              ${ativos.map((d) => `
                <li class="linhaItem">
                  <span class="linhaItem__icone">${d.emoji}</span>
                  <span class="linhaItem__texto">
                    <span class="linhaItem__nome">${d.nome}</span>
                    <span class="linhaItem__meta">${d.feito} de ${d.alvo} ${d.unidade}</span>
                  </span>
                  <span class="linhaItem__pct">${d.progresso}%</span>
                </li>`).join('')}
            </ul>`
          : '<p class="bloco__nota">Nenhum desafio em andamento.</p>'}
      </section>`;
  }

  function publicacoes() {
    const lista = SocialDados.porData().filter((a) => a.publicada);
    if (!lista.length) return '';

    return `
      <section class="bloco">
        <div class="bloco__topoLinha">
          <h2 class="bloco__titulo">Publicações</h2>
          <span class="bloco__contagem">${lista.length}</span>
        </div>
        <div class="grade">
          ${lista.slice().reverse().slice(0, 9).map((a) => `
            <div class="grade__item">
              ${a.foto
                ? `<img src="${a.foto}" alt="" loading="lazy">`
                : `<span class="grade__semFoto">${a.pontos > 0 ? '+' + a.pontos : '—'}</span>`}
            </div>`).join('')}
        </div>
      </section>`;
  }

  /* A privacidade do perfil fica aqui, e não numa tela de ajustes
     distante: é olhando o próprio perfil que se decide o quanto dele
     mostrar. */
  function ajustes() {
    const atual = Privacidade.doPerfil();
    const noRanking = Privacidade.apareceNoRanking();

    return `
      <section class="bloco">
        <h2 class="bloco__titulo">Privacidade</h2>

        <div class="pub__quemVe">
          <span class="pub__rotulo">Quem vê meu perfil</span>
          <div class="opcoesVer">
            ${Privacidade.OPCOES.map((o) => `
              <button class="verOpcao${atual === o.id ? ' verOpcao--on' : ''}" type="button"
                      data-ver-perfil="${o.id}" aria-pressed="${atual === o.id}">
                <span class="verOpcao__icone" aria-hidden="true">${o.icone}</span>
                <span class="verOpcao__nome">${o.nome}</span>
              </button>`).join('')}
          </div>
        </div>

        <button class="conta__opcao" data-ranking-toggle type="button" aria-pressed="${noRanking}">
          <span class="conta__icone" aria-hidden="true">🏆</span>
          <span class="conta__texto">
            <span class="conta__nome">Aparecer no ranking</span>
            <span class="conta__sub">${noRanking
              ? 'sua pontuação entra na lista'
              : 'você continua vendo o ranking, sem aparecer nele'}</span>
          </span>
          <span class="chave${noRanking ? ' chave--on' : ''}" aria-hidden="true"></span>
        </button>
      </section>`;
  }

  function render() {
    raiz.innerHTML =
      Componentes.topo('Perfil', 'sua página fitness') +
      `<div class="perfil">
        ${cabecalho()}
        ${numeros()}
        ${conquistas()}
        ${publicacoes()}
        ${meusGrupos()}
        ${meusDesafios()}
        ${ajustes()}
      </div>`;
  }

  function aoClicar(evento) {
    const alvo = (s) => evento.target.closest(s);

    if (alvo('[data-voltar]')) { history.back(); return; }
    if (alvo('[data-grupos]')) { Router.ir('grupos'); return; }
    if (alvo('[data-desafios]')) { Router.ir('desafios'); return; }

    const grupo = alvo('[data-grupo]');
    if (grupo) { Router.ir('grupo', { id: grupo.dataset.grupo }); return; }

    const ver = alvo('[data-ver-perfil]');
    if (ver) { Privacidade.definirDoPerfil(ver.dataset.verPerfil); render(); return; }

    if (alvo('[data-ranking-toggle]')) {
      Privacidade.definirRanking(!Privacidade.apareceNoRanking());
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
