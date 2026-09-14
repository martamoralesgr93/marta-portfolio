/**
 * Puente mínimo entre las tarjetas de «¿Qué te está pasando?» y el
 * formulario: al pulsar una situación, la consulta baja con la materia ya
 * elegida. Evita montar estado global para un único dato.
 */
export const MATTER_EVENT = 'sm:matter';

export function selectMatter(matter) {
  window.dispatchEvent(new CustomEvent(MATTER_EVENT, { detail: matter }));
}

export function onMatterSelected(handler) {
  const listener = (event) => handler(event.detail);
  window.addEventListener(MATTER_EVENT, listener);
  return () => window.removeEventListener(MATTER_EVENT, listener);
}
