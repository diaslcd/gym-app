/* Perfil de quem usa o app.

   IMPORTANTE: isto não é autenticação. O app não tem servidor — nome e
   PIN ficam no localStorage do próprio aparelho, em texto puro. Serve
   para o app saber quem está treinando e para uma trava casual contra
   quem pega o celular na mão; não protege dado nenhum de verdade.
   Trocar por login real é substituir só este módulo. */
const Perfil = (() => {
  const CHAVE = 'gym:perfil';

  let dono = null;      // { nome, pin, desde }
  let liberado = false; // passou pela tela de entrada nesta sessão

  function carregar() {
    try {
      const bruto = localStorage.getItem(CHAVE);
      return bruto ? JSON.parse(bruto) : null;
    } catch (erro) {
      return null;
    }
  }

  function guardar() {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(dono));
    } catch (erro) {
      // Sem storage: o perfil vale só enquanto o app estiver aberto.
    }
  }

  dono = carregar();
  // Perfil sem PIN não tem o que conferir: entra direto.
  liberado = !!(dono && !dono.pin);

  function existe() {
    return !!dono;
  }

  function nome() {
    return dono ? dono.nome : '';
  }

  function temPin() {
    return !!(dono && dono.pin);
  }

  function dentro() {
    return liberado;
  }

  /** Cria o perfil na primeira vez. O PIN é opcional. */
  function criar(nomeNovo, pin) {
    dono = {
      nome: nomeNovo.trim().slice(0, 24),
      pin: pin || '',
      desde: Utils.iso(Utils.hoje())
    };
    liberado = true;
    guardar();
  }

  /** Confere o PIN de quem já tem perfil. */
  function entrar(pin) {
    if (!dono) return false;
    if (dono.pin && dono.pin !== pin) return false;
    liberado = true;
    return true;
  }

  /** Fecha a sessão sem apagar o perfil: volta a pedir o PIN. */
  function sair() {
    liberado = false;
  }

  /** Apaga o perfil. O histórico de treinos não é tocado. */
  function esquecer() {
    dono = null;
    liberado = false;
    try {
      localStorage.removeItem(CHAVE);
    } catch (erro) {
      // Nada a fazer: já saiu da memória.
    }
  }

  return { existe, nome, temPin, dentro, criar, entrar, sair, esquecer };
})();
