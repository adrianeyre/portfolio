import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// jsdom does not implement IntersectionObserver, which Framer Motion's
// `whileInView` and our scroll-spy logic rely on. Provide a no-op stub so
// components that observe the viewport can mount in tests.
if (!('IntersectionObserver' in globalThis)) {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '';
    readonly scrollMargin = '';
    readonly thresholds = [];
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
    constructor(_callback: IntersectionObserverCallback) {}
  }
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
}

// jsdom has no matchMedia. The theme, reduced-motion and Stageshow hooks all
// ask it questions; "no match" (no reduced motion, no light preference) is the
// default a browser with no settings would give.
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
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

// jsdom has no ResizeObserver either; the Stageshow kit measures its stages
// with one. A no-op is enough for the tests, which never resize anything.
if (!('ResizeObserver' in globalThis)) {
  class MockResizeObserver implements ResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    constructor(_callback: ResizeObserverCallback) {}
  }
  vi.stubGlobal('ResizeObserver', MockResizeObserver);
}

// Unmount React trees and reset jsdom between tests.
afterEach(() => {
  cleanup();
});
