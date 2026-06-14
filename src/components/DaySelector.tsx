import { useEffect, useRef } from 'react';
import type { Day } from '../types';
import { isToday } from '../utils/dates';

interface DaySelectorProps {
  days: Day[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function DaySelector({ days, activeIndex, onSelect }: DaySelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const btn = el.children[activeIndex] as HTMLElement | undefined;
    if (btn) btn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [activeIndex]);

  return (
    <div className="day-selector">
      <div className="day-selector-scroll" ref={scrollRef}>
        {days.map((day, i) => (
          <button
            key={day.id}
            className={`day-selector-btn ${i === activeIndex ? 'active' : ''}`}
            onClick={() => onSelect(i)}
          >
            {`Día ${day.dayNumber}`}
            {isToday(day.date) && <span className="day-selector-today-dot" title="¡Hoy!" />}
          </button>
        ))}
      </div>
    </div>
  );
}
