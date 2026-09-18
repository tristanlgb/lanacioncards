import { Search, X } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onClose: () => void;
}

export function SearchBar({ query, onQueryChange, onClose }: SearchBarProps) {
  return (
    <div className="search-panel">
      <Search size={20} />
      <input
        autoFocus
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Buscá una noticia, un tema, una historia…"
        aria-label="Buscar noticias"
      />
      <button aria-label="Cerrar búsqueda" onClick={onClose}>
        <X size={20} />
      </button>
    </div>
  );
}
