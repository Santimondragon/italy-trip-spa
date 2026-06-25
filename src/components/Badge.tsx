import type { BadgeType } from '../types';
import { cn } from '../lib/utils';

const CONFIG: Record<BadgeType, { label: string; className: string }> = {
  'booked':         { label: '✓ Reservado',        className: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  'needs-booking':  { label: '⚠ Reservar',          className: 'bg-amber-50 text-amber-700 border border-amber-200' },
  'unavailable':    { label: '✕ Sin disponibilidad', className: 'bg-red-50 text-red-700 border border-red-200' },
  'check-in':       { label: '🏨 Check-in',          className: 'bg-cyan-50 text-cyan-700 border border-cyan-200' },
  'ztl':            { label: '🚫 ZTL',               className: 'bg-orange-50 text-orange-700 border border-orange-200' },
  'dress-code':     { label: '👗 Código vest.',       className: 'bg-purple-50 text-purple-700 border border-purple-200' },
  'heat-plan':      { label: '☀ Calor',              className: 'bg-red-50 text-red-600 border border-red-200' },
  'train':          { label: '🚂 Tren',               className: 'bg-slate-100 text-slate-700 border border-slate-200' },
  'drive':          { label: '🚗 Coche',              className: 'bg-slate-100 text-slate-700 border border-slate-200' },
  'ferry':          { label: '⛴ Ferry',              className: 'bg-slate-100 text-slate-700 border border-slate-200' },
  'restaurant':     { label: '🍽 Restaurante',        className: 'bg-green-50 text-green-700 border border-green-200' },
  'ticket':         { label: '🎫 Ticket',             className: 'bg-[#F5DDD2] text-terracota border border-[#E8C4B0]' },
  'airport':        { label: '✈ Aeropuerto',         className: 'bg-slate-100 text-slate-700 border border-slate-200' },
  'food':           { label: '🍽 Comida',             className: 'bg-green-50 text-green-700 border border-green-200' },
  'sunset':         { label: '🌅 Atardecer',          className: 'bg-yellow-50 text-yellow-700 border border-yellow-200' },
  'optional':       { label: 'Opcional',              className: 'bg-slate-50 text-slate-500 border border-slate-200' },
};

interface BadgeProps {
  variant: BadgeType;
  label?: string;
}

export default function Badge({ variant, label }: BadgeProps) {
  const { label: defaultLabel, className } = CONFIG[variant] ?? { label: variant, className: 'bg-slate-100 text-slate-600' };
  return (
    <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap', className)}>
      {label ?? defaultLabel}
    </span>
  );
}
