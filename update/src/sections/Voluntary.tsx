import voluntaryData from '../data/voluntary.json';

const Voluntary = () => (
  <section id="voluntary" className="section panel">
    <div className="section-header">
      <span className="section-tag">Voluntary Work</span>
      <h2>Giving Back</h2>
    </div>
    <div className="grid cards-grid">
      {voluntaryData.map((item, index) => (
        <article className="card" key={index}>
          <h3>
            {item.image?.filename && (item.image.link ? (
              <a href={item.image.link} target="_blank" rel="noreferrer">
                <img className="title-image" src={item.image.filename} alt={item.title} />
              </a>
            ) : (
              <img className="title-image" src={item.image.filename} alt={item.title} />
            ))}
            {item.title}
          </h3>
          {item.subTitle && item.subTitle.map((subTitleItem) => <p key={subTitleItem}>{subTitleItem}</p>)}
          <p>{item.body}</p>
        </article>
      ))}
    </div>
  </section>
);

export default Voluntary;
