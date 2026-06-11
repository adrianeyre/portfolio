import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Reveal from './Reveal';

/**
 * Mock `prefers-reduced-motion`. Framer Motion's `useReducedMotion`
 * queries the `(prefers-reduced-motion: reduce)` media query.
 */
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

afterEach(() => {
  vi.restoreAllMocks();
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
    const child = screen.getByText('hello');
    const wrapper = child.parentElement as HTMLElement;
    // No animated initial state is applied: the wrapper is fully opaque
    // and untranslated from the moment it mounts.
    expect(wrapper.style.opacity).toBe('');
    expect(wrapper.style.transform).toBe('');
  });

  it('applies an animated initial state when motion is allowed', () => {
    mockReducedMotion(false);
    render(
      <Reveal>
        <p>hello</p>
      </Reveal>
    );
    const wrapper = screen.getByText('hello').parentElement as HTMLElement;
    // Framer Motion sets the hidden initial state synchronously on mount.
    expect(wrapper.style.opacity).toBe('0');
  });
});
