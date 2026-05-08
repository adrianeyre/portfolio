import codewarsData from '../data/codewars.json';

const Codewars = () => (
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
            <div className="tag-list">
              {item.tags?.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <p>{item.body}</p>
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
);

export default Codewars;
