# PROJECT_STATE.md — Documentación maestra del proyecto

> **Propósito:** este documento permite abrir un chat nuevo y continuar el proyecto sin perder nada. Es la fuente de verdad del *estado*, las *decisiones* y los *próximos pasos*. Léelo entero antes de tocar nada.
> **Última actualización:** 2026-07-14 · Fase completada: **Conocimiento (cerrada)** · Fase siguiente: **Implementación de la experiencia**.

---

## 1. Resumen ejecutivo

Marta Morales (Product Designer, Madrid) está transformando su portfolio en un **sistema de conocimiento consultable por IA**, no en una web tradicional. El portfolio deja de ser una página que se lee y pasa a ser una **base de conocimiento headless** que una capa conversacional (RAG) consulta para responder, según la intención de cada visitante, la única pregunta que importa: *"¿merece la pena entrevistar a Marta?"*.

La web será solo **una** de las interfaces. La misma base debe poder alimentar en el futuro un MCP Server, GPTs personalizados, Claude/Gemini, un agente de entrevistas y apps aún inexistentes.

**Estado:** la arquitectura completa (3 capas) y el contenido esencial están cerrados. La base es funcionalmente completa para responder sobre quién es Marta, cómo trabaja, cómo decide, cómo usa IA, qué impacto genera, cómo colabora y cuál es su propuesta de valor. **No se ha empezado la implementación de la interfaz.**

---

## 2. Objetivo del portfolio y KPI

- **Objetivo:** aumentar la probabilidad de que un recruiter, Head of Design, CEO o Hiring Manager quiera entrevistar a Marta. No mostrar todo el trabajo — **responder preguntas**.
- **KPI principal:** que cualquier visitante encuentre en **menos de 30 segundos** la respuesta que necesita para decidir si la entrevista.
- **Regla de los 6 segundos:** el hero debe comunicar de inmediato quién es, qué hace, qué impacto genera y por qué seguir explorando.
- **Posicionamiento:** Product Designer estratégica con foco en **negocio / CRO**, no diseñadora de interfaces. Objetivo: rol Mid/Senior en empresas **tech, SaaS o travel**. Ubicación: Madrid.

---

## 3. Filosofía del sistema

1. **El portfolio es una base de conocimiento, no una web.** La web es una interfaz sobre esa base.
2. **Diseñar para responder preguntas, no para mostrar información.**
3. **Reducir lo visible, no la información:** todo aparece bajo demanda (conversación, disclosure progresivo).
4. **La inteligencia vive en el conocimiento, no en los agentes.** Agentes y prompts son ultraligeros.
5. **Intención antes que perfil:** qué se recupera lo decide la intención; el perfil del visitante solo ajusta el tono.
6. **Nunca inventar.** Sin evidencia documental, se reconoce el límite. Una IA que no alucina sobre la propia carrera es, en sí, una prueba de criterio.

---

## 4. Arquitectura definitiva (3 capas)

| Capa | Carpeta | Responsabilidad | ¿Se indexa/embebe? |
|---|---|---|---|
| **Knowledge** | `knowledge-base/knowledge/` | Qué se sabe sobre Marta. Fuente de verdad. | **Sí** (RAG) |
| **System** | `knowledge-base/system/` | Cómo se razona y se comporta (schema, manifest, agentes, prompts). | **No** |
| **Experience** | `knowledge-base/experience/` | Cómo se interactúa (design system + comportamiento conversacional). | **No** |

Separación estricta: **Knowledge = qué se sabe · System = cómo se razona · Experience = cómo se interactúa.** Nunca se mezclan.

---

## 5. Árbol completo de carpetas y documentos

