import { FaGithub } from 'react-icons/fa';
import packageJson from '../../package.json';
import { OPEN_COOKIE_POLICY_EVENT } from '../components/CookieConsent';
import { OPEN_ACCESSIBILITY_EVENT } from '../components/AccessibilityStatement';

const { version, author } = packageJson;
const thisYear = new Date().getFullYear();

const openCookiePolicy = () =>
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_POLICY_EVENT));

const openAccessibility = () =>
  window.dispatchEvent(new CustomEvent(OPEN_ACCESSIBILITY_EVENT));

const Footer = () => (
  <footer className="footer-panel">
    <div className="footer-inner">
      <span className="footer-credit">&#169; {thisYear} {author}</span>
      <span className="footer-sep" aria-hidden="true">·</span>
      <span className="footer-version">Version {version}</span>
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
      <button type="button" className="footer-legal-link" onClick={openAccessibility}>
        Accessibility
      </button>
    </div>
  </footer>
);

export default Footer;
