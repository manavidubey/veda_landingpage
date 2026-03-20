import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/__': {
        target: 'https://veda-b2b38.firebaseapp.com',
        changeOrigin: true,
      }
    }
  }
})
