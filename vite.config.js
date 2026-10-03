import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'https://reword-hub.runasp.net',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})