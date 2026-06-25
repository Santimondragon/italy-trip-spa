import type { FilterKey } from '../types';
import { FILTER_LABELS } from '../utils/filters';

const FILTERS: FilterKey[] = [
  'tickets-booked',
  'reservation-booked',
  'driving-day',
  'train-day',
  'heavy-walking',
  'heat-warning',
  'check-in-deadline',
];

interface FilterChipsProps {
  active: FilterKey[];
  onToggle: (key: FilterKey) => void;
}

export default function FilterChips({ active, onToggle }: FilterChipsProps) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {FILTERS.map(key => {
        const isActive = active.includes(key);
        return (
          <button
            key={key}
            onClick={() => onToggle(key)}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${
              isActive
                ? 'bg-terracota border-terracota text-white'
                : 'bg-white/10 border-white/25 text-white/80 hover:bg-white/20'
            }`}
          >
            {FILTER_LABELS[key]}
          </button>
        );
      })}
    </div>
  );
}
