/**
 * Uso secundario de la marca: el sello circular del manual —monograma dentro
 * de un anillo, con «GARCÍA DE LOS RÍOS» arriba y «ABOGADA» abajo—.
 * El texto y el anillo heredan el color del contexto.
 */
export function Seal({ className, title = 'Sofía García de los Ríos, abogada' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <defs>
        <path id="sello-arriba" d="M 30,100 a 70,70 0 0,1 140,0" />
        <path id="sello-abajo" d="M 32,100 a 68,68 0 0,0 136,0" />
      </defs>

      <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="1" opacity="0.5" />

      <text
        fill="currentColor"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="11"
        letterSpacing="1.6"
      >
        <textPath href="#sello-arriba" startOffset="50%" textAnchor="middle">
          GARCÍA DE LOS RÍOS
        </textPath>
      </text>

      <text
        fill="currentColor"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="12"
        letterSpacing="5"
      >
        <textPath href="#sello-abajo" startOffset="50%" textAnchor="middle">
          ABOGADA
        </textPath>
      </text>

      {/* Los dos puntos que separan ambas leyendas. */}
      <circle cx="17" cy="100" r="2" fill="currentColor" />
      <circle cx="183" cy="100" r="2" fill="currentColor" />

      <image
        href="/images/isotipo-gr.png"
        x="66"
        y="72"
        width="68"
        height="56"
      />
    </svg>
  );
}
