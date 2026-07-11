import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Typewriter } from "./Typewriter";

export function EndingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const dim = useTransform(scrollYProgress, [0, 1], [1, 0.1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section ref={ref} className="relative h-[180vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: dim, scale }} className="absolute inset-0 bg-grid opacity-30" />

        <div className="absolute inset-0">
          {Array.from({ length: 14 }).map((_, i) => {
            const delay = i * 0.06;
            const offProgress = useTransform(scrollYProgress, [0.2 + delay * 0.04, 0.6], [1, 0]);
            return (
              <motion.div
                key={i}
                style={{
                  opacity: offProgress,
                  left: `${(i * 73) % 90 + 2}%`,
                  top: `${(i * 41) % 80 + 5}%`,
                  width: 80 + (i % 4) * 30,
                  height: 50 + (i % 3) * 20,
                }}
                className="absolute cyber-border bg-red-950/20 backdrop-blur-sm"
              >
                <div className="h-1 w-full bg-red-500/60" />
                <div className="p-2 font-mono text-[8px] text-red-300/70">node_{i}</div>
              </motion.div>
            );
          })}
        </div>

        <motion.div style={{ opacity: dim }} className="relative z-10 text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-400/70">
            // chapter 09 — disconnection
          </div>
          <div className="mt-4 font-display text-[clamp(20px,2.5vw,36px)] uppercase tracking-[0.4em] text-cyan-300/80">
            CONNECTION ENCRYPTED
          </div>
          <div className="mt-2 font-display text-[clamp(20px,2.5vw,36px)] uppercase tracking-[0.4em] text-red-300/80">
            TEAM FUTURE WILL RETURN
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.6, 0.95], [0, 1]) }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center"
        >
          <h2 className="font-display text-[clamp(40px,8vw,120px)] font-black text-white text-glow-red">
            <span className="glitch" data-text="FUTURE HELPDESK">FUTURE HELPDESK</span>
          </h2>
          <p className="mt-6 max-w-2xl px-6 font-display text-[clamp(14px,1.8vw,22px)] uppercase tracking-[0.3em] text-cyan-300/80">
            <Typewriter text="THE INTERNET NEVER SLEEPS. NEITHER DO WE." speed={50} />
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            <span>signal lost</span>
            <span>·</span>
            <span>session #FH-{Math.floor(Math.random() * 90000) + 10000}</span>
            <span>·</span>
            <span>burn after reading</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
