import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@godiet-ui': path.resolve(__dirname, './src/libs/ui/components'),
      '@godiet-hooks': path.resolve(__dirname, './src/hooks'),
      '@godiet-entities': path.resolve(__dirname, './src/entities'),
      '@godiet-components': path.resolve(__dirname, './src/components'),
    },
  },
});
