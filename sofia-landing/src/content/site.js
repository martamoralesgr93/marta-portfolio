/**
 * Todo el texto de la landing, en un solo sitio.
 * Fuente: brief estratégico UX/UI + UX Writing de Sofía Morales Abogada.
 *
 * Reglas que no se negocian (del brief):
 *   §18/§25 — sin fotografías de Sofía, sin abogados de stock, apretones de
 *             manos, juzgados, balanzas, mazos ni columnas.
 *   §19     — frases cortas, verbos activos, sin jerga; explicar, no vender.
 *   §21     — un único CTA en toda la web: «Cuéntame tu caso».
 *   §30/§31 — la página debe dejar claro que se puede preguntar sin miedo al
 *             coste, y que el presupuesto llega antes de decidir nada.
 *
 * ⚠️ PENDIENTE DE VALIDAR antes de publicar:
 *   - contact.email      → correo real de Sofía
 *   - contact.scope      → ámbito geográfico y si atiende online
 *   - about.credentials  → formación y experiencia concretas (§12)
 *   - footer.legalLinks  → aviso legal, privacidad y cookies reales
 *   - draftNotice        → poner a false cuando lo anterior esté confirmado
 * Sin «especialista» acreditable, plazos de respuesta, tarifas ni promesas de
 * resultado: el Estatuto General de la Abogacía condiciona esas menciones.
 */

export const draftNotice = {
  // Ponlo a true para que el pie vuelva a avisar de que los datos son
  // provisionales, mientras sigan sin confirmarse.
  enabled: false,
  text: 'Correo, ámbito de actuación, formación y textos legales pendientes de confirmar antes de publicar.',
};

export const brand = {
  name: 'Sofía Morales',
  role: 'Abogada',
  monogram: 'SM',
  pillars: ['Derecho', 'Claridad', 'Confianza'], // firma verbal del manual
  tagline: 'Derecho bancario y civil explicado para que puedas decidir.',
};

export const contact = {
  email: 'hola@sofiamoralesabogada.com', // PENDIENTE
  scope: 'Atención presencial y online', // PENDIENTE: confirmar ciudad
};

export const cta = 'Cuéntame tu caso'; // §21 · el mismo en toda la página

// El objetivo de la página es una sola cosa: que escriban. Cada enlace del
// menú es una salida que compite con el CTA, así que solo quedan los tres que
// responden a las preguntas que frenan el contacto (§30): «¿puede ayudarme?»,
// «¿qué va a pasar?» y «¿cuánto cuesta?». El resto vive en el pie.
export const nav = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Cómo trabajo', href: '#proceso' },
  { label: 'Precios y dudas', href: '#faq' },
];

export const hero = {
  eyebrow: 'Derecho bancario y civil',
  titleLead: 'Tu problema legal tiene una solución.',
  titleMid: 'Empecemos por ',
  titleAccent: 'entenderlo.',
  lead: 'Soy Sofía Morales, abogada en derecho bancario y civil. Te ayudo a entender tu situación y a encontrar la mejor forma de resolverla, de manera clara, cercana y transparente.',
  microcopy:
    'Explícame tu situación por email. Te responderé personalmente con las opciones disponibles y un presupuesto adaptado a tu caso.',
};

export const problems = {
  eyebrow: '¿Te está pasando algo de esto?',
  title: 'No necesitas saber cómo se llama tu problema legal.',
  lead: 'Empieza por reconocer tu situación. De ordenarla me encargo yo.',
  // Cada tarjeta baja al formulario con la materia ya elegida.
  items: [
    { text: 'El banco me ha cobrado algo que no entiendo.', matter: 'Un problema con el banco' },
    { text: 'Necesito reclamar una deuda.', matter: 'Una deuda que quiero reclamar' },
    {
      text: 'Tengo un conflicto y no sé cómo resolverlo.',
      matter: 'Un conflicto que quiero resolver sin juicio',
    },
    { text: 'Tengo un problema con un contrato.', matter: 'Un contrato' },
    {
      text: 'Necesito orientación sobre una cuestión familiar.',
      matter: 'Una cuestión de familia',
    },
    { text: 'No sé si necesito acudir a un abogado.', matter: 'Aún no lo tengo claro' },
  ],
  cta: 'Cuéntame qué ha ocurrido',
};

