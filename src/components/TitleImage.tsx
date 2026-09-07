import { assetUrl } from '../utils/assetUrl';

interface TitleImageProps {
  filename?: string;
  link?: string;
  /** The heading text this logo sits beside — used to name the link, not the image. */
  alt: string;
}

/**
 * The small logo that precedes a heading in the education, experience and
 * voluntary cards.
 *
 * The image itself is decorative: the same words are already in the heading
 * next to it, so giving it alternative text would make a screen reader read
 * the organisation's name twice (WCAG 1.1.1). When the logo links out to a
 * credential the *link* carries the accessible name instead, because a link
 * with no name is a genuine failure (WCAG 2.4.4).
 */
const TitleImage = ({ filename, link, alt }: TitleImageProps) => {
  if (!filename) return null;
  const img = <img className="title-image" src={assetUrl(filename)} alt="" />;
  return link ? (
    <a href={link} target="_blank" rel="noreferrer" aria-label={`${alt} (opens in a new tab)`}>
      {img}
    </a>
  ) : (
    img
  );
};

export default TitleImage;
