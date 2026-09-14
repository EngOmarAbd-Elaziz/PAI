/**
 * DIGITAL COURSE LIBRARY — Lesson Player Logic
 * Handles dynamic rendering of slides and the interactive handout
 */

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Get Lesson ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const lessonId = urlParams.get('id') || 'lesson-01'; // Default for testing

  // 2. Find Lesson Data
  const lessonData = LESSONS.find(l => l.id === lessonId);
  if (!lessonData) {
    document.getElementById('lesson-root').innerHTML = `
      <div style="text-align: center; padding: 100px; color: #ef4444;">
        <h2>Error: Lesson Not Found</h2>
        <a href="index.html" style="color: var(--accent-cyan);">Return to Library</a>
      </div>
    `;
    return;
  }

  // 3. Populate Hero Meta
  document.getElementById('hero-tag').textContent = `LESSON ${lessonData.number} • ${lessonData.tag}`;
  document.getElementById('hero-title').textContent = lessonData.title;
  document.getElementById('hero-title-ar').textContent = lessonData.titleAr;
  document.getElementById('hero-desc').textContent = lessonData.description;
  document.getElementById('hero-icon').textContent = lessonData.icon;
  
  // Apply theme color
  const root = document.documentElement;
  root.style.setProperty('--lesson-accent', `var(--accent-${lessonData.color})`);
  
  // 4. Render Handout
  renderHandout(lessonData.handout);

  // 5. Fetch and Setup Slides
  await loadSlides(lessonData.slidesFile);
});

/* ── Handout Rendering ──────────────────────────────────────────────────── */

function renderHandout(handoutData) {
  const container = document.getElementById('handout-content');
  const countBadge = document.getElementById('handout-items-count');
  
  if (!handoutData || handoutData.length === 0) {
    container.innerHTML = '<div style="color: var(--text-dim); text-align: center;">No handout available for this lesson.</div>';
    return;
  }

  countBadge.textContent = `${handoutData.filter(i => i.type === 'concept' || i.type === 'code' || i.type === 'rule').length} items`;
  
  let html = '';
  
  handoutData.forEach(item => {
    switch(item.type) {
      case 'section-heading':
        html += `
          <div class="handout-section-heading">
            <h3>${item.text}</h3>
            ${item.subtext ? `<div class="subtext">${item.subtext}</div>` : ''}
          </div>
        `;
        break;
        
      case 'concept':
        html += `
          <div class="handout-concept">
            <h4><span>💡</span> ${item.title}</h4>
            <p>${item.text}</p>
            ${item.ar ? `<div class="ar-text">${item.ar}</div>` : ''}
          </div>
        `;
        break;
        
      case 'rule':
        html += `
          <div class="handout-rule ${item.color || 'cyan'}">
            <span style="font-size: 18px; margin-top: 2px;">📌</span>
            <div>${item.text}</div>
          </div>
        `;
        break;
        
      case 'code':
        html += `
          <div class="handout-code-block">
            <div class="handout-code-label">
              <div class="handout-code-dots"><span></span><span></span><span></span></div>
              ${item.label || item.lang}
            </div>
            <pre><code>${escapeHtml(item.text)}</code></pre>
          </div>
        `;
        break;
        
      case 'types-grid':
        html += `<div class="handout-types-grid">`;
        item.types.forEach(t => {
          html += `
            <div class="handout-type-card" style="border-top: 3px solid var(--accent-${t.color});">
              <div class="handout-type-icon">${t.icon}</div>
              <div class="handout-type-name">${t.name}</div>
              <div class="handout-type-desc">${t.desc}</div>
              <div class="handout-type-example">${escapeHtml(t.example)}</div>
            </div>
          `;
        });
        html += `</div>`;
        break;
        
      case 'mistakes-grid':
        html += `<div class="handout-mistakes-grid">`;
        item.mistakes.forEach(m => {
          html += `
            <div class="handout-mistake-card">
              <div class="handout-mistake-title">${m.title}</div>
              <div class="handout-mistake-desc">${m.desc}</div>
            </div>
          `;
        });
        html += `</div>`;
        break;
    }
  });
  
  container.innerHTML = html;

  // Setup accordion toggle
  const panel = document.getElementById('handout-panel');
  const toggle = document.getElementById('handout-toggle');
  
  toggle.addEventListener('click', () => {
    panel.classList.toggle('open');
  });
}

// Utility to prevent HTML injection in code blocks
function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ── Slide Player Logic ─────────────────────────────────────────────────── */

let currentSlideIndex = 0;
let slides = [];

