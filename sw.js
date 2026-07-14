// BOXER PRO service worker — kurulabilirlik + hızlı yeniden yükleme
const CACHE = 'boxerpro-v4';
const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './icon-192.png?v=3', './icon-512.png?v=3', './apple-touch-icon.png?v=3',
  './card-gloves.jpg', './card-ring.jpg', './card-champion.jpg',
  './banner-train.jpg', './banner-tech.jpg', './banner-prog.jpg',
  './level-beginner.jpg?v=2', './level-intermediate.jpg?v=2', './level-advanced.jpg?v=2', './level-mix.jpg?v=2'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      try {
        if (res && res.status === 200 && req.url.startsWith(self.location.origin)) {
          const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy));
        }
      } catch (_) {}
      return res;
    }).catch(() => cached))
  );
});
