interface Link {
  text: string;
  link: string;
}

interface ProjectActionsProps {
  links?: Link[];
}

const ProjectActions = ({ links }: ProjectActionsProps) => (
  <div className="project-actions">
    {links?.map((link) => (
      <a key={link.text} href={link.link} target="_blank" rel="noreferrer">
        {link.text}
      </a>
    ))}
  </div>
);

export default ProjectActions;
