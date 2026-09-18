import { contact, draftNotice, footer } from '../content/site';
import { Icon } from './ui/Icon';
import { Wordmark } from './ui/Wordmark';
import styles from './Footer.module.scss';

export function Footer() {
  const handleScrollTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Wordmark stacked />
          </div>

          {/* Nav Columns */}
          {footer.columns.map((column) => (
            <div key={column.title} className={styles.navCol}>
              <h2 className={styles.columnTitle}>{column.title}</h2>
              <ul className={styles.list}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a className={styles.link} href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className={styles.contactCol}>
            <h2 className={styles.columnTitle}>Contacto</h2>
            <ul className={styles.list}>
              <li>
                <a className={styles.contactLink} href={`mailto:${contact.email}`}>
                  <Icon name="mail" size={16} className={styles.contactIcon} />
                  <span>{contact.email}</span>
                </a>
              </li>
              <li className={styles.contactItem}>
                <Icon name="nodes" size={16} className={styles.contactIcon} />
                <span>{contact.scope}</span>
              </li>
            </ul>
          </div>
        </div>

        {draftNotice.enabled && (
          <p className={styles.notice}>
            <span className={styles.noticeLabel}>Borrador</span>
            {draftNotice.text}
          </p>
        )}

        <div className={styles.bottom}>
          <p className={styles.copyright}>{footer.copyright}</p>
          <a href="#top" className={styles.scrollTop} onClick={handleScrollTop} aria-label="Volver al inicio de la página">
            <span>Volver arriba</span>
            <Icon name="arrow" size={14} className={styles.scrollTopIcon} />
          </a>
        </div>
      </div>
    </footer>
  );
}
