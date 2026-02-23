import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api-ambiente-escolar-sql-1.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/notas': {
        target: 'https://api-ambiente-escolar-sql-1.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
