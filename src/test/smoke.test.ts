import { describe, expect, it } from 'vitest';

// Trivial test proving the Vitest + jsdom test runner is wired up.
describe('test runner', () => {
  it('runs and asserts', () => {
    expect(1 + 1).toBe(2);
  });

  it('has a jsdom document', () => {
    expect(typeof document).toBe('object');
  });
});
