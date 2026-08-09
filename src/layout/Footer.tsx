import packageJson from '../../package.json';
import { OPEN_COOKIE_POLICY_EVENT } from '../components/CookieConsent';

const { version, author } = packageJson;
const thisYear = new Date().getFullYear();

const openCookiePolicy = () =>
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_POLICY_EVENT));

const Footer = () => (
  <footer className="footer-panel">
    <div className="footer-inner">
      <span className="footer-credit">&#169; {thisYear} {author}</span>
      <span className="footer-sep" aria-hidden="true">·</span>
      <span className="footer-version">Version {version}</span>
      <span className="footer-sep" aria-hidden="true">·</span>
      <a
        href="https://github.com/adrianeyre/portfolio"
        rel="noopener noreferrer"
        target="_blank"
      >
        Website Design
      </a>
      <span className="footer-sep" aria-hidden="true">·</span>
      <button type="button" className="footer-legal-link" onClick={openCookiePolicy}>
        Cookie Policy
      </button>
    </div>
  </footer>
);

export default Footer;
