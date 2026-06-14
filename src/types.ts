export type RouteType = 'flight' | 'car' | 'train' | 'ferry' | 'walk' | 'metro' | 'bus';
export type ReservationStatus = 'booked' | 'needs-booking' | 'unavailable' | 'optional' | 'none';
export type TicketStatus = 'available' | 'booked' | 'unavailable' | 'needs-booking' | 'optional';
export type LogisticsType = 'train' | 'car' | 'ferry' | 'walk' | 'metro' | 'bus' | 'taxi' | 'parking' | 'flight' | 'check-in';
export type WarningType = 'heat' | 'ztl' | 'dress-code' | 'parking' | 'ticket' | 'timing' | 'driving' | 'check-in';
export type BadgeType =
  | 'booked' | 'needs-booking' | 'unavailable' | 'check-in' | 'ztl' | 'dress-code'
  | 'heat-plan' | 'train' | 'drive' | 'ferry' | 'restaurant' | 'ticket' | 'airport'
  | 'food' | 'sunset' | 'optional';

export interface RouteSegment {
  mode: RouteType;
  from: string | null;
  to: string | null;
  duration: string | null;
  cost?: string | null;
  notes: string[];
}

export interface Route {
  type: RouteType;
  from: string | null;
  to: string | null;
  segments: RouteSegment[];
}

export interface ScheduleItem {
  time: string | null;
  title: string;
  description: string;
  location: string;
  links: string[];
  badges: BadgeType[];
}

export interface Place {
  name: string;
  category: string;
  description: string;
  address: string;
  ticketRequired: boolean;
  reservationStatus: ReservationStatus;
  price: string | null;
  officialUrl: string | null;
  mapsQuery: string;
  notes: string[];
}

export interface FoodItem {
  name: string;
  type: string;
  description: string;
  address: string;
  reservationStatus: ReservationStatus;
  reservationTime: string | null;
  partySize?: number;
  contact: string | null;
  url: string | null;
  mapsQuery: string;
  notes: string[];
}

export interface Ticket {
  name: string;
  status: TicketStatus;
  price: string | null;
  url: string | null;
  notes: string[];
}

export interface LogisticsItem {
  type: LogisticsType;
  title: string;
  description: string;
  duration: string | null;
  cost: string | null;
  links: string[];
}

export interface Warning {
  type: WarningType;
  title: string;
  description: string;
}

export interface Day {
  id: string;
  dayNumber: number;
  date: string;
  weekday: string;
  title: string;
  baseCity: string;
  sleepCity: string;
  summary: string;
  tags: string[];
  route: Route;
  checkInDeadline: string | null;
  schedule: ScheduleItem[];
  places: Place[];
  food: FoodItem[];
  tickets: Ticket[];
  logistics: LogisticsItem[];
  warnings: Warning[];
  rawNotes: string[];
}

export interface Trip {
  title: string;
  startDate: string;
  endDate: string;
  travelers: number;
  timezone: string;
  defaultLanguage: string;
  description: string;
}

export interface ItalyTrip {
  trip: Trip;
  days: Day[];
}

export type FilterKey =
  | 'tickets-booked'
  | 'reservation-booked'
  | 'driving-day'
  | 'train-day'
  | 'heavy-walking'
  | 'heat-warning'
  | 'check-in-deadline';

export interface StorageState {
  reviewedDays: string[];
  donItems: string[];
  favoritePlaces: string[];
  favoriteFood: string[];
}
