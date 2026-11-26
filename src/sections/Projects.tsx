import ProjectGallery from '../components/ProjectGallery';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import projectsData from '../data/projects.json';

const Projects = () => (
  <section id="projects" className="section">
    <Reveal>
      <SectionHeader
        tag="Projects"
        title="Recent Work"
        intro="The recent projects were built end to end with AI assistance, from design through tests to docs. The games have a section of their own, just below."
      />
    </Reveal>
    <ProjectGallery projects={projectsData} kicker="Latest project" gridLabel="More projects" noun="projects" />
  </section>
);

export default Projects;
