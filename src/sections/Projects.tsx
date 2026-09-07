import { useRef } from 'react';
import Slider, { Settings } from 'react-slick';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import ProjectActions from '../components/ProjectActions';
import projectsData from '../data/projects.json';
import { assetUrl } from '../utils/assetUrl';
import { useHiddenSlideFocusGuard } from '../hooks/useHiddenSlideFocusGuard';

interface ProjectsProps {
  screenWidth: number;
}

const Projects = ({ screenWidth }: ProjectsProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  useHiddenSlideFocusGuard(carouselRef);

  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: screenWidth <= 700 ? 1 : 2,
    slidesToScroll: 1,
    // Explicit previous/next controls at every width, so reaching a project
    // never requires a swipe or drag (WCAG 2.5.7 Dragging Movements).
    arrows: true,
    // react-slick's own keyboard/ARIA handling: it keeps off-screen slides out
    // of the tab order, which `infinite` cloning would otherwise break.
    accessibility: true,
  };

  return (
    <section id="projects" className="section panel">
      <Reveal>
        <SectionHeader tag="Projects" title="Recent Work" />
      </Reveal>
      <Reveal className="carousel-container" delay={0.1}>
        <div ref={carouselRef} role="group" aria-roledescription="carousel" aria-label="Recent projects">
        <Slider {...sliderSettings}>
          {projectsData.map((project, index) => (
            <div key={index} className="project-slide">
              <article className="project-card">
                <div className="project-image">
                  <img src={assetUrl(project.image.filename)} alt={`Screenshot of ${project.title}`} />
                </div>
                <div className="project-tags">
                  <div className="pill-grid">
                    {project?.tags.map((item) => (
                      <span className="pill" key={item.label}>
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.body}</p>
                  <ProjectActions links={project.links} />
                </div>
              </article>
            </div>
          ))}
        </Slider>
        </div>
      </Reveal>
    </section>
  );
};

export default Projects;
