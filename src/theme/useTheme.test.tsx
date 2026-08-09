import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider, useTheme } from './ThemeProvider';

/**
 * Mock `prefers-color-scheme` with a mutable scheme so tests can also
 * simulate the OS switching themes at runtime. `matches` is a getter so it
 * always reflects the current `systemScheme`.
 */
let systemScheme: 'light' | 'dark' = 'dark';
let changeHandlers: Array<() => void> = [];

const mockMatchMedia = () => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    get matches() {
      return query.includes('light')
        ? systemScheme === 'light'
        : systemScheme === 'dark';
    },
    media: query,
    onchange: null,
    addEventListener: (_event: string, cb: () => void) =>
      changeHandlers.push(cb),
    removeEventListener: (_event: string, cb: () => void) => {
      changeHandlers = changeHandlers.filter((handler) => handler !== cb);
    },
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

const setSystemScheme = (scheme: 'light' | 'dark') => {
  systemScheme = scheme;
};

const triggerSystemChange = (scheme: 'light' | 'dark') => {
  systemScheme = scheme;
  act(() => changeHandlers.forEach((handler) => handler()));
};

const Consumer = () => {
  const { theme, preference, setPreference } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="preference">{preference}</span>
      <button onClick={() => setPreference('light')}>set-light</button>
      <button onClick={() => setPreference('dark')}>set-dark</button>
      <button onClick={() => setPreference('system')}>set-system</button>
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
const currentPreference = () => screen.getByTestId('preference').textContent;

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  systemScheme = 'dark';
  changeHandlers = [];
  mockMatchMedia();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useTheme', () => {
  it('defaults to the system preference when nothing is stored', () => {
    setSystemScheme('light');
    renderWithProvider();
    expect(currentPreference()).toBe('system');
    expect(currentTheme()).toBe('light');
  });

  it('resolves the system preference to dark when the OS prefers dark', () => {
    setSystemScheme('dark');
    renderWithProvider();
    expect(currentPreference()).toBe('system');
    expect(currentTheme()).toBe('dark');
  });

  it('uses a persisted explicit choice over the system preference', () => {
    setSystemScheme('dark');
    localStorage.setItem('theme', 'light');
    renderWithProvider();
    expect(currentPreference()).toBe('light');
    expect(currentTheme()).toBe('light');
  });

  it('setPreference persists an explicit choice and applies it', async () => {
    const user = userEvent.setup();
    setSystemScheme('light');
    renderWithProvider();
    expect(currentTheme()).toBe('light');

    await user.click(screen.getByRole('button', { name: 'set-dark' }));

    expect(currentTheme()).toBe('dark');
    expect(currentPreference()).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('returning to system re-follows the OS and persists "system"', async () => {
    const user = userEvent.setup();
    setSystemScheme('light');
    localStorage.setItem('theme', 'dark');
    renderWithProvider();
    expect(currentTheme()).toBe('dark');

    await user.click(screen.getByRole('button', { name: 'set-system' }));

    expect(currentPreference()).toBe('system');
    expect(currentTheme()).toBe('light');
    expect(localStorage.getItem('theme')).toBe('system');
  });

  it('follows live OS changes while on the system preference', () => {
    setSystemScheme('light');
    renderWithProvider();
    expect(currentTheme()).toBe('light');

    triggerSystemChange('dark');
    expect(currentTheme()).toBe('dark');
  });

  it('ignores live OS changes once an explicit choice is made', async () => {
    const user = userEvent.setup();
    setSystemScheme('light');
    renderWithProvider();

    await user.click(screen.getByRole('button', { name: 'set-light' }));
    expect(currentTheme()).toBe('light');

    triggerSystemChange('dark');
    expect(currentTheme()).toBe('light');
  });

  it('reflects the active theme on the root data-theme attribute', async () => {
    const user = userEvent.setup();
    setSystemScheme('dark');
    renderWithProvider();

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    await user.click(screen.getByRole('button', { name: 'set-light' }));

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
