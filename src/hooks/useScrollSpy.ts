import { useEffect, useRef, useState } from 'react';

interface ScrollSpyOptions {
  /**
   * Margin applied to the observer root. The default shrinks the viewport to a
   * thin band around its vertical centre, so the "active" section is whichever
   * one is currently passing through the middle of the screen.
   */
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * Tracks which of the given sections is currently in view.
 *
 * Given an ordered list of element ids, it observes each matching element with
 * an `IntersectionObserver` and returns the id of the section in view. When
 * more than one section is visible the most-visible one wins, with ties broken
 * in favour of the earliest id in the list (i.e. the section higher up the
 * page). Returns `null` until a section comes into view.
 */
export const useScrollSpy = (
  ids: string[],
  options: ScrollSpyOptions = {}
): string | null => {
  const { rootMargin = '-45% 0px -45% 0px', threshold = 0 } = options;
  const [activeId, setActiveId] = useState<string | null>(null);
  // Latest intersection ratio per observed section (0 when not intersecting).
  const ratios = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const ratio = entry.isIntersecting
            ? entry.intersectionRatio > 0
              ? entry.intersectionRatio
              : 1
            : 0;
          ratios.current.set(entry.target.id, ratio);
        }

        // Pick the most-visible section, iterating in list order so equal
        // ratios resolve to the section that appears first on the page.
        let best: string | null = null;
        let bestRatio = 0;
        for (const id of ids) {
          const ratio = ratios.current.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }

        if (best !== null) {
          setActiveId(best);
        }
      },
      { rootMargin, threshold }
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      ratios.current.clear();
    };
  }, [ids, rootMargin, threshold]);

  return activeId;
};
