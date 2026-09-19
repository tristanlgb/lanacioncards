import { describe, expect, it } from 'vitest';
import { stories } from '../data/stories';
import { filterStories } from './filterStories';

describe('filterStories', () => {
  it('combines saved selection and case-insensitive search', () => {
    expect(
      filterStories(stories, { section: 'Guardados', query: 'PATAGONIA', savedIds: [1, 5] }).map(
        (story) => story.id,
      ),
    ).toEqual([5]);
  });
  it('does not return a story from another category', () => {
    expect(
      filterStories(stories, { section: 'Economía', query: 'Patagonia', savedIds: [] }),
    ).toEqual([]);
  });
});
