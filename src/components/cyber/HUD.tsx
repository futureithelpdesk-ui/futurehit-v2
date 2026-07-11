import { useEffect, useState } from "react";

export function TopHUD() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n: number) => n.toString().padStart(2, "0");
  const text = now ? `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())} UTC` : "--:--:-- UTC";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-red-500/10 bg-black/40 px-4 py-2 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="relative h-2 w-2 rounded-full bg-red-500">
          <div className="absolute inset-0 rounded-full bg-red-500 ping-slow" />
        </div>
        <span className="font-display text-[11px] uppercase tracking-[0.4em] text-red-300/90">
          FUTURE_HELPDESK <span className="text-white/40">// channel 7F</span>
        </span>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-red-400/70" suppressHydrationWarning>
        {text}
        <span className="mx-2 text-red-500/60">|</span>
        LAT 51.5074 / LON -0.1278
      </div>
      <div className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300/70">
        <span className="h-2 w-2 bg-cyan-300/80" /> uplink stable
        <span className="ml-3 h-2 w-2 bg-red-400/80" /> threat lvl 4
      </div>
    </div>
  );
}

export function BottomHUD() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex items-center justify-between border-t border-red-500/10 bg-black/40 px-4 py-2 backdrop-blur-sm font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
      <span>scroll &rarr; descend into the bunker</span>
      <span>encrypted // tor-relay #38</span>
    </div>
  );
}
