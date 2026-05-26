function closeAllProjects(exceptEl = null) {
  document.querySelectorAll(".work-item").forEach(item => {
    if (item !== exceptEl) {
      item.classList.remove("active");
      const detail = item.querySelector(".detail");
      if (detail) detail.style.display = "none";
      item.setAttribute("aria-expanded", "false");
    }
  });
}

function toggleProject(el) {
  const detail = el.querySelector(".detail");
  const isOpen = el.classList.contains("active");

  closeAllProjects(el);

  if (isOpen) {
    el.classList.remove("active");
    if (detail) detail.style.display = "none";
    el.setAttribute("aria-expanded", "false");
  } else {
    el.classList.add("active");
    if (detail) detail.style.display = "block";
    el.setAttribute("aria-expanded", "true");
    setTimeout(() => {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 80);
  }
}

function toggleFab() {
  const fab = document.getElementById('fabButton');
  const menu = document.getElementById('fabMenu');
  const body = document.body;
  
  const isOpening = !fab.classList.contains('active');
  fab.classList.toggle('active');
  menu.classList.toggle('active');
  body.classList.toggle('menu-open');
  
  fab.setAttribute('aria-expanded', isOpening);
  menu.setAttribute('aria-hidden', !isOpening);
  
  if (isOpening) {
    fab.setAttribute('aria-label', currentLang === 'es' ? 'Cerrar menú' : 'Close menu');
  } else {
    fab.setAttribute('aria-label', currentLang === 'es' ? 'Ver proyectos' : 'View projects');
  }
}

function toggleNavProjects() {
  const list = document.getElementById('navProjectsList');
  const trigger = document.getElementById('proyectosTrigger');
  const aboutList = document.getElementById('aboutMenuList');
  const aboutTrigger = document.getElementById('aboutTrigger');
  
  const isActive = list.classList.contains('active');
  
  if (isActive) {
    list.classList.remove('active');
    trigger.classList.remove('active');
  } else {
    // Close other menu
    if (aboutList) aboutList.classList.remove('active');
    if (aboutTrigger) aboutTrigger.classList.remove('active');
    
    list.classList.add('active');
    trigger.classList.add('active');
  }
}

function toggleAboutMenu() {
  const list = document.getElementById('aboutMenuList');
  const trigger = document.getElementById('aboutTrigger');
  const projectsList = document.getElementById('navProjectsList');
  const projectsTrigger = document.getElementById('proyectosTrigger');
  
  const isActive = list.classList.contains('active');
  
  if (isActive) {
    list.classList.remove('active');
    trigger.classList.remove('active');
  } else {
    // Close other menu
    if (projectsList) projectsList.classList.remove('active');
    if (projectsTrigger) projectsTrigger.classList.remove('active');
    
    list.classList.add('active');
    trigger.classList.add('active');
  }
}

function scrollCarousel(id, direction) {
  const container = document.getElementById(id);
  if (!container) return;
  const track = container.querySelector('.carousel-track');
  if (!track) return;
  
  const scrollAmount = track.offsetWidth * 0.8;
  track.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

const translations = {
  es: {
    "cat-cro": "01. CRO & OPTIMIZACIÓN",
    "cat-recomponetizacion": "02. RECOMPONENTIZACIÓN & DISEÑO ESCALABLE",
    "cat-herramientas": "03. HERRAMIENTAS & EFICIENCIA OPERATIVA",
    "label-context": "Contexto de Negocio",
    "label-hypothesis": "Diagnóstico e Insight",
    "label-solution": "Estrategia y Solución",
    "label-impact": "Impacto y Métricas",
    "label-read-more": "Ver caso de estudio →",
    "nav-home": "Inicio",
    "nav-work": "Proyectos",
    "nav-about": "Sobre mí",
    "nav-contact": "Contacto",
    "nav-experience-short": "CV",
    "hero-eyebrow": "PRODUCT DESIGN · UX STRATEGY · GROWTH",
    "profile-name": "Marta Morales",
    "hero-description-1": "Conecto la experiencia de usuario (UX/UI) con los objetivos de negocio y la rentabilidad.",
    "hero-description-2": "Product Designer y UX Strategist especializada en CRO y Producto Digital. Simplifico la complejidad operativa para crear interfaces usables de alto impacto que escalan.",
    "work-eyebrow": "Casos de estudio seleccionados",
    "label-impact-badge": "IMPACTO",
    "label-duration": "Duración",
    "label-tools": "Herramientas",
    "p1-duration-val": "3 meses",
    "p3-duration-val": "4 semanas",
    "p1-kpi-val": "+30% conversión",
    "p3-kpi-val": "+13% conversión",
    "p2-duration-val": "5 meses",
    "p2-kpi-val": "100% Accesible",
    "p1-title": "ILUNION Hotels — Booking Engine",
    "p1-subtitle": "Optimización estratégica del acceso al motor de reservas",
    "p1-summary": "Rediseño de la jerarquía de información para reducir la fricción en el funnel de ventas, alineando el comportamiento del usuario con los objetivos de conversión del canal directo.",
    "p1-impact-tag": "Optimización del Funnel",
    "p2-title": "CEF — Herramienta de Gestión Académica",
    "p2-subtitle": "Centralización de procesos y eficiencia operativa",
    "p2-summary": "Transformación de una herramienta interna compleja en una solución intuitiva y accesible, reduciendo errores administrativos y mejorando la productividad de los equipos.",
    "p2-impact-tag": "Eficiencia Operativa",
    "p3-title": "ILUNION Hotels — Ofertas & Conversión",
    "p3-subtitle": "Diagnóstico CRO y rediseño del flujo de captación",
    "p3-summary": "Análisis de comportamiento y rediseño táctico del bloque de ofertas, logrando un incremento del +13% en la conversión directa y mejorando el ROI de las campañas de Paid Media.",
    "p3-impact-tag": "+13% Conversión Directa",
    "about-eyebrow": "Sobre mí & Estrategia",
    "about-intro": "Diseñadora de Producto con mentalidad de negocio y enfoque en resultados cuantificables.",
    "about-text-1": "Como Product Designer en el equipo de Negocio Digital de ILUNION Hotels, lidero la optimización estratégica del canal directo para más de 29 hoteles. Utilizo Figma, Microsoft Clarity y analítica digital para fundamentar cada decisión de diseño, logrando un impacto directo en la conversión de reservas y revenue.",
    "about-text-2": "Mi metodología combina la investigación cualitativa (User Research, test de usabilidad) con análisis cuantitativo y experimentación continua. Entiendo el diseño interactivo y la accesibilidad (WCAG) como pilares fundamentales para resolver problemas de negocio complejos y elevar el estándar de producto.",
    "expertise-eyebrow": "Especialidades",
    "tag-ux-research": "UX/UI & CRO",
    "tag-ui-design": "Figma & A/B Testing",
    "tag-cro": "Microsoft Clarity",
    "tag-user-testing": "eCommerce & Turismo",
    "tag-product-thinking": "Producto Digital",
    "tag-data-analysis": "Accesibilidad (WCAG)",
    "label-experience": "Experiencia",
    "label-skills": "Capacidades",
    "label-education": "Formación",
    "exp-cv-cta": "Descargar CV Completo",
    "contact-home-title": "¿Hablamos sobre estrategia y producto?",
    "contact-home-desc": "Disponible para colaborar en proyectos donde el diseño y el negocio se encuentren para crear impacto real.",
    "status-label": "Disponible para nuevos retos estratégicos",
    "disclaimer": "Los proyectos mostrados han sido desarrollados en el contexto de mi experiencia profesional. Todas las marcas y logotipos pertenecen a sus respectivos propietarios.",
    "db-p1-title": "MÉTRICAS DE RENDIMIENTO",
    "db-p1-stat1-label": "Inicio de búsqueda",
    "db-p1-stat1-meta": "CTR de primer scroll",
    "db-p1-stat2-label": "Optimización Embudo",
    "db-p1-stat2-meta": "Tendencia de conversión",
    "db-p1-obj-title": "Objetivos conseguidos:",
    "db-p1-obj1": "Acceso al motor visible en el primer scroll",
    "db-p1-obj2": "Reducción del 45% en errores de fecha en mobile",
    "db-p1-obj3": "Identificación de búsqueda por destino general",
    "db-p2-title": "AUDITORÍA DE ACCESIBILIDAD",
    "db-p2-stat1-label": "Accesibilidad WCAG",
    "db-p2-stat1-meta": "Conformidad Nivel AA",
    "db-p2-stat2-label": "Jerarquía y Navegación",
    "db-p2-stat2-meta": "Cumplimiento de estándares",
    "db-p2-obj-title": "Objetivos conseguidos:",
    "db-p2-obj1": "100% accesible por teclado (sin trampas de foco)",
    "db-p2-obj2": "Relación de contraste AA superior a 4.5:1",
    "db-p2-obj3": "Estructura semántica para lectores de pantalla",
    "db-p3-title": "MÉTRICAS CRO & paid media",
    "db-p3-stat1-label": "Conversión Directa",
    "db-p3-stat1-meta": "Reservas incrementales",
    "db-p3-stat2-label": "Scroll al Producto",
    "db-p3-stat2-meta": "Antes 15% vs Después 70%",
    "db-p3-obj-title": "Objetivos conseguidos:",
    "db-p3-obj1": "Incremento neto del +13% en venta directa",
    "db-p3-obj2": "Rediseño táctico del bloque de ofertas superior",
    "db-p3-obj3": "Optimización del ROI en campañas de Paid Media",
    "profile-status": "Open to work",
    "connections-count": "+500 conexiones",
    "linkedin-subtitle": "Red profesional & CRO",
    "connect-linkedin-cta": "Conectar →",
    "email-tag": "Contacto Directo",
    "email-subtitle": "Respuesta en menos de 24 horas",
    "send-email-cta": "Escribir email →",
    "cv-tag": "Curriculum Vitae",
    "cv-subtitle": "Formato PDF · Actualizado en 2026",
    "download-cv-cta": "Descargar CV →",
    "github-subtitle": "Proyectos de código y desarrollo",
    "github-cta": "Ver código →",
    "vercel-subtitle": "Proyectos en producción",
    "vercel-cta": "Ver despliegues →",
    "linear-subtitle": "Gestión y entrega de producto",
    "linear-cta": "Integración ágil →"
  },
  en: {
    "cat-cro": "01. CRO & CONVERSION OPTIMIZATION",
    "cat-recomponetizacion": "02. RECOMPONENTIZATION & SCALABLE DESIGN",
    "cat-herramientas": "03. TOOLS & OPERATIONAL EFFICIENCY",
    "label-context": "Business Context",
    "label-hypothesis": "Diagnosis & Insight",
    "label-solution": "Strategy & Solution",
    "label-impact": "Impact & Metrics",
    "label-read-more": "Read case study →",
    "nav-home": "Home",
    "nav-work": "Projects",
    "nav-about": "About",
    "nav-contact": "Contact",
    "nav-experience-short": "CV",
    "hero-eyebrow": "PRODUCT DESIGN · UX STRATEGY · GROWTH",
    "profile-name": "Marta Morales",
    "hero-description-1": "I connect user experience (UX/UI) with business objectives and product profitability.",
    "hero-description-2": "Product Designer & UX Strategist specialized in CRO and Digital Products. I simplify operational complexity to create high-impact, usable, and scalable interfaces.",
    "hero-description-3": "I design interactive solutions aligned with the conversion funnel, optimizing complex user flows through data-driven analysis and A/B Testing.",
    "work-eyebrow": "Selected Case Studies",
    "label-impact-badge": "IMPACT",
    "label-duration": "Duration",
    "label-tools": "Tools",
    "p1-duration-val": "3 months",
    "p3-duration-val": "4 weeks",
    "p1-kpi-val": "+30% conversion",
    "p3-kpi-val": "+13% conversion",
    "p2-duration-val": "5 months",
    "p2-kpi-val": "100% Accessible",
    "p1-title": "ILUNION Hotels — Booking Engine",
    "p1-subtitle": "Strategic Optimization of Booking Engine Access",
    "p1-summary": "Redesigning information hierarchy to reduce friction in the sales funnel, aligning user behavior with direct channel conversion goals.",
    "p1-impact-tag": "Funnel Optimization",
    "p2-title": "CEF — Academic Management Tool",
    "p2-subtitle": "Process Centralization and Operational Efficiency",
    "p2-summary": "Transforming a complex internal tool into an intuitive and accessible solution, reducing administrative errors and improving team productivity.",
    "p2-impact-tag": "Operational Efficiency",
    "p3-title": "ILUNION Hotels — Offers & Conversion",
    "p3-subtitle": "CRO Diagnosis and Capture Flow Redesign",
    "p3-summary": "Behavioral analysis and tactical redesign of the offers block, achieving a +13% increase in direct conversion and improving Paid Media ROI.",
    "p3-impact-tag": "+13% Direct Conversion",
    "about-eyebrow": "About Me & Strategy",
    "about-intro": "Business-minded Product Designer focused on quantifiable results and strategic impact.",
    "about-text-1": "As a Product Designer in the Digital Business team at ILUNION Hotels, I lead the strategic optimization of the direct channel for a portfolio of 29+ hotels. I leverage Figma, Microsoft Clarity, and web analytics to drive every design decision, making a direct impact on booking conversion and revenue.",
    "about-text-2": "My methodology bridges qualitative user research (usability testing) with quantitative analytics and continuous experimentation. I view interactive design and digital accessibility (WCAG) as essential pillars to solve complex business problems and elevate product standards.",
    "expertise-eyebrow": "Core Specialties",
    "tag-ux-research": "UX/UI & CRO",
    "tag-ui-design": "Figma & A/B Testing",
    "tag-cro": "Microsoft Clarity",
    "tag-user-testing": "eCommerce & Tourism",
    "tag-product-thinking": "Digital Product",
    "tag-data-analysis": "Accessibility (WCAG)",
    "label-experience": "Experience",
    "label-skills": "Capabilities",
    "label-education": "Education",
    "exp-cv-cta": "Download Full CV",
    "contact-home-title": "Let's talk about strategy and product",
    "contact-home-desc": "Available to collaborate on projects where design and business meet to create real impact.",
    "status-label": "Available for new strategic challenges",
    "disclaimer": "The projects shown have been developed in the context of my professional experience. All trademarks and logos belong to their respective owners.",
    "db-p1-title": "PERFORMANCE METRICS",
    "db-p1-stat1-label": "Search Initiation",
    "db-p1-stat1-meta": "Above-the-fold CTR",
    "db-p1-stat2-label": "Funnel Optimization",
    "db-p1-stat2-meta": "Conversion trend",
    "db-p1-obj-title": "Achieved objectives:",
    "db-p1-obj1": "Booking engine accessible on first scroll",
    "db-p1-obj2": "45% reduction in mobile date entry errors",
    "db-p1-obj3": "Detection of generic destination intent",
    "db-p2-title": "ACCESSIBILITY AUDIT",
    "db-p2-stat1-label": "WCAG Accessibility",
    "db-p2-stat1-meta": "Level AA Compliance",
    "db-p2-stat2-label": "Hierarchy & Navigation",
    "db-p2-stat2-meta": "Standard alignment",
    "db-p2-obj-title": "Achieved objectives:",
    "db-p2-obj1": "100% keyboard navigable (no focus traps)",
    "db-p2-obj2": "Contrast ratios exceeding WCAG AA 4.5:1",
    "db-p2-obj3": "Semantic document outline for screen readers",
    "db-p3-title": "CRO & paid media METRICS",
    "db-p3-stat1-label": "Direct Conversion",
    "db-p3-stat1-meta": "Incremental bookings",
    "db-p3-stat2-label": "Scroll-through Rate",
    "db-p3-stat2-meta": "Before 15% vs After 70%",
    "db-p3-obj-title": "Achieved objectives:",
    "db-p3-obj1": "+13% net increase in direct channel sales",
    "db-p3-obj2": "Tactical redesign of top-funnel offers layout",
    "db-p3-obj3": "Optimized campaign ROI on Paid Media channels",
    "profile-status": "Active in Madrid",
    "connections-count": "+500 connections",
    "linkedin-subtitle": "Professional network & CRO",
    "connect-linkedin-cta": "Connect →",
    "email-tag": "Direct Contact",
    "email-subtitle": "Usually replies within 24 hours",
    "send-email-cta": "Write email →",
    "cv-tag": "Curriculum Vitae",
    "cv-subtitle": "PDF Format · Updated in 2026",
    "download-cv-cta": "Download CV →",
    "github-subtitle": "Code projects & development",
    "github-cta": "View code →",
    "vercel-subtitle": "Projects in production",
    "vercel-cta": "View deployments →",
    "linear-subtitle": "Agile product execution",
    "linear-cta": "Agile delivery →"
  }
};

let currentLang = localStorage.getItem('lang') || 'es';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.innerText = lang === 'es' ? 'EN' : 'ES';
  });
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });

  // Toggle visibility of elements with data-lang attribute
  document.querySelectorAll('[data-lang]').forEach(el => {
    if (el.getAttribute('data-lang') === lang) {
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  });
}

