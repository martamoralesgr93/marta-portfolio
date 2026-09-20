import { projects } from '../content/site';
import { Eyebrow } from './ui/Eyebrow';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';
import styles from './Projects.module.scss';

export function Projects() {
  return (
    <section className={styles.section} id="proyectos">
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <Eyebrow>{projects.eyebrow}</Eyebrow>
          <h2 className={styles.title}>{projects.title}</h2>
          <p className={styles.lead}>{projects.lead}</p>
          {projects.isPlaceholder && (
            <p className={styles.draft}>
              Casos y recomendaciones de ejemplo, pendientes de sustituir por los reales.
            </p>
          )}
        </Reveal>

        <ol className={styles.items}>
          {projects.items.map((item, index) => (
            <Reveal as="li" key={item.title} className={styles.item} delay={index * 90}>
              <article className={styles.case}>
                <span className={styles.tag}>{item.tag}</span>
                <h3 className={styles.caseTitle}>{item.title}</h3>

                <dl className={styles.facts}>
                  <div className={styles.fact}>
                    <dt className={styles.factLabel}>Qué ocurría</dt>
                    <dd className={styles.factText}>{item.context}</dd>
                  </div>
                  <div className={styles.fact}>
                    <dt className={styles.factLabel}>Qué hice</dt>
                    <dd className={styles.factText}>{item.work}</dd>
                  </div>
                  <div className={styles.fact}>
                    <dt className={styles.factLabel}>Cómo acabó</dt>
                    <dd className={styles.factText}>{item.outcome}</dd>
                  </div>
                </dl>
              </article>

              <figure className={styles.rec}>
                <span className={styles.recLabel}>{projects.recLabel}</span>
                <blockquote className={styles.recQuote}>
                  {item.recommendation.text}
                </blockquote>
                <figcaption className={styles.recBy}>
                  <span className={styles.recName}>{item.recommendation.name}</span>
                  <span className={styles.recRole}>{item.recommendation.role}</span>
                  {item.recommendation.linkedin && (
                    <a
                      className={styles.recLink}
                      href={item.recommendation.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver perfil en LinkedIn
                      <Icon name="arrow" size={14} />
                    </a>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
