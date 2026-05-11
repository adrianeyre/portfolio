import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import ProjectActions from '../components/ProjectActions';
import codewarsData from '../data/codewars.json';

const INITIAL_VISIBLE = 6;

const Codewars = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleKatas = showAll ? codewarsData : codewarsData.slice(0, INITIAL_VISIBLE);

  return (
    <section id="codewars" className="section panel">
      <SectionHeader tag="Codewars" title="Authored Katas" />
      {showAll && (
        <button className="kata-expand-btn kata-expand-btn--up" onClick={() => setShowAll(false)} aria-label="Show less">
          ▲ show less
        </button>
      )}
      <div className="grid project-grid">
        {visibleKatas.map((item, index) => (
          <article
            className={`project-card kata-card${expanded === index ? ' expanded' : ''}`}
            key={index}
            onClick={() => setExpanded(expanded === index ? null : index)}
          >
            <div className="project-body">
              <div className="kata-content">
                <h3>{item.title}</h3>
                <div className="tag-list">
                  {item.tags?.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <p>{item.body}</p>
              </div>
              <ProjectActions links={item.links} />
            </div>
          </article>
        ))}
      </div>
      {!showAll && (
        <button className="kata-expand-btn kata-expand-btn--down" onClick={() => setShowAll(true)} aria-label="Show more">
          ▼ show more
        </button>
      )}
    </section>
  );
};

export default Codewars;
