import { Printer } from 'lucide-react';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      title="Imprimir itinerario"
      className="no-print fixed bottom-5 right-4 w-11 h-11 rounded-full bg-slate-800 text-white shadow-xl flex items-center justify-center hover:bg-slate-700 transition-colors z-50"
    >
      <Printer size={18} />
    </button>
  );
}
