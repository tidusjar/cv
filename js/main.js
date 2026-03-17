(function () {
  'use strict';

  // === Theme Toggle ===
  var themeToggle = document.querySelector('.sidebar__theme-toggle');
  var themeIcon = themeToggle.querySelector('i');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }

  // Load saved theme or default to dark
  var savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  themeToggle.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // === Expandable Cards ===
  document.querySelectorAll('[data-expandable]').forEach(function (card) {
    var header = card.querySelector('.exp-card__header');

    header.addEventListener('click', function () {
      var isExpanded = card.classList.contains('exp-card--expanded');

      if (isExpanded) {
        card.classList.remove('exp-card--expanded');
        header.setAttribute('aria-expanded', 'false');
      } else {
        card.classList.add('exp-card--expanded');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // === Scroll Spy ===
  var navLinks = document.querySelectorAll('.sidebar__link');
  var sections = document.querySelectorAll('.section');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.remove('sidebar__link--active');
          if (link.getAttribute('data-section') === id) {
            link.classList.add('sidebar__link--active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
