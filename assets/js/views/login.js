/* Tela de entrada: cria o perfil na primeira vez, pede o PIN nas
   seguintes. Sem servidor por trás — ver o aviso em perfil.js. */
const Login = (() => {
  let raiz = null;
  let erro = null;
  let comPin = false;   // a chave do PIN está ligada?
  // O que já foi digitado sobrevive ao repintar da tela.
  let rascunho = { nome: '', pin: '' };
  let ocupado = false;   // aguardando a resposta do sensor

  function marca() {
    return `<h1 class="entrada__marca">Bunny<span>Gym</span></h1>`;
  }

  function campoPin(rotulo) {
    return `
      <input class="entrada__pin" type="password" data-pin inputmode="numeric"
             maxlength="4" value="${rascunho.pin}" placeholder="${rotulo}"
             autocomplete="current-password">`;
  }

  /** Primeira vez: nome e, se a chave estiver ligada, um PIN. */
  function formularioNovo() {
    return `
      <p class="entrada__pergunta">Quem vai treinar hoje?</p>

      <input class="entrada__nome" type="text" data-nome maxlength="24"
             value="${rascunho.nome}" placeholder="Seu nome" autocomplete="given-name">

      <button class="entrada__trava" data-trava type="button" aria-pressed="${comPin}">
        <span class="entrada__chave${comPin ? ' entrada__chave--on' : ''}"></span>
        Proteger com um PIN
      </button>

      ${comPin ? campoPin('4 dígitos') : ''}
      ${erro ? `<p class="entrada__erro">${erro}</p>` : ''}

      <button class="entrada__ir" data-criar type="button">Bora</button>`;
  }

  /* Botão da digital. Só aparece quando há cadastro válido neste
     aparelho — oferecer o que não vai funcionar é pior do que não
     oferecer. O PIN continua logo abaixo, sempre: é a saída para
     quando a leitura falha, o dedo está molhado ou a pessoa
     simplesmente prefere digitar. */
  function botaoBiometria() {
    if (!Biometria.ativa()) return '';
    return `
      <button class="entrada__bio" data-bio type="button" ${ocupado ? 'disabled' : ''}>
        <span class="entrada__bioIcone" aria-hidden="true">${Icones.digital}</span>
        <span class="entrada__bioTexto">${ocupado ? 'Confirmando…' : 'Entrar com biometria'}</span>
      </button>`;
  }

  /** Já tem perfil: pede o PIN se houver, senão é só confirmar. */
  function formularioVolta() {
    return `
      <p class="entrada__pergunta">Olá de novo, ${Perfil.nome()}.</p>

      ${botaoBiometria()}
      ${Perfil.temPin() ? campoPin('Seu PIN') : ''}
      ${erro ? `<p class="entrada__erro">${erro}</p>` : ''}

      <button class="entrada__ir" data-entrar type="button">Bora</button>
      <button class="entrada__trocar" data-esquecer type="button">Usar outro perfil</button>`;
  }

  /* Pergunta a digital assim que a tela abre, quando está ativada.

     Só na abertura, e uma vez: repetir a cada repintura viraria um
     diálogo que reabre sozinho, e quem escolheu digitar o PIN ficaria
     preso. Se falhar ou for cancelada, a tela permanece com o PIN à
     mão — nada trava. */
  async function tentarBiometria(automatica) {
    if (!Biometria.ativa() || ocupado) return;
    ocupado = true;
    erro = null;
    render();

    const r = await Biometria.entrar();
    ocupado = false;

    if (r.ok) {
      // A biometria destrava a sessão; o PIN segue guardado no perfil.
      Perfil.liberar();
      Router.ir('dashboard');
      return;
    }

    // Cancelar a oferta automática não merece texto de erro: a pessoa
    // só quis digitar o PIN. Já a tentativa pedida no botão explica.
    if (!automatica || r.expirada) erro = r.motivo;
    render();
  }

  function render() {
    raiz.innerHTML = `
      <div class="entrada">
        ${marca()}
        ${Perfil.existe() ? formularioVolta() : formularioNovo()}
        <p class="entrada__nota">Fica tudo neste aparelho.</p>
      </div>`;

    // Depois de ligar a chave, o dedo já está indo para o PIN.
    const alvo = raiz.querySelector(comPin || Perfil.temPin() ? '[data-pin]' : '[data-nome]');
    if (alvo) alvo.focus();
  }

  function criar() {
    if (!rascunho.nome) {
      erro = 'Escreva um nome para continuar.';
      render();
      return;
    }
    if (comPin && rascunho.pin.length < 4) {
      erro = 'O PIN precisa ter 4 dígitos — ou desligue a chave.';
      render();
      return;
    }
    Perfil.criar(rascunho.nome, comPin ? rascunho.pin : '');
    // Perfil novo: passa pela tela que explica o que o app usa.
    Router.ir('bemvindo');
  }

  function entrar() {
    if (Perfil.entrar(rascunho.pin)) {
      Router.ir('dashboard');
      return;
    }
    erro = 'PIN errado. Tente de novo.';
    rascunho.pin = '';
    render();
  }

  function aoClicar(evento) {
    if (evento.target.closest('[data-criar]')) return criar();
    if (evento.target.closest('[data-entrar]')) return entrar();
    if (evento.target.closest('[data-bio]')) return tentarBiometria(false);

    if (evento.target.closest('[data-trava]')) {
      comPin = !comPin;
      if (!comPin) rascunho.pin = '';
      erro = null;
      render();
      return;
    }

    if (evento.target.closest('[data-esquecer]')) {
      Perfil.esquecer();
      erro = null;
      comPin = false;
      rascunho = { nome: '', pin: '' };
      render();
    }
  }

  function aoDigitar(evento) {
    const campo = evento.target;
    if (campo.matches('[data-nome]')) rascunho.nome = campo.value.trim();
    if (campo.matches('[data-pin]')) rascunho.pin = campo.value.trim();
  }

  // Enter no campo faz o mesmo que o botão.
  function aoTeclar(evento) {
    if (evento.key !== 'Enter') return;
    evento.preventDefault();
    if (Perfil.existe()) entrar();
    else criar();
  }

  function montar(elemento) {
    raiz = elemento;
    erro = null;
    comPin = false;
    ocupado = false;
    rascunho = { nome: '', pin: '' };
    raiz.classList.add('arcade');
    raiz.addEventListener('click', aoClicar);
    raiz.addEventListener('input', aoDigitar);
    raiz.addEventListener('keydown', aoTeclar);
    render();

    // Perfil que já usa biometria não deveria precisar tocar em nada.
    if (Perfil.existe() && Biometria.ativa()) tentarBiometria(true);
  }

  return { montar };
})();
