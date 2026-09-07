import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import skillsData from '../data/skills.json';
import { assetUrl } from '../utils/assetUrl';
import languageImagesData from '../data/languageImages.json';
import frameworksImagesData from '../data/frameworksImages.json';

const Skills = () => (
  <section id="skills" className="section panel">
    <Reveal>
      <SectionHeader tag="Skills" title="What I Do Best" />
    </Reveal>
    <div className="grid cards-grid">
      {skillsData.map((skill, index) => (
        <Reveal key={index} delay={index * 0.08}>
          <article className="card">
            <h3>{skill.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: skill.body }} />
          </article>
        </Reveal>
      ))}
    </div>
    <div className="skill-shelves">
      <div>
        <h3>Languages</h3>
        <div className="pill-grid">
          {languageImagesData.map((item) => (
            <span key={item.label}>
              {item.image?.filename && (
                <img className="title-image" src={assetUrl(item.image.filename)} alt="" />
              )}
              {item.label}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h3>Frameworks</h3>
        <div className="pill-grid">
          {frameworksImagesData.map((item) => (
            <span key={item.label}>
              {item.image?.filename && (
                <img className="title-image" src={assetUrl(item.image.filename)} alt="" />
              )}
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Skills;
