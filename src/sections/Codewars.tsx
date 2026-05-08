import SectionHeader from '../components/SectionHeader';
import ProjectActions from '../components/ProjectActions';
import codewarsData from '../data/codewars.json';

const Codewars = () => (
  <section id="codewars" className="section panel">
    <SectionHeader tag="Codewars" title="Authored Katas" />
    <div className="grid project-grid">
      {codewarsData.slice(0, 6).map((item, index) => (
        <article className="project-card" key={index}>
          <div className="project-image">
            <img src={item.image.filename} alt={item.title} />
          </div>
          <div className="project-body">
            <h3>{item.title}</h3>
            <div className="tag-list">
              {item.tags?.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <p>{item.body}</p>
            <ProjectActions links={item.links} />
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default Codewars;
