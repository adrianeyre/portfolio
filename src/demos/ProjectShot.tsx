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
  /** A taller design, for the featured card, whose frame is taller than wide cards'. */
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

const ProjectShot = ({ src, url, theme, tall = false }: ProjectShotProps) => (
  <Stage width={560} height={tall ? 390 : 330} fill theme={theme} className="project-shot">
    {() => (
      <Window url={url ?? 'localhost'} urlShape="pill" className="ps-window">
        <img className="ps-image" src={assetUrl(src)} alt="" loading="lazy" decoding="async" />
      </Window>
    )}
  </Stage>
);

export default ProjectShot;
