import { precacheAndRoute } from "workbox-precaching";

const CACHE_NAME = "version-2";

// Precache all assets
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("install", async () => {
  const cache = await caches.open(CACHE_NAME);
  await cache.add("/index.html");
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(async (cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      try {
        const networkResponse = await fetch(event.request);
        const cache = await caches.open(CACHE_NAME);

        if (
          event.request.url.includes("/assets/") ||
          event.request.url.includes("/images/")
        ) {
          cache.put(event.request, networkResponse.clone());
        }

        return networkResponse;
      } catch (error) {
        return (
          caches.match("/index.html") ||
          new Response("No internet", { status: 503 })
        );
      }
    }),
  );
});

self.addEventListener("activate", async () => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map((name) => name !== CACHE_NAME && caches.delete(name)),
  );
  self.clients.claim();
});

self.addEventListener("push", (event) => {
  const { title, ...options } = event.data ? event.data.json() : {};
  self.registration.showNotification(title || "New Notification", options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === targetUrl && "focus" in client)
          return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(targetUrl);
    }),
  );
});
