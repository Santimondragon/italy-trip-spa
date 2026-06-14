import { createGoogleMapsUrl } from '../utils/maps';

interface MapsButtonProps {
  query: string;
  label?: string;
  size?: 'sm' | 'md';
}

export default function MapsButton({ query, label = 'Maps', size }: MapsButtonProps) {
  const url = createGoogleMapsUrl(query);
  const cls = `btn btn-maps${size === 'sm' ? ' btn-sm' : ''}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={cls}>
      📍 {label}
    </a>
  );
}
