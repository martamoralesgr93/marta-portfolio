import { about } from '../content/site';
import { Eyebrow } from './ui/Eyebrow';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';
import styles from './About.module.scss';

export function About() {
  return (
    <section className={styles.section} id="sobre-sofia">
      <div className={styles.inner}>
        <Reveal>
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2 className={styles.title}>{about.title}</h2>

          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className={styles.text}>
              {paragraph}
            </p>
          ))}

          <ul className={styles.values}>
            {about.values.map((value) => (
              <li key={value.title} className={styles.value}>
                <Icon name={value.icon} size={22} className={styles.valueIcon} />
                <div>
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueText}>{value.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className={styles.media} delay={120}>
          <img
            src="/images/sobre-sofia.jpg"
            alt="Mesa de trabajo junto a una ventana, con un cuaderno, una taza y una rama de olivo."
            width="1456"
            height="1092"
          />
        </Reveal>
      </div>
    </section>
  );
}
