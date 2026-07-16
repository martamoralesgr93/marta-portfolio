// Asistente IA del portfolio de Marta Morales — función serverless (Vercel).
// Responde usando la base de conocimiento compilada.
// Soporta tanto GEMINI (Gratuito via Google AI Studio) como CLAUDE.

const KB = require('./kb.js');

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

    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    if (!geminiKey && !anthropicKey) {
      // Sin claves configuradas: fallback
      res.status(200).json({ reply: null, unavailable: true });
      return;
    }

    const systemPrompt = buildSystem(lang, KB[lang], KB.prompts);

    // Si hay clave de Gemini, priorizarla por tener capa gratuita
    if (geminiKey) {
      const contents = history
        .filter(m => m && (m.role === 'user' || m.role === 'assistant') && m.content)
        .map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: String(m.content).slice(0, 2000) }]
        }));
      contents.push({ role: 'user', parts: [{ text: message }] });

      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.2
          }
        })
      });

      if (r.ok) {
        const data = await r.json();
        const reply = data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text
          ? data.candidates[0].content.parts[0].text
          : null;
        if (reply) {
          res.status(200).json({ reply });
          return;
        }
      }
    }

    // Si hay clave de Anthropic, usar Claude
    if (anthropicKey) {
      const messages = history
        .filter(m => m && (m.role === 'user' || m.role === 'assistant') && m.content)
        .map(m => ({ role: m.role, content: String(m.content).slice(0, 2000) }));
      messages.push({ role: 'user', content: message });

      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-haiku-latest',
          max_tokens: 500,
          system: systemPrompt,
          messages
        })
      });

      if (r.ok) {
        const data = await r.json();
        const reply = data && data.content && data.content[0] && data.content[0].text
          ? data.content[0].text
          : null;
        if (reply) {
          res.status(200).json({ reply });
          return;
        }
      }
    }

    res.status(200).json({ reply: FALLBACK[lang], fallback: true });
  } catch (e) {
    res.status(200).json({ reply: FALLBACK.es, fallback: true });
  }
};
