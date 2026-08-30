/* Tela de entrada: cria o perfil na primeira vez, pede o PIN nas
   seguintes. Sem servidor por trás — ver o aviso em perfil.js. */
const Login = (() => {
  let raiz = null;
  let erro = null;

  function boasVindas() {
    return `
      <div class="entrada__marca">
        <img class="entrada__coelho" src="assets/icone.png" alt="" width="96" height="96">
        <h1 class="brand">${Dados.app.nome}</h1>
      </div>`;
  }

  /** Primeira vez: escolhe o nome e, se quiser, um PIN. */
  function formularioNovo() {
    return `
      <section class="bloco entrada__cartao">
        <h2 class="bloco__titulo">Quem vai treinar?</h2>

        <label class="entrada__campo">
          <span class="entrada__rotulo">Seu nome</span>
          <input class="entrada__valor" type="text" data-nome maxlength="24"
                 placeholder="Como quer ser chamado" autocomplete="given-name">
        </label>

        <label class="entrada__campo">
          <span class="entrada__rotulo">PIN de 4 dígitos · opcional</span>
          <input class="entrada__valor" type="password" data-pin inputmode="numeric"
                 maxlength="4" placeholder="Deixe vazio para entrar direto"
                 autocomplete="new-password">
        </label>

        ${erro ? `<p class="entrada__erro">${erro}</p>` : ''}

        <button class="entrada__botao" data-criar type="button">Começar</button>
      </section>`;
  }

  /** Já tem perfil: pede o PIN se houver, senão é só confirmar. */
  function formularioVolta() {
    const trava = Perfil.temPin()
      ? `<label class="entrada__campo">
           <span class="entrada__rotulo">Seu PIN</span>
           <input class="entrada__valor" type="password" data-pin inputmode="numeric"
                  maxlength="4" placeholder="4 dígitos" autocomplete="current-password">
         </label>`
      : '';

    return `
      <section class="bloco entrada__cartao">
        <h2 class="bloco__titulo">Olá de novo, ${Perfil.nome()}</h2>
        ${trava}
        ${erro ? `<p class="entrada__erro">${erro}</p>` : ''}
        <button class="entrada__botao" data-entrar type="button">Entrar</button>
        <button class="entrada__trocar" data-esquecer type="button">Usar outro perfil</button>
      </section>`;
  }

  function render() {
    raiz.innerHTML =
      `<div class="entrada">
        ${boasVindas()}
        ${Perfil.existe() ? formularioVolta() : formularioNovo()}
        <p class="entrada__nota">
          Fica tudo neste aparelho. O app não manda nada para lugar nenhum.
        </p>
      </div>`;

    const primeiro = raiz.querySelector('[data-nome], [data-pin]');
    if (primeiro) primeiro.focus();
  }

  function valor(seletor) {
    const campo = raiz.querySelector(seletor);
    return campo ? campo.value.trim() : '';
  }

  function criar() {
    const nome = valor('[data-nome]');
    if (!nome) {
      erro = 'Escreva um nome para continuar.';
      render();
      return;
    }
    const pin = valor('[data-pin]');
    if (pin && pin.length < 4) {
      erro = 'O PIN precisa ter 4 dígitos — ou deixe vazio.';
      render();
      return;
    }
    Perfil.criar(nome, pin);
    Router.ir('dashboard');
  }

  function entrar() {
    if (Perfil.entrar(valor('[data-pin]'))) {
      Router.ir('dashboard');
      return;
    }
    erro = 'PIN errado. Tente de novo.';
    render();
  }

  function aoClicar(evento) {
    if (evento.target.closest('[data-criar]')) return criar();
    if (evento.target.closest('[data-entrar]')) return entrar();

    if (evento.target.closest('[data-esquecer]')) {
      Perfil.esquecer();
      erro = null;
      render();
    }
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
    raiz.classList.add('arcade');
    raiz.addEventListener('click', aoClicar);
    raiz.addEventListener('keydown', aoTeclar);
    render();
  }

  return { montar };
})();
