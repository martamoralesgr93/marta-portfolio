---
title: "Arquitectura del Portfolio Conversacional impulsado por IA"
autor: "Marta Morales — Product Designer"
fase: "1 · Análisis y arquitectura (para validación, antes de implementar)"
fecha: 2026-07-14
---

# Arquitectura del Portfolio Conversacional impulsado por IA

> Documento de trabajo del equipo: Head of Product Design · Staff Product Designer · UX Writer · Diseñador de IA Conversacional · Especialista en CRO · Recruiter Senior · Frontend Architect.
> **Este documento no contiene código.** Es la arquitectura completa para que la valides antes de construir nada. Cuando esté aprobada, pasamos a `portfolio.md`, `agentes.md`, `estilos.md` y el resto de archivos.

---

## 0. Cómo leer este documento

El encargo pedía un orden concreto y lo respetamos:

1. Diagnóstico del punto de partida → **§1**
2. Tesis y métricas → **§2**
3. Arquitectura de conocimiento (los `.md`) → **§3**
4. Arquitectura conversacional → **§4**
5. Sistema de IA → **§5**
6. Sistema de agentes → **§6**
7. Design system (`estilos.md`) → **§7**
8. Qué información falta para que esto funcione de verdad → **§8**
9. Roadmap por fases → **§9**
10. Decisiones que necesito que valides → **§10**

---

## 1. Diagnóstico honesto del punto de partida

Antes de diseñar el futuro, hay que nombrar el presente sin adornos.

**El documento actual no es un portfolio: es una plantilla vacía.** Casi todas las secciones dicen *"no especificado"*. No hay proyectos reales, no hay métricas, no hay decisiones, no hay resultados. Un dato ilustra el problema mejor que nada: el único "proyecto" listado con enlaces es *este mismo documento en Markdown*.

Esto importa muchísimo, porque el sistema que quieres construir se apoya en una premisa: **`portfolio.md` será la única fuente de verdad y la IA responderá solo con esa información.** Si esa fuente está vacía, tienes exactamente dos finales posibles, y los dos te descartan:

- La IA responde *"no especificado"* → parece que no tienes experiencia.
- La IA rellena huecos inventando → un Product Designer que publica un asistente que alucina sobre su propia carrera se autodescarta.

**Segundo hallazgo, igual de importante: hay un conflicto de posicionamiento.** El documento te presenta como *"Diseñadora de Negocio Digital (Junior)"* en ILUNION Hotels. Tu objetivo real es competir como **Product Designer con pensamiento estratégico y foco en CRO/negocio**, apuntando a un salto salarial relevante en empresas tech/SaaS/travel. Un recruiter que aterriza en "Junior" cierra la pestaña antes de que la IA diga una palabra. **El posicionamiento se decide en los primeros 6 segundos, no en la conversación.**

**Conclusión del diagnóstico:** el cuello de botella de todo este proyecto **no es técnico ni de diseño. Es de contenido y de posicionamiento.** La arquitectura de IA que sigue es sólida y ambiciosa, pero solo brilla si la alimentamos con casos reales, cuantificados y bien contados. Por eso §8 (los gaps) es, en la práctica, la sección más importante para ti.

---

## 2. La tesis: de "página que se lee" a "sistema que responde"

Tu instinto es correcto y merece formularse como principio rector:

> **Un portfolio no gana entrevistas mostrando trabajo. Las gana respondiendo, rápido, la única pregunta que cada visitante tiene en la cabeza: "¿merece la pena entrevistar a esta persona?".**

Todo lo demás se subordina a esto. Dos reglas operativas lo hacen medible:

### La regla de los 6 segundos (posicionamiento)
En los primeros 6 segundos, sin hacer scroll ni clic, el visitante debe entender:
- **quién eres** (Product Designer, no "diseñadora de negocio digital junior"),
- **qué haces** (diseño de producto que mueve métricas de negocio),
- **qué impacto generas** (una cifra concreta, real),
- **por qué seguir explorando** (una promesa de valor diferencial).

