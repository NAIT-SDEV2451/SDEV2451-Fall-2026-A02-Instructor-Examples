import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// make tailwind available to our vite project.
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  // include the plugin below.
  plugins: [react(), tailwindcss()],
})
