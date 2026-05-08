import { useMemo } from 'react';
import { FaGithub, FaLinkedin, FaSlack, FaCode, FaEnvelope } from 'react-icons/fa';
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
      <div className="section-header">
        <span className="section-tag">About</span>
        <h2>Who I Am</h2>
      </div>
      <div className="about-grid">
        <div className="about-copy">
          {aboutData.map((block, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: block.body }} />
          ))}
        </div>
        <div className="about-details">
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
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
