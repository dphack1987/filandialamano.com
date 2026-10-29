import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    copyPublicDir: true,
    chunkSizeWarningLimit: 400,
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react/')) {
              return 'react-core'
            }
            if (id.includes('leaflet') || id.includes('react-leaflet')) {
              return 'leaflet-vendor'
            }
            if (id.includes('lucide-react')) {
              return 'icons-vendor'
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor'
            }
            if (id.includes('zustand')) {
              return 'state-vendor'
            }
            return 'vendor'
          }
          if (id.includes('/services/')) {
            return 'services'
          }
          if (id.includes('/components/')) {
            return 'components'
          }
          if (id.includes('/store/')) {
            return 'store'
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    target: 'esnext',
    cssCodeSplit: true,
    reportCompressedSize: true,
    assetsInlineLimit: 4096
  },
  publicDir: 'public',
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: false,
    open: false
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'leaflet',
      'lucide-react',
      'framer-motion',
      'zustand'
    ],
    force: false
  }
})
