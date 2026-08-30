/* Execução do treino: cada série com suas repetições e carga,
   observação e tempo de descanso por exercício. Fica no localStorage,
   então fechar o app no meio do treino não perde o que já foi feito. */
const Execucao = (() => {
  const CHAVE = 'gym:execucao';
  const SERIE_PADRAO = { reps: 10, carga: 0 };
  const DESCANSO_PADRAO = 90;
  const PASSO_DESCANSO = 15;
  const DESCANSO_MIN = 15;
  const DESCANSO_MAX = 300;

  let estado = null;

  /* ── Persistência ────────────────────────────────────── */

  function vazio() {
    return { tipoId: null, exercicios: {}, descansoAte: null };
  }

  function carregar() {
    try {
      const bruto = localStorage.getItem(CHAVE);
      const salvo = bruto ? JSON.parse(bruto) : null;
      return salvo && salvo.exercicios ? salvo : vazio();
    } catch (erro) {
      return vazio();
    }
  }

  function guardar() {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(estado));
    } catch (erro) {
      // Sem storage disponível: o treino segue só em memória.
    }
  }

  estado = carregar();

  /* ── Ficha do exercício ──────────────────────────────── */

  function novaSerie(anterior) {
    const base = anterior || SERIE_PADRAO;
    return { reps: base.reps, carga: base.carga, feita: false };
  }

  function fichaNova() {
    return {
      series: [novaSerie(), novaSerie(), novaSerie()],
      concluido: false,
      descanso: DESCANSO_PADRAO
    };
  }

  /** Fichas gravadas no formato antigo (série como número) viram lista. */
  function migrar(f) {
    if (Array.isArray(f.series)) return f;
    const total = typeof f.series === 'number' ? f.series : 3;
    const feitas = f.feitas || [];
    const series = [];
    for (let i = 0; i < total; i++) {
      series.push({
        reps: f.repeticoes || SERIE_PADRAO.reps,
        carga: f.carga || SERIE_PADRAO.carga,
        feita: feitas.indexOf(i) !== -1
      });
    }
    return {
      series: series,
      concluido: !!f.concluido,
      descanso: f.descanso || DESCANSO_PADRAO
    };
  }

  /** Ficha do exercício, criada na primeira vez com 3 × 10. */
  function ficha(tipoId, exercicioId) {
    if (estado.tipoId !== tipoId) {
      estado = vazio();
      estado.tipoId = tipoId;
    }
    if (!estado.exercicios[exercicioId]) {
      estado.exercicios[exercicioId] = fichaNova();
      guardar();
    } else {
      estado.exercicios[exercicioId] = migrar(estado.exercicios[exercicioId]);
    }
    return estado.exercicios[exercicioId];
  }

  /** Acrescenta ou tira uma série; a nova repete a anterior. */
  function ajustarSeries(tipoId, exercicioId, passo) {
    const f = ficha(tipoId, exercicioId);
    if (passo > 0) f.series.push(novaSerie(f.series[f.series.length - 1]));
    else if (f.series.length > 1) f.series.pop();
    guardar();
  }

  /** Muda reps ou carga de uma série específica. */
  function definirSerie(tipoId, exercicioId, indice, campo, valor) {
    const f = ficha(tipoId, exercicioId);
    if (!f.series[indice]) return;
    const minimo = campo === 'carga' ? 0 : 1;
    f.series[indice][campo] = Math.max(minimo, valor);
    guardar();
  }

  /** Marca ou desmarca uma série concluída. */
  function alternarSerie(tipoId, exercicioId, indice) {
    const f = ficha(tipoId, exercicioId);
    if (!f.series[indice]) return;
    f.series[indice].feita = !f.series[indice].feita;
    guardar();
  }

  function concluir(tipoId, exercicioId, valor) {
    ficha(tipoId, exercicioId).concluido = valor !== false;
    guardar();
  }

  /** O exercício chegou a ser aberto neste treino? */
  function temFicha(tipoId, exercicioId) {
    return !!(estado.tipoId === tipoId && estado.exercicios[exercicioId]);
  }

  function estaConcluido(tipoId, exercicioId) {
    return !!(estado.tipoId === tipoId &&
      estado.exercicios[exercicioId] &&
      estado.exercicios[exercicioId].concluido);
  }

  /* ── Descanso ────────────────────────────────────────── */

  /** Tempo de descanso escolhido para o exercício. */
  function descansoDe(tipoId, exercicioId) {
    return ficha(tipoId, exercicioId).descanso;
  }

  function ajustarDescanso(tipoId, exercicioId, passo) {
    const f = ficha(tipoId, exercicioId);
    const novo = f.descanso + passo * PASSO_DESCANSO;
    f.descanso = Math.min(DESCANSO_MAX, Math.max(DESCANSO_MIN, novo));
    guardar();
  }

  function iniciarDescanso(segundos) {
    estado.descansoAte = Date.now() + (segundos || DESCANSO_PADRAO) * 1000;
    guardar();
  }

  function pararDescanso() {
    estado.descansoAte = null;
    guardar();
  }

  /** Segundos que faltam, ou 0 quando não há descanso rodando. */
  function descansoRestante() {
    if (!estado.descansoAte) return 0;
    const falta = Math.ceil((estado.descansoAte - Date.now()) / 1000);
    if (falta <= 0) {
      estado.descansoAte = null;
      guardar();
      return 0;
    }
    return falta;
  }

  /* ── Resumo e encerramento ───────────────────────────── */

  /** O que foi efetivamente feito, para gravar no calendário. */
  function resumo(tipoId) {
    if (estado.tipoId !== tipoId) return { concluidos: [], series: 0 };
    const ids = Object.keys(estado.exercicios);
    return {
      concluidos: ids.filter((id) => estado.exercicios[id].concluido),
      series: ids.reduce((total, id) => {
        const f = migrar(estado.exercicios[id]);
        return total + f.series.filter((s) => s.feita).length;
      }, 0)
    };
  }

  function limpar() {
    estado = vazio();
    // Treino encerrado não deixa registro vazio ocupando espaço.
    try {
      localStorage.removeItem(CHAVE);
    } catch (erro) {
      guardar();
    }
  }

  return {
    ficha, temFicha, ajustarSeries, definirSerie, alternarSerie,
    concluir, estaConcluido,
    descansoDe, ajustarDescanso, iniciarDescanso, pararDescanso, descansoRestante,
    resumo, limpar
  };
})();
