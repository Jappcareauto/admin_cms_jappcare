import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or your framework

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allow external access
    port: 5173, // match your container port
    strictPort: true,
    hmr: {
      host: 'admin.jappcare.com',
    },
    allowedHosts: ['admin.jappcare.com'], // <-- ADD THIS LINE
  },
})
