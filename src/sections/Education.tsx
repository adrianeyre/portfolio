import { FiArrowUpRight } from 'react-icons/fi';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import TitleImage from '../components/TitleImage';
import educationData from '../data/education.json';
import { parseMeta } from '../utils/meta';

/** Qualifications and certifications as a grid of small, even cards. */
const Education = () => (
  <section id="education" className="section">
    <Reveal>
      <SectionHeader tag="Education" title="Formal Learning" />
    </Reveal>
    <ul className="cred-grid">
      {educationData.map((item, index) => {
        const meta = parseMeta(item.subTitle);
        return (
          <li key={item.title}>
            <Reveal className="cred-card" delay={(index % 3) * 0.06}>
              <div className="cred-head">
                <TitleImage filename={item.image?.filename} link={item.image?.link} alt={item.title} />
                <h3>{item.title}</h3>
              </div>
              {meta.length ? (
                <ul className="cred-meta">
                  {meta.map((line) => (
                    <li key={line.value}>
                      {line.label ? <span className="meta-label">{line.label}</span> : null}
                      {line.value}
                    </li>
                  ))}
                </ul>
              ) : null}
              {item.points?.length ? (
                <ul className="cred-points">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
              {item.image?.link ? (
                <a className="cred-link" href={item.image.link} target="_blank" rel="noreferrer">
                  View credential
                  <FiArrowUpRight aria-hidden="true" />
                  <span className="visually-hidden"> for {item.title} (opens in a new tab)</span>
                </a>
              ) : null}
            </Reveal>
          </li>
        );
      })}
    </ul>
  </section>
);

export default Education;
