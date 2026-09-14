import { cta, hero } from '../content/site';
import { Button } from './ui/Button';
import { Eyebrow } from './ui/Eyebrow';
import { Reveal } from './ui/Reveal';
import styles from './Hero.module.scss';

export function Hero() {
  return (
    <section className={styles.hero} id="inicio">
      <div className={styles.media}>
        {/* Escritorio, no retrato: el brief descarta fotografías de Sofía. */}
        <img src="/images/hero.jpg" alt="" width="1376" height="768" />
      </div>

      <span className={styles.watermark} aria-hidden="true" />

      <div className={styles.inner}>
        <Reveal className={styles.content}>
          <Eyebrow onDark>{hero.eyebrow}</Eyebrow>

          <h1 className={styles.title}>
            {hero.titleLead}
            <span className={styles.titleSecond}>
              {hero.titleMid}
              <span className={styles.titleAccent}>{hero.titleAccent}</span>
            </span>
          </h1>

          <p className={styles.lead}>{hero.lead}</p>

          <div className={styles.actions}>
            <Button as="a" href="#contacto">
              {cta}
            </Button>
          </div>

          <p className={styles.microcopy}>{hero.microcopy}</p>
        </Reveal>
      </div>
    </section>
  );
}
