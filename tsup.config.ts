// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts', '!src/**/__tests__/**', '!src/**/*.test.*'],
  bundle: false,
  format: ['cjs', 'esm'],
  target: 'esnext',
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});
