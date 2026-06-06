/* ============================================================
   NAV — scroll state + mobile toggle
   ============================================================ */
const nav = document.getElementById('nav');
const navToggle = nav.querySelector('.nav__toggle');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

navToggle.addEventListener('click', () => {
  nav.classList.toggle('mobile-open');
});

nav.querySelectorAll('.nav__mobile a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('mobile-open'));
});

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealTargets = () => {
  document.querySelectorAll([
    '.section-label',
    '.section-title',
    '.about__bio',
    '.about__stats',
    '.expertise__card',
    '.work__item',
    '.approach__quote',
    '.pillar',
    '.contact__title',
    '.contact__sub',
    '.contact__link',
    '.hero__eyebrow',
    '.hero__tagline',
    '.hero__cta',
  ].join(',')).forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });
};

revealTargets();

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ============================================================
   HERO NAME — staggered entrance
   ============================================================ */
const heroFirst = document.querySelector('.hero__name--first');
const heroLast  = document.querySelector('.hero__name--last');

if (heroFirst && heroLast) {
  [heroFirst, heroLast].forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.9s ease ${0.1 + i * 0.15}s, transform 0.9s ease ${0.1 + i * 0.15}s`;
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
}

/* ============================================================
   SMOOTH ACTIVE NAV LINK HIGHLIGHT
   ============================================================ */
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--ink)';
          }
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));

/* ============================================================
   EXPERTISE CARD — subtle parallax on mouse
   ============================================================ */
document.querySelectorAll('.expertise__card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect  = card.getBoundingClientRect();
    const xPct  = (e.clientX - rect.left) / rect.width  - 0.5;
    const yPct  = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translate(${xPct * 4}px, ${yPct * 4}px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
