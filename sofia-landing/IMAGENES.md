# Imágenes

Cinco fotos, cinco huecos. **Ninguna se repite.**

| Origen | Archivo | Dónde sale |
|---|---|---|
| Escritorio oscuro, cuaderno verde, pluma y olivo | `hero.jpg` | Fondo a sangre del hero |
| Mesa de madera con taza, cuaderno y jarrón | `sobre-sofia.jpg` | «Sobre Sofía» |
| Sobre con ventanilla y gafas sobre nogal | `recurso-1.jpg` | Tarjeta «Comisiones bancarias» |
| Dos tazas con una rama de olivo entre ellas | `recurso-2.jpg` | Tarjeta «Separación de mutuo acuerdo» |
| Libros atados con cordel sobre travertino | `recurso-3.jpg` | Tarjeta «Herencias» |

## Qué se quitó para no repetir

Tres secciones que antes llevaban una segunda copia de otra foto:

- **FAQ** — la columna del titular va sin imagen y algo más estrecha, para que
  el acordeón gane ancho.
- **«Antes de llegar a juicio»** — fondo plano en marfil alterno, sin la
  textura de travertino.
- **Bloque de contacto** — sin la banda de imagen sobre el titular.

Las tres funcionan sin foto: eran refuerzo, no información.

## Si aparecen más imágenes

Tres huecos siguen sin foto a propósito, y el código está preparado para
ellos. Prompts, con la cabecera de estilo común de la serie:

> editorial photography, natural window light, warm desaturated palette of
> ivory, sand and deep green, shallow depth of field, calm and uncluttered,
> soft shadows, no people, no text, no logos

1. **FAQ**, vertical 3:4 — `A closed notebook and a glass of water on a pale
   stone surface, soft morning light from the left.`
2. **Antes de llegar a juicio**, apaisada 3:2 — `Two chairs facing each other
   across a small wooden table in a quiet room, warm afternoon light.`
3. **Contacto**, 16:9 — `An open notebook and a fountain pen on a linen
   tablecloth, late light and long shadows.`

## Encuadres

Los dos huecos grandes recortan con `object-fit: cover`; lo que manda es el
`object-position`:

- **Hero** (`Hero.module.scss`) — `65% 45%`. La foto trae el lado izquierdo en
  sombra, que es donde va el titular.
- **Sobre Sofía** (`About.module.scss`) — `62% 60%`.

## Si sustituyes alguna

```bash
sips -Z 1600 -s format jpeg -s formatOptions 82 origen.webp --out public/images/hero.jpg
```
