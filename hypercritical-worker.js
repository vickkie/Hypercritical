// version  1

const cacheName = "Hypercritical-offline";

// Call install event
self.addEventListener("install", (e) => {
  console.log("Service-worker:installed");
  // Skip waiting and activate immediately
  e.waitUntil(self.skipWaiting());
});

// Call activate event
self.addEventListener("activate", (e) => {
  console.log("Service-worker:activated");
  // Remove any old cache
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service worker: clearing old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // Take control of all clients as soon as the service worker activates
  e.waitUntil(clients.claim());
});

// Call fetch event
self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // Check if the response status is OK (status code  200)
        if (res.status === 200) {
          // Check if the request is not from a chrome-extension
          if (!e.request.url.startsWith("chrome-extension://")) {
            // Make a clone of the response
            const resClone = res.clone();
            // Open the cache and add the response to it
            caches.open(cacheName).then((cache) => {
              cache.put(e.request, resClone);
            });
          }
        }
        // Return the original response
        return res;
      })
      .catch((err) =>
        caches
          .match(e.request)
          .then((res) => res)
          .then(console.log("Error:", err))
      )
  );
});

///workbox  IF NEED BE
// version 2

// importScripts('js/workbox-sw.js');

// const cacheName = "Hypercritical-offline";

// workbox.core.setCacheNameDetails({ prefix: cacheName });

// // Precache static assets during the install step
// workbox.precaching.precacheAndRoute([
//   { url: '/', revision: '1' }, // Add more entries for other assets
// ]);

// // Cache strategy for images using CacheFirst
// workbox.routing.registerRoute(
//   /\.(png|jpg|jpeg|gif|bmp)$/,
//   new workbox.strategies.CacheFirst({
//     cacheName: 'image-cache',
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//       }),
//     ],
//   })
// );

// // Cache strategy for other assets using StaleWhileRevalidate
// workbox.routing.registerRoute(
//   /\.(css|js)$/,
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: 'static-assets',
//   })
// );

// // Cache strategy for API calls using NetworkFirst
// workbox.routing.registerRoute(
//   /\/api\//,
//   new workbox.strategies.NetworkFirst({
//     cacheName: 'api-cache',
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxEntries: 10,
//       }),
//     ],
//   })
// );

// // Default strategy for other requests using NetworkFirst
// workbox.routing.setDefaultHandler(new workbox.strategies.NetworkFirst());

// // Clean up outdated caches during the activate step
// workbox.core.skipWaiting();
// workbox.core.clientsClaim();

// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cache) => {
//           if (cache.startsWith(cacheName) && cache !== cacheName) {
//             return caches.delete(cache);
//           }
//         })
//       );
//     })
//   );
// });

// version 3

// const cacheName = "Hypercritical-offline";

// workbox.core.setCacheNameDetails({ prefix: cacheName });

// // Precache static assets during the install step
// workbox.precaching.precacheAndRoute([
//   { url: '/', revision: '1' }, // Add more entries for other assets
// ]);

// // Cache strategy for images using CacheFirst
// workbox.routing.registerRoute(
//   /\.(png|jpg|jpeg|gif|bmp)$/,
//   new workbox.strategies.CacheFirst({
//     cacheName: 'image-cache',
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//       }),
//     ],
//   })
// );

// // Cache strategy for other assets using StaleWhileRevalidate
// workbox.routing.registerRoute(
//   /\.(css|js)$/,
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: 'static-assets',
//   })
// );

// // Cache strategy for API calls using NetworkFirst
// workbox.routing.registerRoute(
//   /\/api\//,
//   new workbox.strategies.NetworkFirst({
//     cacheName: 'api-cache',
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxEntries: 10,
//       }),
//     ],
//   })
// );

// // Default strategy for other requests using NetworkFirst
// workbox.routing.setDefaultHandler(new workbox.strategies.NetworkFirst());

// // Ensure to skip waiting
// self.skipWaiting();

// // Ensure to claim clients during activation
// self.addEventListener('activate', (event) => {
//   event.waitUntil(self.clients.claim());
// });

// // Clean up outdated caches during the activate step
// workbox.precaching.cleanupOutdatedCaches();

// version 4

// const cacheName = "Hypercritical-offline";

// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(cacheName).then((cache) => {
//       // Precache static assets during the install step
//       return cache.addAll([
//         '/',
//         // Add more entries for other assets
//       ]);
//     })
//   );
// });

// // Cache strategy for images using CacheFirst
// workbox.routing.registerRoute(
//   /\.(png|jpg|jpeg|gif|bmp)$/,
//   new workbox.strategies.CacheFirst({
//     cacheName: 'image-cache',
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//       }),
//     ],
//   })
// );

// // Cache strategy for other assets using StaleWhileRevalidate
// workbox.routing.registerRoute(
//   /\.(css|js)$/,
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: 'static-assets',
//   })
// );

// // Cache strategy for API calls using NetworkFirst
// workbox.routing.registerRoute(
//   /\/api\//,
//   new workbox.strategies.NetworkFirst({
//     cacheName: 'api-cache',
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxEntries: 10,
//       }),
//     ],
//   })
// );

// // Default strategy for other requests using NetworkFirst
// workbox.routing.setDefaultHandler(new workbox.strategies.NetworkFirst());

// // Clean up outdated caches during the activate step
// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cache) => {
//           if (cache.startsWith(cacheName) && cache !== cacheName) {
//             return caches.delete(cache);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });
