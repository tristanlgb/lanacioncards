import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import sirv from 'sirv';
import { newsHandler } from './newsHandler';
import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';

if (existsSync('.env')) loadEnvFile('.env');

const serveStatic = sirv(fileURLToPath(new URL('../dist', import.meta.url)), { single: true });
const port = Number(process.env.PORT ?? 3000);
createServer((request, response) => {
  if (request.url?.split('?')[0] === '/api/news') {
    void newsHandler(request, response);
    return;
  }
  serveStatic(request, response);
}).listen(port, () => console.log('App y API disponibles en http://localhost:' + port));
