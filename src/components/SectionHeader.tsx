import type { ReactNode } from 'react';

interface SectionHeaderProps {
  tag: string;
  title: string;
  /** One sentence under the title, in the muted ink. */
  intro?: ReactNode;
}

const SectionHeader = ({ tag, title, intro }: SectionHeaderProps) => (
  <div className="section-header">
    <span className="section-tag">{tag}</span>
    <h2>{title}</h2>
    {intro ? <p className="section-intro">{intro}</p> : null}
  </div>
);

export default SectionHeader;
