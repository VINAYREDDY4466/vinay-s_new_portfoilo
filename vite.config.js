import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
