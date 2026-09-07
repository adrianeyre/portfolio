/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/*
 * GitHub Pages serves this repository at https://adrianeyre.github.io/portfolio/,
 * so the bundle it publishes needs every asset URL prefixed with `/portfolio/`.
 * The FTP deploy in `deploy.js` puts the same build at the root of
 * adrianeyre.co.uk, where that prefix would be wrong — hence an opt-in
 * environment variable rather than a hard-coded base. The Pages job in
 * `.github/workflows/release.yml` is the only thing that sets it.
 */
const base = process.env.GITHUB_PAGES === 'true' ? '/portfolio/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
  },
});
