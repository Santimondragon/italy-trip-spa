import { useRef } from 'react';
import type { Day } from '../types';
import DayCard from './DayCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DayCarouselProps {
  days: Day[];
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function DayCarousel({ days, activeIndex, onPrev, onNext }: DayCarouselProps) {
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) onNext();
      else onPrev();
    }
    touchStartX.current = null;
  };

  const day = days[activeIndex];

  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {/* Nav bar */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <button
          onClick={onPrev}
          disabled={activeIndex === 0}
          className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-30 disabled:cursor-default transition-all"
          aria-label="Día anterior"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm text-slate-500 font-medium italic">
          {day.weekday} · {day.baseCity}
        </span>
        <button
          onClick={onNext}
          disabled={activeIndex === days.length - 1}
          className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-30 disabled:cursor-default transition-all"
          aria-label="Día siguiente"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <DayCard key={day.id} day={day} />
    </div>
  );
}
