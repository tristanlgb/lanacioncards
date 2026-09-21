import { BookOpen } from 'lucide-react';

interface ReadingProgressProps {
  readCount: number;
  remaining: number;
  limit: number;
}
export function ReadingProgress({ readCount, remaining, limit }: ReadingProgressProps) {
  const tone = readCount >= 8 ? 'danger' : readCount >= 5 ? 'warning' : 'normal';
  return (
    <section className={'reading-progress ' + tone} aria-label="Tus lecturas de hoy">
      <div className="reading-label">
        <BookOpen size={17} />
        <span>
          <strong>
            {remaining} {remaining === 1 ? 'nota disponible' : 'notas disponibles'}
          </strong>{' '}
          para leer hoy
        </span>
        <span className="reading-count">
          {readCount} de {limit} leídas
        </span>
      </div>
      <div
        className="reading-track"
        role="progressbar"
        aria-label="Lecturas consumidas"
        aria-valuemin={0}
        aria-valuemax={limit}
        aria-valuenow={readCount}
        aria-valuetext={remaining + ' notas restantes de ' + limit}
      >
        <div className="reading-fill" style={{ width: (readCount / limit) * 100 + '%' }} />
      </div>
      <p>
        {remaining === 0
          ? 'Alcanzaste el límite de hoy. Podés releer tus notas o volver mañana.'
          : '10 notas distintas por día. Releer una nota no consume otra lectura.'}
      </p>
    </section>
  );
}
