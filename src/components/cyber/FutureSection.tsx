import { motion } from "framer-motion";
import { CodeStream } from "./CodeStream";
import anon from "@/assets/anon.jpg";
import skull from "@/assets/skull.jpg";

export function FutureSection() {
  return (
    <section className="relative overflow-hidden bg-[#04050a] py-40">
      <div className="absolute inset-0 bg-grid-sm opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/10 via-transparent to-blue-950/10" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-400/70">// chapter 02 — subject : FUTURE</div>
          <h2 className="mt-6 font-display text-[clamp(34px,5vw,68px)] font-black leading-[0.95] text-white">
            <span className="glitch" data-text="WHO IS">WHO IS</span>
            <br />
            <span className="text-glow-red text-red-400">FUTURE.</span>
          </h2>

          <div className="mt-12 space-y-6 font-mono text-sm text-white/60">
            <p><span className="text-red-400/80">// some call him a hacker.</span></p>
            <p><span className="text-cyan-300/80">// some call him a criminal.</span></p>
            <p><span className="text-white">// others call him the last hope.</span></p>
          </div>

          <div className="mt-12 cyber-border bg-black/60 p-5 font-mono text-[11px] text-cyan-200/70">
            <div className="mb-3 text-[9px] uppercase tracking-widest text-red-400/70">classified_dossier.txt</div>
            <ul className="space-y-1">
              <li>► alias: FUTURE</li>
              <li>► origin: [REDACTED]</li>
              <li>► known sightings: 0</li>
              <li>► known kills: ∞</li>
              <li>► firewall layers breached: 14,802</li>
              <li>► identity: unknown / unknowable</li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative h-[640px] cyber-border overflow-hidden bg-black">
            <div className="absolute inset-0 grid grid-cols-3 gap-2 p-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="relative overflow-hidden border border-red-500/10 bg-gradient-to-br from-red-950/20 via-black to-blue-950/30">
                  <div className="holo-shimmer absolute inset-0" />
                  <div className="absolute inset-2 font-mono text-[8px] text-cyan-300/40">
                    <CodeStream lines={10} />
                  </div>
                  <div className="absolute bottom-1 right-1 h-1.5 w-1.5 animate-pulse bg-red-500" />
                </div>
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <img src={skull} alt="" aria-hidden loading="lazy" width={1024} height={1024} className="absolute h-[70%] w-auto object-contain opacity-30 mix-blend-screen blur-[2px]" />
              <img src={anon} alt="FUTURE operator" loading="lazy" width={1024} height={1024} className="relative h-[95%] w-auto object-contain" style={{ filter: "contrast(1.15) saturate(0.85)" }} />
            </div>

            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity }} className="absolute left-1/2 top-[42%] -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest text-red-400/70">
              [ subject locked — facial signature : NULL ]
            </motion.div>

            <div className="scan-line" />
            <div className="scanlines absolute inset-0" />
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
            <div className="cyber-border bg-black/60 p-2">cam_03 / bunker_b</div>
            <div className="cyber-border bg-black/60 p-2">infrared : disabled</div>
            <div className="cyber-border bg-black/60 p-2">recording : never</div>
          </div>
        </div>
      </div>
    </section>
  );
}
