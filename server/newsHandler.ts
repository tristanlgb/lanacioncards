import type { IncomingMessage, ServerResponse } from 'node:http';
import { getNews } from './newsProvider';

export async function newsHandler(request: IncomingMessage, response: ServerResponse) {
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  if (request.method !== 'GET') {
    response.writeHead(405, { Allow: 'GET' });
    response.end(JSON.stringify({ error: 'Método no permitido.' }));
    return;
  }
  try {
    const news = await getNews();
    response.setHeader('Cache-Control', news.stale ? 'no-store' : 'public, max-age=60');
    response.end(JSON.stringify(news));
  } catch {
    response.writeHead(503);
    response.end(
      JSON.stringify({ error: 'No pudimos actualizar las noticias. Intentá nuevamente.' }),
    );
  }
}
