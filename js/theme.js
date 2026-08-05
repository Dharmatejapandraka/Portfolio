/* =========================================================
   THEME.JS
   Handles dark/light theme switching + localStorage persistence.
   ========================================================= */

(function () {
  const STORAGE_KEY = 'portfolio-theme';
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleIcon(theme);
  }

  function updateToggleIcon(theme) {
    const icon = document.querySelector('#themeToggle .toggle-thumb i');
    if (!icon) return;
    icon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const theme = saved || (prefersLight ? 'light' : 'dark');
    applyTheme(theme);
  }

  function bindToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  // Expose so main.js can call after partials are injected
  window.PortfolioTheme = { initTheme, bindToggle };
})();
