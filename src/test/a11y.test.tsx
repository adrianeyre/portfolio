import { render } from '@testing-library/react';
import axe, { type Result } from 'axe-core';
import { beforeAll, describe, expect, it } from 'vitest';
import App from '../App';
import { ThemeProvider } from '../theme/ThemeProvider';

/**
 * The tags that together make up WCAG 2.2 Level A and AA. `wcag22aa` alone
 * only covers the criteria *added* in 2.2, so the earlier levels have to be
 * listed as well or the run silently checks a fraction of the standard.
 */
const WCAG_22_AA = [
  'wcag2a',
  'wcag2aa',
  'wcag21a',
  'wcag21aa',
  'wcag22aa',
];

const describeViolation = (violation: Result) =>
  `${violation.id} (${violation.impact}): ${violation.help}\n` +
  violation.nodes.map((node) => `    ${node.html}`).join('\n');

describe('WCAG 2.2 AA', () => {
  beforeAll(() => {
    // jsdom has no layout engine, so axe's colour-contrast rule cannot run and
    // matchMedia needs a stub for the theme and reduced-motion hooks.
    if (!window.matchMedia) {
      window.matchMedia = ((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      })) as unknown as typeof window.matchMedia;
    }
  });

  it('the whole page is free of detectable violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    const results = await axe.run(container, {
      runOnly: { type: 'tag', values: WCAG_22_AA },
      // Needs real layout, which jsdom does not provide. Contrast is checked
      // against the tokens in styles.css instead — see the comments there.
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(
      results.violations.map(describeViolation).join('\n\n')
    ).toBe('');
  }, 30_000);

  /*
   * axe reports this one as "incomplete" under jsdom because it cannot see
   * layout, so it is asserted directly. react-slick hides off-screen and
   * cloned slides with `aria-hidden` but leaves their links tabbable; without
   * useHiddenSlideFocusGuard this finds ~75 of them.
   */
  it('puts nothing focusable inside an aria-hidden carousel slide', () => {
    const { container } = render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    const reachable = Array.from(
      container.querySelectorAll<HTMLElement>('[aria-hidden="true"]')
    ).flatMap((hidden) =>
      Array.from(
        hidden.querySelectorAll<HTMLElement>(
          'a[href], button, input, select, textarea, [tabindex]'
        )
      ).filter((element) => element.getAttribute('tabindex') !== '-1')
    );

    expect(reachable.map((element) => element.outerHTML)).toEqual([]);
  });

  it('offers a skip link as the first focusable element', () => {
    const { container } = render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    const firstFocusable = container.querySelector('a[href], button');
    expect(firstFocusable).toHaveAttribute('href', '#main-content');
    expect(container.querySelector('#main-content')).toBeInTheDocument();
  });
});
