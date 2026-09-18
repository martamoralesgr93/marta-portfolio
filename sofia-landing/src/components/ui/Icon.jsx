/**
 * Set de iconos lineales, trazo uniforme y extremos redondeados (brief §8).
 * Formas abstractas y funcionales: capas, documento, rutas, puntos de
 * encuentro, conversación. Sin balanzas, mazos, escudos ni sellos.
 */

const paths = {
  layers: (
    <>
      <path d="M12 3.5 3.5 8 12 12.5 20.5 8 12 3.5Z" />
      <path d="M3.5 12.4 12 16.9l8.5-4.5" />
      <path d="M3.5 16.6 12 21.1l8.5-4.5" />
    </>
  ),
  document: (
    <>
      <path d="M13.5 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7.5L13.5 3Z" />
      <path d="M13.5 3v4.5H18" />
      <path d="M9.5 13h5M9.5 16.5h3.5" />
    </>
  ),
  converge: (
    <>
      <path d="M3 5.5c5.5 0 6 6.5 11 6.5M3 18.5c5.5 0 6-6.5 11-6.5" />
      <path d="M14 12h7" />
      <path d="M18.5 9.5 21 12l-2.5 2.5" />
    </>
  ),
  nodes: (
    <>
      <circle cx="6.5" cy="7" r="2.5" />
      <circle cx="17.5" cy="7" r="2.5" />
      <circle cx="12" cy="17.5" r="2.5" />
      <path d="M9 7h6M7.8 9.3l2.9 5.9M16.2 9.3l-2.9 5.9" />
    </>
  ),
  chat: (
    <>
      <path d="M4.5 5h15a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-5.5 4V6a1 1 0 0 1 1-1Z" />
      <path d="M8.5 10h7" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="6.5" r="2.5" />
      <circle cx="18" cy="17.5" r="2.5" />
      <path d="M8.5 6.5h5.5a3 3 0 0 1 0 6h-4a3 3 0 0 0 0 6h5.5" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.2 2.5 2.5 4.5-5" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  limit: (
    <>
      <path d="M3.5 12h11" />
      <path d="M10.5 8.5 14 12l-3.5 3.5" />
      <path d="M19 4.5v15" />
    </>
  ),
  arrow: <path d="M4 12h15m-5.5-5.5L19 12l-5.5 5.5" />,
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1" />
      <path d="m3.6 6.5 8.4 6 8.4-6" />
    </>
  ),
  star: (
    <>
      <path d="M12 2.5l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 16.4l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 2.5z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </>
  ),
};

export function Icon({ name, size = 24, className, ...rest }) {
  const path = paths[name];
  if (!path) return null;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {path}
    </svg>
  );
}