function toggleLanguage() {
  setLanguage(currentLang === 'es' ? 'en' : 'es');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
});

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: "smooth" });
  
  const fabMenu = document.getElementById("fabMenu");
  const fab = document.getElementById("fabButton");
  if (fabMenu) fabMenu.classList.remove("active");
  if (fab) fab.classList.remove("active");
}

function openAndScrollProject(id) {
  // Close FAB menu if open
  const fab = document.getElementById('fabButton');
  const menu = document.getElementById('fabMenu');
  const body = document.body;
  
  if (fab && fab.classList.contains('active')) {
    fab.classList.remove('active');
    menu.classList.remove('active');
    body.classList.remove('menu-open');
    fab.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    fab.setAttribute('aria-label', currentLang === 'es' ? 'Ver proyectos' : 'View projects');
  }

  const el = document.getElementById(id);
  if (!el) return;
  
  const isOpen = el.classList.contains("active");
  if (!isOpen) {
    toggleProject(el);
  } else {
    setTimeout(() => {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 80);
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".work-item").forEach(item => {
  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleProject(item);
    }
  });
});

// Scroll Spy for Desk Navigation
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observerCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      if (!id) return;
      
      document.querySelectorAll('.side-nav a, .nav-links a, .nav-main-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        const onclick = link.getAttribute('onclick');
        
        if (href === `#${id}` || (onclick && onclick.includes(`scrollToId('${id}')`))) {
          link.classList.add('active');
        }
      });
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
document.querySelectorAll('section[id]').forEach(section => observer.observe(section));

