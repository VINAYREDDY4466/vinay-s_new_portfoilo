// Mirrors the CSS design tokens in src/index.css (indigo + sky), tuned per theme.
export const scenePalettes = {
  dark: {
    ocean: '#0e1030',
    oceanRim: '#4f46e5',
    land: '#a5b4fc',
    landOpacity: 0.9,
    atmosphere: '#6366f1',
    atmosphereIntensity: 1.1,
    arc: '#38bdf8',
    home: '#e0e7ff',
    star: '#c7d2fe',
    starOpacity: 0.75,
    additiveStars: true,
  },
  light: {
    ocean: '#eef0ff',
    oceanRim: '#a5b4fc',
    land: '#4f46e5',
    landOpacity: 0.85,
    atmosphere: '#818cf8',
    atmosphereIntensity: 0.55,
    arc: '#0284c7',
    home: '#4338ca',
    star: '#6366f1',
    starOpacity: 0.45,
    additiveStars: false,
  },
};
