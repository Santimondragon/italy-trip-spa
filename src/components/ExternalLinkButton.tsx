interface ExternalLinkButtonProps {
  href: string;
  label?: string;
  variant?: 'primary' | 'outline' | 'ghost' | 'maps' | 'whatsapp' | 'navy';
  size?: 'sm' | 'md';
}

export default function ExternalLinkButton({ href, label = 'Abrir', variant = 'outline', size }: ExternalLinkButtonProps) {
  const cls = `btn btn-${variant}${size === 'sm' ? ' btn-sm' : ''}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {label} ↗
    </a>
  );
}
