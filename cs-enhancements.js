/* Mejoras UX compartidas para páginas de caso de estudio:
   barra de progreso de lectura, botón volver-arriba y caso actual en el dropdown. */
(function () {
  'use strict';

  function getLang() {
    return document.documentElement.classList.contains('lang-en') ? 'en' : 'es';
  }

  /* ── Barra de progreso de lectura ── */
  var progress = document.createElement('div');
  progress.className = 'cs-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  /* ── Botón volver arriba ── */
  var toTop = document.createElement('button');
  toTop.className = 'back-to-top';
  toTop.type = 'button';
  toTop.setAttribute('aria-label', getLang() === 'en' ? 'Back to top' : 'Volver arriba');
  toTop.innerHTML = '↑';
  toTop.addEventListener('click', function () {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });
  document.body.appendChild(toTop);

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = pct + '%';
      toTop.classList.toggle('visible', window.scrollY > 600);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Marcar el caso actual en el dropdown de navegación ── */
  var here = location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('.cs-dropdown-item').forEach(function (item) {
    var href = (item.getAttribute('href') || '').split('/').pop().replace('.html', '');
    if (href === here) {
      item.classList.add('current');
      item.setAttribute('aria-current', 'page');
    }
  });
})();
