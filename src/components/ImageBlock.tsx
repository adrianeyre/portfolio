import { useMemo, useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import { FiPause, FiPlay } from 'react-icons/fi';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { assetUrl } from '../utils/assetUrl';
import { useHiddenSlideFocusGuard } from '../hooks/useHiddenSlideFocusGuard';

interface ImageItem {
  label?: string;
  title?: string;
  image?: { filename: string; title?: string };
}

/**
 * Turn `/images/interests/wakeboarding.png` into "Wakeboarding".
 *
 * The interests data carries filenames and nothing else, and `alt="…png"` is
 * worse than useless to a screen reader. The filenames are already the subject
 * of each photo, so they are the best description available without editing
 * every entry by hand.
 */
const labelFromFilename = (filename: string): string => {
  const base = filename.split('/').pop()?.replace(/\.[^.]+$/, '') ?? '';
  const words = base.replace(/[-_]+/g, ' ').trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : '';
};

interface IImageBlockProps {
  data?: ImageItem[];
  screenWidth: number;
}

/**
 * The auto-advancing strip of interest thumbnails.
 *
 * Two things here are accessibility requirements rather than polish. Moving
 * content that starts automatically and runs for more than five seconds must
 * offer a way to pause it (WCAG 2.2.2 Pause, Stop, Hide) — hence the button —
 * and it must not start at all for a visitor who has asked for reduced motion.
 * Each thumbnail is a real `<button>` so it can be opened from the keyboard.
 */
const ImageBlock = ({ data, screenWidth: screenWidthProp }: IImageBlockProps) => {
  const reduceMotion = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(!reduceMotion);
  const carouselRef = useRef<HTMLDivElement>(null);
  useHiddenSlideFocusGuard(carouselRef);

  const images = useMemo(
    () =>
      (data ?? [])
        .filter((item) => item.image?.filename)
        .map((item) => ({
          filename: item.image!.filename,
          label:
            item.image?.title ??
            item.label ??
            item.title ??
            labelFromFilename(item.image!.filename),
        })),
    [data]
  );

  const screenWidth =
    screenWidthProp > 0 ? screenWidthProp : window.innerWidth;

  const settings: Settings = {
    slidesToScroll: 1,
    autoplay: playing && !reduceMotion,
    autoplaySpeed: 2000,
    slidesToShow: screenWidth <= 700 ? Math.max(1, Math.floor(screenWidth / 100)) : 8,
    dots: false,
    infinite: true,
    // Previous/next controls mean the strip never *requires* a drag or swipe
    // to reach a thumbnail (WCAG 2.5.7 Dragging Movements).
    arrows: true,
  };

  return (
    <div className="image-block-container" ref={carouselRef}>
      <div className="image-block-controls">
        <button
          type="button"
          className="carousel-pause"
          onClick={() => setPlaying((current) => !current)}
          aria-pressed={playing && !reduceMotion}
          disabled={reduceMotion}
        >
          <span aria-hidden="true">
            {playing && !reduceMotion ? <FiPause /> : <FiPlay />}
          </span>
          {reduceMotion
            ? 'Image strip paused (reduced motion)'
            : playing
              ? 'Pause the image strip'
              : 'Play the image strip'}
        </button>
      </div>
      <Slider {...settings}>
        {images.map((image, imageIndex) => (
          <div key={`${image.filename}-${imageIndex}`} className="image-slide">
            <button
              type="button"
              className="thumbnail-button"
              onClick={() => window.open(assetUrl(image.filename), '_blank', 'noopener')}
            >
              <img
                alt={
                  image.label
                    ? `${image.label} — open full size in a new tab`
                    : 'Open this image full size in a new tab'
                }
                className="thumbnail"
                src={assetUrl(image.filename)}
              />
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageBlock;
