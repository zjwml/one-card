/*
 * @Autor: zhenjun
 * @Date: 2024-08-15 16:43:21
 * @LastEditors: zhenjun
 * @LastEditTime: 2024-09-10 14:08:47
 * @Description:
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: 'maple'
  },
  // publicDir: '/public',
  server: {
    proxy: {
      '/mapleApi': {
        target: 'http://localhost:1145/',
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/mapleApi/, '')
        }
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      resolvers: [
        TDesignResolver({
          library: 'vue-next'
        })
      ]
    }),
    Components({
      resolvers: [
        TDesignResolver({
          library: 'vue-next'
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
