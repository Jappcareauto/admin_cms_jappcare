// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// //   // server: {
// //   //   host: 'ec2-3-138-123-2.us-east-2.compute.amazonaws.com',
// //   //   strictPort: true,
// //   //   port: 5174 // You can change this to your desired port
// //   // }
// //   global: 'window',
// // })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   define: {
//     global: 'window', // This is the correct way
//   },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window', // required for some packages
  },
  server: {
    host: '0.0.0.0',       // allow external connections
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'admin.jappcare.com', // HMR over your domain
      port: 5173,
    },
  },
})


