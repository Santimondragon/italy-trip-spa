import { useState } from 'react';
import { setUser } from '../utils/storage';

const SUGGESTED = ['Santi', 'Mamá', 'Papá', 'Abuela', 'Abuelo'];

interface UserPickerProps {
  onSelect: (name: string) => void;
}

export default function UserPicker({ onSelect }: UserPickerProps) {
  const [custom, setCustom] = useState('');

  const handleSelect = (name: string) => {
    setUser(name);
    onSelect(name);
  };

  const handleCustomSubmit = () => {
    const name = custom.trim();
    if (!name) return;
    handleSelect(name);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center gap-6">
        <div className="text-5xl">🇮🇹</div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800 mb-1">¿Quién eres?</h2>
          <p className="text-sm text-slate-500">Tu progreso se guardará de forma individual.</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {SUGGESTED.map(name => (
            <button
              key={name}
              onClick={() => handleSelect(name)}
              className="px-4 py-2 rounded-full border-2 border-slate-200 text-slate-700 font-medium text-sm hover:border-terracota hover:text-terracota transition-colors"
            >
              {name}
            </button>
          ))}
        </div>

        <div className="w-full flex flex-col gap-2">
          <p className="text-xs text-center text-slate-400">o escribe tu nombre</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={custom}
              onChange={e => setCustom(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCustomSubmit()}
              placeholder="Tu nombre…"
              className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-terracota"
            />
            <button
              onClick={handleCustomSubmit}
              disabled={!custom.trim()}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 disabled:opacity-40 transition-colors"
            >
              Listo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
