/**
 * Tran Family Album — Service Worker
 * Caches all app assets for offline use.
 */

const CACHE_NAME = "tran-family-album-v6";

const ASSETS_TO_CACHE = [
  "./",
  "./photo-viewer.html",
  "./manifest.json",
  "./style.css",
  "./app.js",
  "./icons/icon-192.svg",
  "./icons/icon-512.svg",
  "./photos/family/P1000199.png",
  "./photos/family/P1000200.png",
  "./photos/family/P1000201.png",
  "./photos/family/P1000202.png",
  "./photos/family/P1000205.png",
  "./photos/family/P1000206.png",
  "./photos/family/P1000207.png",
  "./photos/family/P1000208.png",
  "./photos/family/P1000209.png",
  "./photos/family/P1000210.png",
  "./photos/family/P1000211.png",
  "./photos/family/P1000212.png",
  "./photos/family/P1000213.png",
  "./photos/wedding/P1090318.png",
  "./photos/wedding/P1090321.png",
  "./photos/wedding/P1090320.png",
  "./photos/wedding/P1090335.png",
  "./photos/wedding/P1090338.png",
  "./photos/wedding/P1090339.png",
  "./photos/wedding/P1090340.png",
  "./photos/wedding/P1090342.png",
  "./photos/wedding/P1090343.png",
  "./photos/wedding/P1090344.png",
  "./photos/wedding/P1090345.png",
  "./photos/wedding/P1090346.png",
  "./photos/wedding/P1090347.png",
  "./photos/wedding/P1090349.png",
  "./photos/wedding/P1090350.png",
  "./photos/wedding/P1090351.png",
  "./photos/wedding/P1090361.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Network-first for remote placeholder images; cache-first for local assets
  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    })
  );
});
