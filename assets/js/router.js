/* Navegação entre telas: cada view recebe um container novo,
   então listeners antigos morrem junto com o nó anterior.

   Cada tela também vira uma entrada no histórico do navegador. É o que
   faz o botão voltar do Android andar para trás dentro do app em vez de
   fechá-lo — sem isso o app é uma página só, e o sistema entende que
   voltar significa sair. No painel, que é a primeira entrada, voltar
   sai do app, que é o esperado. */
const Router = (() => {
  const telas = {};
  let raiz = null;
  let atual = null;

  function registrar(nome, view) {
    telas[nome] = view;
  }

  /* As duas telas convivem enquanto a troca acontece: a que sai desliza
     para um lado, a que entra chega do outro. Animar só a que entra não
     lê como transição — o olho vê a antiga sumir de uma vez. */
  const DURACAO = 260;

  /* Por que a animação é feita aqui e não só no CSS.

     Com `animation` no CSS, o primeiro quadro vira o estado do elemento
     assim que a classe entra. Se a animação não avança — e ela não
     avança sempre: aba em segundo plano, janela sem foco, aparelho
     economizando bateria, navegador embutido que não compõe quadros —
     a tela nova fica presa no quadro inicial, que é `opacity: 0`. Ou
     seja: a tela que deveria aparecer some, e a antiga, que já devia ter
     saído, é a única visível. O app parece travado.

     Com a Web Animations API o elemento não tem estado preso: sem
     `fill`, ele usa o CSS normal antes e depois da animação. Se algo der
     errado, basta cancelar e ele volta a ser o que é — visível, no
     lugar. O pior caso passa a ser "trocou sem animação", que é apenas
     menos bonito, em vez de "tela em branco com resto da anterior". */
  const CURVA = 'cubic-bezier(0.05, 0.7, 0.1, 1)';

  const ENTRADAS = {
    // Hierarquia: desliza do lado de onde se veio.
    Avanca: [{ transform: 'translateX(38px)' }, { transform: 'translateX(0)' }],
    Volta:  [{ transform: 'translateX(-38px)' }, { transform: 'translateX(0)' }],
    // Aba: troca de plano, sem lado. Vem de trás e assume.
    Aba:    [{ opacity: 0, transform: 'scale(0.96)' },
             { opacity: 1, offset: 0.4 },
             { opacity: 1, transform: 'scale(1)' }]
  };

  const SAIDAS = {
    Avanca: [{ transform: 'translateX(0)', opacity: 1 }, { transform: 'translateX(-18px)', opacity: 0.6 }],
    Volta:  [{ transform: 'translateX(0)', opacity: 1 }, { transform: 'translateX(18px)', opacity: 0.6 }],
    Aba:    [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(1.02)' }]
  };

  /** Roda a animação e garante que ela não deixe o elemento preso. */
  function animar(no, quadros, duracao, aoFim) {
    let encerrado = false;
    const encerrar = () => {
      if (encerrado) return;
      encerrado = true;
      if (aoFim) aoFim();
    };

    let anim;
    try {
      anim = no.animate(quadros, { duration: duracao, easing: CURVA });
    } catch (erro) {
      // Navegador sem a API: troca seca, e tudo segue funcionando.
      encerrar();
      return;
    }

    anim.addEventListener('finish', encerrar);
    anim.addEventListener('cancel', encerrar);

    /* Rede de segurança. Se a animação não andar, este relógio corta o
       efeito e devolve o elemento ao estado normal. O tempo é generoso
       de propósito: em página em segundo plano o próprio relógio atrasa,
       e cortar cedo demais estragaria a animação de quem está vendo. */
    setTimeout(() => {
      if (anim.playState !== 'finished') anim.cancel();
      encerrar();
    }, duracao + 400);
  }

  function querMenosMovimento() {
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (erro) {
      return false;
    }
  }

  /* Três movimentos, porque são três relações diferentes entre telas.

     Avançar e voltar deslizam para os lados: há hierarquia, e o lado
     diz de onde se veio. Trocar de aba não tem lado — as três áreas são
     irmãs, nenhuma está "depois" da outra — e deslizar sugeriria uma
     ordem que não existe. Ali o movimento é de troca de plano: a que
     sai recua e some, a que entra vem de trás e assume. */
  function pintar(nome, params, sentido) {
    // A tela que sai deixa de receber o tique do cronômetro.
    if (typeof Sessao !== 'undefined') Sessao.observar(null);

    atual = nome;
    const lado = sentido === 'aba' ? 'Aba' : (sentido === 'volta' ? 'Volta' : 'Avanca');

    // Toque rápido pode pedir a próxima troca antes de a anterior
    // terminar. A tela que já estava saindo some agora: no máximo duas
    // convivem, a atual e a que sai.
    raiz.querySelectorAll('.tela--saindo').forEach((velha) => velha.remove());

    const anterior = raiz.lastElementChild;
    const comMovimento = !querMenosMovimento();

    const tela = document.createElement('div');
    // A tela nasce pronta: opaca, no lugar e por cima. A animação é
    // aplicada depois, por cima desse estado, e some ao terminar.
    tela.className = 'tela tela--nova';

    if (anterior) {
      if (comMovimento) {
        /* A que sai é tirada do fluxo de toque e some ao fim do
           movimento. Mantém as classes que a view pôs — tirar .arcade
           agora apagaria o visual dela no meio da transição. */
        anterior.classList.add('tela--saindo');
        animar(anterior, SAIDAS[lado], DURACAO, () => anterior.remove());
      } else {
        anterior.remove();
      }
    }

    raiz.appendChild(tela);
    telas[nome].montar(tela, params);
    window.scrollTo(0, 0);

    // A animação entra depois de a view montar: animar um container
    // vazio e encher depois faz o conteúdo aparecer de supetão no meio
    // do movimento.
    if (comMovimento) animar(tela, ENTRADAS[lado], DURACAO);

    // A barra de abas fica fora da tela e não é repintada por ela:
    // avisamos aqui, no único ponto por onde toda troca passa.
    if (typeof Abas !== 'undefined') Abas.atualizar(nome);
  }

  /** `sentido` é opcional: 'avanca' (padrão), 'volta' ou 'aba'. */
  function ir(nome, params, sentido) {
    try {
      history.pushState({ tela: nome, params: params || null }, '');
    } catch (erro) {
      // Sem history disponível: navega mesmo assim, só sem o voltar.
    }
    pintar(nome, params, sentido || 'avanca');
  }

  /** Voltar do sistema: repinta o que estiver na entrada anterior. */
  function aoVoltar(evento) {
    const estado = evento.state;
    if (!estado || !telas[estado.tela]) return;
    pintar(estado.tela, estado.params || undefined, 'volta');
  }

  function iniciar(elemento, telaInicial) {
    raiz = elemento;
    try {
      history.replaceState({ tela: telaInicial, params: null }, '');
    } catch (erro) {
      // Idem: o app funciona, só sem integração com o voltar.
    }
    window.addEventListener('popstate', aoVoltar);
    pintar(telaInicial);
  }

  /** Tela visível agora, para quem precisa decidir com base nela. */
  function telaAtual() {
    return atual;
  }

  return { registrar, ir, iniciar, telaAtual };
})();