async function loadSlides(fileUrl) {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    const htmlText = await response.text();
    
    // Inject slides into stage
    const stage = document.getElementById('slide-stage');
    stage.innerHTML = htmlText;
    
    // Select all slide elements
    slides = Array.from(stage.querySelectorAll('.slide'));
    
    if (slides.length === 0) {
      stage.innerHTML = '<div style="padding: 20px;">No slides found in file.</div>';
      return;
    }
    
    document.getElementById('progress-total').textContent = slides.length;
    
    // Initialize Player
    setupSlideControls();
    generateGridModal();
    showSlide(0);
    
  } catch (error) {
    console.error('Error loading slides:', error);
    document.getElementById('slide-stage').innerHTML = `
      <div style="color: #ef4444; padding: 20px; text-align: center;">
        Failed to load lesson slides. Make sure you are running a local server.
      </div>
    `;
  }
}

function showSlide(index) {
  if (index < 0 || index >= slides.length) return;
  
  // Hide current
  if (slides[currentSlideIndex]) {
    slides[currentSlideIndex].classList.remove('active');
  }
  
  // Update state
  currentSlideIndex = index;
  
  // Show new
  slides[currentSlideIndex].classList.add('active');
  
  // Update UI Meta
  document.getElementById('progress-current').textContent = currentSlideIndex + 1;
  document.getElementById('slide-nav-meta').textContent = `Slide ${currentSlideIndex + 1} / ${slides.length}`;
  
  // Update Progress Bar
  const progressPercent = ((currentSlideIndex + 1) / slides.length) * 100;
  document.getElementById('progress-bar').style.width = `${progressPercent}%`;
  
  // Update button states
  document.getElementById('btn-prev').disabled = currentSlideIndex === 0;
  document.getElementById('btn-next').disabled = currentSlideIndex === slides.length - 1;
  
  // Sync grid selection
  updateGridSelection();
  
  // Reset any open interactions in the new slide
  resetInteractions(slides[currentSlideIndex]);
}

function setupSlideControls() {
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  
  btnPrev.addEventListener('click', () => showSlide(currentSlideIndex - 1));
  btnNext.addEventListener('click', () => showSlide(currentSlideIndex + 1));
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Prevent interfering with modal if open
    if (document.getElementById('grid-modal').classList.contains('open')) {
      if (e.key === 'Escape') toggleGridModal();
      return;
    }
    
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault(); // prevent page scroll for space
      showSlide(currentSlideIndex + 1);
    }
    else if (e.key === 'ArrowLeft') {
      showSlide(currentSlideIndex - 1);
    }
    else if (e.key === 'g' || e.key === 'G') {
      toggleGridModal();
    }
  });

  // Setup Interaction Buttons inside slides
  document.getElementById('slide-stage').addEventListener('click', (e) => {
    const btn = e.target.closest('.think-btn-reveal');
    if (btn) {
      const container = btn.closest('.think-card');
      const answer = container.querySelector('.revealed-answer');
      if (answer) {
        answer.classList.add('open');
        btn.style.display = 'none';
      }
    }
    
    const reviewItem = e.target.closest('.review-item');
    if (reviewItem) {
      reviewItem.classList.toggle('revealed');
    }
  });
}

function resetInteractions(slideElement) {
  // Reset reveal buttons
  const reveals = slideElement.querySelectorAll('.revealed-answer');
  const buttons = slideElement.querySelectorAll('.think-btn-reveal');
  
  reveals.forEach(r => r.classList.remove('open'));
  buttons.forEach(b => b.style.display = 'flex');
  
  // Reset review items
  const reviews = slideElement.querySelectorAll('.review-item');
  reviews.forEach(r => r.classList.remove('revealed'));
}

/* ── Grid Modal ─────────────────────────────────────────────────────────── */

function generateGridModal() {
  const container = document.getElementById('grid-container');
  container.innerHTML = '';
  
  slides.forEach((slide, idx) => {
    // Attempt to extract title/tag from the slide content
    const titleEl = slide.querySelector('.slide-title');
    const tagEl = slide.querySelector('.slide-tag');
    
    const title = titleEl ? titleEl.textContent : `Slide ${idx + 1}`;
    const tag = tagEl ? tagEl.textContent : 'Content';
    
    const item = document.createElement('div');
    item.className = 'grid-item';
    item.setAttribute('data-index', idx);
    
    item.innerHTML = `
      <div class="grid-num">${String(idx + 1).padStart(2, '0')}</div>
      <div class="grid-name">${title}</div>
      <div class="grid-cat">${tag}</div>
    `;
    
    item.addEventListener('click', () => {
      showSlide(idx);
      toggleGridModal();
    });
    
    container.appendChild(item);
  });
  
  document.getElementById('btn-grid-toggle').addEventListener('click', toggleGridModal);
  document.getElementById('btn-grid-close').addEventListener('click', toggleGridModal);
}

function toggleGridModal() {
  const modal = document.getElementById('grid-modal');
  modal.classList.toggle('open');
  if (modal.classList.contains('open')) {
    updateGridSelection();
    // Scroll active item into view
    const active = modal.querySelector('.grid-item.active');
    if (active) active.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function updateGridSelection() {
  const items = document.querySelectorAll('.grid-item');
  items.forEach(item => {
    if (parseInt(item.getAttribute('data-index')) === currentSlideIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}
