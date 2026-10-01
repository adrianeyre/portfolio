/*
 * The window events the footer uses to open the cookie policy, privacy policy,
 * terms and conditions and accessibility statement.
 *
 * These live apart from the components that listen for them so the footer can
 * dispatch one without importing any of the components. All are lazy-loaded
 * and all pull in Framer Motion; a static import of the event name alone was
 * enough to drag that back onto the critical path (Rollup warned the dynamic
 * import was ineffective).
 */
export const OPEN_COOKIE_POLICY_EVENT = 'open-cookie-policy';
export const OPEN_ACCESSIBILITY_EVENT = 'open-accessibility-statement';
export const OPEN_PRIVACY_POLICY_EVENT = 'open-privacy-policy';
export const OPEN_TERMS_EVENT = 'open-terms-and-conditions';
