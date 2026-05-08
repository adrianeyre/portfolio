import SectionHeader from '../components/SectionHeader';
import TitleImage from '../components/TitleImage';
import educationData from '../data/education.json';
import experienceData from '../data/experience.json';

const Education = () => (
  <section id="education" className="section panel split-grid">
    <div>
      <SectionHeader tag="Education" title="Formal Learning" />
      {educationData.map((item, index) => (
        <article className="timeline-card" key={index}>
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
      ))}
    </div>
    <div>
      <SectionHeader tag="Experience" title="Work History" />
      {experienceData.map((item, index) => (
        <article className="timeline-card" key={index}>
          <h3>
            <TitleImage filename={item.image?.filename} link={item.image?.link} alt={item.title} />
            {item.title}
          </h3>
          {item.subTitle && item.subTitle.map((subTitleItem) => <p key={subTitleItem}>{subTitleItem}</p>)}
          <p>{item.body}</p>
          <p>{item.images?.map((image) => (
            <img key={image.filename} className="image-item" src={image.filename} alt={image.title} />
          ))}</p>
          <ul>{item.points?.map((point) => <li key={point}>{point}</li>)}</ul>
        </article>
      ))}
    </div>
  </section>
);

export default Education;
