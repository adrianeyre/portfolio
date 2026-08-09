import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCookieBite } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const CONSENT_KEY = 'cookie-consent';

/**
 * Custom event other components (e.g. the footer) dispatch on `window`
 * to open the cookie policy modal, mirroring belvoircare's multiple
 * `[data-cookie-open]` triggers.
 */
export const OPEN_COOKIE_POLICY_EVENT = 'open-cookie-policy';

const consentStored = (): boolean => {
  try {
    return !!localStorage.getItem(CONSENT_KEY);
  } catch {
    // localStorage can throw in private-mode / sandboxed contexts.
    return false;
  }
};

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Cookie consent banner + policy modal, ported from the belvoircare site.
 *
 * The banner appears once until the visitor accepts (persisted in
 * localStorage). "Learn more" / "Cookie Policy" open an accessible,
 * focus-trapped modal describing exactly what this site stores.
 */
const CookieConsent = () => {
  const reduceMotion = usePrefersReducedMotion();
  const [showBanner, setShowBanner] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const lastFocused = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Show the banner after mount only when consent hasn't been given yet.
  useEffect(() => {
    if (!consentStored()) setShowBanner(true);
  }, []);

  const acceptConsent = () => {
    try {
      localStorage.setItem(CONSENT_KEY, 'accepted');
    } catch {
      // Ignore persistence failures — hiding the banner still works.
    }
    setShowBanner(false);
  };

  const openPolicy = useCallback(() => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    setPolicyOpen(true);
  }, []);

  const closePolicy = useCallback(() => setPolicyOpen(false), []);

  // Allow other parts of the UI (footer link) to open the policy.
  useEffect(() => {
    const handler = () => openPolicy();
    window.addEventListener(OPEN_COOKIE_POLICY_EVENT, handler);
    return () => window.removeEventListener(OPEN_COOKIE_POLICY_EVENT, handler);
  }, [openPolicy]);

  // While the modal is open: lock body scroll, focus the close button,
  // trap Tab focus, close on Escape, and restore focus on unmount.
  useEffect(() => {
    if (!policyOpen) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closePolicy();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusables = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((element) => element.offsetParent !== null);
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      body.style.overflow = previousOverflow;
      lastFocused.current?.focus?.();
    };
  }, [policyOpen, closePolicy]);

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            className="cookie-banner"
            role="region"
            aria-label="Cookie notice"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <span className="cookie-ic" aria-hidden="true">
              <FaCookieBite />
            </span>
            <div className="cookie-body">
              <p className="cookie-text">
                I use a few essential and functional items in your browser's
                local storage to keep this site working and to remember your
                preferences, such as your theme choice. There are no tracking,
                analytics or advertising cookies. See my{' '}
                <button
                  type="button"
                  className="cookie-link"
                  onClick={openPolicy}
                >
                  Cookie Policy
                </button>
                .
              </p>
              <div className="cookie-actions">
                <button
                  type="button"
                  className="cookie-btn cookie-btn-ghost"
                  onClick={openPolicy}
                >
                  Learn more
                </button>
                <button
                  type="button"
                  className="cookie-btn cookie-btn-accent"
                  onClick={acceptConsent}
                >
                  Accept
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {policyOpen && (
          <motion.div
            className="modal-overlay"
            onClick={(event) => {
              if (event.target === event.currentTarget) closePolicy();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <motion.div
              className="modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookieModalTitle"
              ref={dialogRef}
              initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="modal-head">
                <h2 id="cookieModalTitle">Cookie Policy</h2>
                <button
                  type="button"
                  className="modal-close"
                  ref={closeBtnRef}
                  onClick={closePolicy}
                  aria-label="Close cookie policy"
                >
                  <FiX aria-hidden="true" />
                </button>
              </div>
              <div className="modal-body">
                <p className="policy-updated">Last updated: August 2026</p>

                <h3>About this policy</h3>
                <p>
                  This policy explains how this website uses cookies and similar
                  technologies (such as your browser's local storage). These are
                  small pieces of data saved on your device that help a website
                  function and remember your choices.
                </p>

                <h3>How I use them</h3>
                <p>
                  I keep things deliberately minimal. This site uses only{' '}
                  <strong>essential</strong> and <strong>functional</strong>{' '}
                  storage. There are <strong>no</strong> analytics, tracking,
                  profiling or advertising cookies, and none of this information
                  is shared with third parties.
                </p>

                <h3>What I store</h3>
                <div className="cookie-table-scroll">
                  <table className="cookie-table">
                    <caption>
                      Items this site may save in your browser's local storage.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Purpose</th>
                        <th scope="col">Expiry</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <code>theme</code>
                        </td>
                        <td>Functional</td>
                        <td>
                          Remembers your chosen colour theme (light, dark or
                          system).
                        </td>
                        <td>Until you clear it</td>
                      </tr>
                      <tr>
                        <td>
                          <code>cookie-consent</code>
                        </td>
                        <td>Essential</td>
                        <td>
                          Remembers that you've acknowledged this cookie notice,
                          so it isn't shown again.
                        </td>
                        <td>Until you clear it</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3>Third-party services</h3>
                <p>
                  This site loads fonts from{' '}
                  <a
                    href="https://fonts.google.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Google Fonts
                  </a>{' '}
                  to display its typography. To deliver the fonts, Google may
                  process your IP address; it does not set cookies on this site
                  for that purpose.
                </p>

                <h3>Managing cookies and storage</h3>
                <p>
                  You can clear or block cookies and local storage at any time
                  through your browser settings — most browsers also let you do
                  this per website. Blocking functional storage won't stop the
                  site working, but your preferences (like your theme choice)
                  won't be remembered between visits.
                </p>

                <h3>Contact</h3>
                <p>
                  If you have any questions about this policy, email me at{' '}
                  <a href="mailto:info@adrianeyre.co.uk">
                    info@adrianeyre.co.uk
                  </a>
                  .
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;
