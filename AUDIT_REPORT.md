# Informe de corrección del portfolio · 21/10/2026

Base: rama `feat/home-lectura` (igual a `origin/main` en `fba0c4d`, lo publicado en martamorales.vercel.app). Cambios sin commit.

Criterio general: cuando una cifra contradecía los datos que confirmaste el 20/10/2026 o no tenía fuente en el repositorio, la he retirado o la he reformulado como objetivo, estimación o contexto. No he inventado muestras, periodos ni resultados. Las dudas abiertas están en `PENDING_CONFIRMATIONS.md`.

Cada caso tiene tres versiones del contenido: móvil (`*me-*`), escritorio (`*de-*`) y un bloque antiguo oculto con CSS que sigue en el HTML y que leen buscadores y asistentes de IA. He corregido las tres. El panel «otros casos» se repite en las 7 páginas de caso y lo he unificado.

## Archivos modificados

| Archivo | Cambios |
|---|---|
| `index.html` | Titular, eyebrow, subtítulo, `<title>`, meta, OG/Twitter, JSON-LD, tarjetas de Gym y Paolo, chatbot ES/EN |
| `ilunion-cro.html` | Afirmación causal sobre ÚNICOS, panel de casos |
| `cef-design-system.html` | Alcance 47/17, formulación WCAG, panel de casos |
| `it-ops-oracle.html` | Proyecciones, objetivos por módulo, aprendizajes, bloque antiguo, panel |
| `gym-energy-center.html` | Test de Maze, 88 %, SUS, hipótesis de retención, «6 semanas», panel |
| `paolo-pizzeria.html` | Separación de métricas, rol, estado de la web, panel |
| `booking-engine.html`, `case-study-template.html` | Panel de casos y «80+ componentes» (páginas públicas no enlazadas desde la portada) |
| `chatbot.js` | Chatbot de las páginas de caso, ES/EN |
| `api/kb.js` | Base de conocimiento del asistente con IA (`/api/chat`) |

## 1. ILUNION Hotels

| Original | Cambio | Motivo |
|---|---|---|
| — (3,36 % → 6,5 % no está publicado) | Sin cambios: se mantiene «cifras confidenciales» | Decidiste el 20/10 que son confidenciales. La tarea pedía publicarlas; queda pendiente (P1) |
| «la ventaja ÚNICOS **pasó a ser la razón** para reservar en directo y no en Booking» | «se **diseñó como motivo** para reservar en directo» (ES/EN) | Afirmación causal sin evidencia publicada |
| Panel: «…con analítica y experimentación» | «…motor de reservas y home recompuesta» | Prioriza la decisión de diseño |

No hay 13 %, 50 % de ÚNICOS, +93 % ni p < 0,05 en el código. La narrativa ya seguía la secuencia pedida: problema («Venían a reservar y no buscaban») → research («Comportamiento, no opiniones») → hipótesis ICE → decisión (iniciativa 2, «primero reservar, después inspirar») → experimento («selector de destino») → resultado («iniciativa completa, cifras confidenciales») → aprendizaje («Funcionó, y se retiró»). Por eso no la he reorganizado.

## 2. CEF Design System

| Original | Cambio | Motivo |
|---|---|---|
| Panel (6 páginas): «80+ componentes, tokens multimarca y accesibilidad WCAG AA» | «Auditoría de 47 componentes, 17 construidos y criterios WCAG 2.1 AA en los flujos evaluados» | El 80+ no tiene documentación (P3). 47/17 son datos confirmados |
| Plantilla: «80+ componentes multidispositivo…» | «Auditoría de 47 componentes, 17 construidos con sus estados…» | Ídem |
| «**100%** de los flujos críticos pasan AA» | «**3/3** flujos críticos auditados con criterios WCAG 2.1 AA» | Auditoría, no certificación |
| «WCAG 2.1 en los tres flujos críticos…» | «Auditoría de accesibilidad y criterios WCAG 2.1 AA aplicados en los tres flujos evaluados…» | Formulación limitada a los flujos |
| «Inventario de componentes» | «Inventario de 47 componentes» | Alcance visible |
| «Hover, focus, disabled y active especificados…» | «17 componentes construidos tras auditar 47, con hover, focus…» | Alcance + estados en el mismo bloque |
| Prototipo: «…Design System accesible (WCAG 2.1 AA)… componentes reactivos» | «…con el Design System, sus tokens y sus componentes, aplicando criterios WCAG 2.1 AA» | No afirmar conformidad |
| Chatbot y base de conocimiento: «100 % WCAG 2.1 AA», «0 discrepancias», 57 variables atribuidas a 2024 | 47 auditados / 17 construidos (2024); 57 variables = recreación 2026; criterios WCAG en los flujos evaluados | Cronología confirmada |

