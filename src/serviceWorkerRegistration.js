import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';

// Automatically precache Workbox manifest files
if (self.__WB_MANIFEST && Array.isArray(self.__WB_MANIFEST)) {
  precacheAndRoute(self.__WB_MANIFEST); // Ensure __WB_MANIFEST is correctly loaded
} else {
  console.warn("Workbox precache manifest is not available or invalid.");
}

// Install event to cache critical assets
self.addEventListener('install', (event) => {
  const urlsToCache = [
    '/', // Root of your app
    '/index.html',
    '/static/js/bundle.js',
    '/static/css/main.chunk.css',
    '/static/js/main.chunk.js',
    '/static/js/0.chunk.js',
    '/manifest.json',
    '/favicon.ico',
    '/logo192.png',
    '/logo512.png',
  ];

  event.waitUntil(
    caches.open('offline-cache').then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event to serve cached assets when offline
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/').then((response) => {
        return response || fetch(event.request);
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event to clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['html-cache', 'static-assets', 'offline-cache', 'preloaded-pages'];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// Register function for service worker
export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
}
