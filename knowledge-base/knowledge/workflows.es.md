---
id: workflows
title: "Cómo trabajo — proceso de Product Design end-to-end"
type: process
layer: knowledge
lang: es
summary: "El proceso completo de Marta desde que recibe un problema hasta que mide impacto: fases, entregables y qué decide en cada punto. Trabaja como única Product Designer en un equipo backend, con autonomía end-to-end."
personas: [head-of-design, pm, ux, design-manager]
tags: [process, workflow, product-design, discovery, delivery, cro, data-informed, end-to-end, autonomy]
related: [design-principles, decision-frameworks, business-thinking, ai, collaboration, proj-ilunion-booking]
metrics_refs: []
canonical: true
status: draft
visibility: public
last_updated: 2026-07-14
---

# Cómo trabajo — proceso end-to-end

> Borrador para validación: ajusta lo que no te represente.
> Este documento responde a *"¿cómo trabaja Marta cuando diseña un producto real?"*. No describe un proyecto; describe el método que aplico en todos.

## Punto de partida: contexto de trabajo

Soy la **única Product Designer integrada en un equipo de Negocio Digital formado principalmente por desarrolladores backend**. Ese contexto define mi proceso: no hay una capa de diseño por encima que traduzca entre negocio y producto. El discovery, la investigación, las decisiones de interfaz, la accesibilidad y la interlocución con negocio pasan por mí. Trabajo con **autonomía end-to-end** y respondo por el resultado, no solo por las pantallas.

Esto significa que mi proceso está optimizado para una realidad concreta: **producto vivo, decisiones continuas, recursos ajustados y necesidad de justificar cada intervención con datos**.

## Las fases

Mi proceso no es una cascada rígida; es un ciclo que se repite sobre un producto que ya está en producción. Pero tiene un orden claro.

### 1. Entender el problema (no la petición)
Cuando recibo una petición, mi primer trabajo es separar la **solución que me piden** del **problema que hay detrás**. Pregunto qué queremos mover y por qué antes de aceptar el enunciado. Un "rediseña esta página" se convierte en "¿qué comportamiento queremos cambiar y cómo sabremos si lo logramos?".

Entregable: un problema formulado en términos de negocio y usuario, con una métrica objetivo.

### 2. Investigar con datos
Trabajo con comportamiento real, no con supuestos. Mis fuentes habituales: **Adobe Analytics** (embudos, rendimiento por página), **Microsoft Clarity** y **Hotjar** (mapas de calor, grabaciones de sesión), **datos de negocio** y **feedback interno**. Cruzo lo cuantitativo (dónde y cuánto se cae la gente) con lo cualitativo (por qué).

Entregable: un diagnóstico de fricciones priorizadas con evidencia.

### 3. Sintetizar en insights
Convierto los datos en insights accionables: una verdad sobre el usuario o el negocio que cambia una decisión. Aquí uso IA como acelerador de síntesis (ver `ai.es.md`), pero el criterio de qué es relevante es mío.

Entregable: 2–3 insights que justifican la intervención.

### 4. Formular hipótesis
Traduzco cada insight en una hipótesis medible: *"si [cambio], entonces [métrica] mejorará porque [razón]"*. En el canal directo trabajo recurrentemente sobre cuatro familias: reducir fricción, mejorar comprensión del contenido, aumentar confianza y facilitar la decisión.

Entregable: hipótesis con la métrica que espero mover.

### 5. Priorizar
No todo se hace a la vez. Priorizo las oportunidades por **impacto potencial frente a esfuerzo**, equilibrando siempre negocio, usuario y viabilidad técnica. (Detalle en `decision-frameworks.es.md`.)

Entregable: una decisión de qué se hace ahora y qué espera, argumentada.

### 6. Diseñar
Diseño la solución: arquitectura de información, flujo, interfaz, estados, responsive y accesibilidad (WCAG 2.1 AA). No diseño pantallas sueltas; **compongo desde el design system** que yo misma mantengo, lo que da consistencia y velocidad.

Entregable: diseño documentado, con componentes y criterios de accesibilidad, listo para desarrollo.

### 7. Colaborar durante el desarrollo
Mi trabajo no termina en Figma. Documento para desarrollo y colaboro durante la implementación para que lo construido mantenga la intención de diseño. Al estar en un equipo backend, hablo el idioma de la viabilidad técnica. (Detalle en `collaboration.es.md`.)

Entregable: implementación fiel a la intención, no una interpretación aproximada.

### 8. Medir y validar
Valido con datos, no con opinión: comparación **pre/post implementación**, seguimiento de **KPIs de negocio**, revisión por **analítica digital** y **auditorías de accesibilidad** cuando aplica. Documento A/B testing solo cuando realmente se ha hecho.

Entregable: una lectura honesta de si la hipótesis se cumplió.

### 9. Iterar
El resultado alimenta la siguiente decisión. Sobre un producto vivo, cada mejora es la base de la próxima. El design system hace que cada iteración sea más rápida y consistente que la anterior.

## Cómo se ve esto en la práctica

El caso `proj-ilunion-booking` es este proceso aplicado de principio a fin. No es un proyecto con inicio y final cerrados: es optimización continua sobre el canal de venta directa, ciclo tras ciclo.

## Qué revela este proceso sobre mí

- **Autonomía:** cubro el ciclo completo sin una estructura de diseño que me respalde.
- **Rigor:** cada decisión se ancla en datos y se valida después.
- **Pensamiento de sistemas:** diseño desde un design system, no pantalla a pantalla.
- **Foco en impacto:** el entregable no es el diseño, es el cambio medible en el producto.