// Zoom Modal Logic
document.addEventListener("DOMContentLoaded", () => {
  const zoomTargets = document.querySelectorAll('.zoom-target');
  const zoomModal = document.getElementById('zoomModal');
  const zoomModalImg = document.getElementById('zoomModalImg');

  if (zoomTargets.length > 0 && zoomModal && zoomModalImg) {
    zoomTargets.forEach(img => {
      img.addEventListener('click', (e) => {
        // Prevent project toggle if inside a clickable article
        e.stopPropagation();
        zoomModalImg.src = img.src;
        zoomModal.classList.add('active');
        document.body.style.overflow = "hidden";
      });
    });
  }
});

function closeZoomModal(e) {
  if (e) {
    // Si hace click exactamente en la imagen ampliada, no cerramos
    if (e.target.id === 'zoomModalImg') {
      return; 
    }
  }
  const zoomModal = document.getElementById('zoomModal');
  if (zoomModal) {
    zoomModal.classList.remove('active');
    document.body.style.overflow = "";
  }
}


// ─── Scroll-driven entrance animations ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });

  // Key content blocks
  var selectors = [
    '.eyebrow', '.section-title', '.about-grid', '.about-signature',
    '.contact-title', '.contact-text', '.hiring-status', '.contact-actions',
    '.skills-grid', '.edu-list', '.footer'
  ].join(', ');

  document.querySelectorAll(selectors).forEach(function (el) {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Work items — staggered entrance (0, 60ms, 120ms ...)
  document.querySelectorAll('.work-item').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.07) + 's';
    revealObserver.observe(el);
  });

  // Skill tags with stagger
  document.querySelectorAll('.tag').forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = (Math.min(i, 6) * 0.05) + 's';
    revealObserver.observe(el);
  });
});

