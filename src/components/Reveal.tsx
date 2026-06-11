import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
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
 * Honours `prefers-reduced-motion`: when reduced motion is requested the
 * children render immediately in their final state with no animation.
 */
const Reveal = ({ children, delay = 0, offset = 24, duration = 0.5, className }: RevealProps) => {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
