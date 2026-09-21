import { DAILY_READING_LIMIT } from '../types/reading';
import type { ReadingHistory } from '../types/reading';
import { isRecord } from '../utils/validation';

export const READING_STORAGE_KEY = 'ln-reading-v1';
export function readingDay(date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}
export function parseReadingHistory(raw: string | null, day: string): ReadingHistory {
  const empty = { day, storyIds: [] };
  try {
    const value: unknown = JSON.parse(raw ?? 'null');
    if (!isRecord(value) || value.day !== day || !Array.isArray(value.storyIds)) return empty;
    const storyIds = [
      ...new Set(
        value.storyIds.filter(
          (id): id is number => typeof id === 'number' && Number.isSafeInteger(id) && id > 0,
        ),
      ),
    ].slice(0, DAILY_READING_LIMIT);
    return { day, storyIds };
  } catch {
    return empty;
  }
}
export function readReadingHistory(day = readingDay()): ReadingHistory {
  try {
    return parseReadingHistory(localStorage.getItem(READING_STORAGE_KEY), day);
  } catch {
    return { day, storyIds: [] };
  }
}
export function persistReadingHistory(history: ReadingHistory) {
  try {
    localStorage.setItem(READING_STORAGE_KEY, JSON.stringify(history));
  } catch {
    /* In private contexts, the limit still works for this session. */
  }
}
export function recordReading(
  history: ReadingHistory,
  storyId: number,
  day: string,
): ReadingHistory | null {
  const current = history.day === day ? history : { day, storyIds: [] };
  if (current.storyIds.includes(storyId)) return current;
  if (current.storyIds.length >= DAILY_READING_LIMIT) return null;
  return { day, storyIds: [...current.storyIds, storyId] };
}
