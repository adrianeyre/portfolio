import { describe, expect, it } from 'vitest';
import { CAREER_START_YEAR, experienceLabel, yearsSince } from './yearsSince';

describe('yearsSince', () => {
  it('counts whole years from the start year to the given date', () => {
    expect(yearsSince(2003, new Date(2026, 10, 5))).toBe(23);
    expect(yearsSince(2003, new Date(2030, 0, 1))).toBe(27);
  });

  it('never goes negative', () => {
    expect(yearsSince(2003, new Date(2000, 0, 1))).toBe(0);
  });
});

describe('experienceLabel', () => {
  it('counts from the career start year and keeps the plus', () => {
    expect(CAREER_START_YEAR).toBe(2003);
    expect(experienceLabel(new Date(2026, 10, 5))).toBe('23+ years');
  });
});
