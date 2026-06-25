import type { LogisticsItem } from '../types';
import ExternalLinkButton from './ExternalLinkButton';

const ICONS: Record<string, string> = {
  train: '🚂', car: '🚗', ferry: '⛴', walk: '🚶', metro: '🚇',
  bus: '🚌', taxi: '🚕', parking: '🅿️', flight: '✈️', 'check-in': '🏨',
};

interface LogisticsListProps {
  logistics: LogisticsItem[];
}

export default function LogisticsList({ logistics }: LogisticsListProps) {
  if (!logistics.length) return <p className="text-sm text-slate-400 py-2">Sin logística específica.</p>;

  return (
    <div className="flex flex-col pt-2">
      {logistics.map((l, i) => (
        <div key={i} className={`flex gap-4 py-6 ${i < logistics.length - 1 ? 'border-b border-slate-100' : ''}`}>
          <span className="text-2xl flex-shrink-0 w-8 text-center pt-0.5">{ICONS[l.type] ?? '📍'}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 mb-1.5">{l.title}</p>
            <p className="text-sm text-slate-500 leading-relaxed mb-2">{l.description}</p>
            {(l.duration || l.cost) && (
              <div className="flex gap-4 text-sm text-green-700 font-medium">
                {l.duration && <span>⏱ {l.duration}</span>}
                {l.cost && <span>💶 {l.cost}</span>}
              </div>
            )}
            {l.links.length > 0 && (
              <div className="flex gap-2 mt-3">
                {l.links.map(link => <ExternalLinkButton key={link} href={link} label="Ver" size="sm" />)}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
