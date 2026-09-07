import { describe, expect, it } from 'vitest';

import cname from '../../public/CNAME?raw';
import releaseWorkflow from '../../.github/workflows/release.yml?raw';
import viteConfigSource from '../../vite.config.mts?raw';
import { assetUrl } from '../utils/assetUrl';
import aboutData from '../data/about.json';
import codewarsData from '../data/codewars.json';
import educationData from '../data/education.json';
import experienceData from '../data/experience.json';
import frameworksImagesData from '../data/frameworksImages.json';
import interestsImagesData from '../data/interestsImages.json';
import languageImagesData from '../data/languageImages.json';
import linksData from '../data/links.json';
import musicData from '../data/music.json';
import voluntaryData from '../data/voluntary.json';

/*
 * These guard the two mistakes that took the deployed site down: a bundle
 * built for a subdirectory (every asset URL 404s, so the page renders blank),
 * and a CNAME that never reaches the published artifact (the custom domain is
 * dropped). Both are invisible in a dev server and only bite in production.
 */
describe('deployment', () => {
  it('builds for the domain root', () => {
    // Pages and the FTP deploy both serve from the root of adrianeyre.co.uk,
    // so a `/portfolio/`-style prefix makes the live JS and CSS 404. Read from
    // the config source rather than `import.meta.env.BASE_URL`, which Vitest
    // pins to `/` whatever `base` says — a check through `assetUrl` would pass
    // on a broken build.
    expect(viteConfigSource).toMatch(/base:\s*'\/'/);
  });

  it('does not let the workflow override the base', () => {
    // The `/portfolio/` base used to be opt-in through this variable, which is
    // what shipped the broken build once the custom domain went live.
    expect(releaseWorkflow).not.toMatch(/GITHUB_PAGES/);
  });

  it('keeps the custom domain in the published output', () => {
    // Vite copies `public/` verbatim into `dist`, the artifact Pages
    // publishes — a CNAME anywhere else never ships.
    expect(cname.trim()).toBe('adrianeyre.co.uk');
  });

  it('prefixes public assets with the base URL', () => {
    expect(assetUrl('/images/links/photo.jpeg')).toBe(`${import.meta.env.BASE_URL}images/links/photo.jpeg`);
  });

  it('leaves absolute URLs untouched', () => {
    const remote = 'https://raw.githubusercontent.com/adrianeyre/pacman/master/images/screenshot1.png';

    expect(assetUrl(remote)).toBe(remote);
  });
});

/*
 * Every site-absolute image path in the data files that actually gets rendered
 * must exist in `public/`. `projects.json` is deliberately excluded: its
 * `tags[].image` entries are never rendered (Projects shows text-only pills),
 * and a number of them name icons this repo has never held.
 */
describe('rendered image data', () => {
  // Eager-globbed at build time, so this needs no filesystem access.
  const publicImages = new Set(
    Object.keys(import.meta.glob('../../public/images/**/*', { eager: true })).map((path) =>
      path.replace('../../public', ''),
    ),
  );

  const renderedData = {
    'about.json': aboutData,
    'codewars.json': codewarsData,
    'education.json': educationData,
    'experience.json': experienceData,
    'frameworksImages.json': frameworksImagesData,
    'interestsImages.json': interestsImagesData,
    'languageImages.json': languageImagesData,
    'links.json': linksData,
    'music.json': musicData,
    'voluntary.json': voluntaryData,
  };

  it('finds the public images to check against', () => {
    expect(publicImages.size).toBeGreaterThan(0);
  });

  it.each(Object.entries(renderedData))('%s references only images that exist', (_name, data) => {
    const paths = [...new Set(JSON.stringify(data).match(/\/images\/[^"\\]+/g) ?? [])];

    expect(paths.filter((path) => !publicImages.has(path))).toEqual([]);
  });
});
