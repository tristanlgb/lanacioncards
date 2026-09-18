import { ArrowUpRight, Bookmark } from 'lucide-react';
import { Navigation } from './Navigation';
import { TrendingTopics } from './TrendingTopics';
import type { Section } from '../../types/news';

interface SiteHeaderProps {
  section: Section;
  savedCount: number;
  query: string;
  isSearchOpen: boolean;
  onQueryChange: (query: string) => void;
  onToggleSearch: () => void;
  onCloseSearch: () => void;
  onTopicSelect: (query: string) => void;
  onNavigate: (section: Section) => void;
  onSubscribe: () => void;
}

export function SiteHeader({
  section,
  savedCount,
  query,
  isSearchOpen,
  onQueryChange,
  onToggleSearch,
  onCloseSearch,
  onTopicSelect,
  onNavigate,
  onSubscribe,
}: SiteHeaderProps) {
  return (
    <header>
      <div className="masthead">
        <div className="edition">
          <span className="edition-dot" /> EDICIÓN DIGITAL{' '}
          <span className="edition-country">Argentina</span>
        </div>
        <a
          href="#"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('Inicio');
          }}
          aria-label="LA NACION, inicio"
        >
          <img src="/images/la-nacion.webp" alt="LA NACION" />
          <span>El periodismo que nos conecta.</span>
        </a>
        <div className="header-actions">
          <button
            className="saved-top"
            onClick={() => onNavigate('Guardados')}
            aria-label={`Mis noticias guardadas: ${savedCount}`}
          >
            <Bookmark size={18} />
            {savedCount > 0 && <i>{savedCount}</i>}
          </button>
          <button className="subscribe-button" onClick={() => onSubscribe()}>
            Suscribite <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
      <Navigation
        section={section}
        query={query}
        isSearchOpen={isSearchOpen}
        onQueryChange={onQueryChange}
        onToggleSearch={onToggleSearch}
        onCloseSearch={onCloseSearch}
        onNavigate={onNavigate}
      />
      <TrendingTopics onTopicSelect={onTopicSelect} />
    </header>
  );
}
