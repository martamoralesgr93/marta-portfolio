---
title: "Arquitectura de la Base de Conocimiento (RAG-first)"
autor: "Marta Morales — Product Designer"
fase: "1b · Arquitectura de conocimiento (para validación, antes de contenido)"
fecha: 2026-07-14
reemplaza_parcialmente: "00-arquitectura-portfolio-ia.md §3"
---

# Arquitectura de la Base de Conocimiento (RAG-first)

> Cambio de paradigma aceptado: **no diseñamos un portfolio. Diseñamos un sistema de conocimiento sobre Marta.** El portfolio web será una de sus interfaces; la misma base alimentará después un MCP server, un GPT personalizado, agentes de entrevista, etc.
> Enfoque: **primero la base de conocimiento y su contrato de recuperación; después la presentación.** Sin código todavía.

---

## 1. El principio que ordena todo: capa headless

La decisión de fondo es tratar el conocimiento como un producto independiente de cualquier interfaz. Eso obliga a separar tres capas que hasta ahora estaban mezcladas:

| Capa | Función | ¿Se indexa/embebe? | Archivos |
|---|---|---|---|
| **Knowledge** | El conocimiento sobre ti. Fuente única de verdad. | **Sí** — es lo que el RAG recupera | `profile`, `experience`, `projects/*`, `metrics`, `principles`, `workflows`, `ai`, `collaboration`, `toolkit`, `skills`, `career`, `achievements`, `faq`, `glossary` |
| **Orchestration** | Cómo se comporta el sistema al responder. Config, no contenido. | **No** — dirige el comportamiento, no se cita | `agents`, `prompts`, `_manifest`, `_schema` |
| **Presentation** | Cómo se ve la interfaz. | **No** | `styles` |

**Por qué importa este corte:** si `agents.md` o `styles.md` se embebieran junto al conocimiento, contaminarían la recuperación (una pregunta sobre tu experiencia podría traer trozos de configuración de agentes). Mantenerlos fuera del índice de embeddings es una decisión RAG, no cosmética.

> Recomendación: reflejar esta separación en carpetas —
> `knowledge/` (indexable) · `system/` (agents, prompts, manifest, schema) · `presentation/` (styles).
> Tu propuesta metía todo en `knowledge/`; para RAG conviene sacar orquestación y presentación.

---

## 2. Evaluación de tu estructura propuesta

Tu estructura es sólida y va en la dirección correcta (documentos pequeños, desacoplados, un proyecto por archivo). La valido en un 85%. Estos son los ajustes que la hacen más robusta:

**Lo que mantengo tal cual:** `profile`, `experience`, `projects/` (un caso por doc), `metrics`, `principles`, `workflows`, `ai`, `collaboration`, `toolkit`, `skills`, `career`, `achievements`, `faq`, `glossary`, `agents`, `styles`, `prompts`. Buen nivel de granularidad.

**Ajustes propuestos:**

1. **Bilingüe (ES/EN) → archivos paralelos, no mezclados.** Los embeddings son sensibles al idioma: mezclar ES y EN en un mismo doc degrada la recuperación. Regla: `profile.es.md` + `profile.en.md`, mismo `id` raíz, campo `lang`, enlazados como traducciones. Índice de embeddings separado por idioma. (Ver §4.)

2. **Añadir dos documentos de sistema que faltan:**
   - `system/_schema.md` — el **contrato de metadatos** que todo doc cumple (§3). Sin esto, la consistencia se pierde en cuanto haya 30 archivos.
   - `system/_manifest.md` — el **mapa de routing**: lista de todos los docs con su `id`, `summary`, personas y relaciones. Es lo que un router de agentes consulta para decidir qué recuperar antes incluso de embeber. (Luego puede exportarse a `manifest.json`.)

3. **Fronteras explícitas entre docs que se solapan.** El mayor riesgo RAG de tu lista es la **colisión de recuperación** entre documentos parecidos. Hay que definir qué NO va en cada uno (§5). Los tres pares peligrosos:
   - `experience` vs `career` vs `achievements`
   - `skills` vs `toolkit`
   - `workflows` vs `collaboration`

4. **Métricas: centralizadas pero con IDs estables.** `metrics.md` es fuente única, pero cada métrica lleva un `id` (`m-cro-uplift-01`) y los casos la **referencian por id**, no la reescriben. Así evitas repetición y, a la vez, el caso sigue siendo recuperable con su cifra. (§5, §6.)

