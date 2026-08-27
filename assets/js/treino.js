/* Ajustes do treino na sessão.
   O usuário adapta o treino do dia — remove o que não vai fazer, troca
   o que a academia não tem livre, acrescenta o que quiser. Nada aqui
   altera Dados.exercicios: o treino programado volta com restaurar(). */
const Treino = (() => {
  const CHAVE = 'gym:ajustes';

  function carregar() {
    try {
      const bruto = localStorage.getItem(CHAVE);
      return bruto ? JSON.parse(bruto) : {};
    } catch (erro) {
      return {};
    }
  }

  function guardar() {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(ajustes));
    } catch (erro) {
      // Sem storage: os ajustes valem só para esta sessão.
    }
  }

  const ajustes = carregar();

  function estado(tipoId) {
    if (!ajustes[tipoId]) ajustes[tipoId] = { removidos: [], trocas: {}, extras: [] };
    return ajustes[tipoId];
  }

  function comChave(exercicio, chave, origem) {
    return Object.assign({}, exercicio, { chave: chave, origem: origem || null });
  }

  /**
   * Lista do treino como está agora: ordem original preservada, sem os
   * removidos, com as trocas aplicadas na mesma posição e os extras no fim.
   * Cada item carrega `chave` (usada nas ações) e `origem` (o exercício
   * programado que ele substituiu, quando houve troca).
   */
  function lista(tipoId) {
    const { removidos, trocas, extras } = estado(tipoId);

    const programados = Dados.exerciciosDe(tipoId)
      .filter((exercicio) => removidos.indexOf(exercicio.id) === -1)
      .map((exercicio) => {
        const substituto = trocas[exercicio.id] && Dados.exercicioGlobal(trocas[exercicio.id]);
        return substituto
          ? comChave(substituto, exercicio.id, exercicio)
          : comChave(exercicio, exercicio.id);
      });

    const acrescentados = extras
      .filter((id) => removidos.indexOf(id) === -1)
      .map((id) => {
        const substituto = trocas[id] && Dados.exercicioGlobal(trocas[id]);
        const base = Dados.exercicioGlobal(id);
        if (!base) return null;
        return substituto
          ? comChave(substituto, id, base)
          : comChave(base, id);
      })
      .filter(Boolean);

    return programados.concat(acrescentados);
  }

  function remover(tipoId, chave) {
    const st = estado(tipoId);
    if (st.removidos.indexOf(chave) === -1) st.removidos.push(chave);
    guardar();
  }

  function devolver(tipoId, chave) {
    const st = estado(tipoId);
    st.removidos = st.removidos.filter((id) => id !== chave);
    guardar();
  }

  function acrescentar(tipoId, exercicioId) {
    const st = estado(tipoId);
    st.removidos = st.removidos.filter((id) => id !== exercicioId);
    if (st.extras.indexOf(exercicioId) === -1) st.extras.push(exercicioId);
    guardar();
  }

  function trocar(tipoId, chave, alternativaId) {
    estado(tipoId).trocas[chave] = alternativaId;
    guardar();
  }

  function desfazerTroca(tipoId, chave) {
    delete estado(tipoId).trocas[chave];
    guardar();
  }

  /** O treino foi adaptado em relação ao programado? */
  function ajustado(tipoId) {
    const st = estado(tipoId);
    return st.removidos.length > 0 ||
      st.extras.length > 0 ||
      Object.keys(st.trocas).length > 0;
  }

  function restaurar(tipoId) {
    delete ajustes[tipoId];
    guardar();
  }

  return {
    lista, remover, devolver, acrescentar, trocar, desfazerTroca,
    ajustado, restaurar
  };
})();
