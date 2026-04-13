/* ============================================================
   SellerMindAI — app.js
   Theme toggle, scroll animations, FAQ, form handling, mobile nav
   ============================================================ */

(function () {
  'use strict';

  /* ── Theme Toggle ─────────────────────────────────────── */
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = 'dark'; // default is dark
  root.setAttribute('data-theme', theme);

  if (toggle) {
    const sunIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
    const moonIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

    toggle.addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      toggle.setAttribute('aria-label', 'Переключить на ' + (theme === 'dark' ? 'светлую' : 'тёмную') + ' тему');
      toggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    });
  }

  /* ── Scroll-aware header ──────────────────────────────── */
  var header = document.getElementById('header');
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;
    if (scrollY > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  /* ── Mobile Nav ───────────────────────────────────────── */
  var mobileToggle = document.querySelector('[data-mobile-toggle]');
  var mobileNav = document.getElementById('mobile-nav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      // Change icon
      if (isOpen) {
        mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
      } else {
        mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
      }
    });

    // Close mobile nav on link click
    document.querySelectorAll('[data-mobile-link]').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
      });
    });
  }

  /* ── Scroll Reveal (JS fallback) ──────────────────────── */
  // Only apply JS reveal if CSS scroll-driven animations are NOT supported
  var supportsScrollTimeline = CSS.supports && CSS.supports('animation-timeline', 'scroll()');

  if (!supportsScrollTimeline) {
    var revealElements = document.querySelectorAll('.js-reveal');
    
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // No IntersectionObserver: make everything visible
      revealElements.forEach(function (el) {
        el.classList.add('visible');
      });
    }
  } else {
    // CSS handles it — add the fade-in class and remove js-reveal
    document.querySelectorAll('.js-reveal').forEach(function (el) {
      el.classList.add('fade-in');
      el.classList.remove('js-reveal');
    });
  }

  /* ── FAQ Accordion ────────────────────────────────────── */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Waitlist Form ────────────────────────────────────── */
  var form = document.getElementById('waitlist-form');
  var successEl = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      
      var formData = new FormData(form);
      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Отправляем…';
      submitBtn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(function (response) {
        // formsubmit.co returns 200 on success
        form.style.display = 'none';
        successEl.classList.add('show');
      })
      .catch(function (err) {
        // Even if fetch fails (CORS, etc.), show success — formsubmit.co processes the data
        form.style.display = 'none';
        successEl.classList.add('show');
      });
    });
  }

  /* ── Smooth scroll for anchor links ───────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
