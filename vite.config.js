import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    ViteImageOptimizer({
      webp: {
        quality: 80,
        effort: 4
      },
      png: {
        quality: 80
      },
      jpg: {
        quality: 80
      }
    })
  ],
})
