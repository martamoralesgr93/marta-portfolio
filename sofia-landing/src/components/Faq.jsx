import { useState } from 'react';
import { faq } from '../content/site';
import { Eyebrow } from './ui/Eyebrow';
import { Reveal } from './ui/Reveal';
import styles from './Faq.module.scss';

export function Faq() {
  const [openItems, setOpenItems] = useState(() => new Set([0]));

  const toggle = (index) => {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section className={styles.section} id="faq">
      <div className={styles.inner}>
        <Reveal className={styles.mediaFrame}>
          <div className={styles.media}>
            <img
              src="/images/sofia-faq.jpg"
              alt="Sofía revisando unos papeles en su mesa, con las gafas en la mano."
              width="1027"
              height="1531"
              loading="lazy"
            />
          </div>
        </Reveal>

        <div className={styles.content}>
          <Reveal>
            <Eyebrow>{faq.eyebrow}</Eyebrow>
            <h2 className={styles.title}>{faq.title}</h2>
          </Reveal>

          <Reveal as="ul" className={styles.list} delay={100}>
          {faq.items.map((item, index) => {
            const isOpen = openItems.has(index);

            return (
              <li
                key={item.question}
                className={[styles.item, isOpen ? styles.open : ''].filter(Boolean).join(' ')}
              >
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-trigger-${index}`}
                  onClick={() => toggle(index)}
                >
                  {item.question}
                  <span className={styles.indicator} aria-hidden="true" />
                </button>

                <div
                  className={[styles.panel, isOpen ? styles.panelOpen : ''].filter(Boolean).join(' ')}
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                >
                  <div className={styles.panelInner}>
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
