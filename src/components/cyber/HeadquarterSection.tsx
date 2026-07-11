import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { Rain } from "./Rain";

export function HeadquarterSection() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [-1, 1], [4, -4]);
  const ry = useTransform(mx, [-1, 1], [-6, 6]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section className="relative overflow-hidden bg-black py-40">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-400/70">// chapter 07 — the headquarter</div>
          <h2 className="mt-4 font-display text-[clamp(34px,5vw,72px)] font-black leading-[0.95] text-white">
            STEP INSIDE <br />
            <span className="text-glow-red text-red-400">THE BUNKER.</span>
          </h2>
        </div>

        <div className="mt-16 relative h-[640px] cyber-border bg-[#02020a] overflow-hidden" style={{ perspective: "1400px" }}>
          <div className="absolute inset-y-0 right-0 w-1/3 border-l border-blue-500/20 bg-gradient-to-l from-blue-950/40 to-transparent">
            <Rain />
            <svg viewBox="0 0 400 600" className="absolute inset-0 h-full w-full">
              <g fill="#000" stroke="rgba(80,140,255,0.3)">
                <rect x="20" y="220" width="40" height="380" />
                <rect x="70" y="170" width="55" height="430" />
                <rect x="135" y="240" width="35" height="360" />
                <rect x="180" y="140" width="65" height="460" />
                <rect x="255" y="210" width="45" height="390" />
                <rect x="310" y="180" width="60" height="420" />
              </g>
              {Array.from({ length: 80 }).map((_, i) => (
                <rect key={i} x={20 + (i * 37) % 360} y={200 + (i * 53) % 380} width="3" height="3" fill={Math.random() < 0.6 ? "#5ce0ff" : "#ff5c5c"} opacity={0.6} />
              ))}
            </svg>
          </div>

          <motion.div style={{ rotateX: rx, rotateY: ry }} className="absolute inset-0 transition-transform">
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-red-950/40 via-black to-transparent bg-grid" style={{ transform: "rotateX(60deg)", transformOrigin: "bottom" }} />
            <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-black to-transparent" style={{ transform: "rotateX(-30deg)", transformOrigin: "top" }} />

            <div className="absolute left-0 top-12 bottom-12 w-1/4 space-y-2 p-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="relative h-12 border border-white/10 bg-gradient-to-r from-red-950/30 to-black p-1">
                  <div className="grid h-full grid-cols-8 gap-0.5">
                    {Array.from({ length: 16 }).map((_, j) => (
                      <div key={j} className={`h-full ${Math.random() < 0.6 ? "bg-red-500/60" : "bg-cyan-400/40"} animate-pulse`} style={{ animationDelay: `${(i + j) * 100}ms` }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative h-[280px] w-[280px]">
                <div className="absolute inset-0 rounded-full border border-red-500/40 spin-slow" />
                <div className="absolute inset-4 rounded-full border border-cyan-400/30 spin-rev" />
                <div className="absolute inset-8 rounded-full border border-blue-500/20 spin-slow" />
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,60,60,0.15),transparent_60%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <a href="https://hack.chat/?almondparty" target="_blank" rel="noopener noreferrer" className="group relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-red-500/60 shadow-[0_0_60px_rgba(255,60,60,0.6)] transition-all hover:scale-110 hover:border-red-400 hover:shadow-[0_0_100px_rgba(255,60,60,0.9)]">
                    <div className="float-y absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(255,60,60,0.2),rgba(80,160,255,0.3),rgba(255,60,60,0.2))]" />
                    <div className="relative z-10 text-center">
                      <div className="font-display text-[11px] font-black uppercase tracking-[0.25em] text-white text-glow-red">ENTER</div>
                      <div className="mt-1 font-mono text-[8px] uppercase tracking-widest text-red-300/90">::almondparty</div>
                    </div>
                  </a>
                </div>
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 ping-slow" />
              </div>
              <div className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-red-300/70">global threat sphere // realtime</div>
            </div>

            <div className="absolute bottom-4 left-1/4 right-1/4 grid grid-cols-6 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-14 border border-red-500/20 bg-black/80 p-1">
                  <div className="h-1 bg-red-500/40" />
                  <div className="mt-1 grid grid-cols-3 gap-0.5">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <div key={j} className="h-1 bg-cyan-400/40" />
                    ))}
                  </div>
                  <div className="mt-1 font-mono text-[7px] text-red-400/80">CAM_{String(i + 1).padStart(2, "0")}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div animate={{ opacity: [0, 0.4, 0] }} transition={{ duration: 3, repeat: Infinity }} className="pointer-events-none absolute inset-0 bg-red-600/30 mix-blend-overlay" />
          <div className="scanlines absolute inset-0" />
          <div className="vignette absolute inset-0" />

          <div className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-widest text-red-300/80">cam_main // bunker_a // depth -47m</div>
          <div className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-widest text-cyan-300/80">rec ● 04:18:32:09</div>
          <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest text-white/40">move mouse to orbit camera</div>
        </div>
      </div>
    </section>
  );
}
