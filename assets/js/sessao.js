/* Treino em andamento: cronômetro do início até encerrar.
   Um único relógio para o app inteiro, que só roda enquanto há
   treino aberto — a view atual se inscreve para receber o tique.
   O início fica no localStorage, então recarregar não perde o treino. */
const Sessao = (() => {
  const CHAVE = 'gym:sessao';
  const LIMITE_HORAS = 6; // sessão esquecida aberta é descartada

  let atual = null;    // { tipoId, inicio }
  let ouvinte = null;  // callback da view visível
  let relogio = null;

  /* ── Persistência ────────────────────────────────────── */

  function guardar() {
    try {
      if (atual) localStorage.setItem(CHAVE, JSON.stringify(atual));
      else localStorage.removeItem(CHAVE);
    } catch (erro) {
      // Navegação privada ou storage bloqueado: segue sem persistir.
    }
  }

  function recuperar() {
    try {
      const bruto = localStorage.getItem(CHAVE);
      if (!bruto) return null;
      const salvo = JSON.parse(bruto);
      if (!salvo || !salvo.tipoId || !salvo.inicio) return null;
      // Treino que ficou aberto tempo demais não conta.
      const horas = (Date.now() - salvo.inicio) / 3600000;
      if (horas < 0 || horas > LIMITE_HORAS) return null;
      return salvo;
    } catch (erro) {
      return null;
    }
  }

  /* ── Relógio ─────────────────────────────────────────── */

  function decorrido() {
    return atual ? Math.floor((Date.now() - atual.inicio) / 1000) : 0;
  }

  function tique() {
    if (ouvinte) ouvinte(decorrido());
  }

  function ajustarRelogio() {
    if (atual && !relogio) relogio = setInterval(tique, 1000);
    if (!atual && relogio) {
      clearInterval(relogio);
      relogio = null;
    }
  }

  function iniciar(tipoId) {
    atual = { tipoId: tipoId, inicio: Date.now() };
    guardar();
    ajustarRelogio();
  }

  /** Encerra e devolve o que foi feito, ou null se não havia treino. */
  function encerrar() {
    if (!atual) return null;
    const resultado = { tipoId: atual.tipoId, segundos: decorrido() };
    atual = null;
    guardar();
    ajustarRelogio();
    return resultado;
  }

  function emAndamento() {
    return !!atual;
  }

  function tipoEmAndamento() {
    return atual ? atual.tipoId : null;
  }

  /** Só um ouvinte por vez: a view que está na tela. */
  function observar(callback) {
    ouvinte = callback;
  }

  /** Segundos em "MM:SS", ou "H:MM:SS" depois de uma hora. */
  function formatar(segundos) {
    const h = Math.floor(segundos / 3600);
    const m = Math.floor((segundos % 3600) / 60);
    const s = segundos % 60;
    const doisDigitos = (n) => String(n).padStart(2, '0');
    return h > 0
      ? `${h}:${doisDigitos(m)}:${doisDigitos(s)}`
      : `${doisDigitos(m)}:${doisDigitos(s)}`;
  }

  // Retoma um treino que estava aberto antes do recarregamento.
  atual = recuperar();
  ajustarRelogio();

  return {
    iniciar, encerrar, emAndamento, tipoEmAndamento,
    decorrido, observar, formatar
  };
})();
