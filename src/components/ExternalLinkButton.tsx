import { ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

const VARIANT_CLASSES: Record<string, string> = {
  primary: 'bg-terracota text-white hover:bg-[#E8845A]',
  outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50',
  ghost: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
  maps: 'bg-blue-600 text-white hover:bg-blue-500',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1BA84A]',
  navy: 'bg-slate-800 text-white hover:bg-slate-700',
};

interface ExternalLinkButtonProps {
  href: string;
  label?: string;
  variant?: 'primary' | 'outline' | 'ghost' | 'maps' | 'whatsapp' | 'navy';
  size?: 'sm' | 'md';
}

export default function ExternalLinkButton({ href, label = 'Abrir', variant = 'outline', size }: ExternalLinkButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-1 rounded-lg font-medium transition-colors',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.outline,
      )}
    >
      {label}
      <ExternalLink size={size === 'sm' ? 10 : 12} />
    </a>
  );
}
