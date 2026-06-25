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
  if (!tickets.length) return <p className="text-sm text-slate-400 py-2">Sin tickets específicos.</p>;

  return (
    <div className="flex flex-col pt-2">
      {tickets.map((t, i) => (
        <div key={i} className={`flex items-start gap-4 py-6 ${i < tickets.length - 1 ? 'border-b border-slate-100' : ''}`}>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 mb-1">{t.name}</p>
            {t.price && <p className="text-sm text-green-700 font-medium mb-1.5">{t.price}</p>}
            {t.notes.map((n, j) => <p key={j} className="text-sm text-slate-400 italic mt-1">{n}</p>)}
          </div>
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {STATUS_BADGE[t.status]}
            {t.url && <ExternalLinkButton href={t.url} label="Comprar" variant="primary" size="sm" />}
          </div>
        </div>
      ))}
    </div>
  );
}
