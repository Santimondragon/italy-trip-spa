import type { ScheduleItem, BadgeType } from '../types';
import Badge from './Badge';
import ExternalLinkButton from './ExternalLinkButton';

interface TimelineProps {
  items: ScheduleItem[];
}

export default function Timeline({ items }: TimelineProps) {
  if (!items.length) return <p style={{ fontSize: '0.85rem', color: 'var(--warm-gray)' }}>Sin programa detallado para este día.</p>;

  return (
    <div className="timeline">
      {items.map((item, i) => (
        <div key={i} className="timeline-item">
          <div className="timeline-time-col">
            {item.time && <span className="timeline-time">{item.time}</span>}
          </div>
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="timeline-item-title">{item.title}</div>
            {item.description && <div className="timeline-item-desc">{item.description}</div>}
            {item.badges.length > 0 && (
              <div className="timeline-item-badges">
                {item.badges.map(b => <Badge key={b} variant={b as BadgeType} />)}
              </div>
            )}
            {item.links.length > 0 && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
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