```
Marta Morales — Product Designer_files/
├── PROJECT_STATE.md                    ← este documento (maestro)
├── 00-arquitectura-portfolio-ia.md     ← estrategia (KPI, 6s, personas)
├── 01-arquitectura-conocimiento-rag.md ← arquitectura RAG / knowledge
├── 02-auditoria-rag.md                 ← auditoría crítica de arquitectura
├── 03-auditoria-calidad.md             ← auditoría de calidad (Head of PD)
│   (nota: pueden existir otros .md sueltos en la raíz de sesiones previas;
│    los 00–03 y PROJECT_STATE son los canónicos de esta línea de trabajo)
│
└── knowledge-base/
    ├── knowledge/          (INDEXABLE — .es fuente de verdad, .en pendiente)
    │   ├── profile.es.md
    │   ├── experience.es.md
    │   ├── career.es.md
    │   ├── skills.es.md
    │   ├── toolkit.es.md
    │   ├── design-principles.es.md
    │   ├── decision-frameworks.es.md
    │   ├── business-thinking.es.md
    │   ├── workflows.es.md
    │   ├── collaboration.es.md
    │   ├── ai.es.md
    │   ├── metrics.es.md
    │   ├── faq.es.md
    │   ├── glossary.es.md
    │   ├── achievements.es.md
    │   ├── reflections.es.md
    │   ├── testimonials.es.md
    │   └── projects/
    │       ├── ilunion-booking-engine.es.md   ← CASO ORO
    │       ├── cro.es.md
    │       ├── cef-design-system.es.md
    │       ├── oracle-it-operations.es.md
    │       └── paolo-pizzeria.es.md
    ├── system/             (ORQUESTACIÓN — no indexado)
    │   ├── _schema.es.md
    │   ├── _manifest.es.md
    │   ├── agents.es.md
    │   └── prompts.es.md
    └── experience/         (EXPERIENCIA — no indexado)
        └── styles.es.md
```

---

## 6. Estado de cada documento

Leyenda: **status frontmatter** (draft/ready) · el `_manifest.es.md` es el índice vivo del estado.
Matiz importante: muchos docs marcados `draft` en frontmatter están **redactados y funcionalmente completos**; solo falta promover su `status` a `ready` y crear la versión `.en`. Los marcados `ready` están verificados.

**Knowledge — identidad/trayectoria:**
- `profile` — redactado, completo (frontmatter draft) · canonical · con `answers`.
- `experience` — **ready** · canonical · fechas en `pending_validation`.
- `career` — **ready** · canonical · arco Audiovisual→PD.
- `skills` — redactado, completo (draft) · niveles derivados de evidencia.
- `toolkit` — redactado, completo (draft) · niveles estimados.
- `achievements` — **ready** · Neoland + Audiovisual; años en `pending_validation`.

**Knowledge — razonamiento (diferenciador):**
- `design-principles` (type principles) — redactado (draft).
- `decision-frameworks` (type decision-making) — redactado (draft).
- `business-thinking` (type business) — redactado (draft).
- `workflows` (type process) — redactado (draft).
- `collaboration` — redactado (draft).
- `ai` — redactado (draft) · reparto real de herramientas.

**Knowledge — evidencia:**
- `metrics` — **ready** · canonical · cuantitativas + cualitativas.
- `reflections` — redactado por síntesis (draft; manifest lo marca ready) · opcional anclar un fracaso concreto.
- `projects/ilunion-booking-engine` — **CASO ORO**, redactado, impacto cuantificado (draft).
- `projects/cro` — redactado, impacto cualitativo + conversión (draft).
- `projects/cef-design-system` — esenciales, complementario (draft).
- `projects/oracle-it-operations` — esenciales, complementario (draft).
- `projects/paolo-pizzeria` — esenciales, evidencia de evolución (draft).

**Knowledge — recuperación:**
- `faq` — redactado, con `answers` (draft; canonical:false, es doc de recuperación).
- `glossary` — redactado (draft) · desambigua "IA" (info) vs "IA" (inteligencia artificial).
- `testimonials` — **vacío por diseño** · esperando citas reales · NO inventar.

**System (no indexado):** `_schema` (v2), `_manifest` (índice + tabla de conceptos), `agents` (motor de recuperación por intención), `prompts` (contrato de comportamiento agnóstico). Todos redactados.

**Experience (no indexado):** `styles` (Conversation Experience System). Redactado.

> ⚠️ **Inconsistencia menor conocida:** el `status:` del frontmatter va por detrás del estado real de varios docs (siguen en `draft` pese a estar completos). Tarea de limpieza: promover a `ready` los docs verificados y alinear con el manifest.

---

## 7. Convenciones (RAG y metadatos)

**Contrato de frontmatter obligatorio** (definido en `system/_schema.es.md`):
```yaml
id · title · type · layer · lang · summary · personas · tags ·
answers · related · metrics_refs · canonical · status · visibility · last_updated
```
Campo opcional añadido en consolidación: `pending_validation` (lista de datos administrativos por validar — fechas, denominaciones — que NO son huecos de contenido).