5. **`projects/` necesita una plantilla común.** Para que la IA cite cualquier proyecto con la misma calidad, todos siguen el mismo esqueleto narrativo y el mismo frontmatter. (§5.4.)

Estructura resultante:

```
system/
├── _schema.md          # contrato de metadatos (no indexado)
├── _manifest.md        # mapa de routing / relaciones (no indexado)
├── agents.md           # definición de agentes (no indexado)
└── prompts.md          # prompts clave, incl. los de este portfolio (no indexado)

knowledge/              # TODO esto se embebe (versión .es y .en)
├── profile.md
├── experience.md
├── career.md
├── skills.md
├── toolkit.md
├── principles.md
├── workflows.md
├── collaboration.md
├── ai.md
├── metrics.md
├── achievements.md
├── faq.md
├── glossary.md
└── projects/
    ├── ilunion-booking-engine.md
    ├── cro.md
    ├── design-system.md
    ├── oracle.md
    └── paolo.md

presentation/
└── styles.md           # design system (no indexado)
```

---

## 3. Contrato de metadatos (`system/_schema.md`)

Cada documento indexable empieza con este frontmatter. **Este es el activo más importante de toda la arquitectura RAG:** metadatos consistentes = recuperación precisa y filtrable.

```yaml
---
id: proj-ilunion-booking          # slug único y estable (nunca cambia)
title: "Rediseño del motor de reservas de ILUNION"  # semántico, no genérico
type: project                     # profile|experience|project|metrics|principles|
                                  # workflow|ai|collaboration|toolkit|skills|
                                  # career|achievements|faq|glossary
layer: knowledge                  # knowledge|orchestration|presentation
lang: es                          # es|en
summary: "Cómo rediseñé el flujo de reserva y subí la conversión un X%."  # 1 línea → routing
personas: [ceo, head-of-design, pm, cro]   # para quién es más relevante
tags: [cro, conversion, booking, travel, funnel]   # vocabulario de recuperación
metrics_refs: [m-cro-uplift-01, m-booking-time-02]  # ids de metrics.md que cita
related: [exp-ilunion, wf-discovery, principle-evidence]  # otros docs conectados
canonical: true                   # si es la fuente de verdad de este tema
status: draft                     # draft|ready
visibility: public                # public|gated  (p. ej. salario = gated)
last_updated: 2026-07-14
---
```

Notas de diseño:
- **`summary`** es lo que un router lee para decidir recuperar sin embeber nada. Escríbelo pensando en la pregunta que responde.
- **`personas`** permite filtrado pre-retrieval: el CEO Agent puede restringir a docs con `ceo` en personas antes de la búsqueda semántica.
- **`tags`** son el puente entre el lenguaje del visitante y el tuyo; se nutren de `glossary.md` (sinónimos → mejor recall).
- **`related`** construye el grafo de conocimiento: permite "expandir" una respuesta trayendo docs vecinos.
- **`visibility: gated`** marca lo que la IA no revela sin más (tarifas, detalles sensibles); lo puede mencionar como "hablémoslo directamente".

---

## 4. Estrategia RAG

### 4.1 Una responsabilidad por documento
Cada doc responde a **una** familia de preguntas. Si un doc necesita dos frontmatter distintos para describirse, hay que partirlo. Alta cohesión dentro, bajo acoplamiento fuera.

### 4.2 Chunking por encabezado
- Documentos pequeños (objetivo < 300–400 líneas). Un doc grande no es más informativo; es menos recuperable.
- Regla de chunk: **1 `##` (H2) = 1 unidad recuperable**, autocontenida (que se entienda sin leer el resto del doc).
- Cada chunk hereda `id`, `type`, `personas`, `tags` del doc → los metadatos viajan con el vector.

### 4.3 Bilingüe
- **Fuente de verdad en ES**; `.en.md` paralelo cuando el doc pasa a `status: ready`.
- Mismo `id` raíz, distinto `lang`. Dos índices de embeddings (uno por idioma) o un índice con filtro `lang`. Nunca mezclar idiomas dentro de un chunk.
- El selector de idioma de la web filtra por `lang`; un agente en inglés recupera solo `.en`.

