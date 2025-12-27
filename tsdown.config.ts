import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['bin/**/*.ts'],
  exports: true,
  format: ['esm'],
  clean: true,
  dts: false, // Disable type definitions for CLI tool
  platform: 'node',
  target: 'node18',
  outDir: 'dist',
  treeshake: true,
  minify: false, // Keep readable for debugging
  sourcemap: true,
  env: {
    NODE_ENV: 'production'
  }
});