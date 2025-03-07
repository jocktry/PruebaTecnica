import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://www.fruityvice.com/api',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          console.log('Rewriting path:', path);
          return path.replace(/^\/api/, '');
        },
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxying request:', req.url);
          });
        },
      },
    },
  },
});