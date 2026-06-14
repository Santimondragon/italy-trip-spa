interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <span className="search-bar-icon">🔍</span>
      <input
        type="search"
        placeholder="Buscar ciudades, lugares, restaurantes…"
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
      {value && (
        <button className="search-clear-btn" onClick={() => onChange('')} aria-label="Limpiar búsqueda">
          ✕
        </button>
      )}
    </div>
  );
}