Esto vive en el *hero*. No lo resuelve la IA: lo resuelve una frase y un dato. La IA amplía; el hero posiciona.

### El KPI de los 30 segundos (conversión)
El éxito se mide con una sola métrica:

> **Que cualquier visitante encuentre en menos de 30 segundos la respuesta que necesita para decidir si te entrevista.**

Esto sí lo resuelve la IA: entra un Head of Design, pregunta "¿cómo mide impacto?", y en una respuesta obtiene lo que en un portfolio clásico tardaría 4 minutos de scroll en tres case studies. **No diseñamos para mostrar información. Diseñamos para responder preguntas.** Cada decisión de este documento pasa el filtro: *¿reduce carga cognitiva? ¿se entiende más rápido? ¿me diferencia? ¿aumenta la probabilidad de entrevista? ¿sube la percepción de seniority?* Si la respuesta es "no", no entra.

---

## 3. Arquitectura de conocimiento

El encargo proponía tres archivos (`portfolio.md`, `agentes.md`, `estilos.md`) y pedía ampliarlos si mejoraba el sistema. **Lo mejora.** Un único `portfolio.md` gigante es difícil de mantener, mezcla registros (datos duros vs. narrativa vs. tono) y hace que la IA recupere contexto ruidoso. Separar el conocimiento por *función de respuesta* hace que cada agente recupere exactamente lo que necesita.

Propuesta: **una fuente de verdad canónica + archivos especializados que la extienden.**

| Archivo | Rol | Qué contiene | A quién sirve sobre todo |
|---|---|---|---|
| **`portfolio.md`** | Fuente de verdad canónica | Identidad, posicionamiento, experiencia, skills, herramientas, idiomas, disponibilidad. El "quién soy" verificable. | Todos |
| **`casos.md`** | El corazón narrativo | Cada case study con la estructura completa de storytelling (ver §3.1). Es donde se gana la entrevista. | Head of Design, Design Manager, PM |
| **`metricas.md`** | La prueba de impacto | Todas las cifras de negocio: antes/después, CRO, conversión, retención, ahorro. Aisladas para que la IA cite números sin ambigüedad. | CEO, Founder, recruiter |
| **`principios.md`** | Cómo piensas | Tus principios de diseño, tu framework de toma de decisiones, cómo priorizas, cómo colaboras con negocio y desarrollo. | Head of Design, Design Manager |
| **`ia-workflow.md`** | Tu factor diferencial 2026 | Cómo usas IA en tu proceso real (research, ideación, UX writing, prototipado, este propio portfolio). Casi ningún candidato documenta esto. | Head of Design, CEO, Founder |
| **`faq.md`** | Respuestas de fricción | Inglés, disponibilidad, remoto, expectativas, relocation, autorización de trabajo, "por qué dejas ILUNION". Preguntas incómodas, respondidas con seguridad. | Recruiter |
| **`agentes.md`** | Cerebro conversacional | Definición de cada agente: rol, cuándo interviene, qué pregunta responde, tono, qué prioriza. | Sistema de IA |
| **`estilos.md`** | Design system | Tokens, color, tipografía, espaciado, componentes, motion, accesibilidad, voice & tone, guidelines conversacionales. | Frontend / IA |

> **Por qué esta separación gana:** un Recruiter Agent recupera de `portfolio.md` + `faq.md`; un CEO Agent recupera de `metricas.md` + `casos.md`. Cada uno responde más rápido y con menos ruido. Es el equivalente conversacional a la regla de los 30 segundos.

### 3.1 La estructura narrativa de cada caso (`casos.md`)

Ningún case study se cuenta como galería de pantallas. Se cuenta como historia, con esta espina dorsal (formato Stripe/Linear/Notion):

`Contexto → Problema → Objetivo de negocio → Usuarios → Investigación → Insights → Hipótesis → Estrategia → Diseño → Validación → Iteraciones → Resultado → Impacto → Aprendizajes`

