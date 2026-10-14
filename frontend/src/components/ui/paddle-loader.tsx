export function PaddleLoader() {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-8">
      <svg
        aria-hidden="true"
        viewBox="0 0 120 130"
        className="h-32 w-28 overflow-visible"
      >
        <ellipse cx="60" cy="119" rx="30" ry="4" fill="#2A2420" opacity=".09" />
        <g className="loader-paddle">
          <path d="M58 103 L54 122 Q60 128 66 122 L63 103" fill="#B78352" />
          <ellipse cx="60" cy="96" rx="36" ry="12" fill="#1A1714" />
          <ellipse cx="60" cy="92" rx="36" ry="11" fill="#C8312B" />
          <path
            d="M30 92 Q60 104 90 92"
            fill="none"
            stroke="#FAF5E8"
            strokeWidth="1"
            opacity=".5"
          />
        </g>
        <circle
          className="loader-ball"
          cx="60"
          cy="24"
          r="9"
          fill="#FAF5E8"
          stroke="#E08A1E"
          strokeWidth="2"
        />
      </svg>
      <p className="font-display text-2xl font-semibold">
        Preparando tu próximo punto…
      </p>
      <p className="text-xs text-charcoal/65">Buscando tu equipo ideal</p>
    </div>
  );
}
