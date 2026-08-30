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

  /** Um treino do dia: cabeçalho colorido e os exercícios executados. */
  function blocoDoTreino(registro) {
    const tipo = Dados.tipoPorId(registro.tipoId);
    const feitos = registro.exercicios.map(Dados.exercicioGlobal).filter(Boolean);

    return `
      <div class="dia__treino" style="background:${tipo ? tipo.cor : '#FFD23F'}; color:${tipo ? tipo.tinta : '#12101A'}">
        <span class="dia__icone">${Icones.musculo(registro.tipoId)}</span>
        <span class="dia__dados">
          <span class="dia__nome">${tipo ? tipo.nome : 'Treino'}</span>
          <span class="dia__resumo">${feitos.length} exercícios · ${registro.duracao} min</span>
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
      </ul>`;
  }

  function folhaDoDia(dataIso, fecharAtributo) {
    const doDia = Dados.registrosDe(dataIso);
    if (!doDia.length) return '';

    const primeiro = Dados.tipoPorId(doDia[0].tipoId);
    const data = new Date(dataIso + 'T00:00:00');
    const fechar = fecharAtributo || 'data-fechar-dia';
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
        </div>
      </div>`;
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

    Dados.registrarTreino(tipoId, feitos.map((e) => e.id), minutos, fichas);
    Execucao.limpar();

    Router.ir('dashboard', {
      registrado: { nome: tipo ? tipo.nome : 'Treino', minutos: minutos, series: series }
    });
  }

  return { topo, folhaDoDia, encerrarTreino };

})();
