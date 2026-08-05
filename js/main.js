/* =========================================================
   MAIN.JS
   Entry point: loads every section partial, then wires up
   all feature modules once the real DOM nodes exist.
   ========================================================= */

function safeInit(label, fn) {
  try {
    fn();
  } catch (err) {
    console.error(`[init failed] ${label}:`, err);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Theme must apply before paint-sensitive content shows
  safeInit('theme', () => window.PortfolioTheme.initTheme());

  // 2. Global effects that don't depend on injected sections
  safeInit('cursor', () => window.PortfolioCursor.initCursor());
  safeInit('scrollProgress', () => window.PortfolioScrollProgress.initScrollProgress());

  // 3. Fetch and inject every section partial
  await window.PortfolioSectionsLoader.loadAllSections();

  // 4. Now that the real markup exists, wire up everything else —
  //    each on its own safeInit so one failure can't block the rest
  safeInit('theme.bindToggle', () => window.PortfolioTheme.bindToggle());
  safeInit('navbar', () => window.PortfolioNavbar.initNavbar());
  safeInit('typing', () => window.PortfolioTyping.initTyping());
  safeInit('counters', () => window.PortfolioCounters.initCounters());
  safeInit('skills', () => window.PortfolioSkills.initSkills());
  safeInit('projects.carousel', () => window.PortfolioProjects.init3DCarousel());
  safeInit('projects.tilt', () => window.PortfolioProjects.initTilt());
  safeInit('certificates', () => window.PortfolioCertificates.initCertModal());
  safeInit('contact', () => window.PortfolioContact.initContactForm());
  safeInit('effects.ripple', () => window.PortfolioEffects.initRipple());
  safeInit('effects.reveal', () => window.PortfolioEffects.initReveal());

  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 5. Hide the loading screen last, once content is in place
  window.PortfolioLoader.hideLoader();
});