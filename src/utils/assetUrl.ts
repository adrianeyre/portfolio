/**
 * Resolve a path from `public/` against the bundle's base URL.
 *
 * The data files reference images as site-absolute paths (`/images/...`),
 * which is correct when the site is served from the root of
 * adrianeyre.co.uk. GitHub Pages serves the same bundle from
 * `/portfolio/`, and Vite only rewrites asset URLs it can see at build
 * time — a string inside a JSON file is not one of them. Prefixing with
 * `BASE_URL` (which Vite sets from `base`) makes both deployments resolve.
 *
 * Absolute URLs and data URIs are returned untouched.
 */
export const assetUrl = (path: string): string => {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
};
