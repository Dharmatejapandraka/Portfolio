/* =========================================================
   PROJECTS.JS — manual 3D coverflow carousel (no auto-play)
   ========================================================= */

(function () {
  function init3DCarousel() {
    const stage = document.getElementById('projectsStage');
    const track = document.getElementById('projectsTrack');
    const dotsWrap = document.getElementById('projectDots');
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');

    // If any required element is missing, quietly do nothing instead
    // of throwing an error that could block the rest of the page.
    if (!stage || !track || !dotsWrap || !prevBtn || !nextBtn) return;

    const cards = Array.from(track.querySelectorAll('.project-card'));
    const total = cards.length;
    if (total === 0) return;

    let activeIndex = 0;

    // build the dot navigation
    dotsWrap.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Go to project ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function render() {
      cards.forEach((card, i) => {
        let offset = i - activeIndex;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        const absOffset = Math.abs(offset);
        const xSpacing = 260;
        const x = offset * xSpacing;
        const rotateY = offset * -28;
        const scale = absOffset === 0 ? 1 : 0.82;
        const z = -absOffset * 200;
        const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.28;
        const zIndex = 100 - absOffset;

        card.style.transform =
          `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`;
        card.style.opacity = opacity;
        card.style.zIndex = zIndex;
        card.style.pointerEvents = absOffset > 2 ? 'none' : 'auto';
        card.classList.toggle('is-active', offset === 0);
      });

      dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
    }

    function goTo(index) {
      activeIndex = ((index % total) + total) % total;
      render();
    }

    prevBtn.addEventListener('click', () => goTo(activeIndex - 1));
    nextBtn.addEventListener('click', () => goTo(activeIndex + 1));

    cards.forEach((card, i) => {
      card.addEventListener('click', (e) => {
        if (i !== activeIndex) {
          e.preventDefault();
          goTo(i);
        }
      });
    });

    stage.setAttribute('tabindex', '0');
    stage.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
      if (e.key === 'ArrowRight') goTo(activeIndex + 1);
    });

    let startX = 0;
    let dragging = false;
    stage.addEventListener('pointerdown', (e) => {
      dragging = true;
      startX = e.clientX;
    });
    window.addEventListener('pointerup', (e) => {
      if (!dragging) return;
      dragging = false;
      const delta = e.clientX - startX;
      if (delta > 50) goTo(activeIndex - 1);
      else if (delta < -50) goTo(activeIndex + 1);
    });

    render();
  }

  function initTilt() {
    // For any OTHER