La página ya trataba la inconsistencia (4 plataformas), los tokens en 3 capas, los estados, la accesibilidad y la colaboración con desarrollo («Se diseña también para desarrollo»). He añadido el alcance sin alargarla. Se mantiene «Superar la auditoría legal de accesibilidad» porque es el objetivo del proyecto, no un resultado.

## 3. Oracle ERP & IT Ops

| Original | Cambio | Motivo |
|---|---|---|
| Panel: «resolución de tickets de 45 a 8 min» | «Propuesta Build vs. Buy, no implementada: 56,5 h/mes de trabajo manual medidas» | Sin fuente; proyecto no implementado (P7) |
| Panel ILUNION: «Diagnóstico Build vs. Buy **ahorrando** 56,5 h/mes» | Ídem | El ahorro no ocurrió |
| «−70 % horas de gestión manual» | «−70 % · **reducción potencial estimada** de horas de gestión manual» | Es una estimación (P5) |
| «≈ 40 h/mes **liberadas**» | «≈ 40 h/mes **que se liberarían** (estimación)» | Ídem |
| Módulo clave: «**−56,5 h/mes** · …automatizados» | «**3 flujos** · …automatizados en la propuesta» | Atribuía al módulo la eliminación total de las horas |
| KPIs de wireframes: «Detección < 30 s», «0 peticiones extraviadas», «< 1 h (antes 48 h)», «−56,5 h/mes» | «Objetivo: …» / «Automatiza tareas manuales» | Son objetivos de diseño, no mediciones |
| Nota móvil: «Objetivos definidos con el IT Ops Lead…» | + «no se midieron en producción» | Igual que la versión de escritorio |
| Aprendizaje: «Construir ligero sale más barato · Menos coste…» | «Comprar no siempre encaja · Un flujo muy específico puede pedir algo ligero…» | No hay datos de coste |
| Bloque antiguo: «demostró que construir era más rentable», «el 80 % de las funciones sobraban», «resolvió directamente las 56,5 h», «ahorra millones», «99,8 % SLA», «100 % conformidad», «Lead Product Designer» | Reformulado como propuesta y objetivos; rol «Product Designer» | Resultados de producción inexistentes |
| Chatbot y base de conocimiento: «validada con dirección», «diagnóstico» | «Propuesta… no implementada; 56,5 h/mes medidas por el Senior de Sistemas; el 70 % es una estimación» | Datos confirmados |

La relación problema → usuarios → alternativas → Build vs. Buy → módulos → impacto esperado ya estaba en el resumen (Problema 56,5 h / Decisión Build / Impacto proyectado) y en las secciones de research, Buy·COTS frente a Build y módulos. No he añadido costes ni comparativas.

## 4. Gym Energy Center

| Original | Cambio | Motivo |
|---|---|---|
| Panel: «16 entrevistas contextuales y adherencia» | «12 entrevistas sobre por qué los socios abandonan» | 12 es la cifra del caso y la confirmada |
| Resumen: «Validado en test · Maze · **88 %** de tareas sin ayuda» | «Resultado · prototipo · **2 taps** para reservar una clase…» | Confirmaste que Maze, el 88 % y el SUS no existen |
| Panel de resultados: 88 %, SUS 4,6/5, «0 bloqueos», badge «Medido» | «Evidencia del proyecto: 12 entrevistas en un equipo de 8; no hubo test con métricas» + «3 hallazgos que guiaron el diseño» | Ídem |
| Título «Validado con usuarios reales» | «Lo que *sí* está validado» | Ídem |
| Hipótesis «+34 % retención a 90 días», «+52 % asistencia» | Eliminadas | Cifras de retención sin base |
| «6 sem de research a prototipo» | «8 personas en el equipo» | Contradice feb–jun 2024 (P9) |
| Métodos: «Test de usabilidad · Maze» | «Prototipado en Figma» | Ídem |
| Bloque antiguo: 88 %, SUS, Maze, «duplica la probabilidad de asistencia», «aumentan la retención mucho más que los descuentos» | Reformulado sin cifras ni afirmaciones de retención | Ídem |
| Portada: «40+ Componentes», «30+ Endpoints» | «12 Entrevistas con socios», «2 taps para reservar en el prototipo» | Prioriza research y usabilidad |
| Chatbot: «lideró… (40+ componentes)» | «trabajó en el research (12 entrevistas)…» | Sin evidencia del liderazgo ni de la cifra |

## 5. Paolo Pizzeria

