/** @type {import('tailwindcss').Config} */
const withAlpha = (variable) => `rgb(var(${variable}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', md: '2rem', lg: '3rem' },
      screens: { '2xl': '1320px' },
    },
    extend: {
      colors: {
        bg: withAlpha('--c-bg'),
        surface: withAlpha('--c-surface'),
        fg: withAlpha('--c-fg'),
        muted: withAlpha('--c-muted'),
        primary: {
          DEFAULT: withAlpha('--c-primary'),
          solid: withAlpha('--c-primary-solid'),
        },
        secondary: withAlpha('--c-secondary'),
        success: withAlpha('--c-success'),
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 8vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.25rem, 5vw, 4.25rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        glow: '0 0 48px -10px rgb(var(--c-primary-solid) / 0.7)',
        card: '0 1px 2px rgb(var(--c-fg) / 0.04), 0 16px 40px -20px rgb(var(--c-fg) / 0.18)',
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgb(var(--c-fg) / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--c-fg) / 0.06) 1px, transparent 1px)',
        noise:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        grid: '64px 64px',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(8%, 6%, 0) scale(1.15)' },
        },
        'scroll-cue': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        aurora: 'aurora 18s ease-in-out infinite',
        'scroll-cue': 'scroll-cue 1.8s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite',
      },
    },
  },
  plugins: [],
};
