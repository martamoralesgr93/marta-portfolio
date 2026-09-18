/**
 * Todo el texto de la landing, en un solo sitio.
 * Fuente: brief estratégico UX/UI + UX Writing de Sofía García de los Ríos.
 *
 * Tono de marca:
 *   - Profesional, riguroso y actualizado.
 *   - Cercano, humano y empático (te entiende y te da tu lugar).
 *   - Sin jerga obsoleta, sin fraseología de bufete tradicional.
 */

export const draftNotice = {
  enabled: false,
  text: 'Correo, ámbito de actuación, formación y textos legales pendientes de confirmar antes de publicar.',
};

export const brand = {
  name: 'García de los Ríos',
  fullName: 'Sofía García de los Ríos',
  role: 'Abogada',
  monogram: 'GR',
  pillars: ['Rigor', 'Claridad', 'Confianza'],
  tagline: 'Asesoramiento jurídico claro, directo y honesto en derecho bancario y civil.',
};

export const contact = {
  email: 'hola@garciadelosrios.com',
  scope: 'Atención presencial y online',
};

export const cta = 'Cuéntame tu caso';

export const nav = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Cómo trabajo', href: '#proceso' },
  { label: 'Precios y dudas', href: '#faq' },
];

export const hero = {
  eyebrow: 'Derecho bancario y civil',
  titleLead: 'Tu problema legal tiene solución.',
  titleMid: 'Hablémoslo con ',
  titleAccent: 'claridad.',
  lead: 'Analizo tu situación, te explico tus opciones reales sin rodeos y trazamos el camino más rápido y seguro para resolverla.',
  microcopy: 'Te respondo personalmente, con un análisis preliminar y un presupuesto cerrado sin compromiso.',
};

export const problems = {
  eyebrow: '¿Te identificas con esto?',
  title: 'Identifiquemos qué te preocupa.',
  items: [
    { text: 'El banco me ha cobrado comisiones o gastos que no entiendo.', matter: 'Un problema con el banco' },
    { text: 'Necesito reclamar un dinero o una deuda impagada.', matter: 'Una deuda que quiero reclamar' },
    { text: 'Quiero resolver un conflicto sin tener que ir a juicio.', matter: 'Un conflicto sin juicio' },
    { text: 'Voy a firmar un contrato y quiero saber a qué me obliga.', matter: 'Revisión de un contrato' },
    { text: 'Necesito orientación sobre un tema familiar o de herencia.', matter: 'Una cuestión de familia o herencia' },
    { text: 'No sé si mi caso requiere abogado, pero quiero salir de dudas.', matter: 'Consulta de viabilidad' },
  ],
  cta: 'Cuéntame qué ha ocurrido',
};

export const services = {
  eyebrow: 'En qué puedo ayudarte',
  title: 'Áreas de actuación.',
  items: [
    {
      icon: 'layers',
      title: 'Derecho bancario',
      text: 'Reclamación de cláusulas abusivas, comisiones y gastos hipotecarios con estrategia fundamentada.',
    },
    {
      icon: 'document',
      title: 'Derecho civil',
      text: 'Defensa en reclamaciones de cantidad, incumplimientos contractuales y responsabilidad civil.',
    },
    {
      icon: 'nodes',
      title: 'Familia y Herencias',
      text: 'Separaciones, custodias y procesos hereditarios gestionados con rigor técnico y máxima empatía.',
    },
    {
      icon: 'check',
      title: 'Contratos y Acuerdos',
      text: 'Revisión y redacción de documentos legales para proteger tus intereses antes de firmar.',
    },
  ],
};