- **`id`:** slug único y estable, nunca cambia. Convenciones: `profile`, `exp-<empresa>`, `proj-<slug>`, `m-<tema>-NN`, etc.
- **`type` (v2, diferenciado):** profile · experience · career · achievements · skills · toolkit · **principles** (design-principles) · **decision-making** (decision-frameworks) · **business** (business-thinking) · **process** (workflows) · collaboration · ai · project · metrics · faq · glossary · reflections · testimonials. (Sistema/experiencia, no indexados: agent, prompt, manifest, schema, styles.)
- **`layer`:** knowledge | orchestration | experience.
- **`personas`:** persona (recruiter, head-of-design, ceo, founder, pm, design-manager, ux, dev) + dominio (cro, ux-research, frontend, accessibility, ai, storytelling). Filtrado pre-retrieval; NO excluyente.
- **`answers`:** preguntas canónicas que responde el doc (señal de recuperación más fuerte). Obligatorio al pasar a `ready`. Ya poblado en `profile`, `faq`, `metrics`, `reflections`, `achievements`, `career`, `experience`.
- **`related`:** ids de documentos conectados (construye el grafo; sin bordes muertos).
- **`metrics_refs`:** ids de `metrics` que el doc cita. **Un dato, un dueño:** las cifras solo viven en `metrics.es.md`; el resto las referencia por id.
- **`canonical`:** true = fuente de verdad del tema. `faq` es canonical:false (recuperación).
- **`visibility`:** public | gated. `gated` = no se revela literal (p. ej. expectativas económicas → conversación directa).
- **Chunking:** 1 encabezado `##` = 1 unidad recuperable autocontenida. Docs < ~300–400 líneas.
- **Bilingüe:** `nombre.es.md` = fuente de verdad; `nombre.en.md` se crea al pasar a `ready`. Nunca mezclar idiomas en un chunk. Índices/filtrado por `lang`.
- **Propiedad de concepto:** cada concepto tiene un único dueño canónico (tabla en `_manifest.es.md`); el resto lo menciona en una frase + referencia. Evita duplicación semántica.

---

## 8. Decisiones arquitectónicas importantes (y por qué)

1. **Base de conocimiento headless, no web** — para servir a múltiples interfaces (web, MCP, GPTs) sin duplicar contenido.
2. **3 capas separadas** (knowledge/system/experience) — evita que config o estilos contaminen la recuperación; permite cambiar una capa sin tocar las otras.
3. **8+ archivos especializados en vez de un `portfolio.md` gigante** — alta cohesión, bajo acoplamiento, mejor recuperación por embeddings.
4. **Métricas centralizadas con id + `metrics_refs`** — un dato un dueño; evita cifras inconsistentes.
5. **Tipos `type` diferenciados** (principles/decision-making/business/process) — el filtrado por tipo discrimina de verdad (auditoría RAG P1-4).
6. **Campo `answers`** — convierte la recuperación conversacional en casi determinista (P2-7).
7. **Motor por intención, no agentes por persona** — un recruiter y un CEO con la misma intención recuperan lo mismo; el perfil solo cambia el tono.
8. **Enrutamiento por metadatos, no por nombres de documento** — escala a 100s de docs / 300 proyectos sin tocar agentes.
9. **`prompts.es.md` agnóstico del dominio** — si se cambia `knowledge/` por otra persona, sigue funcionando sin editar una línea.
10. **Capa renombrada `presentation` → `experience`** — su responsabilidad real es toda la interacción con el conocimiento, no solo lo visual.
11. **Métrica ancla con atribución honesta** — "contribuí a llevar la conversión… dentro de un esfuerzo de equipo", no "yo dupliqué la conversión" (credibilidad).

---

## 9. Principios que NUNCA deben romperse

1. **La inteligencia vive en `knowledge/`.** Si un agente necesitara "saber" algo sobre Marta, falta un documento, no un agente. La solución siempre es enriquecer la base, nunca engordar el agente/prompt.
2. **Nunca inventar.** Sin evidencia, reconocer el límite. Nunca cifras aproximadas ni testimonios ficticios.
3. **Separación estricta de las 3 capas.** No filtrar conocimiento a `system/` ni a `experience/`.
4. **Un dato, un dueño / un concepto, un dueño.** Sin duplicación; el resto referencia.
5. **Intención antes que perfil.**
6. **Enrutar por metadatos, no por nombres de documento.**
7. **`prompts.es.md` permanece agnóstico del dominio.**

---

## 10. Estado de consolidación del contenido

