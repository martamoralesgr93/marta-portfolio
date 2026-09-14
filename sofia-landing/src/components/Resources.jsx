import { resources } from '../content/site';
import { Eyebrow } from './ui/Eyebrow';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';
import styles from './Resources.module.scss';

export function Resources() {
  return (
    <section className={styles.section} id="recursos">
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <Eyebrow>{resources.eyebrow}</Eyebrow>
          <span className={styles.all}>
            {resources.allLabel}
            <Icon name="arrow" size={16} />
          </span>
        </Reveal>

        <ul className={styles.cards}>
          {resources.cards.map((card, index) => (
            <Reveal as="li" key={card.title} className={styles.card} delay={index * 90}>
              <div className={styles.media}>
                <img src={card.image} alt={card.alt} width="896" height="560" loading="lazy" />
                <span className={styles.tag}>{card.tag}</span>
              </div>

              <div className={styles.body}>
                <h3 className={styles.title}>{card.title}</h3>
                <Icon name="arrow" size={20} className={styles.arrow} />
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal as="p" className={styles.pending} delay={200}>
          Los recursos están en preparación: cada tarjeta enlazará a su guía cuando se publique.
        </Reveal>
      </div>
    </section>
  );
}
