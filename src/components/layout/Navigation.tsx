import { useState } from 'react';
import { ChevronRight, Menu, Search } from 'lucide-react';
import { menuSections, sections } from '../../data/navigation';
import type { Section } from '../../types/news';
import { SearchBar } from './SearchBar';

interface NavigationProps {
  section: Section;
  query: string;
  isSearchOpen: boolean;
  onQueryChange: (query: string) => void;
  onToggleSearch: () => void;
  onCloseSearch: () => void;
  onNavigate: (section: Section) => void;
}

export function Navigation({
  section,
  query,
  isSearchOpen,
  onQueryChange,
  onToggleSearch,
  onCloseSearch,
  onNavigate,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleNavigate(nextSection: Section) {
    setIsMenuOpen(false);
    onNavigate(nextSection);
  }

  return (
    <>
      <nav className="navigation" aria-label="Secciones">
        <button
          className="menu-button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Abrir menú"
          aria-expanded={isMenuOpen}
        >
          <Menu size={20} />
        </button>
        <div className="nav-links">
          {sections.map((item) => (
            <button
              key={item}
              onClick={() => handleNavigate(item)}
              className={section === item ? 'active' : ''}
            >
              {item}
            </button>
          ))}
        </div>
        <button
          className="search-button"
          onClick={onToggleSearch}
          aria-label="Buscar noticias"
          aria-expanded={isSearchOpen}
        >
          <Search size={19} />
        </button>
      </nav>
      {isMenuOpen && (
        <div className="menu-panel">
          {menuSections.map((item) => (
            <button key={item} onClick={() => handleNavigate(item)}>
              {item}
              <ChevronRight size={16} />
            </button>
          ))}
        </div>
      )}
      {isSearchOpen && (
        <SearchBar query={query} onQueryChange={onQueryChange} onClose={onCloseSearch} />
      )}
    </>
  );
}
