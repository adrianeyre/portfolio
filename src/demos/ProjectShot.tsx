import { useState } from 'react';
import { Stage, Window, type Theme } from '../stageshow/kit';
import { assetUrl } from '../utils/assetUrl';
import './project-shot.css';

/*
 * A project's screenshot as a product shot rather than a picture in a box:
 * the screenshot sits in a real browser window, pinned to the top of a quiet
 * well and running off its bottom edge ("pinned, bottom bleed" in Stageshow's
 * framing rules), so the eye lands on the top of the app, where its identity is.
 */

interface ProjectShotProps {
  src: string;
  /** The address shown in the window's URL pill. */
  url?: string;
  theme: Theme;
  /**
   * A taller design, for the featured card, whose frame is taller than wide
   * cards'. Its window sits whole in the middle of the well, not bleeding off.
   */
  tall?: boolean;
}

/** `https://lanewise.adrianeyre.co.uk/` -> `lanewise.adrianeyre.co.uk`. */
export const hostOf = (link?: string): string | undefined => {
  if (!link) return undefined;
  try {
    const { host, pathname } = new URL(link);
    const path = pathname.replace(/\/$/, '');
    return host === 'github.com' || host.endsWith('github.io') ? `${host}${path}` : host;
  } catch {
    return undefined;
  }
};

/** The window's widest, and the screenshot's height in it at that width for a 16:10 shot. */
const WINDOW_WIDTH = 464;
const CENTRED_IMAGE_HEIGHT = 290;

const ProjectShot = ({ src, url, theme, tall = false }: ProjectShotProps) => {
  // Width over height of the screenshot, once it has loaded.
  const [ratio, setRatio] = useState<number>();
  // The featured window narrows for a taller shot (a 4:3 game), so its
  // screenshot is no taller than a 16:10 one and the margins around it match.
  const width = tall && ratio ? Math.min(WINDOW_WIDTH, Math.round(CENTRED_IMAGE_HEIGHT * ratio)) : undefined;

  return (
    <Stage width={560} height={tall ? 390 : 330} fill theme={theme} className={`project-shot${tall ? ' ps-centred' : ''}`}>
      {() => (
        <Window url={url ?? 'localhost'} urlShape="pill" className="ps-window" style={width ? { width } : undefined}>
          <img
            className="ps-image"
            src={assetUrl(src)}
            alt=""
            loading="lazy"
            decoding="async"
            onLoad={(event) => {
              const { naturalWidth, naturalHeight } = event.currentTarget;
              if (naturalWidth && naturalHeight) setRatio(naturalWidth / naturalHeight);
            }}
          />
        </Window>
      )}
    </Stage>
  );
};

export default ProjectShot;
