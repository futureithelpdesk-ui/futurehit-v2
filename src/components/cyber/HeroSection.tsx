import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ParticleField } from "./ParticleField";
import { CodeStream } from "./CodeStream";
import { Typewriter } from "./Typewriter";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[180vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#04050a]">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <ParticleField density={70} />

        <motion.div style={{ y: titleY, opacity }} className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="mb-6 font-mono text-[10px] uppercase tracking-[0.4em] text-red-400/70"
          >
            // classified // intelligence_division // est. 2019
          </motion.div>

          <h1 className="font-display text-[clamp(48px,9vw,144px)] font-black leading-[0.9] text-white text-glow-red">
            <span className="glitch" data-text="TEAM FUTURE">TEAM FUTURE</span>
          </h1>

          <div className="mt-6 font-display text-[clamp(14px,1.6vw,22px)] uppercase tracking-[0.35em] text-cyan-300/80 text-glow-cyan">
            <Typewriter text="WE DON'T HACK PEOPLE." speed={45} />
          </div>
          <div className="mt-2 font-display text-[clamp(14px,1.6vw,22px)] uppercase tracking-[0.35em] text-red-300/90 text-glow-red">
            WE PROTECT THEM FROM THE INTERNET.
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            className="mt-10"
          >
            <Link
              to="/enlist"
              className="group relative inline-flex items-center gap-3 overflow-hidden border-2 border-red-500/60 bg-red-500/10 px-8 py-4 font-display text-sm font-black uppercase tracking-[0.35em] text-red-300 backdrop-blur-sm transition hover:bg-red-500/20 hover:text-white"
            >
              <span className="relative z-10">JOIN THE GHOSTS</span>
              <span className="relative z-10 text-red-400 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="scan-line" />
        <div className="vignette absolute inset-0" />
      </div>
    </section>
  );
}
