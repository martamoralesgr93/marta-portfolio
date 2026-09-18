import { useState } from 'react';
import { mediation } from '../content/site';
import { Eyebrow } from './ui/Eyebrow';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';
import styles from './Mediation.module.scss';

const optionIcons = ['chat', 'nodes', 'document', 'route'];

export function Mediation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeOption = mediation.options[activeIndex] || mediation.options[0];

  return (
    <section className={styles.section} id="sin-juicio">
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <Eyebrow onDark>{mediation.eyebrow}</Eyebrow>
          <h2 className={styles.title}>{mediation.title}</h2>
          {mediation.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className={styles.leadText}>
              {paragraph}
            </p>
          ))}
        </Reveal>

        <div className={styles.interactiveGrid}>
          {/* Selector Grid / Tabs */}
          <Reveal className={styles.selectorColumn} delay={80}>
            <div className={styles.selectorHeader}>
              <span className={styles.selectorHint}>Selecciona una opción para ver la estrategia y tu beneficio:</span>
            </div>

            <div className={styles.cardsList} role="tablist" aria-label="Vías de solución extrajudicial">
              {mediation.options.map((option, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="tab"
                    id={`tab-${option.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${option.id}`}
                    className={`${styles.cardTab} ${isActive ? styles.activeTab : ''}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className={styles.tabTop}>
                      <span className={styles.tabNumber}>{option.number}</span>
                      <Icon name={optionIcons[index] || 'check'} size={20} className={styles.tabIcon} />
                    </div>
                    <div className={styles.tabBody}>
                      <h3 className={styles.tabTitle}>{option.title}</h3>
                      <p className={styles.tabSubtitle}>{option.subtitle}</p>
                    </div>
                    <div className={styles.tabFooter}>
                      <span className={styles.tabTag}>{option.tag}</span>
                      <span className={styles.tabActionText}>
                        {isActive ? 'Viendo detalles' : 'Haz clic para ver'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Active Option Showcase Panel */}
          <Reveal className={styles.showcaseColumn} delay={140}>
            <div
              id={`panel-${activeOption.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeOption.id}`}
              className={styles.showcaseCard}
            >
              <div className={styles.showcaseHead}>
                <div className={styles.showcaseBadge}>
                  <Icon name={optionIcons[activeIndex]} size={20} />
                  <span>VÍA {activeOption.number}</span>
                </div>
                <span className={styles.showcaseTag}>{activeOption.tag}</span>
              </div>

              <h3 className={styles.showcaseTitle}>{activeOption.title}</h3>
              <p className={styles.showcaseSubtitle}>{activeOption.subtitle}</p>

              <div className={styles.showcaseBlocks}>
                <div className={styles.blockItem}>
                  <div className={styles.blockHeader}>
                    <Icon name="check" size={18} className={styles.actionIcon} />
                    <h4 className={styles.blockTitle}>QUÉ HAGO YO (ABOGADA)</h4>
                  </div>
                  <p className={styles.blockText}>{activeOption.action}</p>
                </div>

                <div className={styles.blockItem}>
                  <div className={styles.blockHeader}>
                    <Icon name="shield" size={18} className={styles.benefitIcon} />
                    <h4 className={styles.blockTitle}>TU BENEFICIO DIRECTO</h4>
                  </div>
                  <p className={styles.blockText}>{activeOption.benefit}</p>
                </div>
              </div>

              <div className={styles.showcaseFooter}>
                <a href="#contacto" className={styles.ctaButton}>
                  <span>{mediation.ctaText}</span>
                  <Icon name="arrow" size={16} />
                </a>
              </div>
            </div>

            <div className={styles.noteBox}>
              <Icon name="info" size={18} className={styles.noteIcon} />
              <p className={styles.noteText}>{mediation.note}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
