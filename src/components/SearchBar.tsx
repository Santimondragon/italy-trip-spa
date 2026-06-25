import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-3 py-2 mb-2">
      <Search size={14} className="text-white/50 flex-shrink-0" />
      <input
        type="search"
        placeholder="Buscar ciudades, lugares, restaurantes…"
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-white/40"
      />
      {value && (
        <button onClick={() => onChange('')} className="text-white/50 hover:text-white transition-colors p-0.5">
          <X size={14} />
        </button>
      )}
    </div>
  );
}
