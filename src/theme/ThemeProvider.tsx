import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

/** The resolved theme that is actually applied to the document. */
export type Theme = 'light' | 'dark';

/**
 * What the user has chosen. `system` (the default) defers to the OS
 * `prefers-color-scheme` setting and tracks it live.
 */
export type ThemePreference = 'light' | 'dark' | 'system';

export interface ThemeContextValue {
  /** The resolved theme currently applied (never `system`). */
  theme: Theme;
  /** The user's saved preference, including `system`. */
  preference: ThemePreference;
  /** Persist a new preference. */
  setPreference: (preference: ThemePreference) => void;
}

const STORAGE_KEY = 'theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Reads the saved preference. Anything unrecognised (or unavailable
 * storage) falls back to `system`, which is the site default.
 */
const readStoredPreference = (): ThemePreference => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    // localStorage can throw in private-mode / sandboxed contexts.
  }
  return 'system';
};

/**
 * Resolves the OS colour scheme. Mirrors the original fallback order:
 * when `matchMedia` is unavailable we default to dark (the site's
 * original default); otherwise light only when the OS asks for it.
 */
const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
};

const resolveTheme = (preference: ThemePreference, systemTheme: Theme): Theme =>
  preference === 'system' ? systemTheme : preference;

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [preference, setPreferenceState] =
    useState<ThemePreference>(readStoredPreference);
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);

  const theme = resolveTheme(preference, systemTheme);

  // Track the OS colour scheme so a `system` preference updates live.
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const query = window.matchMedia('(prefers-color-scheme: light)');
    const handleChange = () => setSystemTheme(getSystemTheme());
    // Re-sync in case the scheme changed between initial state and effect.
    handleChange();
    query.addEventListener?.('change', handleChange);
    return () => query.removeEventListener?.('change', handleChange);
  }, []);

  // Reflect the resolved theme onto the document root.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Persist the user's preference (including `system`).
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      // Ignore persistence failures — the in-memory preference still works.
    }
  }, [preference]);

  const setPreference = useCallback(
    (next: ThemePreference) => setPreferenceState(next),
    []
  );

  return (
    <ThemeContext.Provider value={{ theme, preference, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
