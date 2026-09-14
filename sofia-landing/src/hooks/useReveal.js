import { useEffect, useRef, useState } from 'react';

/**
 * Aparición al entrar en pantalla. Una sola vez, sin parallax ni efectos:
 * «el movimiento debe ser lento y útil» (brief §8).
 *
 * Si la página se carga en segundo plano el navegador congela las
 * transiciones, así que en ese caso partimos de visible: el contenido nunca
 * depende de que una animación llegue a ejecutarse.
 */
const startsHidden = () => typeof document !== 'undefined' && document.hidden;

export function useReveal({ threshold = 0.18, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(startsHidden);

  useEffect(() => {
    if (isVisible) return undefined;

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible, threshold, rootMargin]);

  return [ref, isVisible];
}
