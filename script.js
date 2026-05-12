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
    setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
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
    "hero-description-1": "Formo parte del equipo de Negocio Digital en ILUNION Hotels, optimizando el canal directo mediante diseño estratégico, CRO y decisiones basadas en datos.",
    "hero-description-2": "Mi trabajo conecta la experiencia de usuario con objetivos reales de negocio: conversión, revenue y captación.",
    "hero-description-3": "Diseño soluciones que no solo son visuales, sino que resuelven problemas operativos y de rentabilidad en entornos de alta complejidad.",
    "work-eyebrow": "Casos de estudio seleccionados",
    "label-impact-badge": "IMPACTO",
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
    "about-intro": "Product Designer con mentalidad de negocio y enfoque en resultados.",
    "about-text-1": "Entiendo el diseño como una herramienta para resolver problemas y alcanzar objetivos estratégicos. Actualmente, dentro del equipo de Negocio Digital de ILUNION Hotels, trabajo directamente sobre el canal directo de la compañía —el cual representó un 13% de la venta total en 2025—, donde cada decisión UX tiene un impacto medible en la rentabilidad.",
    "about-text-2": "Mi enfoque combina el análisis de datos, el customer journey y la experimentación continua para crear productos digitales que escalan y generan valor real.",
    "expertise-eyebrow": "Especialidades",
    "tag-ux-research": "UX Research & Discovery",
    "tag-ui-design": "UI Design & Design Systems",
    "tag-cro": "CRO & Experimentación",
    "tag-product-thinking": "Product Thinking & Business Strategy",
    "tag-data-analysis": "Product Analytics (Adobe / Clarity)",
    "tag-accessibility": "Accesibilidad (WCAG)",
    "label-experience": "Experiencia",
    "label-skills": "Capacidades",
    "label-education": "Formación",
    "exp-cv-cta": "Descargar CV Completo",
    "contact-home-title": "¿Hablamos sobre estrategia y producto?",
    "contact-home-desc": "Disponible para colaborar en proyectos donde el diseño y el negocio se encuentren para crear impacto real.",
    "status-label": "Disponible para nuevos retos estratégicos",
    "disclaimer": "Los proyectos mostrados han sido desarrollados en el contexto de mi experiencia profesional. Todas las marcas y logotipos pertenecen a sus respectivos propietarios."
  },
  en: {
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
    "hero-description-1": "I am part of the Digital Business team at ILUNION Hotels, optimizing the direct channel through strategic design, CRO, and data-driven decisions.",
    "hero-description-2": "My work bridges user experience with real business goals: conversion, revenue, and acquisition.",
    "hero-description-3": "I design solutions that are not just visual but solve operational and profitability problems in high-complexity environments.",
    "work-eyebrow": "Selected Case Studies",
    "label-impact-badge": "IMPACT",
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
    "about-intro": "Business-minded Product Designer focused on results.",
    "about-text-1": "I understand design as a tool to solve problems and achieve strategic goals. Currently, within the Digital Business team at ILUNION Hotels, I work directly on the company's direct channel —which accounted for 13% of total sales in 2025—, where every UX decision has a measurable impact on profitability.",
    "about-text-2": "My approach combines data analysis, customer journey mapping, and continuous experimentation to create digital products that scale and generate real value.",
    "expertise-eyebrow": "Core Specialties",
    "tag-ux-research": "UX Research & Discovery",
    "tag-ui-design": "UI Design & Design Systems",
    "tag-cro": "CRO & Experimentation",
    "tag-product-thinking": "Product Thinking & Business Strategy",
    "tag-data-analysis": "Product Analytics (Adobe / Clarity)",
    "tag-accessibility": "Accessibility (WCAG)",
    "label-experience": "Experience",
    "label-skills": "Capabilities",
    "label-education": "Education",
    "exp-cv-cta": "Download Full CV",
    "contact-home-title": "Let's talk about strategy and product",
    "contact-home-desc": "Available to collaborate on projects where design and business meet to create real impact.",
    "status-label": "Available for new strategic challenges",
    "disclaimer": "The projects shown have been developed in the context of my professional experience. All trademarks and logos belong to their respective owners."
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
}

function toggleLanguage() {
  setLanguage(currentLang === 'es' ? 'en' : 'es');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  if (currentLang === 'en') setLanguage('en');
});

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "start" });
  
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
    setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
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
