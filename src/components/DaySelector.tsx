import { useEffect, useRef } from 'react';
import type { Day } from '../types';
import { isToday } from '../utils/dates';

interface DaySelectorProps {
  days: Day[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

function getCalendarDay(iso: string): number {
  return parseInt(iso.split('-')[2], 10);
}

function shortWeekday(weekday: string): string {
  // weekday is full Spanish name e.g. "Sábado" → "Sáb"
  return weekday.slice(0, 3);
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
    <div className="px-4 py-3 border-t border-white/10">
      <div
        ref={scrollRef}
        className="flex gap-2.5 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {days.map((day, i) => {
          const active = i === activeIndex;
          const today = isToday(day.date);

          return (
            <button
              key={day.id}
              onClick={() => onSelect(i)}
              className={`
                relative shrink-0 flex flex-col items-center rounded pt-3 pb-2.5 px-3.5
                min-w-14.5 transition-all
                ${active
                  ? 'bg-white text-slate-900 ring-2 ring-white shadow-md'
                  : 'bg-white/8 text-white/70 hover:bg-white/15 hover:text-white'
                }
              `}
            >
              {/* Today indicator */}
              {today && (
                <span className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${active ? 'bg-terracotta' : 'bg-yellow-400'}`} />
              )}

              {/* Calendar day number */}
              <span className={`text-xl font-bold leading-none mb-1 ${active ? 'text-slate-900' : 'text-white'}`}>
                {getCalendarDay(day.date)}
              </span>

              {/* Short weekday */}
              <span className={`text-[11px] font-medium leading-none ${active ? 'text-slate-500' : 'text-white/50'}`}>
                {shortWeekday(day.weekday)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
