/**
 * case-study-mobile.js
 * Control interactivo para la maquetación móvil según especificación de wireframes:
 * - Sub-nav tabs sticky con scroll-spy (OVERVIEW, PROBLEMA, SOLUCIÓN, RESULTADOS)
 * - Barra fija inferior móvil (rejilla de casos + escríbeme) tras scroll del hero
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

  if (bottomBar) {
    const checkBottomBar = () => {
      // Si no hay hero (casos con maquetación propia ime-/cme-) o está oculto
      // (p.ej. maquetación móvil propia con .ome), getBoundingClientRect() no sirve:
      // usamos la posición de scroll como respaldo.
      const isHidden = !heroSection || window.getComputedStyle(heroSection).display === 'none';
      const heroBottom = isHidden
        ? (window.scrollY > 320 ? 0 : 999)
        : heroSection.getBoundingClientRect().bottom;
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
    // Secciones a partir de los href de las tabs, solo las visibles
    // (los casos con maquetación móvil propia ocultan las secciones originales).
    const fromTabs = [...mobileTabs]
      .map((tab) => document.getElementById((tab.getAttribute('href') || '').replace('#', '')))
      .filter((el) => el && el.offsetParent !== null);
    const sectionTargets = fromTabs.length ? fromTabs : [
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

  // 6. Cargar dinámicamente Chatbot y Botón Subir al Inicio si no están presentes
  if (!document.getElementById('chat-trigger') && !document.querySelector('script[src*="chatbot.js"]')) {
    const chatScript = document.createElement('script');
    chatScript.src = 'chatbot.js?v=20261021_mail';
    document.body.appendChild(chatScript);
  }

  // 7. Visor de Prototipo Interactivo con Retorno a la Web y CTA de email
  const PROTO_CONFIG = {
    cef: {
      url: null, // prototipo con marca real de CEF (NDA): retirado
      titleEs: 'Prototipo en vivo · CEF Design System',
      titleEn: 'Live Prototype · CEF Design System',
      caseUrl: 'cef-design-system.html'
    },
    oracle: {
      url: 'https://it-ops-oracle-prototype-design.vercel.app/',
      titleEs: 'Prototipo en vivo · IT Ops & Oracle ERP',
      titleEn: 'Live Prototype · IT Ops & Oracle ERP',
      caseUrl: 'it-ops-oracle.html'
    },
    gym: {
      url: 'https://gym-energy-center-app.vercel.app/',
      titleEs: 'Prototipo en vivo · Gym Energy Center',
      titleEn: 'Live Prototype · Gym Energy Center',
      caseUrl: 'gym-energy-center.html'
    },
    paolo: {
      url: 'projects/04-paolo/index.html',
      titleEs: 'Prototipo en vivo · Paolo Pizzeria',
      titleEn: 'Live Prototype · Paolo Pizzeria',
      caseUrl: 'paolo-pizzeria.html'
    },
    sofia: {
      url: 'sofia-morales.html',
      titleEs: 'Prototipo en vivo · Sofía Morales Abogada',
      titleEn: 'Live Prototype · Sofía Morales Legal',
      caseUrl: 'index.html#work'
    }
  };

  function resolveProtoFromHref(href, el) {
    if (el && el.dataset && el.dataset.protoCase && PROTO_CONFIG[el.dataset.protoCase]) {
      return PROTO_CONFIG[el.dataset.protoCase];
    }
    const h = (href || '').toLowerCase();
    if (h.includes('calendario-cef.vercel.app') || h.includes('case=cef')) return PROTO_CONFIG.cef;
    if (h.includes('it-ops-oracle-prototype-design.vercel.app') || h.includes('case=oracle')) return PROTO_CONFIG.oracle;
    if (h.includes('gym-energy-center-app.vercel.app') || h.includes('case=gym')) return PROTO_CONFIG.gym;
    if (h.includes('projects/04-paolo') || h.includes('case=paolo')) return PROTO_CONFIG.paolo;
    if (h.includes('sofia-morales.html') || h.includes('case=sofia')) return PROTO_CONFIG.sofia;
    if (el && el.dataset && el.dataset.protoUrl) {
      return {
        url: el.dataset.protoUrl,
        titleEs: el.dataset.protoTitleEs || 'Prototipo interactivo',
        titleEn: el.dataset.protoTitleEn || 'Interactive prototype',
        caseUrl: window.location.pathname.split('/').pop() || 'index.html#work'
      };
    }
    return null;
  }

  let protoViewer = document.getElementById('csProtoViewer');
  if (!protoViewer) {
    protoViewer = document.createElement('div');
    protoViewer.id = 'csProtoViewer';
    protoViewer.className = 'cs-proto-viewer';
    protoViewer.setAttribute('role', 'dialog');
    protoViewer.setAttribute('aria-modal', 'true');
    protoViewer.setAttribute('aria-label', 'Visor de prototipo interactivo');
    protoViewer.innerHTML = `
      <header class="cs-proto-topbar">
        <div class="cs-proto-left">
          <a href="index.html" class="cs-proto-logo" aria-label="Marta Morales - Ir al inicio">
            <img src="assets/logo-sinfondo.webp" alt="Marta Morales" width="32" height="22">
          </a>
          <button type="button" class="cs-proto-back-btn" id="csProtoBackBtn">
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true"><path d="M6 1L1 6L6 11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span class="es">Volver al caso</span>
            <span class="en">Back to case</span>
          </button>
          <a href="index.html#work" class="cs-proto-home-link">
            <span class="es">Ir a la web</span>
            <span class="en">Back to web</span>
          </a>
        </div>

        <div class="cs-proto-center">
          <div class="cs-proto-badge">
            <span class="cs-proto-badge-dot" aria-hidden="true"></span>
            <span id="csProtoTitleEs" class="es">Prototipo interactivo</span>
            <span id="csProtoTitleEn" class="en">Interactive prototype</span>
          </div>
          <div class="cs-proto-device-switch" role="group" aria-label="Cambiar vista de dispositivo">
            <button type="button" class="cs-proto-device-btn is-active" data-device="desktop">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              <span>Desktop</span>
            </button>
            <button type="button" class="cs-proto-device-btn" data-device="mobile">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              <span>Móvil</span>
            </button>
          </div>
        </div>

        <div class="cs-proto-right">
          <a href="https://wa.me/34659879887" target="_blank" rel="noopener" class="cs-proto-wa-btn" aria-label="Escribir por WhatsApp">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm4.52 14.01c-.2.57-1.17 1.09-1.64 1.16-.42.06-.95.09-1.53-.1-.36-.11-.81-.26-1.39-.51-2.44-1.05-4.03-3.49-4.15-3.66-.12-.16-.99-1.31-.99-2.51s.62-1.78.85-2.03c.22-.25.49-.31.65-.31h.48c.15.01.36-.05.56.43.21.5.71 1.73.77 1.85.06.13.1.27.02.44-.08.16-.12.26-.25.41-.12.14-.26.32-.37.43-.13.13-.26.26-.11.51.14.25.64 1.06 1.38 1.72.94.84 1.74 1.11 1.99 1.23.25.13.4.1.54-.06.15-.17.63-.72.79-.97.17-.25.33-.21.56-.12.22.08 1.44.67 1.69.8.25.12.41.18.47.28.06.11.06.59-.14 1.16z"/></svg>
            <span>WhatsApp</span>
          </a>
          <a href="mailto:mmoralesgr93@gmail.com" class="cs-proto-mail-btn">
            <span class="es">Escríbeme</span>
            <span class="en">Email me</span>
          </a>
        </div>
      </header>

      <div class="cs-proto-stage" id="csProtoStage">
        <div class="cs-proto-frame-wrap">
          <iframe class="cs-proto-iframe" id="csProtoIframe" src="about:blank" title="Prototipo interactivo" allow="clipboard-write; fullscreen"></iframe>
        </div>
      </div>

      <footer class="cs-proto-bottombar">
        <button type="button" class="cs-proto-bottom-back" id="csProtoBottomBackBtn">
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true"><path d="M6 1L1 6L6 11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span class="es">Volver a la web</span>
          <span class="en">Back to web</span>
        </button>
        <a href="mailto:mmoralesgr93@gmail.com" class="cs-proto-bottom-call" data-contact>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
          <span class="es">Escribir a Marta</span>
          <span class="en">Email Marta</span>
        </a>
        <a href="https://wa.me/34659879887" target="_blank" rel="noopener" class="cs-proto-bottom-wa" aria-label="WhatsApp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm4.52 14.01c-.2.57-1.17 1.09-1.64 1.16-.42.06-.95.09-1.53-.1-.36-.11-.81-.26-1.39-.51-2.44-1.05-4.03-3.49-4.15-3.66-.12-.16-.99-1.31-.99-2.51s.62-1.78.85-2.03c.22-.25.49-.31.65-.31h.48c.15.01.36-.05.56.43.21.5.71 1.73.77 1.85.06.13.1.27.02.44-.08.16-.12.26-.25.41-.12.14-.26.32-.37.43-.13.13-.26.26-.11.51.14.25.64 1.06 1.38 1.72.94.84 1.74 1.11 1.99 1.23.25.13.4.1.54-.06.15-.17.63-.72.79-.97.17-.25.33-.21.56-.12.22.08 1.44.67 1.69.8.25.12.41.18.47.28.06.11.06.59-.14 1.16z"/></svg>
        </a>
      </footer>
    `;
    document.body.appendChild(protoViewer);

    const iframe = document.getElementById('csProtoIframe');
    const stage = document.getElementById('csProtoStage');
    const titleEs = document.getElementById('csProtoTitleEs');
    const titleEn = document.getElementById('csProtoTitleEn');
    const backBtn = document.getElementById('csProtoBackBtn');
    const bottomBackBtn = document.getElementById('csProtoBottomBackBtn');
    const deviceBtns = protoViewer.querySelectorAll('.cs-proto-device-btn');

    window.openProtoViewer = (protoData, pushHistory = true) => {
      if (!protoData || !protoData.url) return;
      titleEs.textContent = protoData.titleEs || 'Prototipo interactivo';
      titleEn.textContent = protoData.titleEn || 'Interactive prototype';
      if (iframe.src !== protoData.url) {
        iframe.src = protoData.url;
      }
      protoViewer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      if (pushHistory && window.location.hash !== '#prototipo') {
        try {
          history.pushState({ csProtoOpen: true }, '', '#prototipo');
        } catch (err) {}
      }
    };

    window.closeProtoViewer = (fromPopState = false) => {
      if (!protoViewer.classList.contains('is-open')) return;
      protoViewer.classList.remove('is-open');
      document.body.style.overflow = '';
      if (!fromPopState && window.location.hash === '#prototipo') {
        try {
          history.back();
        } catch (err) {}
      }
    };

    backBtn.addEventListener('click', () => window.closeProtoViewer(false));
    bottomBackBtn.addEventListener('click', () => window.closeProtoViewer(false));

    deviceBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        deviceBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        stage.classList.toggle('is-mobile-preview', btn.dataset.device === 'mobile');
      });
    });

    window.addEventListener('popstate', () => {
      if (protoViewer.classList.contains('is-open') && window.location.hash !== '#prototipo') {
        window.closeProtoViewer(true);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && protoViewer.classList.contains('is-open')) {
        window.closeProtoViewer(false);
      }
    });
  }

  // Interceptar clics en todos los enlaces a prototipos dentro de los case studies
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    // Respetar cmd/ctrl click o botón central para abrir prototipo.html en pestaña nueva con su propia barra
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    const protoData = resolveProtoFromHref(link.getAttribute('href'), link);
    if (protoData && protoData.url) {
      e.preventDefault();
      window.openProtoViewer(protoData, true);
    }
  });

  // Si se entra directamente con #prototipo en el hash de un case study, abrir el prototipo correspondiente
  if (window.location.hash === '#prototipo') {
    const path = window.location.pathname.toLowerCase();
    let autoProto = null;
    if (path.includes('cef-design-system')) autoProto = PROTO_CONFIG.cef;
    else if (path.includes('it-ops-oracle')) autoProto = PROTO_CONFIG.oracle;
    else if (path.includes('gym-energy-center')) autoProto = PROTO_CONFIG.gym;
    else if (path.includes('paolo-pizzeria')) autoProto = PROTO_CONFIG.paolo;
    if (autoProto) {
      window.openProtoViewer(autoProto, false);
    }
  }
})();

