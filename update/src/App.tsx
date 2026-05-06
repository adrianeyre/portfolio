import { Fragment, useMemo } from 'react';
import { FaGithub, FaLinkedin, FaSlack, FaCode, FaEnvelope } from 'react-icons/fa';
import menuData from './data/menu.json';
import aboutData from './data/about.json';
import skillsData from './data/skills.json';
import projectsData from './data/projects.json';
import educationData from './data/education.json';
import experienceData from './data/experience.json';
import voluntaryData from './data/voluntary.json';
import codewarsData from './data/codewars.json';
import interestsData from './data/interests.json';
import linksData from './data/links.json';
import languageImagesData from './data/languageImages.json';
import frameworksImagesData from './data/frameworksImages.json';
import interestsImagesData from './data/interestsImages.json';

const getIcon = (font: string) => {
  switch (font) {
    case 'brand.faGithub':
      return <FaGithub />;
    case 'brand.faLinkedin':
      return <FaLinkedin />;
    case 'brand.faSlack':
      return <FaSlack />;
    case 'free.faCode':
      return <FaCode />;
    case 'free.faEnvelope':
      return <FaEnvelope />;
    default:
      return <FaCode />;
  }
};

const formatLabel = (path: string) => {
  const name = path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? path;
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
};

const sectionIds = menuData.map((item) => ({ id: item.link, label: item.title }));
const languages = languageImagesData.map((item) => formatLabel(item.image.filename));
const frameworks = frameworksImagesData.map((item) => formatLabel(item.image.filename));
const interestsList = interestsData.flatMap((item) => item.points ?? []);

const App = () => {
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
            title: font.replace('brand.', '').replace('free.', '')
          };
        }),
    []
  );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="page-shell">
      <header className="hero">
        <div className="hero-body">
          <span className="eyebrow">Lead Software Developer</span>
          <h1>Adrian Eyre</h1>
          <p>Building modern web experiences using React, TypeScript and cloud-native tooling.</p>
          <div className="hero-actions">
            <button onClick={() => scrollTo('projects')}>View Projects</button>
            <button className="secondary" onClick={() => scrollTo('about')}>About Me</button>
          </div>
        </div>
        <div className="hero-side">
          <div className="hero-card">
            <span>Experience</span>
            <strong>13+ years</strong>
          </div>
          <div className="hero-card">
            <span>Tech stack</span>
            <strong>React · Node · AWS</strong>
          </div>
          <div className="hero-card">
            <span>Focus</span>
            <strong>Frontend UI, APIs, CI/CD</strong>
          </div>
        </div>
      </header>

      <nav className="nav-bar">
        <div className="nav-inner">
          <div className="nav-logo">
            <img src="/images/links/photo.jpeg" alt="Adrian Eyre" />
          </div>
          <div className="nav-links">
            {sectionIds.map((section) => (
              <button 
                key={section.id} 
                onClick={() => scrollTo(section.id)}
                className={section.label === 'Interests' ? 'nav-interests' : ''}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="content">
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
                  <li>Responsive front-end architecture</li>
                  <li>Cross-platform application development</li>
                  <li>Test-driven and maintainable code</li>
                </ul>
              </div>
              <div className="info-card accent">
                <h3>Current Tools</h3>
                <p>React · TypeScript · AWS · Node · Jest · Cypress · Git</p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section panel">
          <div className="section-header">
            <span className="section-tag">Skills</span>
            <h2>What I Do Best</h2>
          </div>
          <div className="grid cards-grid">
            {skillsData.map((skill, index) => (
              <article className="card" key={index}>
                <h3>{skill.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: skill.body }} />
              </article>
            ))}
          </div>
          <div className="skill-shelves">
            <div>
              <h3>Languages</h3>
              <div className="pill-grid">{languages.map((label) => <span key={label}>{label}</span>)}</div>
            </div>
            <div>
              <h3>Frameworks</h3>
              <div className="pill-grid">{frameworks.map((label) => <span key={label}>{label}</span>)}</div>
            </div>
          </div>
        </section>

        <section id="projects" className="section panel">
          <div className="section-header">
            <span className="section-tag">Projects</span>
            <h2>Recent Work</h2>
          </div>
          <div className="grid project-grid">
            {projectsData.map((project, index) => (
              <article className="project-card" key={index}>
                <div className="project-image">
                  <img src={project.image.filename} alt={project.title} />
                </div>
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.body}</p>
                  <div className="tag-list">{project.tags?.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <div className="project-actions">
                    {project.links?.map((link) => (
                      <a key={link.text} href={link.link} target="_blank" rel="noreferrer">
                        {link.text}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section panel split-grid">
          <div>
            <div className="section-header">
              <span className="section-tag">Education</span>
              <h2>Formal Learning</h2>
            </div>
            {educationData.map((item, index) => (
              <article className="timeline-card" key={index}>
                <h3>{item.title}</h3>
                <p>{item.subTitle?.join(' · ')}</p>
                {item.points?.length ? <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}
                {item.image?.link ? (
                  <a href={item.image.link} target="_blank" rel="noreferrer">View credential</a>
                ) : null}
              </article>
            ))}
          </div>
          <div>
            <div className="section-header">
              <span className="section-tag">Experience</span>
              <h2>Work History</h2>
            </div>
            {experienceData.map((item, index) => (
              <article className="timeline-card" key={index}>
                <h3>{item.title}</h3>
                <p>{item.subTitle?.join(' · ')}</p>
                <p>{item.body}</p>
                <ul>{item.points?.map((point) => <li key={point}>{point}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section id="voluntary" className="section panel">
          <div className="section-header">
            <span className="section-tag">Voluntary Work</span>
            <h2>Giving Back</h2>
          </div>
          <div className="grid cards-grid">
            {voluntaryData.map((item, index) => (
              <article className="card" key={index}>
                <h3>{item.title}</h3>
                <p>{item.subTitle?.join(' · ')}</p>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="codewars" className="section panel">
          <div className="section-header">
            <span className="section-tag">Codewars</span>
            <h2>Authored Katas</h2>
          </div>
          <div className="grid project-grid">
            {codewarsData.slice(0, 6).map((item, index) => (
              <article className="project-card" key={index}>
                <div className="project-image">
                  <img src={item.image.filename} alt={item.title} />
                </div>
                <div className="project-body">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <div className="tag-list">{item.tags?.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <div className="project-actions">
                    {item.links?.map((link) => (
                      <a key={link.text} href={link.link} target="_blank" rel="noreferrer">
                        {link.text}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="interests" className="section panel">
          <div className="section-header">
            <span className="section-tag">Interests</span>
            <h2>Personal Passions</h2>
          </div>
          <div className="split-grid">
            <div className="about-copy">
              {interestsData.map((item, index) => (
                <Fragment key={index}>
                  <h3>{item.title}</h3>
                  <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
                </Fragment>
              ))}
            </div>
            <div className="pill-grid interest-grid">
              {interestsList.map((interest) => (
                <span key={interest}>{interest}</span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-panel">
        <div>
          <h3>Connect with me</h3>
        </div>
        <div className="social-links">
          {contactLinks.map((contact) => (
            <a key={contact.title} href={contact.href} target="_blank" rel="noreferrer" aria-label={contact.title}>
              {contact.icon}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default App;
