---
title: "Auditoría crítica de la base de conocimiento (RAG en producción)"
autor: "Marta Morales — Product Designer"
fase: "1c · Auditoría adversarial previa a la capa conversacional"
fecha: 2026-07-14
mandato: "Romper la arquitectura, no validarla. Horizonte de mantenimiento: 5 años."
---

# Auditoría crítica RAG

> Encargo: auditar como responsable técnico de un sistema RAG en producción a 5 años. Buscar activamente fallos, aunque impliquen rehacer estructura. Lo que sigue **no valida**: ataca.

Veredicto de una línea: **la arquitectura es sólida en separación de capas y normalización, pero tiene siete problemas reales que, sin corregir, degradarán la recuperación o dejarán preguntas críticas sin respuesta.** Los ordeno por severidad.

---

## Hallazgos (por severidad)

### 🔴 P0-1 · El valor central del sistema hoy es incontestable: no hay impacto cuantificado
`metrics.md` existe, pero **todos sus valores son `[PENDIENTE]`**. Eso significa que la pregunta que más importa a un CEO o un recruiter —*"¿qué impacto ha generado?"*— hoy **no tiene respuesta**. Peor: es la pregunta que la arquitectura entera promete responder.
- **Riesgo:** un agente que recupera `metrics.md` devuelve placeholders o, si no está bien contenido, improvisa. Cualquiera de las dos mata la credibilidad.
- **Acción:** hasta que haya al menos 2–3 cifras defendibles, la interfaz y los agentes deben tratar impacto como *"documentado cualitativamente, cifras bajo verificación"* — nunca inventar. Esto es contenido, no arquitectura, pero es el P0 del proyecto.

### 🔴 P0-2 · Vacíos de cobertura: preguntas frecuentes sin fuente
Hay preguntas que un Head o un CEO hacen casi siempre y que **ningún documento cubre**. Detalle en la sección "Test de cobertura". Las tres más graves:
- **"¿Cuál ha sido tu mayor fracaso y qué aprendiste?"** — no existe en toda la base. Es una pregunta estándar de entrevista senior.
- **"¿Qué tipo de liderazgo ejerces?"** — no documentado (eres IC/única diseñadora; el liderazgo aquí es de influencia y ownership, pero no está escrito).
- **Prueba social (testimonios/referencias)** — no existe `testimonials.md`. Un recruiter busca validación externa.
- **Acción:** crear `reflections.md` (fracasos y aprendizajes), añadir sección de liderazgo/influencia en `career.md` o `collaboration.md`, y crear `testimonials.md`. Propuesta detallada abajo.

### 🟠 P1-3 · Solapamiento semántico entre los cuatro documentos "de pensamiento"
`design-principles`, `decision-frameworks`, `business-thinking` y `workflows` comparten conceptos: *datos sobre opinión*, *trade-off negocio/usuario/viabilidad*, *priorización por impacto*. El mismo concepto aparece parafraseado en 3–4 sitios.
- **Riesgo RAG:** una consulta "¿cómo decide Marta?" recupera chunks redundantes de los cuatro; el modelo no sabe cuál es canónico y la respuesta se vuelve repetitiva. Es exactamente la duplicación que querías evitar, pero a nivel de *concepto*, no de *dato*.
- **Acción:** definir una **tabla de propiedad de conceptos** (abajo): cada concepto tiene un dueño canónico; los demás lo mencionan en una línea y referencian. No hay que fusionar documentos —responden a personas distintas— pero sí desduplicar el contenido conceptual.

### 🟠 P1-4 · La taxonomía `type` está colapsada
Tres documentos distintos (`design-principles`, `decision-frameworks`, `business-thinking`) comparten `type: principles`. Filtrar por `type` no los distingue.
- **Riesgo:** se pierde una palanca de recuperación; el pre-filtrado por tipo no discrimina.
- **Acción:** ampliar el enum de `type`: `design-principles` → `principles`; `decision-frameworks` → `decision-making`; `business-thinking` → `business`; `workflows` → `process`. Tipos con una sola responsabilidad.

