import { useState, type ReactNode } from 'react';

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
    <div className="accordion">
      <button className="accordion-trigger" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span className="accordion-icon">{icon}</span>
        <span className="accordion-title">{title}</span>
        {count !== undefined && count > 0 && (
          <span className="accordion-count">{count}</span>
        )}
        <span className={`accordion-chevron ${open ? 'open' : ''}`}>▼</span>
      </button>
      {open && <div className="accordion-body">{children}</div>}
    </div>
  );
}