- **Completamente validado (fuente de verdad, hechos confirmados por Marta):**
  - Posicionamiento (PD negocio/CRO, Madrid, tech/SaaS/travel).
  - Contexto ILUNION: única PD en equipo backend de Negocio Digital; canal de venta directa; usuarios 35–65 (familias/parejas/ocio); WCAG 2.1 AA.
  - **Métrica ancla: conversión del canal directo ~3,36% → ~6,5%** (`m-ilunion-directchannel-conversion-01`).
  - Arco de carrera: Comunicación Audiovisual → Marketing Digital → Frontend → Diseño de Negocio Digital → Product Design.
  - Formación: bootcamp UX/UI & Product Design en **Neoland** + universidad de Comunicación Audiovisual.
  - Uso real de IA (ChatGPT principal, Claude, Gemini, Copilot) y herramientas (Adobe Analytics, Clarity, Hotjar, Figma, AEM, Roiback, GitHub, Vercel, Power BI).
  - Impacto cualitativo de todos los proyectos.
- **Sintetizado desde lo documentado (fiel, revisable):** reflections, niveles de skills/toolkit, principios, workflows, decision-frameworks, business-thinking, collaboration.

---

## 11. Pendiente de validación (NO bloqueante)

Solo datos que únicamente Marta puede aportar (marcados en `pending_validation` o como cualitativo):
- Fechas exactas de cada etapa profesional y transición.
- Nombres exactos de empresas de marketing/frontend; naturaleza del encargo CEF (interno/freelance/proyecto).
- Denominación y año exactos del título universitario y del bootcamp; certificaciones.
- Cifras finas cualitativas: nº de componentes del DS de CEF, % de ahorro de diseño, periodo de la métrica de conversión.
- Detalles específicos de research/insights de CEF/Oracle/Paolo (baja prioridad; son complementarios).
- **Testimonios reales** (1–2 citas/referencias) — mayor retorno pendiente.
- **Ángulo de liderazgo/influencia como IC** — para reforzar encaje Senior.

---

## 12. Riesgos conocidos

1. **Prueba social ausente** (`testimonials` vacío) — el punto más débil para un Head. Mitigación: conseguir 2 citas reales.
2. **Señal de seniority para "Senior"** — liderazgo/influencia poco nombrado. Mitigación: añadir ángulo IC en `collaboration`/`reflections`.
3. **Inconsistencia `status` frontmatter vs. estado real** — limpiar (promover a `ready`).
4. **Inconsistencia de voz** 1ª/3ª persona entre docs — definir convención en `styles` (voz de contenido vs. voz de asistente).
5. **Sin versiones `.en`** todavía — necesarias para el mercado internacional (bilingüe era decisión validada).
6. **La métrica ancla es un salto grande** — protegida ya con atribución honesta; mantener ese matiz siempre.
7. **Artefactos `.fuse_hidden`** pueden aparecer en `knowledge/` tras renombrados por shell; son temporales, ignorar/limpiar.

---

## 13. Próximos pasos recomendados

1. **Cerrar contenido de máximo retorno (material de Marta):** 2 testimonios + ángulo de liderazgo. Opcional: un fracaso concreto en `reflections`.
2. **Higiene de la base:** promover `status` a `ready` en los docs completos; alinear con el manifest.
3. **Generar índice de recuperación:** exportar `_manifest.es.md` → `manifest.json` (para RAG/MCP).
4. **Implementación de la experiencia** (ver orden abajo).
5. **Versiones `.en`** de los docs `ready`.

---

## 14. Orden recomendado para la implementación

1. **Definir stack** (recomendado: sitio estático + capa RAG; embeddings sobre `knowledge/**/*.es.md`; los docs `system/`/`experience/` NO se embeben).
2. **Pipeline de ingesta:** parsear frontmatter + chunking por `##`; guardar metadatos con cada chunk; construir `manifest.json`.
3. **Índice de embeddings** por `lang` (empezar `es`).
4. **Motor de recuperación** implementando el pipeline de 9 pasos de `agents.es.md` (Discovery→Retrieval→Evidence→Synthesis→Conversation).
5. **Cargar `prompts.es.md`** como contrato de comportamiento del LLM.
6. **UI conversacional** siguiendo `experience/styles.es.md` (hero de 6s, chips de intención, patrones de conversación, disclosure progresivo, recommendation engine).
7. **Instrumentar el KPI de 30s** y las intenciones más frecuentes.
8. **(Futuro)** MCP Server y GPTs como clientes de la misma base.

---

## 15. Checklist de implementación

