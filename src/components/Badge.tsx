import type { BadgeType } from '../types';

const LABELS: Record<BadgeType, string> = {
  'booked': '✓ Reservado',
  'needs-booking': '⚠ Reservar',
  'unavailable': '✕ Sin disponibilidad',
  'check-in': '🏨 Check-in',
  'ztl': '🚫 ZTL',
  'dress-code': '👗 Código vest.',
  'heat-plan': '☀ Calor',
  'train': '🚂 Tren',
  'drive': '🚗 Coche',
  'ferry': '⛴ Ferry',
  'restaurant': '🍽 Restaurante',
  'ticket': '🎫 Ticket',
  'airport': '✈ Aeropuerto',
  'food': '🍽 Comida',
  'sunset': '🌅 Atardecer',
  'optional': 'Opcional',
};

interface BadgeProps {
  variant: BadgeType;
  label?: string;
}

export default function Badge({ variant, label }: BadgeProps) {
  return (
    <span className={`badge badge-${variant}`}>
      {label ?? LABELS[variant]}
    </span>
  );
}
