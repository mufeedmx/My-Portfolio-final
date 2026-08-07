/* =========================================================
   MUHAMMAD MUFEED — PORTFOLIO SCRIPT
   Pure Vanilla JavaScript — no dependencies
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. LOADER
  --------------------------------------------------------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 600);
  });

  /* ---------------------------------------------------------
     2. THEME TOGGLE (Light / Dark)
  --------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  root.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });

  /* ---------------------------------------------------------
     3. CUSTOM CURSOR
  --------------------------------------------------------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      cursorOutline.animate(
        { left: `${e.clientX}px`, top: `${e.clientY}px` },
        { duration: 400, fill: 'forwards' }
      );
    });

    const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-category, input, textarea');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => cursorOutline.classList.add('grow'));
      el.addEventListener('mouseleave', () => cursorOutline.classList.remove('grow'));
    });
  }

  /* ---------------------------------------------------------
     4. ANIMATED BACKGROUND PARTICLES
  --------------------------------------------------------- */
  const bgAnimation = document.getElementById('bgAnimation');
  const particleCount = window.innerWidth < 768 ? 18 : 35;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('span');
    particle.classList.add('particle');
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = `-10px`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 10}s`;
    bgAnimation.appendChild(particle);
  }

  /* ---------------------------------------------------------
     5. STICKY NAVBAR ON SCROLL
  --------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTop');

  function handleScrollEffects() {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 40);
    scrollTopBtn.classList.toggle('show', scrollY > 500);
  }
  window.addEventListener('scroll', handleScrollEffects);
  handleScrollEffects();

  /* ---------------------------------------------------------
     6. MOBILE HAMBURGER MENU
  --------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  const overlay = document.createElement('div');
  overlay.classList.add('nav-overlay');
  document.body.appendChild(overlay);

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  /* ---------------------------------------------------------
     7. SMOOTH SCROLL + CLOSE MENU ON NAV CLICK
  --------------------------------------------------------- */
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const offsetTop = targetEl.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
      if (navMenu.classList.contains('active')) toggleMenu();
    });
  });

  /* ---------------------------------------------------------
     8. ACTIVE NAV LINK HIGHLIGHTING WHILE SCROLLING
  --------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    const scrollPos = window.scrollY + 120;
    let currentId = sections[0]?.id;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }
  window.addEventListener('scroll', highlightNav);
  highlightNav();

  /* ---------------------------------------------------------
     9. SCROLL TO TOP BUTTON
  --------------------------------------------------------- */
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------------------------------------------
     10. TYPING EFFECT (Hero Roles)
  --------------------------------------------------------- */
  const typingText = document.getElementById('typingText');
  const roles = ['Web Developer', 'App Developer', 'Data Analyst', 'Software Developer'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      typingText.textContent = currentRole.substring(0, charIndex);
    } else {
      charIndex++;
      typingText.textContent = currentRole.substring(0, charIndex);
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }

    setTimeout(typeLoop, speed);
  }
  typeLoop();

  /* ---------------------------------------------------------
     11. SCROLL REVEAL ANIMATIONS (Intersection Observer)
  --------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-up');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ---------------------------------------------------------
     12. STATS COUNTER ANIMATION
  --------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    let current = 0;
    const duration = 1500;
    const stepTime = Math.max(Math.floor(duration / target), 20);

    const timer = setInterval(() => {
      current++;
      el.textContent = current;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      }
    }, stepTime);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach((el) => counterObserver.observe(el));

  /* ---------------------------------------------------------
     13. SKILL PROGRESS BAR ANIMATION
  --------------------------------------------------------- */
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = `${width}%`;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach((bar) => skillObserver.observe(bar));

  /* ---------------------------------------------------------
     14. BUTTON RIPPLE EFFECT
  --------------------------------------------------------- */
  const rippleButtons = document.querySelectorAll('.ripple');

  rippleButtons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);

      ripple.classList.add('ripple-effect');
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  /* ---------------------------------------------------------
     15. CONTACT FORM VALIDATION (front-end only)
  --------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  const fields = {
    name: { el: document.getElementById('name'), error: document.getElementById('nameError') },
    email: { el: document.getElementById('email'), error: document.getElementById('emailError') },
    subject: { el: document.getElementById('subject'), error: document.getElementById('subjectError') },
    message: { el: document.getElementById('message'), error: document.getElementById('messageError') },
  };

  function validateField(key) {
    const { el, error } = fields[key];
    const value = el.value.trim();
    let message = '';

    if (value === '') {
      message = 'This field is required.';
    } else if (key === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) message = 'Please enter a valid email address.';
    } else if (key === 'name' && value.length < 2) {
      message = 'Name must be at least 2 characters.';
    } else if (key === 'message' && value.length < 10) {
      message = 'Message should be at least 10 characters.';
    }

    error.textContent = message;
    el.classList.toggle('invalid', message !== '');
    return message === '';
  }

  Object.keys(fields).forEach((key) => {
    fields[key].el.addEventListener('blur', () => validateField(key));
    fields[key].el.addEventListener('input', () => {
      if (fields[key].el.classList.contains('invalid')) validateField(key);
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const results = Object.keys(fields).map((key) => validateField(key));
    const isValid = results.every(Boolean);

    if (isValid) {
      formSuccess.classList.add('show');
      contactForm.reset();

      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 5000);
    } else {
      formSuccess.classList.remove('show');
    }
  });

});
