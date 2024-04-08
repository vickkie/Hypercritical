<<<<<<< HEAD
const cacheName="Hypercritical-offline";let offlineUrl="offline.html",offlineFont="fonts/MonumentExtended-Regular.woff",offlineMask="assets/masks/hypercritical-main-logo.png";const cacheAssets=[offlineUrl,offlineFont,offlineMask];self.addEventListener("install",(e=>{e.waitUntil(caches.open(cacheName).then((e=>{e.addAll(cacheAssets)})).then((()=>self.skipWaiting())))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((e=>Promise.all(e.map((e=>{if(e!==cacheName)return caches.delete(e)}))))))})),self.addEventListener("fetch",(e=>{e.respondWith(fetch(e.request).catch((()=>caches.match(offlineUrl))))}));
=======
const cacheName = "Hypercritical-offline";
// var cacheName = {
//     offline: 'uzitrake-offline' + cacheVersion,
// }

let offlineUrl = "offline.html";
let offlineFont = "fonts/MonumentExtended-Regular.woff";
let offlineMask = "assets/masks/hypercritical-main-logo.png";

const cacheAssets = [offlineUrl, offlineFont, offlineMask];

//calling install event

self.addEventListener("install", (e) => {
  // console.log('Service-worker:installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        // console.log('serviceWorker: caching files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

//call install event

self.addEventListener("activate", (e) => {
  // console.log('Service-worker:activated');
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            // console.log('Service worker: clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// call fetch event
self.addEventListener("fetch", (e) => {
  // console.log('Service worker: fetching');
  e.respondWith(fetch(e.request).catch(() => caches.match(offlineUrl)));
});
>>>>>>> main
