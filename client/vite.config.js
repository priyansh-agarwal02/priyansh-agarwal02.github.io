import { defineConfig } from 'vite'
import react from '@react-three/drei'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio-website/',
}) 