import { useEffect, useState } from 'react';
import { cta } from '../content/site';
import { Button } from './ui/Button';
import { Wordmark } from './ui/Wordmark';
import styles from './Header.module.scss';

const menuItems = [
  { label: 'Servicios', href: '#servicios', num: '01' },
  { label: 'Cómo trabajo', href: '#proceso', num: '02' },
  { label: 'Sobre Sofía', href: '#sobre-sofia', num: '03' },
  { label: 'Recursos para ti', href: '#recursos', num: '04' },
  { label: 'Precios y dudas', href: '#faq', num: '05' },
  { label: 'Contacto', href: '#contacto', num: '06' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
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
    <header className={[styles.header, isScrolled ? styles.scrolled : '', isOpen ? styles.open : ''].join(' ')}>
      <div className={styles.inner}>
        <a href="#inicio" className={styles.brandLink} aria-label="García de los Ríos, abogada. Ir al inicio">
          <Wordmark compact />
        </a>

        <div className={styles.actions}>
          <Button as="a" href="#contacto" className={styles.cta}>
            {cta}
          </Button>

          <button
            type="button"
            className={[styles.toggle, isOpen ? styles.toggleOpen : ''].join(' ')}
            aria-expanded={isOpen}
            aria-controls="menu-desplegable"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className={styles.toggleText}>{isOpen ? 'Cerrar' : 'Menú'}</span>
            <div className={styles.hamburger}>
              <span />
              <span />
              <span />
            </div>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div className={styles.panel} id="menu-desplegable" onClick={(e) => e.stopPropagation()}>
            <div className={styles.panelHeader}>
              <Wordmark compact />
              <button
                type="button"
                className={styles.closeBtn}
                aria-label="Cerrar menú"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <nav className={styles.panelNav} aria-label="Menú principal desplegable">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  className={styles.panelLink}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.linkNum}>{item.num}</span>
                  <span className={styles.linkLabel}>{item.label}</span>
                </a>
              ))}
            </nav>

            <div className={styles.panelFooter}>
              <p className={styles.footerTagline}>García de los Ríos · Abogada</p>
              <a className={styles.footerEmail} href="mailto:hola@garciadelosrios.com">
                hola@garciadelosrios.com
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
