# PRD: Visual Redesign — Modern Minimal Portfolio with Theming & Motion

## Problem Statement

As the owner of [adrianeyre.co.uk](http://adrianeyre.co.uk), I feel my portfolio
doesn't make the strong first impression I want it to. The current site works, but
it looks **flat and static**, the **color and contrast feel dull**, and the
**layout and visual hierarchy don't guide a visitor's eye** through my experience.
For a Lead Software Developer's portfolio, the design should itself be evidence of
craft — and right now it isn't pulling its weight.

## Solution

A **full visual redesign** of the existing single-page React/TypeScript portfolio,
aiming for a **modern minimal aesthetic** (clean whitespace, restrained palette,
confident typography — in the spirit of Linear/Vercel). The redesign introduces:

- A refreshed, higher-contrast design system expressed as theme tokens.
- A **light/dark theme toggle** that defaults to the visitor's system preference and
  remembers their choice.
- **Tasteful motion** — sections and cards reveal as you scroll, with smooth hover
  and transition states — that automatically backs off for users who prefer reduced
  motion.
- Improved layout and hierarchy across all existing sections.

The page stays a **single long scrolling page** with the same sections and content;
the change is purely visual/structural, not a content rewrite.

## User Stories

1. As a visitor, I want the site to make a strong, polished first impression, so that I immediately trust the developer's craft.
2. As a visitor, I want clear visual hierarchy on each section, so that I can scan the page and find what matters without effort.
3. As a visitor, I want higher contrast and a more vibrant-yet-tasteful palette, so that the content is easy to read and pleasant to look at.
4. As a visitor on a long page, I want sections and cards to animate gently into view as I scroll, so that the page feels alive rather than flat.
5. As a visitor, I want hover and focus states on buttons, links, and cards to respond smoothly, so that the site feels responsive and intentional.
6. As a visitor who prefers a light interface, I want a light theme, so that I can read comfortably in bright environments.
7. As a visitor who prefers a dark interface, I want a dark theme, so that I can read comfortably at night or by preference.
8. As a returning visitor, I want the site to remember my chosen theme, so that I don't have to re-select it on every visit.
9. As a first-time visitor, I want the site to default to my operating system's theme preference, so that it feels native without any action from me.
10. As a visitor, I want an obvious, accessible theme toggle control, so that I can switch themes whenever I want.
11. As a visitor with a vestibular sensitivity, I want animations to be disabled or softened when I have "reduce motion" enabled, so that the site doesn't cause discomfort.
12. As a keyboard user, I want the theme toggle and all interactive controls to be focusable and operable, so that I can use the site without a mouse.
13. As a screen-reader user, I want the theme toggle to announce its current state, so that I understand what it does.
14. As a visitor, I want the hero section to feel bold and modern, so that I quickly understand who Adrian is and what he does.
15. As a visitor scrolling the page, I want the navigation to highlight the section I'm currently viewing, so that I always know where I am.
16. As a visitor, I want the navigation to remain usable and visually consistent in both light and dark themes, so that the experience is cohesive.
17. As a visitor on the About section, I want a clean, readable layout for my bio and strengths, so that I can absorb the information quickly.
18. As a visitor on the Skills section, I want the technology/framework logos presented in a tidy, consistent grid, so that the breadth of skills reads clearly.
19. As a visitor on the Projects section, I want project cards with clear imagery, tags, and actions, so that I can explore work easily.
20. As a visitor on the Education, Voluntary, and Codewars sections, I want consistent card/timeline styling, so that the whole page feels like one coherent design.
21. As a visitor on the Interests section, I want the image carousel to feel polished and on-brand in both themes, so that it doesn't look like a bolt-on.
22. As a mobile visitor, I want the redesign to remain fully responsive, so that the experience is great on a phone or tablet.
23. As a visitor, I want consistent spacing, corner radii, and typography across all sections, so that the page feels professionally designed.
24. As the site owner, I want the theme and animation logic extracted into small, testable modules, so that the behavior is reliable and easy to maintain.
25. As the site owner, I want the redesign to reuse my existing content and data files, so that I don't have to re-enter any information.
26. As the site owner, I want the build and deploy pipeline (Vite + CircleCI + FTP deploy) to keep working unchanged, so that releasing the redesign is low-risk.
27. As a visitor on a slow connection, I want animations and images to degrade gracefully, so that the page is still usable while loading.
28. As a visitor, I want the redesigned site to load quickly, so that the visual upgrade doesn't come at the cost of performance.

## Implementation Decisions

### Aesthetic & layout direction
- **Aesthetic:** Modern minimal — generous whitespace, restrained palette, large/confident typography, subtle depth. Reference vibe: Linear/Vercel.
- **Layout:** Remains a **single-page scroll** with the same section order (Hero → About → Skills → Projects → Education → Voluntary → Codewars → Interests → Footer). No routing changes.
- **Content:** Unchanged. All copy and the JSON data files under `src/data/` are reused as-is.
- **No reference brand** — palette and type choices are at the implementer's discretion, consistent with the modern-minimal direction.

### Modules to build / modify

**1. Design token layer (modify)**
- Restructure the CSS custom properties currently in the global stylesheet into **two complete token sets** (light + dark).
- Tokens are switched via a `data-theme="light|dark"` attribute on the document root; all component styles consume tokens only (no hard-coded colors).
- Tokens cover: background layers, surfaces/panels, text + muted text, accents/gradients, borders, and shadow definitions tuned per theme for proper contrast.

**2. `ThemeProvider` + `useTheme` hook (build — deep module, tested)**
- Owns theme state. Interface: `useTheme()` returns `{ theme: 'light' | 'dark', toggleTheme(): void, setTheme(theme): void }`.
- **Initialization order:** persisted choice in `localStorage` → else `prefers-color-scheme` media query → else dark (current default).
- On change, writes `data-theme` to the root element and persists the choice to `localStorage`.
- Pure of any visual concerns; consumed by `ThemeToggle` and available app-wide.

**3. `ThemeToggle` component (build)**
- Presentational control placed in the `NavBar`. Consumes `useTheme`.
- Accessible: real `<button>`, `aria-label`/`aria-pressed` reflecting state, keyboard-operable, visible focus state. Icon set may be expanded (sun/moon) — new icons/fonts are in scope.

**4. `Reveal` component (build — wraps content for scroll animation)**
- Thin wrapper around Framer Motion's `whileInView` that fades/translates children into view once, with a configurable delay/offset for staggering.
- **Honors reduced motion:** when `prefers-reduced-motion: reduce` is set, it renders children with no animation (final state immediately).
- Applied to section headers, cards, and grids across all sections.

**5. `useScrollSpy` hook (build — deep module, tested)**
- IntersectionObserver-based. Given an ordered list of section ids, returns the id of the section currently in view.
- Consumed by `NavBar` to highlight the active link (active-section indicator).

**6. Restyle of existing components (modify)**
- `Hero`, `NavBar`, `Footer`, and all `sections/*` and `components/*` are restyled to the new token system and wrapped with `Reveal` where appropriate. Markup may be adjusted for hierarchy/spacing, but data sources and component responsibilities are unchanged.

### Libraries & tooling
- **Add Framer Motion** as a dependency for scroll-reveal and transitions (chosen over hand-rolled CSS for cleaner, reduced-motion-aware animation).
- **Font/icon upgrades** are permitted (new web font(s) for the modern-minimal type system; expanded `react-icons` usage for the theme toggle).
- A **test runner** (e.g. Vitest + Testing Library, consistent with the Vite stack) is introduced since the project currently has none.
- **Vite build, CircleCI config, and `deploy.js` FTP pipeline remain unchanged** in contract — the redesign must build and deploy through the existing flow.

### Accessibility
- Respect `prefers-reduced-motion` globally (via the `Reveal` module and any CSS keyframe usage).
- Both themes meet sensible contrast for body and accent text.
- All interactive controls are keyboard-accessible with visible focus.

## Testing Decisions

**What makes a good test here:** tests assert **external, observable behavior** through the module's public interface — not internal state shape or implementation details. They should survive a refactor of the internals as long as the contract holds.

**Modules to be tested:**

1. **`useTheme` / `ThemeProvider` (theme toggle logic)**
   - Defaults to the system preference (`prefers-color-scheme`) when no stored choice exists.
   - Uses the persisted `localStorage` value over the system preference when present.
   - `toggleTheme()` flips light↔dark and the new value is persisted.
   - Setting the theme reflects on the root `data-theme` attribute.
   - Approach: render a component using the hook with mocked `matchMedia` and `localStorage`; assert on rendered theme value and the side effects (stored value, root attribute).

2. **`useScrollSpy` (scroll-reveal / spy logic)**
   - Returns the id of the section reported as intersecting.
   - Updates the active id as different sections intersect.
   - Approach: mock `IntersectionObserver`, drive entries through it, assert the returned active id.

**Prior art:** none — the repo currently has no tests. This PRD establishes the first test setup (Vitest + Testing Library on the existing Vite/TS config). The `Reveal` component's *visual* animation is **not** unit-tested (presentational); only its reduced-motion branch may be asserted as a behavioral check (renders children, applies no animation when reduced motion is set), if cheap to do.

## Out of Scope

- Any rewrite of textual content, project descriptions, or the `src/data/*.json` data files (content stays as-is).
- Adding new sections, pages, or routing (remains a single-page scroll).
- Changes to the CircleCI configuration or the `deploy.js` FTP deployment mechanism.
- A CMS, backend, or any data-fetching layer.
- Internationalization / multi-language support.
- SEO/meta overhaul beyond what naturally falls out of the markup changes.
- E2E/visual-regression testing infrastructure (unit tests for the two logic modules only).

## Further Notes

- The site is React 19 + TypeScript + Vite, styled today via a single global `styles.css`. The token-based approach keeps that single-stylesheet simplicity while enabling theming; a CSS framework (Tailwind) was explicitly **not** adopted.
- The existing dark palette (teal `#5bc0be` / blue `#4c90f8` accents on near-black) is a reasonable starting point for the dark theme tokens; the light theme is a new design.
- Suggested implementation order (vertical slices): (1) introduce test runner + design tokens, (2) `ThemeProvider`/`useTheme` + `ThemeToggle` wired into the nav, (3) `Reveal` + reduced-motion handling, (4) `useScrollSpy` + active-nav indicator, (5) section-by-section restyle, (6) responsive QA in both themes.
