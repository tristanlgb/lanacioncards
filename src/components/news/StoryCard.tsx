import { Bookmark, Clock3 } from 'lucide-react';
import type { Story, StoryActions } from '../../types/news';

interface StoryCardProps extends StoryActions {
  story: Story;
  hero?: boolean;
  isSaved: boolean;
}
export function StoryCard({ story, hero = false, isSaved, onRead, onToggleSaved }: StoryCardProps) {
  return (
    <article className={`story card ${hero ? 'hero' : ''} ${story.dark ? 'dark' : ''}`}>
      <button
        className="story-open"
        onClick={() => onRead(story)}
        aria-label={`Leer: ${story.title}`}
      >
        <div className="story-image">
          <img
            src={`/images/${story.image}.jpg`}
            alt={story.id === 1 ? 'Palacio del Congreso de la Nación Argentina' : story.title}
            loading={hero ? 'eager' : 'lazy'}
          />
          <span className="image-shade" />
        </div>
        <div className="story-copy">
          <span className="category">
            {hero && <span className="live-dot" />}
            {story.category}
          </span>
          <h2>
            <span>{story.eyebrow}.</span> {story.title}
          </h2>
          <p>{story.description}</p>
          <div className="story-meta">
            <span>
              <Clock3 size={12} />
              {story.minutes} min de lectura
            </span>
            {hero && <span>Por {story.author}</span>}
          </div>
        </div>
      </button>
      <button
        className={`save-button ${isSaved ? 'is-saved' : ''}`}
        onClick={() => onToggleSaved(story.id)}
        aria-label={isSaved ? 'Quitar de guardados' : 'Guardar noticia'}
        aria-pressed={isSaved}
      >
        <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
      </button>
      {hero && (
        <span className="hero-number">
          01 <span>/ 07</span>
        </span>
      )}
    </article>
  );
}