export const mediation = {
  eyebrow: 'Solución extrajudicial y ágil',
  title: 'Cómo resolvemos tu caso sin necesidad de ir a juicio.',
  paragraphs: [
    'Agotar la vía extrajudicial antes de entrar en los juzgados ahorra meses de espera, reduce costes y te devuelve el control. Selecciona cada vía para ver cómo actuamos y qué ganas tú en cada etapa:',
  ],
  note: 'Vía extrajudicial previa (MASC): Medios jurídicos ágiles para resolver conflictos con plena validez legal.',
  ctaText: 'Consultar si mi caso se puede resolver sin juicio',
  options: [
    {
      id: 'negociacion',
      number: '01',
      title: 'Negociación directa',
      subtitle: 'Reclamación e intercambio formal',
      action: 'Redacto y envío un requerimiento legal argumentado a la otra parte para exigir una solución justa sin demora.',
      benefit: 'Obtenemos una respuesta rápida en semanas y evitas empezar un procedimiento judicial largo y costoso.',
      tag: 'Rapidez y firmeza',
    },
    {
      id: 'mediacion',
      number: '02',
      title: 'Mediación de posturas',
      subtitle: 'Mesa de negociación asistida',
      action: 'Te represento y defiendo tus intereses en la mesa de negociación para desbloquear posturas con la otra parte.',
      benefit: 'Evitas enfrentamientos personales y logramos acuerdos equilibrados donde tus derechos quedan protegidos.',
      tag: 'Menor desgaste',
    },
    {
      id: 'acuerdo',
      number: '03',
      title: 'Acuerdo escrito blindado',
      subtitle: 'Transacción con validez jurídica plena',
      action: 'Redacto el convenio o acuerdo de transacción con cláusulas de protección total para cerrar el conflicto.',
      benefit: 'El problema queda resuelto definitivamente, con valor ejecutivo y sin resquicios ni sorpresas futuras.',
      tag: 'Cierre definitivo',
    },
    {
      id: 'judicial',
      number: '04',
      title: 'Vía judicial de respaldo',
      subtitle: 'Demanda firme si no hay acuerdo',
      action: 'Si la otra parte rechaza negociar, presentamos demanda formal en el juzgado con la estrategia estudiada.',
      benefit: 'Acudimos al tribunal con una posición sólida y habiendo demostrado tu buena fe ante el juez.',
      tag: 'Defensa total',
    },
  ],
};

export const quote = {
  text: 'Tu tranquilidad legal, mi prioridad.',
  attribution: 'Sofía García de los Ríos, abogada',
  imageAlt: 'Sofía anotando un documento junto a un ejemplar del Código Civil.',
};

export const process = {
  eyebrow: 'Cómo trabajo',
  title: 'Un proceso transparente de principio a fin.',
  steps: [
    {
      number: '01.',
      icon: 'chat',
      title: 'Me cuentas qué ha ocurrido',
      text: 'En tus palabras, en un entorno confidencial y sin tecnicismos.',
    },
    {
      number: '02.',
      icon: 'search',
      title: 'Analizo la viabilidad',
      text: 'Estudio la documentación y determino tus opciones reales.',
    },
    {
      number: '03.',
      icon: 'route',
      title: 'Te propongo la estrategia',
      text: 'Conoces los plazos, alternativas y posibilidades de éxito.',
    },
    {
      number: '04.',
      icon: 'document',
      title: 'Presupuesto cerrado',
      text: 'Sin sorpresas ni costes ocultos antes de empezar.',
    },
    {
      number: '05.',
      icon: 'check',
      title: 'Tú tomas el control',
      text: 'Con la información clara y la propuesta delante, decides tú.',
    },
  ],
};

export const about = {
  eyebrow: 'Sobre Sofía',
  title: 'Una abogacía rigurosa, cercana y adaptada a ti.',
  paragraphs: [
    'Entiendo que cuando buscas asesoramiento legal necesitas respuestas claras, no discursos lejanos. Ofrezco una visión actualizada del derecho, combinando solvencia técnica con una comunicación directa y empática que te sitúa siempre en el centro.',
  ],
  values: [
    { icon: 'chat', title: 'Cercanía real', text: 'Trato directo y atención personal sin barreras.' },
    { icon: 'eye', title: 'Rigor técnico', text: 'Estrategias jurídicas sólidas y actualizadas.' },
    { icon: 'route', title: 'Claridad absoluta', text: 'Explicaciones sencillas, sin jerga innecesaria.' },
    { icon: 'limit', title: 'Transparencia', text: 'Presupuesto cerrado y honestidad desde la primera cita.' },
  ],
};

