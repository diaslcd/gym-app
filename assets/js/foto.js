/* Foto do treino: captura, redução e guarda.

   POR QUE REDUZIR ANTES DE GUARDAR
   O localStorage tem cerca de 5 MB no total, para o app inteiro, e
   guarda texto — uma imagem vira base64 e engorda um terço no caminho.
   Uma foto de celular atual tem 3 a 8 MB. Sem reduzir, a primeira foto
   já estoura a cota, e o estouro não fica contido na foto: a gravação
   seguinte do histórico de treino também falha. Ou seja, guardar foto
   grande não quebra a foto, quebra o app.

   Por isso toda imagem passa por aqui antes de existir: é desenhada
   num canvas no tamanho máximo definido abaixo e sai como JPEG. Uma
   foto de 4 MB termina com algo em torno de 150 KB.

   ONDE A FOTO FICA
   No mesmo aparelho, dentro da atividade. Não há servidor e nada é
   enviado para lugar nenhum — o que vale dizer, porque foto de treino
   costuma ser foto de corpo. */
const Foto = (() => {

  /* 1080 é a largura que as redes usam para foto de feed e o limite
     acima do qual a tela do celular não mostra diferença. */
  const LADO_MAXIMO = 1080;
  const QUALIDADE = 0.82;

  /* Teto de segurança. Se mesmo reduzida a imagem passar disso, é sinal
     de foto muito detalhada; a qualidade cai mais um degrau em vez de
     arriscar a cota. */
  const BYTES_MAXIMOS = 400 * 1024;

  /**
   * Abre o seletor de imagem do sistema.
   *
   * `camera` decide o que o Android oferece: com `capture` ele abre a
   * câmera direto, sem ele mostra a galeria. É a mesma etiqueta de
   * arquivo nos dois casos — o WebView não dá acesso à câmera por outro
   * caminho sem plugin nativo, e o seletor do sistema já é o que a
   * pessoa conhece.
   *
   * Devolve o arquivo escolhido, ou null se a pessoa desistir.
   */
  function escolher(camera) {
    return new Promise((resolver) => {
      const campo = document.createElement('input');
      campo.type = 'file';
      campo.accept = 'image/*';
      if (camera) campo.capture = 'environment';
      campo.style.position = 'fixed';
      campo.style.left = '-9999px';
      document.body.appendChild(campo);

      let respondido = false;
      const responder = (arquivo) => {
        if (respondido) return;
        respondido = true;
        campo.remove();
        resolver(arquivo || null);
      };

      campo.addEventListener('change', () => responder(campo.files && campo.files[0]));

      /* Cancelar o seletor não dispara evento em todo navegador. O foco
         voltando para a janela é o sinal mais confiável de que a pessoa
         saiu da tela do sistema; damos um respiro para o change chegar
         primeiro quando ele existe. */
      window.addEventListener('focus', () => {
        setTimeout(() => responder(campo.files && campo.files[0]), 700);
      }, { once: true });

      campo.click();
    });
  }

  /** Lê o arquivo como data URL, que é o que o canvas e o <img> aceitam. */
  function lerArquivo(arquivo) {
    return new Promise((resolver, rejeitar) => {
      const leitor = new FileReader();
      leitor.onload = () => resolver(leitor.result);
      leitor.onerror = () => rejeitar(new Error('Não foi possível ler a imagem.'));
      leitor.readAsDataURL(arquivo);
    });
  }

  function carregarImagem(url) {
    return new Promise((resolver, rejeitar) => {
      const img = new Image();
      img.onload = () => resolver(img);
      img.onerror = () => rejeitar(new Error('Arquivo de imagem inválido.'));
      img.src = url;
    });
  }

  /**
   * Reduz a imagem e devolve o data URL final.
   *
   * O lado maior vai para 1080 e o menor acompanha na proporção, então
   * foto em pé e foto deitada sobrevivem sem distorcer.
   */
  async function reduzir(arquivo) {
    const original = await lerArquivo(arquivo);
    const img = await carregarImagem(original);

    const maior = Math.max(img.width, img.height);
    const escala = maior > LADO_MAXIMO ? LADO_MAXIMO / maior : 1;
    const largura = Math.round(img.width * escala);
    const altura = Math.round(img.height * escala);

    const tela = document.createElement('canvas');
    tela.width = largura;
    tela.height = altura;
    const pincel = tela.getContext('2d');
    pincel.drawImage(img, 0, 0, largura, altura);

    let saida = tela.toDataURL('image/jpeg', QUALIDADE);

    // Ainda pesada: mais um degrau de compressão antes de desistir.
    if (saida.length > BYTES_MAXIMOS) {
      saida = tela.toDataURL('image/jpeg', 0.6);
    }

    return { url: saida, largura: largura, altura: altura, bytes: saida.length };
  }

  /**
   * Caminho completo: escolher, reduzir e devolver.
   * { ok, foto } ou { ok: false, motivo } — inclusive quando a pessoa
   * simplesmente fechou o seletor, que não é erro e não merece alarde.
   */
  async function capturar(camera) {
    const arquivo = await escolher(camera);
    if (!arquivo) return { ok: false, cancelado: true };

    if (!/^image\//.test(arquivo.type)) {
      return { ok: false, motivo: 'Escolha um arquivo de imagem.' };
    }

    try {
      const foto = await reduzir(arquivo);
      return { ok: true, foto: foto };
    } catch (erro) {
      return { ok: false, motivo: 'Não foi possível preparar esta imagem.' };
    }
  }

  /** Quanto a foto ocupa, em texto legível. */
  function tamanhoLegivel(bytes) {
    if (!bytes) return '';
    const kb = Math.round(bytes / 1024);
    return kb >= 1024 ? (kb / 1024).toFixed(1) + ' MB' : kb + ' KB';
  }

  return { capturar, reduzir, tamanhoLegivel, LADO_MAXIMO };
})();
