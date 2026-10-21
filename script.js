/* =========================================================
   TomFi – drobné interakce webu
   Web funguje i bez JavaScriptu, tady jsou jen vylepšení.
   ========================================================= */

// Aktuální rok v patičce
const rok = document.getElementById('rok');
if (rok) rok.textContent = new Date().getFullYear();

// Plynulé objevování prvků při posouvání stránky
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealItems.forEach((item, index) => {
    // karty vedle sebe naskakují postupně
    item.style.transitionDelay = `${(index % 3) * 90}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Zvýraznění aktuální sekce v horní navigaci (na počítači)
const navLinks = document.querySelectorAll('.nav a');
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach((section) => navObserver.observe(section));
}

// Krátké oznámení dole na obrazovce
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

// Odkazy, které ještě nejsou doplněné (atribut data-doplnit), zatím nikam nevedou
document.querySelectorAll('[data-doplnit]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    showToast('Tento odkaz bude brzy doplněn.');
  });
});
