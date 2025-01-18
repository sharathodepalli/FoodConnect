import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // Exclude dependencies that you don't want pre-bundled
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Split React and React DOM into a separate chunk
        },
      },
    },
    chunkSizeWarningLimit: 500, // Adjust the chunk size warning limit if needed
  },
});
