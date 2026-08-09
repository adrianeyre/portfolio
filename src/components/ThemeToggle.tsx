import { FiMonitor, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme, type ThemePreference } from '../theme/ThemeProvider';

/** Cycle order when the button is clicked. */
const ORDER: ThemePreference[] = ['system', 'light', 'dark'];

const LABELS: Record<ThemePreference, string> = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
};

const ICONS = {
  system: FiMonitor,
  light: FiSun,
  dark: FiMoon,
};

/**
 * Compact theme control wired into the NavBar. Shows only the currently
 * active option's icon and cycles System → Light → Dark on each click.
 * The chosen preference is persisted by the ThemeProvider.
 */
const ThemeToggle = () => {
  const { preference, setPreference } = useTheme();
  const Icon = ICONS[preference];
  const label = LABELS[preference];
  const next = ORDER[(ORDER.indexOf(preference) + 1) % ORDER.length];

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setPreference(next)}
      aria-label={`Colour theme: ${label}. Click to change.`}
      title={`Theme: ${label}`}
    >
      <Icon aria-hidden={true} />
    </button>
  );
};

export default ThemeToggle;
