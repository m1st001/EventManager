/// <reference types="vite/types/importMeta.d.ts" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const prod = mode === 'production';

  return {
    plugins: [react()],
    define: {
      'process.env': process.env
    },
    base: '/EventManager/',
    server: {
      port: parseInt(env.VITE_PORT),
      proxy: {
        '/api': {
          target: prod ? "" : process.env.services__webapi__https__0 ||
              process.env.services__webapi__http__0,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
        }
      }
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: './index.html'
      }
    }
  }
})