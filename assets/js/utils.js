/* Funções utilitárias de data, compartilhadas pelo app. */
const Utils = (() => {
  const MS_DIA = 86400000;

  // Descansar faz parte: faltar 1 ou 2 dias na semana não quebra a
  // sequência. A partir de 3 faltas na mesma semana, ela quebra.
  const FALTAS_PARA_QUEBRAR = 3;

  /** Data no formato 'AAAA-MM-DD' (fuso local). */
  function iso(data) {
    const m = String(data.getMonth() + 1).padStart(2, '0');
    const d = String(data.getDate()).padStart(2, '0');
    return `${data.getFullYear()}-${m}-${d}`;
  }

  /** Hoje, zerado à meia-noite. */
  function hoje() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  /** Nova data deslocada em N dias. */
  function somarDias(data, dias) {
    return new Date(data.getTime() + dias * MS_DIA);
  }

  /** Ex.: "terça-feira, 18 de agosto" */
  function dataPorExtenso(data) {
    return data.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  }

  /** Ex.: "agosto de 2026" */
  function mesAno(data) {
    return data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }

  /* ── Semanas ──────────────────────────────────────────── */

  /** Domingo que abre a semana da data. */
  function inicioDaSemana(data) {
    return somarDias(data, -data.getDay());
  }

  /** Faltas entre os dias já decorridos daquela semana. */
  function faltasNaSemana(diasTreinados, domingo, limite) {
    let faltas = 0;
    for (let i = 0; i < 7; i++) {
      const dia = somarDias(domingo, i);
      if (dia > limite) break;
      if (!diasTreinados.has(iso(dia))) faltas++;
    }
    return faltas;
  }

  /** A semana sustenta a sequência? (menos de 3 faltas) */
  function semanaSustenta(diasTreinados, data, limite) {
    const fim = limite || hoje();
    return faltasNaSemana(diasTreinados, inicioDaSemana(data), fim) < FALTAS_PARA_QUEBRAR;
  }

  /** Primeiro treino da semana, ou null. */
  function primeiroTreino(diasTreinados, domingo, limite) {
    for (let i = 0; i < 7; i++) {
      const dia = somarDias(domingo, i);
      if (dia > limite) break;
      if (diasTreinados.has(iso(dia))) return dia;
    }
    return null;
  }

  /** Último treino da semana, ou null. */
  function ultimoTreino(diasTreinados, domingo, limite) {
    let achado = null;
    for (let i = 0; i < 7; i++) {
      const dia = somarDias(domingo, i);
      if (dia > limite) break;
      if (diasTreinados.has(iso(dia))) achado = dia;
    }
    return achado;
  }

  /* ── Sequência ────────────────────────────────────────── */

  /**
   * Conjunto de datas cobertas pela sequência atual — do primeiro treino
   * da semana mais antiga que ainda sustenta até hoje, dias de descanso
   * incluídos.
   */
  function diasDaSequenciaAtual(diasTreinados) {
    const limite = hoje();
    const dias = new Set();
    let domingo = inicioDaSemana(limite);

    if (!semanaSustenta(diasTreinados, domingo, limite)) return dias;

    // Recua enquanto a semana anterior também sustentar.
    while (semanaSustenta(diasTreinados, somarDias(domingo, -7), limite)) {
      domingo = somarDias(domingo, -7);
    }

    const inicio = primeiroTreino(diasTreinados, domingo, limite);
    if (!inicio) return dias;

    for (let dia = inicio; dia <= limite; dia = somarDias(dia, 1)) {
      dias.add(iso(dia));
    }
    return dias;
  }

  /** Tamanho da sequência atual, em dias. */
  function sequenciaAtual(diasTreinados) {
    return diasDaSequenciaAtual(diasTreinados).size;
  }

  /** Maior sequência já alcançada, em dias, pela mesma regra. */
  function maiorSequencia(diasTreinados) {
    const ordenados = Array.from(diasTreinados.keys()).sort();
    if (!ordenados.length) return 0;

    const limite = hoje();
    let domingo = inicioDaSemana(new Date(ordenados[0] + 'T00:00:00'));
    let melhor = 0;
    let inicio = null;
    let fim = null;

    function fechar() {
      if (inicio && fim) {
        const total = Math.round((fim - inicio) / MS_DIA) + 1;
        if (total > melhor) melhor = total;
      }
      inicio = null;
      fim = null;
    }

    while (domingo <= limite) {
      if (semanaSustenta(diasTreinados, domingo, limite)) {
        const primeiro = primeiroTreino(diasTreinados, domingo, limite);
        if (primeiro) {
          if (!inicio) inicio = primeiro;
          fim = ultimoTreino(diasTreinados, domingo, limite);
        }
      } else {
        fechar();
      }
      domingo = somarDias(domingo, 7);
    }
    fechar();

    return melhor;
  }

  return {
    iso, hoje, somarDias, dataPorExtenso, mesAno,
    semanaSustenta, diasDaSequenciaAtual, sequenciaAtual, maiorSequencia
  };
})();
