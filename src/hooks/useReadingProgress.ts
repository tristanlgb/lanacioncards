import { useEffect, useState } from 'react';
import { DAILY_READING_LIMIT } from '../types/reading';
import {
  READING_STORAGE_KEY,
  persistReadingHistory,
  readReadingHistory,
  readingDay,
  recordReading,
} from '../services/readingStorage';

export function useReadingProgress() {
  const [history, setHistory] = useState(() => readReadingHistory());

  useEffect(() => {
    function syncDay() {
      setHistory((previous) => (previous.day === readingDay() ? previous : readReadingHistory()));
    }
    function syncStorage(event: StorageEvent) {
      if (event.key === READING_STORAGE_KEY || event.key === null) setHistory(readReadingHistory());
    }
    const timer = window.setInterval(syncDay, 30000);
    window.addEventListener('storage', syncStorage);
    window.addEventListener('focus', syncDay);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('storage', syncStorage);
      window.removeEventListener('focus', syncDay);
    };
  }, []);

  function tryRead(storyId: number): boolean {
    const day = readingDay();
    const persisted = readReadingHistory(day);
    const current =
      history.day === day
        ? {
            day,
            storyIds: [...new Set([...history.storyIds, ...persisted.storyIds])].slice(
              0,
              DAILY_READING_LIMIT,
            ),
          }
        : persisted;
    const next = recordReading(current, storyId, day);
    if (!next) return false;
    persistReadingHistory(next);
    setHistory(next);
    return true;
  }
  const readCount = history.storyIds.length;
  return {
    readCount,
    remaining: DAILY_READING_LIMIT - readCount,
    limit: DAILY_READING_LIMIT,
    tryRead,
  };
}
