import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // add our testing environment.
  test: {
    environment: "jsdom", // fake browser
    setupFiles: ["../src/test/setup.js"], // run before the tests
    globals: true
  }
})
