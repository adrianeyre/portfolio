/*
 * Captures the README screenshots from a running copy of the site.
 *
 *   npm run dev            # in one terminal
 *   npm run screenshots    # in another (SITE_URL overrides the address)
 *
 * Uses playwright-core with the Chrome already installed on the machine
 * (CHROME_PATH overrides where it looks), so nothing is downloaded. Each shot
 * is taken with reduced motion on, which makes every Stageshow illustration
 * show its poster frame, the finished state, rather than a moment mid-story.
 */
import { existsSync, mkdirSync } from 'node:fs';
import { chromium } from 'playwright-core';

const SITE = process.env.SITE_URL ?? 'http://localhost:5173/';
const OUT = new URL('../docs/screenshots/', import.meta.url);

const CHROME_PATHS = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const executablePath = CHROME_PATHS.find((path) => existsSync(path));
if (!executablePath) {
  console.error('No Chrome found; set CHROME_PATH.');
  process.exit(1);
}

/** name, theme, viewport, and either a section id to frame or the page top. */
const SHOTS = [
  { name: 'hero-light', theme: 'light', width: 1440, height: 860 },
  { name: 'hero-dark', theme: 'dark', width: 1440, height: 860 },
  { name: 'skills', theme: 'light', width: 1440, height: 1000, section: 'skills' },
  { name: 'projects', theme: 'dark', width: 1440, height: 1100, section: 'projects' },
  { name: 'experience', theme: 'light', width: 1440, height: 900, section: 'experience' },
  { name: 'mobile', theme: 'dark', width: 390, height: 844, scale: 3 },
];

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath });

for (const shot of SHOTS) {
  const context = await browser.newContext({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: shot.scale ?? 1,
    colorScheme: shot.theme,
    reducedMotion: 'reduce',
  });
  // An explicit choice, so the shot does not depend on the machine's theme.
  await context.addInitScript((theme) => localStorage.setItem('theme', theme), shot.theme);
  // Keep the cookie banner out of the pictures.
  await context.addInitScript(() => localStorage.setItem('cookie-consent', 'accepted'));
  const page = await context.newPage();
  await page.goto(SITE, { waitUntil: 'networkidle' });
  await page.waitForSelector('#contact');
  if (shot.section) {
    await page.evaluate((id) => {
      const top = document.getElementById(id).getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - 72, behavior: 'instant' });
    }, shot.section);
  }
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(800);
  const path = new URL(`${shot.name}.png`, OUT);
  await page.screenshot({ path: path.pathname.replace(/^\/([A-Za-z]:)/, '$1') });
  console.log(`${shot.name}.png`);
  await context.close();
}

await browser.close();
