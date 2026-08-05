(function () {
  function initRipple() {
    document.querySelectorAll('.btn-glow, .btn-outline, .filter-btn, .skills-tab').forEach((btn) => {
      btn.style.position = btn.style.position || 'relative';
      btn.style.overflow = 'hidden';
      btn.addEventListener('click', function (e) {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
        btn.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });
  }

  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((item) => observer.observe(item));
  }

  window.PortfolioEffects = { initRipple, initReveal };
})();
