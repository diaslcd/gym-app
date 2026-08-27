/* Ponto de entrada do aplicativo. */
document.addEventListener('DOMContentLoaded', () => {
  Router.registrar('dashboard', Dashboard);
  Router.registrar('selecao', Selecao);
  Router.registrar('exercicios', Exercicios);
  Router.registrar('detalhe', Detalhe);
  Router.registrar('historico', Historico);
  Router.iniciar(document.getElementById('app'), 'dashboard');
});
