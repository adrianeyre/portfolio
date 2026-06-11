import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../theme/ThemeProvider';

/**
 * Accessible light/dark switch wired into the NavBar.
 * Renders a real <button> so it is focusable and keyboard-operable for free.
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const nextLabel = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={nextLabel}
      aria-pressed={isDark}
      title={nextLabel}
    >
      {isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
    </button>
  );
};

export default ThemeToggle;
