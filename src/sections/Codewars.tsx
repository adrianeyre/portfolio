import { useState } from 'react';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import ProjectActions from '../components/ProjectActions';
import codewarsData from '../data/codewars.json';

const INITIAL_VISIBLE = 6;

const Codewars = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleKatas = showAll ? codewarsData : codewarsData.slice(0, INITIAL_VISIBLE);

  return (
    <section id="codewars" className="section">
      <Reveal>
        <SectionHeader
          tag="Codewars"
          title="Authored Katas"
          intro="Coding challenges I have written and published for the Codewars community."
        />
      </Reveal>
      {showAll && (
        <button
          type="button"
          className="button button-ghost kata-expand-btn"
          onClick={() => setShowAll(false)}
        >
          <span aria-hidden="true">▲</span> Show fewer katas
        </button>
      )}
      <div className="kata-grid">
        {visibleKatas.map((item, index) => {
          const isExpanded = expanded === index;
          const bodyId = `kata-body-${index}`;
          return (
            <Reveal key={index} delay={(index % 3) * 0.08}>
              <article
                className={`kata-card${isExpanded ? ' expanded' : ''}`}
              >
                <div className="kata-body">
                  <div className="kata-content">
                    {/*
                      The whole card used to be click-to-expand via `onClick` on
                      a non-interactive element, which no keyboard could reach.
                      The toggle now lives on a real button inside the heading,
                      so it is focusable, operable with Enter and Space, and
                      announces its state (WCAG 2.1.1, 4.1.2).
                    */}
                    <h3>
                      <button
                        type="button"
                        className="kata-toggle"
                        aria-expanded={isExpanded}
                        aria-controls={bodyId}
                        onClick={() => setExpanded(isExpanded ? null : index)}
                      >
                        {item.title}
                      </button>
                    </h3>
                    <div className="kata-tags">
                      {item.tags?.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <p id={bodyId}>{item.body}</p>
                  </div>
                  <ProjectActions links={item.links} />
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
      {!showAll && (
        <button
          type="button"
          className="button button-ghost kata-expand-btn"
          onClick={() => setShowAll(true)}
        >
          <span aria-hidden="true">▼</span> Show all {codewarsData.length} katas
        </button>
      )}
    </section>
  );
};

export default Codewars;
