import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// Change REPO_NAME to your GitHub repository name for Pages deployment
const REPO_NAME = 'italy-trip-spa';

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? `/${REPO_NAME}/` : '/',
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
