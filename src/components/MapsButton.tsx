import { MapPin } from 'lucide-react';
import { createGoogleMapsUrl } from '../utils/maps';

interface MapsButtonProps {
  query: string;
  label?: string;
  size?: 'sm' | 'md';
}

export default function MapsButton({ query, label = 'Maps', size }: MapsButtonProps) {
  const url = createGoogleMapsUrl(query);
  const cls = size === 'sm'
    ? 'inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors'
    : 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors';
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={cls}>
      <MapPin size={size === 'sm' ? 11 : 13} />
      {label}
    </a>
  );
}