Y cada caso debe responder, sí o sí, cuatro preguntas:
- **¿Por qué existía este proyecto?**
- **¿Por qué era importante para el negocio?**
- **¿Qué pasaba antes?**
- **¿Qué cambió después?** (con número)

La IA no "resume el caso". La IA **entra por la pregunta del visitante** y devuelve el fragmento de la historia que la responde. Un PM pregunta "¿cómo priorizó?" → recupera `Estrategia` + `Hipótesis`. Un CEO pregunta "¿generó negocio?" → recupera `Impacto` + `Resultado`.

---

## 4. Arquitectura conversacional

La regla central que diste, y que comparto: **no es un chatbot. Es un asistente contextual que parece parte de la interfaz.** Nunca un botón flotante añadido al final. La conversación *es* la navegación.

### 4.1 Principio: reducir lo visible, no reducir la información
Tienes razón en que hay fatiga cognitiva por exceso de contenido expuesto. La solución no es borrar información, es **cambiar su estado por defecto de "siempre visible" a "bajo demanda".** La información aparece a través de:

- preguntas sugeridas (chips contextuales), conversación, acordeones, tarjetas expandibles, overlays, drawers, tooltips inteligentes y detalles bajo demanda.

La superficie visible por defecto queda mínima: hero + 3-4 preguntas sugeridas + acceso a los casos. Todo lo demás lo descubre la IA cuando el visitante lo pide.

### 4.2 El recorrido conversacional (el momento clave)
1. **Hero (6s):** posicionamiento + una métrica real + input conversacional ya presente ("Pregúntame qué buscas evaluar").
2. **Detección de intención:** el visitante o bien escribe, o bien pulsa una *pregunta sugerida*. Las preguntas sugeridas son la palanca de CRO más potente: **le enseñan al visitante qué puede preguntar y guían hacia tus fortalezas.**
3. **Respuesta priorizada por persona:** la IA responde corto, con evidencia, y ofrece 1-2 siguientes preguntas ("¿Quieres ver el caso completo?" / "¿Cómo lo medí?").
4. **Profundización bajo demanda:** drawers/overlays con el caso, sin sacar al visitante del flujo.

### 4.3 Patrones de interacción por defecto
- **Preguntas sugeridas dinámicas:** cambian según la persona detectada.
- **Respuestas con evidencia, no adjetivos:** cada afirmación fuerte se acompaña de una cifra o un enlace al caso.
- **Siempre un siguiente paso:** ninguna respuesta termina sin ofrecer continuar (patrón de conversión).
- **Escape hatch:** en todo momento, un CTA visible de "Hablar con Marta / agendar" — la IA convence, pero la entrevista se cierra fuera.

---

## 5. Sistema de IA

### 5.1 Grounding estricto (la regla de oro)
La IA responde **exclusivamente** con el contenido de los `.md`. Nada fuera de esa base. Si le preguntan algo que no está documentado, no inventa: lo reconoce y redirige ("No lo tengo recogido aquí, pero puedes preguntárselo directamente a Marta"). Para un Product Designer, **una IA que no alucina sobre su propia carrera es en sí misma una demostración de criterio.**

### 5.2 Detección de persona
El sistema clasifica al visitante en una de las personas (§6) por dos vías:
- **Explícita:** al entrar, chips tipo "Soy recruiter · Soy Head of Design · Soy Founder · Estoy explorando". Un clic ajusta todo el sistema. Rápido, transparente, sin fricción.
- **Implícita:** el vocabulario de sus preguntas ("¿stack?", "¿inglés?" → recruiter; "¿cómo mides impacto?" → Head of Design; "¿genera negocio?" → CEO). Ajusta la priorización sobre la marcha.

### 5.3 Priorización de respuestas
Detectada la persona, el sistema **reordena qué información sale primero**. La misma pregunta ("háblame de tu mejor proyecto") se responde distinto para un CEO (impacto en negocio primero) que para un Head of Design (proceso y decisiones primero). Esto es el núcleo del sistema: **misma verdad, distinto orden de relevancia.**

