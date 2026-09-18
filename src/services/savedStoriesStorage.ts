const STORAGE_KEY = 'ln-saved';

export function parseSavedStoryIds(value: string | null): number[] {
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);

    if (!Array.isArray(parsed)) return [];

    return [
      ...new Set(
        parsed.filter(
          (id): id is number => typeof id === 'number' && Number.isSafeInteger(id) && id > 0,
        ),
      ),
    ];
  } catch {
    return [];
  }
}

export function readSavedStoryIds(): number[] {
  try {
    return parseSavedStoryIds(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    // Reading storage can fail in restricted browser contexts.
    return [];
  }
}

export function persistSavedStoryIds(ids: readonly number[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Keep the in-memory selection usable when browser storage is unavailable.
  }
}
