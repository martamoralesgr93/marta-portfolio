# _schema.es.md — Contrato de metadatos de la base de conocimiento

> Documento de sistema. **No se indexa** (layer: orchestration).
> Define el frontmatter obligatorio de cada documento indexable de `knowledge/`.
> Regla de oro: si un documento no cumple este contrato, no entra en el índice.
> v2 (post-auditoría RAG): tipos diferenciados, campo `answers`, convención `.es.md` instanciada.

---

## 1. Frontmatter obligatorio

```yaml
---
id:            # slug único y estable. NUNCA cambia.
title:         # título semántico y específico.
type:          # ver enum §2
layer:         # knowledge | orchestration | experience
lang:          # es | en
summary:       # 1 línea. Lo que el router lee para decidir recuperar.
personas:      # lista. Para quién es más relevante (enum §3).
tags:          # lista. Vocabulario de recuperación (apoyado en glossary).
answers:       # lista de preguntas canónicas que responde el doc (ver §4). Obligatorio al pasar a `ready`.
related:       # lista de ids de documentos conectados.
metrics_refs:  # lista de ids de metrics que cita (o []).
canonical:     # true | false.
status:        # draft | ready
visibility:    # public | gated
last_updated:  # YYYY-MM-DD
---
```

## 2. Enum de `type` (v2 — diferenciado)

Cada tipo tiene una única responsabilidad, para que el pre-filtrado por `type` discrimine de verdad:

`profile` · `experience` · `career` · `achievements` · `skills` · `toolkit` · `principles` (design-principles) · `decision-making` (decision-frameworks) · `business` (business-thinking) · `process` (workflows) · `collaboration` · `ai` · `project` · `metrics` · `faq` · `glossary` · `reflections` · `testimonials`

(Tipos de sistema/experiencia fuera de `knowledge/` y no indexados: `agent`, `prompt`, `manifest`, `schema`, `styles`.)

## 3. Enum de `personas`

Persona (quién pregunta): `recruiter` · `head-of-design` · `ceo` · `founder` · `pm` · `design-manager` · `ux` · `dev`
Dominio (sobre qué): `cro` · `ux-research` · `frontend` · `accessibility` · `ai` · `storytelling`

## 4. El campo `answers` (mejora de recuperación P2-7)

Lista de las preguntas reales, en el lenguaje del visitante, que el documento responde. Convierte la recuperación conversacional en casi determinista: cuando alguien pregunta algo parecido, el doc correcto sale primero.

```yaml
answers:
  - "¿Cómo prioriza Marta?"
  - "¿Sigue algún framework de priorización?"
```

Regla: se completa **cuando el documento pasa a `status: ready`** (no antes: un doc en borrador aún no tiene respuestas definitivas). Los documentos hub de recuperación (`profile`, `faq`) lo llevan desde ya.

## 5. Reglas de calidad

1. **Responsabilidad única.** Un documento, una familia de preguntas.
2. **Chunk = encabezado.** Cada `##` se entiende por sí solo.
3. **Tamaño.** < 300–400 líneas. Vigilar `ai` (candidato a dividir por disciplina si crece).
4. **Un dato, un dueño.** Cifras solo en `metrics`, citadas por `id`.
5. **Un concepto, un dueño.** Fuera de su documento canónico, un concepto se menciona en una frase + referencia (ver tabla de propiedad de conceptos en `02-auditoria-rag.md`).
6. **`summary` y `answers` orientados a la pregunta.**
7. **`related` construye el grafo.** Sin bordes muertos: si un `id` cambia, se actualizan las referencias.
8. **Bilingüe.** `id` raíz compartido; `nombre.es.md` es fuente de verdad, `nombre.en.md` al pasar a `ready`. Nunca mezclar idiomas en un chunk.
9. **`visibility: gated`** para lo no revelable literalmente (tarifas, datos sensibles).

## 6. Convención de nombres (v2 — instanciada)

- **Todos** los documentos llevan sufijo de idioma: `profile.es.md`, `faq.es.md`, `projects/cro.es.md`. También los de sistema: `_schema.es.md`, `_manifest.es.md`.
- Referencias en el cuerpo: apuntan al fichero de su idioma (`` `workflows.es.md` ``). Las versiones `.en` referenciarán `.en`.
- `id` por tipo: `profile`, `exp-<empresa>`, `proj-<slug>`, `m-<tema>-NN`, `principle-<nombre>`, `wf-<fase>`, `faq-<tema>`, `glo-<termino>`.

## 7. Estados

- `draft`: en construcción. No se sirve.
- `ready`: verificado y verificable. Solo entonces se completa `answers` y se crea la versión `.en`.
