import { brand } from '../../content/site';
import styles from './Wordmark.module.scss';

export function Wordmark({ compact = false, stacked = false, className = '' }) {
  return (
    <span
      className={[
        styles.wordmark,
        compact ? styles.compact : '',
        stacked ? styles.stacked : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={styles.mark} aria-hidden="true" />
      <span className={styles.text}>
        <span className={styles.name}>{brand.name}</span>
        <span className={styles.role}>{brand.role}</span>
      </span>
    </span>
  );
}
