import styles from './Eyebrow.module.scss';

export function Eyebrow({ onDark = false, as: Tag = 'span', children, className = '' }) {
  return (
    <Tag className={[onDark ? styles.onDark : styles.eyebrow, className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  );
}
