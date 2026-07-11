import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 284, suffix: "+", label: "PRIVACY CASES RESOLVED" },
  { value: 8421, suffix: "", label: "FAKE ACCOUNTS REPORTED" },
  { value: 47, suffix: "", label: "COUNTRIES IN VOLUNTEER NET" },
  { value: 24, suffix: "/7", label: "GLOBAL THREAT MONITORING" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-[#04050a] py-32">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-400/70">// chapter 08 — operational record</div>
          <h2 className="mt-4 font-display text-[clamp(34px,5vw,68px)] font-black leading-[0.95] text-white">
            NUMBERS DON'T <br />
            <span className="text-glow-cyan text-cyan-300">LIE.</span>
          </h2>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="cyber-border relative bg-black/60 p-6"
            >
              <div className="bg-grid-sm absolute inset-0 opacity-20" />
              <div className="relative font-mono text-[10px] uppercase tracking-widest text-red-400/80">
                ► metric {String(i + 1).padStart(2, "0")}
              </div>
              <div className="relative mt-4 font-display text-5xl font-black text-white text-glow-red">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="relative mt-3 font-mono text-[11px] uppercase tracking-widest text-cyan-300/80">
                {s.label}
              </div>
              <div className="relative mt-4 h-1 overflow-hidden bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                  className="h-full bg-gradient-to-r from-red-500 to-cyan-400"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
