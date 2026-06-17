import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3,
        unsafe: true,
        unsafe_math: true,
        pure_getters: true,
        collapse_vars: true,
        reduce_vars: true,
      },
      mangle: {
        toplevel: true,
        eval: true,
        properties: {
          regex: /^_/,
        },
      },
      format: {
        comments: false,
        ascii_only: true,
      },
    },
    rollupOptions: {
      output: {
        // Scramble chunk filenames
        entryFileNames: `a/[hash].js`,
        chunkFileNames: `a/[hash].js`,
        assetFileNames: `a/[hash].[ext]`,
        manualChunks: undefined,
      },
    },
  },
})
