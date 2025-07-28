import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'public',         // робочий каталог для Vite — public/
  plugins: [react()],
  build: {
    outDir: '../dist',    // результат збірки покладемо в /dist поруч із public/
    emptyOutDir: true
  }
})