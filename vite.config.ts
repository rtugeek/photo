import { URL, fileURLToPath } from 'node:url'
import widget from '@widget-js/vite-plugin-widget'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/photo',
  plugins: [vue(), widget(), AutoImport({
    resolvers: [ElementPlusResolver()],
  }), Components({
    resolvers: [ElementPlusResolver()],
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
