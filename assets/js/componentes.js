/* Blocos de interface reaproveitados pelas telas. */
const Componentes = (() => {
  /** Barra superior com botão voltar, título e subtítulo opcional. */
  function topo(titulo, subtitulo) {
    return `
      <header class="topo">
        <button class="topo__voltar" data-voltar aria-label="Voltar">‹</button>
        <span class="topo__texto">
          <span class="topo__titulo">${titulo}</span>
          ${subtitulo ? `<span class="topo__sub">${subtitulo}</span>` : ''}
        </span>
      </header>`;
  }

  /** Uma série da ficha, para a folha de detalhes do treino. */
  function serieFeita(indice, s) {
    return `
      <li class="linhaSerie">
        <span class="linhaSerie__num">${indice + 1}</span>
        <span class="linhaSerie__valor">${s.reps} reps</span>
        <span class="linhaSerie__valor">${s.carga} kg</span>
        ${s.feita === false ? '<span class="linhaSerie__pulada">pulada</span>' : ''}
      </li>`;
  }

  /* Índice do treino que está esperando confirmação para ser apagado.
     Apagar é a única ação irreversível do app, então ela pede dois
     toques — e o segundo diz o que vai sumir. */
  let aConfirmar = null;

  /** Rodapé do treino: excluir, ou a confirmação já aberta. */
  function acaoDeExcluir(registro, indice) {
    const tipo = Dados.tipoPorId(registro.tipoId);
    const nome = tipo ? tipo.nome : 'este treino';

    if (aConfirmar !== indice) {
      return `
        <button class="dia__excluir" data-excluir="${indice}" type="button">
          Excluir este treino
        </button>`;
    }

    return `
      <div class="dia__confirma">
        <p class="dia__confirmaTexto">
          Apagar <strong>${nome}</strong> e as séries registradas nele? Não dá para desfazer.
        </p>
        <div class="dia__confirmaBotoes">
          <button class="dia__cancelar" data-cancelar-excluir type="button">Manter</button>
          <button class="dia__apagar" data-confirmar-excluir="${indice}" type="button">Apagar</button>
        </div>
      </div>`;
  }

  /** Um treino do dia: cabeçalho colorido e os exercícios executados. */
  function blocoDoTreino(registro, indice) {
    const tipo = Dados.tipoPorId(registro.tipoId);
    const feitos = registro.exercicios.map(Dados.exercicioGlobal).filter(Boolean);

    return `
      <div class="dia__treino" style="background:${tipo ? tipo.cor : '#FFD23F'}; color:${tipo ? tipo.tinta : '#12101A'}">
        <span class="dia__icone">${Icones.musculo(registro.tipoId)}</span>
        <span class="dia__dados">
          <span class="dia__nome">${tipo ? tipo.nome : 'Treino'}</span>
          <span class="dia__resumo">${feitos.length} exercícios · ${registro.duracao} min${registro.anotado ? ' · anotado depois' : ''}</span>
        </span>
      </div>

      <ul class="dia__exercicios">
        ${feitos.map((e) => {
          const ficha = registro.fichas && registro.fichas[e.id];
          const series = (ficha && ficha.series) || [];
          return `
            <li class="dia__ex">
              <div class="dia__exTopo">
                <span class="dia__exImg">${IconesExercicios.porId(e.id)}</span>
                <span class="dia__exTexto">
                  <span class="dia__exNome">${e.nome}</span>
                  <span class="dia__exMeta">${e.grupo} · ${e.equipamento}</span>
                </span>
              </div>
              ${series.length ? `<ul class="dia__series">${series.map((s, i) => serieFeita(i, s)).join('')}</ul>` : ''}
            </li>`;
        }).join('')}
      </ul>

      ${acaoDeExcluir(registro, indice)}`;
  }

  /* Botão de anotar treino naquele dia. Só aparece em data que aceita
     registro — nem futuro, nem além da janela de um ano. */
  function botaoDeAnotar(dataIso, texto) {
    if (!Dados.dataPermitida(dataIso)) return '';
    return `
      <button class="dia__anotar" data-anotar-dia="${dataIso}" type="button">
        <span aria-hidden="true">＋</span> ${texto}
      </button>`;
  }

  function folhaDoDia(dataIso, fecharAtributo) {
    const doDia = Dados.registrosDe(dataIso);
    const data = new Date(dataIso + 'T00:00:00');
    const fechar = fecharAtributo || 'data-fechar-dia';

    /* Dia sem treino: a folha explica e oferece o registro. Abrir direto
       o formulário a partir de um toque no calendário seria agressivo —
       o dedo passa por dia vazio sem querer, e cair num formulário sem
       saber por quê confunde mais do que ajuda. */
    if (!doDia.length) {
      if (!Dados.dataPermitida(dataIso)) return '';
      return `
        <div class="folha">
          <div class="folha__fundo" ${fechar}></div>
          <div class="folha__painel">
            <div class="folha__topo">
              <span class="folha__titulo">${Utils.dataPorExtenso(data)}</span>
              <button class="folha__fechar" ${fechar} aria-label="Fechar">✕</button>
            </div>
            <p class="dia__vazio">
              Nenhum treino registrado neste dia. Se você treinou e esqueceu de
              marcar, dá para anotar agora — ele entra no calendário e na sequência.
            </p>
            ${botaoDeAnotar(dataIso, 'Registrar treino deste dia')}
          </div>
        </div>`;
    }

    const primeiro = Dados.tipoPorId(doDia[0].tipoId);
    // Dois treinos no mesmo dia aparecem um embaixo do outro, na ordem
    // em que foram feitos.
    const quantos = doDia.length > 1 ? `<p class="dia__quantos">${doDia.length} treinos neste dia</p>` : '';

    return `
      <div class="folha">
        <div class="folha__fundo" ${fechar}></div>
        <div class="folha__painel" style="--cor:${primeiro ? primeiro.cor : '#FFD23F'}">
          <div class="folha__topo">
            <span class="folha__titulo">${Utils.dataPorExtenso(data)}</span>
            <button class="folha__fechar" ${fechar} aria-label="Fechar">✕</button>
          </div>
          ${quantos}
          ${doDia.map(blocoDoTreino).join('')}
          ${botaoDeAnotar(dataIso, 'Anotar outro treino neste dia')}
        </div>
      </div>`;
  }


  /**
   * Cliques da folha do dia, num lugar só — painel e histórico abrem a
   * mesma folha. Devolve o que a view deve fazer: 'fechar' quando o dia
   * acabou ou o usuário fechou, 'repintar' quando só mudou o conteúdo,
   * 'saiu' quando o clique levou a outra tela, e null quando o clique
   * não era daqui.
   */
  function cliqueNaFolha(evento, dataIso) {
    const alvo = (seletor) => evento.target.closest(seletor);

    if (alvo('[data-fechar-dia]')) {
      aConfirmar = null;
      return 'fechar';
    }

    const anotar = alvo('[data-anotar-dia]');
    if (anotar) {
      aConfirmar = null;
      Router.ir('registrar', { data: anotar.dataset.anotarDia });
      return 'saiu';
    }

    const pedir = alvo('[data-excluir]');
    if (pedir) {
      aConfirmar = Number(pedir.dataset.excluir);
      return 'repintar';
    }

    if (alvo('[data-cancelar-excluir]')) {
      aConfirmar = null;
      return 'repintar';
    }

    const confirmar = alvo('[data-confirmar-excluir]');
    if (confirmar) {
      Dados.removerTreino(dataIso, Number(confirmar.dataset.confirmarExcluir));
      aConfirmar = null;
      // Some a folha quando o dia ficou sem treino nenhum.
      return Dados.registrosDe(dataIso).length ? 'repintar' : 'fechar';
    }

    return null;
  }

  /** Zera a confirmação pendente ao abrir outro dia. */
  function abrirFolha() {
    aConfirmar = null;
  }
  /**
   * Encerra o treino em andamento: grava no calendário, limpa a
   * execução e leva ao painel com a confirmação. Usado pela lista de
   * exercícios e pela tela de detalhes.
   */
  function encerrarTreino(tipoId) {
    const feito = Sessao.encerrar();
    const tipo = Dados.tipoPorId(tipoId);
    const minutos = feito ? Math.max(1, Math.round(feito.segundos / 60)) : 1;
    const series = Execucao.resumo(tipoId).series;

    // Só entra no registro o exercício que foi aberto durante o treino:
    // o que ficou intocado não foi feito e não deve virar histórico.
    const feitos = Treino.lista(tipoId)
      .filter((exercicio) => Execucao.temFicha(tipoId, exercicio.id));

    const fichas = {};
    feitos.forEach((exercicio) => {
      const f = Execucao.ficha(tipoId, exercicio.id);
      fichas[exercicio.id] = {
        series: f.series.map((s) => ({ reps: s.reps, carga: s.carga, feita: s.feita }))
      };
    });

    /* Recorde tem de ser apurado agora, antes de gravar: um instante
       depois o treino de hoje já faz parte do histórico e passaria a
       ser o próprio recorde a superar. */
    const bateuRecorde = feitos.some((exercicio) => {
      const cargaDeHoje = (fichas[exercicio.id].series || [])
        .reduce((maior, s) => Math.max(maior, s.carga || 0), 0);
      if (cargaDeHoje <= 0) return false;
      const anterior = Dados.evolucaoDe(exercicio.id)
        .reduce((maior, p) => Math.max(maior, p.carga || 0), 0);
      return cargaDeHoje > anterior;
    });

    Dados.registrarTreino(tipoId, feitos.map((e) => e.id), minutos, fichas);
    Execucao.limpar();

    /* O treino vira atividade da área Social, com pontos. O registro no
       calendário acima é independente disto: se a pontuação for negada
       pelas regras de fair play, o treino continua no histórico — o que
       muda é só quanto ele vale. */
    const registro = SocialDados.registrarTreino({
      titulo: tipo ? tipo.nome : 'Treino',
      tipoId: tipoId,
      minutos: minutos,
      series: series,
      // Bônus de sequência conta só dias treinados no app: anotar dias
      // para trás preenche o calendário, mas não engorda os pontos.
      sequencia: Utils.sequenciaAtual(Dados.treinosValidos()),
      recorde: bateuRecorde
    });

    const novasConquistas = SocialDados.conferirConquistas();

    Router.ir('dashboard', {
      registrado: {
        nome: tipo ? tipo.nome : 'Treino',
        minutos: minutos,
        series: series,
        atividadeId: registro.atividade.id,
        pontos: registro.atividade.pontos,
        conta: registro.conta,
        semPontos: registro.permissao.pode ? null : registro.permissao.motivo,
        conquistas: novasConquistas
      }
    });
  }

  return { topo, folhaDoDia, cliqueNaFolha, abrirFolha, encerrarTreino };

})();