### 🟠 P1-5 · Colisión entre el caso oro y `proj-cro`
Ambos: ILUNION, canal directo, CRO, Adobe Analytics/Clarity, las mismas cuatro familias de hipótesis. Semánticamente son **casi vecinos**.
- **Riesgo:** los embeddings pueden tratarlos como duplicados; una consulta CRO puede traer los dos o el equivocado.
- **Acción:** afilar la diferenciación en `summary` y `tags`, y añadir en cada uno una línea explícita de deslinde ("este doc trata X; para Y ver el otro"). Ya iniciado; conviene reforzarlo. Alternativa a considerar: tratar `proj-cro` como *índice de iniciativas* que enlaza a mini-casos, si el volumen crece.

### 🟡 P2-6 · Deriva entre el schema y la realidad (bilingüe + refs)
- El schema exige `nombre.es.md` / `.en.md`; los archivos actuales son `nombre.md` sin sufijo de idioma. **La convención bilingüe aún no está instanciada.**
- Hay `related` obsoletos: tras renombrar `principles`→`design-principles`, algunos frontmatter todavía apuntan a `principles`. En un grafo RAG, una relación rota es un borde muerto.
- **Acción:** decidir ya si se adopta el sufijo `.es.md` (recomendado antes de crecer) y pasar un linter de consistencia de `related`/`id` (puedo generarlo).

### 🟡 P2-7 · Metadatos infrautilizados para preguntas de recruiter
El activo más potente para este caso de uso —**recuperar por la pregunta del visitante**— no está en los metadatos. Hoy `tags` lleva temas, pero no las *preguntas* que cada doc responde.
- **Acción (mejora de taxonomía):** añadir campo `answers:` con las preguntas canónicas que cada documento responde (p. ej. `faq` ya las tiene como headings; llevarlas a metadatos multiplica el recall en consultas conversacionales). Es la mejora de recuperación de mayor ROI.

---

## Tabla de propiedad de conceptos (desduplicación P1-3)

