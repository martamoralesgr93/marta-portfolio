// Asistente IA del portfolio de Marta Morales — función serverless (Vercel).
// Responde SOLO con la base de conocimiento (api/kb.js). Sin dependencias externas.
// Requiere la variable de entorno ANTHROPIC_API_KEY en el proyecto de Vercel.

const KB = require('./kb.js');

// Modelo económico y rápido. Cambiable si hace falta.
const MODEL = 'claude-3-5-haiku-latest';

const FALLBACK = {
  es: "Ahora mismo no puedo procesar eso. Escríbele directamente a Marta: <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> (responde en menos de 24h).",
  en: "I can't process that right now. Email Marta directly: <a href='mailto:mmoralesgr93@gmail.com'>mmoralesgr93@gmail.com</a> (replies within 24h)."
};

function buildSystem(lang, kb, prompts) {
  const langLine = lang === 'en'
    ? 'Always answer in English.'
    : 'Responde siempre en español.';
  return [
    "Eres el asistente de IA integrado en el portfolio de Marta Morales, Product Designer.",
    "OBJETIVO ÚNICO (KPI): que quien visita encuentre, en menos de 30 segundos, lo que necesita para decidir si merece la pena entrevistar o contratar a Marta.",
    "",
    "Aquí tienes las REGLAS DE COMPORTAMIENTO Y CONTRATO DE OPERACIÓN que debes seguir estrictamente:",
    prompts || "",
    "",
    "ESTILO Y FORMATO DE RESPUESTA:",
    "- Sé conciso (2 a 6 frases normalmente), cálido, profesional, seguro pero honesto.",
    "- Usa Markdown estándar: **negrita** para datos clave y cifras, listas con guiones (- item) para enumeraciones, y párrafos limpios.",
    "- El cliente se encargará de renderizar este Markdown a HTML, por lo que NO uses etiquetas HTML crudas (como <strong> o <br>), usa formato Markdown normal.",
    "- Cuando sea natural, cierra con un pequeño siguiente paso o el contacto (email: mmoralesgr93@gmail.com), sin ser insistente.",
    " " + langLine,
    "",
    "INFORMACIÓN DE LA BASE DE CONOCIMIENTO (única fuente de verdad):",
    kb
  ].join("\n");
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const message = (body.message || '').toString().slice(0, 1000).trim();
    const lang = body.lang === 'en' ? 'en' : 'es';
    const history = Array.isArray(body.history) ? body.history.slice(-6) : [];

    if (!message) {
      res.status(400).json({ error: 'empty_message' });
      return;
    }

    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) {
      // Sin clave configurada: degradación elegante (el frontend usa su fallback local).
      res.status(200).json({ reply: null, unavailable: true });
      return;
    }

    const messages = history
      .filter(m => m && (m.role === 'user' || m.role === 'assistant') && m.content)
      .map(m => ({ role: m.role, content: String(m.content).slice(0, 2000) }));
    messages.push({ role: 'user', content: message });

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 500,
        system: buildSystem(lang, KB[lang], KB.prompts),
        messages
      })
    });

    if (!r.ok) {
      res.status(200).json({ reply: FALLBACK[lang], fallback: true });
      return;
    }
    const data = await r.json();
    const reply = data && data.content && data.content[0] && data.content[0].text
      ? data.content[0].text
      : FALLBACK[lang];
    res.status(200).json({ reply });
  } catch (e) {
    res.status(200).json({ reply: FALLBACK.es, fallback: true });
  }
};
