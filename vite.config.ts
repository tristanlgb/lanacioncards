import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { newsHandler } from './server/newsHandler';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'GNEWS_');
  if (env.GNEWS_API_KEY && !process.env.GNEWS_API_KEY) {
    process.env.GNEWS_API_KEY = env.GNEWS_API_KEY;
  }
  return {
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
  };
});
