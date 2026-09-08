/* Entrada por biometria, usando o autenticador do próprio aparelho.

   COMO FUNCIONA
   Usa WebAuthn, a API de autenticação do navegador. Quando pedimos uma
   credencial de plataforma, quem conversa com o sensor é o sistema
   operacional: o Android abre o diálogo de digital, o iOS abre o Face
   ID. O app não vê a digital, não recebe imagem, não guarda nada
   biométrico — recebe só um "deu certo" e um identificador público da
   credencial. A impressão digital nunca sai do enclave seguro do
   aparelho, que é exatamente o que se quer.

   POR QUE WebAuthn E NÃO UM PLUGIN
   O projeto é sem dependências e sem build por decisão de arquitetura
   (ver README). WebAuthn é API nativa do navegador e do WebView, então
   funciona no site publicado e no APK sem acrescentar nada ao pacote
   nem tocar no Capacitor.

   ATÉ ONDE ISSO PROTEGE — leia antes de confiar
   O app não tem servidor, e sem servidor não há quem confira a
   assinatura que o autenticador devolve. Ou seja: a biometria aqui vale
   como tranca da porta, no mesmo nível do PIN que já existia — segura
   contra quem pega o celular na mão, não contra quem tem acesso ao
   armazenamento do aparelho e sabe editá-lo. O dado de treino continua
   em texto puro no localStorage, como sempre esteve.

   Isso não é limitação do WebAuthn: é consequência de não haver
   back-end. No dia em que existir um, a mesma credencial passa a ser
   verificada de verdade e esta trava vira autenticação real — só o
   miolo deste módulo muda. */
