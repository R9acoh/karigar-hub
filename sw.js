// Define a name for the cache
const CACHE_NAME = 'karigar-hub-cache-v1';

// List all the essential files your app needs to work offline
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'images/icons/icon-192x192.png',
  'images/icons/icon-512x512.png'
];

// Install event: This runs when the service worker is first installed.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Add all the specified files to the cache
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: This runs every time the app requests a file (e.g., an image, css, etc.).
self.addEventListener('fetch', event => {
  event.respondWith(
    // Check if the requested file is in the cache
    caches.match(event.request)
      .then(response => {
        // If it's in the cache, serve it from there
        if (response) {
          return response;
        }
        // If not, fetch it from the network
        return fetch(event.request);
      })
  );
});