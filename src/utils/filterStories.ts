import type { Section, Story } from '../types/news';

interface StoryFilters {
  section: Section;
  query: string;
  savedIds: readonly number[];
}

export function filterStories(
  stories: readonly Story[],
  { section, query, savedIds }: StoryFilters,
): Story[] {
  const normalizedQuery = query.toLocaleLowerCase('es-AR');

  return stories.filter((story) => {
    const matchesSection =
      section === 'Inicio' ||
      section === 'Últimas noticias' ||
      (section === 'Guardados' ? savedIds.includes(story.id) : story.category === section);

    const searchableText = (
      story.title +
      ' ' +
      story.category +
      ' ' +
      story.description
    ).toLocaleLowerCase('es-AR');

    return matchesSection && searchableText.includes(normalizedQuery);
  });
}
