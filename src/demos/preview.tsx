import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HeroDemo from './HeroDemo';
import PipelineTile from './PipelineTile';
import ProjectShot from './ProjectShot';
import '../styles.css';

/*
 * Development-only: renders one scene by name for filming, e.g.
 *   /demos.html?scene=hero&theme=dark&width=640
 */
const params = new URLSearchParams(window.location.search);
const theme = params.get('theme') === 'dark' ? 'dark' : 'light';
const width = Number(params.get('width') ?? 0) || undefined;
document.documentElement.setAttribute('data-theme', theme);

const scenes: Record<string, () => React.ReactElement> = {
  hero: () => <HeroDemo theme={theme} />,
  pipeline: () => <PipelineTile theme={theme} />,
  project: () => (
    <ProjectShot src="/images/projects/lanewise.png" url="lanewise.adrianeyre.co.uk" theme={theme} />
  ),
};

const Scene = scenes[params.get('scene') ?? 'hero'] ?? scenes.hero;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div id="example" style={{ maxWidth: width, margin: '24px auto', padding: '0 16px' }}>
      <Scene />
    </div>
  </StrictMode>,
);
