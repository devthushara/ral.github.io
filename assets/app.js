(() => {
  const headerInner = document.querySelector('[data-header-inner]');
  const menuBtn = document.querySelector('[data-menu-btn]');
  const nav = document.querySelector('[data-nav]');

  if (menuBtn && headerInner) {
    menuBtn.addEventListener('click', () => {
      const isOpen = headerInner.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    nav?.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      headerInner.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  }

  // Simple hero background slider (keeps same images, modern presentation)
  const slides = Array.from(document.querySelectorAll('[data-hero-slide]'));
  let index = 0;

  const activate = (i) => {
    slides.forEach((el, idx) => el.classList.toggle('is-active', idx === i));
  };

  if (slides.length > 0) {
    activate(0);
    const intervalMs = 5000;
    window.setInterval(() => {
      index = (index + 1) % slides.length;
      activate(index);
    }, intervalMs);
  }

  // Update active nav link based on scroll position
  const sectionIds = ['home', 'about', 'services', 'work', 'news', 'contact'];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const navLinks = Array.from(document.querySelectorAll('[data-nav] a[href^="#"]'));

  const setCurrent = (id) => {
    navLinks.forEach((a) => {
      const isCurrent = a.getAttribute('href') === `#${id}`;
      if (isCurrent) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  };

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setCurrent(visible.target.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: [0.1, 0.2, 0.35] }
    );

    sections.forEach((s) => observer.observe(s));
  }
})();
