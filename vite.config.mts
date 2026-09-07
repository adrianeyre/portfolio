/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/*
 * Both deployments serve this bundle from a domain root, so the base stays
 * `/`: GitHub Pages publishes to the custom domain in `public/CNAME`
 * (adrianeyre.co.uk), and the FTP deploy in `deploy.js` uploads to the root of
 * the same domain. There was a `/portfolio/` base here for the
 * adrianeyre.github.io/portfolio/ URL Pages used before the custom domain —
 * once the domain was pointed at Pages that prefix made every asset URL in
 * index.html 404, which is a blank page.
 */
export default defineConfig({
  base: '/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
  },
});
