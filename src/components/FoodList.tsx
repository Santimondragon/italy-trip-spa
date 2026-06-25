import { useState } from 'react';
import type { FoodItem } from '../types';
import Badge from './Badge';
import MapsButton from './MapsButton';
import ExternalLinkButton from './ExternalLinkButton';
import { isFavoriteFood, toggleFavoriteFood } from '../utils/storage';
import { createWhatsAppUrl, createPhoneUrl } from '../utils/maps';

interface FoodListProps {
  food: FoodItem[];
  dayId: string;
}

export default function FoodList({ food, dayId }: FoodListProps) {
  const [, forceUpdate] = useState(0);
  if (!food.length) return <p className="text-sm text-slate-400 py-2">Sin restaurantes específicos.</p>;

  return (
    <div className="flex flex-col pt-2">
      {food.map((item, i) => {
        const favKey = `${dayId}-food-${item.name}`;
        const fav = isFavoriteFood(favKey);
        const isBooked = item.reservationStatus === 'booked';

        return (
          <div key={i} className={`py-6 ${i < food.length - 1 ? 'border-b border-slate-100' : ''}`}>
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                {item.type && <p className="text-sm text-slate-400 capitalize mt-0.5">{item.type}</p>}
              </div>
              <button
                onClick={() => { toggleFavoriteFood(favKey); forceUpdate(n => n + 1); }}
                className="text-lg p-0.5 hover:scale-110 transition-transform flex-shrink-0"
              >
                {fav ? '❤️' : '🤍'}
              </button>
              {isBooked && <Badge variant="booked" />}
              {item.reservationStatus === 'needs-booking' && <Badge variant="needs-booking" />}
            </div>

            {item.description && <p className="text-sm text-slate-500 leading-relaxed mb-3">{item.description}</p>}

            {isBooked && item.reservationTime && (
              <p className="text-sm font-semibold text-emerald-700 mb-3">
                🕐 Reserva: {item.reservationTime}h{(item as { partySize?: number }).partySize ? ` — ${(item as { partySize?: number }).partySize} personas` : ''}
              </p>
            )}

            {item.notes.length > 0 && (
              <p className="text-sm text-slate-400 italic mb-3">{item.notes.join(' · ')}</p>
            )}

            <div className="flex flex-wrap gap-2.5">
              {item.mapsQuery && <MapsButton query={item.mapsQuery} size="sm" />}
              {item.url && <ExternalLinkButton href={item.url} label="Web" size="sm" />}
              {item.contact && item.contact.startsWith('+') && (
                <>
                  <a href={createWhatsAppUrl(item.contact)} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#25D366] text-white hover:bg-[#1BA84A] transition-colors">
                    💬 WhatsApp
                  </a>
                  <a href={createPhoneUrl(item.contact)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                    📞 Llamar
                  </a>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
