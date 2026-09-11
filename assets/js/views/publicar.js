/* Publicar o treino no Social: foto, legenda e privacidade.

   A foto é opcional e isso precisa ficar claro na tela, não só no
   código: os pontos já caíram quando o treino foi encerrado, e
   publicar não muda um ponto sequer. Quem não quiser aparecer fecha
   esta tela e não perde nada.

   Por isso a ordem aqui: primeiro o que já foi conquistado, depois o
   convite para mostrar. */
const Publicar = (() => {
  let raiz = null;
  let atividade = null;
  let foto = null;        // { url, largura, altura, bytes }
  let legenda = '';
  let ocupado = false;    // aguardando o seletor do sistema
  let erro = null;

  const LIMITE_LEGENDA = 140;

  function resumoDoTreino() {
    const tipo = atividade.tipoId ? Dados.tipoPorId(atividade.tipoId) : null;
    return `
      <div class="pub__treino" style="--cor:${tipo ? tipo.cor : '#7C5CFF'}">
        <span class="pub__icone">${tipo ? Icones.musculo(atividade.tipoId) : '🏋️'}</span>
        <span class="pub__dados">
          <span class="pub__nome">${atividade.titulo}</span>
          <span class="pub__meta">${atividade.minutos} min · ${atividade.series} ${atividade.series === 1 ? 'série' : 'séries'}</span>
        </span>
        ${atividade.pontos > 0 ? `<span class="pub__pontos">+${atividade.pontos}</span>` : ''}
      </div>`;
  }

  function areaDaFoto() {
    if (foto) {
      return `
        <div class="pub__foto">
          <img class="pub__imagem" src="${foto.url}" alt="Foto do treino">
          <button class="pub__trocarFoto" data-remover-foto type="button">Remover foto</button>
          <p class="pub__peso">${foto.largura}×${foto.altura} · ${Foto.tamanhoLegivel(foto.bytes)}</p>
        </div>`;
    }

    return `
      <div class="pub__semFoto">
        <p class="pub__convite">Quer mostrar o treino? <strong>A foto é opcional.</strong></p>
        <div class="pub__botoesFoto">
          <button class="pub__foto--btn" data-camera type="button" ${ocupado ? 'disabled' : ''}>
            <span aria-hidden="true">📷</span> Tirar foto
          </button>
          <button class="pub__foto--btn" data-galeria type="button" ${ocupado ? 'disabled' : ''}>
            <span aria-hidden="true">🖼️</span> Escolher da galeria
          </button>
        </div>
      </div>`;
  }

  function campoDeLegenda() {
    const resta = LIMITE_LEGENDA - legenda.length;
    return `
      <label class="pub__legenda">
        <span class="pub__rotulo">Legenda <span class="pub__opcional">opcional</span></span>
        <textarea class="pub__texto" data-legenda rows="2" maxlength="${LIMITE_LEGENDA}"
                  placeholder="Como foi o treino?">${legenda}</textarea>
        <span class="pub__contador">${resta}</span>
      </label>`;
  }

  /* Quem vê. A escolha fica junto do botão de publicar, e não escondida
     numa tela de configurações, porque é aqui que ela é decidida. */
  function privacidade() {
    const atual = Privacidade.dePublicacao();
    return `
      <div class="pub__quemVe">
        <span class="pub__rotulo">Quem vê</span>
        <div class="opcoesVer">
          ${Privacidade.OPCOES.map((o) => `
            <button class="verOpcao${atual === o.id ? ' verOpcao--on' : ''}" type="button"
                    data-ver="${o.id}" aria-pressed="${atual === o.id}">
              <span class="verOpcao__icone" aria-hidden="true">${o.icone}</span>
              <span class="verOpcao__nome">${o.nome}</span>
            </button>`).join('')}
        </div>
      </div>`;
  }

  function render() {
    raiz.innerHTML = `
      ${Componentes.topo('Publicar', 'no seu feed')}
      <div class="pub">
        ${resumoDoTreino()}
        <p class="pub__jaGarantido">
          ${atividade.pontos > 0
            ? `Os <strong>${atividade.pontos} pontos</strong> já estão contados. Publicar não muda a pontuação.`
            : 'Este treino já está no seu histórico. Publicar não muda a pontuação.'}
        </p>
        ${areaDaFoto()}
        ${erro ? `<p class="pub__erro">${erro}</p>` : ''}
        ${campoDeLegenda()}
        ${privacidade()}
        <button class="pub__enviar" data-publicar type="button">Publicar no Social</button>
        <button class="pub__pular" data-pular type="button">Agora não</button>
      </div>`;
  }

  async function pegarFoto(camera) {
    if (ocupado) return;
    ocupado = true;
    erro = null;
    render();

    const r = await Foto.capturar(camera);
    ocupado = false;

    if (r.ok) foto = r.foto;
    else if (!r.cancelado) erro = r.motivo;

    if (raiz.isConnected) render();
  }

  function publicar() {
    SocialDados.atualizar(atividade.id, {
      publicada: true,
      foto: foto ? foto.url : null,
      legenda: legenda.trim(),
      visibilidade: Privacidade.dePublicacao(),
      publicadaEm: Date.now()
    });
    SocialDados.conferirConquistas();
    Abas.ir('social');
  }

  function aoClicar(evento) {
    const alvo = (s) => evento.target.closest(s);

    if (alvo('[data-voltar]') || alvo('[data-pular]')) {
      Abas.ir('social');
      return;
    }
    if (alvo('[data-camera]')) return pegarFoto(true);
    if (alvo('[data-galeria]')) return pegarFoto(false);

    if (alvo('[data-remover-foto]')) {
      foto = null;
      render();
      return;
    }

    const ver = alvo('[data-ver]');
    if (ver) {
      Privacidade.definirDePublicacao(ver.dataset.ver);
      render();
      return;
    }

    if (alvo('[data-publicar]')) publicar();
  }

  /* A legenda não repinta a tela a cada tecla — isso tiraria o foco do
     campo. Só o contador se atualiza. */
  function aoDigitar(evento) {
    if (!evento.target.matches('[data-legenda]')) return;
    legenda = evento.target.value;
    const contador = raiz.querySelector('.pub__contador');
    if (contador) contador.textContent = LIMITE_LEGENDA - legenda.length;
  }

  function montar(elemento, params) {
    raiz = elemento;
    raiz.classList.add('arcade', 'arcade--social');

    atividade = params && params.id ? SocialDados.porId(params.id) : null;
    // Sem atividade não há o que publicar: volta em vez de pintar vazio.
    if (!atividade) {
      Abas.ir('social');
      return;
    }

    foto = null;
    legenda = '';
    ocupado = false;
    erro = null;

    raiz.addEventListener('click', aoClicar);
    raiz.addEventListener('input', aoDigitar);
    render();
  }

  return { montar };
})();
