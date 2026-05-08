import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
      <div className="section-header">
        <span className="section-tag">Projects</span>
        <h2>Recent Work</h2>
      </div>
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
                  <div className="project-actions">
                    {project.links?.map((link) => (
                      <a key={link.text} href={link.link} target="_blank" rel="noreferrer">
                        {link.text}
                      </a>
                    ))}
                  </div>
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
