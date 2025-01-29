// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   base: '/FoodConnect/', // Ensure this starts and ends with a '/'
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ['react', 'react-dom'],
//         },
//       },
//     },
//     chunkSizeWarningLimit: 500,
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/FoodConnect/", // Ensure this starts and ends with a '/'
  plugins: [react()],
  build: {
    outDir: "dist", // Build output folder
    rollupOptions: {
      input: "index.html", // Ensure the correct entry point
    },
  },
});
