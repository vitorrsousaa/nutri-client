import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    alias: {
      '@godiet-ui': path.resolve(__dirname, './src/libs/ui/components'),
      '@godiet-hooks': path.resolve(__dirname, './src/hooks'),
      '@godiet-entities': path.resolve(__dirname, './src/entities'),
      '@godiet-components': path.resolve(__dirname, './src/components'),
      '@godiet-utils': path.resolve(__dirname, './src/utils'),
      '@godiet-types': path.resolve(__dirname, './src/types'),
      '@godiet-services': path.resolve(__dirname, './src/service'),
      '@godiet-query': path.resolve(__dirname, './src/libs/query/index.ts'),
    },
  },
});
