import packageJson from '../../package.json';

const { version, author } = packageJson;
const thisYear = new Date().getFullYear();

const Footer = () => (
  <footer className="footer-panel">
    <span>&#169;{thisYear} {author} |</span>
    <span> Version {version} |</span>
    <span> <a href="https://github.com/adrianeyre/portfolio" rel="noopener noreferrer" target="_blank">Website Design</a></span>
  </footer>
);

export default Footer;
