/* Service worker: guarda o app para funcionar sem sinal na academia.
   Estratégia de rede primeiro — o app é pequeno e assim uma versão
   nova chega logo; o cache entra quando a conexão falha. */
const CACHE = 'bunnygym-v1-30';

const ARQUIVOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/css/styles.css',
  './assets/icone.png',
  './assets/icone-mascara.png',
  './assets/js/utils.js',
  './assets/js/alerta.js',
  './assets/js/plano.js',
  './assets/js/programa.js',
  './assets/js/perfil.js',
  './assets/js/biometria.js',
  './assets/js/data.js',
  './assets/js/treino.js',
  './assets/js/sessao.js',
  './assets/js/execucao.js',
  './assets/js/nutricao.js',
  './assets/js/icones.js',
  './assets/js/icones-exercicios.js',
  './assets/js/animacoes.js',
  './assets/js/animacoes-lista.js',
  './assets/js/guia.js',
  './assets/js/demonstracao.js',
  './assets/js/ilustracoes.js',
  './assets/treinos/peito-triceps.jpg',
  './assets/treinos/costas-biceps.jpg',
  './assets/treinos/perna.jpg',
  './assets/treinos/superiores.jpg',
  './assets/treinos/empurrar.jpg',
  './assets/treinos/puxar.jpg',
  './assets/treinos/ombro-trapezio.jpg',
  './assets/treinos/bracos.jpg',
  './assets/treinos/gluteos-posterior.jpg',
  './assets/treinos/corpo-inteiro.jpg',
  './assets/js/componentes.js',
  './assets/js/privacidade.js',
  './assets/js/foto.js',
  './assets/js/social.js',
  './assets/js/comunidade.js',
  './assets/js/abas.js',
  './assets/js/router.js',
  './assets/js/views/login.js',
  './assets/js/views/plano.js',
  './assets/js/views/perguntas.js',
  './assets/js/views/dashboard.js',
  './assets/js/views/selecao.js',
  './assets/js/views/exercicios.js',
  './assets/js/views/detalhe.js',
  './assets/js/views/historico.js',
  './assets/js/views/registrar.js',
  './assets/js/views/nutricao.js',
  './assets/js/views/alimento.js',
  './assets/js/views/social.js',
  './assets/js/views/publicar.js',
  './assets/js/views/perfil.js',
  './assets/js/views/ranking.js',
  './assets/js/views/grupos.js',
  './assets/js/views/desafios.js',
  './assets/js/app.js'
];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ARQUIVOS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((nomes) => Promise.all(
        nomes.filter((nome) => nome !== CACHE).map((nome) => caches.delete(nome))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (evento) => {
  if (evento.request.method !== 'GET') return;

  evento.respondWith(
    fetch(evento.request)
      .then((resposta) => {
        // Guarda só o que é do próprio app; fontes externas ficam de fora.
        // Só resposta inteira (200): o vídeo chega em pedaços (206) e o
        // cache recusa pedaço — a gravação falhava e sujava o console.
        if (resposta.status === 200 && evento.request.url.startsWith(self.location.origin)) {
          const copia = resposta.clone();
          caches.open(CACHE).then((cache) => cache.put(evento.request, copia));
        }
        return resposta;
      })
      .catch(() => caches.match(evento.request).then((cacheada) => {
        return cacheada || caches.match('./index.html');
      }))
  );
});
