import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import skull from "@/assets/skull.jpg";

export function FutureIntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const xF = useTransform(p, [0, 0.35], ["-60vw", "0vw"]);
  const xU = useTransform(p, [0.05, 0.4], ["-40vw", "0vw"]);
  const xT = useTransform(p, [0.1, 0.45], ["40vw", "0vw"]);
  const xU2 = useTransform(p, [0.15, 0.5], ["60vw", "0vw"]);
  const xR = useTransform(p, [0.2, 0.55], ["80vw", "0vw"]);
  const xE = useTransform(p, [0.25, 0.6], ["100vw", "0vw"]);

  const lamY = useTransform(p, [0, 0.5], ["-90vh", "0vh"]);
  const lamScale = useTransform(p, [0, 0.5, 0.8, 1], [3, 1.4, 1, 0.9]);
  const lamRot = useTransform(p, [0, 0.5], [-25, 0]);
  const skullScale = useTransform(p, [0.4, 1], [0.6, 1.6]);
  const skullOpacity = useTransform(p, [0.35, 0.6, 0.95], [0, 0.55, 0]);
  const skullBlur = useTransform(p, [0.4, 1], ["12px", "0px"]);
  const wordsOpacity = useTransform(p, [0.7, 0.95], [1, 0]);
  const bgFade = useTransform(p, [0.85, 1], [1, 0]);
  const sweepY = useTransform(p, [0, 1], ["-10%", "110%"]);

  return (
    <section ref={ref} className="relative h-[380vh]">
      <motion.div style={{ opacity: bgFade }} className="sticky top-0 h-screen w-full overflow-hidden bg-[#03040a]">
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,40,40,0.18),transparent_60%)]" />

        <motion.div style={{ scale: skullScale, opacity: skullOpacity, filter: skullBlur as unknown as string }} className="absolute inset-0 flex items-center justify-center">
          <img src={skull} alt="future skull" width={1024} height={1024} className="h-[85vh] w-auto mix-blend-screen object-contain" style={{ filter: "contrast(1.2) saturate(1.1)" }} />
        </motion.div>

        <motion.div style={{ y: lamY, scale: lamScale, rotate: lamRot, opacity: wordsOpacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="font-display font-black leading-none text-transparent" style={{ fontSize: "clamp(280px,55vw,860px)", WebkitTextStroke: "2px rgba(255,60,60,0.6)", textShadow: "0 0 60px rgba(255,40,40,0.35), 0 0 120px rgba(80,200,255,0.2)" }}>
            Λ
          </div>
        </motion.div>

        <motion.div style={{ opacity: wordsOpacity }} className="relative z-10 flex h-full items-center justify-center">
          <div className="flex select-none font-display font-black leading-none text-white" style={{ fontSize: "clamp(70px,15vw,240px)", letterSpacing: "-0.04em" }}>
            <motion.span style={{ x: xF }} className="text-glow-red text-red-400">F</motion.span>
            <motion.span style={{ x: xU }}>U</motion.span>
            <motion.span style={{ x: xT }}>T</motion.span>
            <motion.span style={{ x: xU2 }}>U</motion.span>
            <motion.span style={{ x: xR }}>R</motion.span>
            <motion.span style={{ x: xE }} className="text-glow-cyan text-cyan-300">E</motion.span>
          </div>
        </motion.div>

        <motion.div style={{ opacity: wordsOpacity }} className="absolute bottom-24 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-white/50">
          // entity_id : Λ-00 — root operator — irreversible presence
        </motion.div>
        <div className="absolute top-24 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.5em] text-red-400/70">
          // chapter 02 — the operator
        </div>
        <motion.div style={{ y: sweepY }} className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-red-500/15 to-transparent blur-md" />
        <div className="scanlines absolute inset-0" />
        <div className="vignette absolute inset-0" />
      </motion.div>
    </section>
  );
}