### 5.4 Tono adaptativo
Cada agente hereda el *voice & tone* base (§7) pero ajusta registro: con recruiter, claro y directo; con Head of Design, reflexivo y estratégico; con CEO, orientado a resultados y negocio.

---

## 6. Sistema de agentes (`agentes.md`)

Un mismo motor, ocho comportamientos. Cada agente define: **rol · cuándo interviene · qué preguntas responde · tono · qué prioriza.**

| Agente | Cuándo interviene | Preguntas típicas | Tono | Prioriza |
|---|---|---|---|---|
| **Recruiter** | Visitante evalúa fit básico y filtros | ¿Experiencia? ¿Dónde ha trabajado? ¿Inglés? ¿Años diseñando? ¿Disponible? ¿Remoto? | Claro, directo, sin florituras | `portfolio.md` + `faq.md` |
| **Head of Product Design** | Evalúa seniority y criterio | ¿Cómo piensa? ¿Nivel estratégico? ¿Cómo decide? ¿Cómo mide impacto? ¿Cómo colabora con negocio? | Reflexivo, estratégico, de par a par | `principios.md` + `casos.md` |
| **Design Manager** | Evalúa encaje en equipo y ejecución | ¿Cómo trabaja con devs/PMs? ¿Cómo maneja feedback? ¿Cómo prioriza? ¿Design systems? | Cercano, operativo | `principios.md` + `casos.md` |
| **CEO de Startup** | Evalúa retorno de negocio | ¿Genera negocio? ¿Reduce costes? ¿Tiene autonomía? ¿Puede liderar producto? | Directo, orientado a resultados | `metricas.md` + `casos.md` |
| **Founder** | Evalúa versatilidad y ownership | ¿Se mueve sin estructura? ¿End-to-end? ¿Del 0 al 1? ¿Se ensucia las manos? | Enérgico, pragmático | `casos.md` + `ia-workflow.md` |
| **Product Manager** | Evalúa colaboración producto | ¿Cómo prioriza? ¿Trabaja con métricas? ¿Discovery? ¿Trade-offs? | Colaborativo, analítico | `casos.md` + `metricas.md` |
| **UX Designer** | Evalúa oficio y método | ¿Research? ¿Sistemas? ¿Proceso? ¿Herramientas? | De colega a colega | `casos.md` + `principios.md` |
| **Desarrollador** | Evalúa handoff y viabilidad | ¿Stack? ¿Cómo entrega a dev? ¿Entiende viabilidad técnica? ¿Design tokens? | Técnico, concreto | `portfolio.md` + `ia-workflow.md` |

> Existe además un **Agente por defecto ("Estoy explorando")**: cuando no hay persona clara, prioriza el pitch de 30 segundos —posicionamiento + impacto + mejor caso— y ofrece los chips para autoidentificarse.

---

## 7. Design system — dirección de `estilos.md`

`estilos.md` será la documentación completa del sistema visual y conversacional. Estructura propuesta (se detalla en la fase de implementación):

- **Design tokens** — nomenclatura y escala.
- **Color** — paleta con foco en contraste AA/AAA; modo claro/oscuro.
- **Tipografía** — jerarquía que soporta la regla de los 6 segundos (el hero manda).
- **Espaciado** — escala consistente, ritmo vertical.
- **Componentes** — hero, chips de pregunta sugerida, burbuja de respuesta IA, tarjeta de caso, drawer, tooltip, CTA de contacto.
- **Motion** — micro-animaciones que refuercen "vivo e inteligente" sin distraer; entradas de respuesta, estados de "pensando".
- **Accesibilidad** — teclado, foco visible, lectores de pantalla, `prefers-reduced-motion`. Coherente con tu valor de inclusión (viene de ILUNION) y es señal fuerte de seniority.
- **Voice & tone** — la voz base de la que heredan los agentes.
- **Principios de diseño** — los cinco filtros de decisión de §2.
- **Sistema conversacional** — anatomía de una respuesta, longitud, uso de evidencia, patrón de "siguiente pregunta".
- **Guidelines de interacción** — cuándo drawer vs. overlay vs. tooltip; estados vacío/carga/error de la IA.

