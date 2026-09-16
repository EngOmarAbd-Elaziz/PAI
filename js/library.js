/**
 * DIGITAL COURSE LIBRARY — Library Page Logic
 * Handles rendering the grid of lesson cards based on data/lessons.js
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Ensure data exists
  if (typeof LESSONS === 'undefined' || !Array.isArray(LESSONS)) {
    console.error('LESSONS data not found!');
    document.getElementById('lessons-grid').innerHTML = 
      '<div style="color: #ef4444; padding: 20px;">Error loading lesson data.</div>';
    return;
  }

  // Render metrics
  document.getElementById('total-count').textContent = LESSONS.length;
  // (In a real app, completed count would come from localStorage)
  document.getElementById('completed-count').textContent = '0';

  // Render cards
  const gridContainer = document.getElementById('lessons-grid');
  gridContainer.innerHTML = '';

  for (const lesson of LESSONS) {
    const card = document.createElement('a');
    card.href = `lesson.html?id=${lesson.id}`;
    card.className = 'lesson-card';
    card.setAttribute('data-color', lesson.color);

    // Default status logic for now
    const statusClass = 'status-not-started';
    const statusText = 'Not Started';
    
    // Check offline status
    let offlineBadge = '';
    if (lesson.offline && lesson.offline.enabled) {
      const isCached = window.OfflineManager ? await OfflineManager.isLessonCached(lesson.id, lesson.version || 1) : false;
      if (isCached) {
        offlineBadge = `<div style="font-size: 11px; font-weight: bold; color: var(--accent-emerald); background: rgba(16, 185, 129, 0.1); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(16, 185, 129, 0.2);">✓ Offline</div>`;
      }
    }

    card.innerHTML = `
      <div class="card-top">
        <div style="display: flex; flex-direction: column; gap: 10px; align-items: flex-start;">
          <div class="card-number-badge">LESSON ${lesson.number}</div>
          <div class="card-tag">${lesson.tag}</div>
        </div>
        <div class="card-icon">${lesson.icon}</div>
      </div>
      
      <div style="margin-top: 4px;">
        <h3 class="card-title">${lesson.title}</h3>
        <div class="card-title-ar">${lesson.titleAr}</div>
      </div>
      
      <div class="card-description">${lesson.description}</div>
      
      <div class="card-meta">
        <div class="card-meta-item">
          <span>📄</span> ${lesson.slideCount} Slides
        </div>
        <div class="card-meta-item">
          <span>📝</span> Handout
        </div>
        ${offlineBadge}
      </div>
      
      <!-- Progress (static for now) -->
      <div style="display: flex; flex-direction: column; gap: 8px; margin-top: auto; padding-top: 14px; border-top: 1px solid var(--border-subtle);">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div class="card-status-badge ${statusClass}">${statusText}</div>
          <div style="font-size: 11px; color: var(--text-muted); font-weight: 700;">0%</div>
        </div>
        <div class="card-progress-bar-track">
          <div class="card-progress-bar-fill" style="width: 0%;"></div>
        </div>
      </div>
      
      <div class="card-bottom" style="margin-top: 8px;">
        <button class="card-cta-btn">Start Lesson <span>→</span></button>
      </div>
    `;

    gridContainer.appendChild(card);
  }
});