const Biometria = (() => {
  const CHAVE = 'gym:biometria';

  /* Guardamos apenas o id público da credencial. Ele não é segredo:
     serve para dizer ao sistema qual chave usar na hora de pedir a
     digital, e sozinho não abre nada. */
  let registro = null;   // { id: base64url, nome, desde }

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
      if (registro) localStorage.setItem(CHAVE, JSON.stringify(registro));
      else localStorage.removeItem(CHAVE);
    } catch (erro) {
      // Sem storage não há como lembrar entre aberturas; segue com PIN.
    }
  }

  registro = carregar();

  /* ── Conversões ──────────────────────────────────────── */

  function paraBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let texto = '';
    for (let i = 0; i < bytes.length; i++) texto += String.fromCharCode(bytes[i]);
    return btoa(texto).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function paraBytes(base64) {
    const normal = base64.replace(/-/g, '+').replace(/_/g, '/');
    const texto = atob(normal);
    const bytes = new Uint8Array(texto.length);
    for (let i = 0; i < texto.length; i++) bytes[i] = texto.charCodeAt(i);
    return bytes;
  }

  function aleatorio(tamanho) {
    const bytes = new Uint8Array(tamanho);
    crypto.getRandomValues(bytes);
    return bytes;
  }

  /* ── Disponibilidade ─────────────────────────────────── */

  /* Existe a API? Exige contexto seguro — https ou localhost. No APK o
     WebView atende; num servidor http comum, não, e aí a opção nem
     aparece em vez de aparecer quebrada. */
  function suportado() {
    return typeof window.PublicKeyCredential === 'function' &&
           !!(navigator.credentials && navigator.credentials.create);
  }

  /* O aparelho tem sensor configurado? Um celular sem digital
     cadastrada responde não, e é por isso que a checagem é assíncrona:
     quem responde é o sistema, não o navegador. */
  async function disponivel() {
    if (!suportado()) return false;
    try {
      if (!PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) return false;
      return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    } catch (erro) {
      return false;
    }
  }

  function ativa() {
    return !!registro;
  }

  function nomeRegistrado() {
    return registro ? registro.nome : '';
  }

  /* ── Erros ───────────────────────────────────────────── */

  /* Traduz o erro do WebAuthn para uma frase que diga o que fazer.
     Cancelar e falhar na leitura chegam os dois como NotAllowedError —
     o navegador não distingue de propósito, para não contar a um site
     quantas vezes a digital foi recusada. Por isso a mensagem cobre os
     dois casos sem acusar nenhum. */
  function explicar(erro) {
    const nome = erro && erro.name;
    if (nome === 'NotAllowedError') return 'Não deu para confirmar. Use seu PIN ou tente de novo.';
    if (nome === 'InvalidStateError') return 'Este aparelho já tem uma entrada cadastrada para o BunnyGym.';
    if (nome === 'NotSupportedError') return 'Este aparelho não oferece esse tipo de biometria.';
    if (nome === 'SecurityError') return 'A biometria só funciona em conexão segura (https).';
    if (nome === 'AbortError') return 'A confirmação demorou demais e foi cancelada.';
    return 'Não foi possível usar a biometria agora. Use seu PIN.';
  }

  /* ── Ativar ──────────────────────────────────────────── */

  /**
   * Cadastra a biometria deste aparelho para o perfil atual.
   * Devolve { ok: true } ou { ok: false, motivo: 'texto legível' }.
   */
  async function ativar(nomeDoDono) {
    if (!(await disponivel())) {
      return { ok: false, motivo: 'Este aparelho não tem biometria configurada.' };
    }

    try {
      /* O challenge existe para o servidor conferir depois. Sem
         servidor ele não é verificado, mas continua sendo gerado ao
         acaso: é o que o protocolo espera, e o dia em que houver
         back-end nada aqui precisa mudar. */
      const credencial = await navigator.credentials.create({
        publicKey: {
          challenge: aleatorio(32),
          // Sem rp.id: o navegador usa a origem atual, o que evita
          // errar o domínio entre o site publicado e o APK.
          rp: { name: 'BunnyGym' },
          user: {
            id: aleatorio(16),
            name: nomeDoDono || 'usuário',
            displayName: nomeDoDono || 'usuário'
          },
          // ES256 e RS256: o que os autenticadores de celular usam.
          pubKeyCredParams: [
            { type: 'public-key', alg: -7 },
            { type: 'public-key', alg: -257 }
          ],
          authenticatorSelection: {
            // "platform" = o sensor do próprio aparelho, não chave USB.
            authenticatorAttachment: 'platform',
            // "required" obriga digital ou rosto, não só desbloqueio.
            userVerification: 'required',
            residentKey: 'preferred'
          },
          timeout: 60000,
          attestation: 'none'
        }
      });

      if (!credencial) return { ok: false, motivo: 'A confirmação não foi concluída.' };

      registro = {
        id: paraBase64(credencial.rawId),
        nome: nomeDoDono || '',
        desde: new Date().toISOString().slice(0, 10)
      };
      guardar();
      return { ok: true };
    } catch (erro) {
      return { ok: false, motivo: explicar(erro) };
    }
  }

  /* ── Autenticar ──────────────────────────────────────── */

  /**
   * Pede a digital para entrar. Devolve { ok, motivo, expirada }.
   * `expirada` avisa que a credencial não vale mais — biometria trocada
   * ou removida nas configurações do aparelho — e nesse caso o cadastro
   * é apagado aqui, senão o app ficaria oferecendo uma entrada que não
   * funciona mais.
   */
  async function entrar() {
    if (!registro) return { ok: false, motivo: 'Biometria não está ativada.' };
    if (!suportado()) return { ok: false, motivo: 'Este navegador não oferece biometria.' };

    try {
      const resposta = await navigator.credentials.get({
        publicKey: {
          challenge: aleatorio(32),
          allowCredentials: [{ type: 'public-key', id: paraBytes(registro.id) }],
          userVerification: 'required',
          timeout: 60000
        }
      });

      if (!resposta) return { ok: false, motivo: 'A confirmação não foi concluída.' };
      return { ok: true };
    } catch (erro) {
      // Credencial que o sistema não reconhece mais: some com ela.
      if (erro && erro.name === 'InvalidStateError') {
        desativar();
        return { ok: false, motivo: 'A biometria deste aparelho mudou. Entre com o PIN e ative de novo.', expirada: true };
      }
      return { ok: false, motivo: explicar(erro) };
    }
  }

  /** Desliga e esquece o cadastro. O perfil e o PIN continuam. */
  function desativar() {
    registro = null;
    guardar();
  }

  return { suportado, disponivel, ativa, nomeRegistrado, ativar, entrar, desativar };
})();
