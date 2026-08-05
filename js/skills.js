/* =========================================================
   SKILLS.JS — category tab switching + progress bar fill on view
   ========================================================= */

(function () {
  function fillBars(panel) {
    panel.querySelectorAll('.skill-bar-fill').forEach((bar) => {
      const pct = bar.dataset.percent || 0;
      requestAnimationFrame(() => { bar.style.width = pct + '%'; });
    });
  }

  function initSkills() {
    const tabs = document.querySelectorAll('.skills-tab');
    const panels = document.querySelectorAll('.skill-panel');
    if (!tabs.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));
        tab.classList.add('active');
        const target = document.getElementById(tab.dataset.target);
        if (target) {
          target.classList.add('active');
          fillBars(target);
        }
      });
    });

    // Fill bars for the first, already-active panel once it scrolls into view
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const activePanel = document.querySelector('.skill-panel.active');
            if (activePanel) fillBars(activePanel);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    const skillsSection = document.getElementById('skills');
    if (skillsSection) observer.observe(skillsSection);
  }
  window.PortfolioSkills = { initSkills };
})();
