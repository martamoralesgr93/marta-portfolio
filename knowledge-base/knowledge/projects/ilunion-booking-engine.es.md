---
id: proj-ilunion-booking
title: "ILUNION Booking Engine — diseño de producto sobre el canal de venta directa"
type: project
layer: knowledge
lang: es
summary: "Única Product Designer en un equipo backend: rediseñé el flujo de reserva del canal directo de ILUNION Hotels combinando datos, CRO, accesibilidad y un design system, y medí el impacto en negocio. Caso oro."
personas: [ceo, head-of-design, pm, cro, recruiter]
tags: [product-design, cro, conversion, booking, travel, hospitality, funnel, accessibility, design-system, data-informed, adobe-analytics, roiback]
related: [exp-ilunion, proj-cro, proj-cef-design-system, workflows, design-principles, ai, metrics, collaboration]
metrics_refs: [m-ilunion-directchannel-conversion-01, m-ilunion-booking-friction-02, m-ilunion-ds-designtime-03, m-ilunion-a11y-04, m-ilunion-consistency-05]
canonical: true
status: draft
visibility: public
last_updated: 2026-07-14
---

# ILUNION Booking Engine

> **Caso oro.** Estructura estándar de proyecto (20 secciones), idéntica a los demás para recuperación semántica uniforme. Responde a *"¿cómo trabaja Marta cuando diseña un producto real?"*. Los conceptos recurrentes se referencian a su fuente única.

## Contexto
ILUNION Hotels opera un canal de venta directa que compite, dentro de su propia web, con las OTAs. Cada reserva por el canal directo evita una comisión y mejora el margen. Es un producto vivo, en optimización continua. Soy la **única Product Designer integrada en el equipo de Negocio Digital**, formado principalmente por desarrolladores backend: la función de diseño soy yo. → `exp-ilunion`.

## Problema
El canal directo tenía margen de mejora, pero el reto no era solo "subir la conversión": era equilibrar tres tensiones simultáneas —más reservas directas (negocio), un proceso más claro y accesible (usuario) y soluciones viables sobre un stack vivo con motor externo (Roiback)— sin sacrificar ninguna.

## Objetivos
Mejorar el rendimiento del canal directo —conversión y calidad de experiencia— reduciendo la fricción del proceso de reserva y ganando consistencia y accesibilidad en todo el recorrido. Experiencia y negocio no compiten: una reserva más clara y accesible es una reserva que se completa.

## Usuarios
Familias, parejas y viajeros de ocio, principalmente de **35 a 65 años**, que reservan directamente. Requisito no negociable por el ADN de ILUNION: **accesibilidad real (WCAG 2.1 AA)**, que sirve a todo el espectro de usuarios, no solo a quien tiene una necesidad específica.

## Stakeholders
Digital Business, Marketing, Desarrollo, Analítica Digital, CRO, agencias externas y Roiback (motor de reservas). → detalle en `collaboration.es.md`.

## Mi rol
Product Designer con autonomía **end-to-end**: identifico oportunidades, analizo datos, planteo hipótesis, diseño, colaboro durante el desarrollo, mido e itero. Además construí y mantengo el design system del producto. → método en `workflows.es.md`.

## Restricciones
Producto en producción; motor de reservas externo (Roiback) que condiciona parte del flujo; plataforma AEM; accesibilidad AA obligatoria; equipo mayoritariamente backend sin otra capa de diseño.

## Investigación
Trabajo con comportamiento real, no con supuestos: revisión de embudos, rendimiento por página e identificación de fricciones en fichas de hotel, módulos de servicios, CTAs y pasos del proceso. → método en `workflows.es.md`.

## Datos utilizados
Adobe Analytics (embudos, cuantitativo), Microsoft Clarity y Hotjar (mapas de calor y sesiones, cualitativo), datos de negocio y feedback interno. → `toolkit.es.md`.

## Hipótesis
Cuatro familias recurrentes de hipótesis de conversión: reducir fricción, mejorar la comprensión del contenido, aumentar la confianza y facilitar la toma de decisión.
El resultado agregado de estas hipótesis se refleja en la conversión del canal directo (`m-ilunion-directchannel-conversion-01`). `[cifra por hipótesis individual: pendiente de validación]`

## Decisiones
Optimización continua en vez de rediseño de golpe: priorizar oportunidades por impacto/esfuerzo, intervenir de forma iterativa y resolver la causa raíz de la inconsistencia con un design system. → criterio en `decision-frameworks.es.md`.

## Soluciones
Rediseño de páginas del flujo, mejora de fichas de hotel, optimización de módulos de servicios y CTAs, simplificación de flujos, diseño responsive y mejoras de accesibilidad. Documentación de componentes para desarrollo.

## Sistema de diseño
Construí y evoluciono el design system del producto: componentes reutilizables, tokens y documentación. Dejé de rediseñar desde cero para componer desde un sistema, lo que da consistencia y acelera cada iteración. → principio en `design-principles.es.md` (#4); ver también `proj-cef-design-system`.

## Accesibilidad
Flujo diseñado a **WCAG 2.1 AA**, verificado con auditoría cuando aplicaba. Accesibilidad como parte del producto, no como cumplimiento. → `design-principles.es.md` (#3). Métrica: `m-ilunion-a11y-04`.

## IA utilizada
Integré IA para acelerar síntesis de investigación, UX writing, documentación, organización de información, revisión crítica y generación de alternativas. La IA nunca sustituyó la decisión: fue acelerador, con criterio humano como responsable final. → `ai.es.md`.

## Resultados
Mejora de la conversión del canal directo, reducción de fricción en la reserva, mayor consistencia visual, accesibilidad AA y reducción del tiempo de diseño de nuevas funcionalidades gracias al design system. Además, mejor alineación entre negocio, diseño y desarrollo mediante un lenguaje común.
**Contribuí a llevar la conversión del canal directo de ~3,36% a ~6,5%** (casi el doble; +3,14 p.p., ≈ +93% relativo), como parte del trabajo continuo de CRO sobre el canal. A eso se suman la reducción de fricción en la reserva, la accesibilidad AA, la mayor consistencia y un design system reutilizable que acelera nuevas implementaciones. Cifras, atribución y detalle en `metrics.es.md` (`m-ilunion-*`).

## Métricas
Valores exactos en `metrics.es.md`, citados por id (no se reescriben aquí):
`m-ilunion-directchannel-conversion-01` · `m-ilunion-booking-friction-02` · `m-ilunion-ds-designtime-03` · `m-ilunion-a11y-04` · `m-ilunion-consistency-05`. Todas pendientes de cifra defendible.

## Aprendizajes
Diseñar producto no es crear pantallas bonitas: es entender un problema de negocio, decidir con datos, colaborar con perfiles muy distintos y generar impacto medible. Trabajar sin una estructura de diseño desarrolla autonomía y criterio. Y consolidó mi forma madura de trabajar con IA. → `career.es.md`, `ai.es.md`.

## Qué haría diferente
Introduciría **experimentación A/B formal antes**, para cerrar el bucle de aprendizaje con más rigor donde hoy valido con comparativas pre/post. → reflexión transversal en `reflections.es.md`.

## Preguntas relacionadas
- ¿Qué impacto ha generado? → `metrics.es.md` (pendiente cifras) + este doc.
- ¿Cómo trabaja cuando diseña un producto real? → este doc + `workflows.es.md`.
- ¿Cómo equilibra negocio, usuario y viabilidad? → `decision-frameworks.es.md`, `business-thinking.es.md`.
- ¿Cómo trabaja con desarrollo? → `collaboration.es.md`.
