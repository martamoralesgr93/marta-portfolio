# styles.es.md — Conversation Experience System

> Documento de la capa **experience**. **No se indexa** (layer: experience).
> `id: styles` · `type: styles` · `lang: es`
> No es un Design System: es un **Conversation Experience System**. La interfaz ya no gira alrededor de páginas, sino de **preguntas**. Este documento define tanto el lenguaje visual como el comportamiento de la interacción.
> **Frontera de capa:** aquí se define *cómo se muestra y cómo se interactúa*. *Qué se sabe* vive en `knowledge/`; *cómo se razona y en qué orden se construye la respuesta* vive en `system/`. Cuando una regla de contenido ya existe en `system/`, aquí se **referencia**, no se reescribe.

---

## Bloque 1 · Visual System

El Design System tradicional, al servicio de la conversación. Referencia estética: claridad (Stripe), densidad elegante (Linear), calidez (Notion).

**Design tokens.** Nomenclatura `categoria-rol-variante` (`color-bg-surface`, `space-4`, `text-size-body`). Ninguna propiedad visual se codifica a mano fuera de un token.

**Color tokens.** Roles semánticos, no valores sueltos: `bg-base`, `bg-surface`, `bg-elevated`, `text-primary`, `text-secondary`, `text-muted`, `accent`, `accent-contrast`, `border-subtle`, `focus-ring`, estados `success/warning/danger`. Cada par texto/fondo cumple contraste mínimo AA. Modo claro y oscuro como conjuntos paralelos del mismo token.

**Typography.** Escala modular (p. ej. 12/14/16/20/28/40). Jerarquía que soporta la regla de los primeros segundos: un único elemento dominante por vista. Fuente legible, altura de línea generosa para lectura de respuestas.

**Spacing.** Escala base 4px (`4/8/12/16/24/32/48/64`). Ritmo vertical consistente; el aire es parte del mensaje.

**Grid.** Layout de una columna conversacional centrada (medida de lectura ~60–72 caracteres) con zona lateral/inferior para disclosure (drawers, tarjetas).

**Motion.** Duraciones `fast 120ms / base 200ms / slow 320ms`; easing de entrada suave. La animación comunica estado (aparición de respuesta, "pensando", apertura de drawer), nunca decora. Respeta `prefers-reduced-motion`.

**Icons.** Set único, trazo consistente, tamaño ligado a la escala tipográfica. Icono siempre con etiqueta accesible.

**Elevation.** Niveles discretos (`0` base, `1` tarjeta, `2` drawer/overlay, `3` popover) por sombra + superficie, no por bordes duros.

**Responsive.** Breakpoints `sm/md/lg`. Mobile-first: la conversación es la vista primaria; el disclosure se adapta (drawers a pantalla completa en móvil, laterales en escritorio).

**Accesibilidad.** Foco visible siempre; navegación completa por teclado; roles/labels ARIA en patrones interactivos; contraste AA como mínimo; `reduced-motion`. La accesibilidad es requisito de aceptación, no un extra.

---

## Bloque 2 · Conversation Patterns

Cómo responde la interfaz. El **contenido y su orden** los fija `system/prompts.es.md` (§3); aquí se define **qué formato visual** adopta cada tipo de respuesta y cuándo.

| Patrón | Cuándo se usa | Anatomía visual |
|---|---|---|
| Respuesta corta | intención cerrada, profundidad baja | 1–3 frases, sin adornos |
| Respuesta larga | profundidad alta o "explícame en detalle" | bloques con subtítulos, ampliable |
| Resumen | primera respuesta a intención amplia | titular + 2–3 puntos clave |
| Paso a paso | intención de proceso ("¿cómo…?") | lista ordenada de fases |
| Comparación | pregunta de contraste (antes/después, A/B) | tabla o dos columnas |
| Timeline | intención de evolución/trayectoria | hitos en línea temporal |
| Tabla | datos estructurados o múltiples atributos | tabla compacta y escaneable |
| Métrica | intención de impacto (cifra disponible) | dato grande + contexto + fuente |
| Proyecto relacionado | cuando un caso aporta evidencia | tarjeta de proyecto con acceso al detalle |
| Evidencia | toda afirmación importante | cita/enlace al documento fuente |
| Preguntas relacionadas | cierre de cada turno | chips de continuación |

**Estado de entrada (hero).** La primera vista posiciona en segundos: una frase de identidad + una prueba de impacto + un input conversacional ya presente y 3–4 preguntas sugeridas. No es una landing; es el inicio de la conversación.

**Estados del sistema.** Cargando ("pensando"), vacío (sin evidencia → reconoce el límite y ofrece contacto, según `prompts.es.md` §4), error (fallo de recuperación → mensaje honesto y reintento). Ninguno inventa contenido.

