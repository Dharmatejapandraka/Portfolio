/* =========================================================
   TYPING.JS — hero role typewriter effect
   ========================================================= */

(function () {
  const roles = [
    'Full Stack Developer',
    'Frontend Developer',
    'MERN Stack Developer',
    'Problem Solver',
  ];

  function initTyping() {
    const el = document.getElementById('typingText');
    if (!el) return;

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const currentRole = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        el.textContent = currentRole.slice(0, charIndex);
        if (charIndex === currentRole.length) {
          deleting = true;
          setTimeout(tick, 1600); // pause at full word
          return;
        }
      } else {
        charIndex--;
        el.textContent = currentRole.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 45 : 90);
    }
    tick();
  }
  window.PortfolioTyping = { initTyping };
})();
