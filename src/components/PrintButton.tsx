export default function PrintButton() {
  return (
    <button className="print-btn" onClick={() => window.print()} title="Imprimir itinerario">
      🖨
    </button>
  );
}
