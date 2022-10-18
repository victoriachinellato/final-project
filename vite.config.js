import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // carpeta donde creara el build
  build: { outDir: 'docs' },
  // comprobamos si estamos en produccion y la base es el nombre del repositorio, sino raiz
  base: process.env.NODE_ENV === 'production' ? '/final-project/' : '/'
})
