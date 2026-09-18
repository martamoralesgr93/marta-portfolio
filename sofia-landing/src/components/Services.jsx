import { services } from '../content/site';
import { Eyebrow } from './ui/Eyebrow';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';
import styles from './Services.module.scss';

export function Services() {
  return (
    <section className={styles.section} id="servicios">
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <Eyebrow>{services.eyebrow}</Eyebrow>
          <h2 className={styles.title}>{services.title}</h2>
        </Reveal>

        <div className={styles.grid}>
          <Reveal className={styles.mediaFrame}>
            <div className={styles.media}>
              <img
                src="/images/sofia-servicios.jpg"
                alt="Sofía de pie en su despacho."
                width="1100"
                height="1210"
                loading="lazy"
              />
            </div>
          </Reveal>

          <ul className={styles.items}>
            {services.items.map((item, index) => (
              <Reveal as="li" key={item.title} className={styles.card} delay={index * 80}>
                <Icon name={item.icon} size={28} className={styles.icon} />
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.text}>{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
