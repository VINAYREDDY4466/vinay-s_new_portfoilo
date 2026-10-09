import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // API runs in the Worker (`npm run dev:api`); Vite forwards /api calls to it during development.
    proxy: { '/api': 'http://127.0.0.1:8787' },
  },
  build: {
    // The `three` chunk is ~800 kB but only lazy-loaded by the hero scene, never on first paint.
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