export const services = {
  eyebrow: 'En qué puedo ayudarte',
  title: 'Cuatro terrenos, una misma forma de trabajar.',
  items: [
    {
      icon: 'layers',
      title: 'Derecho bancario',
      text: 'Si tienes un problema con tu banco, estudio tu caso y busco la vía más adecuada para reclamar.',
      points: ['Reclamaciones bancarias', 'Recuperación de cantidades', 'Vía judicial y extrajudicial'],
    },
    {
      icon: 'document',
      title: 'Derecho civil',
      text: 'Te acompaño cuando necesitas resolver un conflicto o proteger tus intereses en una relación civil.',
      points: ['Reclamaciones de cantidad', 'Responsabilidad civil', 'Acompañamiento en el procedimiento'],
    },
    {
      icon: 'nodes',
      title: 'Familia',
      text: 'Separaciones, custodias, pensiones o herencias, explicadas desde tu situación y no desde el procedimiento.',
      points: ['Separaciones y divorcios', 'Custodias y pensiones', 'Herencias'],
    },
    {
      icon: 'check',
      title: 'Contratos civiles y mercantiles',
      text: 'Reviso lo que vas a firmar o lo que ya firmaste, y te explico a qué te obliga y qué margen tienes.',
      points: ['Revisión antes de firmar', 'Incumplimientos', 'Negociación de acuerdos'],
    },
  ],
};

export const mediation = {
  eyebrow: 'Antes de llegar a juicio',
  title: 'No todos los conflictos tienen que acabar en un juicio.',
  paragraphs: [
    'Siempre que sea posible, busco la solución más adecuada antes de acudir a los tribunales. A veces es una negociación, otras una mediación, y otras una carta bien planteada en el momento correcto.',
    'Cuando la vía judicial es la que corresponde, la abordamos con una estrategia clara y sabiendo qué implica.',
  ],
  note: 'En términos jurídicos, esto se conoce como medios alternativos de solución de controversias (MASC).',
  options: [
    { title: 'Negociación', text: 'Hablar con la otra parte con una posición preparada.' },
    { title: 'Mediación', text: 'Un tercero neutral ayuda a que el acuerdo sea posible.' },
    { title: 'Acuerdo escrito', text: 'Cerrar por escrito lo pactado para que no vuelva a abrirse.' },
    { title: 'Vía judicial', text: 'Cuando toca, con una estrategia clara desde el principio.' },
  ],
};

export const process = {
  eyebrow: 'Cómo trabajo',
  title: 'Sabrás qué va a pasar en cada paso.',
  steps: [
    {
      number: '01.',
      icon: 'chat',
      title: 'Me cuentas qué ha ocurrido',
      text: 'No necesitas utilizar términos jurídicos. Explícame tu situación con tus palabras.',
    },
    {
      number: '02.',
      icon: 'search',
      title: 'Estudio tu caso',
      text: 'Analizo las circunstancias y las posibles vías de actuación.',
    },
    {
      number: '03.',
      icon: 'route',
      title: 'Te explico tus opciones',
      text: 'Te explico de forma clara qué puedes hacer y qué implica cada alternativa.',
    },
    {
      number: '04.',
      icon: 'document',
      title: 'Recibes un presupuesto adaptado',
      text: 'La propuesta económica se adapta a las características de tu caso.',
    },
    {
      number: '05.',
      icon: 'check',
      title: 'Decidimos cómo avanzar',
      text: 'Tú decides cómo quieres continuar.',
    },
  ],
};

export const about = {
  eyebrow: 'Sobre Sofía',
  title: 'La abogacía también puede ser cercana.',
  paragraphs: [
    'Creo que acudir a un abogado no debería ser el último recurso. Mi objetivo es que puedas explicar tu problema con tranquilidad, entender tus opciones y encontrar una solución adecuada a tu situación.',
    'Trabajo con particulares y familias. Ni la justicia ni entender lo que te ocurre deberían depender de quién puede pagar el despacho más caro.',
  ],
  values: [
    { icon: 'chat', title: 'Humana', text: 'Te hablo como una persona, no como una institución.' },
    { icon: 'eye', title: 'Directa', text: 'Sin rodeos ni jerga jurídica innecesaria.' },
    { icon: 'route', title: 'Resolutiva', text: 'La conversación va sobre qué puede hacerse.' },
    { icon: 'limit', title: 'Transparente', text: 'Proceso, alternativas y presupuesto, desde el principio.' },
  ],
  // PENDIENTE (§12): formación, colegiación y experiencia concretas.
};