---

## Bloque 3 · Progressive Disclosure

Regla general: **mostrar solo la información necesaria en cada momento.** La información no desaparece; cambia su estado por defecto de "siempre visible" a "bajo demanda".

| Mecanismo | Cuándo usarlo |
|---|---|
| Acordeón | secciones hermanas de un mismo tema que el visitante hojea (p. ej. bloques de una FAQ) |
| Drawer | detalle extenso sin sacar al visitante del flujo (caso de proyecto completo) |
| Overlay/Modal | contenido que exige foco total y una decisión (raro; evitar para lectura) |
| Tooltip | definición breve de un término (apoyo de `glossary`) al pasar/enfocar |
| Popover | acción o dato secundario contextual anclado a un elemento |
| Tarjeta expandible | vista previa que crece a detalle en el sitio (proyecto, métrica) |
| Enlaces relacionados | saltos contextuales al grafo `related` |
| Detalle bajo demanda | cualquier ampliación que el visitante pide explícitamente ("ver más") |

Criterio de elección: cuanto más interrumpe, más justificación necesita. Preferir expandir en contexto (acordeón, tarjeta) antes que sacar de contexto (overlay).

---

## Bloque 4 · Recommendation Engine

Navegación **contextual**, no tradicional. No hay menú de páginas; después de cada respuesta, la interfaz sugiere el siguiente paso.

**Mecanismo (metadata-driven, no listas fijas):** las sugerencias se derivan del grafo `related` del documento respondido y de los `answers` de sus vecinos, filtradas por la persona detectada. Igual que en `agents.es.md`, **nunca se codifican recomendaciones a mano**: se leen del manifest. Añadir documentos amplía las recomendaciones sin tocar este archivo.

**Reglas:**
- Máximo 3–4 sugerencias por turno; más es ruido.
- Priorizar por proximidad en el grafo + relevancia para la persona + intención probable siguiente.
- No sugerir el documento que se acaba de mostrar ni repetir sugerencias ya ofrecidas en el hilo.
- Cada sugerencia se formula como pregunta o acción ("Ver cómo mide impacto"), no como etiqueta de sección.

*Ilustración (derivada de metadatos, no fija):* tras responder una intención de "uso de IA", el grafo `related` propondría explorar el flujo de trabajo, los principios de diseño, un caso que lo evidencie y el marco de decisiones — porque están enlazados en el manifest, no porque estén escritos aquí.

---

## Bloque 5 · Interaction Principles

Principios **verificables**: cada uno es un criterio que una revisión puede comprobar como cumplido o no.

1. **Minimizar carga cognitiva.** ¿La vista por defecto muestra solo lo necesario? (disclosure progresivo aplicado).
2. **Priorizar evidencia.** ¿Cada afirmación importante enseña o enlaza su fuente?
3. **Mostrar primero la respuesta, justificar después.** El orden de contenido lo define `prompts.es.md` §3; aquí se verifica que la jerarquía visual lo refleje (respuesta arriba, evidencia debajo).
4. **No repetir información.** ¿Un mismo concepto aparece una sola vez, referenciado en el resto? (propiedad de concepto).
5. **Reutilizar conocimiento existente.** ¿La interfaz recupera de la base en lugar de duplicar contenido en la UI?
6. **Mantener consistencia entre interfaces.** ¿Web, MCP, GPTs y API comparten estos patrones de comportamiento? La presentación puede variar; el comportamiento no.
7. **Favorecer la exploración.** ¿Cada turno ofrece un siguiente paso relevante?
8. **Adaptar la profundidad a la intención.** ¿La longitud y el formato responden a la profundidad detectada, no por defecto?
9. **Mantener continuidad conversacional.** ¿Se evita reintroducir contexto que el visitante ya tiene?
10. **Accesible por defecto.** ¿Teclado, foco, contraste y `reduced-motion` cumplidos en cada patrón?

---

## Nota de frontera de capas (higiene arquitectónica)

Durante el diseño se revisó qué pertenece a cada capa:
- *Cuándo existe una métrica y cuál es su valor* → `knowledge/` (dato) + `system/` (decisión de recuperarla). Aquí solo se define **cómo se muestra** (patrón "Métrica").
- *El orden de la respuesta* (respuesta→evidencia→siguiente paso) → regla de `system/prompts.es.md`. Aquí solo su **manifestación visual**.
- *Qué recomendar* → se deriva de metadatos vía `system/`. Aquí solo **cómo y cuántas** sugerencias se presentan.

Ninguna regla de conocimiento ni de razonamiento se ha duplicado en esta capa. Las tres responsabilidades quedan separadas: **Knowledge (qué se sabe) · System (cómo se razona) · Experience (cómo se interactúa).**
