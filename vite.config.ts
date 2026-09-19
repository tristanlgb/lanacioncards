import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { newsHandler } from './server/newsHandler';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'public-news-api',
      configureServer(server) {
        server.middlewares.use('/api/news', (request, response) => {
          void newsHandler(request, response);
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use('/api/news', (request, response) => {
          void newsHandler(request, response);
        });
      },
    },
  ],
});
