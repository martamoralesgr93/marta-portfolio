/**
 * Marta Morales Portfolio - Interactive Chatbot & Back-to-Top Widget
 * Handles conversational AI agent, quick suggestion chips, responsive drawer,
 * and smooth scroll-to-top behavior.
 */

(function () {
  'use strict';

  function getLang() {
    return document.documentElement.classList.contains('lang-en') ||
      document.documentElement.getAttribute('lang') === 'en'
      ? 'en'
      : 'es';
  }

  // Inject required HTML if not already in document
  function ensureWidgets() {
    // 1. Chat Trigger
    if (!document.getElementById('chat-trigger')) {
      var triggerBtn = document.createElement('button');
      triggerBtn.id = 'chat-trigger';
      triggerBtn.setAttribute('aria-label', getLang() === 'en' ? 'Open chat' : 'Abrir chat');
      triggerBtn.innerHTML =
        '<img loading="eager" decoding="async" class="icon-chat" src="assets/logo.png" alt="Marta" onerror="this.style.display=\'none\';this.insertAdjacentHTML(\'afterend\',\'<svg class=\\\'icon-chat\\\' style=\\\'width:24px;height:24px;padding:12px;box-sizing:border-box;\\\' fill=\\\'none\\\' viewBox=\\\'0 0 24 24\\\' stroke=\\\'white\\\' stroke-width=\\\'2\\\'><path stroke-linecap=\\\'round\\\' stroke-linejoin=\\\'round\\\' d=\\\'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z\\\'/></svg>\')">' +
        '<svg class="icon-close" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2.5">' +
        '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>' +
        '</svg>';
      document.body.appendChild(triggerBtn);
      triggerBtn.addEventListener('click', window.chatToggle);
    }

    // 2. Chat Panel
    if (!document.getElementById('chat-panel')) {
      var panelDiv = document.createElement('div');
      panelDiv.id = 'chat-panel';
      panelDiv.setAttribute('role', 'dialog');
      panelDiv.setAttribute('aria-label', 'Chat con Marta Morales');
      panelDiv.innerHTML =
        '<div class="chat-header">' +
          '<div class="chat-avatar">' +
            '<img loading="lazy" decoding="async" width="300" height="300" src="assets/logo-sinfondo.webp" alt="Marta" style="filter:brightness(0) invert(1);object-fit:contain;padding:4px;" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
            '<span class="chat-avatar-fallback" style="display:none">MM</span>' +
          '</div>' +
          '<div class="chat-header-info">' +
            '<div class="chat-header-name">Marta Morales</div>' +
            '<div class="chat-header-status">' +
              '<span class="chat-status-dot"></span>' +
              '<span class="es">Disponible ahora</span>' +
              '<span class="en">Available now</span>' +
            '</div>' +
          '</div>' +
          '<button id="chat-undo" aria-label="Deshacer" title="Volver atrás">' +
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M9 14L4 9l5-5"></path><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"></path>' +
            '</svg>' +
          '</button>' +
        '</div>' +
        '<div class="chat-messages" id="chatMessages"></div>' +
        '<div class="chat-chips" id="chatChips"></div>' +
        '<div class="chat-input-area">' +
          '<textarea class="chat-input" id="chatInput" rows="1" placeholder="' + (getLang() === 'en' ? 'Type your question…' : 'Escribe tu pregunta…') + '" aria-label="Escribe tu pregunta"></textarea>' +
          '<button class="chat-send" id="chatSendBtn" aria-label="Enviar">' +
            '<svg fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2.5">' +
              '<path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>' +
            '</svg>' +
          '</button>' +
        '</div>';
      document.body.appendChild(panelDiv);

      document.getElementById('chat-undo').addEventListener('click', window.chatUndo);
      document.getElementById('chatSendBtn').addEventListener('click', window.chatSend);
      var chatInp = document.getElementById('chatInput');
      chatInp.addEventListener('keydown', window.chatKeydown);
      chatInp.addEventListener('input', function () { window.chatAutoResize(this); });
    }

    // 3. Back to Top Button
    if (!document.querySelector('.back-to-top')) {
      var toTop = document.createElement('button');
      toTop.className = 'back-to-top';
      toTop.type = 'button';
      toTop.setAttribute('aria-label', getLang() === 'en' ? 'Back to top' : 'Volver arriba');
      toTop.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M12 19V5M5 12l7-7 7 7"/>' +
        '</svg>';
      toTop.addEventListener('click', function () {
        var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      });
      document.body.appendChild(toTop);
    }

    // 4. Chat Nudge Bubble ("¿Hablamos?")
    if (!document.querySelector('.chat-nudge-bubble')) {
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
    }
  }

  // Knowledge Base
  var KB = {
    es: {
      greeting: [
        "¡Hola! Soy el asistente de Marta. Si eres recruiter o hiring manager, estás en el sitio correcto — puedo contarte todo lo que necesitas para tomar una decisión. ¿Por dónde empezamos?"
      ],
      about: [
        "Marta Morales se posiciona como <strong>Product Designer | UX · Design Systems · AI Product Design · CRO</strong>. Su portafolio es en sí mismo un reflejo de este producto, y sus casos de estudio (Travel, EdTech, B2B y Hospitality) demuestran cómo sus habilidades de optimización, automatización de sistemas de diseño y flujos con IA resuelven problemas reales de negocio con impacto medible."
      ],
      experience: [
        "<strong>+4 años de trayectoria</strong> liderando el ciclo completo de producto digital. Su enfoque trasciende el diseño visual: actúa como motor estratégico de CRO, estructurando sistemas de diseño escalables y optimizando interfaces complejas mediante automatizaciones de IA para multiplicar la velocidad de entrega.",
        "Marta no espera un brief cerrado: <strong>identifica el problema raíz, define el enfoque y mide el resultado cuantitativo</strong> frente a constraints técnicos y de negocio reales."
      ],
      skills: [
        "Sus 4 pilares fundamentales son: <strong>UX &amp; Research</strong> (diagnóstico cuantitativo/cualitativo, tests de usabilidad), <strong>Design Systems</strong> (Figma avanzado, tokens, variables, handoff estructurado), <strong>AI Product Design</strong> (MCPs, vibe coding, automatización de flujos) y <strong>CRO</strong> (experimentos basados en datos, A/B Testing, optimización de funnel).",
        "Domina el ciclo completo de producto: <strong>discovery contextual, arquitectura de información, prototipado interactivo, validación con usuarios y handoff a producción</strong>."
      ],
      tools: [
        "Stack diario: <strong>Figma</strong> (design systems, variables, componentes multi-marca), <strong>Adobe Analytics + Clarity / Hotjar</strong> (datos de comportamiento y funnels), <strong>Notion & Jira</strong> (gestión ágil de producto) y colaboración estrecha con ingeniería."
      ],
      cases: [
        "Casos destacados con impacto cuantificado:<br><br>" +
        "• <strong>Paolo by Danny's Jazz</strong> — Identidad visual y ecosistema digital completo de 0 a 1; escaló de 1 a 5 locales sin rediseño y +32% llamadas directas.<br>" +
        "• <strong>Build vs. Buy · Oracle IT Ops</strong> — Diagnóstico de fricción IT embebida en el equipo: recomendación estratégica de construir herramienta interna.<br>" +
        "• <strong>CRO AEM (ILUNION)</strong> — Incremento de conversión directa del 3.36% al 6.5% mediante experimentación y tests A/B continuos.<br>" +
        "• <strong>Booking Engine (ILUNION)</strong> — Rediseño integral del motor de reservas hotelero de discovery a producción.<br>" +
        "• <strong>CEF Design System</strong> — Sistema de diseño EdTech con 17 componentes, tokens y estricto cumplimiento WCAG 2.1 AA.<br><br>" +
        "¿Quieres profundizar en alguno de ellos?"
      ],
      remote: [
        "Marta está <strong>abierta a modelos 100% remoto o híbrido</strong>. Con base en Madrid, cuenta con amplia experiencia trabajando con equipos distribuidos, comunicación asíncrona y handoff riguroso."
      ],
      availability: [
        "Marta está <strong>activamente evaluando su próxima oportunidad</strong> y con disponibilidad para incorporarse de forma inmediata o rápida. Si ves fit en tu equipo, merece la pena hablar pronto."
      ],
      salary: [
        "Las expectativas de Marta están totalmente alineadas con su perfil senior y el mercado actual. Se comenta de forma transparente en los primeros 5 minutos de llamada. ¿Hablamos?"
      ],
      interview: [
        "¡Excelente decisión! Escríbele directamente a <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> — responde habitualmente en menos de 24 horas. También puedes conectar en <a href='https://www.linkedin.com/in/marta-morales-gr' target='_blank' rel='noopener'>LinkedIn</a>."
      ],
      contact: [
        "Contacto directo: <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> · Responde en menos de 24h."
      ],
      paolo: [
        "<strong>Paolo by Danny's Jazz</strong> es el caso de estudio que mejor refleja el <em>ownership end-to-end</em> de Marta:<br><br>" +
        "Una cadena de pizzerías en plena pandemia sin web, sin canal digital ni delivery. Marta diseñó y construyó todo de 0 a 1: identidad de marca, web responsive (Adobe XD → WordPress), 3 customer journeys críticos, integración con plataformas de delivery, cartas QR y seguimiento mensual con Clarity y GA4.<br><br>" +
        "<strong>Resultados:</strong> El producto creció de 1 a 5 locales en 2 años sin necesidad de rediseño, y generó +32% en llamadas directas el primer mes."
      ],
      oracle: [
        "En el caso <strong>Build vs. Buy · Oracle IT Ops</strong>, Marta actúa como diagnosticadora estratégica:<br><br>" +
        "Embebida directamente en el equipo de IT, analizó la fricción en tiempo real. Demostró que Oracle no estaba mal diseñado, sino que sus flujos estandarizados penalizaban la velocidad del equipo interno, justificando con datos la decisión de construir una herramienta interna propia en vez de sobre-parametrizar una suite genérica."
      ],
      cro: [
        "En <strong>CRO AEM (ILUNION)</strong>, Marta implementó una cultura de experimentación continua:<br><br>" +
        "Mediante análisis de funnel en Adobe Analytics y heatmaps, rediseñó componentes clave de reserva, reduciendo puntos de fuga. <strong>Resultado: conversión directa duplicada de 3.36% a 6.5%</strong> con significancia estadística."
      ],
      booking: [
        "El <strong>Booking Engine de ILUNION</strong> fue un rediseño de 0 a producción del flujo de reserva hotelero multi-dispositivo, priorizando accesibilidad, claridad tarifaria y velocidad de checkout."
      ],
      cef: [
        "El <strong>CEF Design System</strong> creó la infraestructura de diseño para una de las principales instituciones EdTech de España: 17 componentes base, arquitectura de tokens semánticos, compatibilidad con temas y accesibilidad WCAG 2.1 AA documentada para ingeniería."
      ],
      whyhire: [
        "Tres razones decisivas para sumar a Marta a tu equipo:<br><br>" +
        "1. <strong>Ownership y Mentalidad de Negocio:</strong> Conecta cada wireframe con métricas de conversión (CRO) y eficiencia operativa.<br>" +
        "2. <strong>Rigor en Design Systems:</strong> Arquitectura de tokens y componentes escalables listos para producción.<br>" +
        "3. <strong>Adopción de IA y Vibe Coding:</strong> Acelera el prototipado y la validación técnica mediante agentes y flujos modernos."
      ],
      default: [
        "Buena pregunta. Te recomiendo consultarlo directamente con Marta en <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> — estará encantada de responderte."
      ]
    },
    en: {
      greeting: [
        "Hi! I'm Marta's assistant. If you are a recruiter or hiring manager, you are in the right spot — I can share everything you need to make an informed hiring decision. Where should we begin?"
      ],
      about: [
        "Marta Morales positions herself as a <strong>Product Designer | UX · Design Systems · AI Product Design · CRO</strong>. Her portfolio demonstrates how data-driven optimization, scalable design system architecture, and AI-assisted workflows solve real business challenges with quantifiable outcomes."
      ],
      experience: [
        "<strong>4+ years</strong> of track record leading end-to-end digital product cycles. Her skillset spans strategic CRO, multi-brand design systems in Figma, and AI-driven automation for development velocity.",
        "Marta identifies the root problem, defines hypotheses, and validates measurable impact against real technical and business constraints."
      ],
      skills: [
        "Core pillars: <strong>UX &amp; Research</strong> (qualitative/quantitative diagnostics, usability testing), <strong>Design Systems</strong> (tokens, Figma variables, clean dev handoff), <strong>AI Product Design</strong> (MCPs, vibe coding, automated pipelines), and <strong>CRO</strong> (A/B testing, funnel optimization).",
        "Full lifecycle mastery: <strong>contextual discovery, information architecture, interactive prototyping, user validation, and production handoff</strong>."
      ],
      tools: [
        "Daily stack: <strong>Figma</strong> (advanced components, design tokens, variables), <strong>Adobe Analytics + Clarity / Hotjar</strong> (funnel telemetry & user journeys), <strong>Notion & Jira</strong> (agile sprint management), and tight dev collaboration."
      ],
      cases: [
        "Featured case studies with proven impact:<br><br>" +
        "• <strong>Paolo by Danny's Jazz</strong> — Full visual identity and digital product from 0 to 1; scaled from 1 to 5 restaurants with no redesign and +32% direct mobile calls.<br>" +
        "• <strong>Build vs. Buy · Oracle IT Ops</strong> — Internal IT friction diagnosis embedded in the team: strategic recommendation to build in-house.<br>" +
        "• <strong>CRO AEM (ILUNION)</strong> — Direct channel conversion increased from 3.36% to 6.5% through continuous A/B testing.<br>" +
        "• <strong>Booking Engine (ILUNION)</strong> — End-to-end hotel reservation engine redesign from discovery to production.<br>" +
        "• <strong>CEF Design System</strong> — EdTech design system with 17 components, tokens, and WCAG 2.1 AA accessibility.<br><br>" +
        "Would you like deeper insights on any of these?"
      ],
      remote: [
        "Marta is <strong>open to 100% remote or hybrid positions</strong>. Based in Madrid, she brings extensive experience in distributed teams, asynchronous collaboration, and meticulous handoff."
      ],
      availability: [
        "Marta is <strong>actively considering her next role</strong> with immediate or prompt availability. If there is a match with your roadmap, let's schedule an intro."
      ],
      salary: [
        "Marta's compensation expectations reflect her senior expertise and current market benchmarks, easily aligned in a brief introductory call."
      ],
      interview: [
        "Great! Reach out directly at <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> — she replies within 24 hours. You can also connect on <a href='https://www.linkedin.com/in/marta-morales-gr' target='_blank' rel='noopener'>LinkedIn</a>."
      ],
      contact: [
        "Direct email: <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> · Replies within 24 hours."
      ],
      paolo: [
        "<strong>Paolo by Danny's Jazz</strong> showcases Marta's full ownership mindset:<br><br>" +
        "Launched during the pandemic with zero digital presence, Marta created everything from scratch: brand identity, responsive website, 3 customer journeys, delivery platform integrations, QR menus, and monthly analytics tracking.<br><br>" +
        "<strong>Results:</strong> The brand scaled from 1 to 5 restaurants in 2 years without requiring any redesign, driving a +32% increase in direct calls in month one."
      ],
      oracle: [
        "In <strong>Build vs. Buy · Oracle IT Ops</strong>, Marta served as an embedded strategic diagnostician, demonstrating with empirical operational data why building an internal tool was superior to patching generic software."
      ],
      cro: [
        "In <strong>CRO AEM (ILUNION)</strong>, Marta drove continuous hypothesis-backed experimentation, doubling direct booking conversion from <strong>3.36% to 6.5%</strong>."
      ],
      booking: [
        "The <strong>ILUNION Booking Engine</strong> redesigned the complete hotel checkout flow across devices, enhancing clarity, accessibility, and speed."
      ],
      cef: [
        "The <strong>CEF Design System</strong> delivered scalable design infrastructure: 17 accessible UI components, semantic tokens, and developer documentation adhering to WCAG 2.1 AA."
      ],
      whyhire: [
        "Three distinct strengths Marta brings:<br><br>" +
        "1. <strong>Product Ownership:</strong> Connects visual decisions with hard conversion and efficiency KPIs.<br>" +
        "2. <strong>Design System Architecture:</strong> Production-ready tokenized components for engineering efficiency.<br>" +
        "3. <strong>AI Speed & Modern Workflows:</strong> Leverages agentic AI and rapid prototyping to ship validated work faster."
      ],
      default: [
        "That's a great question. You can ask Marta directly at <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> — she'll be happy to answer."
      ]
    }
  };

  var CHIPS = {
    es: [
      { label: '¿Quién es Marta?', key: 'about' },
      { label: 'Todos los casos', key: 'cases' },
      { label: 'Paolo · de 0 a 1', key: 'paolo' },
      { label: 'Oracle · diagnóstico IT', key: 'oracle' },
      { label: '¿Por qué contratarla?', key: 'whyhire' },
      { label: 'Concertar entrevista', key: 'interview' }
    ],
    en: [
      { label: 'Who is Marta?', key: 'about' },
      { label: 'All case studies', key: 'cases' },
      { label: 'Paolo · 0 to 1 product', key: 'paolo' },
      { label: 'Oracle · IT diagnosis', key: 'oracle' },
      { label: 'Why hire her?', key: 'whyhire' },
      { label: 'Schedule interview', key: 'interview' }
    ]
  };

  var RULES = [
    { keys: ['quién', 'quien', 'eres', 'about', 'who', 'marta', 'sobre', 'yourself', 'cuéntame', 'presentate'], intent: 'about' },
    { keys: ['experiencia', 'experience', 'años', 'years', 'trayectoria', 'background', 'llevas'], intent: 'experience' },
    { keys: ['habilidad', 'skill', 'sabe', 'know', 'domina', 'masters', 'puedes', 'capaz'], intent: 'skills' },
    { keys: ['herramienta', 'tool', 'adobe', 'jira', 'notion', 'hotjar', 'clarity', 'figma', 'stack'], intent: 'tools' },
    { keys: ['caso', 'case', 'estudio', 'study', 'proyecto', 'project', 'portfolio', 'portafolio', 'trabajo'], intent: 'cases' },
    { keys: ['paolo', 'pizzería', 'pizzeria', 'danny', 'ecosistema', 'delivery', '1 a 5', '1 to 5', 'wordpress'], intent: 'paolo' },
    { keys: ['oracle', 'it ops', 'build vs', 'fricción it', 'friccion', 'herramienta interna', 'incidencia', 'ticket'], intent: 'oracle' },
    { keys: ['booking', 'motor de reservas', 'reserva', 'hotel', 'hospitality'], intent: 'booking' },
    { keys: ['cef', 'edtech', 'accesibilidad', 'wcag', 'token', 'sistema de diseño'], intent: 'cef' },
    { keys: ['ilunion', 'cro', 'conversion', 'conversión', 'a/b', 'ab test', 'aem', 'experimento'], intent: 'cro' },
    { keys: ['remoto', 'remote', 'presencial', 'hybrid', 'hibrido', 'híbrido', 'madrid', 'donde', 'where'], intent: 'remote' },
    { keys: ['disponib', 'available', 'cuándo', 'when', 'incorpor', 'start', 'join', 'empezar'], intent: 'availability' },
    { keys: ['salario', 'salary', 'sueldo', 'wage', 'pay', 'compensacion', 'expectations', 'pretensiones'], intent: 'salary' },
    { keys: ['entrevista', 'interview', 'reunión', 'meeting', 'llamada', 'call', 'hablar', 'talk', 'contactar', 'schedule'], intent: 'interview' },
    { keys: ['contact', 'contacto', 'email', 'correo', 'escribir', 'reach', 'linkedin'], intent: 'contact' },
    { keys: ['por qué', 'why', 'contratar', 'hire', 'elegir', 'choose', 'diferencia', 'valor'], intent: 'whyhire' }
  ];

  var isOpen = false;
  var isTyping = false;
  var initialized = false;
  var history = [];

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getResponse(intent) {
    var lang = getLang();
    return pick(KB[lang][intent] || KB[lang].default);
  }

  function detectIntent(text) {
    var t = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    for (var i = 0; i < RULES.length; i++) {
      var r = RULES[i];
      for (var j = 0; j < r.keys.length; j++) {
        if (t.indexOf(r.keys[j]) !== -1) return r.intent;
      }
    }
    return 'default';
  }

  function addMsg(text, role) {
    var box = document.getElementById('chatMessages');
    if (!box) return null;
    var wrap = document.createElement('div');
    wrap.className = 'chat-msg ' + role;
    var bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = text;
    wrap.appendChild(bubble);
    box.appendChild(wrap);
    box.scrollTop = box.scrollHeight;
    return wrap;
  }

  function showTyping() {
    var box = document.getElementById('chatMessages');
    if (!box) return;
    var wrap = document.createElement('div');
    wrap.className = 'chat-msg bot';
    wrap.id = 'chatTypingMsg';
    var bubble = document.createElement('div');
    bubble.className = 'chat-bubble chat-typing';
    bubble.innerHTML = '<span></span><span></span><span></span>';
    wrap.appendChild(bubble);
    box.appendChild(wrap);
    box.scrollTop = box.scrollHeight;
  }

  function removeTyping() {
    var el = document.getElementById('chatTypingMsg');
    if (el) el.remove();
  }

  function renderChips(items) {
    var c = document.getElementById('chatChips');
    if (!c) return;
    c.innerHTML = '';
    items.forEach(function (chip) {
      var btn = document.createElement('button');
      btn.className = 'chat-chip';
      btn.textContent = chip.label;
      btn.setAttribute('data-key', chip.key);
      btn.onclick = function () {
        sendMessage(chip.label, chip.key);
        c.innerHTML = '';
      };
      c.appendChild(btn);
    });
  }

  function sendMessage(text, intentOverride) {
    if (isTyping) return;
    var prevChips = [];
    var chipsContainer = document.getElementById('chatChips');
    if (chipsContainer) {
      chipsContainer.querySelectorAll('.chat-chip').forEach(function (b) {
        prevChips.push({ label: b.textContent, key: b.getAttribute('data-key') || '' });
      });
    }

    var userEl = addMsg(text, 'user');
    isTyping = true;
    var intent = intentOverride || detectIntent(text);
    showTyping();

    setTimeout(function () {
      removeTyping();
      var botEl = addMsg(getResponse(intent), 'bot');
      isTyping = false;
      history.push({ userEl: userEl, botEl: botEl, prevChips: prevChips });

      var undoBtn = document.getElementById('chat-undo');
      if (undoBtn) undoBtn.classList.add('visible');

      var lang = getLang();
      var nextChips = lang === 'en'
        ? [{ label: 'Schedule interview', key: 'interview' }, { label: 'Why hire her?', key: 'whyhire' }]
        : [{ label: 'Concertar entrevista', key: 'interview' }, { label: '¿Por qué contratarla?', key: 'whyhire' }];

      if (intent !== 'interview' && intent !== 'contact') {
        renderChips(nextChips);
      }
    }, 550 + Math.random() * 350);
  }

  function initChat() {
    if (initialized) return;
    initialized = true;
    setTimeout(function () {
      addMsg(getResponse('greeting'), 'bot');
      renderChips(CHIPS[getLang()]);
    }, 180);
  }

  window.chatToggle = function () {
    var panel = document.getElementById('chat-panel');
    var trigger = document.getElementById('chat-trigger');
    if (!panel || !trigger) return;
    isOpen = !isOpen;
    panel.classList.toggle('open', isOpen);
    trigger.classList.toggle('open', isOpen);
    if (isOpen) {
      initChat();
      setTimeout(function () {
        var inp = document.getElementById('chatInput');
        if (inp) inp.focus();
      }, 250);
    }
  };

  window.chatSend = function () {
    var input = document.getElementById('chatInput');
    if (!input) return;
    var text = input.value.trim();
    if (!text || isTyping) return;
    input.value = '';
    input.style.height = '';
    var chips = document.getElementById('chatChips');
    if (chips) chips.innerHTML = '';
    sendMessage(text);
  };

  window.chatUndo = function () {
    if (!history.length || isTyping) return;
    var last = history.pop();
    if (last.userEl && last.userEl.parentNode) last.userEl.parentNode.removeChild(last.userEl);
    if (last.botEl && last.botEl.parentNode) last.botEl.parentNode.removeChild(last.botEl);
    renderChips(last.prevChips || []);
    if (!history.length) {
      var undoBtn = document.getElementById('chat-undo');
      if (undoBtn) undoBtn.classList.remove('visible');
    }
    var box = document.getElementById('chatMessages');
    if (box) box.scrollTop = box.scrollHeight;
  };

  window.chatKeydown = function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      window.chatSend();
    }
  };

  window.chatAutoResize = function (el) {
    el.style.height = '';
    el.style.height = Math.min(el.scrollHeight, 90) + 'px';
  };

  // Scroll handler for Back-to-Top and Nudge bubble
  function setupScrollWatcher() {
    var toTop = document.querySelector('.back-to-top');
    var bubble = document.querySelector('.chat-nudge-bubble');
    var trigger = document.getElementById('chat-trigger');

    function updateWidgets() {
      var y = window.scrollY || window.pageYOffset || 0;
      var reached = y > 260;
      if (toTop) toTop.classList.toggle('visible', reached);
      var chatOpen = trigger && trigger.classList.contains('open');
      if (bubble) bubble.classList.toggle('visible', !reached && !chatOpen);
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () {
          updateWidgets();
          ticking = false;
        });
      }
    }, { passive: true });

    updateWidgets();
  }

  // DOM ready loader
  function boot() {
    ensureWidgets();
    setupScrollWatcher();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Observe language switcher
  new MutationObserver(function () {
    var inp = document.getElementById('chatInput');
    if (inp) {
      inp.placeholder = getLang() === 'en' ? 'Type your question…' : 'Escribe tu pregunta…';
    }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'lang'] });

})();
