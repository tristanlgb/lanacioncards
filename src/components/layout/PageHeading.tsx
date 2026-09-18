import type { Section } from '../../types/news';
import { DateTime } from './DateTime';

interface PageHeadingProps {
  section: Section;
  hasQuery: boolean;
}

function getTitle(section: Section, hasQuery: boolean): string {
  if (hasQuery) return 'Encontrá tu próxima lectura.';
  if (section === 'Inicio') return 'Tu día, en contexto.';
  if (section === 'Guardados') return 'Tus noticias, a mano.';
  return section + '.';
}

export function PageHeading({ section, hasQuery }: PageHeadingProps) {
  return (
    <div className="page-heading">
      <div>
        <div className="overline">UNA NUEVA FORMA DE ESTAR INFORMADO</div>
        <h1>{getTitle(section, hasQuery)}</h1>
      </div>
      <DateTime />
    </div>
  );
}
