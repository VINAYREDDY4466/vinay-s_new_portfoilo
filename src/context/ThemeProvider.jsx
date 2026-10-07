import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  applyTheme,
  getInitialTheme,
  isValidTheme,
  readStoredTheme,
  storeTheme,
  subscribeToSystemTheme,
  THEME_STORAGE_KEY,
  THEMES,
} from '../utils/theme';
import { ThemeContext } from './ThemeContext';

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const [hasUserChoice, setHasUserChoice] = useState(() => readStoredTheme() !== null);

  useEffect(() => applyTheme(theme), [theme]);

  useEffect(() => {
    if (hasUserChoice) storeTheme(theme);
  }, [theme, hasUserChoice]);

  // Follow the OS setting until the visitor picks a theme explicitly.
  useEffect(() => (hasUserChoice ? undefined : subscribeToSystemTheme(setTheme)), [hasUserChoice]);

  // Keep multiple open tabs in sync.
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== THEME_STORAGE_KEY || !isValidTheme(event.newValue)) return;
      setHasUserChoice(true);
      setTheme(event.newValue);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleTheme = useCallback(() => {
    setHasUserChoice(true);
    setTheme((current) => (current === THEMES.dark ? THEMES.light : THEMES.dark));
  }, []);

  const value = useMemo(() => ({ theme, isDark: theme === THEMES.dark, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
