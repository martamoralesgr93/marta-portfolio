/* Mejoras UX compartidas para páginas de caso de estudio:
   barra de progreso de lectura, botón volver-arriba, nudge "¿Hablamos?"
   en el chatbot y caso actual en el dropdown. */
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

  /* Hasta que se alcanza el 25% de scroll (cuando aparece el botón volver-arriba)
     o se abre el chat, una burbuja junto al chatbot invita a "¿Hablamos?". */
  var chatTrigger = document.getElementById('chat-trigger');
  var reachedThreshold = false;

  var bubble = document.createElement('div');
  bubble.className = 'chat-nudge-bubble';
  bubble.setAttribute('role', 'button');
  bubble.setAttribute('tabindex', '0');
  bubble.innerHTML = '<span><span class="es">¿Hablamos?</span><span class="en">Let\'s talk?</span></span>';
  function openChat() { if (typeof window.chatToggle === 'function') window.chatToggle(); }
  bubble.addEventListener('click', openChat);
  bubble.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openChat(); }
  });
  document.body.appendChild(bubble);

  function update() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = pct + '%';
    reachedThreshold = pct >= 25;
    toTop.classList.toggle('visible', reachedThreshold);
    var chatOpen = chatTrigger && chatTrigger.classList.contains('open');
    bubble.classList.toggle('visible', !reachedThreshold && !chatOpen);
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { update(); ticking = false; });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  update();

  if (chatTrigger) {
    new MutationObserver(update).observe(chatTrigger, { attributes: true, attributeFilter: ['class'] });
  }

  new MutationObserver(function () {
    toTop.setAttribute('aria-label', getLang() === 'en' ? 'Back to top' : 'Volver arriba');
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

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
