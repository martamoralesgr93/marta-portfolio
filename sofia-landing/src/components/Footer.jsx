import { brand, contact, draftNotice, footer } from '../content/site';
import { Icon } from './ui/Icon';
import { Seal } from './ui/Seal';
import { Wordmark } from './ui/Wordmark';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <Wordmark stacked />

            <p className={styles.pillars}>
              {brand.pillars.map((pillar, index) => (
                <span key={pillar}>
                  {index > 0 && <span aria-hidden="true"> · </span>}
                  {pillar}
                </span>
              ))}
            </p>

            <p className={styles.brandText}>{brand.tagline}</p>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title}>
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

          <div>
            <h2 className={styles.columnTitle}>Contacto</h2>
            <ul className={styles.list}>
              <li>
                <a className={styles.link} href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </li>
              <li className={styles.contactItem}>
                <Icon name="nodes" size={16} />
                {contact.scope}
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
          <Seal className={styles.seal} />
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
