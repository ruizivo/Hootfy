import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    preact(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://127.0.0.1:3000', // porta do seu backend 
        ws: true, // MUITO IMPORTANTE: ativa proxy para WebSocket
      },
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err, req, res) => {
            console.error('[vite] proxy error:', req.url, err.message);
            res.writeHead(500, {
              'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ error: 'Proxy error', detail: err.message }));
          });
        }
      },
      '/html': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        secure: false,
      }
    },
  },
})
