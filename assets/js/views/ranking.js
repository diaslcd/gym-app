/* Ranking individual e de grupos.

   Duas listas na mesma tela, alternadas por um seletor: quem compete
   sozinho e quem compete junto. Separar em duas telas obrigaria a sair
   e voltar para comparar, que é justamente o que se quer fazer aqui.

   Os perfis de demonstração levam um selo. O app não tem servidor e
   ninguém do outro lado existe — apresentar essa lista como real seria
   mentira, e a sua posição dentro dela não significaria nada. */
const Ranking = (() => {
  let raiz = null;
  let aba = 'individual';

  function seletor() {
    const opcao = (id, nome) => `
      <button class="segmento${aba === id ? ' segmento--on' : ''}" type="button"
              data-aba-rank="${id}" aria-pressed="${aba === id}">${nome}</button>`;

    return `<div class="segmentos" role="group" aria-label="Tipo de ranking">
      ${opcao('individual', 'Individual')}${opcao('grupos', 'Grupos')}
    </div>`;
  }

  function medalha(posicao) {
    if (posicao === 1) return '🥇';
    if (posicao === 2) return '🥈';
    if (posicao === 3) return '🥉';
    return posicao + 'º';
  }

  function linhaPessoa(p) {
    return `
      <li class="rank${p.souEu ? ' rank--eu' : ''}">
        <span class="rank__pos">${medalha(p.posicao)}</span>
        <span class="rank__avatar" aria-hidden="true">${p.avatar}</span>
        <span class="rank__quem">
          <span class="rank__nome">
            ${p.nome}${p.demo ? '<span class="selo-demo">demonstração</span>' : ''}
          </span>
          <span class="rank__meta">${p.treinos} treinos · ${p.sequencia} de sequência</span>
        </span>
        <span class="rank__pontos">${p.pontos.toLocaleString('pt-BR')}</span>
      </li>`;
  }

  function linhaGrupo(g) {
    return `
      <li class="rank${g.demo ? '' : ' rank--eu'}" ${g.demo ? '' : `data-grupo="${g.id}"`}>
        <span class="rank__pos">${medalha(g.posicao)}</span>
        <span class="rank__avatar" aria-hidden="true">${g.emoji}</span>
        <span class="rank__quem">
          <span class="rank__nome">
            ${g.nome}${g.demo ? '<span class="selo-demo">demonstração</span>' : ''}
          </span>
          <span class="rank__meta">${g.quantos} ${g.quantos === 1 ? 'participante' : 'participantes'}</span>
        </span>
        <span class="rank__pontos">${g.pontos.toLocaleString('pt-BR')}</span>
      </li>`;
  }

  /* A sua linha fica fixa no rodapé quando você está fora da parte
     visível da lista. Rolar atrás da própria posição é o incômodo
     clássico de ranking longo. */
  function minhaFaixa() {
    const eu = Comunidade.minhaPosicao();
    if (!eu) {
      return `<p class="rank__fora">
        Você optou por não aparecer no ranking. Dá para mudar isso no
        <button class="rank__link" type="button" data-perfil>seu perfil</button>.
      </p>`;
    }
    return `
      <div class="rankEu">
        <span class="rankEu__pos">${medalha(eu.posicao)}</span>
        <span class="rankEu__texto">Você, com <strong>${eu.pontos.toLocaleString('pt-BR')}</strong> pontos</span>
      </div>`;
  }

  function render() {
    const individual = aba === 'individual';
    const lista = individual
      ? Comunidade.ranking().map(linhaPessoa).join('')
      : Comunidade.rankingDeGrupos().map(linhaGrupo).join('');

    raiz.innerHTML =
      Componentes.topo('Ranking', individual ? 'competição individual' : 'competição por grupo') +
      `<div class="rankTela">
        ${seletor()}
        <ul class="rankLista">${lista}</ul>
        ${individual ? minhaFaixa() : `
          <button class="rankTela__criar" data-grupos type="button">
            ${Comunidade.grupos().length ? 'Ver meus grupos' : 'Criar um grupo'}
          </button>`}
        <p class="rankTela__nota">
          Os perfis marcados como demonstração não são pessoas reais: o app
          ainda não tem servidor, e sua pontuação é a única de verdade nesta
          lista.
        </p>
      </div>`;
  }

  function aoClicar(evento) {
    const alvo = (s) => evento.target.closest(s);

    if (alvo('[data-voltar]')) { history.back(); return; }
    if (alvo('[data-perfil]')) { Router.ir('perfil'); return; }
    if (alvo('[data-grupos]')) { Router.ir('grupos'); return; }

    const trocar = alvo('[data-aba-rank]');
    if (trocar) { aba = trocar.dataset.abaRank; render(); return; }

    const grupo = alvo('[data-grupo]');
    if (grupo) Router.ir('grupo', { id: grupo.dataset.grupo });
  }

  function montar(elemento, params) {
    raiz = elemento;
    raiz.classList.add('arcade', 'arcade--social');
    aba = (params && params.aba) || 'individual';
    raiz.addEventListener('click', aoClicar);
    render();
  }

  return { montar };
})();
