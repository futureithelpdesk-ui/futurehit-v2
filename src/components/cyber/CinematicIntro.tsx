import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  chapter: string;
  title: string;
  caption?: string;
  image: string;
  glyph?: string;
  accent?: "red" | "cyan" | "blue" | "orange";
  height?: string;
};

const ACCENT: Record<string, { stroke: string; glow: string; tw: string }> = {
  red: { stroke: "rgba(255,60,60,0.6)", glow: "0 0 60px rgba(255,40,40,0.4), 0 0 120px rgba(80,200,255,0.2)", tw: "text-red-400" },
  cyan: { stroke: "rgba(80,220,255,0.6)", glow: "0 0 60px rgba(80,220,255,0.4), 0 0 120px rgba(255,80,80,0.18)", tw: "text-cyan-300" },
  blue: { stroke: "rgba(100,150,255,0.6)", glow: "0 0 60px rgba(100,150,255,0.4), 0 0 120px rgba(255,80,80,0.18)", tw: "text-blue-300" },
  orange: { stroke: "rgba(255,180,80,0.6)", glow: "0 0 60px rgba(255,180,80,0.4), 0 0 120px rgba(80,200,255,0.2)", tw: "text-orange-300" },
};

export function CinematicIntro({ chapter, title, caption, image, glyph = "Λ", accent = "red", height = "320vh" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const a = ACCENT[accent];

  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 80, damping: 18, mass: 0.4 });
  const my = useSpring(myRaw, { stiffness: 80, damping: 18, mass: 0.4 });
  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      mxRaw.set(((e.clientX - r.left) / r.width) * 2 - 1);
      myRaw.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mxRaw, myRaw]);

  const glyphX = useTransform(mx, [-1, 1], [-25, 25]);
  const glyphYm = useTransform(my, [-1, 1], [-18, 18]);
  const imgX = useTransform(mx, [-1, 1], [-60, 60]);
  const imgY = useTransform(my, [-1, 1], [-40, 40]);
  const lettersX = useTransform(mx, [-1, 1], [-12, 12]);
  const lettersY = useTransform(my, [-1, 1], [-8, 8]);
  const rotX = useTransform(my, [-1, 1], [4, -4]);
  const rotY = useTransform(mx, [-1, 1], [-6, 6]);

  const gY = useTransform(p, [0, 0.5], ["-90vh", "0vh"]);
  const gScale = useTransform(p, [0, 0.5, 0.8, 1], [3, 1.4, 1, 0.9]);
  const gRot = useTransform(p, [0, 0.5], [-25, 0]);
  const imgScale = useTransform(p, [0.4, 1], [0.6, 1.6]);
  const imgOpacity = useTransform(p, [0.35, 0.6, 0.95], [0, 0.55, 0]);
  const imgBlur = useTransform(p, [0.4, 1], ["12px", "0px"]);
  const wordsOpacity = useTransform(p, [0.7, 0.95], [1, 0]);
  const bgFade = useTransform(p, [0.85, 1], [1, 0]);
  const sweepY = useTransform(p, [0, 1], ["-10%", "110%"]);

  const letters = title.split("");
  const xs: MotionValue<string>[] = letters.map((_, i) => {
    const half = letters.length / 2;
    const fromLeft = i < half;
    const startVw = fromLeft ? -(60 + i * 8) : 60 + (i - half) * 8;
    const start = 0.0 + i * (0.3 / Math.max(letters.length - 1, 1));
    const end = start + 0.35;
    return useTransform(p, [start, Math.min(end, 1)], [`${startVw}vw`, "0vw"]);
  });

  return (
    <section ref={ref} className="relative" style={{ height }}>
      <motion.div ref={stickyRef} style={{ opacity: bgFade, perspective: 1400 }} className="sticky top-0 h-screen w-full overflow-hidden bg-[#03040a]">
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${a.stroke.replace("0.6", "0.18")}, transparent 60%)` }} />

        <motion.div style={{ rotateX: rotX, rotateY: rotY }} className="absolute inset-0">
          <motion.div style={{ scale: imgScale, opacity: imgOpacity, filter: imgBlur as unknown as string, x: imgX, y: imgY }} className="absolute inset-0 flex items-center justify-center">
            <img src={image} alt="" aria-hidden className="h-[85vh] w-auto mix-blend-screen object-contain" style={{ filter: "contrast(1.2) saturate(1.1)" }} />
          </motion.div>

          <motion.div style={{ y: gY, scale: gScale, rotate: gRot, opacity: wordsOpacity, x: glyphX }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div style={{ y: glyphYm }}>
              <div className="font-display font-black leading-none text-transparent" style={{ fontSize: "clamp(280px,55vw,860px)", WebkitTextStroke: `2px ${a.stroke}`, textShadow: a.glow }}>
                {glyph}
              </div>
            </motion.div>
          </motion.div>

          <motion.div style={{ opacity: wordsOpacity, x: lettersX, y: lettersY }} className="relative z-10 flex h-full items-center justify-center px-4">
            <div className="flex select-none font-display font-black leading-none text-white" style={{ fontSize: `clamp(48px, ${Math.max(6, 18 - letters.length * 0.5)}vw, ${Math.max(120, 320 - letters.length * 10)}px)`, letterSpacing: "-0.04em" }}>
              {letters.map((ch, i) => (
                <motion.span key={i} style={{ x: xs[i] }} className={i === 0 || i === letters.length - 1 ? `text-glow-red ${a.tw}` : ""}>
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {caption && <motion.div style={{ opacity: wordsOpacity }} className="absolute bottom-24 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-white/50">{caption}</motion.div>}
        <div className="absolute top-24 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.5em] text-red-400/70">// {chapter}</div>
        <motion.div style={{ y: sweepY }} className="pointer-events-none absolute inset-x-0 h-24 blur-md">
          <div className="h-full w-full" style={{ background: `linear-gradient(to bottom, transparent, ${a.stroke.replace("0.6", "0.18")}, transparent)` }} />
        </motion.div>
        <div className="scanlines absolute inset-0" />
        <div className="vignette absolute inset-0" />
      </motion.div>
    </section>
  );
}