- [ ] Stack elegido y repos inicializados.
- [ ] Parser de frontmatter + chunking por encabezado.
- [ ] `manifest.json` generado desde `_manifest.es.md`.
- [ ] Índice de embeddings (es) sobre `knowledge/` (excluye system/experience).
- [ ] Detección de intención (17 intenciones de `agents.es.md`).
- [ ] Detección de visitante (chips explícitos + inferencia).
- [ ] Selección por `answers`/`type`/`tags`/`personas`/`related`.
- [ ] Resolución de conflictos (propiedad de concepto → metrics → canonical → ready/fecha → lang).
- [ ] Garantía de evidencia (sin soporte → reconocer límite; `gated` → derivar).
- [ ] Síntesis respetando propiedad de concepto.
- [ ] Adaptación de tono por visitante.
- [ ] Recommendation engine desde el grafo `related`.
- [ ] Hero de 6 s + input conversacional presente desde el inicio.
- [ ] Patrones de conversación y disclosure progresivo (`styles`).
- [ ] Accesibilidad AA (teclado, foco, contraste, `reduced-motion`).
- [ ] CTA de contacto siempre visible.

---

## 16. Checklist previo al despliegue

- [ ] Ningún `[PENDIENTE]`/`[CONFIRMAR]` visible en contenido servido.
- [ ] Testimonios reales incluidos (o sección omitida limpiamente).
- [ ] Cifras solo desde `metrics`; ninguna inventada; atribución honesta.
- [ ] `status: ready` en todos los docs servidos; `.en` si aplica.
- [ ] La IA reconoce límites en gaps conocidos (liderazgo, fracaso) sin improvisar.
- [ ] `gated` no se revela literalmente.
- [ ] Prueba de las 5 preguntas clave (<30 s): quién eres, cómo trabajas, cómo decides, cómo usas IA, qué impacto generas.
- [ ] Prueba de agnosticismo: `prompts.es.md` no contiene datos de Marta.
- [ ] Rendimiento móvil y a11y verificados.

---

## 17. Criterios de aceptación (proyecto terminado)

1. Un visitante encuentra en **<30 s** la respuesta para decidir si entrevistar a Marta.
2. El hero comunica en **6 s** quién es, qué hace, qué impacto genera y por qué seguir.
3. La IA responde por **intención** y adapta el tono al visitante, **sin inventar nunca**.
4. Toda afirmación importante está respaldada por un documento; los gaps se reconocen.
5. La misma base puede servir a otra interfaz (MCP/GPT) sin reescribir conocimiento.
6. Accesibilidad AA cumplida.
7. Un recruiter/Head sale con la sensación de "quiero entrevistarla".

---

## 18. Prompt de continuación para un nuevo chat

> Copia esto como primer mensaje del chat nuevo, junto con `PROJECT_STATE.md` como contexto:

```
Estoy construyendo mi portfolio como una base de conocimiento consultable por IA (RAG),
no como una web tradicional. La fase de conocimiento está CERRADA. Adjunto PROJECT_STATE.md,
que contiene toda la arquitectura, decisiones, convenciones y estado.

Lee PROJECT_STATE.md entero antes de actuar. Respeta SIEMPRE los principios inviolables de su
sección 9 (la inteligencia vive en knowledge/; nunca inventar; 3 capas separadas; un dato/concepto
un dueño; intención antes que perfil; enrutar por metadatos; prompts agnóstico del dominio).

La base vive en knowledge-base/ con 3 capas: knowledge/ (indexable), system/ (schema, manifest,
agents, prompts — no indexado) y experience/ (styles — no indexado). Todo en archivos .es.md.

Quiero empezar la IMPLEMENTACIÓN DE LA EXPERIENCIA siguiendo el orden de la sección 14 y los
checklists (15–16). No amplíes la arquitectura ni el contenido salvo que lo pida. Antes de escribir
código, propón el stack y el plan de implementación para que lo valide.

Contexto clave: Product Designer (Madrid) foco negocio/CRO; única PD en equipo backend de ILUNION
Hotels; caso oro = ILUNION Booking Engine (conversión ~3,36%→~6,5%, atribución de equipo); objetivo
Mid/Senior en tech/SaaS/travel; bilingüe ES/EN (ES es fuente de verdad, EN pendiente).
Pendiente de Marta (no bloqueante): testimonios reales y ángulo de liderazgo.
```

---

> **Fin del documento maestro.** Con esto, la conversación actual puede cerrarse y la implementación puede continuar en un chat nuevo sin pérdida de contexto.
