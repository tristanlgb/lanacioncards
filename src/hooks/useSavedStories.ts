import { useEffect, useState } from 'react';
import { persistSavedStoryIds, readSavedStoryIds } from '../services/savedStoriesStorage';

export function useSavedStories() {
  const [savedIds, setSavedIds] = useState(readSavedStoryIds);

  useEffect(() => {
    persistSavedStoryIds(savedIds);
  }, [savedIds]);

  function toggleSaved(storyId: number) {
    setSavedIds((previousIds) =>
      previousIds.includes(storyId)
        ? previousIds.filter((id) => id !== storyId)
        : [...previousIds, storyId],
    );
  }

  return { savedIds, toggleSaved };
}
