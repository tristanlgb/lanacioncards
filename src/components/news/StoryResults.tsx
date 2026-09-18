import { ArrowRight, Bookmark, SlidersHorizontal } from 'lucide-react';
import type { Section, Story, StoryActions } from '../../types/news';
import { StoryCard } from './StoryCard';

interface StoryResultsProps extends StoryActions {
  stories: readonly Story[];
  savedIds: readonly number[];
  section: Section;
  query: string;
  onGoHome: () => void;
}

export function StoryResults({
  stories,
  savedIds,
  section,
  query,
  onRead,
  onToggleSaved,
  onGoHome,
}: StoryResultsProps) {
  const isSavedSection = section === 'Guardados';
  return (
    <>
      <div className="results-bar">
        <span>
          {stories.length} {stories.length === 1 ? 'historia' : 'historias'}
          {query && ' para “' + query + '”'}
        </span>
        <SlidersHorizontal size={17} />
      </div>
      <div className="results-grid">
        {stories.map((story) => (
          <StoryCard
            key={story.id}
            story={story}
            isSaved={savedIds.includes(story.id)}
            onRead={onRead}
            onToggleSaved={onToggleSaved}
          />
        ))}
      </div>
      {stories.length === 0 && (
        <div className="empty">
          <Bookmark size={32} />
          <h2>
            {isSavedSection ? 'Tus próximas lecturas empiezan acá.' : 'No encontramos noticias.'}
          </h2>
          <p>
            {isSavedSection
              ? 'Tocá el marcador de una noticia para guardarla.'
              : 'Probá con otro tema o explorá nuestras secciones.'}
          </p>
          <button onClick={onGoHome}>
            Volver al inicio <ArrowRight size={16} />
          </button>
        </div>
      )}
    </>
  );
}
