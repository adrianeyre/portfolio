import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Heading text, and the dialog's accessible name. */
  title: string;
  /** Accessible name for the close button, e.g. "Close cookie policy". */
  closeLabel: string;
  /** `id` given to the heading and referenced by `aria-labelledby`. */
  titleId: string;
  children: ReactNode;
}

/**
 * The dialog shell shared by the cookie policy and accessibility statement.
 *
 * Everything a modal owes a keyboard or screen-reader user lives here once:
 * `role="dialog"` with `aria-modal`, focus moved to the close button on open
 * and returned to the trigger on close, Tab cycling kept inside the dialog,
 * Escape and backdrop click to dismiss, and the page behind locked against
 * scrolling. The body is a labelled, focusable region so its content can be
 * scrolled with the keyboard alone (WCAG 2.1.1).
 */
const Modal = ({
  open,
  onClose,
  title,
  closeLabel,
  titleId,
  children,
}: ModalProps) => {
  const reduceMotion = usePrefersReducedMotion();
  const lastFocused = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Remember the trigger before the dialog steals focus.
  useEffect(() => {
    if (open) lastFocused.current = document.activeElement as HTMLElement | null;
  }, [open]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusables = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((element) => element.offsetParent !== null);
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      body.style.overflow = previousOverflow;
      lastFocused.current?.focus?.();
    };
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
        >
          <motion.div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            ref={dialogRef}
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
          >
            <div className="modal-head">
              <h2 id={titleId}>{title}</h2>
              <button
                type="button"
                className="modal-close"
                ref={closeBtnRef}
                onClick={onClose}
                aria-label={closeLabel}
              >
                <FiX aria-hidden="true" />
              </button>
            </div>
            <div
              className="modal-body"
              tabIndex={0}
              role="region"
              aria-label={`${title}, scrollable`}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
