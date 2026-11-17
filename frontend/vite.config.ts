import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'BRINDA',
        short_name: 'BRINDA',
        display: 'standalone',
        start_url: '/',
        theme_color: '#151b19',
        background_color: '#151b19',
        icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }]
      }
    })
  ],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': process.env.VITE_API_ORIGIN || 'http://localhost:3001'
    }
  }
});