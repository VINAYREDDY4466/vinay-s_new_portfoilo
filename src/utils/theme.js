// Key and logic must stay in sync with the inline no-flash script in index.html.
export const THEME_STORAGE_KEY = 'theme';
export const THEMES = { light: 'light', dark: 'dark' };

const LIGHT_QUERY = '(prefers-color-scheme: light)';
const THEME_COLORS = { light: '#f8f9fc', dark: '#070812' };

export const isValidTheme = (value) => value === THEMES.light || value === THEMES.dark;

export function readStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isValidTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage blocked (private mode / disabled cookies) — theme still works for this session.
  }
}

export const subscribeToSystemTheme = (onChange) => {
  const mediaQuery = window.matchMedia(LIGHT_QUERY);
  const handleChange = () => onChange(mediaQuery.matches ? THEMES.light : THEMES.dark);
  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
};

/** The inline script in index.html applies the class before first paint, so the DOM is the source of truth. */
export const getInitialTheme = () =>
  document.documentElement.classList.contains(THEMES.dark) ? THEMES.dark : THEMES.light;

export function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.toggle(THEMES.dark, theme === THEMES.dark);
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
}
