/* =========================================================
   NAVBAR.JS — sticky glass effect, mobile menu, active link,
   back-to-top button
   ========================================================= */

(function () {
  function initNavbar() {
    const nav = document.getElementById('mainNavbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const backToTop = document.getElementById('backToTop');
    if (!nav) return;

    // Glassmorphism after scrolling
    function onScroll() {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      if (backToTop) {
        backToTop.classList.toggle('show', window.scrollY > 500);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile hamburger toggle
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
      });
      navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navLinks.classList.remove('open');
        });
      });
    }

    // Back to top
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Active link highlighting via IntersectionObserver
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a[href^="#"]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            links.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
  }
  window.PortfolioNavbar = { initNavbar };
})();
