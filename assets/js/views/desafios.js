/* Desafios: metas com prazo, medidas pelos treinos já registrados.

   O progresso não é digitado nem marcado à mão — sai do mesmo histórico
   que alimenta o calendário. Isso resolve duas coisas de uma vez: não há
   como inflar o número, e não há como o desafio discordar do treino.

   Entrar num desafio grava só a data de início. O resto é calculado a
   partir dela, então mudar a regra depois não corrompe quem já estava
   dentro. */
const Desafios = (() => {
  let raiz = null;

  function barra(d) {
    return `
      <div class="progresso" role="img"
           aria-label="${d.feito} de ${d.alvo} ${d.unidade}, ${d.progresso} por cento">
        <div class="progresso__trilho">
          <div class="progresso__cheio${d.concluido ? ' progresso__cheio--feito' : ''}"
               style="width:${Math.max(d.progresso, 2)}%"></div>
        </div>
        <span class="progresso__num">${d.progresso}%</span>
      </div>`;
  }

  function estado(d) {
    if (!d.inscrito) return `<span class="desafio__premio">+${d.premio} pts</span>`;
    if (d.concluido) return '<span class="desafio__feito">✓ concluído</span>';
    if (d.expirado) return '<span class="desafio__expirado">prazo encerrado</span>';
    return `<span class="desafio__prazo">${d.diasRestantes} ${d.diasRestantes === 1 ? 'dia restante' : 'dias restantes'}</span>`;
  }

  function cartao(d) {
    return `
      <li class="desafio${d.inscrito ? ' desafio--dentro' : ''}${d.concluido ? ' desafio--feito' : ''}">
        <div class="desafio__topo">
          <span class="desafio__emoji">${d.emoji}</span>
          <span class="desafio__texto">
            <span class="desafio__nome">${d.nome}</span>
            <span class="desafio__desc">${d.descricao}</span>
          </span>
          ${estado(d)}
        </div>

        ${d.inscrito ? `
          ${barra(d)}
          <p class="desafio__contagem">
            <strong>${d.feito}</strong> de ${d.alvo} ${d.unidade}
          </p>
          <button class="desafio__sair" data-sair="${d.id}" type="button">Sair do desafio</button>
        ` : `
          <p class="desafio__meta">Meta: ${d.alvo} ${d.unidade} em ${d.dias} dias</p>
          <button class="desafio__entrar" data-entrar="${d.id}" type="button">Participar</button>
        `}
      </li>`;
  }

  function render() {
    const lista = Comunidade.desafios();
    const dentro = lista.filter((d) => d.inscrito);

    raiz.innerHTML =
      Componentes.topo('Desafios', 'metas com prazo') +
      `<div class="desafiosTela">
        ${dentro.length
          ? ''
          : `<p class="bloco__nota">
              Escolha um desafio para começar. O progresso é contado
              automaticamente a partir dos treinos que você registrar.
            </p>`}
        <ul class="desafioLista">${lista.map(cartao).join('')}</ul>
        <p class="rankTela__nota">
          Os pontos do prêmio são creditados quando o desafio é concluído dentro
          do prazo. O progresso vem do seu histórico de treinos — não há como
          marcá-lo à mão.
        </p>
      </div>`;
  }

  function aoClicar(evento) {
    const alvo = (s) => evento.target.closest(s);

    if (alvo('[data-voltar]')) { history.back(); return; }

    const entrar = alvo('[data-entrar]');
    if (entrar) { Comunidade.entrarNoDesafio(entrar.dataset.entrar); render(); return; }

    const sair = alvo('[data-sair]');
    if (sair) { Comunidade.sairDoDesafio(sair.dataset.sair); render(); }
  }

  function montar(elemento) {
    raiz = elemento;
    raiz.classList.add('arcade', 'arcade--social');
    raiz.addEventListener('click', aoClicar);
    render();
  }

  return { montar };
})();
