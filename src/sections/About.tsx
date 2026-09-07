import { useMemo } from 'react';
import { FaGithub, FaLinkedin, FaSlack, FaCode, FaEnvelope } from 'react-icons/fa';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import aboutData from '../data/about.json';
import linksData from '../data/links.json';
import { scrollToSection } from '../utils/scrollToSection';

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

/**
 * Each of these links is an icon and nothing else, so the icon's accessible
 * name is the only thing a screen reader can announce. The previous name was
 * the raw icon identifier ("faGithub"), which describes the sprite rather than
 * the destination (WCAG 2.4.4 Link Purpose).
 */
const LINK_NAMES: Record<string, string> = {
  'brand.faGithub': 'GitHub profile',
  'brand.faLinkedin': 'LinkedIn profile',
  'brand.faSlack': 'Tech Nottingham Slack',
  'free.faCode': 'Codewars profile',
  'free.faEnvelope': 'Email',
};

const scrollToContact = () => scrollToSection('contact');

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
            title: LINK_NAMES[font] ?? font.replace(/^(brand|free)\.fa/, ''),
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
            {/* A list, because that is what a row of sibling links is. */}
            <ul className="social-list">
              {contactLinks.map((contact) => (
                <li key={contact.title}>
                  <a
                    className="social-icon"
                    href={contact.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${contact.title} (opens in a new tab)`}
                  >
                    <span aria-hidden="true">{contact.icon}</span>
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="social-icon social-icon-button"
                  onClick={scrollToContact}
                  aria-label="Jump to the contact form"
                >
                  <span aria-hidden="true">
                    <FaEnvelope />
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
