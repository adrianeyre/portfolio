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

const STRENGTHS = [
  'Architecture and systems design',
  'Cloud-native and distributed systems',
  'Mentoring and team enablement',
  'Technical decision-making and trade-offs',
  'Delivery ownership and execution',
  'Cross-functional collaboration',
  'Code quality and review leadership',
  'Continuous improvement and automation',
  'Product empathy and stakeholder communication',
  'Incident response and resilience planning',
];

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
    <section id="about" className="section">
      <Reveal>
        <SectionHeader tag="About" title="Who I Am" />
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-copy prose">
          {aboutData.map((block, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: block.body }} />
          ))}
        </Reveal>
        <Reveal className="about-aside" delay={0.1}>
          <div className="card">
            <h3>Core strengths</h3>
            <ul className="check-list">
              {STRENGTHS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="card">
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
                    title={contact.title}
                  >
                    <span aria-hidden="true">{contact.icon}</span>
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="social-icon"
                  onClick={scrollToContact}
                  aria-label="Jump to the contact form"
                  title="Email"
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