Referencia estética objetivo: **Stripe (claridad), Linear (densidad elegante), Notion (calidez), Spotify (personalidad).**

---

## 8. Gaps críticos de información — lo que necesito de ti

Esta es la sección que desbloquea todo. **No voy a inventar tu experiencia.** Sin este material, la IA no puede funcionar sin alucinar. En orden de prioridad:

**P0 — Sin esto no hay proyecto:**
1. **Posicionamiento real.** ¿Cuál es tu título objetivo exacto? (p. ej. "Product Designer" a secas, "Senior Product Designer", "Product Designer · CRO"). Y tu frase de 6 segundos: quién eres + impacto.
2. **2-4 casos reales**, aunque sean de ILUNION o proyectos propios. De cada uno: contexto, problema, tu rol exacto, qué hiciste, y **qué cambió (con número)**. Aunque el número sea aproximado o cualitativo, lo necesitamos.
3. **Métricas de impacto reales.** Cualquier cifra que puedas defender en una entrevista: conversión, reservas, tiempos, ahorro, adopción, NPS. Si no hay números duros, resultados cualitativos verificables.

**P1 — Necesario para credibilidad:**
4. Años de experiencia en diseño y trayectoria (roles, fechas).
5. Nivel real de inglés (esto sale en el primer filtro de todo recruiter).
6. Stack y herramientas reales (Figma, etc.) y cómo entregas a desarrollo.
7. Formación (títulos, cursos, certificaciones reales).

**P2 — Tu diferenciador:**
8. **Cómo usas IA en tu proceso de diseño** (ChatGPT, Claude, Cursor…): en research, ideación, UX writing, prototipado. Esto alimenta `ia-workflow.md` y casi nadie lo tiene.
9. Tus principios de diseño y tu framework de decisión (para `principios.md`).
10. Datos de contacto y enlaces (LinkedIn, email profesional, CV) para cerrar la conversión.

> Sugerencia de método: en vez de rellenar todo de golpe, hacemos **un caso completo end-to-end** (contenido + narrativa + su ficha en `casos.md` y `metricas.md`) y lo usamos como plantilla de oro para los demás. Aprendes el patrón una vez.

---

## 9. Roadmap de implementación por fases

- **Fase 1 · Arquitectura (este documento).** Validación. ← estás aquí.
- **Fase 2 · Contenido y posicionamiento.** Rellenar §8 P0/P1. Redactar `portfolio.md` + un caso oro en `casos.md` + `metricas.md`. Sin esto no se construye nada.
- **Fase 3 · Cerebro conversacional.** Escribir `agentes.md` completo y las reglas de grounding, detección y priorización.
- **Fase 4 · Design system.** `estilos.md` completo.
- **Fase 5 · Implementación.** Recién aquí se escribe código: hero, capa conversacional, drawers, integración de la IA sobre los `.md`.
- **Fase 6 · Medición.** Instrumentar el KPI de 30s y las preguntas más frecuentes de cada persona para iterar el contenido.

---

## 10. Decisiones que necesito que valides

1. **¿Apruebas la arquitectura de archivos ampliada** (`portfolio.md` + `casos.md` + `metricas.md` + `principios.md` + `ia-workflow.md` + `faq.md` + `agentes.md` + `estilos.md`), o prefieres empezar solo con los tres originales y crecer luego?
2. **¿Confirmas el posicionamiento "Product Designer estratégico / CRO"** por encima del "Junior / Diseñadora de Negocio Digital" del documento actual?
3. **¿Aceptas el método de "un caso oro primero"** en la Fase 2, en lugar de rellenarlo todo de una vez?
4. **¿El idioma del portfolio y de la IA es español, inglés, o bilingüe?** (Afecta a alcance de empresas y a `faq.md`.)

Cuando valides estos cuatro puntos y me pases el material de §8 (aunque sea el primer caso), empezamos la Fase 2.
