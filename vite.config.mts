/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/*
 * The site is served from a domain root, so the base stays `/`: GitHub Pages
 * publishes to the custom domain in `public/CNAME` (adrianeyre.co.uk). There
 * was a `/portfolio/` base here for the adrianeyre.github.io/portfolio/ URL
 * Pages used before the custom domain — once the domain was pointed at Pages
 * that prefix made every asset URL in index.html 404, which is a blank page.
 *
 * An FTP upload script used to be the other deployment path; it was dropped
 * along with its ftp/glob/dotenv dependencies once Pages became the only one.
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
