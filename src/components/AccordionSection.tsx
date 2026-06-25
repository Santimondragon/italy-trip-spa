import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionSectionProps {
  icon: string;
  title: string;
  count?: number;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function AccordionSection({ icon, title, count, defaultOpen = false, children }: AccordionSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm mb-3 overflow-hidden">
      <button
        className="w-full flex items-center gap-3 px-6 py-5 text-left hover:bg-slate-50 transition-colors"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="text-lg shrink-0">{icon}</span>
        <span className="flex-1 text-base font-semibold text-slate-800">{title}</span>
        {count !== undefined && count > 0 && (
          <span className="text-xs bg-slate-100 text-slate-500 font-medium rounded-full px-2.5 py-1">{count}</span>
        )}
        <ChevronDown
          size={15}
          className={`text-slate-400 transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6 border-t border-slate-100">
          {children}
        </div>
      )}
    </div>
  );
}
