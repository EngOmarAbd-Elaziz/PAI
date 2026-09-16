/**
 * DIGITAL COURSE LIBRARY — Desktop Enhancements
 * Custom cursor + ambient mouse glow. Desktop ONLY.
 */

(function () {
  // 1. Desktop Capability Detection — exit immediately on touch/mobile
  const mqlHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  const mqlMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!mqlHover.matches) return;

  // 2. Inject cursor elements into DOM
  const cursorDot  = document.createElement('div');
  const cursorRing = document.createElement('div');
  const mouseGlow  = document.createElement('div');

  cursorDot.className  = 'custom-cursor-dot';
  cursorRing.className = 'custom-cursor-ring';
  mouseGlow.className  = 'ambient-mouse-glow';

  // Start off-screen to avoid flash in corner
  cursorDot.style.opacity  = '0';
  cursorRing.style.opacity = '0';
  mouseGlow.style.opacity  = '0';

  document.body.appendChild(mouseGlow);
  document.body.appendChild(cursorRing);
  document.body.appendChild(cursorDot);

  // 3. State
  let mouseX = -300;
  let mouseY = -300;
  let ringX  = -300;
  let ringY  = -300;

  let isHovering    = false;
  let isCardHovering = false;
  let magneticTarget = null;
  let isVisible = false;

  // Half-sizes for centering:
  // Dot = 6px  → offset 3px
  // Ring = 32px → offset 16px
  // Glow = 600px → offset 300px
  const DOT_OFFSET  = 3;
  const RING_OFFSET = 16;
  const GLOW_OFFSET = 300;

  const SMOOTH = mqlMotion.matches ? 1 : 0.14;

  // 4. Track Mouse
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Show cursors on first mouse move
    if (!isVisible) {
      cursorDot.style.opacity  = '1';
      cursorRing.style.opacity = '1';
      mouseGlow.style.opacity  = '1';
      isVisible = true;
    }

    // Dot: immediate, centered
    if (!magneticTarget) {
      cursorDot.style.transform =
        `translate3d(${mouseX - DOT_OFFSET}px, ${mouseY - DOT_OFFSET}px, 0)`;
    }
  });

  // Hide when mouse leaves window
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity  = '0';
    cursorRing.style.opacity = '0';
    mouseGlow.style.opacity  = '0';
    isVisible = false;
  });
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity  = '1';
    cursorRing.style.opacity = '1';
    mouseGlow.style.opacity  = '1';
    isVisible = true;
  });

  // 5. RAF Loop — Ring (smoothed) + Glow
  function renderLoop() {
    ringX += (mouseX - ringX) * SMOOTH;
    ringY += (mouseY - ringY) * SMOOTH;

    const scale = isHovering ? 1.55 : (isCardHovering ? 1.2 : 1);

    cursorRing.style.transform =
      `translate3d(${ringX - RING_OFFSET}px, ${ringY - RING_OFFSET}px, 0) scale(${scale})`;

    if (!mqlMotion.matches) {
      mouseGlow.style.transform =
        `translate3d(${ringX - GLOW_OFFSET}px, ${ringY - GLOW_OFFSET}px, 0)`;
    }

    // Magnetic effect
    if (magneticTarget && !mqlMotion.matches) {
      const rect    = magneticTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width  / 2;
      const centerY = rect.top  + rect.height / 2;
      const maxPull = 4;
      const clampedX = Math.max(-maxPull, Math.min(maxPull, (mouseX - centerX) * 0.15));
      const clampedY = Math.max(-maxPull, Math.min(maxPull, (mouseY - centerY) * 0.15));

      magneticTarget.style.transform =
        `translate3d(${clampedX}px, ${clampedY}px, 0)`;
      cursorDot.style.transform =
        `translate3d(${centerX + clampedX - DOT_OFFSET}px, ${centerY + clampedY - DOT_OFFSET}px, 0)`;
    }

    requestAnimationFrame(renderLoop);
  }
  requestAnimationFrame(renderLoop);

  // 6. Interaction State Hooks
  document.addEventListener('mouseover', (e) => {
    const t = e.target;

    if (t.closest('a') || t.closest('button')) {
      isHovering = true;
      cursorRing.classList.add('hover-active');
    }

    if (t.closest('.lesson-card') || t.closest('.handout-panel-header')) {
      isCardHovering = true;
      cursorRing.classList.add('card-hover');
    }

    const btn = t.closest('.card-cta-btn') || t.closest('.btn-primary');
    if (btn) {
      magneticTarget = btn;
      btn.style.transition = 'transform 0.1s linear';
    }
  });

  document.addEventListener('mouseout', (e) => {
    const t = e.target;

    if (t.closest('a') || t.closest('button')) {
      isHovering = false;
      cursorRing.classList.remove('hover-active');
    }

    if (t.closest('.lesson-card') || t.closest('.handout-panel-header')) {
      isCardHovering = false;
      cursorRing.classList.remove('card-hover');
    }

    if (magneticTarget && (t.closest('.card-cta-btn') || t.closest('.btn-primary'))) {
      magneticTarget.style.transform  = 'translate3d(0,0,0)';
      magneticTarget.style.transition = 'transform 0.35s cubic-bezier(0.16,1,0.3,1)';
      magneticTarget = null;
    }
  });

  // Click shrink feedback
  document.addEventListener('mousedown', () => {
    cursorRing.style.transform =
      `translate3d(${ringX - RING_OFFSET}px, ${ringY - RING_OFFSET}px, 0) scale(0.75)`;
    cursorRing.style.opacity = '0.6';
  });
  document.addEventListener('mouseup', () => {
    cursorRing.style.opacity = '1';
  });

  // Cleanup if device switches to touch
  mqlHover.addEventListener('change', (e) => {
    const show = e.matches ? '' : 'none';
    cursorDot.style.display  = show;
    cursorRing.style.display = show;
    mouseGlow.style.display  = show;
  });

})();

