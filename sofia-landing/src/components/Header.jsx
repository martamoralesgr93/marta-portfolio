import { useEffect, useState } from 'react';
import { cta, nav } from '../content/site';
import { Button } from './ui/Button';
import { Wordmark } from './ui/Wordmark';
import styles from './Header.module.scss';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className={[styles.header, isScrolled || isOpen ? styles.scrolled : ''].join(' ')}>
      <div className={styles.inner}>
        <a href="#inicio" aria-label="Sofía Morales, abogada. Ir al inicio">
          <Wordmark compact />
        </a>

        <nav className={styles.nav} aria-label="Navegación principal">
          {nav.map((item) => (
            <a key={item.href} className={styles.link} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <Button as="a" href="#contacto" className={styles.cta}>
            {cta}
          </Button>

          <button
            type="button"
            className={[styles.toggle, isOpen ? styles.toggleOpen : ''].join(' ')}
            aria-expanded={isOpen}
            aria-controls="menu-movil"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
            <span className="sr-only">{isOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className={styles.panel} id="menu-movil">
          <div className={styles.panelInner}>
            {[...nav, { label: cta, href: '#contacto' }].map((item) => (
              <a
                key={item.href}
                className={styles.panelLink}
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
