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
  if (!places.length) return <p className="text-sm text-slate-400 py-2">Sin lugares específicos.</p>;

  return (
    <div className="flex flex-col pt-2">
      {places.map((place, i) => {
        const key = `${dayId}-place-${i}`;
        const favKey = `${dayId}-place-${place.name}`;
        const done = isDone(key);
        const fav = isFavoritePlace(favKey);

        return (
          <div key={i} className={`py-6 transition-opacity ${i < places.length - 1 ? 'border-b border-slate-100' : ''} ${done ? 'opacity-50' : ''}`}>
            <div className="flex items-start gap-3 mb-3">
              <p className="flex-1 text-sm font-semibold text-slate-800">{place.name}</p>
              <button
                onClick={() => { toggleFavoritePlace(favKey); forceUpdate(n => n + 1); }}
                className="text-lg p-0.5 hover:scale-110 transition-transform"
                title={fav ? 'Quitar favorito' : 'Añadir a favoritos'}
              >
                {fav ? '❤️' : '🤍'}
              </button>
              {statusBadge(place.reservationStatus)}
            </div>
            {place.description && <p className="text-sm text-slate-500 leading-relaxed mb-3">{place.description}</p>}
            {place.price && <p className="text-sm text-green-700 font-medium mb-2">💶 {place.price}</p>}
            {place.notes.length > 0 && (
              <p className="text-sm text-slate-400 italic mb-3">{place.notes.join(' · ')}</p>
            )}
            <div className="flex flex-wrap gap-2.5 items-center">
              {place.mapsQuery && <MapsButton query={place.mapsQuery} size="sm" />}
              {place.officialUrl && (
                <ExternalLinkButton href={place.officialUrl} label="Tickets" variant="primary" size="sm" />
              )}
              <label className="flex items-center gap-2 text-sm text-slate-500 ml-auto cursor-pointer">
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => { toggleDone(key); forceUpdate(n => n + 1); }}
                  className="accent-green-600"
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
