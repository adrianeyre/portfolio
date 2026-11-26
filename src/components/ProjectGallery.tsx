import { useId, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import Reveal from './Reveal';
import ProjectShot, { hostOf } from '../demos/ProjectShot';
import { useTheme } from '../theme/ThemeProvider';

interface ProjectLink {
  text: string;
  link: string;
}

/** One entry of `projects.json` or `games.json`; both share this shape. */
export interface Project {
  title: string;
  body: string;
  image: { filename: string };
  tags: { label: string }[];
  links?: ProjectLink[];
}

/** How many grid cards show under the featured one before "Show all": three rows of three. */
const INITIAL_GRID = 9;

const demoOf = (project: Project) => project.links?.find((link) => link.text !== 'Repo');
const repoOf = (project: Project) => project.links?.find((link) => link.text === 'Repo');

const ProjectCard = ({ project, kicker }: { project: Project; kicker?: string }) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const bodyId = useId();
  const demo = demoOf(project);
  const repo = repoOf(project);
  const isLong = project.body.length > 220;
  const featured = kicker !== undefined;

  return (
    <article className={`project-card${featured ? ' featured' : ''}`}>
      <div className="project-shot-frame" role="img" aria-label={`Screenshot of ${project.title}`}>
        <ProjectShot src={project.image.filename} url={hostOf(demo?.link ?? repo?.link)} theme={theme} tall={featured} />
      </div>
      <div className="project-body">
        {featured && <span className="project-kicker">{kicker}</span>}
        <h3>{project.title}</h3>
        <p id={bodyId} className={`project-text${open || !isLong ? '' : ' clamped'}`}>
          {project.body}
        </p>
        {isLong && (
          <button
            type="button"
            className="text-button"
            aria-expanded={open}
            aria-controls={bodyId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Show less' : 'Read more'}
          </button>
        )}
        <ul className="tag-list" aria-label="Built with">
          {project.tags.map((tag) => (
            <li key={tag.label}>{tag.label}</li>
          ))}
        </ul>
        <div className="project-actions">
          {demo && (
            <a className="button button-primary button-small" href={demo.link} target="_blank" rel="noreferrer">
              Live demo
              <FiArrowUpRight aria-hidden="true" />
              <span className="visually-hidden"> of {project.title} (opens in a new tab)</span>
            </a>
          )}
          {repo && (
            <a className="button button-ghost button-small" href={repo.link} target="_blank" rel="noreferrer">
              <FaGithub aria-hidden="true" />
              Source
              <span className="visually-hidden"> code for {project.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

interface ProjectGalleryProps {
  projects: Project[];
  /** Label above the first project, which is shown large. */
  kicker: string;
  /** Accessible name for the grid of the rest. */
  gridLabel: string;
  /** Plural noun for the "Show all" button, e.g. "projects" or "games". */
  noun: string;
}

/** The first project featured large, the rest in a grid that opens with "Show all". */
const ProjectGallery = ({ projects, kicker, gridLabel, noun }: ProjectGalleryProps) => {
  const [showAll, setShowAll] = useState(false);
  const [featured, ...rest] = projects;
  const visible = showAll ? rest : rest.slice(0, INITIAL_GRID);

  return (
    <>
      <Reveal>
        <ProjectCard project={featured} kicker={kicker} />
      </Reveal>
      <ul className="project-grid" aria-label={gridLabel}>
        {visible.map((project, index) => (
          <li key={project.title}>
            <Reveal delay={(index % 3) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          </li>
        ))}
      </ul>
      {rest.length > INITIAL_GRID && (
        <div className="section-more">
          <button
            type="button"
            className="button button-ghost"
            aria-expanded={showAll}
            onClick={() => setShowAll((value) => !value)}
          >
            {showAll ? `Show fewer ${noun}` : `Show all ${projects.length} ${noun}`}
          </button>
        </div>
      )}
    </>
  );
};

export default ProjectGallery;
