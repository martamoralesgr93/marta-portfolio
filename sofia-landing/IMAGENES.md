# Imágenes y vídeo

Toda la fotografía de la página es de la sesión propia de Sofía. Los bodegones
que había antes se han retirado: donde hay imagen, sale ella.

| Sección | Archivo | Toma |
|---|---|---|
| Hero | `hero.jpg` | En la mesa con el portátil, mirando a un lado |
| «Sobre Sofía» | `sofia-video.mp4` | Vídeo vertical en bucle |
| Póster del vídeo | `sofia-retrato.jpg` | De pie, brazos cruzados |
| Tarjeta «Comisiones bancarias» | `recurso-1.jpg` | Anotando sobre el Código Civil |
| Tarjeta «Separación de mutuo acuerdo» | `recurso-2.jpg` | Sentada, gafas en la mano |
| Tarjeta «Herencias» | `recurso-3.jpg` | De pie con gafas |
| Bloque de contacto | `sofia-contacto.jpg` | Leyendo delante del portátil |
| Columna del FAQ | `sofia-faq.jpg` | De pie ante la mesa |

Siete tomas distintas más el vídeo. Ninguna se repite.

## El vídeo

10 s, 720 × 1280, H.264, 3,3 MB. Sin sonido, en bucle, `playsInline` y con
`preload="metadata"`, por debajo del pliegue. Con `prefers-reduced-motion` no
se reproduce y queda el retrato fijo. No hay `ffmpeg` en el equipo, así que va
sin comprimir; bajarlo a ~1,5 MB es el siguiente paso si pesa.

## Encuadres

Todo recorta con `object-fit: cover`; manda el `object-position`:

- **Hero** (`Hero.module.scss`) — `72% 42%`. Ella queda a la derecha y el
  degradado oscuro cubre el tercio izquierdo, que es donde va el titular. La
  foto además va al 82 % de brillo: es clara de origen y el texto necesita
  contraste.
- **Contacto** (`ContactForm.module.scss`) — `50% 40%`, banda 16:9.
- **Tarjetas y FAQ** — recortes verticales centrados en ella.

## Si sustituyes alguna

```bash
sips -Z 1400 -s format jpeg -s formatOptions 82 origen.jpeg --out public/images/sofia-contacto.jpg
```
