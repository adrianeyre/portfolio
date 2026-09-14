import { render, screen, act } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Reveal from './Reveal';

/** Mock the `(prefers-reduced-motion: reduce)` media query. */
const mockReducedMotion = (reduce: boolean) => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes('reduce') ? reduce : false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

/**
 * jsdom gives every element a zeroed rect, which Reveal reads as "on screen"
 * and shows immediately. Pushing the top below the viewport is what exercises
 * the scroll-into-view path at all.
 */
const mockBelowTheFold = () => {
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
    top: window.innerHeight + 500,
    bottom: 0, left: 0, right: 0, width: 0, height: 0, x: 0, y: 0,
    toJSON: () => ({}),
  } as DOMRect);
};

/** Replace IntersectionObserver with one whose callback the test can fire. */
const captureObserver = () => {
  const captured: { trigger?: (isIntersecting: boolean) => void; disconnected: boolean } = {
    disconnected: false,
  };

  class CapturingObserver {
    constructor(callback: IntersectionObserverCallback) {
      captured.trigger = (isIntersecting: boolean) =>
        callback(
          [{ isIntersecting } as IntersectionObserverEntry],
          this as unknown as IntersectionObserver
        );
    }
    observe = vi.fn();
    unobserve = vi.fn();
    takeRecords = vi.fn(() => []);
    disconnect = vi.fn(() => {
      captured.disconnected = true;
    });
  }

  vi.stubGlobal('IntersectionObserver', CapturingObserver);
  return captured;
};

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('Reveal', () => {
  it('renders its children', () => {
    mockReducedMotion(false);
    render(
      <Reveal>
        <p>hello</p>
      </Reveal>
    );
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('renders children in their final state (no fade-in) when reduced motion is preferred', () => {
    mockReducedMotion(true);
    render(
      <Reveal>
        <p>hello</p>
      </Reveal>
    );
    const wrapper = screen.getByText('hello').parentElement as HTMLElement;

    // No reveal wrapper state at all: nothing to transition from.
    expect(wrapper).not.toHaveAttribute('data-reveal');
    expect(wrapper.className).not.toContain('reveal');
  });

  it('shows content already on screen immediately, with no transition', () => {
    // jsdom's zeroed rect puts the element inside the viewport.
    mockReducedMotion(false);
    render(
      <Reveal>
        <p>hello</p>
      </Reveal>
    );
    const wrapper = screen.getByText('hello').parentElement as HTMLElement;

    // 'immediate' is what keeps the hero out of the LCP critical path.
    expect(wrapper).toHaveAttribute('data-reveal', 'immediate');
  });

  it('holds content below the fold hidden until it scrolls into view', () => {
    mockReducedMotion(false);
    mockBelowTheFold();
    const observer = captureObserver();

    render(
      <Reveal>
        <p>hello</p>
      </Reveal>
    );
    const wrapper = screen.getByText('hello').parentElement as HTMLElement;

    expect(wrapper).toHaveAttribute('data-reveal', 'hidden');

    act(() => observer.trigger!(true));

    expect(wrapper).toHaveAttribute('data-reveal', 'shown');
    expect(observer.disconnected).toBe(true);
  });

  it('shows content rather than hiding it forever when IntersectionObserver is missing', () => {
    mockReducedMotion(false);
    mockBelowTheFold();
    vi.stubGlobal('IntersectionObserver', undefined);

    render(
      <Reveal>
        <p>hello</p>
      </Reveal>
    );
    const wrapper = screen.getByText('hello').parentElement as HTMLElement;

    expect(wrapper).toHaveAttribute('data-reveal', 'immediate');
  });
});
