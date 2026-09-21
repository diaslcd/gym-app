/* Perguntas que montam o treino.

   Aparece antes do primeiro treino — depois do plano da semana, para quem
   está chegando, ou no "Iniciar treino" de quem já usava o app — e pode
   ser reaberta pela faixa do painel para mudar qualquer resposta.

   As respostas ficam num rascunho até salvar, e o resumo embaixo refaz a
   conta a cada toque: a pessoa vê na hora que "30 min" com "7 a 8
   exercícios" não cabe, e o que o app faz com isso. Resposta com
   consequência escondida vira chute; mostrando, vira escolha. */
const TelaPerguntas = (() => {
  let raiz = null;
  let rascunho = null;
  let primeiraVez = false;
  let depois = 'dashboard';
  let confirmandoRenovacao = false;

  function pergunta(p) {
    const atual = rascunho[p.id];
    return `
      <section class="bloco pergunta">
        <h2 class="bloco__titulo">${p.titulo}</h2>
        <div class="pergunta__opcoes" style="--colunas:${p.opcoes.length === 4 ? 2 : p.opcoes.length}">
          ${p.opcoes.map((o) => `
            <button class="resp${atual === o.id ? ' resp--on' : ''}" type="button"
                    data-pergunta="${p.id}" data-valor="${o.id}" aria-pressed="${atual === o.id}">
              <span class="resp__nome">${o.nome}</span>
              ${o.detalhe ? `<span class="resp__detalhe">${o.detalhe}</span>` : ''}
            </button>`).join('')}
        </div>
      </section>`;
  }

  function resumo() {
    const v = Programa.volume(rascunho);
    const faixa = Programa.opcao('exercicios', rascunho.exercicios);
    const tempo = Programa.opcao('tempo', rascunho.tempo);

    // Quando o tempo não comporta o costume, o resumo diz o que foi feito.
    const aviso = v.exercicios < faixa.min
      ? `<p class="resumoTreino__aviso">Em ${tempo.nome} não cabem ${faixa.nome} exercícios com calma — o treino fica com ${v.exercicios}, para você terminar sem correr.</p>`
      : '';

    const info = Programa.infoCiclo();
    const ciclo = info ? `
      <div class="resumoTreino__ciclo">
        <span>Ciclo ${info.numero} · renova em ${info.diasParaRenovar} ${info.diasParaRenovar === 1 ? 'dia' : 'dias'}</span>
        <button class="resumoTreino__renovar${confirmandoRenovacao ? ' resumoTreino__renovar--confirma' : ''}"
                type="button" data-renovar>
          ${confirmandoRenovacao ? 'Toque de novo para trocar' : 'Renovar agora'}
        </button>
      </div>` : '';

    return `
      <section class="resumoTreino">
        <p class="resumoTreino__titulo">Seu treino vai ter</p>
        <div class="resumoTreino__nums">
          <span class="resumoTreino__num"><strong>${v.exercicios}</strong> exercícios</span>
          <span class="resumoTreino__num"><strong>${v.series}</strong> séries</span>
          <span class="resumoTreino__num"><strong>${v.descanso}s</strong> descanso</span>
        </div>
        <p class="resumoTreino__tempo">cerca de ${v.minutos} min, com aquecimento</p>
        ${aviso}
        <p class="resumoTreino__nota">
          A cada ${Programa.opcao('renovacao', rascunho.renovacao).id} meses os exercícios são trocados
          por outros do mesmo grupo${rascunho.equipamento === 'tanto' ? '' : `, dando preferência a ${rascunho.equipamento === 'maquinas' ? 'máquinas' : 'pesos livres'}`}.
          Seu histórico e a evolução de carga continuam.
        </p>
        ${ciclo}
      </section>`;
  }

  function render() {
    const rolagem = window.scrollY;
    raiz.innerHTML = `
      <div class="perguntas">
        ${primeiraVez
          ? '<h1 class="plano__titulo">Como você<span>treina?</span></h1>'
          : Componentes.topo('Seu treino', 'as respostas montam a ficha')}
        ${Programa.PERGUNTAS.map(pergunta).join('')}
        ${resumo()}
        <button class="entrada__ir" type="button" data-salvar>
          ${primeiraVez || !Programa.respondido() ? 'Montar meu treino' : 'Salvar'}
        </button>
      </div>`;
    window.scrollTo(0, rolagem);
  }

  function aoClicar(evento) {
    const alvo = (s) => evento.target.closest(s);

    if (alvo('[data-voltar]')) { history.back(); return; }

    const resp = alvo('[data-pergunta]');
    if (resp) {
      const p = Programa.PERGUNTAS.find((q) => q.id === resp.dataset.pergunta);
      // Os ids são número ou texto; o dataset devolve sempre texto.
      const valor = p.opcoes.map((o) => o.id).find((id) => String(id) === resp.dataset.valor);
      rascunho[p.id] = valor;
      confirmandoRenovacao = false;
      render();
      return;
    }

    /* Renovar troca os exercícios de todos os treinos e apaga os ajustes
       da sessão — pede o segundo toque. */
    if (alvo('[data-renovar]')) {
      if (!confirmandoRenovacao) {
        confirmandoRenovacao = true;
        render();
        return;
      }
      Programa.salvar(rascunho);
      Programa.renovarAgora();
      confirmandoRenovacao = false;
      Router.ir('dashboard', { renovado: true });
      return;
    }

    if (alvo('[data-salvar]')) {
      Programa.salvar(rascunho);
      Router.ir(depois);
    }
  }

  function montar(elemento, params) {
    raiz = elemento;
    primeiraVez = !!(params && params.primeiraVez);
    depois = (params && params.depois) || 'dashboard';
    rascunho = Programa.respostas();
    confirmandoRenovacao = false;
    raiz.classList.add('arcade');
    raiz.addEventListener('click', aoClicar);
    render();
  }

  return { montar };
})();
