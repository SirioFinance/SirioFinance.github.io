import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: [/node_modules\/hashconnect/],
    }),
  ],
  define: {
    global: 'window',
  },
  build: {
    commonjsOptions: { transformMixedEsModules: true }, // Change
  },
  server: {
    mimeTypes: {
      '.jsx': 'application/javascript', // Added to fix MIME type issue
    },
  },
})