export const resources = {
  eyebrow: 'Recursos para ti',
  allLabel: 'Ver todos los recursos',
  // PENDIENTE: los tres recursos aún no están escritos. Son temas que Sofía ya
  // trabaja; al publicarlos, cada tarjeta pasa a enlazar a su página.
  cards: [
    {
      tag: 'Guía',
      title: 'Comisiones bancarias: por dónde empezar',
      image: '/images/recurso-1.jpg',
      alt: 'Un sobre con ventanilla y unas gafas de lectura sobre una mesa de nogal.',
    },
    {
      tag: 'Artículo',
      title: 'Claves para una separación de mutuo acuerdo',
      image: '/images/recurso-2.jpg',
      alt: 'Dos tazas de cerámica una junto a otra, con una rama de olivo entre ellas.',
    },
    {
      tag: 'Guía',
      title: 'Herencias: lo que conviene saber antes de firmar',
      image: '/images/recurso-3.jpg',
      alt: 'Tres libros encuadernados en tela y atados con cordel sobre una superficie de travertino.',
    },
  ],
};

export const faq = {
  eyebrow: 'Preguntas frecuentes',
  title: 'Lo que suele preocupar antes de escribir.',
  items: [
    {
      question: '¿Cuánto me va a costar?',
      answer:
        'Contarme tu caso por email no tiene coste. Te respondo explicándote las vías posibles y con un presupuesto adaptado a las características de tu caso. Decides después, con la propuesta delante.',
    },
    {
      question: 'No sé si mi problema es lo bastante importante.',
      answer:
        'Esa duda es justo el motivo por el que existe esta página. Si te preocupa lo suficiente como para buscar información, merece que alguien lo mire. Y si veo que no necesitas un abogado, te lo digo.',
    },
    {
      question: '¿Cuándo conviene acudir a un abogado?',
      answer:
        'Antes de firmar, antes de que venza un plazo y antes de que el conflicto se enquiste. Cuanto antes se ordena la situación, más opciones suele haber sobre la mesa.',
    },
    {
      question: '¿Qué información necesitas para responderme?',
      answer:
        'Qué ha ocurrido y desde cuándo, con quién (un banco, una empresa, una administración u otra persona), si tienes documentos o cartas, si hay algún plazo por delante y qué te gustaría conseguir.',
    },
    {
      question: '¿Vamos a acabar en un juicio?',
      answer:
        'No necesariamente. Siempre que sea posible busco un acuerdo o una vía extrajudicial. Si la vía judicial es la adecuada, te explico qué implica antes de dar ningún paso.',
    },
    {
      question: '¿Llevas derecho penal?',
      answer:
        'No. Si tu caso es penal, te lo digo en la primera respuesta y te oriento sobre a quién acudir.',
    },
  ],
};

export const contactSection = {
  eyebrow: 'Cuéntame qué te preocupa',
  titleLead: 'No necesitas saber de leyes',
  titleAccent: 'para pedir ayuda.',
  lead: 'Explícame qué ha ocurrido con tus propias palabras y te responderé personalmente.',
  note: 'Te contestaré indicándote las posibles vías de actuación y un presupuesto adaptado a tu caso.',
  helpTitle: 'Qué me ayuda a responderte mejor',
  helpItems: [
    'Qué ha ocurrido y desde cuándo.',
    'Con quién: banco, empresa, administración u otra persona.',
    'Si tienes documentos, cartas o plazos por delante.',
    'Qué te gustaría conseguir.',
  ],
  privacyText:
    'Uso tus datos únicamente para responderte. No los comparto con terceros ni los añado a ninguna lista de correo.',
  matters: [
    'Un problema con el banco',
    'Una deuda que quiero reclamar',
    'Un conflicto que quiero resolver sin juicio',
    'Un contrato',
    'Una cuestión de familia',
    'Aún no lo tengo claro',
  ],
};

export const footer = {
  columns: [
    {
      title: 'Navegación',
      links: [
        { label: '¿Te pasa esto?', href: '#problemas' },
        { label: 'Servicios', href: '#servicios' },
        { label: 'Cómo trabajo', href: '#proceso' },
        { label: 'Sobre Sofía', href: '#sobre-sofia' },
        { label: 'Recursos', href: '#recursos' },
        { label: 'Preguntas frecuentes', href: '#faq' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Aviso legal', href: '#' }, // PENDIENTE
        { label: 'Política de privacidad', href: '#' }, // PENDIENTE
        { label: 'Política de cookies', href: '#' }, // PENDIENTE
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Sofía Morales Abogada. Todos los derechos reservados.`,
};
