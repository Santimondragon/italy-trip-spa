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
  if (!food.length) return <p style={{ fontSize: '0.85rem', color: 'var(--warm-gray)' }}>Sin restaurantes específicos para este día.</p>;

  return (
    <div>
      {food.map((item, i) => {
        const favKey = `${dayId}-food-${item.name}`;
        const fav = isFavoriteFood(favKey);
        const isBooked = item.reservationStatus === 'booked';

        return (
          <div key={i} className="food-item">
            <div className="food-item-header">
              <div>
                <span className="food-item-name">{item.name}</span>
                {item.type && <div className="food-item-type">{item.type}</div>}
              </div>
              <button
                className={`fav-btn ${fav ? 'active' : ''}`}
                onClick={() => { toggleFavoriteFood(favKey); forceUpdate(n => n + 1); }}
                title={fav ? 'Quitar favorito' : 'Añadir a favoritos'}
              >
                {fav ? '❤️' : '🤍'}
              </button>
              {isBooked && <Badge variant="booked" />}
              {item.reservationStatus === 'needs-booking' && <Badge variant="needs-booking" />}
            </div>

            {item.description && <p className="food-item-desc">{item.description}</p>}

            {isBooked && item.reservationTime && (
              <p className="food-item-reservation">
                🕐 Reserva: {item.reservationTime}h{(item as { partySize?: number }).partySize ? ` — ${(item as { partySize?: number }).partySize} personas` : ''}
              </p>
            )}

            {item.notes.length > 0 && (
              <p className="food-item-notes">{item.notes.join(' · ')}</p>
            )}

            <div className="food-item-actions">
              {item.mapsQuery && <MapsButton query={item.mapsQuery} size="sm" />}
              {item.url && <ExternalLinkButton href={item.url} label="Web" size="sm" />}
              {item.contact && item.contact.startsWith('+') && (
                <>
                  <a href={createWhatsAppUrl(item.contact)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
                    💬 WhatsApp
                  </a>
                  <a href={createPhoneUrl(item.contact)} className="btn btn-ghost btn-sm">
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
