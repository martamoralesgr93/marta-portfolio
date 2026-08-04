# agents.es.md — Motor de recuperación por intención

> Documento de sistema. **No se indexa** (layer: orchestration).
> `id: agents` · `type: agent` · `lang: es`
> **Principio arquitectónico inviolable:** la inteligencia vive en la base de conocimiento, no aquí. Los agentes solo deciden **qué recuperar, en qué orden, cómo sintetizarlo y cómo adaptarlo**. Ningún agente contiene conocimiento de negocio. Si mañana borras este archivo, los hechos sobre Marta siguen intactos en `knowledge/`.

---

## 0. Qué es esto (y qué no)

Esto **no** es una lista de agentes por persona. Es un **motor de recuperación** cuya unidad de decisión es la **intención**, no el perfil. Un recruiter y un CEO pueden hacer la misma pregunta con la misma intención ("evaluar impacto"); la intención decide *qué se recupera*, el perfil solo decide *cómo se dice*.

Los cinco agentes son una abstracción sobre ese motor. Cada uno es una etapa del pipeline con una única responsabilidad.

---

## 1. Taxonomía de intenciones (primero la intención)

La intención se detecta antes que nada. Cada intención tiene una **firma de enrutamiento**: los metadatos que la resuelven. **Las firmas apuntan a metadatos, no a nombres de documento** — por eso escalan: un documento nuevo con los `tags`/`type`/`answers` correctos entra en la ruta automáticamente, sin tocar este archivo.

| Intención | Señales (lenguaje del visitante) | Firma de enrutamiento (metadatos) | ¿Requiere evidencia dura? |
|---|---|---|---|
| Conocer experiencia | dónde ha trabajado, con qué productos | `type: experience,project` · tags: experience | media |
| Evaluar impacto | qué resultados, ROI, cifras | `type: metrics,project` · tags: impact,cro,conversion | **sí (métricas)** |
| Evaluar seniority | qué nivel, madurez | `type: decision-making,process,project` · answers: seniority | media |
| Evaluar capacidad estratégica | visión, negocio, producto | `type: business,decision-making` · tags: strategy,business | media |
| Evaluar liderazgo | liderazgo, influencia, mentoría | `type: reflections,collaboration,career` · tags: leadership | **gap conocido** |
| Evaluar autonomía | trabaja sola, ownership | `type: profile,process` · tags: autonomy | media |
| Evaluar colaboración | con dev, con PM, feedback | `type: collaboration` · tags: teamwork | media |
| Evaluar pensamiento de producto | cómo decide, prioriza, mide | `type: decision-making,process` | media |
| Evaluar habilidades técnicas | stack, frontend, código | `type: toolkit,skills,collaboration` · tags: frontend,technical | media |
| Evaluar conocimiento de IA | cómo usa IA, herramientas | `type: ai` · tags: ai,llm | media |
| Evaluar Design Systems | sistemas, tokens, componentes | `tags: design-system` · proj-cef-design-system | media |
| Evaluar CRO | conversión, funnel, experimentación | `type: business,metrics` · tags: cro,conversion · proj-cro | **sí (métricas)** |
| Evaluar Frontend | HTML/CSS/JS, viabilidad técnica | `tags: frontend` · type: toolkit,skills | media |
| Evaluar accesibilidad | a11y, WCAG, inclusión | `tags: accessibility` | media |
| Evaluar capacidad de aprendizaje | cómo aprende, evoluciona | `type: reflections,career` · tags: growth | **gap parcial** |
| Evaluar encaje cultural | valores, forma de trabajar | `type: profile,collaboration,reflections` · tags: culture | **gap parcial** |
| Preparar una entrevista | prepárame para hablar con ella | multi-intención → agrega faq + profile + proyectos relevantes | media |

> Nota: las intenciones marcadas como **gap** dependen de documentos aún en estructura (`reflections`, liderazgo). Hasta que tengan contenido, el motor debe reconocer el límite (ver §4), no improvisar.

---

## 2. Pipeline de decisión (9 pasos)

```
1. Detectar intención            → Discovery Agent
2. Detectar tipo de visitante    → Discovery Agent
3. Detectar nivel de profundidad → Discovery Agent
4. Seleccionar documentos        → Retrieval Agent   (vía answers, tags, related, personas, type)
5. Recuperar contexto            → Retrieval Agent
6. Resolver conflictos           → Retrieval Agent
7. Sintetizar                    → Synthesis Agent
8. Adaptar el tono               → Conversation Agent
9. Generar referencias a proyectos → Evidence Agent
```

El objeto que viaja por el pipeline (`query intent object`): `{ intención, visitante, profundidad, idioma, docs_candidatos[], evidencia[], claims_sin_soporte[] }`. Cada agente lee y enriquece este objeto; ninguno guarda estado propio.

---

## 3. Los cinco agentes (responsabilidad única)

### 3.1 Discovery Agent — *entender la pregunta*
- **Responsabilidad única:** clasificar la pregunta en `{intención, visitante, profundidad, idioma}`.
- **Intención:** por señales léxicas (§1). Ante ambigüedad, elige la intención dominante y marca alternativas.
- **Visitante:** explícito (chip "Soy recruiter/Head/CEO…") o inferido por vocabulario. Afecta solo al tono, nunca a qué se recupera.
- **Profundidad:** pregunta corta → resumen; "cuéntame cómo / en detalle" → profundizar.
- **Nunca:** recupera contenido ni responde. Solo etiqueta.

