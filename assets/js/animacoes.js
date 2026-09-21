/* Animação de cada exercício.

   Dois formatos, gerados no Gemini e preparados por
   scripts/preparar-animacoes.ps1:
     - quadros: 2 ou 3 poses do boneco (assets/exercicios/<id>-N.jpg).
       Alternando, parecem um GIF em stop motion — que casa com o boneco de
       massinha — e custam quase nada. É o que roda na lista.
     - vídeo: o movimento fluido do Veo (assets/exercicios/<id>.mp4). Só na
       tela do exercício: oito vídeos tocando juntos na lista pesariam no
       celular sem necessidade.

   O que existe é declarado em animacoes-lista.js, que o script reescreve.
   O app não pode listar pasta, e pedir arquivo que não existe para
   descobrir encheria o console de 404. Exercício sem registro continua
   com o pictograma de sempre: a animação chega aos poucos, sem quebrar. */
const Animacoes = (() => {
  const PASTA = 'assets/exercicios/';
  const lista = {};

  /* Mesmo movimento com outro nome no catálogo. Em vez de pedir quatro
     animações repetidas, estes usam a do exercício equivalente. */
  const REUSO = {
    'supino': 'supino-reto',
    'puxada': 'puxada-frontal',
    'rosca': 'rosca-direta',
    'triceps': 'triceps-pulley'
  };

  /** Chamado por animacoes-lista.js: { id: { quadros, video } }. */
  function registrar(mapa) {
    Object.assign(lista, mapa);
  }

  function de(id) {
    const alvo = lista[id] ? id : REUSO[id];
    return alvo && lista[alvo] ? Object.assign({ id: alvo }, lista[alvo]) : null;
  }

  function quadro(id, n) {
    return `${PASTA}${id}-${n}.jpg`;
  }

  /* Ordem de exibição dos quadros. Com 3, o arquivo -3 é a pose do meio
     (feita depois, no prompt 2b): a volta passa por ela de novo, senão o
     movimento pula da pose final direto para a inicial. */
  function sequencia(n) {
    if (n === 2) return [1, 2];
    if (n === 3) return [1, 3, 2, 3];
    const ida = [];
    for (let i = 1; i <= n; i++) ida.push(i);
    return ida;
  }

  function querMenosMovimento() {
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (erro) {
      return false;
    }
  }

  /* Quadros empilhados, cada um aceso na sua vez por CSS. Nada de timer em
     JavaScript: a animação para sozinha quando a tela sai, e o navegador
     pausa o que está fora da vista. */
  function empilhar(anim, classe, passo) {
    const seq = sequencia(anim.quadros);
    const imgs = seq.map((n, k) => `
      <img class="anim__q" src="${quadro(anim.id, n)}" alt="" loading="lazy" decoding="async"
           style="animation-delay:${(k * passo).toFixed(2)}s">`).join('');
    return `<span class="anim anim--${seq.length} ${classe}" style="--passo:${passo}s" aria-hidden="true">${imgs}</span>`;
  }

  /** Miniatura da lista: animada quando há quadros, senão o pictograma. */
  function miniatura(exercicio) {
    const anim = de(exercicio.id);
    if (!anim || !anim.quadros) return IconesExercicios.porId(exercicio.id);
    if (anim.quadros === 1) {
      return `<img class="anim__estatica" src="${quadro(anim.id, 1)}" alt="" loading="lazy">`;
    }
    return empilhar(anim, 'anim--mini', 0.55);
  }

  /** Imagem parada, para folhas de troca e acréscimo. */
  function estatica(exercicio) {
    const anim = de(exercicio.id);
    return anim && anim.quadros
      ? `<img class="anim__estatica" src="${quadro(anim.id, 1)}" alt="" loading="lazy">`
      : IconesExercicios.porId(exercicio.id);
  }

  /**
   * Palco da tela do exercício, ou null quando não há animação.
   * Vídeo quando existe; senão os quadros, maiores e mais lentos.
   */
  function palco(exercicio) {
    const anim = de(exercicio.id);
    if (!anim) return null;
    const nome = `Execução de ${exercicio.nome}`;

    /* Sem poster: as poses são quadradas e o vídeo não, e a capa trocaria
       de formato no instante em que o vídeo começa. Os arquivos são
       locais e pequenos — o primeiro quadro aparece quase na hora. */
    if (anim.video && !querMenosMovimento()) {
      return `<video class="anim__video" src="${PASTA}${anim.id}.mp4"
                     autoplay loop muted playsinline preload="auto" aria-label="${nome}"></video>`;
    }
    if (anim.quadros >= 2) {
      return `<span class="anim__palco" role="img" aria-label="${nome}">${empilhar(anim, 'anim--grande', 0.8)}</span>`;
    }
    if (anim.quadros === 1) {
      return `<img class="anim__video" src="${quadro(anim.id, 1)}" alt="${nome}">`;
    }
    return null;
  }

  return { registrar, de, miniatura, estatica, palco };
})();
