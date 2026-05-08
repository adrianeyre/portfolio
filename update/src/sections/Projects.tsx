import Slider, { Settings } from 'react-slick';
import SectionHeader from '../components/SectionHeader';
import ProjectActions from '../components/ProjectActions';
import projectsData from '../data/projects.json';

interface ProjectsProps {
  screenWidth: number;
}

const Projects = ({ screenWidth }: ProjectsProps) => {
  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: screenWidth <= 700 ? 1 : 2,
    slidesToScroll: 1,
  };

  return (
    <section id="projects" className="section panel">
      <SectionHeader tag="Projects" title="Recent Work" />
      <div className="carousel-container">
        <Slider {...sliderSettings}>
          {projectsData.map((project, index) => (
            <div key={index} className="project-slide">
              <article className="project-card">
                <div className="project-image">
                  <img src={project.image.filename} alt={project.title} />
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
    </section>
  );
};

export default Projects;
