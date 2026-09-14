/*
 * The window events the footer uses to open the cookie policy and the
 * accessibility statement.
 *
 * These live apart from the components that listen for them so the footer can
 * dispatch one without importing either component. Both are lazy-loaded and
 * both pull in Framer Motion; a static import of the event name alone was
 * enough to drag that back onto the critical path (Rollup warned the dynamic
 * import was ineffective).
 */
export const OPEN_COOKIE_POLICY_EVENT = 'open-cookie-policy';
export const OPEN_ACCESSIBILITY_EVENT = 'open-accessibility-statement';
