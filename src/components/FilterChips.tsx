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
    <div className="filter-chips">
      {FILTERS.map(key => (
        <button
          key={key}
          className={`filter-chip ${active.includes(key) ? 'active' : ''}`}
          onClick={() => onToggle(key)}
        >
          {FILTER_LABELS[key]}
        </button>
      ))}
    </div>
  );
}
