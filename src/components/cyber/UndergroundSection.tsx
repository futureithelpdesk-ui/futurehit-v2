import { motion } from "framer-motion";

const RUMORS = [
  { user: "g4nymede", time: "03:14:09", text: "he erased himself from global databases." },
  { user: "void_runner", time: "03:14:42", text: "entire scam networks vanished overnight." },
  { user: "n0_signal", time: "03:15:01", text: "i tried to dox him. my own face came back." },
  { user: "ash3n", time: "03:15:33", text: "the dark web fears monsters." },
  { user: "??????", time: "03:15:34", text: "monsters fear FUTURE." },
  { user: "z3r0day", time: "03:16:08", text: "saw a server farm catch fire last week. no fire was reported." },
  { user: "nu11", time: "03:17:20", text: "[message redacted by mod]" },
];

export function UndergroundSection() {
  return (
    <section className="relative overflow-hidden bg-[#04050a] py-40">
      <div className="absolute inset-0 bg-grid-sm opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/10 to-black" />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-400/70">// chapter 06 — underground reputation</div>
          <h2 className="mt-4 font-display text-[clamp(34px,5vw,68px)] font-black leading-[0.95] text-white">
            WHAT THEY SAY <br />
            <span className="text-glow-red text-red-400">IN THE DARK.</span>
          </h2>
        </div>

        <div className="mt-16 cyber-border bg-black/80 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-red-500/20 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-red-300/80">
            <span>onion://3xqr...zay9.onion // forum_0xFE</span>
            <span className="flicker">● live // 2,418 lurkers</span>
          </div>

          <div className="divide-y divide-white/5">
            {RUMORS.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="grid grid-cols-[120px_80px_1fr] gap-3 px-4 py-3 font-mono text-sm hover:bg-red-500/5"
              >
                <span className="text-cyan-300/80">@{r.user}</span>
                <span className="text-white/30 text-xs self-center">{r.time}</span>
                <span className={r.text.includes("[message redacted") ? "italic text-red-400/60" : "text-white/80"}>
                  {r.user === "??????" ? <span className="glitch text-red-400" data-text={r.text}>{r.text}</span> : r.text}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-red-500/20 px-4 py-3 font-mono text-xs text-white/40">
            <span className="text-red-400">{">"}</span>
            <span className="animate-pulse">post anonymously...</span>
            <span className="ml-auto text-red-400/60">[ENCRYPTED]</span>
          </div>
        </div>
      </div>
    </section>
  );
}
