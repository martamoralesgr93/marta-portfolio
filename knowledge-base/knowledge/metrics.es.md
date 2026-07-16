---
id: metrics
title: "Métricas de impacto — fuente única de verdad"
type: metrics
layer: knowledge
lang: es
summary: "Todo el impacto de Marta con id estable: métricas cuantitativas (cifras verificables) y cualitativas (impacto real sin cifra exacta). Los proyectos las referencian por id; nunca se reescriben. Ningún proyecto queda sin impacto."
personas: [ceo, cro, pm, recruiter, head-of-design]
tags: [metrics, impact, cro, conversion, accessibility, design-system, roi, qualitative, quantitative]
answers:
  - "¿Qué impacto ha generado Marta?"
  - "¿Qué resultados tiene en CRO y conversión?"
  - "¿Qué impacto tuvo su design system?"
related: [proj-ilunion-booking, proj-cro, proj-cef-design-system, proj-oracle]
metrics_refs: []
canonical: true
status: ready
visibility: public
last_updated: 2026-07-14
---

# Métricas de impacto

> Regla del sistema: **un dato, un dueño.** Cada métrica vive aquí una vez con su `id`. Los proyectos la citan por `id` (`metrics_refs`), nunca reescriben el valor.
> **Dos tipos de métrica, ambos son evidencia:**
> - **Cuantitativa** — cifra verificable (conversión, componentes, eficiencia).
> - **Cualitativa** — impacto real documentado cuando no hay cifra exacta (reducción de fricción, consistencia, accesibilidad, colaboración, aceleración del diseño, escalabilidad, reutilización).
> **La ausencia de cifra no elimina el impacto.** Si un valor necesita validación posterior, se marca *pendiente de validación* pero el resultado permanece.
> **Confianza:** `alta` (documentada) · `media` (aproximada) · `cualitativa` (sin cifra, resultado verificable).

---

## ILUNION Booking Engine

### Cuantitativas

#### `m-ilunion-directchannel-conversion-01` — Conversión del canal directo
- **Tipo:** cuantitativa.
- **Qué mide:** tasa de conversión del canal de venta directa (reservas / visitas).
- **Antes:** ~3,36%
- **Después:** ~6,5%
- **Variación:** casi el doble (**+3,14 p.p.**, ≈ **+93%** en términos relativos).
- **Atribución:** resultado del trabajo continuo de optimización del canal; contribución de diseño/CRO dentro de un esfuerzo de equipo (no atribución individual exclusiva).
- **Periodo:** `[pendiente de validación]`.
- **Fuente:** Adobe Analytics · documentada en portfolio.
- **Confianza:** alta (valores aproximados).
- **Proyecto:** `proj-ilunion-booking`.

### Cualitativas

#### `m-ilunion-booking-friction-02` — Fricción en el proceso de reserva
- **Tipo:** cualitativa.
- **Impacto:** reducción de fricciones en el funnel de reserva (optimización de fichas, servicios, CTAs y flujos).
- **Fuente:** Adobe Analytics / Microsoft Clarity.
- **Confianza:** cualitativa. `[cifra por iniciativa: pendiente de validación]`
- **Proyecto:** `proj-ilunion-booking`, `proj-cro`.

#### `m-ilunion-ds-designtime-03` — Aceleración de nuevas implementaciones
- **Tipo:** cualitativa.
- **Impacto:** creación de un design system reutilizable que acelera nuevas implementaciones y reduce el esfuerzo de diseño.
- **Confianza:** cualitativa. `[% de ahorro: pendiente de validación]`
- **Proyecto:** `proj-ilunion-booking`, `proj-cef-design-system`.

#### `m-ilunion-a11y-04` — Accesibilidad
- **Tipo:** cualitativa (conformidad).
- **Impacto:** mejora de la accesibilidad del producto a **WCAG 2.1 AA**.
- **Confianza:** alta (criterio de diseño verificable).
- **Proyecto:** `proj-ilunion-booking`.

#### `m-ilunion-consistency-05` — Consistencia del producto
- **Tipo:** cualitativa.
- **Impacto:** mayor consistencia visual y de comportamiento gracias al design system.
- **Confianza:** cualitativa.
- **Proyecto:** `proj-ilunion-booking`.

---

## ILUNION CRO (optimización continua)

Todas cualitativas (el impacto cuantitativo por iniciativa se consolida en `m-ilunion-*` y en cifras pendientes de validación):

#### `m-cro-data-optimization-01`
- **Impacto:** optimización continua del canal digital basada en datos. **Confianza:** cualitativa. **Proyecto:** `proj-cro`.

#### `m-cro-hypotheses-02`
- **Impacto:** definición y priorización de hipótesis de negocio orientadas a conversión. **Confianza:** cualitativa. **Proyecto:** `proj-cro`.

#### `m-cro-friction-03`
- **Impacto:** reducción de fricciones en el proceso de reserva. **Confianza:** cualitativa. **Proyecto:** `proj-cro`.

#### `m-cro-ux-quality-04`
- **Impacto:** incremento de la calidad de la experiencia de usuario. **Confianza:** cualitativa. **Proyecto:** `proj-cro`.

#### `m-cro-collaboration-05`
- **Impacto:** colaboración continua con negocio, desarrollo y analítica para medir el impacto de cada iniciativa. **Confianza:** cualitativa. **Proyecto:** `proj-cro`.

---

## CEF Design System

#### `m-cef-ds-fromscratch-01`
- **Impacto:** construcción de un design system completo **desde cero**. **Confianza:** cualitativa (alcance verificable). **Proyecto:** `proj-cef-design-system`.

#### `m-cef-standardization-02`
- **Impacto:** estandarización de componentes y design tokens. **Confianza:** cualitativa. `[nº de componentes: pendiente de validación]` **Proyecto:** `proj-cef-design-system`.

#### `m-cef-design-effort-03`
- **Impacto:** reducción del esfuerzo de diseño y mejora de la consistencia entre productos. **Confianza:** cualitativa. `[% de ahorro: pendiente de validación]` **Proyecto:** `proj-cef-design-system`.

#### `m-cef-scalability-04`
- **Impacto:** documentación que facilita la escalabilidad y el mantenimiento del sistema. **Confianza:** cualitativa. **Proyecto:** `proj-cef-design-system`.

---

## Oracle IT Operations

#### `m-oracle-simplification-01`
- **Impacto:** simplificación de flujos complejos para usuarios internos. **Confianza:** cualitativa. **Proyecto:** `proj-oracle`.

#### `m-oracle-ia-02`
- **Impacto:** mejora de la arquitectura de información. **Confianza:** cualitativa. **Proyecto:** `proj-oracle`.

#### `m-oracle-complexity-03`
- **Impacto:** reducción de la complejidad percibida de la interfaz. **Confianza:** cualitativa. **Proyecto:** `proj-oracle`.

---

## Paolo Pizzeria

**Sin métricas de impacto de negocio, por diseño.** Es un proyecto de aprendizaje: su valor es evidenciar la evolución en UX/UI y pensamiento de producto, no un resultado de negocio. → `proj-paolo`, `career.es.md`, `reflections.es.md`.

---

## Notas de validación

Las entradas marcadas `[pendiente de validación]` tienen un impacto real documentado pero una cifra concreta que conviene confirmar antes de publicarla como dato duro. El resultado cualitativo se mantiene siempre; solo la cifra queda en espera.
