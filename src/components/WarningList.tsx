import type { Warning } from '../types';

const ICONS: Record<string, string> = {
  heat: '☀️', ztl: '🚫', 'dress-code': '👗', parking: '🅿️',
  ticket: '🎫', timing: '⏰', driving: '🚗', 'check-in': '🏨',
};

const BG: Record<string, string> = {
  heat: 'bg-red-50',
  ztl: 'bg-orange-50',
  'dress-code': 'bg-purple-50',
  parking: 'bg-yellow-50',
  ticket: 'bg-red-50',
  timing: 'bg-indigo-50',
  driving: 'bg-green-50',
  'check-in': 'bg-cyan-50',
};

interface WarningListProps {
  warnings: Warning[];
}

export default function WarningList({ warnings }: WarningListProps) {
  if (!warnings.length) return null;
  return (
    <div className="flex flex-col gap-3">
      {warnings.map((w, i) => (
        <div key={i} className={`flex gap-4 p-4 rounded-xl ${BG[w.type] ?? 'bg-slate-50'}`}>
          <span className="text-xl flex-shrink-0 pt-0.5">{ICONS[w.type] ?? '⚠️'}</span>
          <div>
            <p className="text-sm font-bold text-slate-800 mb-1">{w.title}</p>
            <p className="text-sm text-slate-600 leading-relaxed">{w.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
