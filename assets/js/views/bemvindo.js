/* Primeira abertura: diz o que o app usa do aparelho antes de usar, e
   pede a permissão de notificação num toque explícito — o navegador só
   aceita o pedido dentro de um gesto do usuário. */
const BemVindo = (() => {
  let raiz = null;
  let resposta = null;

  const RECURSOS = [
    {
      icone: '🔔',
      nome: 'Notificações',
      texto: 'Para avisar quando o descanso entre séries acabar, mesmo com o app no bolso.'
    },
    {
      icone: '📳',
      nome: 'Vibração',
      texto: 'O mesmo aviso sem som, para não atrapalhar quem está do lado.'
    },
    {
      icone: '📦',
      nome: 'Espaço no aparelho',
      texto: 'Treinos, sequência e histórico ficam guardados aqui. Nada é enviado para lugar nenhum.'
    }
  ];

  function recurso(r) {
    return `
      <li class="bemvindo__item">
        <span class="bemvindo__icone" aria-hidden="true">${r.icone}</span>
        <span class="bemvindo__texto">
          <span class="bemvindo__nome">${r.nome}</span>
          <span class="bemvindo__desc">${r.texto}</span>
        </span>
      </li>`;
  }

  function render() {
    raiz.innerHTML = `
      <div class="bemvindo">
        <h1 class="bemvindo__titulo">Antes de<span>começar</span></h1>
        <p class="bemvindo__linha">O que o BunnyGym usa do seu aparelho:</p>

        <ul class="bemvindo__lista">${RECURSOS.map(recurso).join('')}</ul>

        ${resposta ? `<p class="bemvindo__resposta">${resposta}</p>` : ''}

        <button class="entrada__ir" data-permitir type="button">Permitir notificações</button>
        <button class="entrada__trocar" data-pular type="button">Agora não</button>
      </div>`;
  }

  function aoClicar(evento) {
    if (evento.target.closest('[data-pular]')) {
      Router.ir('dashboard');
      return;
    }

    if (!evento.target.closest('[data-permitir]')) return;

    Alerta.pedirPermissao().then((estado) => {
      if (estado === 'granted' || estado === 'indisponivel') {
        Router.ir('dashboard');
        return;
      }
      // Negada ou ignorada: segue em frente, o aviso na tela continua valendo.
      resposta = 'Sem notificação, tudo bem — o aviso de descanso aparece na tela do mesmo jeito.';
      render();
      setTimeout(() => {
        if (raiz.isConnected) Router.ir('dashboard');
      }, 2600);
    });
  }

  function montar(elemento) {
    raiz = elemento;
    resposta = null;
    raiz.classList.add('arcade');
    raiz.addEventListener('click', aoClicar);
    render();
  }

  return { montar };
})();
