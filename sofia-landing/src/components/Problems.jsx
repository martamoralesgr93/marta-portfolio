import { problems } from '../content/site';
import { selectMatter } from '../lib/matterSelection';
import { Button } from './ui/Button';
import { Eyebrow } from './ui/Eyebrow';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';
import styles from './Problems.module.scss';

export function Problems() {
  return (
    <section className={styles.section} id="problemas">
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <Eyebrow>{problems.eyebrow}</Eyebrow>
          <h2 className={styles.title}>{problems.title}</h2>
          <p className={styles.lead}>{problems.lead}</p>
        </Reveal>

        <ul className={styles.items}>
          {problems.items.map((item, index) => (
            <Reveal as="li" key={item.matter} delay={index * 70}>
              <a
                className={styles.link}
                href="#contacto"
                onClick={() => selectMatter(item.matter)}
              >
                <span className={styles.text}>{item.text}</span>
                <Icon name="arrow" size={20} className={styles.arrow} />
                <span className="sr-only">Escribir a Sofía sobre esta situación</span>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal className={styles.footer} delay={140}>
          <Button as="a" href="#contacto">
            {problems.cta}
          </Button>
          <span className={styles.footerNote}>
            Si tu situación no está en la lista, cuéntamela igualmente.
          </span>
        </Reveal>
      </div>
    </section>
  );
}
