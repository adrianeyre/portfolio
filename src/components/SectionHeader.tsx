interface SectionHeaderProps {
  tag: string;
  title: string;
}

const SectionHeader = ({ tag, title }: SectionHeaderProps) => (
  <div className="section-header">
    <span className="section-tag">{tag}</span>
    <h2>{title}</h2>
  </div>
);

export default SectionHeader;
