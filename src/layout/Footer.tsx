import { FaGithub } from 'react-icons/fa';
import packageJson from '../../package.json';
import {
  OPEN_ACCESSIBILITY_EVENT,
  OPEN_CHANGELOG_EVENT,
  OPEN_COOKIE_POLICY_EVENT,
  OPEN_PRIVACY_POLICY_EVENT,
  OPEN_TERMS_EVENT,
} from '../components/overlayEvents';

const { version, author } = packageJson;
const thisYear = new Date().getFullYear();

const openCookiePolicy = () =>
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_POLICY_EVENT));

const openPrivacyPolicy = () =>
  window.dispatchEvent(new CustomEvent(OPEN_PRIVACY_POLICY_EVENT));

const openTerms = () =>
  window.dispatchEvent(new CustomEvent(OPEN_TERMS_EVENT));

const openAccessibility = () =>
  window.dispatchEvent(new CustomEvent(OPEN_ACCESSIBILITY_EVENT));

const openChangelog = () =>
  window.dispatchEvent(new CustomEvent(OPEN_CHANGELOG_EVENT));

const Footer = () => (
  <footer className="footer-panel">
    <div className="footer-inner">
      <span className="footer-credit">&#169; {thisYear} {author}</span>
      <span className="footer-sep" aria-hidden="true">·</span>
      <button
        type="button"
        className="footer-legal-link footer-version"
        onClick={openChangelog}
      >
        Version: {version}
      </button>
      <span className="footer-sep" aria-hidden="true">·</span>
      <a
        className="footer-repo-link"
        href="https://github.com/adrianeyre/portfolio"
        rel="noopener noreferrer"
        target="_blank"
      >
        {/* Decorative: the link's own text already says where it goes. */}
        <FaGithub aria-hidden="true" />
        Website Design
      </a>
      <span className="footer-sep" aria-hidden="true">·</span>
      <button type="button" className="footer-legal-link" onClick={openCookiePolicy}>
        Cookie Policy
      </button>
      <span className="footer-sep" aria-hidden="true">·</span>
      <button type="button" className="footer-legal-link" onClick={openPrivacyPolicy}>
        Privacy Policy
      </button>
      <span className="footer-sep" aria-hidden="true">·</span>
      <button type="button" className="footer-legal-link" onClick={openTerms}>
        Terms and Conditions
      </button>
      <span className="footer-sep" aria-hidden="true">·</span>
      <button type="button" className="footer-legal-link" onClick={openAccessibility}>
        Accessibility
      </button>
    </div>
  </footer>
);

export default Footer;
