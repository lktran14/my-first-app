/**
 * Tran Family Album — Service Worker
 * Caches all app assets for offline use.
 */

const CACHE_NAME = "tran-family-album-v18";

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
  "./photos/lien-baby/P1090321.png",
  "./photos/wedding/P1090335.png",
  "./photos/wedding/P1090338.png",
  "./photos/wedding/P1090340.png",
  "./photos/wedding/P1090342.png",
  "./photos/wedding/P1090345.png",
  "./photos/wedding/P1090350.png",
  "./photos/wedding/P1090361.png",
  "./photos/wedding/P1080796.png",
  "./photos/wedding/P1080797.png",
  "./photos/wedding/P1080801.png",
  "./photos/wedding/P1080803.png",
  "./photos/wedding/P1080805.png",
  "./photos/wedding/P1080806.png",
  "./photos/wedding/P1080814.png",
  "./photos/wedding/P1080819.png",
  "./photos/wedding/P1080823.png",
  "./photos/wedding/P1080826.png",
  "./photos/wedding/P1080829.png",
  "./photos/wedding/P1080831.png",
  "./photos/wedding/P1080835.png",
  "./photos/wedding/P1080841.png",
  "./photos/wedding/P1080842.png",
  "./photos/wedding/P1080843.png",
  "./photos/wedding/P1080852.png",
  "./photos/wedding/P1080860.png",
  "./photos/italy-1987/P1000657.png",
  "./photos/italy-1987/P1090214.png",
  "./photos/italy-1987/P1090216.png",
  "./photos/italy-1987/P1090217.png",
  "./photos/italy-1987/P1090218.png",
  "./photos/italy-1987/P1090219.png",
  "./photos/italy-1987/P1090220.png",
  "./photos/italy-1987/P1090221.png",
  "./photos/italy-1987/P1090222.png",
  "./photos/italy-1987/P1090223.png",
  "./photos/italy-1987/P1090224.png",
  "./photos/italy-1987/P1090225.png",
  "./photos/italy-1987/P1090227.png",
  "./photos/italy-1987/P1090228.png",
  "./photos/italy-1987/P1090229.png",
  "./photos/italy-1987/P1090244.png",
  "./photos/holidays/IMG_5280.png",
  "./photos/holidays/IMG_5294.png",
  "./photos/holidays/IMG_5618.png",
  "./photos/holidays/IMG_5631.png",
  "./photos/holidays/IMG_5643.png",
  "./photos/holidays/IMG_5658.png",
  "./photos/holidays/IMG_5669.png",
  "./photos/holidays/IMG_5730.png",
  "./photos/holidays/IMG_5732.png",
  "./photos/holidays/IMG_5778.png",
  "./photos/holidays/IMG_5781.png",
  "./photos/holidays/IMG_5788.png",
  "./photos/holidays/IMG_5813.png",
  "./photos/holidays/IMG_5821.png",
  "./photos/holidays/IMG_5864.png",
  "./photos/holidays/IMG_5865.png",
  "./photos/holidays/IMG_5908.png",
  "./photos/holidays/IMG_5909.png",
  "./photos/holidays/IMG_5913.png",
  "./photos/holidays/IMG_5916.png",
  "./photos/holidays/IMG_5922.png",
  "./photos/holidays/IMG_5926.png",
  "./photos/holidays/IMG_5930.png",
  "./photos/holidays/IMG_5932.png",
  "./photos/holidays/IMG_5945.png",
  "./photos/holidays/IMG_5974.png",
  "./photos/holidays/IMG_5980.png",
  "./photos/holidays/IMG_5989.png",
  "./photos/holidays/IMG_6014.png",
  "./photos/holidays/IMG_6027.png",
  "./photos/holidays/IMG_6038.png",
  "./photos/holidays/IMG_6065.png",
  "./photos/holidays/IMG_6075.png",
  "./photos/holidays/IMG_6082.png",
  "./photos/holidays/IMG_6107.png",
  "./photos/holidays/IMG_6133.png",
  "./photos/holidays/IMG_6193.png",
  "./photos/holidays/IMG_6220.png",
  "./photos/holidays/IMG_6229.png",
  "./photos/holidays/IMG_6257.png",
  "./photos/holidays/IMG_6259.png",
  "./photos/holidays/IMG_6271.png",
  "./photos/holidays/IMG_6272.png",
  "./photos/holidays/IMG_6302.png",
  "./photos/holidays/IMG_6313.png",
  "./photos/holidays/IMG_6327.png",
  "./photos/holidays/IMG_6334.png",
  "./photos/holidays/IMG_6383.png",
  "./photos/holidays/IMG_6404.png",
  "./photos/holidays/IMG_6410.png",
  "./photos/holidays/IMG_6472.png",
  "./photos/holidays/IMG_6486.png",
  "./photos/holidays/IMG_6500.png",
  "./photos/holidays/IMG_6506.png",
  "./photos/holidays/IMG_6508.png",
  "./photos/holidays/IMG_6522.png",
  "./photos/holidays/IMG_6545.png",
  "./photos/asia-cruise-2019/IMG_6678.png",
  "./photos/asia-cruise-2019/IMG_6688.png",
  "./photos/asia-cruise-2019/IMG_6689.png",
  "./photos/asia-cruise-2019/IMG_6698.png",
  "./photos/asia-cruise-2019/IMG_6703.png",
  "./photos/asia-cruise-2019/IMG_6704.png",
  "./photos/asia-cruise-2019/IMG_6706.png",
  "./photos/asia-cruise-2019/IMG_6718.png",
  "./photos/asia-cruise-2019/IMG_6719.png",
  "./photos/asia-cruise-2019/IMG_6721.png",
  "./photos/asia-cruise-2019/IMG_6722.png",
  "./photos/asia-cruise-2019/IMG_6729.png",
  "./photos/asia-cruise-2019/IMG_6732.png",
  "./photos/asia-cruise-2019/IMG_6743.png",
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
