import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',   // assure l'injection du lien manifest et du register SW
      manifest: {
        name: 'Todo Simple',
        short_name: 'Todo',
        description: 'Une to-do list simple et rapide',
        theme_color: '#2563eb',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 Mo
      },
      devOptions: {
        enabled: true,  // utile pour le mode dev
      }
    })
  ]
})
