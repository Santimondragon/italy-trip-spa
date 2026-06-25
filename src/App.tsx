import { useState, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { days } from './data/index';
import type { FilterKey } from './types';
import { searchDays, filterDays } from './utils/filters';
import { isToday, formatShortDate } from './utils/dates';

import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import DaySelector from './components/DaySelector';
import DayCarousel from './components/DayCarousel';
import PrintButton from './components/PrintButton';

function findTodayIndex(): number {
  const todayMatch = days.findIndex(d => isToday(d.date));
  if (todayMatch >= 0) return todayMatch;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [fy, fm, fd] = days[0].date.split('-').map(Number);
  const firstDay = new Date(fy, fm - 1, fd);
  if (today < firstDay) return 0;

  return days.length - 1;
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(findTodayIndex);
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterKey[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);

  const displayedDays = useMemo(() => {
    let result = days;
    if (query.trim()) result = searchDays(result, query);
    if (activeFilters.length) result = filterDays(result, activeFilters);
    return result;
  }, [query, activeFilters]);

  const isSearching = query.trim() !== '' || activeFilters.length > 0;
  const hasActive = query.trim() !== '' || activeFilters.length > 0;

  const toggleFilter = (key: FilterKey) => {
    setActiveFilters(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleSelectFromSearch = (dayId: string) => {
    const idx = days.findIndex(d => d.id === dayId);
    if (idx >= 0) {
      setActiveIndex(idx);
      setQuery('');
      setActiveFilters([]);
      setSearchOpen(false);
    }
  };

  const clearAll = () => {
    setQuery('');
    setActiveFilters([]);
  };

  const safeActiveIndex = Math.min(activeIndex, days.length - 1);

  return (
    <div className="flex flex-col min-h-dvh max-w-200 mx-auto bg-slate-50 relative">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">
        {/* Title row */}
        <div className="flex items-center justify-between gap-3 px-5 pt-6 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-terracotta flex items-center justify-center text-xl shrink-0">
              🇮🇹
            </div>
            <div>
              <h1 className="text-base font-semibold text-white leading-tight">Italia en Familia 2026</h1>
              <p className="text-xs text-slate-400 mt-0.5">{days.length} días · Jul–Ago</p>
            </div>
          </div>

          {/* Search toggle button */}
          <button
            onClick={() => setSearchOpen(o => !o)}
            className={`relative flex items-center justify-center w-10 h-10 rounded-full border transition-all shrink-0 ${
              searchOpen || hasActive
                ? 'bg-terracota border-terracota text-white'
                : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
            }`}
            aria-label="Buscar y filtrar"
          >
            {searchOpen ? <X size={17} /> : <SlidersHorizontal size={17} />}
            {/* Active indicator dot */}
            {!searchOpen && hasActive && (
              <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-yellow-400 border border-slate-900" />
            )}
          </button>
        </div>

        {/* Collapsible search + filters panel */}
        {searchOpen && (
          <div className="px-5 pb-4 border-t border-white/10 pt-4">
            <SearchBar value={query} onChange={setQuery} />
            <FilterChips active={activeFilters} onToggle={toggleFilter} />
            {hasActive && (
              <button
                onClick={clearAll}
                className="mt-1 text-xs text-white/50 hover:text-white/80 transition-colors"
              >
                Limpiar todo
              </button>
            )}
          </div>
        )}

        {/* Day selector — only when not searching */}
        {!isSearching && (
          <DaySelector
            days={days}
            activeIndex={safeActiveIndex}
            onSelect={setActiveIndex}
          />
        )}
      </header>

      {/* ── Main ── */}
      <main className="flex-1 pb-6">
        {isSearching ? (
          <div className="p-4 pt-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              {displayedDays.length === 0
                ? 'Sin resultados'
                : `${displayedDays.length} día${displayedDays.length !== 1 ? 's' : ''} encontrado${displayedDays.length !== 1 ? 's' : ''}`
              }
            </p>
            {displayedDays.length === 0 ? (
              <div className="text-center py-14 text-slate-400">
                <div className="text-5xl mb-4">🔍</div>
                <p className="font-semibold text-slate-600 mb-2">Sin resultados</p>
                <p className="text-sm">Prueba otra búsqueda o quita los filtros.</p>
              </div>
            ) : (
              displayedDays.map(day => (
                <div
                  key={day.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleSelectFromSearch(day.id)}
                >
                  <p className="text-xs font-bold text-terracota uppercase tracking-wider mb-1">
                    Día {day.dayNumber} · {formatShortDate(day.date)} · {day.weekday}
                  </p>
                  <p className="font-semibold text-slate-800 mb-1.5">{day.title}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{day.summary}</p>
                </div>
              ))
            )}
          </div>
        ) : (
          <DayCarousel
            days={days}
            activeIndex={safeActiveIndex}
            onPrev={() => setActiveIndex(i => Math.max(0, i - 1))}
            onNext={() => setActiveIndex(i => Math.min(days.length - 1, i + 1))}
          />
        )}
      </main>

      <PrintButton />
    </div>
  );
}
