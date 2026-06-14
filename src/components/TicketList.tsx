import type { ReactElement } from 'react';
import type { Ticket } from '../types';
import Badge from './Badge';
import ExternalLinkButton from './ExternalLinkButton';

const STATUS_BADGE: Record<Ticket['status'], ReactElement | null> = {
  booked: <Badge variant="booked" />,
  'needs-booking': <Badge variant="needs-booking" />,
  unavailable: <Badge variant="unavailable" />,
  available: <Badge variant="ticket" label="Disponible" />,
  optional: <Badge variant="optional" />,
};

interface TicketListProps {
  tickets: Ticket[];
}

export default function TicketList({ tickets }: TicketListProps) {
  if (!tickets.length) return <p style={{ fontSize: '0.85rem', color: 'var(--warm-gray)' }}>Sin tickets específicos para este día.</p>;

  return (
    <div>
      {tickets.map((t, i) => (
        <div key={i} className="ticket-item">
          <div className="ticket-item-info">
            <div className="ticket-item-name">{t.name}</div>
            {t.price && <div className="ticket-item-price">{t.price}</div>}
            {t.notes.map((n, j) => <div key={j} className="ticket-item-notes">{n}</div>)}
          </div>
          {STATUS_BADGE[t.status]}
          {t.url && <ExternalLinkButton href={t.url} label="Comprar" variant="primary" size="sm" />}
        </div>
      ))}
    </div>
  );
}
