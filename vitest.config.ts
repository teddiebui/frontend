/// <reference types="vitest/config" />
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    watch: false,
    globals: true,
    coverage: {
      include: ['src/services/**/*.ts'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

})