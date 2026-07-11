import { motion } from "framer-motion";

const STAGES = [
  { tag: "INCIDENT", text: "fake profile created using victim's photos", color: "red" },
  { tag: "ESCALATION", text: "blackmail dm — pay 0.4 BTC in 24h", color: "red" },
  { tag: "ALERT", text: "victim contacts FUTURE_HELPDESK", color: "cyan" },
  { tag: "RESPONSE", text: "metadata trace / 14 servers mapped", color: "blue" },
  { tag: "RESPONSE", text: "image hashes seeded across takedown grid", color: "blue" },
  { tag: "RESPONSE", text: "operator wallet flagged across 9 exchanges", color: "blue" },
  { tag: "RESULT", text: "content removed.", color: "green" },
  { tag: "RESULT", text: "network exposed.", color: "green" },
  { tag: "RESULT", text: "victim secured.", color: "green" },
];

const colorMap: Record<string, string> = {
  red: "text-red-400 border-red-500/40 bg-red-950/30",
  cyan: "text-cyan-300 border-cyan-400/40 bg-cyan-950/30",
  blue: "text-blue-300 border-blue-500/40 bg-blue-950/30",
  green: "text-emerald-300 border-emerald-500/40 bg-emerald-950/30",
};

export function VictimSection() {
  return (
    <section className="relative overflow-hidden bg-black py-40">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-400/70">// chapter 05 — digital victim response</div>
          <h2 className="mt-4 font-display text-[clamp(34px,5vw,72px)] font-black leading-[0.95] text-white">
            WHEN THE INTERNET <br />
            <span className="text-glow-red text-red-400">COMES FOR YOU.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-mono text-sm text-white/60">// anatomy of a real case. names redacted. timeline preserved.</p>
        </div>

        <div className="mt-20 relative">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-red-500/0 via-red-500/40 to-emerald-500/40" />

          <div className="space-y-10">
            {STAGES.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: left ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex items-center ${left ? "justify-start" : "justify-end"}`}
                >
                  <div className="absolute left-1/2 -translate-x-1/2">
                    <div className={`h-3 w-3 ${colorMap[s.color]} border`} />
                  </div>
                  <div className={`w-[calc(50%-2rem)] cyber-border ${colorMap[s.color]} p-4`}>
                    <div className="font-mono text-[10px] uppercase tracking-widest opacity-80">
                      // {s.tag} // T+{String(i * 3).padStart(2, "0")}:14
                    </div>
                    <div className="mt-2 font-display text-lg font-bold uppercase tracking-wider">{s.text}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-20 text-center font-display text-2xl uppercase tracking-[0.3em] text-emerald-300 text-glow-cyan"
        >
          case closed. another ghost goes dark.
        </motion.div>
      </div>
    </section>
  );
}
