import { describe, expect, it } from 'vitest';
import { parseSavedStoryIds } from './savedStoriesStorage';

describe('parseSavedStoryIds', () => {
  it('recovers from missing, malformed and non-array storage', () => {
    for (const value of [null, '{broken', '{}', 'null', '"text"']) {
      expect(parseSavedStoryIds(value)).toEqual([]);
    }
  });
  it('keeps only unique positive safe integer identifiers', () => {
    expect(parseSavedStoryIds('[1,1,2,"3",null,-1,0,1.5]')).toEqual([1, 2]);
  });
});
