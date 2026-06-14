import type { Warning } from '../types';

const ICONS: Record<string, string> = {
  heat: '☀️',
  ztl: '🚫',
  'dress-code': '👗',
  parking: '🅿️',
  ticket: '🎫',
  timing: '⏰',
  driving: '🚗',
  'check-in': '🏨',
};

interface WarningListProps {
  warnings: Warning[];
}

export default function WarningList({ warnings }: WarningListProps) {
  if (!warnings.length) return null;

  return (
    <div>
      {warnings.map((w, i) => (
        <div key={i} className={`warning-item ${w.type}`}>
          <span className="warning-icon">{ICONS[w.type] ?? '⚠️'}</span>
          <div className="warning-content">
            <div className="warning-title">{w.title}</div>
            <div className="warning-desc">{w.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
