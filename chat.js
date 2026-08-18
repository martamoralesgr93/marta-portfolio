/* Chat del portfolio · fuente única.
   Antes este bloque vivía duplicado byte a byte en 6 archivos HTML (358 líneas
   cada uno). Cualquier corrección había que hacerla seis veces y en la práctica
   se hacía en una, así que las copias ya habían divergido.
   Se carga SIN defer y en la misma posición que ocupaba el bloque, para no
   alterar el orden de ejecución: index.html tiene un script posterior que lee
   #chat-trigger durante el parseo. */
(function () {
  var MARKUP = "<button id=\"chat-trigger\" aria-label=\"Abrir chat\" onclick=\"chatToggle()\">\n  <img loading=\"eager\" decoding=\"async\" class=\"icon-chat\" src=\"assets/logo.png\" alt=\"Marta\" style=\"width:100%;height:100%;object-fit:cover;border-radius:50%;\" onerror=\"this.style.display='none';this.insertAdjacentHTML('afterend','<svg class=\\'icon-chat\\' style=\\'width:24px;height:24px\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke=\\'white\\' stroke-width=\\'2\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' d=\\'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z\\'/></svg>')\">\n  <svg class=\"icon-close\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"white\" stroke-width=\"2.5\" style=\"width:22px;height:22px;\">\n    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6 18L18 6M6 6l12 12\"></path>\n  </svg>\n</button>\n\n<div id=\"chat-panel\" role=\"dialog\" aria-label=\"Chat con Marta\">\n  <div class=\"chat-header\">\n    <div class=\"chat-avatar\">\n      <img loading=\"lazy\" decoding=\"async\" width=\"300\" height=\"300\" src=\"assets/logo-sinfondo.webp\" alt=\"Marta\" style=\"filter:brightness(0) invert(1);object-fit:contain;padding:4px;\" onerror=\"this.style.display='none';this.nextElementSibling.style.display='flex'\">\n      <span class=\"chat-avatar-fallback\" style=\"display:none\">MM</span>\n    </div>\n    <div class=\"chat-header-info\">\n      <div class=\"chat-header-name\">Marta Morales</div>\n      <div class=\"chat-header-status\">\n        <span class=\"chat-status-dot\"></span>\n        <span class=\"es\">Disponible ahora</span>\n        <span class=\"en\">Available now</span>\n      </div>\n    </div>\n    <button id=\"chat-undo\" onclick=\"chatUndo()\" aria-label=\"Deshacer último mensaje\" title=\"Volver atrás\">\n      <svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <path d=\"M9 14L4 9l5-5\"></path><path d=\"M4 9h10.5a5.5 5.5 0 0 1 0 11H11\"></path>\n      </svg>\n    </button>\n  </div>\n  <div class=\"chat-messages\" id=\"chatMessages\"></div>\n  <div class=\"chat-chips\" id=\"chatChips\"></div>\n  <div class=\"chat-input-area\">\n    <textarea class=\"chat-input\" id=\"chatInput\" rows=\"1\" placeholder=\"Escribe tu pregunta…\" aria-label=\"Escribe tu pregunta\" onkeydown=\"chatKeydown(event)\" oninput=\"chatAutoResize(this)\"></textarea>\n    <button class=\"chat-send\" onclick=\"chatSend()\" aria-label=\"Enviar\">\n      <svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"white\" stroke-width=\"2.5\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 19l9 2-9-18-9 18 9-2zm0 0v-8\"></path>\n      </svg>\n    </button>\n  </div>\n</div>";
  document.body.insertAdjacentHTML('beforeend', MARKUP);
})();

