import { useState } from 'react';
import type { Place } from '../types';
import Badge from './Badge';
import MapsButton from './MapsButton';
import ExternalLinkButton from './ExternalLinkButton';
import { isDone, toggleDone, isFavoritePlace, toggleFavoritePlace } from '../utils/storage';

function statusBadge(status: Place['reservationStatus']) {
  if (status === 'booked') return <Badge variant="booked" />;
  if (status === 'needs-booking') return <Badge variant="needs-booking" />;
  if (status === 'unavailable') return <Badge variant="unavailable" />;
  return null;
}

interface PlaceListProps {
  places: Place[];
  dayId: string;
}

export default function PlaceList({ places, dayId }: PlaceListProps) {
  const [, forceUpdate] = useState(0);
  if (!places.length) return <p style={{ fontSize: '0.85rem', color: 'var(--warm-gray)' }}>Sin lugares específicos para este día.</p>;

  return (
    <div>
      {places.map((place, i) => {
        const key = `${dayId}-place-${i}`;
        const favKey = `${dayId}-place-${place.name}`;
        const done = isDone(key);
        const fav = isFavoritePlace(favKey);

        return (
          <div key={i} className="place-item" style={{ opacity: done ? 0.55 : 1 }}>
            <div className="place-item-header">
              <span className="place-item-name">{place.name}</span>
              <button
                className={`fav-btn ${fav ? 'active' : ''}`}
                onClick={() => { toggleFavoritePlace(favKey); forceUpdate(n => n + 1); }}
                title={fav ? 'Quitar favorito' : 'Añadir a favoritos'}
              >
                {fav ? '❤️' : '🤍'}
              </button>
              {statusBadge(place.reservationStatus)}
            </div>
            {place.description && <p className="place-item-desc">{place.description}</p>}
            {place.price && <p className="place-item-price">💶 {place.price}</p>}
            {place.notes.length > 0 && (
              <p className="place-item-notes">{place.notes.join(' · ')}</p>
            )}
            <div className="place-item-actions">
              {place.mapsQuery && <MapsButton query={place.mapsQuery} size="sm" />}
              {place.officialUrl && (
                <ExternalLinkButton href={place.officialUrl} label="Tickets" variant="primary" size="sm" />
              )}
              <label className="place-done-check">
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => { toggleDone(key); forceUpdate(n => n + 1); }}
                />
                Hecho
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
}
