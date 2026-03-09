import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config with dev proxy so frontend can call /api and forward to backend
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    hmr: {
      clientPort: 5173,
    },
    proxy: {
      '/api': {
        // Local dev proxy to backend base URL
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
        // Don't log proxy errors - handle silently
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, res) => {
            // Silently handle proxy errors
            if (res && !res.headersSent) {
              res.writeHead(500, {
                'Content-Type': 'application/json',
              });
              res.end(JSON.stringify({ ok: false, error: 'Service unavailable' }));
            }
          });
        },
      }
    }
  },
  // Ensure static assets are served correctly
  publicDir: 'public',
})
