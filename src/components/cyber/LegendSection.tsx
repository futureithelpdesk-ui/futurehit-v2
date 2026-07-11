import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function LegendSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [120, -200]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-40">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <motion.div style={{ rotate: rot }} className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/10">
        <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 shadow-[0_0_30px_rgba(255,60,60,0.8)]" />
      </motion.div>
      <motion.div style={{ rotate: useTransform(rot, (v) => -v * 0.6) }} className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.div style={{ y: y1 }} className="mb-10 font-mono text-[10px] uppercase tracking-[0.4em] text-red-400/70">
          // chapter 01 — the legend
        </motion.div>

        <motion.h2 style={{ y: y1 }} className="font-display text-[clamp(36px,6vw,84px)] font-black leading-tight text-white">
          THE INTERNET
          <br />
          <span className="text-glow-red text-red-400">NEVER FORGETS.</span>
        </motion.h2>

        <motion.p style={{ y: y2 }} className="mt-10 mx-auto max-w-2xl font-mono text-base uppercase tracking-[0.2em] text-cyan-300/80">
          unless <span className="text-red-400 text-glow-red">someone</span> forces it to.
        </motion.p>

        <motion.div style={{ y: y2 }} className="mt-16 mx-auto max-w-3xl space-y-3 font-mono text-sm text-white/50 leading-relaxed text-left">
          <p>// every screenshot, every voice note, every leaked DM — it lives forever in caches, mirrors, archives, dark-web vaults.</p>
          <p>// we built <span className="text-red-400">FUTURE HELPDESK</span> to reach into those vaults — and pull your name back out.</p>
          <p>// we are not a service. we are a quiet promise: <span className="text-cyan-300"> when the internet attacks you, someone is coming.</span></p>
        </motion.div>
      </div>
    </section>
  );
}
