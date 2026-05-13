import { defineConfig } from 'vite';
import ktjsx from '@ktjs/vite-plugin-ktjsx';

// Vite config for KT.js development
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist/web',
    emptyOutDir: true,
  },
  plugins: [ktjsx()],
});
