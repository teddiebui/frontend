/// <reference types="vitest/config" />
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      exclude: [
        'src/lib/http/httpClient.ts',
        'src/types/index.ts',
      ],
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

})