### 4.4 Anti-alucinación (grounding)
La IA responde solo con chunks recuperados. Si la confianza de recuperación es baja (nada relevante por encima de umbral), **no improvisa**: lo reconoce y ofrece contacto directo. Para un Product Designer, una IA que dice "esto no lo tengo documentado" es señal de criterio, no de debilidad.

---

## 5. Redefinición de cada documento

Formato: **responsabilidad · incluye · nunca incluye · personas · relaciones.** El "nunca incluye" es lo que evita colisiones de recuperación.

### 5.1 Identidad y trayectoria

**`profile.md`** — Quién eres, ahora.
Incluye: posicionamiento (Product Designer estratégico/CRO), pitch de 6s, ubicación, disponibilidad, foto/contacto, idiomas.
Nunca: historial de empleos (→ `experience`), narrativa de carrera (→ `career`).
Personas: todas. Relaciones: `experience`, `career`, `skills`.

**`experience.md`** — Los hechos del historial laboral.
Incluye: roles, empresas, fechas, responsabilidades, alcance. Datos verificables.
Nunca: la *historia* de por qué (→ `career`), métricas detalladas (→ `metrics`), casos (→ `projects/`).
Personas: recruiter, head-of-design. Relaciones: `projects/*`, `metrics`, `career`.

**`career.md`** — El arco narrativo y la motivación.
Incluye: de dónde vienes, por qué diseño de producto, tu evolución, qué buscas ahora y por qué (incl. el paso de ILUNION al siguiente reto). El "por qué" que `experience` no cuenta.
Nunca: fechas/roles como lista (→ `experience`).
Personas: head-of-design, founder, ceo. Relaciones: `experience`, `principles`.

**`achievements.md`** — Reconocimiento externo.
Incluye: premios, charlas, publicaciones, menciones, certificaciones destacadas.
Nunca: skills (→ `skills`), métricas de proyecto (→ `metrics`).
Personas: recruiter, head-of-design. Relaciones: `projects/*`, `experience`.

### 5.2 Capacidades

**`skills.md`** — Competencias (lo que sabes hacer).
Incluye: UX research, IA de información, interaction design, CRO, design systems, prototipado, data-informed design, facilitación. Con nivel y evidencia (link a proyecto).
Nunca: nombres de software (→ `toolkit`).
Personas: recruiter, head-of-design, ux. Relaciones: `toolkit`, `projects/*`.

**`toolkit.md`** — Herramientas (con qué lo haces).
Incluye: Figma, herramientas de research, analítica, prototipado, IA (nombra aquí las tools; el *cómo* va en `ai`). Cómo entregas a desarrollo.
Nunca: competencias (→ `skills`), método de uso de IA (→ `ai`).
Personas: dev, recruiter, ux. Relaciones: `skills`, `ai`, `collaboration`.

### 5.3 Cómo piensas y cómo trabajas (tu diferenciador)

**`principles.md`** — Cómo decides.
Incluye: tus principios de diseño, qué es buen diseño para ti, cómo priorizas, tu framework de decisión, trade-offs que asumes.
Nunca: el proceso paso a paso (→ `workflows`).
Personas: head-of-design, design-manager, ceo. Relaciones: `workflows`, `career`, `projects/*`.

**`workflows.md`** — Cómo trabajas, paso a paso.
Incluye: tu proceso end-to-end, desde recibir un problema hasta medir impacto. Fases, entregables, decisiones en cada punto.
Nunca: la filosofía detrás (→ `principles`), colaboración con roles (→ `collaboration`).
Personas: head-of-design, pm, ux. Relaciones: `principles`, `collaboration`, `ai`.

**`collaboration.md`** — Cómo trabajas con otros.
Incluye: cómo colaboras con PM, dev, negocio, stakeholders; cómo manejas feedback, desacuerdo, handoff; cómo comunicas decisiones.
Nunca: el proceso de diseño en sí (→ `workflows`).
Personas: design-manager, pm, dev, ceo. Relaciones: `workflows`, `toolkit`.

