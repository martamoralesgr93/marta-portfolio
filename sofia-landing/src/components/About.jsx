import { about } from '../content/site';
import { Eyebrow } from './ui/Eyebrow';
import { Icon } from './ui/Icon';
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
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <h2 className={styles.title}>{about.title}</h2>
          </Reveal>

          {about.paragraphs.map((paragraph) => (
            <Reveal key={paragraph.slice(0, 24)} as="p" className={styles.text} delay={80}>
              {paragraph}
            </Reveal>
          ))}

          <Reveal as="ul" className={styles.values} delay={140}>
            {about.values.map((value) => (
              <li key={value.title} className={styles.valueItem}>
                <Icon name={value.icon} size={22} className={styles.valueIcon} />
                <div>
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueText}>{value.text}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
