import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCookieBite } from 'react-icons/fa';
import Modal from './Modal';
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

/**
 * Cookie consent banner + policy modal, ported from the belvoircare site.
 *
 * The banner appears once until the visitor accepts (persisted in
 * localStorage). "Learn more" / "Cookie Policy" open the shared, focus-trapped
 * {@link Modal} describing exactly what this site stores.
 */
const CookieConsent = () => {
  const reduceMotion = usePrefersReducedMotion();
  const [showBanner, setShowBanner] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

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

  const openPolicy = useCallback(() => setPolicyOpen(true), []);
  const closePolicy = useCallback(() => setPolicyOpen(false), []);

  // Allow other parts of the UI (footer link) to open the policy.
  useEffect(() => {
    const handler = () => openPolicy();
    window.addEventListener(OPEN_COOKIE_POLICY_EVENT, handler);
    return () => window.removeEventListener(OPEN_COOKIE_POLICY_EVENT, handler);
  }, [openPolicy]);

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
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: 'easeOut' }}
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

      <Modal
        open={policyOpen}
        onClose={closePolicy}
        title="Cookie Policy"
        titleId="cookieModalTitle"
        closeLabel="Close cookie policy"
      >
        <p className="policy-updated">Last updated: August 2026</p>

        <h3>About this policy</h3>
        <p>
          This policy explains how this website uses cookies and similar
          technologies (such as your browser's local storage). These are small
          pieces of data saved on your device that help a website function and
          remember your choices.
        </p>

        <h3>How I use them</h3>
        <p>
          I keep things deliberately minimal. This site uses only{' '}
          <strong>essential</strong> and <strong>functional</strong> storage.
          There are <strong>no</strong> analytics, tracking, profiling or
          advertising cookies, and none of this information is shared with third
          parties.
        </p>

        <h3>What I store</h3>
        <div className="cookie-table-scroll" tabIndex={0} role="region" aria-label="Browser storage used by this site, scrollable">
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
                  Remembers your chosen colour theme (light, dark or system).
                </td>
                <td>Until you clear it</td>
              </tr>
              <tr>
                <td>
                  <code>cookie-consent</code>
                </td>
                <td>Essential</td>
                <td>
                  Remembers that you've acknowledged this cookie notice, so it
                  isn't shown again.
                </td>
                <td>Until you clear it</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Third-party services</h3>
        <p>
          This site loads fonts from{' '}
          <a href="https://fonts.google.com" target="_blank" rel="noreferrer">
            Google Fonts
          </a>{' '}
          to display its typography. To deliver the fonts, Google may process
          your IP address; it does not set cookies on this site for that
          purpose.
        </p>

        <h3>Managing cookies and storage</h3>
        <p>
          You can clear or block cookies and local storage at any time through
          your browser settings — most browsers also let you do this per
          website. Blocking functional storage won't stop the site working, but
          your preferences (like your theme choice) won't be remembered between
          visits.
        </p>

        <h3>Contact</h3>
        <p>
          If you have any questions about this policy, email me at{' '}
          <a href="mailto:info@adrianeyre.co.uk">info@adrianeyre.co.uk</a>.
        </p>
      </Modal>
    </>
  );
};

export default CookieConsent;
