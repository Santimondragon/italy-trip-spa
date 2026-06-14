import { useRef } from 'react';
import type { Day } from '../types';
import DayCard from './DayCard';

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
    <div
      className="day-carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-nav">
        <button
          className="carousel-nav-btn"
          onClick={onPrev}
          disabled={activeIndex === 0}
          aria-label="Día anterior"
        >
          ‹
        </button>
        <span className="carousel-day-label">
          {day.weekday}, {day.baseCity}
        </span>
        <button
          className="carousel-nav-btn"
          onClick={onNext}
          disabled={activeIndex === days.length - 1}
          aria-label="Día siguiente"
        >
          ›
        </button>
      </div>

      <div className="day-carousel-slide">
        <DayCard key={day.id} day={day} />
      </div>
    </div>
  );
}
