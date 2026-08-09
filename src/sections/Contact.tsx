import { FormEvent, useRef, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';

const RECIPIENT = 'info@adrianeyre.co.uk';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Errors {
  email?: string;
  subject?: string;
}

const Contact = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!email.trim()) {
      next.email = 'Please enter your email address.';
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = 'Please enter a valid email address, e.g. name@example.com.';
    }
    if (!subject.trim()) {
      next.subject = 'Please enter a subject.';
    }
    return next;
  };

  // Validates a single field against current state, returning a partial error map.
  const validateField = (field: keyof Errors): Errors => {
    const all = validate();
    return { [field]: all[field] };
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);

    if (found.email) {
      emailRef.current?.focus();
      return;
    }
    if (found.subject) {
      subjectRef.current?.focus();
      return;
    }

    const body = `Hi Adrian,\n\n\n\nYou can reply to me at: ${email.trim()}`;
    const href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(
      subject.trim(),
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setSent(true);
  };

  return (
    <section id="contact" className="section panel">
      <div className="contact-grid">
        <Reveal className="contact-intro">
          <SectionHeader tag="Contact" title="Get in Touch" />
          <p>
            Have a question, an opportunity, or just want to say hello? Drop your
            email and a subject below — your own email app opens with the message
            pre-filled, ready for you to review and send to me.
          </p>
          <a className="contact-direct" href={`mailto:${RECIPIENT}`}>
            <FaEnvelope aria-hidden="true" />
            <span>{RECIPIENT}</span>
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="contact-email">
                Your email address <span aria-hidden="true">*</span>
              </label>
              <input
                id="contact-email"
                ref={emailRef}
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                required
                value={email}
                placeholder="name@example.com"
                aria-required="true"
                aria-invalid={errors.email ? 'true' : undefined}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
                }}
                onBlur={() => setErrors((e) => ({ ...e, ...validateField('email') }))}
              />
              {errors.email && (
                <span className="form-error" id="contact-email-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="contact-subject">
                Subject <span aria-hidden="true">*</span>
              </label>
              <input
                id="contact-subject"
                ref={subjectRef}
                type="text"
                name="subject"
                required
                value={subject}
                placeholder="What would you like to talk about?"
                aria-required="true"
                aria-invalid={errors.subject ? 'true' : undefined}
                aria-describedby={
                  errors.subject ? 'contact-subject-error' : undefined
                }
                onChange={(event) => {
                  setSubject(event.target.value);
                  if (errors.subject)
                    setErrors((e) => ({ ...e, subject: undefined }));
                }}
                onBlur={() => setErrors((e) => ({ ...e, ...validateField('subject') }))}
              />
              {errors.subject && (
                <span
                  className="form-error"
                  id="contact-subject-error"
                  role="alert"
                >
                  {errors.subject}
                </span>
              )}
            </div>

            <div className="form-alert" role="note">
              <span className="form-alert-ic" aria-hidden="true">
                <FaEnvelope />
              </span>
              <div className="form-alert-body">
                <strong>This does not send from the website.</strong>
                <span>
                  Pressing the button opens <em>your own email app</em> with
                  everything pre-filled — you just review and hit send.
                </span>
              </div>
            </div>

            <button type="submit" className="contact-submit">
              <FaEnvelope aria-hidden="true" />
              Open email to send
            </button>

            {sent && (
              <p className="contact-status" role="status" aria-live="polite">
                Your email app should have opened with your message ready to
                send.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
