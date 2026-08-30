/* Aviso de fim de descanso: na tela, no aparelho e, se o usuário
   deixar, no sistema.

   O aviso na tela é o que sempre funciona. A vibração depende do
   aparelho e a notificação depende de permissão — nenhum dos dois é
   garantido, então nada aqui é a única forma de avisar. */
const Alerta = (() => {
  let raiz = null;
  let relogio = null;

  /** Pede a permissão uma vez, quando o usuário inicia um descanso. */
  function pedirPermissao() {
    try {
      if (typeof Notification === 'undefined') return;
      if (Notification.permission === 'default') Notification.requestPermission();
    } catch (erro) {
      // Alguns navegadores recusam o pedido fora de um gesto; segue sem.
    }
  }

  function notificar(texto) {
    try {
      if (typeof Notification === 'undefined') return;
      if (Notification.permission !== 'granted') return;
      new Notification('BunnyGym', { body: texto, tag: 'descanso' });
    } catch (erro) {
      // Notificação bloqueada: o aviso na tela já cobriu.
    }
  }

  function vibrar() {
    try {
      if (navigator.vibrate) navigator.vibrate([220, 120, 220]);
    } catch (erro) {
      // Sem vibração: nada a fazer.
    }
  }

  function fechar() {
    if (raiz) raiz.remove();
    raiz = null;
  }

  /** Faixa que cobre a tela até ser tocada, ou por 8 segundos. */
  function naTela(texto) {
    fechar();
    raiz = document.createElement('div');
    raiz.className = 'alerta';
    raiz.innerHTML =
      '<button class="alerta__corpo" type="button">' +
      '<span class="alerta__titulo">Descanso encerrado</span>' +
      '<span class="alerta__texto">' + texto + '</span>' +
      '</button>';
    raiz.addEventListener('click', fechar);
    document.body.appendChild(raiz);

    clearTimeout(relogio);
    relogio = setTimeout(fechar, 8000);
  }

  /** Chamado quando o cronômetro de descanso chega a zero. */
  function descansoAcabou(texto) {
    naTela(texto);
    vibrar();
    notificar(texto);
  }

  return { pedirPermissao, descansoAcabou, fechar };
})();
