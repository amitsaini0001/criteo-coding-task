import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { name } from "./package.json"

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${name}/`,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
