// sw.js - Service Worker File

const CACHE_NAME = 'Pixie';
const ASSETS_TO_CACHE = [
    '/index.html',
    '/about.html',
    '/contact.html',
    '/products.html',
    '/single-product.html',
    '/vendor/bootstrap/css/bootstrap.min.css',
    '/vendor/bootstrap/css/bootstrap.css',
    '/vendor/bootstrap/js/bootstrap.bundle.min.js',
    '/vendor/jquery/jquery.min.js',
    // Add additional assets like images or custom JS/CSS files here if needed
  ];
  

// Install event - caches important files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Fetch event - serves cached content when available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      })
  );
});