---
id: decision-frameworks
title: "Cómo decido y priorizo — frameworks de decisión"
type: decision-making
layer: knowledge
lang: es
summary: "Cómo Marta prioriza oportunidades y toma decisiones: impacto vs. esfuerzo, equilibrio de negocio/usuario/viabilidad, y criterio para decidir con datos e incertidumbre. Muestra madurez y autonomía."
personas: [head-of-design, design-manager, pm, ceo]
tags: [prioritization, decision-making, trade-offs, impact-effort, product-thinking, autonomy, seniority]
related: [design-principles, business-thinking, workflows, collaboration, proj-ilunion-booking]
metrics_refs: []
canonical: true
status: draft
visibility: public
last_updated: 2026-07-14
---

# Cómo decido y priorizo

> Borrador para validación: ajusta lo que no te represente. Confirma o cambia los nombres de framework que uses formalmente.
> Responde a *"¿cómo toma decisiones Marta? ¿cómo prioriza? ¿qué madurez y autonomía demuestra?"*.

## Principio de fondo

Priorizar es decir que no con criterio. En un producto vivo con recursos ajustados, el valor no está en hacer más cosas, sino en hacer **las que mueven la métrica que importa con el menor esfuerzo posible**. Mi trabajo no es producir diseño, es asignar mi tiempo al mayor impacto.

## Cómo priorizo oportunidades

Priorizo por **impacto potencial frente a esfuerzo**, leído siempre con datos:

- **Impacto** — ¿cuánto puede mover esto una métrica de negocio o de experiencia? Lo estimo desde el embudo: una fricción en un paso con mucho tráfico y mucha caída vale más que un detalle en una página secundaria.
- **Esfuerzo** — ¿cuánto cuesta construirlo sobre el stack vivo y el motor externo? Al venir de frontend y trabajar en un equipo backend, esta estimación la hago con realismo técnico, no a ciegas.

Lo que tiene alto impacto y bajo esfuerzo se hace primero. Lo de alto impacto y alto esfuerzo se planifica y se argumenta. Lo de bajo impacto no compite por mi tiempo aunque sea fácil.

**No sigo un framework de forma dogmática.** Conozco RICE, ICE y otros modelos, pero en la práctica priorizo combinando siete señales: impacto para el usuario, impacto para el negocio, evidencia disponible, esfuerzo técnico, dependencias, urgencia y riesgo. Si un framework aporta claridad en un caso concreto, lo uso como apoyo; nunca como regla que sustituya al criterio. Un modelo es una herramienta de pensamiento, no una excusa para no pensar.

## Cómo equilibro las tres fuerzas

Cada decisión equilibra **negocio, usuario y viabilidad técnica**. Mi regla es no sacrificar ninguna en silencio:

1. Hago **explícito el trade-off** en vez de resolverlo por defecto hacia el negocio o hacia el usuario.
2. Llevo la tensión a los **stakeholders** correctos con el dato delante.
3. Decido y **documento por qué**, para que la decisión sea auditable después.

Un ejemplo real de esta tensión: en el canal directo, mejorar la conversión no puede hacerse a costa de la accesibilidad, porque la accesibilidad es parte del producto y de la marca en ILUNION. La solución buena es la que sube conversión *y* mantiene WCAG 2.1 AA, no la que sacrifica una por la otra.

## Cómo decido con incertidumbre

No siempre hay dato suficiente. Mi criterio cuando la evidencia es incompleta:

- **Si el coste de equivocarse es bajo y reversible**, decido rápido, lanzo y mido. La iteración es más barata que el análisis eterno.
- **Si el coste es alto o difícil de revertir**, invierto en reducir incertidumbre antes: más datos, una prueba acotada, o validación con stakeholders.
- **Distingo opinión de evidencia.** Una decisión basada en "a mí me parece" se etiqueta como tal y se valida en cuanto se pueda.

## El papel de la IA en mis decisiones

Uso IA para **acelerar** el trabajo alrededor de la decisión —síntesis, generación de alternativas, revisión crítica— pero **la decisión final es humana y la asumo yo**. La IA amplía las opciones que considero; no elige por mí. (Detalle en `ai.es.md`.)

## Qué revela esto sobre mi madurez

- **Autonomía:** decido sola el ciclo completo y respondo por el resultado.
- **Criterio:** priorizo por impacto, no por lo que es cómodo o lo que me piden.
- **Transparencia:** hago visibles los trade-offs en lugar de esconderlos.
- **Honestidad intelectual:** separo dato de opinión y acepto cuando me equivoco.
