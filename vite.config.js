import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cef: resolve(__dirname, 'cef-design-system.html'),
        booking: resolve(__dirname, 'booking-engine.html'),
        ilunion: resolve(__dirname, 'ilunion-cro.html'),
        itops: resolve(__dirname, 'it-ops-oracle.html'),
        paolo: resolve(__dirname, 'paolo-pizzeria.html'),
        cv: resolve(__dirname, 'cv-marta.html'),
        cven: resolve(__dirname, 'cv-marta-en.html'),
        cvatses: resolve(__dirname, 'cv-marta-ats-es.html'),
        cvatsen: resolve(__dirname, 'cv-marta-ats-en.html'),
        cv2026: resolve(__dirname, 'CV_Marta_Morales_2026.html'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
