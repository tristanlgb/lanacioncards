import { useId } from 'react';
import { BookOpen } from 'lucide-react';
import { Dialog } from '../ui/Dialog';

interface ReadingLimitDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
export function ReadingLimitDialog({ isOpen, onClose }: ReadingLimitDialogProps) {
  const titleId = useId();
  return (
    <Dialog isOpen={isOpen} titleId={titleId} onClose={onClose}>
      <div className="subscribe-detail">
        <span className="round-icon">
          <BookOpen size={24} />
        </span>
        <span className="category">TUS LECTURAS DE HOY</span>
        <h2 id={titleId}>Ya leíste tus 10 notas.</h2>
        <p>
          Podés volver a abrir las noticias que ya leíste. Vas a tener 10 lecturas nuevas mañana, a
          partir de las 00:00 de Buenos Aires.
        </p>
        <button className="primary-button" onClick={onClose}>
          Seguir explorando titulares
        </button>
      </div>
    </Dialog>
  );
}
