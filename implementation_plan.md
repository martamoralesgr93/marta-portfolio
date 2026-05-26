# Reemplazo de carrusel por presentaciones estáticas (case‑study)

## Goal
Transformar la visualización de cada proyecto eliminando el carrusel y mostrando cada imagen individualmente con un título y una breve descripción (etiquetas) que expliquen su contexto, tal como se hace en los case studies tradicionales.

## User Review Required
> [!IMPORTANT]
> Necesitamos confirmar cómo generar los textos de los títulos y descripciones de cada imagen. ¿Quieres que usemos una generación automática basada en el nombre del archivo (p. ej., `exp-motor-desk.png` → "Vista de escritorio del motor de reservas") o prefieres proporcionar manualmente los textos para cada imagen?

## Open Questions
- **Formato de la etiqueta**: ¿Quieres `<figcaption>` simple o incluir también un `<h3>` separado para el título?
- **Orden de las imágenes**: Mantener el mismo orden que tenían en el carrusel (sí, a menos que indiques lo contrario).
- **Alt text**: Mantener los `alt` actuales o actualizarlos con descripciones más detalladas?
- **Otros proyectos**: Además de `project-ilunion` y `project-academic`, ¿existen otros `work-item` que deban modificarse ahora?

## Proposed Changes
---
### HTML (`index.html`)
- Eliminar todo el bloque `<div class="carousel-container project-visuals" …>` dentro de cada `<article class="work-item">`.
- Insertar un nuevo contenedor `<div class="project-gallery">`.
- Por cada `<img>` que estaba dentro del carrusel, crear:
  ```html
  <figure class="project-figure">
    <img src="PATH" alt="ALT" class="project-img">
    <figcaption>
      <strong>Título</strong>: Descripción breve del contexto y objetivo de la imagen.
    </figcaption>
  </figure>
  ```
- Mantener el botón **"Ver proyecto"** y la columna **`.project-stats`** sin cambios.

### CSS (`styles.scss`)
- Añadir estilos para la galería estática:
  ```scss
  /* -- 12. GALERÍA ESTÁTICA DE CASE STUDY -- */
  .project-gallery {
    display: grid;
    gap: var(--s-24);
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    margin-top: var(--s-24);
  }
  .project-figure {
    text-align: center;
  }
  .project-figure figcaption {
    margin-top: var(--s-8);
    font-size: 0.85rem;
    color: var(--text-muted);
    line-height: 1.4;
  }
  .project-figure figcaption strong {
    display: block;
    font-weight: 600;
    color: var(--text-primary);
  }
  ```
- Mantener `.project-img` (max‑width 400 px) ya existente.

### JavaScript (`script.js`)
- Eliminar o comentar la función `scrollCarousel` y cualquier listener asociado a los botones `.carousel-btn`.
- No se necesita lógica adicional para la galería, por lo que el archivo quedará sin referencias a carrusel.

## Verification Plan
- **Automated**: Ejecutar `npm run dev` y revisar que no haya errores de JavaScript en la consola.
- **Manual**: Abrir `index.html` y comprobar que cada proyecto muestra sus imágenes una a una, con sus títulos/descripciones, sin controles de navegación.
- Comprobar responsividad en móvil y escritorio.

---
*Please review the open questions and confirm the caption generation approach so we can proceed with the implementation.*
