import { useEffect, type RefObject } from 'react';

const FOCUSABLE = 'a[href], button, input, select, textarea, [tabindex]';

/** Where the element's own tabindex is parked while it is hidden. */
const STASH = 'data-guard-tabindex';

/**
 * Keep focus out of carousel slides that are hidden from assistive technology.
 *
 * react-slick marks off-screen slides — including the clones `infinite` mode
 * creates — with `aria-hidden="true"`, but leaves the links inside them in the
 * tab order. The result is a keyboard user tabbing into content that is both
 * invisible and, to a screen reader, absent: a focus-order failure
 * (WCAG 2.4.3) and an `aria-hidden-focus` violation (4.1.2).
 *
 * This walks the slider after every change react-slick makes and gives
 * focusable descendants of hidden slides `tabindex="-1"`, restoring whatever
 * they had when the slide becomes visible again.
 */
export const useHiddenSlideFocusGuard = (
  containerRef: RefObject<HTMLElement | null>
): void => {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const sync = () => {
      root.querySelectorAll<HTMLElement>('.slick-slide').forEach((slide) => {
        const hidden = slide.getAttribute('aria-hidden') === 'true';
        slide.querySelectorAll<HTMLElement>(FOCUSABLE).forEach((element) => {
          if (hidden) {
            if (!element.hasAttribute(STASH)) {
              element.setAttribute(STASH, element.getAttribute('tabindex') ?? '');
            }
            element.setAttribute('tabindex', '-1');
          } else if (element.hasAttribute(STASH)) {
            const original = element.getAttribute(STASH);
            if (original) {
              element.setAttribute('tabindex', original);
            } else {
              element.removeAttribute('tabindex');
            }
            element.removeAttribute(STASH);
          }
        });
      });
    };

    sync();

    // `attributeFilter` deliberately omits `tabindex`: `sync` writes that
    // attribute, and observing it would make this observer retrigger itself.
    const observer = new MutationObserver(sync);
    observer.observe(root, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['aria-hidden', 'class'],
    });

    return () => observer.disconnect();
  }, [containerRef]);
};