**`ai.md`** — Cómo usas IA en tu trabajo. **Tu mayor factor diferencial 2026.**
Incluye: cómo colaboras con Claude, ChatGPT, Gemini, Copilot, MCP; e IA aplicada a: UX research, síntesis, ideación, arquitectura de información, UX writing, prototipado, frontend, documentación, testing, diseño de design systems.
Nunca: lista muerta de herramientas (→ `toolkit`); prompts concretos (→ `prompts`).
Personas: head-of-design, ceo, founder, dev. Relaciones: `toolkit`, `workflows`, `prompts`.
> Nota: por volumen, `ai.md` probablemente se parta en secciones (una por disciplina) y cada `##` sea un chunk propio. Es sano.

### 5.4 Evidencia

**`projects/<slug>.md`** — Un caso, desacoplado. Plantilla común obligatoria:
`Contexto → Problema → Objetivo de negocio → Usuarios → Investigación → Insights → Hipótesis → Estrategia → Diseño → Validación → Iteraciones → Resultado → Impacto → Aprendizajes`.
Cada caso responde: por qué existía, por qué importaba, qué pasaba antes, qué cambió después (con `metrics_refs`).
Nunca: repetir el número (lo referencia por id desde `metrics`).
Personas: según el caso (`personas` en frontmatter). Relaciones: `metrics`, `workflows`, `principles`.

**`metrics.md`** — Todas las cifras, una sola vez.
Incluye: cada métrica con `id`, valor antes/después, contexto, fuente, cómo se midió, grado de confianza.
Nunca: narrativa (→ `projects/`).
Personas: ceo, cro, pm, recruiter. Relaciones: `projects/*`, `experience`.

### 5.5 Recuperación y desambiguación

**`faq.md`** — Preguntas frecuentes, respondidas.
Incluye: inglés, disponibilidad, remoto/relocation, autorización de trabajo, expectativas, "por qué dejas ILUNION", modalidad. Cada Q/A es su propio chunk.
Nunca: casos largos (→ `projects/`).
Personas: recruiter sobre todo. Relaciones: `profile`, `career`.

**`glossary.md`** — Puente semántico.
Incluye: términos y sinónimos (CRO = conversion rate optimization = optimización de conversión; "sistema de diseño" = design system). Mejora el recall conectando el vocabulario del visitante con el tuyo.
Nunca: contenido narrativo. Personas: sistema (mejora retrieval de todos). Relaciones: transversal.

---

## 6. `system/_manifest.md` — el mapa de routing

Un índice legible por humanos y por máquina que lista cada doc con `id`, `type`, `summary`, `personas`, `tags`, `related`. Sirve para:
- **Routing pre-retrieval:** un agente elige qué docs mirar primero por persona/tags antes de la búsqueda vectorial.
- **Grafo de relaciones:** permite expandir respuestas ("¿quieres ver el caso relacionado?").
- **Exportación:** se convierte en `manifest.json` para el MCP server o el GPT sin reescribir nada.

---

## 7. Agentes especializados (`system/agents.md`)

Dos tipos de agentes, y conviene distinguirlos:

- **Agentes de persona** (quién pregunta): Recruiter, Head of Design, CEO, Founder, Product Manager, Design Manager, UX, Developer.
- **Agentes de dominio** (sobre qué): CRO, UX Research, Frontend, Accessibility, AI, Storytelling.

Un turno puede combinar los dos: un CEO preguntando por conversión → **CEO Agent (persona) + CRO Agent (dominio)**. El de persona fija el *tono y el orden de relevancia*; el de dominio fija *qué docs son autoritativos*.

Cada agente declara: **consulta primero · nunca consulta · prioriza · tono · cuándo pregunta / resume / profundiza.**

