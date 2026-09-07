import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import TitleImage from '../components/TitleImage';
import educationData from '../data/education.json';
import { assetUrl } from '../utils/assetUrl';
import experienceData from '../data/experience.json';

const Education = () => (
  <section id="education" className="section panel split-grid">
    <div>
      <Reveal>
        <SectionHeader tag="Education" title="Formal Learning" />
      </Reveal>
      {educationData.map((item, index) => (
        <Reveal key={index} delay={index * 0.08}>
          <article className="timeline-card">
            <h3>
              <TitleImage filename={item.image?.filename} link={item.image?.link} alt={item.title} />
              {item.title}
            </h3>
            {item.subTitle && item.subTitle.map((subTitleItem) => <p key={subTitleItem}>{subTitleItem}</p>)}
            {item.points?.length ? <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}
            {item.image?.link ? (
              <a href={item.image.link} target="_blank" rel="noreferrer">View credential</a>
            ) : null}
          </article>
        </Reveal>
      ))}
    </div>
    <div id="experience">
      <Reveal>
        <SectionHeader tag="Experience" title="Work History" />
      </Reveal>
      {experienceData.map((item, index) => (
        <Reveal key={index} delay={index * 0.08}>
          <article className="timeline-card">
            <h3>
              <TitleImage filename={item.image?.filename} link={item.image?.link} alt={item.title} />
              {item.title}
            </h3>
            {item.subTitle && item.subTitle.map((subTitleItem) => <p key={subTitleItem}>{subTitleItem}</p>)}
            <p>{item.body}</p>
            <p>{item.images?.map((image) => (
              <img key={image.filename} className="image-item" src={assetUrl(image.filename)} alt={image.title} />
            ))}</p>
            <ul>{item.points?.map((point) => <li key={point}>{point}</li>)}</ul>
          </article>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Education;
