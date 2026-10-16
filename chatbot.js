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
        "¡Hola! Soy el asistente de Marta. Si eres recruiter o hiring manager, estás en el sitio correcto — puedo contarte todo lo que necesitas sobre su trayectoria (2020–2026) y sus 5 casos de producto. ¿Por dónde empezamos?"
      ],
      about: [
        "Marta Morales es <strong>Product Designer | UX · Design Systems · AI Product Design · CRO</strong>. Lleva desde 2020 diseñando y construyendo productos digitales: 4 años en consultoría B2B/B2C (<strong>We Are Actions</strong>, 2020–2024), especialización intensiva en Product Design &amp; Frontend en <strong>Neoland</strong> (2024), creación del primer Design System accesible en <strong>CEF</strong> (Jun–Sep 2024) y Product Designer &amp; CRO en <strong>ILUNION Hotels</strong> (Sep 2024–Actualidad). En 2026 además ha evolucionado sus proyectos fundacionales aplicando IA, Figma MCP y prototipos en vivo."
      ],
      experience: [
        "Su trayectoria sigue una evolución clara desde 2020:<br><br>" +
        "• <strong>Sep 2024 – Actualidad · ILUNION Hotels:</strong> Product Designer &amp; CRO. Optimización del canal directo de 32 hoteles (conversión del 3,36% al 6,5%).<br>" +
        "• <strong>Jun – Sep 2024 · CEF (Evolución 2026):</strong> Product Designer. Primer Design System accesible desde cero (17 componentes WCAG 2.1 AA, 57 variables y handoff con Figma MCP).<br>" +
        "• <strong>2024 · Neoland (Evolución 2026):</strong> Bootcamp intensivo de Product Design &amp; Frontend como puente hacia sistemas y producto corporativo (MVP <em>Gym Energy Center</em>).<br>" +
        "• <strong>Jul 2020 – May 2024 · We Are Actions (Evolución 2026):</strong> 4 años como UX/UI Designer construyendo producto end-to-end junto a 7 desarrolladores backend (<em>Paolo Pizzeria</em> 2020–22 y <em>Oracle ERP &amp; IT Ops</em> 2022–24)."
      ],
      skills: [
        "Sus 4 pilares fundamentales son: <strong>UX &amp; Research</strong> (diagnóstico cuantitativo/cualitativo, tests de usabilidad), <strong>Design Systems</strong> (Figma Variables, 17 componentes WCAG 2.1 AA, tokens JSON), <strong>AI Product Design</strong> (Figma MCP, Claude, prototipos funcionales en código) y <strong>CRO</strong> (experimentos A/B con significancia estadística, incremento de conversión del 3,36% al 6,5%).",
        "Domina el ciclo completo de producto: <strong>discovery contextual, arquitectura de información, sistemas de diseño, prototipado interactivo, validación con usuarios y handoff a producción</strong>."
      ],
      tools: [
        "Stack diario: <strong>Figma + Figma MCP</strong> (design systems, variables, tokens JSON), <strong>Adobe Analytics + Microsoft Clarity</strong> (datos de comportamiento y funnels), <strong>Claude &amp; IA generativa</strong> (auditoría de datos y prototipado), <strong>HTML/CSS/JS &amp; React</strong>, Notion y Jira."
      ],
      cases: [
        "Marta presenta <strong>5 casos de producto</strong> ordenados desde su etapa actual hasta sus proyectos fundacionales (revisitados en 2026 con su nuevo stack):<br><br>" +
        "<strong>Etapa actual (2024–Actualidad):</strong><br>" +
        "• <strong>01 · ILUNION CRO</strong> (Sep 2024–Actualidad) — conversión del canal directo del 3,36% al 6,5% en 32 hoteles.<br>" +
        "• <strong>02 · CEF Design System</strong> (Origen: Jun–Sep 2024 · Evolución 2026: Figma MCP) — 17 componentes WCAG 2.1 AA y 57 variables enlazadas a tokens.<br><br>" +
        "<strong>Proyectos fundacionales (Evolucionados en 2026):</strong><br>" +
        "• <strong>03 · Oracle ERP &amp; IT Ops</strong> (Origen: 2022–24 en We Are Actions · Evolución 2026: Prototipo &amp; Heurísticas) — diagnóstico Build vs. Buy.<br>" +
        "• <strong>04 · Gym Energy Center</strong> (Origen: 2024 Bootcamp Neoland · Evolución 2026: Rediseño + IA) — framework de 3 pilares en equipo de 8 personas.<br>" +
        "• <strong>05 · Paolo Pizzeria</strong> (Origen: 2020–22 Producto 0→1 · Evolución 2026: IA &amp; Reservas) — escaló de 1 a 5 locales sin rediseño.<br><br>" +
        "¿Quieres profundizar en alguno de ellos?"
      ],
      remote: [
        "Marta está <strong>abierta a modelos 100% remoto o híbrido</strong>. Con base en Madrid, cuenta con amplia experiencia trabajando con equipos distribuidos, comunicación asíncrona y handoff riguroso."
      ],
      availability: [
        "Marta está <strong>abierta a nuevas oportunidades</strong> en equipos de producto y con disponibilidad ágil de incorporación. Si ves fit en tu equipo, merece la pena hablar pronto."
      ],
      salary: [
        "Las expectativas de Marta están alineadas con su trayectoria (desde 2020) y el mercado actual. Se comenta de forma transparente en los primeros 5 minutos de llamada. ¿Hablamos?"
      ],
      interview: [
        "¡Excelente decisión! Escríbele directamente a <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> — responde habitualmente en menos de 24 horas. También puedes conectar en <a href='https://linkedin.com/in/marta-morales-designer' target='_blank' rel='noopener'>LinkedIn</a>."
      ],
      contact: [
        "Contacto directo: <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> · Responde en menos de 24h."
      ],
      paolo: [
        "<strong>Caso 05 · Paolo by Danny's Jazz (Origen: 2020–2022 · Evolución 2026):</strong> su primer gran producto 0→1 en We Are Actions. Durante 2 años lideró end-to-end el ecosistema digital (identidad, web Mobile-First aplicando la Ley de Miller, los 3 customer journeys —delivery, local y reserva—, cartas QR y analítica mensual). El producto escaló de <strong>1 a 5 locales sin necesidad de rediseño</strong>.<br><br>" +
        "En <strong>2026</strong> evolucionó el caso con dirección de arte generativa (regenerando los 4 platos estrella y 20+ conceptos de marca con IA sin sesión fotográfica) y un nuevo flujo interactivo de reservas."
      ],
      oracle: [
        "<strong>Caso 03 · Oracle ERP &amp; IT Ops (Origen: 2022–2024 · Evolución 2026):</strong> desarrollado durante su etapa en We Are Actions. Embebida en el equipo de IT, analizó la fricción en tiempo real, aisló <strong>4 patrones de fallo</strong> y formuló la decisión estratégica <strong>Build vs. Buy</strong> para construir una herramienta interna en 4 módulos.<br><br>" +
        "En <strong>2026</strong> retomó el diagnóstico para sistematizar la auditoría de Heurísticas de Nielsen y construir el prototipo interactivo en vivo."
      ],
      gym: [
        "<strong>Caso 04 · Gym Energy Center (Origen: 2024 Bootcamp Neoland · Evolución 2026):</strong> MVP full-stack construido en un equipo de 8 personas durante su especialización intensiva en Neoland en 2024. Marta lideró el research, la arquitectura de producto —articulada en un <strong>framework de 3 pilares</strong> (práctico, social y emocional)— y el sistema de diseño (40+ componentes del equipo).<br><br>" +
        "En <strong>2026</strong> realizó una reconceptualización individual añadiendo entrenador IA, dashboard de progreso y acceso seguro por token."
      ],
      cro: [
        "En <strong>Caso 01 · ILUNION Hotels CRO (Sep 2024–Actualidad)</strong>, Marta lidera la optimización del canal directo de 32 hoteles:<br><br>" +
        "Mediante análisis de 10.000+ logs de funnel en Adobe Analytics y 250+ sesiones en Clarity, rediseñó componentes clave de reserva y ejecutó tests A/B con significancia estadística. <strong>Resultado: conversión directa de 3,36% a 6,5%</strong> (13% de la venta total y 50% de reservas del club ÚNICOS)."
      ],
      booking: [
        "El rediseño del <strong>selector de destino y motor de reservas de ILUNION Hotels (Caso 01 · Sep 2024–Actualidad)</strong> sustituyó un <code>&lt;select&gt;</code> nativo limitante por un componente de sistema con doble taxonomía en paralelo (destinos y hoteles), iconografía y semántica costa/urbano."
      ],
      cef: [
        "<strong>Caso 02 · CEF Design System (Origen: Jun–Sep 2024 · Evolución 2026):</strong> creó desde cero la infraestructura de diseño accesible para una plataforma EdTech: <strong>17 componentes con 6 estados</strong>, <strong>57 variables enlazadas a tokens</strong> y cumplimiento <strong>100% WCAG 2.1 AA</strong>. En 2026 evolucionó el handoff conectando Figma MCP con Claude para autogenerar especificaciones y tokens JSON con 0 discrepancias diseño-código."
      ],
      whyhire: [
        "Tres razones decisivas para sumar a Marta a tu equipo:<br><br>" +
        "1. <strong>Evolución real demostrada (2020–2026):</strong> Combina 4 años de producto 0→1 y base técnica con experiencia actual en CRO y Design Systems corporativos.<br>" +
        "2. <strong>Impacto medible en negocio:</strong> Conversión del 3,36% al 6,5% en ILUNION Hotels y 100% WCAG 2.1 AA en CEF.<br>" +
        "3. <strong>Stack de vanguardia (IA + Código):</strong> Integra Figma MCP, auditoría de datos asistida por IA y prototipado funcional en vivo."
      ],
      default: [
        "Buena pregunta. Te recomiendo consultarlo directamente con Marta en <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> — estará encantada de responderte."
      ]
    },
    en: {
      greeting: [
        "Hi! I'm Marta's assistant. If you are a recruiter or hiring manager, you are in the right spot — I can walk you through her trajectory (2020–2026) and her 5 product case studies. Where should we begin?"
      ],
      about: [
        "Marta Morales is a <strong>Product Designer | UX · Design Systems · AI Product Design · CRO</strong>. She has been designing and building digital products since 2020: 4 years in B2B/B2C consulting (<strong>We Are Actions</strong>, 2020–2024), an intensive Product Design &amp; Frontend specialisation at <strong>Neoland</strong> (2024), building the first accessible Design System at <strong>CEF</strong> (Jun–Sep 2024), and Product Designer &amp; CRO at <strong>ILUNION Hotels</strong> (Sep 2024–Present). In 2026 she also revisited her foundational projects to evolve them with AI, Figma MCP and live code prototypes."
      ],
      experience: [
        "Her career follows a clear progression since 2020:<br><br>" +
        "• <strong>Sep 2024 – Present · ILUNION Hotels:</strong> Product Designer &amp; CRO. Direct channel optimisation across 32 hotels (conversion lifted from 3.36% to 6.5%).<br>" +
        "• <strong>Jun – Sep 2024 · CEF (2026 Evolution):</strong> Product Designer. First accessible Design System from scratch (17 WCAG 2.1 AA components, 57 token variables &amp; Figma MCP handoff).<br>" +
        "• <strong>2024 · Neoland (2026 Evolution):</strong> Intensive Product Design &amp; Frontend Bootcamp bridging into enterprise systems (<em>Gym Energy Center</em> MVP).<br>" +
        "• <strong>Jul 2020 – May 2024 · We Are Actions (2026 Evolution):</strong> 4 years as UX/UI Designer building end-to-end products alongside 7 backend developers (<em>Paolo Pizzeria</em> 2020–22 &amp; <em>Oracle ERP &amp; IT Ops</em> 2022–24)."
      ],
      skills: [
        "Core pillars: <strong>UX &amp; Research</strong> (qualitative/quantitative diagnostics, usability testing), <strong>Design Systems</strong> (Figma Variables, 17 WCAG 2.1 AA components, JSON tokens), <strong>AI Product Design</strong> (Figma MCP, Claude, live code prototypes), and <strong>CRO</strong> (statistically significant A/B testing, lifting conversion from 3.36% to 6.5%).",
        "Full lifecycle mastery: <strong>contextual discovery, information architecture, design systems, interactive prototyping, user validation, and production handoff</strong>."
      ],
      tools: [
        "Daily stack: <strong>Figma + Figma MCP</strong> (design systems, variables, JSON tokens), <strong>Adobe Analytics + Microsoft Clarity</strong> (funnel telemetry &amp; user journeys), <strong>Claude &amp; generative AI</strong> (data audits &amp; prototyping), <strong>HTML/CSS/JS &amp; React</strong>, Notion and Jira."
      ],
      cases: [
        "Marta presents <strong>5 product case studies</strong> ordered from her current stage back to her foundational projects (revisited in 2026 with her current stack):<br><br>" +
        "<strong>Current Stage (2024–Present):</strong><br>" +
        "• <strong>01 · ILUNION CRO</strong> (Sep 2024–Present) — direct channel conversion lifted from 3.36% to 6.5% across 32 hotels.<br>" +
        "• <strong>02 · CEF Design System</strong> (Origin: Jun–Sep 2024 · 2026 Evolution: Figma MCP) — 17 WCAG 2.1 AA components and 57 token-bound variables.<br><br>" +
        "<strong>Foundational Projects (Evolved in 2026):</strong><br>" +
        "• <strong>03 · Oracle ERP &amp; IT Ops</strong> (Origin: 2022–24 at We Are Actions · 2026 Evolution: Live Prototype &amp; Heuristics) — Build vs. Buy strategic diagnosis.<br>" +
        "• <strong>04 · Gym Energy Center</strong> (Origin: 2024 Neoland Bootcamp · 2026 Evolution: Solo Redesign + AI) — 3-pillar product framework in an 8-person team.<br>" +
        "• <strong>05 · Paolo Pizzeria</strong> (Origin: 2020–22 0→1 Product · 2026 Evolution: AI Art Direction &amp; Booking) — scaled from 1 to 5 locations without a redesign.<br><br>" +
        "Would you like deeper insights on any of these?"
      ],
      remote: [
        "Marta is <strong>open to 100% remote or hybrid positions</strong>. Based in Madrid, she brings extensive experience in distributed teams, asynchronous collaboration, and meticulous handoff."
      ],
      availability: [
        "Marta is <strong>open to new opportunities</strong> in product teams with prompt availability. If there is a match with your roadmap, let's schedule an intro."
      ],
      salary: [
        "Marta's compensation expectations reflect her experience (since 2020) and current market benchmarks, easily aligned in a brief introductory call."
      ],
      interview: [
        "Great! Reach out directly at <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> — she replies within 24 hours. You can also connect on <a href='https://linkedin.com/in/marta-morales-designer' target='_blank' rel='noopener'>LinkedIn</a>."
      ],
      contact: [
        "Direct email: <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> · Replies within 24 hours."
      ],
      paolo: [
        "<strong>Case 05 · Paolo by Danny's Jazz (Origin: 2020–2022 · 2026 Evolution):</strong> her foundational 0→1 product at We Are Actions. Over 2 years she owned the full digital ecosystem (visual identity, Mobile-First web applying Miller's Law, all 3 customer journeys —delivery, in-store and booking—, QR menus and monthly analytics). It scaled from <strong>1 to 5 locations without a redesign</strong>.<br><br>" +
        "In <strong>2026</strong> she revisited the case with generative AI art direction (regenerating the 4 signature dishes and 20+ brand concepts without a photo shoot) and a new interactive booking flow."
      ],
      oracle: [
        "<strong>Case 03 · Oracle ERP &amp; IT Ops (Origin: 2022–2024 · 2026 Evolution):</strong> conducted during her tenure at We Are Actions. Embedded in the IT team, she isolated <strong>4 failure patterns</strong> and formulated the <strong>Build vs. Buy</strong> strategy for a 4-module internal tool.<br><br>" +
        "In <strong>2026</strong> she evolved the case by systematising the Nielsen Heuristics audit and building the live interactive prototype."
      ],
      gym: [
        "<strong>Case 04 · Gym Energy Center (Origin: 2024 Neoland Bootcamp · 2026 Evolution):</strong> full-stack MVP built in an 8-person team during her intensive specialisation at Neoland in 2024. Marta led UX research, product architecture —articulated around a <strong>3-pillar framework</strong> (practical, social and emotional)— and the design system (40+ team components).<br><br>" +
        "In <strong>2026</strong> she carried out a solo reconceptualisation adding an AI coach, progress dashboard and token-gated security."
      ],
      cro: [
        "In <strong>Case 01 · ILUNION Hotels CRO (Sep 2024–Present)</strong>, Marta leads direct channel optimization across 32 hotels, auditing 10,000+ funnel logs and 250+ Clarity sessions and running A/B tests that lifted direct booking conversion from <strong>3.36% to 6.5%</strong> (13% of total sales, 50% of ÚNICOS club bookings)."
      ],
      booking: [
        "The <strong>ILUNION Hotels destination selector &amp; booking engine redesign (Case 01 · Sep 2024–Present)</strong> replaced a limiting native <code>&lt;select&gt;</code> with a dual-taxonomy system component (parallel destinations and hotels), entity iconography and beach/urban semantics."
      ],
      cef: [
        "<strong>Case 02 · CEF Design System (Origin: Jun–Sep 2024 · 2026 Evolution):</strong> delivered scalable design infrastructure from scratch: <strong>17 WCAG 2.1 AA components with 6 states</strong> and <strong>57 token-bound variables</strong>. In 2026 she evolved the handoff by connecting Figma MCP with Claude to auto-generate technical specs and JSON tokens with zero design-to-code drift."
      ],
      whyhire: [
        "Three distinct strengths Marta brings:<br><br>" +
        "1. <strong>Proven Trajectory (2020–2026):</strong> Combines 4 years of 0→1 product and technical foundations with current enterprise CRO and Design Systems impact.<br>" +
        "2. <strong>Measurable Business Outcomes:</strong> 3.36% → 6.5% conversion at ILUNION Hotels and 100% WCAG 2.1 AA at CEF.<br>" +
        "3. <strong>Cutting-Edge Stack (AI + Code):</strong> Integrates Figma MCP, AI-assisted data audits and live functional code prototypes."
      ],
      default: [
        "That's a great question. You can ask Marta directly at <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> — she'll be happy to answer."
      ]
    }
  };

  var CHIPS = {
    es: [
      { label: '¿Quién es Marta?', key: 'about' },
      { label: 'Los 5 casos (01→05)', key: 'cases' },
      { label: '01 · ILUNION CRO', key: 'cro' },
      { label: '02 · CEF Design System', key: 'cef' },
      { label: '03 · Oracle IT Ops', key: 'oracle' },
      { label: '04 · Gym Energy', key: 'gym' },
      { label: '05 · Paolo Pizzeria', key: 'paolo' },
      { label: 'Trayectoria 2020–2026', key: 'experience' }
    ],
    en: [
      { label: 'Who is Marta?', key: 'about' },
      { label: 'All 5 cases (01→05)', key: 'cases' },
      { label: '01 · ILUNION CRO', key: 'cro' },
      { label: '02 · CEF Design System', key: 'cef' },
      { label: '03 · Oracle IT Ops', key: 'oracle' },
      { label: '04 · Gym Energy', key: 'gym' },
      { label: '05 · Paolo Pizzeria', key: 'paolo' },
      { label: 'Trajectory 2020–2026', key: 'experience' }
    ]
  };

  var RULES = [
    { keys: ['quién', 'quien', 'eres', 'about', 'who', 'marta', 'sobre', 'yourself', 'cuéntame', 'presentate'], intent: 'about' },
    { keys: ['experiencia', 'experience', 'años', 'years', 'trayectoria', 'background', 'llevas', 'cronologia', 'cronología', 'timeline', '2020', '2024', '2026', 'we are actions'], intent: 'experience' },
    { keys: ['habilidad', 'skill', 'sabe', 'know', 'domina', 'masters', 'puedes', 'capaz'], intent: 'skills' },
    { keys: ['herramienta', 'tool', 'adobe', 'jira', 'notion', 'hotjar', 'clarity', 'figma', 'mcp', 'stack'], intent: 'tools' },
    { keys: ['caso', 'case', 'estudio', 'study', 'proyecto', 'project', 'portfolio', 'portafolio', 'trabajo', 'todos', 'all 5', '5 casos'], intent: 'cases' },
    { keys: ['paolo', 'pizzería', 'pizzeria', 'danny', 'ecosistema', 'delivery', '1 a 5', '1 to 5', 'wordpress', '05'], intent: 'paolo' },
    { keys: ['oracle', 'it ops', 'build vs', 'fricción it', 'friccion', 'herramienta interna', 'incidencia', 'ticket', 'suzuki', '03'], intent: 'oracle' },
    { keys: ['gym', 'gimnasio', 'energy center', 'neoland', 'bootcamp', '3 pilares', '3-pillar', 'fitness', '04'], intent: 'gym' },
    { keys: ['booking', 'motor de reservas', 'selector de destino', 'hotel', 'hospitality'], intent: 'booking' },
    { keys: ['cef', 'edtech', 'accesibilidad', 'wcag', 'token', 'sistema de diseño', '02'], intent: 'cef' },
    { keys: ['ilunion', 'cro', 'conversion', 'conversión', 'a/b', 'ab test', 'aem', 'experimento', '01'], intent: 'cro' },
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
