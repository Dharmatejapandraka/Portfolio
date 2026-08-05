(function () {
  function initCursor() {
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.append(dot, glow);

    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    // Smooth trailing glow ring
    function animateGlow() {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // Grow the glow over interactive elements
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, .tilt-card, input, textarea')) {
        glow.classList.add('hovered');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, .tilt-card, input, textarea')) {
        glow.classList.remove('hovered');
      }
    });
  }
  window.PortfolioCursor = { initCursor };
})();
