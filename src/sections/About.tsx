import { useMemo } from 'react';
import { FaGithub, FaLinkedin, FaSlack, FaCode, FaEnvelope } from 'react-icons/fa';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import aboutData from '../data/about.json';
import linksData from '../data/links.json';

const getIcon = (font: string) => {
  switch (font) {
    case 'brand.faGithub':   return <FaGithub />;
    case 'brand.faLinkedin': return <FaLinkedin />;
    case 'brand.faSlack':    return <FaSlack />;
    case 'free.faCode':      return <FaCode />;
    case 'free.faEnvelope':  return <FaEnvelope />;
    default:                 return <FaCode />;
  }
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scrollToContact = () =>
  document.getElementById('contact')?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  });

const About = () => {
  const contactLinks = useMemo(
    () =>
      linksData
        .filter((item) => item.image.link !== 'mailto')
        .map((item) => {
          const font = item.image.font;
          return {
            icon: getIcon(font),
            href: item.image.link,
            type: item.image.type,
            title: font.replace('brand.', '').replace('free.', ''),
          };
        }),
    []
  );

  return (
    <section id="about" className="section panel">
      <Reveal>
        <SectionHeader tag="About" title="Who I Am" />
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-copy">
          {aboutData.map((block, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: block.body }} />
          ))}
        </Reveal>
        <Reveal className="about-details" delay={0.1}>
          <div className="info-card">
            <h3>Core Strengths</h3>
            <ul>
              <li>Architecture and systems design</li>
              <li>Cloud-native and distributed systems expertise</li>
              <li>Mentoring and team enablement</li>
              <li>Technical decision-making and tradeoff assessment</li>
              <li>Delivery ownership and execution</li>
              <li>Cross-functional collaboration</li>
              <li>Code quality and review leadership</li>
              <li>Continuous improvement and automation</li>
              <li>Product empathy and stakeholder communication</li>
              <li>Incident response and resilience planning</li>
            </ul>
          </div>
          <div className="info-card accent">
            <h3>Connect with me</h3>
            <p>
              {contactLinks.map((contact) => (
                <a
                  className="social-icon"
                  key={contact.title}
                  href={contact.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={contact.title}
                >
                  {contact.icon}
                </a>
              ))}
              <button
                type="button"
                className="social-icon social-icon-button"
                onClick={scrollToContact}
                aria-label="Contact me"
              >
                <FaEnvelope />
              </button>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
