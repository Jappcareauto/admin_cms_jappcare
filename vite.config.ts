import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'ec2-3-138-123-2.us-east-2.compute.amazonaws.com',
    strictPort: true,
    port: 5173 // You can change this to your desired port
  }
})
