/**
 * Resolve a path from `public/` against the bundle's base URL.
 *
 * The data files reference images as site-absolute paths (`/images/...`),
 * which is correct for both current deployments — each serves the bundle from
 * the root of adrianeyre.co.uk, so `base` is `/`. Vite only rewrites asset
 * URLs it can see at build time, and a string inside a JSON file is not one of
 * them, so these paths go through `BASE_URL` (which Vite sets from `base`)
 * rather than being hard-coded: should the site ever be served from a
 * subdirectory again, they resolve with it instead of 404ing.
 *
 * Absolute URLs and data URIs are returned untouched.
 */
export const assetUrl = (path: string): string => {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
};
