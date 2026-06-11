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
    readonly thresholds = [];
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
    constructor(_callback: IntersectionObserverCallback) {}
  }
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
}

// Unmount React trees and reset jsdom between tests.
afterEach(() => {
  cleanup();
});
