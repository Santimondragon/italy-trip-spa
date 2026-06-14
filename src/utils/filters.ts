import type { Day, FilterKey } from '../types';

export function searchDays(days: Day[], query: string): Day[] {
  if (!query.trim()) return days;
  const q = query.toLowerCase();
  return days.filter(day => {
    const searchable = [
      day.title,
      day.baseCity,
      day.sleepCity,
      day.summary,
      ...day.tags,
      ...day.rawNotes,
      ...day.places.map(p => `${p.name} ${p.description} ${p.address}`),
      ...day.food.map(f => `${f.name} ${f.description} ${f.address}`),
      ...day.tickets.map(t => `${t.name}`),
      ...day.schedule.map(s => `${s.title} ${s.description} ${s.location}`),
      ...day.warnings.map(w => `${w.title} ${w.description}`),
    ].join(' ').toLowerCase();
    return searchable.includes(q);
  });
}

export function filterDays(days: Day[], activeFilters: FilterKey[]): Day[] {
  if (!activeFilters.length) return days;
  return days.filter(day => activeFilters.every(f => matchesFilter(day, f)));
}

function matchesFilter(day: Day, filter: FilterKey): boolean {
  switch (filter) {
    case 'tickets-booked':
      return day.tickets.some(t => t.status === 'booked');
    case 'reservation-booked':
      return day.food.some(f => f.reservationStatus === 'booked') ||
             day.places.some(p => p.reservationStatus === 'booked');
    case 'driving-day':
      return day.tags.includes('driving') ||
             day.route.type === 'car' ||
             day.logistics.some(l => l.type === 'car');
    case 'train-day':
      return day.tags.includes('train') ||
             day.route.type === 'train' ||
             day.logistics.some(l => l.type === 'train');
    case 'heavy-walking':
      return day.tags.includes('heavy-walking');
    case 'heat-warning':
      return day.warnings.some(w => w.type === 'heat') || day.tags.includes('heat-plan');
    case 'check-in-deadline':
      return day.checkInDeadline !== null;
    default:
      return true;
  }
}

export const FILTER_LABELS: Record<FilterKey, string> = {
  'tickets-booked': '🎫 Tickets reservados',
  'reservation-booked': '🍽 Reserva hecha',
  'driving-day': '🚗 Día en coche',
  'train-day': '🚂 Día en tren',
  'heavy-walking': '👟 Mucho camino',
  'heat-warning': '☀️ Alerta calor',
  'check-in-deadline': '🏨 Check-in',
};
