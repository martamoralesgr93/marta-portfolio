# Sofía Morales Abogada — landing

Landing de una sola página en **React + Sass**, construida sobre el brief
estratégico de UX/UI y UX Writing. Su único objetivo de conversión es que una
persona **escriba un email contando su caso** (§9).

La pregunta que guía cada decisión no es «cómo hacemos una web de abogados
moderna», sino **«cómo conseguimos que alguien con un problema legal se atreva
a escribirle a Sofía»** (§33).

## Arrancar

```bash
npm install
npm run dev     # http://localhost:5175
npm run build   # dist/
npm run preview
```

## Estructura

El orden responde al user journey del brief (§11): problema → claridad →
confianza → transparencia → contacto.

| Bloque | Qué resuelve |
|---|---|
| Hero | Qué hace, cómo trabaja y qué debe hacer la persona (§13). El microcopy adelanta que la respuesta incluye opciones y presupuesto. |
| `#problemas` | «¿Te está pasando algo de esto?» (§14). Seis frases en primera persona; cada una baja al formulario **con la materia ya elegida**. |
| `#servicios` | Las cuatro áreas (§15). Explicación llana arriba; el vocabulario jurídico, como segunda capa. |
| `#sin-juicio` | El diferencial (§16): «No todos los conflictos tienen que acabar en un juicio». La sigla MASC aparece al final, no en el titular. |
| `#proceso` | Los cinco pasos (§17), cerrando en «Tú decides cómo quieres continuar». |
| `#sobre-sofia` | «La abogacía también puede ser cercana». Su retrato en vídeo, en bucle y sin sonido. |
| `#recursos` | Tres tarjetas con imagen y etiqueta, como en el mockup. **Los contenidos aún no existen**: las tarjetas no enlazan y la sección lo dice. |
| `#faq` | Seis preguntas (§12). La primera es el precio, que es la barrera real. |
| `#contacto` | «No necesitas saber de leyes para pedir ayuda» (§32) y el formulario. |

## Dónde se edita cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Cualquier texto de la página | `src/content/site.js` |
| Color, tipografía, espacio, sombras, breakpoints | `src/styles/_tokens.scss` |
| Mixins compartidos (`container`, `mq`, `eyebrow`, `heading`…) | `src/styles/_mixins.scss` |
| Estilos globales y variables CSS en `:root` | `src/styles/_base.scss` |
| Estilo de un bloque concreto | `src/components/<Bloque>.module.scss` |
| Cómo se envía la consulta | `src/lib/sendEnquiry.js` |

## Identidad

Los tokens salen de la carta de identidad visual, no de una interpretación:

| Rol | Nombre | HEX |
|---|---|---|
| Superficies oscuras y titulares | Verde botella | `#0F2D26` |
| Base | Marfil | `#F5F2EB` |
| Apoyo cálido y acento sobre oscuro | Arena | `#DCC8B0` |
| Superficies y bordes | Gris cálido | `#8A897F` |
| Acento | Dorado | `#C8A063` |

Tipografía: **Playfair Display** para titulares e identidad visual, **Inter**
para textos y comunicación.

El **sello de uso secundario** —monograma en un anillo con «Sofía Morales»
arriba y «Abogada» abajo— vive en `src/components/ui/Seal.jsx` y cierra el pie.
La firma verbal «Derecho · Claridad · Confianza» acompaña al logotipo apilado.

El isotipo real (`public/brand/isotipo-sm.png`) se pinta con `mask` y
`background-color: currentColor`, así que hereda el color del contexto —verde
botella sobre marfil, marfil sobre verde botella— sin necesidad de dos
archivos. El mismo recurso alimenta la filigrana del hero y los favicons
(`public/favicon.png` y `apple-touch-icon.png`, generados sobre verde botella).
El logotipo completo queda en `public/brand/logo-completo.jpg` como referencia.

## Sistema de diseño

Un único origen de verdad en `src/styles/`:

- **`_tokens.scss`** — paleta, escala tipográfica fluida, escala de espacio de
  base 8, radios, sombras, curvas de movimiento y breakpoints.
