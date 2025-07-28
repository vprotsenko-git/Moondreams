// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'public',      // будемо брати index.html з public/
  build: {
    outDir: '../dist', // зберігатиметься ../dist
    emptyOutDir: true,
  },
  plugins: [react()],
})