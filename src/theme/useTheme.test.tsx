import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider, useTheme } from './ThemeProvider';

/**
 * Mock `prefers-color-scheme`. The provider only ever queries the
 * `(prefers-color-scheme: light)` media query, so `matches` reflects
 * whether the system prefers light.
 */
const mockPrefersColorScheme = (scheme: 'light' | 'dark') => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes('light') ? scheme === 'light' : scheme === 'dark',
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

const Consumer = () => {
  const { theme, toggleTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>toggle</button>
      <button onClick={() => setTheme('light')}>set-light</button>
    </div>
  );
};

const renderWithProvider = () =>
  render(
    <ThemeProvider>
      <Consumer />
    </ThemeProvider>
  );

const currentTheme = () => screen.getByTestId('theme').textContent;

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useTheme', () => {
  it('defaults to the system preference when no choice is stored (light)', () => {
    mockPrefersColorScheme('light');
    renderWithProvider();
    expect(currentTheme()).toBe('light');
  });

  it('defaults to the system preference when no choice is stored (dark)', () => {
    mockPrefersColorScheme('dark');
    renderWithProvider();
    expect(currentTheme()).toBe('dark');
  });

  it('uses the persisted localStorage choice over the system preference', () => {
    mockPrefersColorScheme('dark');
    localStorage.setItem('theme', 'light');
    renderWithProvider();
    expect(currentTheme()).toBe('light');
  });

  it('toggleTheme flips light↔dark and persists the new choice', async () => {
    const user = userEvent.setup();
    mockPrefersColorScheme('dark');
    renderWithProvider();
    expect(currentTheme()).toBe('dark');

    await user.click(screen.getByRole('button', { name: 'toggle' }));

    expect(currentTheme()).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('reflects the active theme on the root data-theme attribute', async () => {
    const user = userEvent.setup();
    mockPrefersColorScheme('dark');
    renderWithProvider();

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    await user.click(screen.getByRole('button', { name: 'set-light' }));

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
