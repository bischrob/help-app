import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const normalizeBase = (value) => {
  if (!value || value === '.') return '/';
  return value.endsWith('/') ? value : `${value}/`;
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: normalizeBase(env.PUBLIC_URL),
    build: {
      outDir: 'build',
    },
    test: {
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
    },
  };
});
