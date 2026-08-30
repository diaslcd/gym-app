/* Ponto de entrada do aplicativo. */
document.addEventListener('DOMContentLoaded', () => {
  Router.registrar('login', Login);
  Router.registrar('dashboard', Dashboard);
  Router.registrar('selecao', Selecao);
  Router.registrar('exercicios', Exercicios);
  Router.registrar('detalhe', Detalhe);
  Router.registrar('historico', Historico);

  // Perfil sem PIN entra direto; com PIN, passa pela tela de entrada.
  const inicial = Perfil.dentro() ? 'dashboard' : 'login';
  Router.iniciar(document.getElementById('app'), inicial);
});
