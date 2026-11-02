import { useId, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import ProjectShot, { hostOf } from '../demos/ProjectShot';
import projectsData from '../data/projects.json';
import { useTheme } from '../theme/ThemeProvider';

type Project = (typeof projectsData)[number];

/** How many projects show before "Show all"; the rest are older games. */
const INITIAL_VISIBLE = 7;

const demoOf = (project: Project) => project.links?.find((link) => link.text !== 'Repo');
const repoOf = (project: Project) => project.links?.find((link) => link.text === 'Repo');

const ProjectCard = ({ project, featured = false }: { project: Project; featured?: boolean }) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const bodyId = useId();
  const demo = demoOf(project);
  const repo = repoOf(project);
  const isLong = project.body.length > 220;

  return (
    <article className={`project-card${featured ? ' featured' : ''}`}>
      <div className="project-shot-frame" role="img" aria-label={`Screenshot of ${project.title}`}>
        <ProjectShot src={project.image.filename} url={hostOf(demo?.link ?? repo?.link)} theme={theme} tall={featured} />
      </div>
      <div className="project-body">
        {featured && <span className="project-kicker">Latest project</span>}
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

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [featured, ...rest] = projectsData;
  const visible = showAll ? rest : rest.slice(0, INITIAL_VISIBLE - 1);

  return (
    <section id="projects" className="section">
      <Reveal>
        <SectionHeader
          tag="Projects"
          title="Recent Work"
          intro="The recent projects were built end to end with AI assistance, from design through tests to docs. The older games are further down."
        />
      </Reveal>
      <Reveal>
        <ProjectCard project={featured} featured />
      </Reveal>
      <ul className="project-grid" aria-label="More projects">
        {visible.map((project, index) => (
          <li key={project.title}>
            <Reveal delay={(index % 3) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          </li>
        ))}
      </ul>
      <div className="section-more">
        <button
          type="button"
          className="button button-ghost"
          aria-expanded={showAll}
          onClick={() => setShowAll((value) => !value)}
        >
          {showAll ? 'Show fewer projects' : `Show all ${projectsData.length} projects`}
        </button>
      </div>
    </section>
  );
};

export default Projects;
