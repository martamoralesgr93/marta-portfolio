# _manifest.es.md — Mapa de routing de la base de conocimiento

> Documento de sistema. **No se indexa.**
> Inventario único: `id`, `type`, `summary`, `personas`, `status`, `related`.
> Uso: (1) routing pre-retrieval por persona/tags/answers, (2) grafo de relaciones, (3) exportable a `manifest.json` para MCP server / GPT.
> v2 (post-auditoría RAG): nombres `.es.md`, tipos diferenciados, docs `reflections`/`testimonials` añadidos.

---

## knowledge/ — indexable (`.es.md` fuente de verdad; `.en.md` al pasar a `ready`)

| id | archivo | type | personas | status | related |
|---|---|---|---|---|---|
| `profile` | profile.es.md | profile | todas | **redactado + answers** | experience, career, skills, business |
| `exp-ilunion` | experience.es.md | experience | recruiter, head-of-design, ceo, pm | **ready** (trayectoria completa; fechas → pending_validation) | profile, career, skills, toolkit, projects/*, metrics |
| `career` | career.es.md | career | head-of-design, founder, ceo, recruiter | **ready** (arco Audiovisual→PD) | profile, experience, business-thinking, skills, reflections |
| `achievements` | achievements.es.md | achievements | recruiter, head-of-design | **ready** (Neoland + Audiovisual; años → pending_validation) | projects/*, experience |
| `skills` | skills.es.md | skills | recruiter, head-of-design, ux, pm | redactado | toolkit, workflows, design-principles, projects/* |
| `toolkit` | toolkit.es.md | toolkit | dev, recruiter, ux, pm | redactado | skills, ai, workflows, collaboration |
| `design-principles` | design-principles.es.md | **principles** | head-of-design, design-manager, ux, ceo | redactado | decision-frameworks, business-thinking, workflows |
| `decision-frameworks` | decision-frameworks.es.md | **decision-making** | head-of-design, design-manager, pm, ceo | redactado | design-principles, business-thinking, workflows |
| `business-thinking` | business-thinking.es.md | **business** | ceo, founder, cro, pm, head-of-design | redactado | decision-frameworks, design-principles, metrics, proj-cro |
| `workflows` | workflows.es.md | **process** | head-of-design, pm, ux, design-manager | redactado | design-principles, decision-frameworks, ai, collaboration |
| `collaboration` | collaboration.es.md | collaboration | design-manager, pm, dev, ceo | redactado | workflows, toolkit, business-thinking |
| `ai` | ai.es.md | ai | head-of-design, ceo, founder, dev | redactado | toolkit, workflows, prompts, decision-frameworks |
| `metrics` | metrics.es.md | metrics | ceo, cro, pm, recruiter | **ready** (cuant. + cual.; conversión 3,36%→6,5%) | projects/*, experience |
| `faq` | faq.es.md | faq | todas | **redactado + answers** | profile, experience, career, skills, workflows, decision-frameworks, business-thinking, ai, collaboration |
| `glossary` | glossary.es.md | glossary | sistema (transversal) | redactado | faq, skills, toolkit |
| `reflections` | reflections.es.md | **reflections** | head-of-design, ceo, founder, design-manager | **ready** (sintetizado; opcional anclar un episodio) | career, projects/*, decision-frameworks, collaboration |
| `testimonials` | testimonials.es.md | **testimonials** | recruiter, head-of-design, ceo | **estructura (P0-2, pendiente contenido)** | profile, experience, collaboration |

## knowledge/projects/ — un caso por documento (plantilla 20 secciones idéntica)

| id | archivo | personas | status | metrics_refs | rol narrativo |
|---|---|---|---|---|---|
| `proj-ilunion-booking` | projects/ilunion-booking-engine.es.md | ceo, head-of-design, pm, cro, recruiter | **redactado (impacto cuantificado)** | m-ilunion-directchannel-conversion-01 … -05 | **Caso oro** — quién soy hoy |
| `proj-cro` | projects/cro.es.md | ceo, cro, pm | **redactado (impacto cualitativo + conversión)** | m-cro-01…05, m-ilunion-directchannel-conversion-01 | Optimización continua sobre producto vivo |
| `proj-cef-design-system` | projects/cef-design-system.es.md | head-of-design, dev, ux | redactado (impacto cual.; faltan detalles) | m-cef-01…04 | CEF DS — pensar en sistemas |
| `proj-oracle` | projects/oracle-it-operations.es.md | ux, pm, head-of-design | redactado (impacto cual.; faltan detalles) | m-oracle-01…03 | B2B complejo (formación) |
| `proj-paolo` | projects/paolo-pizzeria.es.md | recruiter, ux | redactado (faltan detalles) | — | Bootcamp — muestra evolución |

> Deslinde caso oro ↔ proj-cro (P1-5): `proj-ilunion-booking` = el producto de reserva en su conjunto (end-to-end); `proj-cro` = la disciplina de optimización continua transversal al ecosistema. No se solapan.

## system/ — orquestación (NO indexado)

| id | archivo | función | status |
|---|---|---|---|
| `schema` | system/_schema.es.md | contrato de metadatos v2 | redactado |
| `manifest` | system/_manifest.es.md | este documento | redactado |
| `agents` | system/agents.es.md | motor de recuperación por intención (5 agentes ultraligeros) | **redactado** |
| `prompts` | system/prompts.es.md | contrato de comportamiento del sistema (agnóstico del dominio) | **redactado** |

## experience/ — NO indexado

| id | archivo | función | status |
|---|---|---|---|
| `styles` | experience/styles.es.md | Conversation Experience System (visual + comportamiento de interacción) | **redactado** |

---

## Tabla de propiedad de conceptos (normalización P1-3)

Cada concepto tiene un único dueño; el resto lo menciona en una frase + referencia. Detalle en `02-auditoria-rag.md`.

| Concepto | Dueño canónico |
|---|---|
| Datos sobre opinión | `design-principles` (#2) |
| Trade-off negocio/usuario/viabilidad | `decision-frameworks` |
| Priorización (7 señales) | `decision-frameworks` |
| CRO como disciplina | `business-thinking` |
| Pensamiento de sistemas | `design-principles` (#4) |
| IA como acelerador | `ai` |
| Método de investigación | `workflows` |
| Autonomía / única diseñadora en equipo backend | `profile` |
| Propuesta de valor | `profile` |

## Estado global

- **Redactados:** 16 docs de conocimiento + 5 proyectos + schema + manifest.
- **Estructura pendiente de contenido:** achievements, metrics (cifras), reflections, testimonials.
- **Pendiente de construir:** agents, prompts, styles.
- **Pendiente de Marta:** cifras (P0-1), fracaso/aprendizaje (reflections), liderazgo, testimonios reales, cierre de `[CONFIRMAR]`.
