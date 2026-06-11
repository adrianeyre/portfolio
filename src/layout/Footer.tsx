import packageJson from '../../package.json';

const { version, author } = packageJson;
const thisYear = new Date().getFullYear();

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
    </div>
  </footer>
);

export default Footer;
