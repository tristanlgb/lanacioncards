import { RefreshCw } from 'lucide-react';

interface NewsStatusProps {
  isLoading: boolean;
  error: string | null;
  stale: boolean;
  updatedAt?: string;
  source?: string;
  onReload: () => void;
}

export function NewsStatus({
  isLoading,
  error,
  stale,
  updatedAt,
  source,
  onReload,
}: NewsStatusProps) {
  let message = source ?? 'Noticias en vivo';
  if (isLoading) message = 'Actualizando las noticias…';
  else if (error) message = error;
  else if (stale) message = 'Mostrando la última actualización disponible.';
  else if (updatedAt)
    message +=
      ' · ' +
      new Date(updatedAt).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  return (
    <div className="news-status" role="status">
      <span>{message}</span>
      <button disabled={isLoading} onClick={onReload} aria-label="Actualizar noticias">
        <RefreshCw size={14} className={isLoading ? 'spinning' : ''} />
        Actualizar
      </button>
    </div>
  );
}
