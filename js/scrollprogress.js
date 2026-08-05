/* =========================================================
   SCROLLPROGRESS.JS — top progress bar tied to scroll position
   ========================================================= */

(function () {
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }
  window.PortfolioScrollProgress = { initScrollProgress };
})();