### 3.2 Retrieval Agent — *seleccionar y traer*
- **Responsabilidad única:** convertir la intención en un conjunto de chunks recuperados.
- **Selección (paso 4), en este orden de señal:**
  1. `answers` — coincidencia con la pregunta canónica (señal más fuerte).
  2. `type` + `tags` de la firma de intención.
  3. `personas` — filtro de relevancia (no de exclusión).
  4. `related` — expansión al grafo vecino si falta evidencia.
- **Consulta primero:** los documentos canónicos de la intención (según firma).
- **Consulta solo si faltan evidencias:** documentos `related`, casos de proyecto para aportar prueba, `glossary` para desambiguar vocabulario.
- **Nunca utiliza para responder:** documentos `layer: orchestration|experience` (este archivo, `prompts`, `styles`); ni un documento fuera de la firma de la intención solo porque comparta palabras.
- **Resolución de conflictos (paso 6):**
  1. **Propiedad de concepto** manda: el dueño canónico del concepto (tabla en `_manifest.es.md`) gana sobre cualquier mención.
  2. **Cifras solo desde `metrics`** (`metrics_refs`), nunca desde el texto de un proyecto.
  3. `canonical: true` gana sobre `false`.
  4. `status: ready` gana sobre `draft`; a igualdad, `last_updated` más reciente.
  5. Idioma: filtra por `lang` del visitante; no mezcla.
- **Evita duplicidades:** si dos chunks expresan el mismo concepto, conserva el del dueño canónico y descarta el resto.

### 3.3 Evidence Agent — *garantizar que nada se inventa*
- **Responsabilidad única:** que toda afirmación importante quede respaldada por un documento, y aportar la prueba.
- **Regla de evidencia (innegociable):** ninguna afirmación relevante sale sin un chunk que la soporte. Si no hay evidencia por encima del umbral, la afirmación **se elimina o se reconoce el límite** ("esto no está documentado; puedes preguntárselo a Marta"). Nunca se completa inventando.
- **Genera referencias (paso 9):** cuando un proyecto aporta prueba (p. ej. impacto → caso + `metrics`), adjunta la referencia como evidencia citable.
- **`visibility: gated`:** no revela el contenido literal; lo menciona y deriva a contacto directo.
- **Gaps conocidos:** para intenciones marcadas como gap (§1), fuerza el reconocimiento del límite en lugar de rellenar.

### 3.4 Synthesis Agent — *componer la respuesta*
- **Responsabilidad única:** redactar la respuesta a partir de los chunks validados.
- **Reglas:** respeta la propiedad de concepto (no repite lo que otro doc ya dice; lo referencia); prioriza por la intención (p. ej. impacto → cifra primero); mantiene la respuesta corta por defecto y ampliable bajo demanda.
- **Nunca:** añade conocimiento que no venga en los chunks; nunca "rellena" con lo que sabe un modelo general.

### 3.5 Conversation Agent — *adaptar y continuar*
- **Responsabilidad única:** envolver la respuesta para el visitante concreto.
- **Adapta el tono al visitante** (recruiter: directo; Head: estratégico; CEO: negocio) heredando el `voice & tone` de `experience/styles.es.md`. El fondo no cambia; cambia el registro.
- **Ajusta el nivel de detalle** según la profundidad detectada.
- **Ofrece el siguiente paso:** 1–2 preguntas sugeridas (de los `answers` de docs vecinos) y el CTA de contacto.
- **Nunca:** altera los hechos ni las cifras.

---

## 4. Garantía de evidencia (resumen operativo)

1. Toda afirmación importante ↔ un chunk que la respalda.
2. Cifras solo desde `metrics` por `metrics_refs`.
3. Sin evidencia suficiente → reconocer el límite, no inventar.
4. `gated` → mencionar y derivar, no revelar.
5. Preferir "no lo tengo documentado" a una respuesta plausible sin fuente. Para una Product Designer, una IA que no alucina sobre su carrera es una demostración de criterio.

---

## 5. Escalabilidad (por diseño, sin tocar agentes)

El motor está pensado para que dentro de un año, con **100 documentos, 300 proyectos, un MCP Server, varios GPTs, varios idiomas y nuevas interfaces**, no haya que modificar ni un agente:

- **Enrutamiento por metadatos, no por nombres.** Añadir un documento o proyecto = escribir su frontmatter (`type`, `tags`, `answers`, `personas`, `related`). Entra en las rutas existentes automáticamente. Los agentes nunca listan documentos a mano.
- **`_manifest` como índice.** El routing lee el manifest / `manifest.json`; crecer la base es crecer el manifest, no el motor.
- **Interfaces como clientes.** Web, MCP Server, GPTs y futuras apps son *clientes* del mismo pipeline. La lógica de recuperación vive una vez; cada interfaz solo cambia la capa de experiencia (`styles`).
- **Multi-idioma por filtro `lang`.** El mismo motor sirve `.es` o `.en` filtrando; no se duplica lógica.
- **Proyectos con plantilla idéntica.** Los 300 proyectos comparten estructura de 20 secciones → recuperación uniforme sin casos especiales.

---

## 6. El principio que no se rompe nunca

Los agentes son **finos y tontos a propósito**. Toda la inteligencia —qué sabe, cómo piensa, qué impacto tiene Marta— vive en `knowledge/`. Si un agente necesitara "saber" algo sobre Marta para responder, es señal de que falta un documento, no de que falte un agente. La respuesta correcta siempre es **enriquecer la base de conocimiento, nunca engordar el agente.** Ese es el contrato que mantiene el sistema mantenible a cinco años.
