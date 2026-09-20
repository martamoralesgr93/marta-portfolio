import { about } from '../content/site';
import { Eyebrow } from './ui/Eyebrow';
import { Reveal } from './ui/Reveal';
import styles from './About.module.scss';

export function About() {
  return (
    <section className={styles.section} id="sobre-sofia">
      <div className={styles.inner}>
        <Reveal className={styles.mediaFrame}>
          <div className={styles.media}>
            <img
              src="/images/sofia-sobre.jpg"
              alt="Sofía García de los Ríos de pie ante su mesa de trabajo."
              width="1300"
              height="1945"
              loading="lazy"
            />
          </div>
        </Reveal>

        <div className={styles.content}>
          <Reveal>
            <Eyebrow onDark>{about.eyebrow}</Eyebrow>
            <h2 className={styles.title}>{about.title}</h2>
          </Reveal>

          {about.paragraphs.map((paragraph) => (
            <Reveal key={paragraph.slice(0, 24)} as="p" className={styles.text} delay={80}>
              {paragraph}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
