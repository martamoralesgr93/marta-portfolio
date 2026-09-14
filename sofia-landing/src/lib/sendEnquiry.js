/**
 * Envío de la consulta.
 *
 * Dos modos, sin tocar los componentes:
 *   1. Si existe VITE_CONTACT_ENDPOINT (Formspree, Resend, una función
 *      serverless propia…), se hace POST con el JSON de la consulta.
 *   2. Si no, se compone un mailto: con todo el caso ya redactado y se abre
 *      el cliente de correo de la persona. El objetivo de la landing es que
 *      Sofía reciba un email, así que funciona sin backend desde el minuto 0.
 */

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT ?? '';

export const deliveryMode = ENDPOINT ? 'endpoint' : 'mailto';

const MATTER_FALLBACK = 'Sin especificar';

export function buildSubject(values) {
  const matter = values.matter || MATTER_FALLBACK;
  return `Consulta jurídica — ${matter} — ${values.name}`;
}

export function buildBody(values) {
  return [
    `Nombre: ${values.name}`,
    `Email: ${values.email}`,
    `Teléfono: ${values.phone?.trim() || 'No facilitado'}`,
    `Materia: ${values.matter || MATTER_FALLBACK}`,
    '',
    'Caso:',
    values.message.trim(),
    '',
    '—',
    'Enviado desde el formulario de sofiamoralesabogada.com',
    `Consentimiento de tratamiento de datos: sí (${new Date().toLocaleString('es-ES')})`,
  ].join('\n');
}

export function buildMailtoUrl(values, to) {
  const params = new URLSearchParams({
    subject: buildSubject(values),
    body: buildBody(values),
  });
  // URLSearchParams codifica los espacios como «+»; en mailto: deben ser %20.
  return `mailto:${to}?${params.toString().replace(/\+/g, '%20')}`;
}

export async function sendEnquiry(values, { to }) {
  if (ENDPOINT) {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...values,
        subject: buildSubject(values),
        sentAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`El envío ha fallado (${response.status}).`);
    }

    return { mode: 'endpoint' };
  }

  window.location.href = buildMailtoUrl(values, to);
  return { mode: 'mailto' };
}