| Agente | Consulta primero | Nunca consulta | Tono | Comportamiento |
|---|---|---|---|---|
| **Recruiter** | `profile`, `faq`, `experience`, `skills` | `principles`, `ai` largo | Claro, directo, filtrable | Resume por defecto; profundiza solo si pide |
| **Head of Design** | `principles`, `workflows`, `projects`, `career` | `faq` logístico | Reflexivo, de par a par | Profundiza; pregunta por el contexto de evaluación |
| **CEO** | `metrics`, `projects`(impacto), `career` | detalles de oficio UX | Directo, negocio primero | Resume impacto; ofrece el caso como prueba |
| **Founder** | `projects`, `ai`, `collaboration`, `career` | premios formales | Enérgico, pragmático | Profundiza en ownership y 0→1 |
| **Product Manager** | `projects`, `metrics`, `workflows` | `styles` | Analítico, colaborativo | Pregunta por trade-offs; profundiza en priorización |
| **Design Manager** | `collaboration`, `workflows`, `principles` | `metrics` financieros | Cercano, operativo | Pregunta por encaje de equipo |
| **UX** | `projects`, `workflows`, `principles`, `toolkit` | `metrics` de negocio | De colega a colega | Profundiza en método |
| **Developer** | `toolkit`, `ai`, `collaboration` | `career`, `achievements` | Técnico, concreto | Resume handoff; profundiza en viabilidad |
| **CRO (dominio)** | `metrics`, `projects/cro`, `principles` | `achievements` | Basado en evidencia | Cita cifras con su fuente y confianza |
| **UX Research (dominio)** | `workflows`, `projects`, `ai`(research) | `toolkit` de dev | Metódico | Explica cómo se obtuvo el insight |
| **Frontend (dominio)** | `toolkit`, `styles`, `ai`(frontend) | `metrics` | Técnico | Habla de implementación y tokens |
| **Accessibility (dominio)** | `principles`, `styles`, `projects` | `faq` salario | Riguroso, con propósito | Conecta con tu valor de inclusión |
| **AI (dominio)** | `ai`, `prompts`, `toolkit` | `achievements` | Curioso, actual | Demuestra colaboración real con IA |
| **Storytelling (dominio)** | `projects`, `career`, `metrics` | config de sistema | Narrativo, Stripe/Linear | Construye la historia, no la lista |

**Regla común de los agentes de dominio:** aportan autoridad sobre su tema pero heredan el tono del agente de persona activo. No hablan "por su cuenta".

---

## 8. Sistema conversacional: cinco detecciones

No es un chatbot. Es un sistema que, en cada turno, detecta cinco cosas y adapta la respuesta:

1. **Intención** — ¿qué quiere saber realmente? (evaluar fit, medir seniority, ver impacto, validar oficio…). → elige agente de dominio.
2. **Contexto** — ¿desde dónde pregunta? (persona explícita por chip, o inferida por vocabulario). → elige agente de persona.
3. **Profundidad** — ¿quiere el titular o el detalle? (una pregunta corta pide resumen; "cuéntame cómo" pide profundizar). → decide resumir vs. profundizar.
4. **Tipo de visitante** — recruiter vs. Head vs. CEO… → fija orden de relevancia.
5. **Incertidumbre** — ¿el retrieval trajo algo por encima de umbral? Si no, **no inventa**: reconoce el gap y ofrece contacto o reformular.

El resultado de estas cinco señales define: qué docs se recuperan, en qué orden se presenta la info, cuánto se extiende, qué siguiente pregunta se sugiere, y si toca decir "esto mejor lo hablas con Marta".

---

## 9. Visión multi-interfaz (por qué esto escala)

La misma base `knowledge/` + `system/manifest.json` alimentará, sin reescribir contenido:

- **la web** (portfolio conversacional),
- un **MCP server** (recruiters/herramientas consultan tu conocimiento como tool),
- un **GPT/Claude/Gemini personalizado** (te "clona" para responder 24/7),
- un **agente de entrevistas** (te prepara o responde en screening),
- **futuras apps** que aún no existen.

Cada interfaz es un *cliente* de la misma base. Por eso separamos knowledge / orchestration / presentation: cambiar la web no toca el conocimiento; añadir un MCP server no duplica nada.

---

## 10. Decisiones para validar (antes de crear contenido)

1. **¿Apruebas la separación en tres carpetas** `knowledge/` · `system/` · `presentation/`, sacando `agents`, `prompts` y `styles` del índice de embeddings?
2. **¿Estrategia bilingüe = archivos paralelos** `.es.md` / `.en.md` con mismo `id` (ES como fuente de verdad, EN cuando el doc esté `ready`)?
3. **¿Apruebas el contrato de metadatos de §3** como esqueleto obligatorio de cada doc?
4. **¿Confirmas los slugs de proyectos** (`ilunion-booking-engine`, `cro`, `design-system`, `oracle`, `paolo`) o alguno cambia/desaparece?

Cuando valides esto, el primer artefacto que produzco es `system/_schema.md` + `system/_manifest.md` (el andamiaje), y luego el **caso oro** completo siguiendo la plantilla, para fijar el patrón. A partir de ahí, replicar es rápido.
