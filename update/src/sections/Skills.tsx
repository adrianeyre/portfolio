import skillsData from '../data/skills.json';
import languageImagesData from '../data/languageImages.json';
import frameworksImagesData from '../data/frameworksImages.json';

const Skills = () => (
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
        <div className="pill-grid">
          {languageImagesData.map((item) => (
            <span key={item.label}>
              {item.image?.filename && <img className="title-image" src={item.image.filename} alt={item.label} />}
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
              {item.image?.filename && <img className="title-image" src={item.image.filename} alt={item.label} />}
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Skills;
