/**
 * case-study-mobile.js
 * Control interactivo para la maquetación móvil según especificación de wireframes:
 * - Sub-nav tabs sticky con scroll-spy (OVERVIEW, PROBLEMA, SOLUCIÓN, RESULTADOS)
 * - Barra fija inferior móvil (rejilla de casos + agendar llamada) tras scroll del hero
 * - Toggle interactivo Antes / Después (Slot M5)
 * - Carrusel con scroll-snap y contador dinámico DESLIZA 01/0N (Slot M6)
 * - Lightbox modal táctil para artefactos de research (Slot M4)
 */

(() => {
  // 1. Inyectar / inicializar Lightbox Modal si no existe en el DOM
  let lightbox = document.getElementById('csLightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'csLightbox';
    lightbox.className = 'cs-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Visualizador de imagen ampliada');
    lightbox.innerHTML = `
      <button class="cs-lightbox-close" type="button" aria-label="Cerrar imagen">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M13 1L1 13" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/></svg>
      </button>
      <img src="" alt="Artefacto ampliado" id="csLightboxImg">
    `;
    document.body.appendChild(lightbox);

    const closeBtn = lightbox.querySelector('.cs-lightbox-close');
    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    };
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('cs-lightbox-close')) {
        closeLightbox();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });
  }

  window.openCsLightbox = (src, alt) => {
    const img = document.getElementById('csLightboxImg');
    if (!img) return;
    img.src = src;
    img.alt = alt || 'Imagen ampliada';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  // Delegación para cualquier Slot M4 o elemento con clase cs-zoomable
  document.addEventListener('click', (e) => {
    const zoomTarget = e.target.closest('.cs-slot-m4, .cs-zoomable');
    if (zoomTarget) {
      const img = zoomTarget.querySelector('img');
      if (img && img.src) {
        window.openCsLightbox(img.src, img.alt);
      }
    }
  });

  // 2. Toggle interactivo Antes / Después (Slot M5)
  document.querySelectorAll('.cs-toggle-ab').forEach((toggleContainer) => {
    const btns = toggleContainer.querySelectorAll('.cs-toggle-btn');
    const parentSlot = toggleContainer.closest('.cs-slot-m5') || toggleContainer.parentElement;
    if (!parentSlot) return;

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const mode = btn.dataset.target; // 'before' | 'after'
        parentSlot.dataset.state = mode;

        const imgBefore = parentSlot.querySelector('.cs-toggle-img-before');
        const imgAfter = parentSlot.querySelector('.cs-toggle-img-after');
        if (imgBefore && imgAfter) {
          if (mode === 'before') {
            imgBefore.style.display = 'block';
            imgAfter.style.display = 'none';
          } else {
            imgBefore.style.display = 'none';
            imgAfter.style.display = 'block';
          }
        }
      });
    });
  });

  // 3. Carrusel Horizontal Scroll-Snap (Slot M6)
  document.querySelectorAll('.cs-carousel-wrapper').forEach((wrapper) => {
    const carousel = wrapper.querySelector('.cs-carousel');
    const counter = wrapper.querySelector('.cs-carousel-counter');
    const dots = wrapper.querySelectorAll('.cs-carousel-dot');
    if (!carousel) return;

    const cards = carousel.querySelectorAll('.cs-carousel-card');
    const total = cards.length;

    const updateCarouselState = () => {
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = cards[0] ? cards[0].offsetWidth + 14 : 1;
      const activeIdx = Math.min(Math.round(scrollLeft / cardWidth), total - 1);

      if (counter) {
        const cur = String(activeIdx + 1).padStart(2, '0');
        const tot = String(total).padStart(2, '0');
        const lang = document.documentElement.dataset.lang || 'es';
        const prefix = lang === 'en' ? 'SWIPE' : 'DESLIZA';
        counter.textContent = `${prefix} · ${cur} / ${tot}`;
      }

      dots.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === activeIdx);
      });
    };

    carousel.addEventListener('scroll', updateCarouselState, { passive: true });
    updateCarouselState();
  });

  // 4. Barra fija inferior móvil (aparece tras pasar el Hero)
  const bottomBar = document.getElementById('csMobileBottomBar');
  const heroSection = document.querySelector('.cs-hero') || document.getElementById('overview');

  if (bottomBar && heroSection) {
    const checkBottomBar = () => {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      if (heroBottom < 100) {
        bottomBar.classList.add('is-visible');
      } else {
        bottomBar.classList.remove('is-visible');
      }
    };
    window.addEventListener('scroll', checkBottomBar, { passive: true });
    checkBottomBar();
  }

  // 5. Scroll-spy para las 4 tabs móviles (OVERVIEW | PROBLEMA | SOLUCIÓN | RESULTADOS)
  const mobileTabs = document.querySelectorAll('.cs-mobile-tab');
  if (mobileTabs.length > 0) {
    const sectionTargets = [
      document.getElementById('overview'),
      document.getElementById('problema'),
      document.getElementById('diseno') || document.getElementById('solucion'),
      document.getElementById('resultados')
    ].filter(Boolean);

    const onScrollSpy = () => {
      const scrollPos = window.scrollY + 120;
      let currentSectionId = '';

      sectionTargets.forEach((sec) => {
        if (sec.offsetTop <= scrollPos) {
          currentSectionId = sec.id;
        }
      });

      if (!currentSectionId && sectionTargets[0]) {
        currentSectionId = sectionTargets[0].id;
      }

      mobileTabs.forEach((tab) => {
        const targetHref = tab.getAttribute('href');
        const isMatch = targetHref === '#' + currentSectionId || 
          (targetHref === '#solucion' && currentSectionId === 'diseno') ||
          (targetHref === '#diseno' && currentSectionId === 'solucion');
        tab.classList.toggle('is-active', isMatch);
      });
    };

    window.addEventListener('scroll', onScrollSpy, { passive: true });
    onScrollSpy();

    mobileTabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = tab.getAttribute('href').replace('#', '');
        const targetEl = document.getElementById(targetId) || 
          (targetId === 'solucion' ? document.getElementById('diseno') : null) ||
          (targetId === 'diseno' ? document.getElementById('solucion') : null);

        if (targetEl) {
          const topOffset = targetEl.offsetTop - 94; // 52px header + 42px tabs
          window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
        }
      });
    });
  }
})();
