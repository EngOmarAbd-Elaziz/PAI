/**
 * DIGITAL COURSE LIBRARY — Storage Manager
 * Handles UI for viewing and clearing cached lessons
 */

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('storage-list');
  const countLabel = document.getElementById('saved-count');
  
  if (!('caches' in window)) {
    container.innerHTML = '<div style="color: var(--accent-crimson); padding: 20px;">Offline storage is not supported in this browser.</div>';
    return;
  }

  await renderStorageList();

  async function renderStorageList() {
    container.innerHTML = '';
    const cacheKeys = await caches.keys();
    const lessonCaches = cacheKeys.filter(k => k.startsWith('codex-lesson-'));
    
    countLabel.textContent = `${lessonCaches.length} items`;
    
    if (lessonCaches.length === 0) {
      container.innerHTML = `
        <div style="background: var(--card-bg); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 30px; text-align: center; color: var(--text-dim);">
          <div style="font-size: 32px; margin-bottom: 12px;">☁️</div>
          You have no lessons saved for offline use.
        </div>
      `;
      return;
    }

    // Map cache names back to lesson objects
    for (const cacheName of lessonCaches) {
      // cacheName looks like 'codex-lesson-lesson-01-v1'
      // Extract lesson ID
      const parts = cacheName.split('-');
      // ['codex', 'lesson', 'lesson', '01', 'v1'] -> lessonId: 'lesson-01'
      // The prefix is 'codex-lesson-' (13 chars)
      // The suffix is '-vX'
      const match = cacheName.match(/^codex-lesson-(.+)-v\d+$/);
      let lessonId = '';
      if (match && match[1]) {
        lessonId = match[1];
      }
      
      const lesson = LESSONS.find(l => l.id === lessonId);
      
      const el = document.createElement('div');
      el.style.cssText = `
        display: flex; 
        align-items: center; 
        justify-content: space-between; 
        background: var(--card-bg); 
        border: 1px solid var(--border-subtle); 
        border-radius: 12px; 
        padding: 16px;
      `;
      
      if (lesson) {
        el.innerHTML = `
          <div>
            <div style="font-size: 12px; color: var(--text-muted); font-family: 'Fira Code', monospace; margin-bottom: 4px;">LESSON ${lesson.number}</div>
            <div style="font-weight: 600; color: white;">${lesson.icon} ${lesson.title}</div>
          </div>
          <button class="btn-remove" data-cache="${cacheName}" style="background: transparent; border: 1px solid var(--accent-crimson); color: var(--accent-crimson); padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600;">Remove</button>
        `;
      } else {
        el.innerHTML = `
          <div>
            <div style="font-size: 12px; color: var(--text-muted); font-family: 'Fira Code', monospace; margin-bottom: 4px;">UNKNOWN CACHE</div>
            <div style="font-weight: 600; color: white;">${cacheName}</div>
          </div>
          <button class="btn-remove" data-cache="${cacheName}" style="background: transparent; border: 1px solid var(--accent-crimson); color: var(--accent-crimson); padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600;">Remove</button>
        `;
      }
      
      container.appendChild(el);
    }

    // Attach event listeners
    document.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const cacheName = e.target.getAttribute('data-cache');
        if (confirm('Are you sure you want to remove this lesson from your device?')) {
          e.target.textContent = 'Removing...';
          e.target.disabled = true;
          await caches.delete(cacheName);
          await renderStorageList();
        }
      });
    });
  }
});
