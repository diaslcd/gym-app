/* Ponto de entrada do aplicativo. */
document.addEventListener('DOMContentLoaded', () => {
  Router.registrar('login', Login);
  Router.registrar('plano', TelaPlano);
  Router.registrar('dashboard', Dashboard);
  Router.registrar('selecao', Selecao);
  Router.registrar('exercicios', Exercicios);
  Router.registrar('detalhe', Detalhe);
  Router.registrar('historico', Historico);
  Router.registrar('registrar', TelaRegistrar);
  Router.registrar('nutricao', NutricaoView);
  Router.registrar('alimento', Alimento);
  Router.registrar('social', Social);
  Router.registrar('publicar', Publicar);
  Router.registrar('perfil', TelaPerfil);
  Router.registrar('ranking', Ranking);
  Router.registrar('grupos', Grupos);
  Router.registrar('grupo', Grupo);
  Router.registrar('desafios', Desafios);

  // Perfil sem PIN entra direto; com PIN, passa pela tela de entrada.
  const inicial = Perfil.dentro() ? 'dashboard' : 'login';
  Router.iniciar(document.getElementById('app'), inicial);
  ligarVoltarDoAndroid();
});

/* Botão voltar do Android.

   Deixar o WebView decidir sozinho não bastou: no aparelho ele saía do
   app antes de esgotar o histórico. Com o plugin App a decisão passa a
   ser nossa e é explícita. No navegador este trecho não faz nada, e o
   voltar continua sendo o do próprio navegador.

   A regra mudou quando o app deixou de ter uma raiz só. Antes, "estou no
   painel" bastava para significar "cheguei ao fim". Agora são três abas,
   e sair do app a partir do Social seria fechar de surpresa quem só
   queria voltar ao treino. A ordem passa a ser a do Material Design:
   de uma tela funda, volta uma tela; da raiz de uma aba secundária, vai
   para a aba inicial; e só da raiz inicial é que o app fecha. */
function ligarVoltarDoAndroid() {
  const ponte = window.Capacitor && window.Capacitor.Plugins;
  if (!ponte || !ponte.App) return;

  ponte.App.addListener('backButton', () => {
    const tela = Router.telaAtual();

    if (Abas.ehRaizInicial(tela)) {
      ponte.App.exitApp();
      return;
    }

    if (Abas.ehRaiz(tela)) {
      Abas.ir(Abas.abaInicial().id);
      return;
    }

    history.back();
  });
}
