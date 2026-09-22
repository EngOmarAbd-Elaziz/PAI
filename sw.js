/**
 * CODEX Library — Service Worker v2
 *
 * Cache strategy:
 *   APP_SHELL_CACHE  → Cache-first, precached at install
 *   LESSON_CACHE_*   → Explicit user action via offline-manager.js
 *
 * v2 changes: added vendor/codemirror-bundle.js to App Shell
 */

const APP_SHELL_CACHE = 'codex-app-shell-v8';   // ← bumped from v7
const LESSON_CACHE_PREFIX = 'codex-lesson-';

const APP_SHELL_ASSETS = [
  './',
  'index.html',
  'lesson.html',
  'lab.html',
  'storage.html',
  'styles.css',
  'css/lab.css',
  'manifest.webmanifest',
  'CODEX_LOGO-preview.png',
  'CODEX_LOGO-removebg-preview.png',
  // Data
  'data/lessons.js',
  // JavaScript
  'js/library.js',
  'js/lesson-player.js',
  'js/code-runner.js',
  'js/storage.js',
  'js/offline-manager.js',
  'js/desktop-effects.js',
  // CodeMirror 6 bundle — local, fully offline
  'vendor/codemirror-bundle.js',
];

/* ─── Install: precache App Shell ────────────────────────────────────────── */
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) =>
      cache.addAll(APP_SHELL_ASSETS.map(url => new Request(url, { cache: 'reload' })))
    ).catch(err => console.error('[SW] Failed to cache app shell:', err))
  );
});

/* ─── Activate: remove old app-shell caches ──────────────────────────────── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.clients.claim().then(() =>
      caches.keys().then((keys) =>
        Promise.all(
          keys.map((key) => {
            // Delete any old app-shell caches (but NOT lesson caches)
            if (key.startsWith('codex-app-shell-') && key !== APP_SHELL_CACHE) {
              console.log('[SW] Deleting old cache:', key);
              return caches.delete(key);
            }
          })
        )
      )
    )
  );
});

/* ─── Fetch: Cache-first for our assets ──────────────────────────────────── */
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === location.origin;
  const isGoogleFont  = url.href.includes('fonts.googleapis') || url.href.includes('fonts.gstatic');

  // Pass through external requests that are NOT Google Fonts
  if (!isSameOrigin && !isGoogleFont) return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        // Cache Google Fonts automatically into App Shell cache
        if (isGoogleFont && response.ok) {
          const clone = response.clone();
          caches.open(APP_SHELL_CACHE).then(c => c.put(event.request, clone));
        }
        return response;
      }).catch(() =>
        new Response('Offline', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'Content-Type': 'text/plain' },
        })
      );
    })
  );
});
