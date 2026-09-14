import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface RevealProps {
  children: ReactNode;
  /** Delay before the reveal starts, in seconds. Stagger siblings by varying this. */
  delay?: number;
  /** Vertical distance, in pixels, the content travels as it fades in. */
  offset?: number;
  /** Animation duration, in seconds. */
  duration?: number;
  /** Class applied to the wrapping element. */
  className?: string;
}

/**
 * Fades and translates its children into view once, the first time they
 * scroll into the viewport.
 *
 * This was Framer Motion's `whileInView`, which cost 42KB gzipped on the
 * critical path — the hero uses Reveal, so nothing could paint until the
 * animation library had downloaded and parsed. An IntersectionObserver and a
 * CSS transition do the same job with no dependency.
 *
 * Content already on screen when the page loads is shown immediately, with no
 * transition at all. Fading the hero up from nothing is not just wasted on a
 * visitor who has not scrolled: the largest element on the page stays invisible
 * for the length of the animation, which is what the browser reports as LCP.
 *
 * Honours `prefers-reduced-motion`: when reduced motion is requested the
 * children render immediately in their final state with no animation.
 */
const Reveal = ({ children, delay = 0, offset = 24, duration = 0.5, className }: RevealProps) => {
  const reduceMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'hidden' | 'immediate' | 'shown'>('hidden');

  useEffect(() => {
    if (reduceMotion) return;

    const element = ref.current;
    if (!element) return;

    // Already on screen for the first paint: no animation, no LCP penalty.
    if (element.getBoundingClientRect().top < window.innerHeight) {
      setState('immediate');
      return;
    }

    // Without IntersectionObserver there is no way to know when this scrolls
    // into view, so show it rather than leave it permanently invisible.
    if (typeof IntersectionObserver === 'undefined') {
      setState('immediate');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState('shown');
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reduceMotion]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className ? `reveal ${className}` : 'reveal'}
      data-reveal={state}
      style={
        {
          '--reveal-offset': `${offset}px`,
          '--reveal-duration': `${duration}s`,
          '--reveal-delay': `${delay}s`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
};

export default Reveal;
