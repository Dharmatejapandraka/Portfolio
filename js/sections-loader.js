/* =========================================================
   SECTIONS-LOADER.JS
   Fetches each section's standalone HTML partial from /sections
   and injects it into its placeholder in index.html.

   NOTE: fetch() of local files is blocked by the browser's CORS
   policy when index.html is opened directly as a file:// URL.
   Serve this folder with a local server, for example:
     python3 -m http.server 8000
   then open http://localhost:8000
   (Any static server — VS Code "Live Server", `npx serve`, etc. — works too.)
   ========================================================= */

(function () {
  const SECTIONS = [
    { id: 'navbar-placeholder', file: 'sections/navbar.html' },
    { id: 'hero-placeholder', file: 'sections/hero.html' },
    { id: 'about-placeholder', file: 'sections/about.html' },
    { id: 'skills-placeholder', file: 'sections/skills.html' },
    { id: 'projects-placeholder', file: 'sections/projects.html' },
    { id: 'certificates-placeholder', file: 'sections/certificates.html' },
    { id: 'education-placeholder', file: 'sections/education.html' },
    { id: 'contact-placeholder', file: 'sections/contact.html' },
    { id: 'footer-placeholder', file: 'sections/footer.html' },
  ];

  async function loadSection({ id, file }) {
    const target = document.getElementById(id);
    if (!target) return;
    try {
      const res = await fetch(file, { cache: 'no-store' });
      if (!res.ok) throw new Error(`${file} responded ${res.status}`);
      target.innerHTML = await res.text();
    } catch (err) {
      target.innerHTML = `<p style="padding:2rem;color:#ef4444;font-family:monospace;">
        Could not load ${file}. Serve this site with a local server
        (e.g. <code>python3 -m http.server</code>) instead of opening index.html directly.
      </p>`;
      console.error('Section load failed:', err);
    }
  }

  async function loadAllSections() {
    await Promise.all(SECTIONS.map(loadSection));
  }

  window.PortfolioSectionsLoader = { loadAllSections };
})();
