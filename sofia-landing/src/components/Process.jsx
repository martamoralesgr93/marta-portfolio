import { process } from '../content/site';
import { Eyebrow } from './ui/Eyebrow';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';
import styles from './Process.module.scss';

export function Process() {
  const lastIndex = process.steps.length - 1;

  return (
    <section className={styles.section} id="proceso">
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <Eyebrow onDark>{process.eyebrow}</Eyebrow>
          <h2 className={styles.title}>{process.title}</h2>
        </Reveal>

        <ol className={styles.steps}>
          {process.steps.map((step, index) => (
            <Reveal as="li" key={step.number} className={styles.step} delay={index * 100}>
              <div className={styles.marker}>
                <span className={styles.number}>{step.number}</span>
                {index === lastIndex ? (
                  <Icon name="arrow" size={20} className={styles.arrow} />
                ) : (
                  <span className={styles.connector} aria-hidden="true" />
                )}
              </div>

              <Icon name={step.icon} size={26} className={styles.icon} />
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
