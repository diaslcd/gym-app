/* Demonstração visual da execução.
   Componente com encaixe de mídia: hoje mostra o pictograma animado,
   e passa a mostrar foto, GIF ou vídeo assim que houver arquivo — sem
   mudar nada na tela de detalhes.

   Para trocar a mídia de um exercício, basta registrar aqui:
     Demonstracao.definir('supino-reto', { tipo: 'imagem', src: 'assets/midia/supino-reto.webp' });
     Demonstracao.definir('agachamento', { tipo: 'video',  src: 'assets/midia/agachamento.mp4' });
   A chave é o id do exercício; sem registro, cai no pictograma. */
const Demonstracao = (() => {
  const midias = {};

  function definir(exercicioId, midia) {
    midias[exercicioId] = midia;
  }

  /** Bloco visual da execução do exercício. */
  function render(exercicio) {
    const midia = midias[exercicio.id];

    if (midia && midia.tipo === 'imagem') {
      return `<img class="demo__midia" src="${midia.src}" alt="Execução de ${exercicio.nome}">`;
    }

    if (midia && midia.tipo === 'video') {
      return `<video class="demo__midia" src="${midia.src}" autoplay loop muted playsinline
                     aria-label="Execução de ${exercicio.nome}"></video>`;
    }

    // Sem mídia registrada: pictograma do movimento, com o traço do
    // percurso pulsando para indicar a direção do esforço.
    return `<span class="demo__pictograma">${IconesExercicios.porId(exercicio.id)}</span>`;
  }

  return { render, definir };
})();
