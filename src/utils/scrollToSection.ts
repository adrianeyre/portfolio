/**
 * Scroll a section into view from a button or in-page link.
 *
 * Reads `prefers-reduced-motion` at the moment of the click rather than at
 * module load, so a preference changed mid-visit is respected, and moves
 * keyboard focus to the destination. Without that focus move the viewport
 * jumps but the tab sequence does not, which strands keyboard users at the
 * top of the page (WCAG 2.4.3 Focus Order).
 */
export const scrollToSection = (id: string): void => {
  const target = document.getElementById(id);
  if (!target) return;

  const reduceMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  target.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'start',
  });

  // `tabindex="-1"` lets a non-interactive section take programmatic focus.
  // It is removed again on blur so the section never becomes a tab stop.
  if (!target.hasAttribute('tabindex')) {
    target.setAttribute('tabindex', '-1');
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), {
      once: true,
    });
  }
  target.focus({ preventScroll: true });
};
