/* ═══════════════════════════════════════════════════════════════
   LK COMUNICAÇÃO DIGITAL · interactions & animations
   ═══════════════════════════════════════════════════════════════ */

/* ── NAV scroll state ── */
(function () {
  const nav = document.getElementById('nav');
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Mobile nav toggle ── */
(function () {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ── Scroll-reveal (Intersection Observer) ── */
(function () {
  const els = document.querySelectorAll('[data-reveal], [data-reveal-right]');
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Number(delay));
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  /* stagger children in grids */
  const grids = document.querySelectorAll(
    '.problemas__grid, .solucao__grid, .servicos__grid, .diferenciais__grid, .processo__steps, .depoimentos-grid, .metricas-grid'
  );
  grids.forEach(grid => {
    const children = grid.querySelectorAll('[data-reveal]');
    children.forEach((child, i) => {
      child.dataset.delay = i * 90;
    });
  });

  els.forEach(el => io.observe(el));
})();

/* ── Smooth anchor scroll (iOS fix) ── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('nav')?.offsetHeight || 72;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ── Counter animation for metrics ── */
(function () {
  function animateCounter(el) {
    const raw   = el.textContent.trim();
    const num   = parseFloat(raw.replace(/[^\d.,]/g, '').replace(',', '.'));
    const prefix = raw.match(/^[^0-9]*/)?.[0] || '';
    const suffix = raw.match(/[^0-9.,]+$/)?.[0] || '';
    if (isNaN(num)) return;

    const duration = 1400;
    const start    = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = num * eased;
      const fmt = Number.isInteger(num)
        ? Math.round(current).toLocaleString('pt-BR')
        : current.toFixed(1).replace('.', ',');
      el.textContent = prefix + fmt + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const nums = document.querySelectorAll('.metrica-card__num');
  if (!nums.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  nums.forEach(el => io.observe(el));
})();

/* ── Active nav link on scroll ── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const navH = () => document.getElementById('nav')?.offsetHeight || 72;

  function activate() {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - navH() - 40) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      const active = link.getAttribute('href') === '#' + current;
      link.style.color = active ? 'var(--white)' : '';
      link.style.fontWeight = active ? '700' : '';
    });
  }

  window.addEventListener('scroll', activate, { passive: true });
  activate();
})();
