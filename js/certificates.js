/* =========================================================
   CERTIFICATES.JS — 3D coverflow carousel
   ========================================================= */

(function () {
  function initCert3D() {
    const cards = document.querySelectorAll('.cert-3d-card');
    const dots = document.querySelectorAll('.cert-3d-dot');
    const prevBtn = document.getElementById('cert3dPrev');
    const nextBtn = document.getElementById('cert3dNext');
    const stage = document.getElementById('cert3dStage');
    if (!cards.length) return;

    const total = cards.length;
    let current = 0;

    function positionClass(offset) {
      // offset is the distance from current, wrapped to shortest path
      if (offset === 0) return 'pos-center';
      if (offset === 1) return 'pos-right1';
      if (offset === -1) return 'pos-left1';
      if (offset === 2) return 'pos-right2';
      if (offset === -2) return 'pos-left2';
      return 'pos-hidden';
    }

    function wrappedOffset(index) {
      let diff = index - current;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
      return diff;
    }

    function render() {
      cards.forEach((card, i) => {
        card.className = 'cert-3d-card ' + positionClass(wrappedOffset(i));
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function goTo(index) {
      current = (index + total) % total;
      render();
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    cards.forEach((card, i) => {
      card.addEventListener('click', () => {
        if (i === current) return;
        goTo(i);
      });
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => goTo(parseInt(dot.dataset.certIndex, 10)));
    });

    // Keyboard nav when in view
    document.addEventListener('keydown', (e) => {
      const rect = stage.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    });

    // Mouse wheel scroll to navigate (debounced)
    let wheelLock = false;
    stage.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (wheelLock) return;
      wheelLock = true;
      if (e.deltaY > 0 || e.deltaX > 0) goTo(current + 1);
      else goTo(current - 1);
      setTimeout(() => { wheelLock = false; }, 450);
    }, { passive: false });

    // Touch swipe
    let touchStartX = 0;
    stage.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
    }, { passive: true });

    render();
  }

  window.PortfolioCertificates = { initCertModal: initCert3D };
})();