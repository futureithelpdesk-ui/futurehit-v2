import { motion } from "framer-motion";
import { CodeStream } from "./CodeStream";

const OPS = [
  { code: "OP_001", name: "MALWARE RESEARCH LAB", desc: "controlled environments where we reverse-engineer threats before they touch civilians.", hue: "red" },
  { code: "OP_002", name: "DARK WEB MONITORING", desc: "247 active relays watching marketplaces, leak forums, and ransom channels.", hue: "blue" },
  { code: "OP_003", name: "AI SURVEILLANCE GRID", desc: "neural models scanning billions of messages for signals of abuse and coercion.", hue: "cyan" },
  { code: "OP_004", name: "PHISHING SIMULATION", desc: "we run the attacks ourselves — so we know exactly how to break them.", hue: "orange" },
  { code: "OP_005", name: "ENCRYPTED COMMS", desc: "no metadata. no logs. no servers we don't physically own.", hue: "red" },
  { code: "OP_006", name: "GLOBAL TRACE NETWORK", desc: "every leaked file leaves a fingerprint. we know how to read fingerprints.", hue: "blue" },
];

const hueColor: Record<string, string> = {
  red: "border-red-500/40 text-red-300",
  blue: "border-blue-500/40 text-blue-300",
  cyan: "border-cyan-400/40 text-cyan-300",
  orange: "border-orange-400/40 text-orange-300",
};

export function OperationsSection() {
  return (
    <section className="relative overflow-hidden bg-[#04050a] py-40">
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 via-transparent to-black" />
      <div className="absolute inset-0 bg-grid-sm opacity-30" />
      <motion.div
        animate={{ opacity: [0.1, 0.5, 0.1] }}
        transition={{ duration: 2.4, repeat: Infinity }}
        className="absolute inset-x-0 top-0 h-px bg-red-500 shadow-[0_0_30px_rgba(255,60,60,0.8)]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-400/70">// chapter 04 — secret operations</div>
          <h2 className="mt-4 font-display text-[clamp(36px,6vw,84px)] font-black leading-[0.95] text-white">
            <span className="text-glow-red text-red-400">SOME WARS</span> ARE FOUGHT
            <br />
            WITH BULLETS.
          </h2>
          <p className="mt-6 font-display text-[clamp(18px,2vw,28px)] uppercase tracking-[0.3em] text-cyan-300/80">
            ours are fought <span className="text-glow-red text-red-400">with data.</span>
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {OPS.map((o, i) => (
            <motion.div
              key={o.code}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`group relative overflow-hidden border ${hueColor[o.hue]} bg-black/70 p-5 hover:bg-black/40`}
            >
              <div className="bg-grid-sm absolute inset-0 opacity-20" />
              <div className="relative flex items-center justify-between font-mono text-[10px] uppercase tracking-widest opacity-70">
                <span>{o.code}</span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse bg-current" /> live
                </span>
              </div>
              <h3 className="relative mt-3 font-display text-2xl font-black text-white">{o.name}</h3>
              <p className="relative mt-3 font-mono text-xs leading-relaxed text-white/55">{o.desc}</p>
              <div className="relative mt-4 h-16 overflow-hidden border-t border-white/5 pt-2">
                <CodeStream lines={5} />
              </div>
              <div className="scan-line opacity-0 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 cyber-border mx-auto max-w-3xl bg-black/60 p-4 text-center font-mono text-[11px] uppercase tracking-widest text-white/50">
          this is not a criminal operation. this is a quiet intelligence cell that exists because nobody else was willing to do the work.
        </div>
      </div>
    </section>
  );
}
