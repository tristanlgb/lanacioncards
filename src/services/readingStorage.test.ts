import { describe, expect, it } from 'vitest';
import { parseReadingHistory, readingDay, recordReading } from './readingStorage';
describe('daily reading allowance', () => {
  const day = '2026-09-18';
  it('counts unique stories and stops the eleventh', () => {
    const history = { day, storyIds: Array.from({ length: 10 }, (_, index) => index + 1) };
    expect(recordReading(history, 10, day)?.storyIds).toHaveLength(10);
    expect(recordReading(history, 11, day)).toBeNull();
    expect(
      recordReading({ day, storyIds: history.storyIds.slice(0, 9) }, 10, day)?.storyIds,
    ).toHaveLength(10);
  });
  it('resets when the Buenos Aires day changes', () => {
    expect(readingDay(new Date('2026-09-19T02:59:00Z'))).toBe(day);
    expect(readingDay(new Date('2026-09-19T03:00:00Z'))).toBe('2026-09-19');
    expect(recordReading({ day, storyIds: [1, 2] }, 3, '2026-09-19')).toEqual({
      day: '2026-09-19',
      storyIds: [3],
    });
  });
  it('recovers from malformed storage and removes duplicates', () => {
    expect(parseReadingHistory('{bad', day)).toEqual({ day, storyIds: [] });
    expect(
      parseReadingHistory(JSON.stringify({ day, storyIds: [1, 1, '2', null, -1] }), day),
    ).toEqual({ day, storyIds: [1] });
    expect(parseReadingHistory(JSON.stringify({ day: 'yesterday', storyIds: [1] }), day)).toEqual({
      day,
      storyIds: [],
    });
  });
});