| Concepto | Dueño canónico | Los demás lo referencian |
|---|---|---|
| Datos sobre opinión | `design-principles` (#2) | workflows, business-thinking, decision-frameworks |
| Trade-off negocio/usuario/viabilidad | `decision-frameworks` | design-principles, business-thinking, proyectos |
| Priorización (7 señales) | `decision-frameworks` | workflows, faq, proyectos |
| CRO como disciplina | `business-thinking` | proj-cro, proj-ilunion-booking |
| Pensamiento de sistemas | `design-principles` (#4) | proj-cef-design-system, proj-ilunion-booking |
| IA como acelerador | `ai` | todos los proyectos, workflows |
| Método de investigación | `workflows` | proyectos |
| Autonomía / única diseñadora en equipo backend | `profile` | experience, career, collaboration, workflows |
| Propuesta de valor (negocio+técnica+oficio) | `profile` | career, faq |

Regla: fuera del dueño, un concepto se menciona en **una frase + referencia**, nunca se desarrolla.

---

## Test de cobertura (¿puede responderse sin inventar?)

| Pregunta | ¿Cubierta? | Dónde / Vacío |
|---|---|---|
| ¿Por qué debería contratar a Marta? | ✅ | `profile`, `faq` |
| ¿Cuál es su propuesta de valor? | ✅ | `profile` |
| ¿Qué impacto ha generado? | ⚠️ parcial | `metrics` (cifras PENDIENTES) — **P0-1** |
| ¿Cómo trabaja con desarrollo? | ✅ | `collaboration` |
| ¿Cómo toma decisiones? | ✅ | `decision-frameworks` |
| ¿Cómo prioriza? | ✅ | `decision-frameworks` |
| ¿Cómo usa la IA? | ✅ | `ai` |
| ¿Cómo mide el éxito? | ✅ | `workflows`, `design-principles` |
| ¿Qué conocimientos técnicos tiene realmente? | ⚠️ parcial | `toolkit`/`skills`/`collaboration` dispersos; nivel frontend `[CONFIRMAR]` |
| ¿Qué tipo de empresa busca / espera del rol? | ⚠️ parcial | `profile`/`faq` con `[CONFIRMAR]` |
| ¿Qué tipo de liderazgo ejerce? | ❌ | **vacío — P0-2** |
| ¿Cuál ha sido su mayor fracaso? ¿Qué aprendió? | ❌ | **vacío — P0-2** |
| ¿Qué dicen otros de ella? (referencias) | ❌ | **vacío — P0-2** |
| ¿Cómo es trabajar con ella? (estilo/personalidad) | ⚠️ parcial | algo en `collaboration`; sin doc propio |

---

## Documentos nuevos propuestos

1. **`reflections.md`** (`type: reflections`) — fracasos, decisiones que no salieron, qué aprendió, qué haría distinto (agrega las secciones "Qué haría diferente" de los proyectos + un fracaso real). Responde a la pregunta senior por excelencia. **Alta prioridad.**
2. **`testimonials.md`** (`type: testimonials`, muchas entradas `visibility: public` con permiso) — citas de compañeros/responsables. Prueba social. (Existe al menos un contacto que ofrece referencia — verificar con Marta.)
3. **`ways-of-working.md`** *(opcional)* — cómo es colaborar con ella en el día a día: ritmo, comunicación, gestión de feedback. Puede empezar como sección de `collaboration` y escindirse si crece.
4. **Sección "Liderazgo e influencia"** dentro de `career.md` o `collaboration.md` — liderazgo como IC: ownership, mentoría, influencia sin autoridad, evangelización del design system. Requiere input de Marta.

---

## Documentos: ¿fusionar, dividir, mantener?

- **Fusionar:** ninguno por ahora. Los cuatro de pensamiento responden a personas distintas; el problema es duplicación de concepto (resuelto con la tabla), no exceso de documentos.
- **Dividir:** `experience.md` contiene ILUNION + CEF + previos + formación bajo un solo `id: exp-ilunion`. El `id` miente (solo dice ILUNION) y mezcla responsabilidades. **Recomendado:** o renombrar `id` a `experience` y aceptarlo como índice, o dividir por empleador si el volumen crece. Por ahora, renombrar `id`. `ai.md` es candidato a dividir por disciplina si supera ~400 líneas (vigilar).
- **Mantener:** el resto. Tamaños correctos; ningún documento es hoy demasiado grande.

---

## Plan de corrección priorizado

**Antes de `agents.md`:**
- P1-4 (tipos), P1-3 (tabla de conceptos), P2-7 (`answers:` en metadatos), P2-6 (refs `related` obsoletas + decisión `.es.md`), P1-5 (deslinde oro/cro). Todo esto lo puedo aplicar yo sin contenido nuevo.
- Crear los esqueletos de `reflections.md` y `testimonials.md` (P0-2), con `[PENDIENTE — Marta]`.

**Requiere a Marta (contenido, no arquitectura):**
- Cifras en `metrics.md` (P0-1).
- Un fracaso real + aprendizaje (`reflections`).
- Postura de liderazgo/influencia.
- Testimonios reales / permiso de referencias.
- Cerrar los `[CONFIRMAR]` (nivel frontend, empresa objetivo, fechas).

**Por qué esto importa para los agentes:** pediste agentes ultraligeros que solo recuperan y sintetizan, con toda la inteligencia en la base. Eso **solo funciona si la base no tiene vacíos ni conceptos duplicados**: un agente sin conocimiento propio no puede tapar un hueco sin inventar. Cerrar estos siete puntos es lo que hace posible que los agentes sean tan tontos —y por tanto tan fiables— como quieres.
