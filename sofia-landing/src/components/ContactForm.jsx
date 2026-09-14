import { useEffect, useRef, useState } from 'react';
import { contact, contactSection } from '../content/site';
import { onMatterSelected } from '../lib/matterSelection';
import { buildMailtoUrl, deliveryMode, sendEnquiry } from '../lib/sendEnquiry';
import { Button } from './ui/Button';
import { Eyebrow } from './ui/Eyebrow';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';
import styles from './ContactForm.module.scss';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  matter: '',
  message: '',
  consent: false,
  company: '', // honeypot: invisible para personas, tentador para bots
};

const MIN_MESSAGE = 20;

function validate(values) {
  const errors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Dime cómo te llamas para poder dirigirme a ti.';
  }

  if (!values.email.trim()) {
    errors.email = 'Necesito un correo para poder contestarte.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Revisa el correo: parece que falta algo.';
  }

  if (values.message.trim().length < MIN_MESSAGE) {
    errors.message = 'Cuéntame un poco más para poder orientarte.';
  }

  if (!values.consent) {
    errors.consent = 'Necesito tu permiso para tratar tus datos y responderte.';
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle · submitting · sent · error
  const [submitError, setSubmitError] = useState('');
  const fieldRefs = useRef({});

  const registerField = (name) => (node) => {
    fieldRefs.current[name] = node;
  };

  // Llegada desde una tarjeta de «¿Qué te está pasando?»: materia ya elegida.
  useEffect(
    () =>
      onMatterSelected((matter) => {
        setValues((current) => ({ ...current, matter }));
        setStatus('idle');
      }),
    [],
  );

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));

    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      fieldRefs.current[firstError]?.focus();
      return;
    }

    if (values.company) {
      setStatus('sent'); // trampa de spam: no se envía nada
      return;
    }

    setStatus('submitting');

    try {
      await sendEnquiry(values, { to: contact.email });
      setStatus('sent');
    } catch (error) {
      setStatus('error');
      setSubmitError(
        `${error.message} Puedes escribirme directamente a ${contact.email}.`,
      );
    }
  };

  const describedBy = (name, hintId) =>
    [errors[name] ? `${name}-error` : null, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <section className={styles.section} id="contacto">
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <Eyebrow onDark>{contactSection.eyebrow}</Eyebrow>

          <h2 className={styles.title}>
            {contactSection.titleLead}
            <span className={styles.titleAccent}>{contactSection.titleAccent}</span>
          </h2>

          <hr className={styles.rule} />

          <p className={styles.lead}>{contactSection.lead}</p>
          <p className={styles.note}>{contactSection.note}</p>
        </Reveal>

        <Reveal className={styles.card} delay={120}>
          {status === 'sent' ? (
            <div className={styles.success} role="status" aria-live="polite">
              <Icon name="check" size={34} className={styles.successIcon} />
              <h3 className={styles.successTitle}>
                {deliveryMode === 'mailto'
                  ? 'Tu consulta ya está redactada.'
                  : 'He recibido tu consulta.'}
              </h3>
              <p className={styles.successText}>
                {deliveryMode === 'mailto'
                  ? 'Se ha abierto tu gestor de correo con todo lo que me has contado. Solo te queda darle a enviar.'
                  : `Te contestaré a ${values.email} explicándote qué opciones veo y con un presupuesto adaptado a tu caso.`}
              </p>

              {deliveryMode === 'mailto' && (
                <a className={styles.successLink} href={buildMailtoUrl(values, contact.email)}>
                  Abrir de nuevo el correo
                </a>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="name">
                    Nombre
                  </label>
                  <input
                    className={[styles.input, errors.name ? styles.invalid : ''].join(' ')}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={handleChange}
                    ref={registerField('name')}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={describedBy('name')}
                  />
                  {errors.name && (
                    <span className={styles.error} id="name-error" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">
                    Correo
                  </label>
                  <input
                    className={[styles.input, errors.email ? styles.invalid : ''].join(' ')}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    ref={registerField('email')}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={describedBy('email')}
                  />
                  {errors.email && (
                    <span className={styles.error} id="email-error" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="phone">
                    Teléfono <span className={styles.optional}>(opcional)</span>
                  </label>
                  <input
                    className={styles.input}
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={handleChange}
                    ref={registerField('phone')}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="matter">
                    Sobre qué <span className={styles.optional}>(opcional)</span>
                  </label>
                  <select
                    className={styles.select}
                    id="matter"
                    name="matter"
                    value={values.matter}
                    onChange={handleChange}
                    ref={registerField('matter')}
                  >
                    <option value="">Elige una opción</option>
                    {contactSection.matters.map((matter) => (
                      <option key={matter} value={matter}>
                        {matter}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={[styles.field, styles.full].join(' ')}>
                  <label className={styles.label} htmlFor="message">
                    Cuéntame tu caso
                  </label>
                  <textarea
                    className={[styles.textarea, errors.message ? styles.invalid : ''].join(' ')}
                    id="message"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    ref={registerField('message')}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={describedBy('message', 'message-hint')}
                    placeholder="Qué ha ocurrido, desde cuándo, con quién y qué te gustaría conseguir."
                  />
                  {errors.message ? (
                    <span className={styles.error} id="message-error" role="alert">
                      {errors.message}
                    </span>
                  ) : (
                    <span className={styles.hint} id="message-hint">
                      Con tus palabras: no hace falta que uses términos jurídicos.
                    </span>
                  )}
                </div>
              </div>

              <div className="sr-only" aria-hidden="true">
                <label htmlFor="company">No rellenes este campo</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.company}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.consent}>
                <input
                  className={styles.checkbox}
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={values.consent}
                  onChange={handleChange}
                  ref={registerField('consent')}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={describedBy('consent', 'consent-text')}
                />
                <span className={styles.consentText} id="consent-text">
                  Acepto que Sofía Morales trate mis datos con la única finalidad de responder a
                  esta consulta. {contactSection.privacyText}
                  {errors.consent && (
                    <span className={styles.error} id="consent-error" role="alert">
                      {errors.consent}
                    </span>
                  )}
                </span>
              </div>

              <Button className={styles.submit} full disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Enviando…' : 'Enviar mi consulta'}
              </Button>

              <p className={styles.formNote}>
                {deliveryMode === 'mailto'
                  ? 'Se abrirá tu gestor de correo con la consulta ya redactada para que la envíes.'
                  : 'Te responderé personalmente al correo que me dejes.'}
              </p>

              {submitError && (
                <p className={styles.formError} role="alert">
                  {submitError}
                </p>
              )}
            </form>
          )}
        </Reveal>

        <Reveal className={styles.aside} delay={80}>
          <div className={styles.help}>
            <h3 className={styles.helpTitle}>{contactSection.helpTitle}</h3>
            <ul className={styles.helpList}>
              {contactSection.helpItems.map((item) => (
                <li key={item} className={styles.helpItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <a className={styles.mailLink} href={`mailto:${contact.email}`}>
            <Icon name="mail" size={18} />
            {contact.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
