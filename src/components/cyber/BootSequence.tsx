import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  "> initializing secure channel ...",
  "> handshake : AES-256-GCM ok",
  "> bypassing firewall layer 04 ...",
  "> rerouting traffic via 14 nodes ...",
  "> verifying operator identity ...",
  "> connection encrypted. welcome.",
];

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [shown, setShown] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step >= STEPS.length) {
      const t = setTimeout(() => {
        setShown(false);
        setTimeout(onDone, 700);
      }, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep(step + 1), 420 + Math.random() * 280);
    return () => clearTimeout(t);
  }, [step, onDone]);

  useEffect(() => {
    const t = setInterval(() => setProgress((p) => Math.min(100, p + Math.random() * 8)), 120);
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <div className="absolute inset-0 bg-grid-sm opacity-40" />
          <div className="scanlines absolute inset-0" />
          <div className="relative w-[min(640px,92vw)] cyber-border p-6 font-mono text-xs sm:text-sm text-red-400/90">
            <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-red-400/70">
              <span>// future_helpdesk :: secure_terminal</span>
              <span className="flicker text-red-500">● live</span>
            </div>
            <div className="space-y-1 min-h-[180px]">
              {STEPS.slice(0, step).map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-emerald-400/80"
                >
                  {s}
                </motion.div>
              ))}
              {step < STEPS.length && (
                <div className="text-cyan-300/70 animate-pulse">{STEPS[step]}</div>
              )}
            </div>
            <div className="mt-6">
              <div className="mb-1 flex justify-between text-[10px] text-red-400/70">
                <span>DECRYPTING UPLINK</span>
                <span>{Math.floor(progress)}%</span>
              </div>
              <div className="h-1 w-full overflow-hidden bg-red-500/10">
                <div
                  className="h-full bg-gradient-to-r from-red-500 via-orange-400 to-cyan-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
