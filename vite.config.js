import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import compression from 'vite-plugin-compression';


const manifest = {
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "icons": [
    {
      "purpose": "maskable",
      "sizes": "512x512",
      "src": "/icon512_maskable.png",
      "type": "image/png"
    },
    {
      "purpose": "any",
      "sizes": "512x512",
      "src": "/icon512_rounded.png",
      "type": "image/png"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/desktop.png",
      "type": "image/png",
      "sizes": "1905x922",
      "form_factor": "wide"
    },
    {
      "src": "/screenshots/mobile.png",
      "type": "image/png",
      "sizes": "374x677",
      "form_factor": "narrow"
    }
  ],
  "orientation": "portrait",
  "display": "standalone",
  "dir": "auto",
  "lang": "ru",
  "name": "Tabys Stroy",
  "short_name": "Tabys",
  "start_url": "/",
  "description": "Tabys Stroy — магазин строительных и отделочных материалов в Улытауском области. Широкий выбор товаров для ремонта, инструменты, краски, сантехника, электрика и многое другое."
};

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globDirectory: 'dev-dist', // Убедитесь, что путь правильный
        globPatterns: ['**/*.{js,css,html,png,jpg,svg,ico}'],
        maximumFileSizeToCacheInBytes: 4000000,
      },
      manifest: {
        name: 'Tabys Stroy',
        short_name: 'Tabys',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
      },
    })
  ],
  base: '/'
});