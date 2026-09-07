import Reveal from '../components/Reveal';
import { scrollToSection } from '../utils/scrollToSection';

const Hero = () => (
  <header className="hero">
    <Reveal className="hero-body">
      <span className="eyebrow">Lead Software Developer</span>
      <h1>Adrian Eyre</h1>
      <p>Building modern applications using AI and cloud-native tooling.</p>
      <div className="hero-actions">
        <button type="button" onClick={() => scrollToSection('projects')}>
          View Projects
        </button>
        <button type="button" className="secondary" onClick={() => scrollToSection('about')}>
          About Me
        </button>
      </div>
    </Reveal>
    <Reveal className="hero-side" delay={0.12}>
      <div className="hero-card">
        <span>Experience</span>
        <strong>15+ years</strong>
      </div>
      <div className="hero-card">
        <span>Tech stack</span>
        <strong>Typescript · Python · AWS · AI Tooling</strong>
      </div>
      <div className="hero-card">
        <span>Focus</span>
        <strong>Leadership · Architecture · Team Management</strong>
      </div>
    </Reveal>
  </header>
);

export default Hero;
