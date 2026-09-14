import { describe, expect, it } from 'vitest';

import cname from '../../public/CNAME?raw';
import releaseWorkflow from '../../.github/workflows/release.yml?raw';
import viteConfigSource from '../../vite.config.mts?raw';
import { assetUrl } from '../utils/assetUrl';
import indexHtml from '../../index.html?raw';
import manifest from '../../public/manifest.json';
import robots from '../../public/robots.txt?raw';
import aboutData from '../data/about.json';
import codewarsData from '../data/codewars.json';
import educationData from '../data/education.json';
import experienceData from '../data/experience.json';
import frameworksImagesData from '../data/frameworksImages.json';
import interestsImagesData from '../data/interestsImages.json';
import languageImagesData from '../data/languageImages.json';
import linksData from '../data/links.json';
import musicData from '../data/music.json';
import projectsData from '../data/projects.json';
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
 * must exist in `public/`. `projects.json` used to be excluded because its
 * `tags[].image` entries named icons this repo has never held; those entries
 * are gone (Projects renders text-only pills), so it is checked like the rest.
 * The match is anchored to the opening quote so that remote screenshot URLs,
 * which also contain `/images/`, are left to the host that serves them.
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
    'projects.json': projectsData,
    'voluntary.json': voluntaryData,
  };

  it('finds the public images to check against', () => {
    expect(publicImages.size).toBeGreaterThan(0);
  });

  it.each(Object.entries(renderedData))('%s references only images that exist', (_name, data) => {
    const paths = [...new Set(JSON.stringify(data).match(/(?<=")\/images\/[^"\\]+/g) ?? [])];

    expect(paths.filter((path) => !publicImages.has(path))).toEqual([]);
  });
});

/*
 * The head is the whole of this site's SEO surface: one page, rendered by JS,
 * so a crawler that ignores the script sees only what is here. These guard the
 * mistakes that silently cost ranking rather than breaking the build — a
 * social card pointing at http:// on an https-only domain, a missing
 * canonical, and an icon served under the wrong type.
 */
describe('SEO head', () => {
  it('keeps the tab title to the bare name', () => {
    expect(indexHtml).toMatch(/<title>Adrian Eyre<\/title>/);
  });

  it('has a description long enough to be used as a snippet', () => {
    const description = indexHtml.match(/name="description"\s+content="([^"]+)"/s)?.[1]
      ?? indexHtml.match(/name="description"[\s\S]*?content="([^"]+)"/)?.[1];

    expect(description).toBeDefined();
    expect(description!.length).toBeGreaterThan(70);
  });

  it('declares a canonical URL on the custom domain', () => {
    expect(indexHtml).toMatch(/<link rel="canonical" href="https:\/\/adrianeyre\.co\.uk\/" \/>/);
  });

  it('never points a social card or canonical at http://', () => {
    expect(indexHtml).not.toMatch(/content="http:\/\/adrianeyre/);
    expect(indexHtml).not.toMatch(/href="http:\/\/adrianeyre/);
  });

  it('serves each icon as the type it actually is', () => {
    // The .ico was once declared as image/svg+xml, which a browser may act on.
    expect(indexHtml).toMatch(/<link rel="icon" href="\/favicon\.ico" sizes="32x32" \/>/);
    expect(indexHtml).toMatch(/<link rel="icon" type="image\/svg\+xml" href="\/favicon\.svg" \/>/);
  });

  it('ships valid Person structured data', () => {
    const block = indexHtml.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    )?.[1];

    expect(block).toBeDefined();

    const graph = JSON.parse(block!)['@graph'] as { '@type': string; name?: string }[];
    const person = graph.find((node) => node['@type'] === 'Person');

    expect(person?.name).toBe('Adrian Eyre');
  });

  it('points robots.txt at the sitemap', () => {
    expect(robots).toMatch('Sitemap: https://adrianeyre.co.uk/sitemap.xml');
  });

  it('gives the manifest a scope and icons', () => {
    expect(manifest.start_url).toBe('/');
    expect(manifest.icons.length).toBeGreaterThan(0);
  });
});
