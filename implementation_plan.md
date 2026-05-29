# Plan de Refinamiento Visual: Liquid Glass, Contrastes y Botones Interactivos

Este plan detalla el refinamiento de la identidad visual del portafolio, mejorando la legibilidad sobre el fondo oscuro y perfeccionando los efectos tridimensionales del estilo **Liquid Glass** y el comportamiento de los botones.

---

## User Review Required

> [!IMPORTANT]
> **Paleta de Rosas y Brillos:** Para el estado activo (click) de los botones y los brillos tridimensionales, propongo utilizar un rosa neón premium (`#ff4b91` o HSL `338° 100% 64%`) que tiene excelente legibilidad sobre fondo oscuro y contrasta de manera espectacular. ¿Te parece bien este tono de rosa o prefieres otro matiz específico (más fucsia, magenta o pastel)?

---

## Proposed Changes

### 1. Estructura de las Tarjetas Bento (`.work-summary` en `styles.scss`)
Para maximizar el efecto tridimensional de **Liquid Glass** y asegurar una legibilidad impecable sobre el fondo oscuro:
* **Fondo:** Cambiaremos el fondo translúcido a `rgba(15, 15, 15, 0.6)` para que el texto blanco de alto contraste sobre él se lea con total claridad sin perder la transparencia del cristal.
* **Efecto Blur:** Incrementaremos el desenfoque a un nivel muy pronunciado con `backdrop-filter: blur(48px) saturate(220%)`.
* **Bordes y Brillos:** Aumentaremos el contraste de los brillos en los bordes y las esquinas para elevar la refracción 3D:
  * El borde externo pasará de `rgba(255, 255, 255, 0.12)` a `rgba(255, 255, 255, 0.18)` para un borde de alta fidelidad.
  * Agregaremos un brillo superior interno más fuerte en el `box-shadow` (`inset 0 2px 4px rgba(255,255,255,0.25)`) y un brillo en hover que simula el haz de luz incidiendo en el cristal.
  * Ajustaremos las esferas de luz interiores (`&::before` y `&::after`) para tener un brillo ligeramente más nítido y agregaremos un destello rosa/azul en las capas.

### 2. Botones de Acción (`.read-more-btn` y `.about-cv-download-link` en `styles.scss`)
Aplicaremos la estética purista de **Liquid Glass** siguiendo estas especificaciones exactas:
* **Estado Normal (`none`)**:
  * **Sin Relleno:** Fondo totalmente transparente (`background: transparent !important;`).
  * **Borde Fino Blanco:** Un sutil borde blanco de alta definición (`border: 1px solid rgba(255, 255, 255, 0.25) !important;`).
  * **Texto Blanco:** Tipografía Satoshi en blanco puro (`color: #ffffff !important;`).
  * **Efecto de Cristal:** Un sutil blur de fondo (`backdrop-filter: blur(12px) !important;`) para mantener el look del cristal sobre las imágenes de fondo.
* **Estado de Hover**:
  * **Iluminación:** Se iluminarán mediante un fondo translúcido suave (`background: rgba(255, 255, 255, 0.12) !important;`), un borde blanco de alto contraste (`border-color: rgba(255, 255, 255, 0.9) !important;`) y una sombra de aura blanca brillante (`box-shadow: 0 0 20px rgba(255, 255, 255, 0.25) !important;`).
  * Mantendremos la animación sutil de traslación vertical (`translateY(-3px)`) y el barrido de brillo de alta gama.
* **Estado Click/Activo (`:active`)**:
  * **Stroke y Texto Rosas:** Tanto el borde como el texto pasarán instantáneamente a rosa brillante (`color: #ff4b91 !important; border-color: #ff4b91 !important;`).
  * **Glow Rosa:** Un aura/sombra de luz rosa de alta intensidad alrededor del botón (`box-shadow: 0 0 25px rgba(255, 75, 145, 0.45) !important;`) con un fondo con tinte rosa ultra-sutil (`background: rgba(255, 75, 145, 0.08) !important;`).
  * Reducción táctil rápida (`scale(0.97) translateY(1px)`).

---

## Verification Plan

### Manual Verification
1. Compilar localmente con `npm run build-local`.
2. Abrir `index.html` en el navegador.
3. Verificar visualmente el incremento de legibilidad en las tarjetas Bento y que el blur sea súper pronunciado y limpio.
4. Interactuar con las tarjetas del portafolio en estado normal, hover y click.
5. Comprobar los tres estados del botón "Ver caso de estudio":
   * **Normal**: Sin fondo, borde fino blanco y texto blanco.
   * **Hover**: El botón se ilumina con un brillo blanco suave y elegante.
   * **Click (Active)**: El stroke y el texto se iluminan en un rosa neón vibrante de alta gama.
6. Validar que el botón de descarga del CV siga esta misma lógica unificada de diseño.
