/* =========================================================
   CONTACT.JS — client-side validation + simulated submit
   (No backend included — hook your own endpoint in submitForm)
   ========================================================= */

(function () {
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !subject || !message) {
        showStatus('Please fill in every field before sending.', 'error');
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      // No backend is wired up. Replace this block with a fetch()
      // call to your own API / form service (e.g. Formspree, EmailJS).
      showStatus('Sending…', '');
      setTimeout(() => {
        showStatus('Message sent! I will get back to you soon.', 'success');
        form.reset();
      }, 900);
    });

    function showStatus(text, type) {
      status.textContent = text;
      status.className = 'form-status' + (type ? ' ' + type : '');
    }
  }
  window.PortfolioContact = { initContactForm };
})();