export const resources = {
  eyebrow: 'Recursos para ti',
  allLabel: 'Ver todas las guías',
  cards: [
    {
      tag: 'Guía',
      title: 'Comisiones bancarias: por dónde empezar',
      image: '/images/recurso-1.jpg',
      alt: 'Tarjeta de crédito sobre extractos bancarios y ordenador en un escritorio.',
    },
    {
      tag: 'Artículo',
      title: 'Claves para una separación de mutuo acuerdo',
      image: '/images/recurso-2.jpg',
      alt: 'Escritorio con documentos, llaves de vivienda y libros de Derecho Civil.',
    },
    {
      tag: 'Guía',
      title: 'Herencias: lo que conviene saber antes de firmar',
      image: '/images/recurso-3.jpg',
      alt: 'Documento sobre mesa de madera con pluma estilográfica y libros de Testamentos y Procesos Hereditarios.',
    },
  ],
};

export const faq = {
  eyebrow: 'Preguntas frecuentes',
  title: 'Lo que conviene saber antes de empezar.',
  items: [
    {
      question: '¿Cuánto me va a costar?',
      answer:
        'Revisar tu consulta inicial por correo no tiene coste. Tras analizarlo, te envío una propuesta con presupuesto cerrado y sin compromiso. Tú decides.',
    },
    {
      question: 'No sé si mi caso es lo bastante importante.',
      answer:
        'Si te genera inquietud, merece ser analizado. Evalúo tu consulta con honestidad y, si no necesitas un abogado, te lo diré claramente.',
    },
    {
      question: '¿Cuándo conviene acudir a un abogado?',
      answer:
        'Antes de firmar cualquier acuerdo o vencido un plazo. Actuar a tiempo amplía tus alternativas jurídicas y evita costes futuros.',
    },
    {
      question: '¿Qué información necesitas para responderme?',
      answer:
        'Un resumen de lo ocurrido, las partes implicadas, la fecha de inicio, si dispones de documentos y qué objetivo te gustaría alcanzar.',
    },
    {
      question: '¿Iremos a juicio necesariamente?',
      answer:
        'No. Agotamos siempre la negociación y el acuerdo extrajudicial. Solo acudimos a juicio si es la vía más ventajosa para tus intereses.',
    },
    {
      question: '¿Llevas casos penales?',
      answer:
        'No. Me especializo exclusivamente en derecho bancario, civil y familia. Si tu asunto es penal, te derivaré con la máxima profesionalidad.',
    },
  ],
};

export const contactSection = {
  eyebrow: 'Consulta sin compromiso',
  titleLead: 'Hablemos de tu caso',
  titleAccent: 'con total claridad.',
  lead: 'Explícame tu situación con tus palabras. Te responderé personalmente con un análisis de viabilidad y un presupuesto adaptado.',
  note: '',
  helpTitle: 'Qué me ayuda a responderte mejor',
  helpItems: [
    'Qué ha ocurrido y desde cuándo.',
    'Con quién: banco, empresa o particular.',
    'Si hay documentos o plazos pendientes.',
  ],
  privacyText: 'Tus datos se tratan de forma estrictamente confidencial para responder a tu consulta.',
  matters: [
    'Un problema con el banco',
    'Una deuda que quiero reclamar',
    'Un conflicto sin juicio',
    'Revisión de un contrato',
    'Una cuestión de familia o herencia',
    'Consulta de viabilidad',
  ],
};

export const footer = {
  columns: [
    {
      title: 'Navegación',
      links: [
        { label: '¿Te identificas?', href: '#problemas' },
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
        { label: 'Aviso legal', href: '#' },
        { label: 'Política de privacidad', href: '#' },
        { label: 'Política de cookies', href: '#' },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Sofía García de los Ríos, abogada. Todos los derechos reservados.`,
};
