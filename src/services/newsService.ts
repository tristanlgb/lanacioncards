import type { NewsResponse, Story } from '../types/news';
import { isRecord, safeHttpUrl } from '../utils/validation';

const CATEGORIES = new Set([
  'Política',
  'Economía',
  'El mundo',
  'Deportes',
  'Lifestyle',
  'Tecnología',
  'Cultura',
  'Sociedad',
]);

function isStory(value: unknown): value is Story {
  return (
    isRecord(value) &&
    typeof value.id === 'number' &&
    Number.isSafeInteger(value.id) &&
    typeof value.title === 'string' &&
    typeof value.description === 'string' &&
    typeof value.category === 'string' &&
    CATEGORIES.has(value.category) &&
    typeof value.eyebrow === 'string' &&
    typeof value.author === 'string' &&
    typeof value.minutes === 'number' &&
    Number.isFinite(value.minutes) &&
    typeof value.image === 'string' &&
    (value.image === '/images/news-placeholder.svg' || safeHttpUrl(value.image) !== null) &&
    safeHttpUrl(value.sourceUrl) !== null &&
    (value.publishedAt === undefined ||
      (typeof value.publishedAt === 'string' && Number.isFinite(Date.parse(value.publishedAt))))
  );
}

export async function fetchNews(signal: AbortSignal): Promise<NewsResponse> {
  const response = await fetch('/api/news', { signal });
  if (!response.ok) throw new Error('No pudimos actualizar las noticias.');
  const payload: unknown = await response.json();
  if (
    !isRecord(payload) ||
    !Array.isArray(payload.stories) ||
    !payload.stories.every(isStory) ||
    typeof payload.updatedAt !== 'string' ||
    typeof payload.stale !== 'boolean' ||
    typeof payload.source !== 'string'
  ) {
    throw new Error('La API devolvió datos de noticias inválidos.');
  }
  return {
    stories: payload.stories,
    updatedAt: payload.updatedAt,
    stale: payload.stale,
    source: payload.source,
  };
}
