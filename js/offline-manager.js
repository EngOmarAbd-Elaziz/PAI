/**
 * DIGITAL COURSE LIBRARY — Offline Manager
 * Handles checking cache status and explicitly caching lesson resources
 */

const OfflineManager = {
  getCacheName(lessonId, version) {
    return `codex-lesson-${lessonId}-v${version}`;
  },

  async isLessonCached(lessonId, version) {
    if (!('caches' in window)) return false;
    const cacheName = this.getCacheName(lessonId, version);
    return await caches.has(cacheName);
  },

  async cacheLesson(lessonData, onProgress) {
    if (!('caches' in window)) throw new Error('Offline storage not supported');
    
    const cacheName = this.getCacheName(lessonData.id, lessonData.version);
    
    // Determine what needs to be cached for this specific lesson
    const urlsToCache = [
      lessonData.slidesFile,
      // The handout data is already loaded via data/lessons.js in the App Shell,
      // so we don't need to explicitly fetch it here.
      // If the lesson relies on specific images, they should be added here.
    ];

    try {
      const cache = await caches.open(cacheName);
      
      let loaded = 0;
      const total = urlsToCache.length;
      
      if (onProgress) onProgress(0);
      
      for (const url of urlsToCache) {
        // Fetch and put in cache explicitly to track progress
        const response = await fetch(new Request(url, { cache: 'reload' }));
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}`);
        }
        await cache.put(url, response.clone());
        
        loaded++;
        if (onProgress) onProgress(Math.round((loaded / total) * 100));
      }
      
      return true;
    } catch (error) {
      console.error('Failed to cache lesson:', error);
      // Clean up incomplete cache
      await caches.delete(cacheName);
      throw error;
    }
  }
};

// Global Offline Detection
window.addEventListener('online', () => document.body.classList.remove('offline-mode'));
window.addEventListener('offline', () => document.body.classList.add('offline-mode'));

if (!navigator.onLine) {
  document.body.classList.add('offline-mode');
}

window.OfflineManager = OfflineManager;
