import { useId, useState } from 'react';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import TitleImage from '../components/TitleImage';
import experienceData from '../data/experience.json';
import { assetUrl } from '../utils/assetUrl';
import { metaValue, parseMeta } from '../utils/meta';

/** Highlights shown before "Show all", so a long role does not dominate. */
const POINTS_VISIBLE = 4;

type Role = (typeof experienceData)[number];

const RoleItem = ({ role, delay }: { role: Role; delay: number }) => {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const meta = parseMeta(role.subTitle);
  const position = metaValue(meta, 'Position');
  const dates = metaValue(meta, 'Dates', 'Date');
  const points = role.points ?? [];
  const shown = open ? points : points.slice(0, POINTS_VISIBLE);
  // The same language logo can appear twice under different titles in the data.
  const stack = [...new Map((role.images ?? []).map((image) => [image.filename, image])).values()];

  return (
    <li className="role">
      <Reveal className="role-inner" delay={delay}>
      <div className="role-rail" aria-hidden="true">
        <span className="role-dot" />
      </div>
      <article className="role-card">
        <header className="role-head">
          <TitleImage filename={role.image?.filename} link={role.image?.link} alt={role.title} />
          <div>
            <h3>{position ?? role.title}</h3>
            <p className="role-company">
              {position ? role.title : null}
              {dates ? <span className="role-dates">{dates}</span> : null}
            </p>
          </div>
        </header>
        {role.body ? <p className="role-summary">{role.body}</p> : null}
        {shown.length ? (
          <ul id={listId} className="role-points">
            {shown.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        ) : null}
        <div className="role-foot">
          {stack.length ? (
            <ul className="role-stack" aria-label="Technologies">
              {stack.map((image) => (
                <li key={image.filename}>
                  <img src={assetUrl(image.filename)} alt={image.title} title={image.title} loading="lazy" decoding="async" width={22} height={22} />
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}
          {points.length > POINTS_VISIBLE && (
            <button
              type="button"
              className="text-button"
              aria-expanded={open}
              aria-controls={listId}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? 'Show fewer' : `Show all ${points.length} highlights`}
            </button>
          )}
        </div>
      </article>
      </Reveal>
    </li>
  );
};

const Experience = () => (
  <section id="experience" className="section">
    <Reveal>
      <SectionHeader tag="Experience" title="Work History" />
    </Reveal>
    <ol className="timeline">
      {experienceData.map((role, index) => (
        <RoleItem key={role.title} role={role} delay={Math.min(index, 3) * 0.06} />
      ))}
    </ol>
  </section>
);

export default Experience;
