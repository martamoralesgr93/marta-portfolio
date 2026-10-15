/**
 * it-ops-desktop.js · Vídeo del hero desktop (IT Ops & Oracle, capa .itd)
 * - Solo descarga el MP4 en desktop (≥769px); en móvil no se pide nada.
 * - Reproduce en bucle y en silencio cuando entra en pantalla; pausa al salir.
 * - Con prefers-reduced-motion no hay autoplay: se muestran los controles.
 */
(() => {
  const video = document.querySelector('.itd-hero-video[data-src]');
  if (!video) return;
  const mq = window.matchMedia('(min-width: 769px)');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const load = () => {
    if (!mq.matches || video.dataset.loaded) return;
    video.src = video.dataset.src;
    video.dataset.loaded = '1';
    if (reduce) { video.controls = true; return; }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => entries.forEach((e) => {
        if (e.isIntersecting) { video.play().catch(() => {}); } else { video.pause(); }
      }), { threshold: 0.25 }).observe(video);
    } else {
      video.autoplay = true;
      video.play().catch(() => {});
    }
  };

  load();
  if (mq.addEventListener) mq.addEventListener('change', load);
})();
