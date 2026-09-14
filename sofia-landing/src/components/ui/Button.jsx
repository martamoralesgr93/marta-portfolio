import { Icon } from './Icon';
import styles from './Button.module.scss';

const variants = {
  primary: styles.primary,
  outlineLight: styles.outlineLight,
  outlineDark: styles.outlineDark,
};

export function Button({
  as: Tag = 'button',
  variant = 'primary',
  withArrow = true,
  full = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [styles.button, variants[variant], full ? styles.full : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...rest}>
      <span>{children}</span>
      {withArrow && <Icon name="arrow" size={18} className={styles.icon} />}
    </Tag>
  );
}
