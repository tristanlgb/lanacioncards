import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import handler from '../api/news';
import { getNews } from './newsProvider';

vi.mock('./newsProvider', () => ({ getNews: vi.fn() }));

const server = createServer(handler);
let url: string;
beforeAll(async () => {
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  url = `http://127.0.0.1:${(server.address() as AddressInfo).port}/api/news`;
});
afterAll(async () => {
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
});
beforeEach(() => vi.resetAllMocks());

describe('Vercel news entrypoint', () => {
  it('serves the provider response as JSON', async () => {
    const news = {
      stories: [],
      source: 'Test provider',
      updatedAt: new Date().toISOString(),
      stale: false,
    };
    vi.mocked(getNews).mockResolvedValue(news);
    const response = await fetch(url);
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('application/json');
    expect(await response.json()).toEqual(news);
  });
  it('returns a JSON error when the provider is unavailable', async () => {
    vi.mocked(getNews).mockRejectedValue(new Error('Unavailable'));
    const response = await fetch(url);
    expect(response.status).toBe(503);
    expect(await response.json()).toHaveProperty('error');
  });
  it('rejects writes without querying the provider', async () => {
    const response = await fetch(url, { method: 'POST' });
    expect(response.status).toBe(405);
    expect(response.headers.get('allow')).toBe('GET');
    expect(getNews).not.toHaveBeenCalled();
  });
});
