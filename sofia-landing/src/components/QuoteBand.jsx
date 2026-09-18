import { quote } from '../content/site';
import { Reveal } from './ui/Reveal';
import styles from './QuoteBand.module.scss';

export function QuoteBand() {
  return (
    <section className={styles.section} aria-label="Sofía García de los Ríos, en una frase">
      <div className={styles.media}>
        <img src="/images/sofia-cita.jpg" alt={quote.imageAlt} width="1800" height="1200" loading="lazy" />
      </div>

      <Reveal className={styles.inner}>
        <blockquote>
          <p className={styles.text}>{quote.text}</p>
        </blockquote>
        <hr className={styles.rule} />
        <span className={styles.attribution}>{quote.attribution}</span>
      </Reveal>
    </section>
  );
}
