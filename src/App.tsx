import { useState, useMemo } from 'react';
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
  const idx = days.findIndex(d => isToday(d.date));
  return idx >= 0 ? idx : 0;
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(findTodayIndex);
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterKey[]>([]);

  const displayedDays = useMemo(() => {
    let result = days;
    if (query.trim()) result = searchDays(result, query);
    if (activeFilters.length) result = filterDays(result, activeFilters);
    return result;
  }, [query, activeFilters]);

  const isSearching = query.trim() !== '' || activeFilters.length > 0;

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
    }
  };

  const safeActiveIndex = Math.min(activeIndex, days.length - 1);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-top">
          <span style={{ fontSize: '1.2rem' }}>🇮🇹</span>
          <h1 className="app-title">Italia en Familia 2026</h1>
          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>
            {days.length} días
          </span>
        </div>
        <SearchBar value={query} onChange={setQuery} />
        <FilterChips active={activeFilters} onToggle={toggleFilter} />
        {!isSearching && (
          <DaySelector
            days={days}
            activeIndex={safeActiveIndex}
            onSelect={setActiveIndex}
          />
        )}
      </header>

      <main className="app-main">
        {isSearching ? (
          <div className="search-results">
            <div className="search-results-title">
              {displayedDays.length === 0
                ? 'Sin resultados'
                : `${displayedDays.length} día${displayedDays.length !== 1 ? 's' : ''} encontrado${displayedDays.length !== 1 ? 's' : ''}`
              }
            </div>
            {displayedDays.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <div className="empty-state-title">Sin resultados</div>
                <div className="empty-state-desc">Prueba otra búsqueda o quita los filtros.</div>
              </div>
            ) : (
              displayedDays.map(day => (
                <div
                  key={day.id}
                  className="search-result-card"
                  onClick={() => handleSelectFromSearch(day.id)}
                >
                  <div className="search-result-day">
                    Día {day.dayNumber} · {formatShortDate(day.date)} · {day.weekday}
                  </div>
                  <div className="search-result-title">{day.title}</div>
                  <div className="search-result-summary">{day.summary}</div>
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
