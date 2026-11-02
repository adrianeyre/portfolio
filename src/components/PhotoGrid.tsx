import { useMemo } from 'react';
import { assetUrl } from '../utils/assetUrl';

interface ImageItem {
  label?: string;
  title?: string;
  image?: { filename: string; title?: string };
}

/**
 * Turn `/images/interests/wakeboarding.png` into "Wakeboarding".
 *
 * The interests data carries filenames and nothing else, and the filenames are
 * already the subject of each photo, so they are the best description to hand.
 */
export const labelFromFilename = (filename: string): string => {
  const base = filename.split('/').pop()?.replace(/\.[^.]+$/, '') ?? '';
  const words = base.replace(/[-_]+/g, ' ').replace(/\d+$/, '').trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : '';
};

/**
 * The interest photos as one still grid. It replaced an auto-advancing
 * carousel: nothing moves on its own now, so there is nothing to pause
 * (WCAG 2.2.2), and every photo is one tab stop that opens full size.
 */
const PhotoGrid = ({ data }: { data?: ImageItem[] }) => {
  const images = useMemo(
    () =>
      (data ?? [])
        .filter((item) => item.image?.filename)
        .map((item) => ({
          filename: item.image!.filename,
          label: item.image?.title ?? item.label ?? item.title ?? labelFromFilename(item.image!.filename),
        })),
    [data],
  );

  return (
    <ul className="photo-grid">
      {images.map((image) => (
        <li key={image.filename}>
          <a href={assetUrl(image.filename)} target="_blank" rel="noreferrer" className="photo">
            <img src={assetUrl(image.filename)} alt="" loading="lazy" decoding="async" />
            <span className="photo-label">
              {image.label}
              <span className="visually-hidden"> photo, opens full size in a new tab</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default PhotoGrid;
