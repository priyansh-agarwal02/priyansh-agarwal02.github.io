import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // 👈 Root path for GitHub Pages user site
  plugins: [react()],
})
