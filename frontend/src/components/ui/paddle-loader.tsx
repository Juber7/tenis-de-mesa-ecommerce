/** Small star that flashes where the ball hits the paddle. */
const HIT_POINTS = Array.from({ length: 16 }, (_, i) => {
  const radius = i % 2 ? 8 : 16;
  const angle = (Math.PI * i) / 8 - Math.PI / 2;
  return `${(60 + radius * Math.cos(angle)).toFixed(1)},${(81 + radius * Math.sin(angle)).toFixed(1)}`;
}).join(" ");

/**
 * Loading animation: a ball bouncing up from a paddle, drawn as a comic panel
 * in the poster palette (styles in comic.css). "¡PING!" and "¡PONG!" take
 * turns on each bounce.
 */
export function PaddleLoader() {
  return (
    <div role="status" className="comic-loader">
      <div className="comic-loader-panel">
        <b className="comic-loader-sound comic-loader-ping" aria-hidden="true">¡PING!</b>
        <b className="comic-loader-sound comic-loader-pong" aria-hidden="true">¡PONG!</b>
        <svg aria-hidden="true" viewBox="0 0 120 132" className="comic-loader-art">
          <ellipse cx="64" cy="124" rx="40" ry="5" className="comic-loader-shadow" />
          <g className="loader-paddle">
            {/* Handle towards the viewer; the blade is drawn over its start. */}
            <path d="M68 98 L96 121 Q102 126 107 121 Q112 115 106 110 L84 93 Z" className="comic-loader-handle" />
            <ellipse cx="60" cy="97" rx="37" ry="12.5" className="comic-loader-blade" />
            <ellipse cx="60" cy="92" rx="37" ry="11.5" className="comic-loader-rubber" />
            <path d="M32 91 Q60 101 88 91" className="comic-loader-shine" />
          </g>
          <polygon points={HIT_POINTS} className="comic-loader-hit" />
          <circle cx="60" cy="22" r="9.5" className="loader-ball comic-loader-ball" />
        </svg>
      </div>
      <p className="comic-loader-caption">Preparando tu próximo punto…</p>
    </div>
  );
}
