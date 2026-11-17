/** Uneven star, like a hand-drawn comic burst (200 × 200 box). */
const BURST_POINTS = Array.from({ length: 28 }, (_, i) => {
  const radius = i % 2 ? 62 + (i % 3) * 5 : 98 - (i % 4) * 5;
  const angle = (Math.PI * i) / 14 - Math.PI / 2;
  return `${(100 + radius * Math.cos(angle)).toFixed(1)},${(100 + radius * Math.sin(angle)).toFixed(1)}`;
}).join(" ");

/** Comic burst with a short onomatopoeia inside. Colours come from CSS. */
export function ComicBurst({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`comic-burst ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" focusable="false">
        <polygon points={BURST_POINTS} />
      </svg>
      <b>{children}</b>
    </span>
  );
}
