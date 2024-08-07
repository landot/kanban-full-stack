import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' 

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
  },
  plugins: [
    react(), 
    svgr({ 
      svgrOptions: {
        // svgr options
      },
    }),
  ], 
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    include: ["src/**/*.test.tsx", "features/**/*.test.ts"],
    mockReset: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      all: true,
      testMatch: ["./tests/**/*.test.tsx"],
      include: ['src/components', 'features'],
      exclude: ['src/**/*.stories.{ts,tsx}', 'src/components/styles', "**/*.test.{ts,tsx}"]
    },
  },
})
