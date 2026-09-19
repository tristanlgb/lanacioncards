import { storyImage } from '../../utils/storyImage';
import { useId } from 'react';
import { Bookmark } from 'lucide-react';
import type { Story } from '../../types/news';
import { Dialog } from '../ui/Dialog';

interface ArticleDialogProps {
  story: Story | null;
  isSaved: boolean;
  onToggleSaved: (storyId: number) => void;
  onClose: () => void;
}

export function ArticleDialog({ story, isSaved, onToggleSaved, onClose }: ArticleDialogProps) {
  const titleId = useId();
  return (
    <Dialog isOpen={story !== null} titleId={titleId} onClose={onClose}>
      {story && (
        <div className="article-detail">
          <img src={storyImage(story)} alt={story.title} />
          <div className="article-body">
            <span className="category">{story.category} · LA NACION</span>
            <h2 id={titleId}>
              {story.eyebrow ? story.eyebrow + '. ' : ''}
              {story.title}
            </h2>
            <p className="article-lead">{story.description}</p>
            <div className="article-byline">
              Por {story.author} · {story.minutes} min de lectura
            </div>
            <p>
              Hay historias que invitan a mirar más allá de los titulares. Esta selección propone
              detenerse en los cambios, descubrir nuevas perspectivas y encontrar las preguntas que
              ayudan a comprender nuestro tiempo.
            </p>
            <p>
              Esta nota forma parte de un prototipo visual: el contenido es ilustrativo y no
              corresponde a una noticia publicada por LA NACION.
            </p>
            <button className="primary-button" onClick={() => onToggleSaved(story.id)}>
              <Bookmark size={16} />
              {isSaved ? 'Quitar de mis guardados' : 'Guardar para después'}
            </button>
          </div>
        </div>
      )}
    </Dialog>
  );
}