(function() {
  var KB = {
    es: {
      greeting: [
        "¡Hola! Soy el asistente de Marta. Si eres recruiter o hiring manager, estás en el sitio correcto — puedo contarte todo lo que necesitas para tomar una decisión. ¿Por dónde empezamos?"
      ],
      about: [
        "Marta Morales se posiciona en el mercado como el 'producto de diseño completo' bajo su principal KPI: <strong>Product Designer | UX · Design Systems · AI Product Design · CRO</strong>. Su portafolio es en sí mismo un reflejo de este producto, y los casos prácticos (EdTech, Travel, B2B) son los ejemplos de uso de cómo sus habilidades de optimización, automatización de sistemas de diseño y flujos con IA resuelven problemas reales de negocio."
      ],
      experience: [
        "<strong>+4 años</strong> de trayectoria liderando el ciclo completo de producto digital. Su enfoque trasciende el diseño visual: actúa como motor estratégico de CRO, estructurando sistemas de diseño scalables y optimizando interfaces complejas mediante automatizaciones de IA para multiplicar la velocidad de desarrollo.",
        "Marta no espera un brief estructurado: **identifica el problema, define el enfoque y mide el resultado**, utilizando los casos prácticos de su portafolio para poner a prueba sus habilidades frente a constraints reales."
      ],
      skills: [
        "Sus 4 pilares fundamentales son: <strong>UX &amp; Research</strong> (diagnóstico cuantitativo/cualitativo), <strong>Design Systems</strong> (Figma avanzado, variables, handoff estructurado), <strong>AI Product Design</strong> (MCPs, vibe coding, automatización de flujos) y <strong>CRO</strong> (experimentos basados en datos, A/B Testing, incremento de conversión).",
        "Domina el ciclo completo de producto: **discovery, research de comportamiento, arquitectura de información, prototipado, test con usuarios, handoff y análisis post-lanzamiento**."
      ],
      tools: [
        "Stack diario: <strong>Figma</strong> (sistemas de diseño, variables, componentes), <strong>Adobe Analytics + Hotjar</strong> (datos de comportamiento), <strong>Notion & Jira</strong> (gestión de producto), Bootstrap y colaboración estrecha con ingeniería."
      ],
      cases: [
        "Marta tiene <strong>6 casos en 5 sectores distintos</strong>. Todos siguen el mismo patrón: diagnostica el problema de negocio antes de tocar un solo píxel.<br><br>• <strong>ILUNION CRO</strong>: conversión del canal directo del 3,36% al 6,5% con experimentos sobre datos reales<br>• <strong>Booking Engine (ILUNION)</strong>: rediseño del motor de reservas, de la investigación a producción<br>• <strong>CEF Design System</strong>: design system EdTech desde cero con 17 componentes, tokens y WCAG AA<br>• <strong>Paolo by Danny's Jazz</strong>: identidad y ecosistema digital de una cadena que pasó de 1 a 5 locales sin rediseño<br>• <strong>Build vs. Buy · Oracle IT</strong>: diagnóstico de fricción integrada en el equipo de IT, con propuesta de construir en lugar de parchear Oracle<br>• <strong>Gym Energy Center</strong>: MVP en equipo de ocho personas, donde llevó research, arquitectura de producto y sistema de diseño<br><br>¿Quieres que entre en detalle en alguno?"
      ],
      remote: [
        "Marta está <strong>abierta al remoto total e híbrido.</strong> Basada en Madrid, con experiencia en equipos distribuidos y comunicación async."
      ],
      availability: [
        "Marta está <strong>activamente buscando su próxima oportunidad</strong> y puede incorporarse con relativa rapidez. Hay otras conversaciones en curso, así que si hay fit, merece la pena hablar pronto. ¿Tienes alguna posición en mente?"
      ],
      salary: [
        "Marta maneja expectativas alineas con su experiencia y el mercado actual. Es un detalle que se aclara en cinco minutos en una llamada. ¿Le damos una oportunidad a esa conversación?"
      ],
      interview: [
        "¡Perfecto! Escríbele directamente a <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> — responde en menos de 24h. O usa el formulario de contacto al final de la página.",
        "Genial. La mejor forma es un email a <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> proponiendo día y hora. Marta es flexible y se adapta a vuestra agenda."
      ],
      contact: [
        "Email directo: <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> · Responde rápido, menos de 24h."
      ],
      research: [
        "Marta tiene <strong>base sólida en UX Research:</strong> entrevistas con usuarios, card sorting, tree testing, análisis heurístico y síntesis de insights. Lo más importante: siempre conecta el research con decisiones de negocio concretas."
      ],
      systems: [
        "Ha construido <strong>design systems desde cero:</strong> el sistema de CEF incluye 17 componentes, tokens de diseño, guías de accesibilidad y documentación para desarrollo. Domina Figma Variables, Auto Layout avanzado y versionado de componentes."
      ],
      cro: [
        "Especializada en <strong>CRO:</strong> usó Adobe Analytics para identificar friction points, diseñó A/B tests con hipótesis fundamentadas en datos y midió el impacto post-lanzamiento. En ILUNION: <strong>conversión del 3.36% al 6.5%</strong> en el canal directo."
      ],
      paolo: [
        "Paolo by Danny's Jazz es uno de los proyectos que mejor refleja el <strong>ownership real de Marta</strong>. No fue un encargo de diseño — fue un problema de negocio entero: una cadena de pizzerías artesanas sin canal digital en plena pandemia, sin web, sin delivery, sin presencia en Google.<br><br>Diseñó y construyó desde cero: identidad visual completa, web (Adobe XD → WordPress + Elementor), los 3 customer journeys del negocio (delivery, visita al local, reserva), ecosistema de delivery activo (Glovo, Uber Eats, JustEat), cartas QR, Google My Business y un ciclo mensual de analítica con Clarity + GA4 + Metricool.<br><br>Resultado: el producto escaló de 1 a 5 locales en 2 años <strong>sin necesidad de rediseño</strong>. +32% en llamadas directas desde móvil el primer mes. Cuando el proyecto terminó, el ecosistema seguía funcionando solo. Eso es diseño que funciona."
      ],
      oracle: [
        "El caso Oracle (Build vs. Buy) muestra a Marta en modo <strong>diagnosticadora estratégica, no ejecutora de interfaces.</strong><br><br>We Are Actions llevaba años gestionando incidencias IT con Oracle. El responsable de sistemas llegó a dirección con un Excel con datos reales de fricción. Marta estaba <em>embebida en el equipo IT</em>, así que hizo discovery contextual desde dentro: vio la fricción ocurrir en tiempo real, no en una sesión de research artificial.<br><br>Su diagnóstico: Oracle no estaba mal diseñado — era simplemente la herramienta equivocada para <em>sus</em> flujos. La recomendación fue construir una herramienta interna en lugar de seguir parcheando una plataforma genérica.<br><br>El caso de estudio ya está publicado y disponible en este portafolio. Representa exactamente el tipo de trabajo que más le interesa: <strong>identificar el problema real antes de proponer la solución.</strong>"
      ],
      booking: [
        "El <strong>Booking Engine de ILUNION</strong> fue el rediseño end-to-end del motor de reservas de una cadena hotelera — de la investigación con usuarios hasta la entrega a producción. El reto era entender por qué la conversión en canal directo era tan baja y proponer una solución argumentada. Marta lideró todo: research, arquitectura de información, prototipado, test con usuarios y handoff. Este proyecto fue la base sobre la que después se aplicaron los experimentos de CRO que llevaron la conversión del 3.36% al 6.5%."
      ],
      cef: [
        "El <strong>CEF Design System</strong> demuestra la capacidad de Marta para crear infraestructura de diseño desde cero en un entorno EdTech con restricciones de accesibilidad estrictas.<br><br>Construyó un sistema con 17 componentes en Figma: tokens de diseño, variantes, estados, documentación para desarrollo y cumplimiento WCAG 2.1 AA. El objetivo no era solo coherencia visual — era que los equipos de desarrollo pudieran construir con él de forma autónoma."
      ],
      whyhire: [
        "Tres cualidades clave:<br><br>1. <strong>Mentalidad de Producto:</strong> Su portafolio y ella misma operan bajo un enfoque orientado a resultados y KPIs claros.<br>2. <strong>Especialización de Vanguardia:</strong> Une el rigor clásico de la accesibilidad y el CRO con flujos avanzados de IA y vibe coding.<br>3. <strong>Autonomía Estratégica:</strong> Diagnóstica la raíz de los problemas y propone la decisión óptima antes de tocar el primer pixel."
      ],
      sector: [
        "Marta tiene experiencia en <strong>turismo / hospitality</strong> (booking engines, CRO), <strong>EdTech</strong> (sistemas de diseño, accesibilidad) y <strong>consultoría digital</strong>. Busca su próximo reto en empresas <strong>tech, SaaS o travel</strong> con producto propio."
      ],
      default: [
        "Buena pregunta. Para eso mejor habla con Marta directamente: <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a>",
        "Eso lo responde Marta mejor que yo en persona. <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> — responde en menos de 24h."
      ]
    },
    en: {
      greeting: [
        "Hi! I'm Marta's assistant. If you're a recruiter or hiring manager, you're in the right place — I can tell you everything you need to make a decision. Where shall we start?"
      ],
      about: [
        "Marta Morales positions herself as the 'complete design product' under her main KPI: <strong>Product Designer | UX · Design Systems · AI Product Design · CRO</strong>. Her portfolio is a product in itself, demonstrating how her skills in optimization, design systems automation, and AI workflows solve real business challenges."
      ],
      experience: [
        "<strong>4+ years</strong> of experience leading the end-to-end product lifecycle. She acts as a strategic CRO engine, building scalable design systems and optimizing complex interfaces through AI integrations to accelerate development speed.",
        "Marta doesn't wait for a brief: **she identifies the problem, defines the approach, and measures outcomes**, using her case studies as live test-beds to validate new workflow capabilities."
      ],
      skills: [
        "Her 4 core pillars are: <strong>UX &amp; Research</strong> (qualitative/quantitative diagnostics), <strong>Design Systems</strong> (advanced Figma, variables, structured handoff), <strong>AI Product Design</strong> (MCPs, vibe coding, workflow automation) and <strong>CRO</strong> (data-driven experiments, A/B Testing, conversion lifts).",
        "She masters the full process: **discovery, behavior research, information architecture, prototyping, user testing, handoff, and post-launch analysis**."
      ],
      tools: [
        "Daily stack: <strong>Figma</strong> (design systems, variables, components), <strong>Adobe Analytics + Hotjar</strong> (behaviour data), <strong>Notion & Jira</strong> (product management), Bootstrap and close engineering collaboration."
      ],
      cases: [
        "Marta has <strong>6 case studies across 5 different sectors</strong>. They all follow the same pattern: she diagnoses the business problem before touching a single pixel.<br><br>• <strong>ILUNION CRO</strong>: direct channel conversion from 3.36% to 6.5% through experiments on real data<br>• <strong>Booking Engine (ILUNION)</strong>: booking engine redesign, from research to production<br>• <strong>CEF Design System</strong>: EdTech design system from scratch with 17 components, tokens and WCAG AA<br>• <strong>Paolo by Danny's Jazz</strong>: identity and digital ecosystem for a chain that grew from 1 to 5 locations without a redesign<br>• <strong>Build vs. Buy · Oracle IT</strong>: friction diagnosis embedded in the IT team, proposing to build rather than patch Oracle<br>• <strong>Gym Energy Center</strong>: team MVP with eight people, where she led research, product architecture and the design system<br><br>Want me to go deeper on any of them?"
      ],
      remote: [
        "Marta is <strong>open to fully remote and hybrid.</strong> Based in Madrid, experienced with distributed teams and async communication."
      ],
      availability: [
        "Marta is <strong>actively looking for her next opportunity</strong> and can onboard relatively quickly. There are other conversations in progress, so if there's a fit, it's worth talking soon. Got a role in mind?",
      ],
      salary: [
        "Marta's expectations are aligned with her experience and the current market. It's a detail that takes five minutes to clarify in a call. Shall we make that happen?"
      ],
      interview: [
        "Great! Email her directly at <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> — she replies within 24h. Or use the contact form at the bottom of the page.",
        "Perfect. The easiest way is an email to <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> suggesting a time. Marta is flexible and adapts to your schedule."
      ],
      contact: [
        "Direct email: <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> · Replies fast, under 24h."
      ],
      research: [
        "Marta has a <strong>solid UX Research foundation:</strong> user interviews, card sorting, tree testing, heuristic analysis and insight synthesis. Most importantly: she always connects research to concrete business decisions."
      ],
      systems: [
        "She built <strong>design systems from scratch:</strong> CEF's system includes 17 components, design tokens, accessibility guidelines and developer documentation. Proficient in Figma Variables, advanced Auto Layout and component versioning."
      ],
      cro: [
        "Specialized in <strong>CRO:</strong> used Adobe Analytics to identify friction points, designed data-backed A/B tests and measured post-launch impact. At ILUNION: <strong>conversion from 3.36% to 6.5%</strong> on the direct channel."
      ],
      paolo: [
        "Paolo by Danny's Jazz is one of the projects that best shows Marta's <strong>real ownership mindset</strong>. It wasn't a design brief — it was an entire business problem: an artisan pizza chain in the middle of a pandemic with no website, no delivery, no Google presence, nothing.<br><br>She designed and built from scratch: complete visual identity, the full website (Adobe XD → WordPress + Elementor), 3 customer journeys (delivery, in-store visit, booking), active delivery ecosystem (Glovo, Uber Eats, JustEat), QR menus, Google My Business, and a monthly analytics cycle with Clarity + GA4 + Metricool.<br><br>Result: the product scaled from 1 to 5 locations in 2 years <strong>without a redesign</strong>. +32% in direct mobile calls in the first month. When the project ended, the ecosystem kept running on its own. That's what good design looks like."
      ],
      oracle: [
        "The Oracle case (Build vs. Buy) shows Marta in <strong>strategic diagnostician mode — not interface executor.</strong><br><br>We Are Actions had been managing IT incidents with Oracle for years. The systems manager came to leadership with real-data showing friction costs. Marta was <em>embedded in the IT team</em>, so she did contextual discovery from the inside: she saw friction happening in real time, not in an artificial research session.<br><br>Her diagnosis: Oracle wasn't badly designed — it was simply the wrong tool for <em>their</em> workflows. The recommendation was to build an internal tool rather than keep patching a generic platform.<br><br>The case study is now fully published and available. It represents exactly the kind of work she values most: <strong>finding the real problem before proposing the solution.</strong>"
      ],
      booking: [
        "The <strong>ILUNION Booking Engine</strong> was an end-to-end redesign of a hotel chain's reservation engine — from user research to production handoff. The challenge was understanding why direct channel conversion was so low and proposing a data-backed solution. Marta led the full process: research, information architecture, prototyping, user testing and handoff. This was the foundation for the CRO experiments that later lifted conversion from 3.36% to 6.5%."
      ],
      cef: [
        "The <strong>CEF Design System</strong> shows Marta's ability to build design infrastructure from scratch in an EdTech environment with strict accessibility requirements.<br><br>She built a system with 80+ Figma components: design tokens, variants, states, developer documentation and WCAG 2.1 AA compliance. The goal wasn't just visual consistency — it was enabling development teams to build autonomously."
      ],
      whyhire: [
        "Three key qualities:<br><br>1. <strong>Product Mindset:</strong> Both her portfolio and she operate under a results-oriented approach with clear KPIs.<br>2. <strong>Cutting-edge Specialization:</strong> Combines classic CRO and accessibility rigor with advanced AI workflows and vibe coding.<br>3. <strong>Strategic Autonomy:</strong> Diagnoses the root of business problems and proposes the optimal path before designing a single pixel."
      ],
      sector: [
        "Marta has experience in <strong>travel / hospitality</strong> (booking engines, CRO), <strong>EdTech</strong> (design systems, accessibility) and <strong>digital consulting.</strong> She's looking for her next challenge at a <strong>tech, SaaS or travel</strong> company with its own product."
      ],
      default: [
        "Great question. That's better answered by Marta directly: <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a>",
        "Marta can answer that better than me in person. <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> — replies within 24h."
      ]
    }
  };

  var CHIPS = {
    es: [
      {label:'¿Quién es Marta?',key:'about'},
      {label:'Todos los casos',key:'cases'},
      {label:'Paolo · ecosistema digital',key:'paolo'},
      {label:'Oracle · diagnóstico IT',key:'oracle'},
      {label:'¿Por qué contratarla?',key:'whyhire'},
      {label:'Concertar entrevista',key:'interview'}
    ],
    en: [
      {label:'Who is Marta?',key:'about'},
      {label:'All case studies',key:'cases'},
      {label:'Paolo · digital ecosystem',key:'paolo'},
      {label:'Oracle · IT diagnosis',key:'oracle'},
      {label:'Why hire her?',key:'whyhire'},
      {label:'Schedule interview',key:'interview'}
    ]
  };

  var RULES = [
    {keys:['quién','quien','eres','about','who','marta','sobre','yourself','tell me','cuéntame','presentate'],intent:'about'},
    {keys:['experiencia','experience','años','years','trayectoria','background','worked','llevás','llevas'],intent:'experience'},
    {keys:['habilidad','skill','sabe','know','domina','masters','puedes','capaz','capable'],intent:'skills'},
    {keys:['herramienta','tool','adobe','jira','notion','hotjar','bootstrap','figma','stack','usa'],intent:'tools'},
    {keys:['caso','case','estudio','study','proyecto','project','portfolio','portafolio','trabajo','work'],intent:'cases'},
    {keys:['paolo','pizzería','pizzeria','pizzer','danny','ecosistema digital','digital ecosystem','1 a 5','1 to 5','wordpress','elementor'],intent:'paolo'},
    {keys:['oracle','it ops','build vs','fricción it','it friction','herramienta interna','internal tool','incidencia','incident','ticket it'],intent:'oracle'},
    {keys:['booking','motor de reservas','reserva','hotel','hospedaje','hospitality'],intent:'booking'},
    {keys:['cef','design system','sistema de diseño','edtech','accesibilidad','accessibility','wcag','componente','component','token'],intent:'cef'},
    {keys:['ilunion','cro','conversion','conversión','a/b','ab test','aem','experimento','experiment'],intent:'cro'},
    {keys:['remoto','remote','presencial','hybrid','hibrido','híbrido','madrid','ubicacion','location','donde','where'],intent:'remote'},
    {keys:['disponib','available','cuándo','when','incorpor','start','join','empezar','inmediata'],intent:'availability'},
    {keys:['salario','salary','sueldo','wage','pay','rango','compensacion','compensation','pretensiones','expectations'],intent:'salary'},
    {keys:['entrevista','interview','reunión','meeting','llamada','call','hablar','talk','conocer','meet','contactar','schedule','cita','appointment'],intent:'interview'},
    {keys:['contact','contacto','email','correo','escribir','reach','write','linkedin'],intent:'contact'},
    {keys:['research','investig','usuario','user','test','usab','entrev'],intent:'research'},
    {keys:['design system','sistema de diseño','componente','component','token','library','libreria','figma system'],intent:'systems'},
    {keys:['cro','conversión','conversion','optimiz','a/b','ab test','funnel','analytics','metr'],intent:'cro'},
    {keys:['por qué','why','contratar','hire','elegir','choose','diferencia','different','valor','value','aporta','brings'],intent:'whyhire'},
    {keys:['sector','industria','industry','turismo','travel','edtech','saas','empresa','company','tipo','type'],intent:'sector'}
  ];

  var isOpen=false, isTyping=false, initialized=false;

  function getLang(){return document.documentElement.classList.contains('lang-en')?'en':'es';}
  function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}
  function getResponse(intent){var lang=getLang();return pick(KB[lang][intent]||KB[lang].default);}
  function detectIntent(text){
    var t=text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
    for(var i=0;i<RULES.length;i++){
      var r=RULES[i];
      for(var j=0;j<r.keys.length;j++){if(t.indexOf(r.keys[j])!==-1)return r.intent;}
    }
    return 'default';
  }

  function addMsg(text,role){
    var box=document.getElementById('chatMessages');
    var wrap=document.createElement('div');wrap.className='chat-msg '+role;
    var bubble=document.createElement('div');bubble.className='chat-bubble';
    bubble.innerHTML=text;wrap.appendChild(bubble);box.appendChild(wrap);
    box.scrollTop=box.scrollHeight;
    return wrap;
  }

  function showTyping(){
    var box=document.getElementById('chatMessages');
    var wrap=document.createElement('div');wrap.className='chat-msg bot';wrap.id='chatTypingMsg';
    var bubble=document.createElement('div');bubble.className='chat-bubble chat-typing';
    bubble.innerHTML='<span></span><span></span><span></span>';
    wrap.appendChild(bubble);box.appendChild(wrap);box.scrollTop=box.scrollHeight;
  }
  function removeTyping(){var el=document.getElementById('chatTypingMsg');if(el)el.remove();}

  function renderChips(items){
    var c=document.getElementById('chatChips');c.innerHTML='';
    items.forEach(function(chip){
      var btn=document.createElement('button');btn.className='chat-chip';
      btn.textContent=chip.label;
      btn.setAttribute('data-key',chip.key);
      btn.onclick=function(){sendMessage(chip.label,chip.key);c.innerHTML='';};
      c.appendChild(btn);
    });
  }

  /* History stack: each entry = {userEl, botEl, chips} */
  var history=[];

  function resetChat(){
    document.getElementById('chatMessages').innerHTML='';
    document.getElementById('chatChips').innerHTML='';
    document.getElementById('chat-undo').classList.remove('visible');
    history=[];
    initialized=false;
    isTyping=false;
    initChat();
  }

  window.chatUndo=function(){
    if(!history.length||isTyping)return;
    var last=history.pop();
    if(last.userEl&&last.userEl.parentNode) last.userEl.parentNode.removeChild(last.userEl);
    if(last.botEl&&last.botEl.parentNode)   last.botEl.parentNode.removeChild(last.botEl);
    /* Restore chips */
    var c=document.getElementById('chatChips');c.innerHTML='';
    (last.prevChips||[]).forEach(function(chip){
      var btn=document.createElement('button');btn.className='chat-chip';btn.textContent=chip.label;
      btn.onclick=function(){sendMessage(chip.label,chip.key);c.innerHTML='';};
      c.appendChild(btn);
    });
    if(!history.length) document.getElementById('chat-undo').classList.remove('visible');
    var box=document.getElementById('chatMessages');
    box.scrollTop=box.scrollHeight;
  };

  function sendMessage(text,intentOverride){
    if(isTyping)return;
    /* Snapshot current chips before clearing */
    var prevChips=[];
    document.getElementById('chatChips').querySelectorAll('.chat-chip').forEach(function(b){
      prevChips.push({label:b.textContent,key:b.getAttribute('data-key')||''});
    });
    var userEl=addMsg(text,'user');
    isTyping=true;
    var intent=intentOverride||detectIntent(text);
    showTyping();
    setTimeout(function(){
      removeTyping();
      var botEl=addMsg(getResponse(intent),'bot');
      isTyping=false;
      history.push({userEl:userEl,botEl:botEl,prevChips:prevChips});
      document.getElementById('chat-undo').classList.add('visible');
      var lang=getLang();
      var alwaysChips = lang==='en'
        ? [{label:'Schedule interview',key:'interview'},{label:'Why hire her?',key:'whyhire'}]
        : [{label:'Concertar entrevista',key:'interview'},{label:'¿Por qué contratarla?',key:'whyhire'}];
      var casesChips = lang==='en'
        ? [{label:'Schedule interview',key:'interview'},{label:'Skills',key:'skills'}]
        : [{label:'Concertar entrevista',key:'interview'},{label:'Habilidades',key:'skills'}];
      if(intent==='cases'){renderChips(casesChips);}
      else if(intent!=='interview'&&intent!=='contact'){renderChips(alwaysChips);}
    },650+Math.random()*400);
  }

  function initChat(){
    if(initialized)return;initialized=true;
    setTimeout(function(){addMsg(getResponse('greeting'),'bot');renderChips(CHIPS[getLang()]);},180);
  }

  window.chatToggle=function(){
    var panel=document.getElementById('chat-panel');
    var trigger=document.getElementById('chat-trigger');
    isOpen=!isOpen;
    panel.classList.toggle('open',isOpen);
    trigger.classList.toggle('open',isOpen);
    if(isOpen){initChat();setTimeout(function(){var i=document.getElementById('chatInput');if(i)i.focus();},320);}
  };
  window.chatSend=function(){
    var input=document.getElementById('chatInput');
    var text=input.value.trim();
    if(!text||isTyping)return;
    input.value='';input.style.height='';
    document.getElementById('chatChips').innerHTML='';
    sendMessage(text);
  };
  window.chatKeydown=function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();chatSend();}};
  window.chatAutoResize=function(el){el.style.height='';el.style.height=Math.min(el.scrollHeight,90)+'px';};

  /* Language switch: reset chat so greeting appears in the new language */
  new MutationObserver(function(){
    var input=document.getElementById('chatInput');
    if(input)input.placeholder=getLang()==='en'?'Type your question…':'Escribe tu pregunta…';
    if(isOpen&&initialized){resetChat();}
  }).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
})();
