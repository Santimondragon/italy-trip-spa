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

  return (
    <div className="day-card">
      {/* Header */}
      <div className="day-card-header">
        <div className="day-card-day-number">
          Día {day.dayNumber} · {formatDate(day.date)}
          {today && <span style={{ marginLeft: 8, background: '#FFD700', color: '#333', borderRadius: 8, padding: '1px 8px', fontSize: '0.7rem' }}>¡HOY!</span>}
        </div>
        <h2 className="day-card-title">{day.title}</h2>
        <div className="day-card-meta">
          <span className="day-card-meta-item">🏙 {day.baseCity}</span>
          <span className="day-card-meta-item">🛏 {day.sleepCity}</span>
          <span className="day-card-meta-item">{ROUTE_ICON[day.route.type] ?? '📍'} {day.route.type}</span>
          {day.checkInDeadline && (
            <span className="day-card-meta-item" style={{ color: 'var(--terracotta)', fontWeight: 600 }}>
              🏨 Check-in: {day.checkInDeadline}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {day.summary && <p className="day-card-summary">{day.summary}</p>}

      {/* Reviewed toggle */}
      <label className="day-reviewed-toggle">
        <input
          type="checkbox"
          checked={reviewed}
          onChange={() => { const r = toggleReviewed(day.id); setReviewed(r); }}
        />
        Día revisado
      </label>

      {/* Critical box */}
      {(hasWarnings || bookedFood.length > 0 || bookedTickets.length > 0) && (
        <div className="critical-box">
          <div className="critical-box-title">⚡ Importante hoy</div>
          {day.checkInDeadline && (
            <p style={{ fontSize: '0.85rem', marginBottom: 6 }}>
              🏨 <strong>Check-in hasta las {day.checkInDeadline}</strong>
            </p>
          )}
          {bookedTickets.length > 0 && (
            <div style={{ marginBottom: 6 }}>
              {bookedTickets.map((t, i) => (
                <p key={i} style={{ fontSize: '0.82rem' }}>🎫 <strong>{t.name}</strong> — Tickets reservados</p>
              ))}
            </div>
          )}
          {bookedFood.length > 0 && (
            <div style={{ marginBottom: 6 }}>
              {bookedFood.map((f, i) => (
                <p key={i} style={{ fontSize: '0.82rem' }}>
                  🍽 <strong>{f.name}</strong>
                  {f.reservationTime ? ` — ${f.reservationTime}h` : ''}
                </p>
              ))}
            </div>
          )}
          {day.warnings.length > 0 && <WarningList warnings={day.warnings} />}
        </div>
      )}

      {/* Tags / quick badges */}
      {day.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
          {day.tags.includes('driving') && <Badge variant="drive" />}
          {day.tags.includes('train') && <Badge variant="train" />}
          {day.tags.includes('ferry') && <Badge variant="ferry" />}
          {day.tags.includes('heavy-walking') && <Badge variant="heat-plan" label="👟 Mucho camino" />}
          {day.tags.includes('heat-plan') && <Badge variant="heat-plan" />}
          {day.tags.includes('ztl') && <Badge variant="ztl" />}
          {day.tags.includes('dress-code') && <Badge variant="dress-code" />}
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
            <div style={{ marginTop: 10 }}>
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
          <ul className="notes-list">
            {day.rawNotes.map((note, i) => <li key={i}>{note}</li>)}
          </ul>
        </AccordionSection>
      )}
    </div>
  );
}
