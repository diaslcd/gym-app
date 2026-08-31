/* Ponto de entrada do aplicativo. */
document.addEventListener('DOMContentLoaded', () => {
  Router.registrar('login', Login);
  Router.registrar('bemvindo', BemVindo);
  Router.registrar('plano', TelaPlano);
  Router.registrar('dashboard', Dashboard);
  Router.registrar('selecao', Selecao);
  Router.registrar('exercicios', Exercicios);
  Router.registrar('detalhe', Detalhe);
  Router.registrar('historico', Historico);

  // Perfil sem PIN entra direto; com PIN, passa pela tela de entrada.
  const inicial = Perfil.dentro() ? 'dashboard' : 'login';
  Router.iniciar(document.getElementById('app'), inicial);
  ligarVoltarDoAndroid();
});

/* Botão voltar do Android.

   Deixar o WebView decidir sozinho não bastou: no aparelho ele saía do
   app antes de esgotar o histórico. Com o plugin App a decisão passa a
   ser nossa e é explícita — fora do painel, volta uma tela; no painel,
   que é a raiz, sai do app. No navegador este trecho não faz nada, e o
   voltar continua sendo o do próprio navegador. */
function ligarVoltarDoAndroid() {
  const ponte = window.Capacitor && window.Capacitor.Plugins;
  if (!ponte || !ponte.App) return;

  ponte.App.addListener('backButton', () => {
    if (Router.telaAtual() === 'dashboard') ponte.App.exitApp();
    else history.back();
  });
}
