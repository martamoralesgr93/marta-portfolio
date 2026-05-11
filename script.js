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
    "label-context": "Contexto",
    "label-hypothesis": "Hipótesis e Insight",
    "label-solution": "Solución y Decisiones",
    "label-impact": "Impacto Esperado",
    "label-read-more": "Ver caso de estudio",
    "p1-title": "ILUNION Hotels — Acceso al motor",
    "p1-subtitle": "Rediseño del acceso al motor de reservas",
    "p2-title": "CEF — Herramienta de gestión académica",
    "p2-subtitle": "Centralización de la gestión académica",
    "p3-title": "ILUNION Hotels — Componente de Ofertas y Conversión",
    "p3-subtitle": "Diagnóstico CRO y rediseño del bloque de ofertas",
    "p1-summary": "Reorganización de la jerarquía de resultados en la fase de acceso para facilitar el primer paso de búsqueda.",
    "p2-summary": "Rediseño de la gestión logística para centralizar procesos y reducir errores administrativos.",
    "p3-summary": "Componente de home diagnosticado, rediseñado y validado con datos. La solución mejoró la conversión directa un +13% y se extendió a otras páginas del site.",
    "p1-context": "Motor de reservas para una cadena hotelera internacional. El objetivo estratégico era identificar puntos de fricción e incrementar el volumen de reservas directas.",
    "p1-problem": "Elevado abandono en la fase inicial del funnel. Los analíticos revelaron que la interfaz generaba sobrecarga antes de que el usuario definiera su intención de viaje.",
    "p1-hypothesis": "Un buscador denso en el primer impacto reduce la acción. Si implementamos un perfilado conversacional previo y simplificamos los flujos posteriores, guiaremos la decisión de forma natural.",
    "p1-solution": "Se implementó un 'pop-up' inteligente como puerta de entrada para recoger necesidades reales (destino, qué buscas), segmentando cualitativamente el tráfico.",
    "p1-solution2": "Tras validar esta fricción inicial, se reestructuró la jerarquía completa del motor, primando la eficiencia operativa y alineando la experiencia visual con el sistema de diseño.",
    "p1-context-line": "Actualmente en ILUNION Hotels, en Producto Digital (UX/UI & CRO)",
    "p2-context-line": "Proyecto desarrollado durante mi experiencia en CEF como UX/UI & Front-end",
    "p3-context-line": "Actualmente en ILUNION Hotels, en Producto Digital (Growth & CRO)",
    "p1-impact": "Reorganización de la jerarquía de resultados para facilitar la selección inmediata de habitación.",
    "p2-impact": "Rediseño de la gestión logística para centralizar la información y reducir errores administrativos.",
    "p3-impact": "Eliminación de pasos intermedios en el flujo de captación para simplificar el proceso de registro.",
    "disclaimer": "Los proyectos mostrados han sido desarrollados en el contexto de mi experiencia profesional. Todas las marcas y logotipos pertenecen a sus respectivos propietarios.",
    "nav-home": "Inicio",
    "profile-name": "Marta Morales García de los Ríos",
    "profile-role": "Product Designer",
    "hero-tagline": "Diseño estratégico para impactar en producto y negocio",
    "status-text": "Disponible para proyectos",
    "hero-subtitle": "Transformo problemas complejos en soluciones digitales que conectan las necesidades del usuario con los objetivos de crecimiento.",
    "nav-work": "Proyectos",
    "nav-experience-short": "CV",
    "nav-about": "Sobre mí",
    "nav-contact": "Contacto",
    "label-problem": "Problema",
    "label-role": "Rol",
    "label-solution": "Solución",
    "label-result": "Resultado",
    "work-eyebrow": "Proyectos seleccionados",
    "ilunion-title": "ILUNION Hotels — CRO",
    "ilunion-summary": "Optimización del funnel de reservas mediante análisis de comportamiento y experimentación. Identificación de fricciones clave y evolución del producto hacia una experiencia más clara y orientada a conversión.",
    "ilunion-phase1-title": "01. Análisis y Experimentación (CRO)",
    "ilunion-phase1-label1": "Solución y Lanzamiento",
    "ilunion-phase1-label2": "Impacto y Aprendizaje",
    "ilunion-p1": "La conversión en el proceso de reserva era baja y no estaba claro qué elementos del flujo estaban generando fricción durante la toma de decisiones.",
    "ilunion-p2": "Desde una perspectiva de negocio, analicé el comportamiento de los usuarios mediante Adobe Analytics, identificando puntos de abandono y áreas críticas dentro del funnel.",
    "ilunion-p3": "Definí y diseñé un pop-up como punto de entrada al motor de reservas, que actúa como filtro inicial permitiendo al usuario indicar qué busca antes de acceder al proceso.",
    "ilunion-p4": "La interacción guía al usuario a través de preguntas clave (destino, necesidades y tipo de viaje), transformando su intención en una búsqueda más relevante dentro del motor.",
    "ilunion-p5": "La solución se implementó en AEM y se validó mediante un experimento en Adobe Target (90% control / 10% variante).",
    "ilunion-li1": "Identificación de fricción basada en datos",
    "ilunion-li2": "Validación de impacto mediante experimentación",
    "ilunion-li3": "Flujo poco claro para el usuario",
    "ilunion-impact-h": "Impacto y evolución:",
    "ilunion-imp1": "Experimento implementado en producción con resultados positivos",
    "ilunion-imp2": "Los aprendizajes impulsaron el rediseño del motor de reservas",
    "ilunion-imp3": "La solución inicial evolucionó y ya no está activa",
    "ilunion-phase2-title": "02. Evolución Estratégica: Rediseño Motor de Reserva",
    "ilunion-phase2-p1": "El análisis persistente con Adobe Analytics detectó un abandono crítico entre el inicio del funnel y la búsqueda definida. Los datos confirmaban las fricciones detectadas en la fase 1.",
    "ilunion-phase2-p2": "El reto consistía en rediseñar la lógica operativa para simplificar la jerarquía de información y reducir los puntos de decisión innecesarios.",
    "ilunion-phase2-strategy-label": "Estrategia de Diseño",
    "ilunion-phase2-strategy-p": "Reorganicé la lógica del proceso centrada en la eficiencia operativa, mejorando la jerarquía visual de los filtros y asegurando una consistencia total con el sistema de diseño corporativo.",
    "ilunion-phase2-validation-label": "Validación de Negocio",
    "ilunion-phase2-li1": "Propuesta validada y aprobada por los stakeholders de negocio.",
    "ilunion-phase2-li2": "Arquitectura de información optimizada lista para el desarrollo técnico.",
    "ilunion-phase2-li3": "Implementación planificada tras la fase de validación de usabilidad.",
    "academic-title": "Herramienta Académica — Calendario",
    "academic-summary": "Diseño de una herramienta de gestión académica para centralizar procesos entre alumnos y profesores, mejorando la organización, la toma de decisiones y la eficiencia operativa.",
    "academic-phase1-title": "01. Contexto y Necesidad Operativa",
    "academic-p": "El ecosistema digital existente no permitía una gestión integrada entre alumnos y profesores, generando silos de información y retrasos operativos.",
    "academic-p2": "Tras una auditoría interna, se detectó que procesos críticos como la reserva de espacios o la matriculación se gestionaban de forma fragmentada.",
    "academic-p3": "Desde el departamento de IT, analicé las necesidades de los distintos perfiles, entendiendo sus puntos de dolor.",
    "academic-phase2-title": "02. Estrategia de Producto",
    "academic-sol": "Conceptualicé y diseñé una herramienta centralizada basada en un sistema de calendario inteligente. La arquitectura permite orquestar todas las acciones académicas desde un único punto de verdad.",
    "academic-sol-p2": "La solución implementa una lógica de permisos por perfil, diferenciando capacidades entre profesores (gestión de asistencia, notas) y alumnos (matriculación y seguimiento).",
    "academic-phase3-title": "03. Impacto",
    "academic-imp-h": "Creación de un ecosistema íntegro para la gestión académica interna.",
    "academic-imp-h2": "Aumento en la eficiencia logística y reducción del tiempo administrativo.",
    "offers-title": "Rediseño bloque de ofertas",
    "offers-summary": "Rediseño de un componente clave para reducir fricción, mejorará la jerarquía visual y aumentar la visibilidad del producto.",
    "offers-phase1-title": "01. Auditoría y Comportamiento",
    "offers-phase1-p1": "Tras una auditoría de comportamiento con Microsoft Clarity, detectamos que el bloque de ofertas en la home generaba una alta tasa de rebote. El usuario necesitaba un scroll excesivo antes de comprender la propuesta de valor.",
    "offers-phase2-title": "02. Optimización de Conversión",
    "offers-phase2-label": "Diseño y Prototipado",
    "offers-sol": "Rediseñé la arquitectura del bloque para maximizar el \"above the fold\", integrando contenido, incentivo y acción en un mismo plano visual compacto.",
    "offers-phase3-title": "03. Resultados CRO",
    "offers-phase3-li1": "Optimización visual del funnel y reducción drástica de la carga cognitiva.",
    "offers-phase3-li2": "Incremento medible en la captación de nuevos miembros del programa de fidelización.",
    "about-eyebrow": "Sobre mí",
    "about-intro": "Product Designer enfocado en la intersección entre experiencia de usuario, producto y estrategia de negocio.",
    "about-text": "Mi enfoque se centra en transformar problemas complejos en soluciones digitales coherentes y escalables, optimizando procesos para maximizar el valor real. Utilizo insights basados en datos y comportamiento de usuario para guiar decisiones de diseño que impactan directamente en los objetivos estratégicos.",
    "expertise-eyebrow": "Capacidades Estratégicas",
    "tag-ux-research": "UX Research & Discovery",
    "tag-ui-design": "UI Design & Design Systems",
    "tag-cro": "CRO & Experimentación (A/B Testing)",
    "tag-user-testing": "Validación de Usuario",
    "tag-product-thinking": "Strategy & Product Thinking",
    "tag-data-analysis": "Product Analytics (Adobe Analytics)",
    "tag-accessibility": "Accesibilidad (WCAG)",
    "tag-prototyping": "Prototipado Avanzado",
    "tag-figma": "Figma",
    "tag-adobe": "Adobe Creative Cloud / AEM",
    "tag-hotjar": "Microsoft Clarity / Hotjar",
    "tag-collaboration": "Jira / Confluence",
    "skill-cat-design": "Diseño & Producto",
    "skill-cat-strategy": "Gestión & Datos",
    "skill-cat-tools": "Herramientas",
    "contact-home-title": "¿Hablamos sobre el impacto de tu producto?",
    "contact-home-desc": "Explorando nuevas oportunidades estratégicas donde el diseño sea el motor de crecimiento y la resolución de problemas complejos.",
    "status-label": "Abierta a nuevas oportunidades estratégicas",
    "exp-hero-title": "Product Designer (UX/UI & CRO)",
    "exp-hero-subtitle": "Especialista en convertir insights de usuario en soluciones de diseño que impulsan el crecimiento y el impacto estratégico.",
    "exp-cv-cta": "Descargar CV",
    "exp-summary": "Product Designer con enfoque estratégico y mentalidad de producto. Me apasiona encontrar el equilibrio entre las necesidades del usuario y el esfuerzo técnico para maximizar el impacto, transformando insights en decisiones de diseño que optimizan procesos y resuelven problemas reales.",
    "nav-experience": "Experiencia",
    "label-experience": "Experiencia",
    "label-skills": "Capacidades",
    "label-education": "Formación",
    "label-contributions": "Principales aportaciones:",
    "exp-role-ilunion": "Product Designer (UX/UI & CRO)",
    "exp-comp-ilunion": "ILUNION Hotels",
    "exp-date-ilunion": "Sep 2024 — Actualmente",
    "exp-pt1-ilunion": "Optimización del canal directo como palanca de crecimiento digital",
    "exp-pt2-ilunion": "Diseño y optimización de journeys orientados a conversión",
    "exp-pt3-ilunion": "Ejecución de experimentos CRO para reducir fricción y mejorar la conversión",
    "exp-pt4-ilunion": "Definición de copys orientados a captación y loyalty",
    "exp-pt5-ilunion": "Decisiones basadas en datos con Adobe Analytics",
    "exp-pt6-ilunion": "Colaboración con Marketing, BI y Comercial",
    "exp-role-cef": "UX/UI Designer | Web & Accesibilidad",
    "exp-comp-cef": "CEF",
    "exp-date-cef": "2024",
    "exp-pt1-cef": "Optimización de portales educativos (UX + accesibilidad)",
    "exp-pt2-cef": "Diseño de interfaces claras e intuitivas",
    "exp-pt3-cef": "Implementación de mejoras de accesibilidad",
    "exp-pt4-cef": "Colaboración con desarrollo en soluciones UX/UI",
    "exp-pt5-cef": "Aplicación de Design Thinking",
    "exp-role-actions": "Product Designer (UX/UI) | CRM & Internal Tools",
    "exp-comp-actions": "We are Actions",
    "exp-date-actions": "2020 — 2024",
    "exp-summary-actions": "Inicié mi trayectoria en el equipo como diseñadora gráfica, evolucionando hacia un rol de Product Designer, participando en proyectos digitales donde combiné diseño, tecnología y negocio.",
    "exp-pt1-actions": "Diseño de interfaces accesibles e intuitivas con foco en usabilidad",
    "exp-pt2-actions": "Optimización de experiencias digitales orientadas a conversión",
    "exp-pt3-actions": "Desarrollo frontend para mejorar rendimiento y navegación",
    "exp-pt4-actions": "Creación de identidades digitales para pymes",
    "exp-pt5-actions": "Colaboración con equipos IT en proyectos complejos",
    "exp-role-aimplas": "Diseñadora gráfica (Prácticas)",
    "exp-comp-aimplas": "AIMPLAS",
    "exp-date-aimplas": "2019",
    "exp-summary-aimplas": "Participación en proyectos de innovación tecnológica, desarrollando identidad visual y materiales de comunicación para entornos técnicos.",
    "exp-pt1-aimplas": "Diseño de identidades visuales para proyectos de I+D",
    "exp-pt2-aimplas": "Creación de materiales digitales e impresos para eventos y ferias",
    "exp-pt3-aimplas": "Desarrollo de presentaciones adaptadas a distintos públicos",
    "exp-pt4-aimplas": "Colaboración en equipos multidisciplinares en contextos de innovación",
    "skill-cat-design": "Diseño & Producto",
    "skill-cat-strategy": "Estrategia & CRO",
    "skill-cat-tech": "Herramientas & Tech",
    "edu-title-1": "Bootcamp FULL STACK",
    "edu-spec-1": "Neoland",
    "edu-date-1": "2024",
    "edu-title-2": "Grado en Bellas Artes",
    "edu-spec-2": "UPV",
    "edu-date-2": "2020"
  },
  en: {
    "label-context": "Context",
    "label-hypothesis": "Hypothesis & Insight",
    "label-solution": "Solution & Decisions",
    "label-impact": "Expected Impact",
    "label-read-more": "Read case study →",
    "p1-title": "ILUNION Hotels — Booking Engine",
    "p1-subtitle": "Booking engine entry redesign",
    "p2-title": "CEF — Academic Management Tool",
    "p2-subtitle": "Centralization of academic management",
    "p3-title": "ILUNION Hotels — Offers & Conversion Component",
    "p3-subtitle": "CRO Diagnosis & Offers Block Redesign",
    "p1-summary": "Reorganization of result hierarchy at the access stage to facilitate initial search definition.",
    "p2-summary": "Redesign of logistics management to centralize processes and reduce administrative errors.",
    "p3-summary": "Homepage component diagnosed, redesigned and validated with data. The solution improved direct conversion by +13% and was extended to other site pages.",
    "p1-context": "Booking engine for an international hotel chain. The strategic goal was to identify friction points and increase direct booking volume.",
    "p1-problem": "High abandonment rate in the initial funnel stage. Analytics revealed that the interface generated cognitive overload before users defined their travel intent.",
    "p1-hypothesis": "A dense search interface at the first impact reduces action. Implementing a prior conversational profiling and simplifying subsequent flows will guide decisions naturally.",
    "p1-solution": "A smart pop-up was implemented as an entry gate to gather real needs (destination, what are you looking for), qualitatively segmenting the traffic.",
    "p1-solution2": "After validating this initial friction, the complete engine hierarchy was restructured, prioritizing operational efficiency and aligning the visual experience with the design system.",
    "p1-context-line": "Currently at ILUNION Hotels, in Digital Product (UX/UI & CRO)",
    "p2-context-line": "Project developed during my experience at CEF as UX/UI & Front-end",
    "p3-context-line": "Currently at ILUNION Hotels, in Digital Product (Growth & CRO)",
    "p1-impact": "Reorganization of result hierarchy to facilitate immediate room selection.",
    "p2-impact": "Redesign of logistics management to centralize information and reduce administrative errors.",
    "p3-impact": "Elimination of intermediate steps in the capture flow to simplify the registration process.",
    "disclaimer": "The projects shown have been developed in the context of my professional experience. All trademarks and logos belong to their respective owners.",
    "nav-home": "Home",
    "nav-work": "Projects",
    "nav-experience-short": "CV",
    "nav-about": "About",
    "nav-contact": "Contact",
    "profile-name": "Marta Morales García de los Ríos",
    "profile-role": "Product Designer",
    "hero-tagline": "Strategic design to impact product and business",
    "status-text": "Available for projects",
    "hero-subtitle": "I transform complex problems into digital solutions that bridge user needs with growth objectives.",
    "label-problem": "Problem",
    "label-role": "Role",
    "label-solution": "Solution",
    "label-result": "Result",
    "work-eyebrow": "Selected projects",
    "ilunion-title": "ILUNION Hotels — CRO",
    "ilunion-summary": "Booking funnel optimization through behavioral analysis and experimentation. Identifying key frictions and evolving the product towards a clearer, conversion-oriented experience.",
    "ilunion-phase1-title": "01. Analysis & Experimentation (CRO)",
    "ilunion-phase1-label1": "Solution & Launch",
    "ilunion-phase1-label2": "Impact & Learnings",
    "ilunion-p1": "The booking conversion was low, and it wasn't clear which flow elements were causing friction during user decision-making.",
    "ilunion-p2": "From a business perspective, I analyzed user behavior using Adobe Analytics, identifying drop-off points and critical areas within the funnel.",
    "ilunion-p3": "I defined and designed a pop-up as an entry point to the booking engine, acting as an initial filter allowing users to specify their needs before entering the process.",
    "ilunion-p4": "The interaction guides users through key questions (destination, needs, and trip type), transforming their intent into a more relevant search.",
    "ilunion-p5": "The solution was implemented in AEM and validated through an Adobe Target experiment (90% control / 10% variant).",
    "ilunion-li1": "Data-driven friction identification",
    "ilunion-li2": "Impact validation through experimentation",
    "ilunion-li3": "Unclear user flow addressed",
    "ilunion-impact-h": "Impact and evolution:",
    "ilunion-imp1": "Experiment successfully implemented in production with positive results",
    "ilunion-imp2": "The insights gained drove the complete redesign of the booking engine",
    "ilunion-imp3": "The initial solution served its data-focused purpose before evolving",
    "ilunion-phase2-title": "02. Strategic Evolution: Booking Engine Redesign",
    "ilunion-phase2-p1": "Persistent analysis via Adobe Analytics detected a critical drop-off between the funnel start and defined search. Data confirmed the frictions identified in Phase 1.",
    "ilunion-phase2-p2": "The challenge was to redesign the operational logic to simplify information hierarchy and reduce unnecessary decision points.",
    "ilunion-phase2-strategy-label": "Design Strategy",
    "ilunion-phase2-strategy-p": "I reorganized the process logic focused on operational efficiency, improving filter visual hierarchy and ensuring total consistency with the corporate design system.",
    "ilunion-phase2-validation-label": "Business Validation",
    "ilunion-phase2-li1": "Proposal validated and approved by business stakeholders.",
    "ilunion-phase2-li2": "Optimized information architecture ready for technical development.",
    "ilunion-phase2-li3": "Implementation planned following the usability validation phase.",
    "academic-title": "Academic Tool — Calendar Interface",
    "academic-summary": "Design of an academic management tool to centralize processes between students and teachers, improving organization and operational efficiency through a unified digital interface.",
    "academic-phase1-title": "01. Context & Operational Needs",
    "academic-p": "The existing digital ecosystem did not allow for integrated management between students and teachers, generating information silos and operational delays.",
    "academic-p2": "Following an internal audit, critical processes such as room booking or enrollment were found to be managed in a fragmented manner.",
    "academic-p3": "Working with the IT department, I analyzed the needs of different profiles to understand their structural pain points.",
    "academic-phase2-title": "02. Product Strategy",
    "academic-sol": "I conceptualized and designed a centralized tool based on a smart calendar system. This architecture allows orchestrating all academic actions from a single source of truth.",
    "academic-sol-p2": "The solution implements profile-based permission logic, differentiating capabilities between teachers (attendance management, grading) and students (enrollment and tracking).",
    "academic-phase3-title": "03. Impact",
    "academic-imp-h": "Creation of a comprehensive ecosystem for internal academic management.",
    "academic-imp-h2": "Increased logistic efficiency and reduction in administrative overhead.",
    "offers-title": "Offers Block Redesign",
    "offers-summary": "Redesign of a key component to reduce friction, improve visual hierarchy, and increase product visibility for the loyalty program.",
    "offers-phase1-title": "01. Audit & Behavior",
    "offers-phase1-p1": "Following a behavioral audit with Microsoft Clarity, we detected that the homepage offers block generated a high bounce rate. Users needed excessive scrolling before understanding the value proposition.",
    "offers-phase2-title": "02. Conversion Optimization",
    "offers-phase2-label": "Design & Prototyping",
    "offers-sol": "I redesigned the component architecture to maximize the 'above the fold' impact, integrating content, incentives, and actions into a compact visual plane.",
    "offers-phase3-title": "03. CRO Results",
    "offers-phase3-li1": "Visual optimization of the funnel and drastic reduction in cognitive load.",
    "offers-phase3-li2": "Measurable increase in loyalty program new member sign-ups.",
    "about-eyebrow": "Background & Vision",
    "about-intro": "A product-minded designer working at the intersection of UX and business strategy.",
    "about-text": "Focused on transforming complex challenges into scalable digital experiences that deliver real value. I leverage data-driven insights and behavioral research to guide design decisions that align with strategic business goals.",
    "expertise-eyebrow": "Strategic Capabilities",
    "tag-ux-research": "UX Research & Discovery",
    "tag-ui-design": "UI Design & Design Systems",
    "tag-cro": "CRO & Experimentation (A/B Testing)",
    "tag-user-testing": "User Validation",
    "tag-product-thinking": "Strategy & Product Thinking",
    "tag-data-analysis": "Product Analytics (Adobe Analytics)",
    "tag-accessibility": "Accessibility (WCAG)",
    "tag-prototyping": "Advanced Prototyping",
    "tag-figma": "Figma",
    "tag-adobe": "Adobe Creative Cloud / AEM",
    "tag-hotjar": "Microsoft Clarity / Hotjar",
    "tag-collaboration": "Jira / Confluence",
    "skill-cat-design": "Design & Product",
    "skill-cat-strategy": "Management & Data",
    "skill-cat-tools": "Tools",
    "contact-home-title": "Let's discuss your product's next evolution",
    "contact-home-desc": "Currently open to new strategic opportunities where design acts as a catalyst for growth and solving complex organizational challenges.",
    "status-label": "Open to strategic opportunities",
    "exp-hero-title": "Product Designer (UX/UI & CRO)",
    "exp-hero-subtitle": "Especialista en convertir insights de usuario en soluciones de diseño que impulsan el crecimiento y el impacto estratégico.",
    "exp-cv-cta": "Download CV",
    "exp-summary": "A product-minded designer working at the intersection of UX, product, and business strategy. I focus on transforming complex challenges into scalable digital experiences that deliver real value, leveraging data-driven insights to guide design decisions.",
    "nav-experience": "Experience",
    "label-experience": "Experience",
    "label-skills": "Capabilities",
    "label-education": "Education",
    "label-contributions": "Key contributions:",
    "exp-role-ilunion": "Product Designer (UX/UI & CRO)",
    "exp-comp-ilunion": "ILUNION Hotels",
    "exp-date-ilunion": "Sep 2024 — Present",
    "exp-pt1-ilunion": "Optimization of the direct channel as a digital growth lever",
    "exp-pt2-ilunion": "Design and optimization of conversion-oriented journeys",
    "exp-pt3-ilunion": "Execution of CRO experiments to reduce friction and improve conversion",
    "exp-pt4-ilunion": "Definition of acquisition and loyalty oriented copy",
    "exp-pt5-ilunion": "Data-driven decisions using Adobe Analytics",
    "exp-pt6-ilunion": "Collaboration with Marketing, BI, and Commercial teams",
    "exp-role-cef": "UX/UI Designer | Web & Accessibility",
    "exp-comp-cef": "CEF",
    "exp-date-cef": "2024",
    "exp-pt1-cef": "Optimization of educational portals (UX + accessibility)",
    "exp-pt2-cef": "Design of clear and intuitive interfaces",
    "exp-pt3-cef": "Implementation of accessibility enhancements",
    "exp-pt4-cef": "Collaboration with development on UX/UI solutions",
    "exp-pt5-cef": "Application of Design Thinking",
    "exp-role-actions": "Product Designer (UX/UI) | CRM & Internal Tools",
    "exp-comp-actions": "We are Actions",
    "exp-date-actions": "2020 — 2024",
    "exp-summary-actions": "I began my journey in the team as a graphic designer, evolving into a Product Designer role, participating in digital projects where I combined design, technology, and business.",
    "exp-pt1-actions": "Design of accessible and intuitive interfaces with a focus on usability",
    "exp-pt2-actions": "Optimization of conversion-oriented digital experiences",
    "exp-pt3-actions": "Frontend development to improve performance and navigation",
    "exp-pt4-actions": "Creation of digital identities for SMEs",
    "exp-pt5-actions": "Collaboration with IT teams on complex projects",
    "exp-role-aimplas": "Graphic Designer (Internship)",
    "exp-comp-aimplas": "AIMPLAS",
    "exp-date-aimplas": "2019",
    "exp-summary-aimplas": "Participation in technological innovation projects, developing visual identity and communication materials for technical environments.",
    "exp-pt1-aimplas": "Visual identity design for R&D projects",
    "exp-pt2-aimplas": "Creation of digital and print materials for events and trade shows",
    "exp-pt3-aimplas": "Development of presentations adapted to different audiences",
    "exp-pt4-aimplas": "Collaboration in multidisciplinary teams in innovation contexts",
    "skill-cat-design": "Design & Product",
    "skill-cat-strategy": "Strategy & CRO",
    "skill-cat-tech": "Tools & Tech",
    "edu-title-1": "Full Stack Bootcamp",
    "edu-spec-1": "Neoland",
    "edu-date-1": "2024",
    "edu-title-2": "Bachelor's Degree in Fine Arts",
    "edu-spec-2": "UPV",
    "edu-date-2": "2020"
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
  }

  const el = document.getElementById(id);
  if (!el) return;
  
  const menu = document.getElementById("fabMenu");
  const fab = document.getElementById("fabButton");
  menu.classList.remove("active");
  fab.classList.remove("active");
  fab.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
  fab.setAttribute('aria-label', currentLang === 'es' ? 'Abrir menú rápido' : 'Open quick menu');

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
      
      document.querySelectorAll('.side-nav a, .nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
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
