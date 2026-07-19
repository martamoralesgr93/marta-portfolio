(function () {
  "use strict";
  var ACK_KEY = 'portfolio_ack';

  // Si el visitante ya aceptó antes, no mostramos nada.
  if (localStorage.getItem(ACK_KEY) === 'true') return;

  function isEN() {
    return document.documentElement.classList.contains('lang-en');
  }

  function injectStyles() {
    if (document.getElementById('discretion-style')) return;
    var css =
      '#discretion-screen{position:fixed;inset:0;z-index:99999;display:flex;' +
      'align-items:center;justify-content:center;background:#0e0b14;padding:24px;}' +
      '.discretion-card{max-width:440px;width:100%;text-align:center;}' +
      '.discretion-logo{width:56px;height:56px;margin:0 auto 24px;display:block;}' +
      '.discretion-title{font-size:24px;line-height:1.3;margin:0 0 16px;color:#fff;font-weight:600;}' +
      '.discretion-text{font-size:15px;line-height:1.6;color:rgba(255,255,255,0.72);margin:0 0 28px;}' +
      '.discretion-btn{background:#9B4DCA;color:#fff;border:none;border-radius:10px;' +
      'padding:14px 44px;font-size:15px;font-weight:600;cursor:pointer;transition:opacity .2s;}' +
      '.discretion-btn:hover{opacity:.88;}' +
      '.discretion-btn:focus-visible{outline:3px solid #fff;outline-offset:3px;}';
    var style = document.createElement('style');
    style.id = 'discretion-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function mount() {
    if (document.getElementById('discretion-screen')) return;
    injectStyles();

    var en = isEN();
    var overlay = document.createElement('div');
    overlay.id = 'discretion-screen';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'discretion-title');
    overlay.innerHTML =
      '<div class="discretion-card">' +
      '<img src="assets/logo-sinfondo.webp" alt="Marta Morales" class="discretion-logo" />' +
      '<h1 class="discretion-title" id="discretion-title">' +
      (en ? 'A note before you enter' : 'Antes de entrar') + '</h1>' +
      '<p class="discretion-text">' +
      (en
        ? 'This portfolio includes work carried out under confidentiality agreements. I kindly ask for your discretion when sharing it.'
        : 'Este portfolio incluye trabajo realizado bajo acuerdos de confidencialidad. Te pido discreción al compartirlo.') +
      '</p>' +
      '<button type="button" class="discretion-btn" id="discretion-enter">' +
      (en ? 'Enter' : 'Entrar') + '</button>' +
      '</div>';

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    var btn = document.getElementById('discretion-enter');
    btn.addEventListener('click', function () {
      localStorage.setItem(ACK_KEY, 'true');
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      document.body.style.overflow = '';
    });
    btn.focus();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
