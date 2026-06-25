import type { ScheduleItem, BadgeType } from '../types';
import Badge from './Badge';
import ExternalLinkButton from './ExternalLinkButton';

interface TimelineProps {
  items: ScheduleItem[];
}

export default function Timeline({ items }: TimelineProps) {
  if (!items.length) return <p className="text-sm text-slate-400 py-2">Sin programa detallado para este día.</p>;

  return (
    <div className="flex flex-col pt-4">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4 pb-7 relative">
          {/* Vertical line */}
          {i < items.length - 1 && (
            <div className="absolute left-[46px] top-7 bottom-0 w-px bg-slate-100" />
          )}
          {/* Time */}
          <div className="flex-shrink-0 w-12 text-right pt-0.5">
            {item.time && (
              <span className="inline-block text-[11px] font-bold text-terracota bg-[#F5DDD2] rounded px-1.5 py-1 leading-tight">
                {item.time}
              </span>
            )}
          </div>
          {/* Dot */}
          <div className="flex-shrink-0 mt-2">
            <div className="w-3 h-3 rounded-full bg-terracota border-2 border-white ring-1 ring-terracota" />
          </div>
          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 leading-snug">{item.title}</p>
            {item.description && <p className="text-sm text-slate-500 leading-relaxed mt-1.5">{item.description}</p>}
            {item.badges.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {item.badges.map(b => <Badge key={b} variant={b as BadgeType} />)}
              </div>
            )}
            {item.links.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2.5">
                {item.links.map(link => (
                  <ExternalLinkButton key={link} href={link} label="Ver" size="sm" />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
