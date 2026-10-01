import { useCallback, useEffect, useState } from 'react';
import Modal from './Modal';
import { OPEN_TERMS_EVENT } from './overlayEvents';

/**
 * The site's terms and conditions, rendered in the shared {@link Modal} and
 * opened from the footer by {@link OPEN_TERMS_EVENT}.
 *
 * The licensing section mirrors the repository: the source is MIT-licensed,
 * the bundled fonts carry the SIL Open Font License, and the written content
 * and images stay mine.
 */
const TermsAndConditions = () => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_TERMS_EVENT, handler);
    return () => window.removeEventListener(OPEN_TERMS_EVENT, handler);
  }, []);

  return (
    <Modal
      open={open}
      onClose={close}
      title="Terms and Conditions"
      titleId="termsModalTitle"
      closeLabel="Close terms and conditions"
    >
      <p className="policy-updated">Last updated: October 2026</p>

      <h3>About these terms</h3>
      <p>
        These terms cover your use of adrianeyre.co.uk, the personal portfolio
        of Adrian Eyre. By using the site you accept them. If you do not agree,
        please do not use the site.
      </p>

      <h3>Using the site</h3>
      <p>
        You are welcome to browse, read and share links to anything here. Please
        do not try to disrupt the site, gain unauthorised access to it, or use
        it for anything unlawful.
      </p>

      <h3>Code and content</h3>
      <ul>
        <li>
          <strong>Source code</strong> — the code behind this site is open
          source under the{' '}
          <a
            href="https://github.com/adrianeyre/portfolio/blob/master/LICENSE"
            target="_blank"
            rel="noreferrer"
          >
            MIT License
          </a>
          , and you may reuse it on those terms.
        </li>
        <li>
          <strong>Fonts</strong> — the bundled typefaces are licensed under the
          SIL Open Font License, which travels with them.
        </li>
        <li>
          <strong>Everything else</strong> — the written content, photographs
          and personal details are mine. Please ask before reproducing them
          beyond a short quotation with a link back.
        </li>
        <li>
          <strong>Trademarks</strong> — names and logos of other companies,
          products and technologies belong to their owners and appear only to
          describe my experience with them.
        </li>
      </ul>

      <h3>Accuracy</h3>
      <p>
        I keep the information here as accurate and up to date as I reasonably
        can, but it is provided as it is, for general information. It is not an
        offer of work or professional advice, and I cannot guarantee that the
        site will always be available or free of errors.
      </p>

      <h3>Other websites</h3>
      <p>
        Links to other websites, and the embedded YouTube player, are provided
        for convenience. I do not control those services and am not responsible
        for their content or how they handle your information.
      </p>

      <h3>Liability</h3>
      <p>
        As far as the law allows, I am not liable for any loss arising from your
        use of this site or your reliance on anything in it. Nothing in these
        terms limits liability that cannot be limited by law.
      </p>

      <h3>Privacy</h3>
      <p>
        How the site handles personal information is set out in the Privacy
        Policy and the Cookie Policy, both linked in the footer.
      </p>

      <h3>Changes and governing law</h3>
      <p>
        I may update these terms from time to time; the date at the top shows
        when they last changed. They are governed by the law of England and
        Wales.
      </p>

      <h3>Contact</h3>
      <p>
        Questions about these terms are welcome at{' '}
        <a href="mailto:info@adrianeyre.co.uk">info@adrianeyre.co.uk</a>.
      </p>
    </Modal>
  );
};

export default TermsAndConditions;
