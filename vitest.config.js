import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  server: { open: true },
  plugins: [tsconfigPaths(), react()],
  test: {
    server: { deps: { inline: ['convex-test'] } },
    exclude: ['node_modules', 'dist', '.next'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./app/__tests__/vitest-setup.ts'],
    maxConcurrency: 8,
    coverage: {
      provider: 'v8',
      all: true,
      include: ['**/*.{ts,tsx}'],
      exclude: [
        '__tests__/**',
        '__tests__/__mocks__/**',
        '**/*.config.*',
        '**/*.d.ts',
        '**/types/**',
        'app/_pages/**',
        'app/\\[locale\\]/**',
      ],
      extension: ['.ts', '.tsx'],
      reporter: ['text', 'lcov'],
    },
    slowTestThreshold: 2000,
    silent: true,
  },
});
