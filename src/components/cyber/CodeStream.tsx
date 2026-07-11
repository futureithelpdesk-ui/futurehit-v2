import { useEffect, useState } from "react";

const HEX = "0123456789ABCDEF";
const KW = ["TRACE", "DECRYPT", "NODE_", "0xFE", "PING", "SCAN", "TARGET", "WIPE", "ROUTE", "GHOST"];

function rand() {
  if (Math.random() < 0.15) {
    return KW[Math.floor(Math.random() * KW.length)] + Math.floor(Math.random() * 9999).toString(16).toUpperCase();
  }
  let s = "";
  for (let i = 0; i < 8; i++) s += HEX[Math.floor(Math.random() * 16)];
  return s;
}

export function CodeStream({ lines = 14 }: { lines?: number }) {
  const [rows, setRows] = useState<string[]>(() => Array.from({ length: lines }, rand));
  useEffect(() => {
    const t = setInterval(() => {
      setRows((r) => {
        const n = r.slice(1);
        n.push(rand());
        return n;
      });
    }, 220);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="pointer-events-none select-none font-mono text-[10px] leading-[14px] text-emerald-400/70">
      {rows.map((r, i) => (
        <div key={i} style={{ opacity: 0.25 + (i / rows.length) * 0.75 }}>
          <span className="text-red-400/60">&gt;</span> {r}
        </div>
      ))}
    </div>
  );
}
