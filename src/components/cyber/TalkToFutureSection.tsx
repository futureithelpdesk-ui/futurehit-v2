import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const LINK = "https://hack.chat/?almondparty";

const TRANSMISSION = [
  "> initializing secure channel ...",
  "> handshake : ECDH-25519 :: ok",
  "> routing through 11 anonymous relays",
  "> identity : [REDACTED]",
  "> FUTURE is online.",
];

export function TalkToFutureSection() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [-1, 1], [6, -6]);
  const ry = useTransform(mx, [-1, 1], [-8, 8]);
  const px = useTransform(mx, [-1, 1], [-20, 20]);
  const py = useTransform(my, [-1, 1], [-20, 20]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setLines((prev) => (i < TRANSMISSION.length ? [...prev, TRANSMISSION[i++]] : prev));
      if (i >= TRANSMISSION.length) clearInterval(id);
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-black py-40">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,40,40,0.18),transparent_65%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-400/70">// chapter 07 — direct contact</div>
          <h2 className="mt-4 font-display text-[clamp(34px,5vw,72px)] font-black leading-[0.95] text-white">
            TALK TO <span className="text-glow-red text-red-400">FUTURE.</span>
          </h2>
          <p className="mt-4 mx-auto max-w-xl font-mono text-xs uppercase tracking-widest text-white/50">
            one channel. one ghost. zero logs. step in if you dare.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.2fr] items-center" style={{ perspective: "1400px" }}>
          <motion.div style={{ rotateX: rx, rotateY: ry }} className="cyber-border relative bg-[#02020a]/90 p-6 font-mono text-xs leading-relaxed shadow-[0_0_80px_-20px_rgba(255,60,60,0.5)]">
            <div className="mb-3 flex items-center justify-between border-b border-red-500/20 pb-2 text-[10px] uppercase tracking-widest">
              <span className="text-red-300/80">secure_tty :: channel_0xFE</span>
              <span className="flex items-center gap-1 text-cyan-300/80">
                <span className="h-1.5 w-1.5 animate-pulse bg-green-400" /> live
              </span>
            </div>
            <div className="min-h-[180px] space-y-1">
              {lines.map((l, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className={i === lines.length - 1 && i === TRANSMISSION.length - 1 ? "text-red-300 text-glow-red" : "text-cyan-200/80"}>
                  {l}
                </motion.div>
              ))}
              {lines.length < TRANSMISSION.length && <span className="inline-block h-3 w-2 animate-pulse bg-red-400 align-middle" />}
            </div>
            <div className="scanlines pointer-events-none absolute inset-0" />
          </motion.div>

          <div className="relative flex items-center justify-center">
            <motion.div style={{ x: px, y: py }} className="relative h-[360px] w-[360px]">
              <div className="absolute inset-0 rounded-full border border-red-500/40 spin-slow" />
              <div className="absolute inset-6 rounded-full border border-cyan-400/30 spin-rev" />
              <div className="absolute inset-12 rounded-full border border-blue-500/20 spin-slow" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,60,60,0.22),transparent_60%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href={LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-44 w-44 items-center justify-center rounded-full border-2 border-red-500/70 bg-black/60 shadow-[0_0_80px_rgba(255,60,60,0.7)] backdrop-blur-sm transition-all hover:scale-110 hover:border-red-300 hover:shadow-[0_0_140px_rgba(255,60,60,1)]"
                >
                  <div className="float-y absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(255,60,60,0.25),rgba(80,160,255,0.35),rgba(255,60,60,0.25))]" />
                  <div className="relative z-10 text-center">
                    <div className="font-display text-base font-black uppercase tracking-[0.25em] text-white text-glow-red">OPEN</div>
                    <div className="mt-1 font-display text-[11px] font-black uppercase tracking-[0.3em] text-red-300/90">CHANNEL</div>
                    <div className="mt-2 font-mono text-[9px] uppercase tracking-widest text-cyan-300/80">::almondparty</div>
                  </div>
                  <span className="absolute -inset-1 rounded-full border border-red-400/30 ping-slow" />
                </a>
              </div>
            </motion.div>
            <div className="absolute bottom-0 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-widest text-white/40">
              click to enter encrypted room ↗
            </div>
          </div>
        </div>
      </div>
      <div className="vignette pointer-events-none absolute inset-0" />
    </section>
  );
}
