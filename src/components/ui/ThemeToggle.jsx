import { AnimatePresence, motion } from 'framer-motion';
import useTheme from '../../hooks/useTheme';
import { MoonIcon, SunIcon } from '../../icons';

export default function ThemeToggle() {
  const { theme, isDark, toggleTheme } = useTheme();
  const Icon = isDark ? SunIcon : MoonIcon;
  const label = `Switch to ${isDark ? 'light' : 'dark'} mode`;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-fg/10 bg-fg/[0.04] text-fg/80 backdrop-blur transition-colors hover:border-primary/50 hover:text-primary"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -16, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 16, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.25 }}
        >
          <Icon aria-hidden className="h-5 w-5" />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
