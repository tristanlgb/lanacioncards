import { createHash } from 'node:crypto';
import { XMLParser } from 'fast-xml-parser';
import type { Category, NewsResponse, Story } from '../src/types/news';
import { isRecord, safeHttpUrl } from '../src/utils/validation';

const FEED_URL = 'https://www.lanacion.com.ar/arc/outboundfeeds/rss/?outputType=xml';
const CACHE_DURATION_MS = 5 * 60 * 1000;
const MAX_STALE_MS = 60 * 60 * 1000;
const parser = new XMLParser({ ignoreAttributes: false, processEntities: true });
let cache: NewsResponse | null = null;
let pendingRequest: Promise<NewsResponse> | null = null;

function text(value: unknown): string {
  if (typeof value === 'string')
    return value
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  if (isRecord(value)) return text(value['#text']);
  return '';
}

function categoryFor(value: unknown, url: string): Category {
  const label = text(Array.isArray(value) ? value[0] : value).toLowerCase();
  const candidate = label + ' ' + new URL(url).pathname;
  if (/politica|política/.test(candidate)) return 'Política';
  if (/economia|economía|negocios|dolar|campo/.test(candidate)) return 'Economía';
  if (/deport|futbol|fútbol|tenis/.test(candidate)) return 'Deportes';
  if (/tecnolog|ciencia/.test(candidate)) return 'Tecnología';
  if (/cultura|espectaculos|espectáculos/.test(candidate)) return 'Cultura';
  if (/mundo|estados-unidos/.test(candidate)) return 'El mundo';
  if (/lifestyle|turismo|viajes|revista|salud|bienestar/.test(candidate)) return 'Lifestyle';
  return 'Sociedad';
}

function imageFor(item: Record<string, unknown>): string {
  const media = item['media:content'] ?? item['media:thumbnail'] ?? item.enclosure;
  const entry: unknown = Array.isArray(media) ? media[0] : media;
  if (isRecord(entry)) {
    const url = safeHttpUrl(entry['@_url']);
    if (url) return url;
  }
  const html = typeof item['content:encoded'] === 'string' ? item['content:encoded'] : '';
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return safeHttpUrl(match?.[1]) ?? '/images/news-placeholder.svg';
}

export function parseNewsFeed(xml: string): Story[] {
  const parsed: unknown = parser.parse(xml);
  if (!isRecord(parsed) || !isRecord(parsed.rss) || !isRecord(parsed.rss.channel)) {
    throw new Error('El proveedor no devolvió un feed de noticias válido.');
  }
  const rawItems: unknown = parsed.rss.channel.item;
  const items = Array.isArray(rawItems) ? rawItems : [rawItems];
  const stories: Story[] = [];
  const seen = new Set<string>();
  for (const item of items) {
    if (!isRecord(item)) continue;
    const sourceUrl = safeHttpUrl(text(item.link));
    const title = text(item.title);
    if (!sourceUrl || !title || seen.has(sourceUrl)) continue;
    seen.add(sourceUrl);
    const date = new Date(text(item.pubDate));
    const category = categoryFor(item.category, sourceUrl);
    stories.push({
      id: Number.parseInt(createHash('sha256').update(sourceUrl).digest('hex').slice(0, 12), 16),
      category,
      eyebrow: '',
      title,
      description: text(item.description).slice(0, 350),
      image: imageFor(item),
      minutes: Math.max(1, Math.ceil(text(item['content:encoded']).split(/\s+/).length / 220)),
      author: text(item['dc:creator']) || 'LA NACION',
      dark: category === 'El mundo' || category === 'Tecnología',
      sourceUrl,
      ...(Number.isNaN(date.getTime()) ? {} : { publishedAt: date.toISOString() }),
    });
  }
  if (!stories.length) throw new Error('El feed no contiene noticias válidas.');
  return stories.slice(0, 60);
}

async function refreshNews(): Promise<NewsResponse> {
  const response = await fetch(FEED_URL, {
    signal: AbortSignal.timeout(12000),
    headers: { Accept: 'application/rss+xml, application/xml', 'User-Agent': 'LaNacionCards/1.0' },
  });
  if (!response.ok) throw new Error('El proveedor de noticias no está disponible.');
  const stories = parseNewsFeed(await response.text());
  cache = {
    stories,
    updatedAt: new Date().toISOString(),
    stale: false,
    source: 'LA NACION · RSS público',
  };
  return cache;
}

export async function getNews(): Promise<NewsResponse> {
  const age = cache ? Date.now() - Date.parse(cache.updatedAt) : Infinity;
  if (cache && age < CACHE_DURATION_MS) return cache;
  pendingRequest ??= refreshNews().finally(() => {
    pendingRequest = null;
  });
  try {
    return await pendingRequest;
  } catch (error) {
    if (cache && age < MAX_STALE_MS) return { ...cache, stale: true };
    throw error;
  }
}
