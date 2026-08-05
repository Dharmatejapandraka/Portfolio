/* =========================================================
   LOADER.JS — hides the loading screen once page is ready
   ========================================================= */

(function () {
  function hideLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    loader.classList.add('loaded');
    setTimeout(() => loader.remove(), 700);
  }

  window.PortfolioLoader = { hideLoader };

  // Hide once everything (images, scripts, etc.) has finished loading.
  window.addEventListener('load', hideLoader);

  // Safety net: if something else on the page errors out and 'load'
  // never properly resolves the rest of the init chain, force the
  // loader closed anyway after 4 seconds so the site never gets stuck.
  setTimeout(hideLoader, 4000);
})();