///// filepath: /vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

const manifest = {
  "theme_color":"#ff0000",
  "background_color":"#ffffff",
  "icons":[{"purpose":"maskable",
    "sizes":"512x512",
    "src":"icon512_maskable.png",
    "type":"image/png"},
    {"purpose":"any",
      "sizes":"512x512",
      "src":"icon512_rounded.png",
      "type":"image/png"
    }],
    screenshots : [
      {
      src: '/public/screenshots/desktop.png',
      tipe : 'image/png',
      sizes : '1905x922',
      form_factor : 'wide',
    },
    {
      src: '/public/screenshots/mobile.png',
      tipe : 'image/png',
      sizes : '374x677',
      form_factor : 'narrow',
    },
  ],
    "orientation":"any",
    "display":"standalone",
    "dir":"auto",
    "lang":"ru",
    "name":"Tabys Stroy",
    "short_name":"Tabys",
    "start_url":"tabys-stroy.kz"
};

export default defineConfig({
  plugins: [react(),
    VitePWA({
    registerType : 'autoUpdate',
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,jpg,svg,ico}"],
    },
    manifest: manifest,
  })
  ],

  base: '/'
})

