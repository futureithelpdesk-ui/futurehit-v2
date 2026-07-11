import { motion } from "framer-motion";

const CITIES: { name: string; x: number; y: number; alert?: boolean }[] = [
  { name: "REYKJAVIK", x: 470, y: 130 },
  { name: "LONDON", x: 510, y: 170, alert: true },
  { name: "BERLIN", x: 555, y: 175 },
  { name: "MOSCOW", x: 640, y: 155, alert: true },
  { name: "ISTANBUL", x: 605, y: 215 },
  { name: "DUBAI", x: 670, y: 250 },
  { name: "MUMBAI", x: 730, y: 275, alert: true },
  { name: "TOKYO", x: 870, y: 215 },
  { name: "BEIJING", x: 830, y: 200 },
  { name: "SINGAPORE", x: 800, y: 320 },
  { name: "SYDNEY", x: 900, y: 410 },
  { name: "LAGOS", x: 540, y: 305 },
  { name: "CAPE TOWN", x: 580, y: 410 },
  { name: "RIO", x: 350, y: 380 },
  { name: "BOGOTA", x: 280, y: 310 },
  { name: "NYC", x: 280, y: 195, alert: true },
  { name: "LA", x: 180, y: 220 },
  { name: "SF", x: 160, y: 200 },
  { name: "ANCHORAGE", x: 130, y: 110 },
];

const ARCS: [number, number][] = [
  [15, 1], [15, 7], [3, 8], [5, 6], [13, 16], [16, 12], [9, 10], [2, 8], [11, 6],
];

function arcPath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - 60;
  return `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`;
}

export function WorldMap() {
  return (
    <svg viewBox="0 0 1024 520" className="h-full w-full">
      <defs>
        <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(60,120,200,0.18)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="arc-grad" x1="0" x2="1">
          <stop offset="0%" stopColor="rgba(255,80,80,0.0)" />
          <stop offset="50%" stopColor="rgba(255,80,80,1)" />
          <stop offset="100%" stopColor="rgba(120,180,255,0)" />
        </linearGradient>
      </defs>

      <rect width="1024" height="520" fill="url(#globe-glow)" />

      <g fill="rgba(120,180,255,0.45)">
        {Array.from({ length: 1400 }).map((_, i) => {
          const x = (i * 53) % 1024;
          const y = ((i * 17) % 460) + 30;
          const inLand =
            (Math.sin(x * 0.02) + Math.cos(y * 0.03)) > 0.2 &&
            ((Math.sin(x * 0.01 + y * 0.02)) > -0.1);
          if (!inLand) return null;
          return <circle key={i} cx={x} cy={y} r={1.1} />;
        })}
      </g>

      {ARCS.map(([i, j], k) => (
        <motion.path
          key={k}
          d={arcPath(CITIES[i], CITIES[j])}
          stroke="url(#arc-grad)"
          strokeWidth="1.3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, delay: k * 0.4, repeat: Infinity, repeatType: "loop", repeatDelay: 1.5 }}
        />
      ))}

      {CITIES.map((c, i) => (
        <g key={i}>
          <circle cx={c.x} cy={c.y} r={c.alert ? 3.5 : 2} fill={c.alert ? "#ff3a3a" : "#7ec8ff"} />
          {c.alert && (
            <circle cx={c.x} cy={c.y} r={3.5} fill="none" stroke="#ff3a3a" strokeWidth="1">
              <animate attributeName="r" from="3.5" to="18" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.9" to="0" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
          <text
            x={c.x + 6}
            y={c.y - 4}
            fontSize="7"
            fill={c.alert ? "rgba(255,150,150,0.9)" : "rgba(180,210,255,0.6)"}
            fontFamily="JetBrains Mono"
          >
            {c.name}
          </text>
        </g>
      ))}

      <g stroke="rgba(255,80,80,0.4)" strokeWidth="0.5" fill="none">
        <line x1="0" y1="260" x2="1024" y2="260" />
        <line x1="512" y1="0" x2="512" y2="520" />
      </g>
    </svg>
  );
}
