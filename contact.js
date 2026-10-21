/**
 * contact.js
 * Los botones «Escríbeme» son enlaces mailto:, que no hacen nada si el visitante
 * no tiene una app de correo configurada (p. ej. quien usa Gmail en el navegador).
 * Al pulsarlos se abre un menú con Gmail, Outlook, la app de correo y «Copiar email».
 * Sin JavaScript, el enlace mailto: sigue funcionando como antes.
 */
(function () {
  var EMAIL = 'mmoralesgr93@gmail.com';
  var SUBJECT = 'Contacto desde tu portfolio';
  var SELECTOR = 'a[href^="mailto:"], a[data-contact]';

  var css = '' +
    '.ct-pop{position:fixed;z-index:10000;width:260px;padding:8px;background:#0b0614;border:1px solid rgba(255,255,255,.14);border-radius:14px;box-shadow:0 18px 40px -10px rgba(0,0,0,.7);font-family:inherit;color:#fff}' +
    '.ct-pop[hidden]{display:none}' +
    '.ct-mail{display:block;padding:8px 10px 10px;font-size:13px;color:rgba(255,255,255,.7);border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:4px;word-break:break-all}' +
    '.ct-opt{display:flex;align-items:center;width:100%;min-height:44px;padding:0 10px;border:0;border-radius:10px;background:none;color:#fff;font:inherit;font-size:14px;text-align:left;text-decoration:none;cursor:pointer}' +
    '.ct-opt:hover,.ct-opt:focus-visible{background:rgba(167,139,250,.14);outline:none}' +
    '.ct-opt:focus-visible{box-shadow:0 0 0 2px #a78bfa}' +
    '.ct-opt.is-done{color:#a78bfa}' +
    '@media (max-width:600px){.ct-pop{left:12px!important;right:12px;width:auto;top:auto!important;bottom:12px}}';

  var pop, lastTrigger;

  function t(es, en) { return '<span class="es">' + es + '</span><span class="en">' + en + '</span>'; }

  function build() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var q = '?to=' + encodeURIComponent(EMAIL) + '&su=' + encodeURIComponent(SUBJECT);
    pop = document.createElement('div');
    pop.className = 'ct-pop';
    pop.setAttribute('role', 'menu');
    pop.hidden = true;
    pop.innerHTML =
      '<span class="ct-mail">' + EMAIL + '</span>' +
      '<a class="ct-opt" role="menuitem" target="_blank" rel="noopener" href="https://mail.google.com/mail/?view=cm&fs=1&' + q.slice(1) + '">' + t('Escribir con Gmail', 'Write with Gmail') + '</a>' +
      '<a class="ct-opt" role="menuitem" target="_blank" rel="noopener" href="https://outlook.live.com/mail/0/deeplink/compose?to=' + encodeURIComponent(EMAIL) + '&subject=' + encodeURIComponent(SUBJECT) + '">' + t('Escribir con Outlook', 'Write with Outlook') + '</a>' +
      '<a class="ct-opt" role="menuitem" href="mailto:' + EMAIL + '?subject=' + encodeURIComponent(SUBJECT) + '">' + t('Abrir mi app de correo', 'Open my email app') + '</a>' +
      '<button type="button" class="ct-opt" role="menuitem" data-copy>' + t('Copiar email', 'Copy email') + '</button>';
    document.body.appendChild(pop);

    pop.addEventListener('click', function (e) {
      var copy = e.target.closest('[data-copy]');
      if (copy) {
        copyEmail(copy);
        return;
      }
      if (e.target.closest('.ct-opt')) close(false);
    });
    pop.addEventListener('keydown', function (e) {
      var items = Array.prototype.slice.call(pop.querySelectorAll('.ct-opt'));
      var i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    });
  }

  function copyEmail(btn) {
    var done = function () {
      btn.classList.add('is-done');
      btn.innerHTML = t('Email copiado ✓', 'Email copied ✓');
      setTimeout(function () {
        btn.classList.remove('is-done');
        btn.innerHTML = t('Copiar email', 'Copy email');
      }, 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).then(done, function () { fallbackCopy(); done(); });
    } else {
      fallbackCopy(); done();
    }
  }

  function fallbackCopy() {
    var ta = document.createElement('textarea');
    ta.value = EMAIL;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    ta.remove();
  }

  function open(trigger) {
    if (!pop) build();
    lastTrigger = trigger;
    pop.hidden = false;
    var r = trigger.getBoundingClientRect();
    var w = pop.offsetWidth, h = pop.offsetHeight;
    var left = Math.min(Math.max(12, r.right - w), window.innerWidth - w - 12);
    var top = r.bottom + 8;
    if (top + h > window.innerHeight - 12) top = Math.max(12, r.top - h - 8);
    pop.style.left = left + 'px';
    pop.style.top = top + 'px';
    trigger.setAttribute('aria-expanded', 'true');
    pop.querySelector('.ct-opt').focus();
  }

  function close(restoreFocus) {
    if (!pop || pop.hidden) return;
    pop.hidden = true;
    if (lastTrigger) {
      lastTrigger.setAttribute('aria-expanded', 'false');
      if (restoreFocus) lastTrigger.focus();
    }
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest(SELECTOR);
    if (trigger && !(pop && pop.contains(trigger))) {
      e.preventDefault();
      if (pop && !pop.hidden && lastTrigger === trigger) close(true);
      else open(trigger);
      return;
    }
    if (pop && !pop.hidden && !pop.contains(e.target)) close(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close(true);
  });
  window.addEventListener('resize', function () { close(false); });
  window.addEventListener('scroll', function () { close(false); }, { passive: true });

  document.querySelectorAll(SELECTOR).forEach(function (a) {
    a.setAttribute('aria-haspopup', 'menu');
    a.setAttribute('aria-expanded', 'false');
  });
})();
