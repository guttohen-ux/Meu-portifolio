// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const topScrollBtn = document.querySelector(".top-scroll");
const heroSection = document.querySelector("#hero")


const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => observer.observe(s));

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

revealEls.forEach((el) => revealObserver.observe(el));

// Stagger children inside reveal containers
document.querySelectorAll('[data-stagger]').forEach((parent) => {
  Array.from(parent.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 80}ms`;
  });
});


if (heroSection && topScrollBtn) {
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) { topScrollBtn.classList.add("show") }
      else { topScrollBtn.classList.remove("show") }
    }, { threshold: 0.1 }
    );
  });
  scrollObserver.observe(heroSection);
}

(function () {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

  if (!isMobile) {
    const emailLink = document.querySelector(".contact-email");
    if (emailLink) {
      const emailDestino = "guttohenrycke09@gmail.com";

      emailLink.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailDestino}`;

      emailLink.target = "_blank";
      emailLink.rel = "noopener noreferrer";
    }
  }
})();