import { mediation } from '../content/site';
import { Eyebrow } from './ui/Eyebrow';
import { Reveal } from './ui/Reveal';
import styles from './Mediation.module.scss';

export function Mediation() {
  return (
    <section className={styles.section} id="sin-juicio">
      <div className={styles.inner}>
        <Reveal>
          <Eyebrow>{mediation.eyebrow}</Eyebrow>
          <h2 className={styles.title}>{mediation.title}</h2>

          {mediation.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className={styles.text}>
              {paragraph}
            </p>
          ))}

          <p className={styles.note}>{mediation.note}</p>
        </Reveal>

        <Reveal as="ul" className={styles.options} delay={120}>
          {mediation.options.map((option) => (
            <li key={option.title} className={styles.option}>
              <h3 className={styles.optionTitle}>{option.title}</h3>
              <p className={styles.optionText}>{option.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
