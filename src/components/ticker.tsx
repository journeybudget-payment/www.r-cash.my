export function Ticker() {
  const items = ["Pantas", "Selamat", "Telus", "Tiada Yuran Tersembunyi"];
  return (
    <div aria-hidden className="overflow-hidden bg-brand-950 py-2 text-[.72rem] uppercase tracking-[.16em] text-lime-soft">
      <div className="flex w-max animate-ticker gap-10 whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i} className="opacity-85">{t}</span>
        ))}
      </div>
    </div>
  );
}