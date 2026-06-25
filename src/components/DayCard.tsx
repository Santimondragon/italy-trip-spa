import { useState } from 'react';
import type { Day } from '../types';
import { formatDate, isToday } from '../utils/dates';
import { isReviewed, toggleReviewed } from '../utils/storage';
import AccordionSection from './AccordionSection';
import Timeline from './Timeline';
import PlaceList from './PlaceList';
import FoodList from './FoodList';
import TicketList from './TicketList';
import LogisticsList from './LogisticsList';
import WarningList from './WarningList';
import Badge from './Badge';
import MapsButton from './MapsButton';

const ROUTE_ICON: Record<string, string> = {
  flight: '✈️', car: '🚗', train: '🚂', ferry: '⛴', walk: '🚶', metro: '🚇', bus: '🚌',
};

interface DayCardProps {
  day: Day;
}

export default function DayCard({ day }: DayCardProps) {
  const [reviewed, setReviewed] = useState(() => isReviewed(day.id));
  const today = isToday(day.date);

  const hasWarnings = day.warnings.length > 0 || day.checkInDeadline;
  const bookedFood = day.food.filter(f => f.reservationStatus === 'booked');
  const bookedTickets = day.tickets.filter(t => t.status === 'booked');
  const hasCritical = hasWarnings || bookedFood.length > 0 || bookedTickets.length > 0;

  return (
    <div className="px-4 pb-10">
      {/* Header card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <p className="text-xs font-bold text-terracota uppercase tracking-wider">
            Día {day.dayNumber} · {formatDate(day.date)}
          </p>
          {today && (
            <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold rounded-full px-2.5 py-1 whitespace-nowrap">
              ¡HOY!
            </span>
          )}
        </div>
        <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-4">{day.title}</h2>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500 mb-5">
          <span>🏙 {day.baseCity}</span>
          <span>🛏 {day.sleepCity}</span>
          <span>{ROUTE_ICON[day.route.type] ?? '📍'} {day.route.type}</span>
          {day.checkInDeadline && (
            <span className="text-terracota font-semibold">🏨 Check-in: {day.checkInDeadline}</span>
          )}
        </div>

        {/* Summary */}
        {day.summary && (
          <p className="text-sm text-slate-600 leading-relaxed mb-5">{day.summary}</p>
        )}

        {/* Tags */}
        {day.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {day.tags.includes('driving') && <Badge variant="drive" />}
            {day.tags.includes('train') && <Badge variant="train" />}
            {day.tags.includes('ferry') && <Badge variant="ferry" />}
            {day.tags.includes('heavy-walking') && <Badge variant="heat-plan" label="👟 Mucho camino" />}
            {day.tags.includes('heat-plan') && <Badge variant="heat-plan" />}
            {day.tags.includes('ztl') && <Badge variant="ztl" />}
            {day.tags.includes('dress-code') && <Badge variant="dress-code" />}
          </div>
        )}

        {/* Reviewed toggle */}
        <label className="flex items-center gap-2.5 text-sm text-slate-400 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={reviewed}
            onChange={() => { const r = toggleReviewed(day.id); setReviewed(r); }}
            className="accent-green-600 w-4 h-4"
          />
          Día revisado
        </label>
      </div>

      {/* Critical box */}
      {hasCritical && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-4">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-4">⚡ Importante hoy</p>
          {day.checkInDeadline && (
            <p className="text-sm mb-3">🏨 <strong>Check-in hasta las {day.checkInDeadline}</strong></p>
          )}
          {bookedTickets.map((t, i) => (
            <p key={i} className="text-sm mb-2.5">🎫 <strong>{t.name}</strong> — Tickets reservados</p>
          ))}
          {bookedFood.map((f, i) => (
            <p key={i} className="text-sm mb-2.5">
              🍽 <strong>{f.name}</strong>
              {f.reservationTime ? ` — ${f.reservationTime}h` : ''}
            </p>
          ))}
          {day.warnings.length > 0 && (
            <div className="mt-4">
              <WarningList warnings={day.warnings} />
            </div>
          )}
        </div>
      )}

      {/* Programa */}
      {day.schedule.length > 0 && (
        <AccordionSection icon="🕐" title="Programa del día" count={day.schedule.length} defaultOpen={true}>
          <Timeline items={day.schedule} />
        </AccordionSection>
      )}

      {/* Lugares */}
      {day.places.length > 0 && (
        <AccordionSection icon="🗺" title="Lugares" count={day.places.length}>
          <PlaceList places={day.places} dayId={day.id} />
          {day.baseCity && (
            <div className="mt-3">
              <MapsButton query={day.baseCity + ' Italia'} label={`Mapa de ${day.baseCity}`} />
            </div>
          )}
        </AccordionSection>
      )}

      {/* Comida */}
      {day.food.length > 0 && (
        <AccordionSection icon="🍽" title="Comida y Restaurantes" count={day.food.length}>
          <FoodList food={day.food} dayId={day.id} />
        </AccordionSection>
      )}

      {/* Tickets */}
      {day.tickets.length > 0 && (
        <AccordionSection icon="🎫" title="Tickets y Entradas" count={day.tickets.length}>
          <TicketList tickets={day.tickets} />
        </AccordionSection>
      )}

      {/* Logística */}
      {day.logistics.length > 0 && (
        <AccordionSection icon="🚗" title="Logística y Transporte" count={day.logistics.length}>
          <LogisticsList logistics={day.logistics} />
        </AccordionSection>
      )}

      {/* Notas */}
      {day.rawNotes.length > 0 && (
        <AccordionSection icon="📝" title="Notas y Consejos" count={day.rawNotes.length}>
          <ul className="pt-4 flex flex-col gap-4">
            {day.rawNotes.map((note, i) => (
              <li key={i} className="text-sm text-slate-500 leading-relaxed pl-5 relative before:content-['→'] before:absolute before:left-0 before:text-terracota">
                {note}
              </li>
            ))}
          </ul>
        </AccordionSection>
      )}
    </div>
  );
}
