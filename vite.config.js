import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],

   resolve: {
    // Ensure Vite resolves .js and .jsx files
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  }

});