| Original | Cambio | Motivo |
|---|---|---|
| «Métrica principal · medida: 1→5 restaurantes con el mismo producto» | «Crecimiento del negocio · contexto: … sin rediseño. El crecimiento es del negocio, no solo del producto» | Separar negocio y producto |
| Título «Un producto que escaló sin rediseño» | «Un sistema que aguantó el crecimiento» | Ídem |
| +28 % / +40 % / 0 € sin categoría | «· canal digital» / «· operación» / «· canal digital» | Separar tipos de métrica |
| «−40 % de espera» | «+40 % de rapidez de comanda» | Contradecía la métrica documentada |
| «Web en producción · 5 locales» | «Web publicada 2020–2022 · llegó a 5 locales» | El negocio cerró (P11) |
| Equipo: «Solo · end to end» | «Research y prototipo en We Are Actions; marca, web y QR como freelance» | Rol confirmado |
| Portada: «una marca para 5 locales», «Pedidos», «Rapidez de comanda» | «de la mesa al pedido online»; «Pedidos directos · canal digital»; «Rapidez de comanda · sala» | Conexión entre lo físico y lo digital sin atribuir el crecimiento |
| Base de conocimiento: «proyecto de bootcamp», «Lead Product Designer & Frontend Developer», «+32 % en llamadas directas» | Producto real 2020–22; rol confirmado; +28 % / +40 % separados | Datos erróneos o sin fuente |

## 6–8. Portada y versiones en inglés

| Original | Cambio |
|---|---|
| H1: «Diseño de producto transversal: de los datos al sistema y el código.» | «Product Designer especializada en **Design Systems**, CRO y producto digital orientado a negocio.» / EN «Product Designer specialising in **Design Systems**, CRO and business-driven digital product.» |
| Eyebrow: «Product Designer End-to-End · UX/UI, Design Systems, CRO & Código» | «Product Designer · Design Systems y CRO» |
| Subtítulo | Añade «Base técnica en HTML/CSS/JS para trabajar cerca de desarrollo»: la experiencia técnica se presenta como apoyo y no como perfil principal |
| `<title>`, meta, OG, Twitter, `jobTitle` | Alineados con el nuevo titular |
| ILUNION en JSON-LD, chatbot y base de conocimiento: «Product Designer & CRO» | «Digital Business Designer (Product Design y CRO del canal directo)», el título oficial confirmado |
| Chatbot: «Stack de vanguardia (IA + Código)», «Evolución real demostrada» | «Cerca de desarrollo», «Trayectoria coherente» |

Las correcciones de las secciones 1 a 5 están hechas en ES y EN a la vez (cada `.es` tiene su `.en`). En inglés he usado formulaciones habituales del sector («audited against WCAG 2.1 AA», «estimated potential reduction», «not measured in production», «business growth · context»).

## 9. Verificaciones realizadas

| Comprobación | Resultado |
|---|---|
| Build | **No ejecutado.** El despliegue es estático (Vercel sin build; `build.js` está en `.vercelignore`). Además, `build.js` reescribe `index.html` desde `projects/*.md` antiguos con cheerio, así que ejecutarlo revertiría la portada |
| Linter / tests | **No existen** en el proyecto (`package.json` solo tiene `build-local`) |
| Sintaxis JS | `node --check` correcto en `chatbot.js`, `api/kb.js` y `api/chat.js`. Todos los `<script>` inline de las 8 páginas compilan |
| JSON-LD | `JSON.parse` correcto |
| Estructura HTML | El balance de etiquetas de apertura y cierre es idéntico al de `HEAD` en las 8 páginas modificadas |
| Rutas | 397 `src`/`href`/`poster` locales en portada + 5 casos: todos existen (los 6 avisos de `/auth-lock.js` son una ruta absoluta que sí existe en la raíz) |
| Carga y consola | Portada + 5 casos cargados en el servidor local: 0 errores de JavaScript |
| ES ↔ EN | En las 6 páginas, al pulsar el botón de idioma quedan 0 nodos `.es` visibles y todos los `.en` visibles; luego vuelve a ES |
| Visual | Capturas del hero de la portada (escritorio) y del bloque de resultados de Gym (móvil 375 px y escritorio): sin desbordamiento horizontal y con el mismo estilo de tarjetas |
| Cifras conflictivas | Búsqueda en los 10 archivos publicados: 0 apariciones de «80+ componentes», «45→8 min», «16 entrevistas», «88 %» (como métrica), SUS, Maze, «100 % WCAG», «+34 %/+52 %», «−56,5 h», «escaló de 1 a 5». «3,36» solo aparece dentro del trazado SVG del icono de LinkedIn |

No verificado: el comportamiento en Safari y en dispositivos reales, la navegación completa con teclado y el despliegue en Vercel (no se ha hecho push).
