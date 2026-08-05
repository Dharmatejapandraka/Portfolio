/* =========================================================
   MAIN.JS
   Entry point: loads every section partial, then wires up
   all feature modules once the real DOM nodes exist.
   ========================================================= */

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Theme must apply before paint-sensitive content shows
  window.PortfolioTheme.initTheme();

  // 2. Global effects that don't depend on injected sections
  window.PortfolioCursor.initCursor();
  window.PortfolioScrollProgress.initScrollProgress();

  // 3. Fetch and inject every section partial
  await window.PortfolioSectionsLoader.loadAllSections();

  // 4. Now that the real markup exists, wire up everything else
  try {
    window.PortfolioTheme.bindToggle();
    window.PortfolioNavbar.initNavbar();
    window.PortfolioTyping.initTyping();
    window.PortfolioCounters.initCounters();
    window.PortfolioSkills.initSkills();
    window.PortfolioProjects.init3DCarousel();
    window.PortfolioProjects.initTilt();
    window.PortfolioCertificates.initCertModal();
    window.PortfolioContact.initContactForm();
    window.PortfolioEffects.initRipple();
    window.PortfolioEffects.initReveal();
  } catch (err) {
    console.error('One or more section modules failed to init:', err);
  }

  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  window.PortfolioLoader.hideLoader();
});