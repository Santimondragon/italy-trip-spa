import type { Day, ItalyTrip } from '../types';
import tripMeta from './trip.json';

import day01 from './days/2026-07-11.json';
import day02 from './days/2026-07-12.json';
import day03 from './days/2026-07-13.json';
import day04 from './days/2026-07-14.json';
import day05 from './days/2026-07-15.json';
import day06 from './days/2026-07-16.json';
import day07 from './days/2026-07-17.json';
import day08 from './days/2026-07-18.json';
import day09 from './days/2026-07-19.json';
import day10 from './days/2026-07-20.json';
import day11 from './days/2026-07-21.json';
import day12 from './days/2026-07-22.json';
import day13 from './days/2026-07-23.json';
import day14 from './days/2026-07-24.json';
import day15 from './days/2026-07-25.json';
import day16 from './days/2026-07-26.json';
import day17 from './days/2026-07-27.json';
import day18 from './days/2026-07-28.json';
import day19 from './days/2026-07-29.json';
import day20 from './days/2026-07-30.json';
import day21 from './days/2026-07-31.json';
import day22 from './days/2026-08-01.json';
import day23 from './days/2026-08-02.json';
import day24 from './days/2026-08-03.json';
import day25 from './days/2026-08-04.json';

export const days: Day[] = [
  day01, day02, day03, day04, day05,
  day06, day07, day08, day09, day10,
  day11, day12, day13, day14, day15,
  day16, day17, day18, day19, day20,
  day21, day22, day23, day24, day25,
] as Day[];

export const italyTrip: ItalyTrip = {
  trip: tripMeta,
  days,
};

export default italyTrip;