- **`_mixins.scss`** — `mq()`, `container()`, `section-padding`, `eyebrow()`,
  `heading()`, `focus-ring()`, `underline-grow()`, `visually-hidden`.
- **`system.scss`** — punto de entrada único de los módulos:

  ```scss
  @use '../styles/system' as *;

  .card {
    @include container;
    padding: space('lg');
    background: $marfil;

    @include mq('lg') { padding: space('xl'); }
  }
  ```

Cada componente lleva su `*.module.scss` (CSS Modules), así que ninguna clase
se filtra fuera de su bloque. Los tokens también se exponen como custom
properties (`--sm-petroleo`, `--sm-acento`…) para lo que se resuelva en tiempo
de ejecución.

### Decisiones que conviene no deshacer sin querer

- **Fotografía propia, nunca de stock.** El §18 del brief descartaba fotos de
  Sofía porque no las había; con sesión propia, su retrato en vídeo abre «Sobre
  Sofía» y su imagen acompaña al formulario y al FAQ. El resto son objetos y
  espacios. Ni abogados de archivo, ni apretones de manos, ni juzgados,
  balanzas o columnas. Ninguna imagen se repite: ver `IMAGENES.md`.
- **Contraste del acento.** El ocre es claro por naturaleza: sobre él el texto
  va en **carbón** (5,4:1), nunca en blanco (2,4:1, ilegible). Como texto, el
  acento sobre marfil usa `$acento-deep` (#8A6A2F, 4,6:1) y sobre verde oscuro
  `$acento-light` (#DCC08A, 8,1:1). El `$acento` puro (#C09A5B) queda para
  fondos de botón, filetes y subrayados. Si se prefiere la vía terracota que el
  brief también contempla (§23), `_tokens.scss` trae `$arcilla`,
  `$arcilla-deep` y `$arcilla-light`.
- **Iconografía.** Trazo uniforme y formas abstractas: capas, documento, rutas,
  puntos de encuentro, conversación. `src/components/ui/Icon.jsx` no incluye
  ningún símbolo jurídico literal.
- **Un solo CTA.** «Cuéntame tu caso» (§21) vive en `content/site.js` como la
  constante `cta` y se reutiliza en cabecera, proceso y menú móvil.
- **Movimiento.** Solo una aparición de 700 ms al entrar en pantalla. Se anula
  con `prefers-reduced-motion` y, si la página se carga en segundo plano, el
  contenido parte de visible: nunca depende de que la animación se ejecute.

## El formulario

`src/lib/sendEnquiry.js` tiene dos modos y no hay que tocar los componentes
para cambiar de uno a otro:

1. **Sin configurar nada (por defecto):** compone un `mailto:` con el asunto y
   el cuerpo ya redactados —nombre, contacto, materia, caso y registro del
   consentimiento— y abre el gestor de correo. Funciona sin backend.
2. **Con `VITE_CONTACT_ENDPOINT`:** hace `POST` del JSON de la consulta al
   endpoint (Formspree, Resend, una función serverless propia…) y muestra la
   confirmación dentro de la página. Copia `.env.example` a `.env.local`.

Validación en cliente con mensajes en la voz de la marca, foco automático al
primer campo con error, `aria-invalid` / `aria-describedby`, casilla de
consentimiento obligatoria y un honeypot contra bots.

## Antes de publicar

`src/content/site.js` marca con `PENDIENTE` todo lo que falta por confirmar y
que **no debe salir a producción tal cual**:

- Correo real de Sofía (ahora `hola@sofiamoralesabogada.com`).
- Ámbito geográfico y si atiende online.
- Formación, colegiación y experiencia concretas para «Sobre Sofía» (§12).
- Aviso legal, política de privacidad y política de cookies.
- Poner `draftNotice.enabled` a `false` cuando lo anterior esté resuelto.

La página no afirma credenciales, especialización, plazos de respuesta,
tarifas ni resultados: el Estatuto General de la Abogacía condiciona esas
menciones y el brief las deja fuera hasta poder acreditarlas. La transparencia
económica se resuelve explicando **cómo** funciona el presupuesto, no poniendo
precios.
