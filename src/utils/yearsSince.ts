/** The year my career started; every "N+ years" on the site counts from it. */
export const CAREER_START_YEAR = 2003;

/** Whole years from `startYear` to the year of `now` (this year, by default). */
export const yearsSince = (startYear: number, now: Date = new Date()): number =>
  Math.max(0, now.getFullYear() - startYear);

/** `"23+ years"` in 2026: the years since the career started, with the plus kept. */
export const experienceLabel = (now: Date = new Date()): string =>
  `${yearsSince(CAREER_START_YEAR, now)}+ years`;
