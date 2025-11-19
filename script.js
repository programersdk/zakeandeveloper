// === PROFESSIONAL SCRIPT – Zakwan Developer Portfolio 2025 ===
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Initialize AOS with premium settings
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
      duration: 1000,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      offset: 80,
      anchorPlacement: 'top-bottom',
    });
  }

  // === DARK / LIGHT MODE TOGGLE (with system preference + localStorage) ===
  const modeToggle = document.getElementById('modeToggle');
  if (modeToggle) {
    const body = document.body;
    const icon = modeToggle.querySelector('i');

    function setTheme(isDark) {
      if (isDark) {
        body.classList.remove('bg-light', 'text-dark');
        body.classList.add('bg-dark', 'text-light');
        if (icon) icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
      } else {
        body.classList.remove('bg-dark', 'text-light');
        body.classList.add('bg-light', 'text-dark');
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
      }
    }

    // Detect system preference + saved choice
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
      setTheme(false);
    } else {
      setTheme(true);
    }

    modeToggle.addEventListener('click', () => {
      const isDark = body.classList.contains('bg-dark');
      setTheme(!isDark);
    });

    // Listen to system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches);
      }
    });
  }

  // === PRICING TOGGLE – Monthly / Yearly (Smooth & Accessible) ===
  const pricingToggle = document.getElementById('pricingToggle');
  if (pricingToggle) {
    const toggleBubble = pricingToggle.querySelector('.bg-primary');
    const toggleTexts = pricingToggle.querySelectorAll('span.position-relative');
    let isYearly = false;

    pricingToggle.setAttribute('role', 'switch');
    pricingToggle.setAttribute('aria-checked', 'false');
    pricingToggle.setAttribute('tabindex', '0');

    function updatePricingDisplay(showYearly) {
      document.querySelectorAll('.monthly-price').forEach(el => {
        el.classList.toggle('d-none', showYearly);
      });
      document.querySelectorAll('.yearly-price').forEach(el => {
        el.classList.toggle('d-none', !showYearly);
      });

      // Animate bubble
      if (toggleBubble) {
        toggleBubble.style.transform = showYearly ? 'translateX(100%)' : 'translateX(0)';
      }
      if (toggleTexts.length >= 2) {
        toggleTexts[0].style.opacity = showYearly ? '0.6' : '1';
        toggleTexts[1].style.opacity = showYearly ? '1' : '0.6';
      }
      pricingToggle.setAttribute('aria-checked', showYearly);

      // Update badge visibility
      const badge = pricingToggle.querySelector('.badge');
      if (badge) badge.style.opacity = showYearly ? '1' : '0.5';
    }

    function togglePricing() {
      isYearly = !isYearly;
      updatePricingDisplay(isYearly);
    }

    pricingToggle.addEventListener('click', togglePricing);
    pricingToggle.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePricing();
      }
    });
  }

  // === SMOOTH SCROLL FOR NAV LINKS ===
  document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) bsCollapse.hide();
          }
        }
      }
    });
  });

  // === ACTIVE NAV LINK ON SCROLL ===
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  
  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  // === FORM SUCCESS ANIMATION (Optional – works with Formspree/Netlify Forms) ===
  const contactForm = document.getElementById('contactForm') || document.querySelector('#contact form');
  if (contactForm && window.location.search.includes('success')) {
    contactForm.innerHTML = `
      <div class="text-center py-5">
        <i class="fas fa-check-circle text-success display-1 mb-4"></i>
        <h3>Thank You!</h3>
        <p>I'll get back to you within 24 hours ⚡</p>
      </div>`;
  }
});
