/// <reference types="vitest/config" />
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})