// --- Interactive Tables & Expandable Rows (Notion/Linear style) --------------
document.addEventListener('DOMContentLoaded', function () {
  initInteractiveTables();
});

function initInteractiveTables() {
  const tableData = {
    // ILUNION ES
    "Visibilidad del motor de reservas": {
      metric: "Conversi�n de Embudo",
      value: "+18.4% CTR",
      meta: "Tasa de inicio de b�squeda",
      insight: "Adobe Analytics identific� una p�rdida del 34% de usuarios con alta intenci�n de compra antes del primer scroll debido al ruido visual de banners promocionales superiores."
    },
    "Comportamiento en mobile (post-launch Clarity)": {
      metric: "Rendimiento Mobile",
      value: "-45% Errores",
      meta: "Rage clicks en fecha",
      insight: "Los mapas de calor t�rmicos de Clarity revelaron que el 52% de los usuarios de smartphones pulsaban accidentalmente fuera del selector t�ctil. Se implement� una interacci�n gestual."
    },
    "Nuevo insight de producto detectado": {
      metric: "Descubrimiento UX",
      value: "22% Usuarios",
      meta: "B�squeda por destino general",
      insight: "Un porcentaje considerable de usuarios utilizaba el buscador introduciendo t�rminos regionales ('Costa del Sol') en lugar de hoteles espec�ficos, lo que impuls� una nueva iniciativa CRO."
    },
    "Coherencia desktop / mobile": {
      metric: "Paridad Dispositivo",
      value: "3x Fricci�n",
      meta: "Diferencia t�ctil corregida",
      insight: "El modelo de pointer (desktop) fomentaba exploraci�n flotante, mientras que en mobile la fijaci�n visual requer�a CTAs anclados arriba de los resultados de b�squeda."
    },
    "Indicadores de conversi�n (en validaci�n)": {
      metric: "Consolidaci�n Anal�tica",
      value: "6 Semanas",
      meta: "Per�odo de observaci�n est�ndar",
      insight: "Los datos comerciales iniciales muestran incremento de revenue neto por sesi�n. Se requiere el ciclo completo para asegurar significancia estad�stica del 95% frente al hist�rico."
    },

    // ILUNION EN
    "Booking engine visibility": {
      metric: "Funnel Conversion",
      value: "+18.4% CTR",
      meta: "Search initiation rate",
      insight: "Adobe Analytics tracked a 34% user drop-off on first scroll because promotional banners pushed the primary action below the fold."
    },
    "Mobile behaviour (post-launch Clarity)": {
      metric: "Mobile Performance",
      value: "-45% Errors",
      meta: "Rage clicks on dates",
      insight: "Clarity heatmaps flagged high tap error rates on mobile dates. We replaced standard dropdowns with native mobile swipe gestures."
    },
    "New product insight detected": {
      metric: "UX Discovery",
      value: "22% Visitors",
      meta: "Generic destination intent",
      insight: "A substantial volume of users typed regional terms ('Costa del Sol') instead of hotel properties, signaling a demand for localized product suggestions."
    },
    "Desktop / mobile coherence": {
      metric: "Device Parity",
      value: "3x Friction",
      meta: "Touch vs click gap fixed",
      insight: "Pointer interfaces favored hover-based state discovery, whereas touch screens required persistent, top-anchored conversion elements."
    },
    "Conversion indicators (under validation)": {
      metric: "Data Significance",
      value: "6 Weeks",
      meta: "Statistical window required",
      insight: "Net direct channel revenue is trending upward, but standard statistical testing requires a full 6-week cohort to eliminate seasonal bias."
    },

    // ACADEMIC ES
    "Contraste WCAG": {
      metric: "Accesibilidad Visual",
      value: "AA Cumplido",
      meta: "Criterio 1.4.3 (4.5:1)",
      insight: "Se redise�� el contraste de color para textos informativos y alertas, asegurando legibilidad completa en pantallas de bajo brillo corporativas."
    },
    "Navegaci�n por teclado": {
      metric: "Accesibilidad Teclado",
      value: "100% Accesible",
      meta: "Criterio 2.1.1 (Sin rat�n)",
      insight: "Se eliminaron trampas de foco en formularios y se garantiz� la navegaci�n secuencial con tabulaci�n nativa del sistema operativo."
    },
    "Jerarqu�a sem�ntica": {
      metric: "Lectores de Pantalla",
      value: "Lighthouse 100",
      meta: "Criterio 1.3.1 (Info/Relaci�n)",
      insight: "Estructuraci�n l�gica de headings (h1-h6) y etiquetas ARIA para navegaci�n asistida fluida en perfiles de profesor y alumno."
    },
    "Estados interactivos": {
      metric: "Feedback de Interfaz",
      value: "Foco Visible",
      meta: "Criterio 2.4.7 (Focus rings)",
      insight: "Se dise�aron anillos de foco consistentes con contraste superior a 3:1 para que usuarios con discapacidad motora sigan el cursor visualmente."
    },
    "Consistencia entre m�dulos": {
      metric: "Eficiencia de Producto",
      value: "Design Tokens",
      meta: "Reducci�n de deuda t�cnica",
      insight: "Centralizaci�n de colores, fuentes y espaciados en variables de sistema reutilizables en m�ltiples proyectos internos."
    },

    // ACADEMIC EN
    "WCAG Contrast": {
      metric: "Visual Accessibility",
      value: "AA Compliant",
      meta: "Criterion 1.4.3 (4.5:1)",
      insight: "Redesigned visual contrast for status indicators and body text, guaranteeing readability under low-luminance workspace conditions."
    },
    "Keyboard navigation": {
      metric: "Interaction Design",
      value: "100% Functional",
      meta: "Criterion 2.1.1 (No mouse)",
      insight: "Eliminated keyboard traps within modal steps and unified tab orders to ensure seamless non-mouse accessibility."
    },
    "Semantic hierarchy": {
      metric: "Screen Readers",
      value: "Lighthouse 100",
      meta: "Criterion 1.3.1 (Info/Relation)",
      insight: "Aligned section tags and ARIA descriptors to build an accurate mental model for blind or visually impaired users."
    },
    "Interactive states": {
      metric: "Visual Feedback",
      value: "Focus Rings",
      meta: "Criterion 2.4.7 (Focus rings)",
      insight: "Created highly contrasting keyboard focus outlines across the platform to assist motor-impaired site navigation."
    },
    "Consistency across modules": {
      metric: "Product Scaling",
      value: "Design Tokens",
      meta: "Reduced tech debt",
      insight: "Standardized all interface parameters into a shared design token architecture, guaranteeing pixel-perfect alignment across future features."
    }
  };

  document.querySelectorAll('.metrics-table tbody tr').forEach(function (row) {
    const cells = row.querySelectorAll('td');
    if (cells.length === 0) return;

    // Get the indicator text to map data
    const key = cells[0].textContent.trim();
    const data = tableData[key];

    if (data) {
      row.style.cursor = 'pointer';

      row.addEventListener('click', function () {
        const isExpanded = row.classList.contains('row-expanded');

        // Close any expanded sibling in this table
        row.parentElement.querySelectorAll('tr').forEach(function (r) {
          if (r !== row) {
            r.classList.remove('row-expanded');
            const next = r.nextElementSibling;
            if (next && next.classList.contains('table-expanded-row')) {
              next.querySelector('.expanded-row-content').style.maxHeight = '0';
            }
          }
        });

        if (!isExpanded) {
          row.classList.add('row-expanded');
          let nextRow = row.nextElementSibling;

          if (!nextRow || !nextRow.classList.contains('table-expanded-row')) {
            // Create the expandable detail row
            nextRow = document.createElement('tr');
            nextRow.className = 'table-expanded-row';
            
            const cell = document.createElement('td');
            cell.colSpan = cells.length;
            
            cell.innerHTML = `
              <div class="expanded-row-content" style="max-height: 0; overflow: hidden; transition: max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1), padding 0.35s ease;">
                <div class="expanded-detail-grid">
                  <div class="expanded-stat-box">
                    <div class="expanded-stat-label">${key.match(/[a-z]/i) ? 'Product Metric' : 'M�trica de Producto'}</div>
                    <div class="expanded-stat-value">${data.value}</div>
                    <div class="expanded-stat-meta">${data.meta}</div>
                  </div>
                  <div class="expanded-insight-box">
                    <div class="expanded-insight-title">${key.match(/[a-z]/i) ? 'Telemetry Insight' : 'Insight de Telemetr�a'}</div>
                    <p class="expanded-insight-text">${data.insight}</p>
                  </div>
                </div>
              </div>
            `;
            nextRow.appendChild(cell);
            row.parentNode.insertBefore(nextRow, row.nextSibling);
          }

          // Trigger transition
          setTimeout(function () {
            const content = nextRow.querySelector('.expanded-row-content');
            content.style.maxHeight = '240px';
            content.style.padding = '20px 24px 20px 28px';
          }, 10);
        } else {
          row.classList.remove('row-expanded');
          const nextRow = row.nextElementSibling;
          if (nextRow && nextRow.classList.contains('table-expanded-row')) {
            const content = nextRow.querySelector('.expanded-row-content');
            content.style.maxHeight = '0';
            content.style.padding = '0 24px';
          }
        }
      });
    }
  });
}
