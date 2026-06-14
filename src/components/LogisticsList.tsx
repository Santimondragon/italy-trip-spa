import type { LogisticsItem } from '../types';
import ExternalLinkButton from './ExternalLinkButton';

const ICONS: Record<string, string> = {
  train: '🚂',
  car: '🚗',
  ferry: '⛴',
  walk: '🚶',
  metro: '🚇',
  bus: '🚌',
  taxi: '🚕',
  parking: '🅿️',
  flight: '✈️',
  'check-in': '🏨',
};

interface LogisticsListProps {
  logistics: LogisticsItem[];
}

export default function LogisticsList({ logistics }: LogisticsListProps) {
  if (!logistics.length) return <p style={{ fontSize: '0.85rem', color: 'var(--warm-gray)' }}>Sin logística específica para este día.</p>;

  return (
    <div>
      {logistics.map((l, i) => (
        <div key={i} className="logistics-item">
          <span className="logistics-icon">{ICONS[l.type] ?? '📍'}</span>
          <div className="logistics-info">
            <div className="logistics-title">{l.title}</div>
            <div className="logistics-desc">{l.description}</div>
            {(l.duration || l.cost) && (
              <div className="logistics-meta">
                {l.duration && <span>⏱ {l.duration}</span>}
                {l.cost && <span>💶 {l.cost}</span>}
              </div>
            )}
            {l.links.length > 0 && (
              <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                {l.links.map(link => <ExternalLinkButton key={link} href={link} label="Ver" size="sm" />)}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
