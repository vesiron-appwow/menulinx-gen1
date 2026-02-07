const CACHE_NAME = "menulinx-gen1-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/admin.html",
  "/manifest.webmanifest",
  "/sw.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    ).then(() => self.clients.claim())
  );
});

// Cache-first for static, network-first for API
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // API routes always network-first
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(req).catch(() => new Response(JSON.stringify({ ok:false, error:"Offline" }), {
        status: 503,
        headers: { "content-type":"application/json" }
      }))
    );
    return;
  }

  // Static: cache-first
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return res;
      });
    })
  );
});
