import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useScrollSpy } from './useScrollSpy';

type ObserverCallback = (entries: Array<Partial<IntersectionObserverEntry>>) => void;

let observerCallback: ObserverCallback;
let observed: Set<Element>;

/**
 * Mock `IntersectionObserver`, capturing the callback so tests can drive
 * intersection entries through it, and recording observed targets.
 */
const mockIntersectionObserver = () => {
  observed = new Set();
  class MockIntersectionObserver {
    constructor(callback: ObserverCallback) {
      observerCallback = callback;
    }
    observe = (el: Element) => observed.add(el);
    unobserve = (el: Element) => observed.delete(el);
    disconnect = () => observed.clear();
    takeRecords = () => [];
    root = null;
    rootMargin = '';
    thresholds = [];
  }
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
};

/** Build a fake entry for the section element with the given id. */
const entryFor = (id: string, isIntersecting: boolean, ratio = isIntersecting ? 1 : 0) => ({
  target: document.getElementById(id) as Element,
  isIntersecting,
  intersectionRatio: ratio,
});

const SECTIONS = ['about', 'skills', 'projects'];

const Spy = ({ ids }: { ids: string[] }) => {
  const active = useScrollSpy(ids);
  return <span data-testid="active">{active ?? 'none'}</span>;
};

const active = () => screen.getByTestId('active').textContent;

beforeEach(() => {
  mockIntersectionObserver();
  document.body.innerHTML = SECTIONS.map((id) => `<section id="${id}"></section>`).join('');
});

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = '';
});

describe('useScrollSpy', () => {
  it('returns null until a section is in view', () => {
    render(<Spy ids={SECTIONS} />);
    expect(active()).toBe('none');
  });

  it('observes an element for every provided id', () => {
    render(<Spy ids={SECTIONS} />);
    expect(observed.size).toBe(SECTIONS.length);
  });

  it('returns the id of the section reported as intersecting', () => {
    render(<Spy ids={SECTIONS} />);
    act(() => observerCallback([entryFor('skills', true)]));
    expect(active()).toBe('skills');
  });

  it('updates the active id as a different section intersects', () => {
    render(<Spy ids={SECTIONS} />);

    act(() => observerCallback([entryFor('about', true)]));
    expect(active()).toBe('about');

    act(() =>
      observerCallback([entryFor('about', false), entryFor('projects', true)])
    );
    expect(active()).toBe('projects');
  });

  it('prefers the more-visible section when several intersect', () => {
    render(<Spy ids={SECTIONS} />);
    act(() =>
      observerCallback([
        entryFor('about', true, 0.2),
        entryFor('skills', true, 0.8),
      ])
    );
    expect(active()).toBe('skills');
  });

  it('breaks ties in favour of the earlier section in the list', () => {
    render(<Spy ids={SECTIONS} />);
    act(() =>
      observerCallback([
        entryFor('skills', true, 0.5),
        entryFor('projects', true, 0.5),
      ])
    );
    expect(active()).toBe('skills');
  });
});
