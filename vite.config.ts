import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Note: @vitejs/plugin-react v6 transforms with Oxc and ignores babel.config.cjs,
// which exists solely for Jest (babel-jest).
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
