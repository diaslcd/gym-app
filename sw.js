/* Service worker: guarda o app para funcionar sem sinal na academia.
   Estratégia de rede primeiro — o app é pequeno e assim uma versão
   nova chega logo; o cache entra quando a conexão falha. */
const CACHE = 'bunnygym-v1-12';

const ARQUIVOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/css/styles.css',
  './assets/icone.png',
  './assets/icone-mascara.png',
  './assets/js/utils.js',
  './assets/js/perfil.js',
  './assets/js/data.js',
  './assets/js/treino.js',
  './assets/js/sessao.js',
  './assets/js/execucao.js',
  './assets/js/icones.js',
  './assets/js/icones-exercicios.js',
  './assets/js/guia.js',
  './assets/js/demonstracao.js',
  './assets/js/ilustracoes.js',
  './assets/treinos/peito-triceps.webp',
  './assets/treinos/costas-biceps.webp',
  './assets/treinos/perna.webp',
  './assets/treinos/superiores.webp',
  './assets/js/componentes.js',
  './assets/js/router.js',
  './assets/js/views/login.js',
  './assets/js/views/dashboard.js',
  './assets/js/views/selecao.js',
  './assets/js/views/exercicios.js',
  './assets/js/views/detalhe.js',
  './assets/js/views/historico.js',
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
        if (resposta.ok && evento.request.url.startsWith(self.location.origin)) {
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
