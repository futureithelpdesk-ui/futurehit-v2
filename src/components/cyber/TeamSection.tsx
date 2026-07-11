import { motion } from "framer-motion";
import { useState } from "react";
import anon from "@/assets/anon.jpg";

type Member = {
  codename: string;
  role: string;
  status: string;
  bio: string;
  skills: string[];
  clearance: string;
  hue: string;
};

const MEMBERS: Member[] = [
  {
    codename: "FUTURE",
    role: "OPERATOR // GHOST_LEAD",
    status: "ACTIVE",
    bio: "Founder. Architect of every protocol. Voice nobody has ever heard.",
    skills: ["DARK_WEB / RECON", "MALWARE / R&D", "OSINT / Ω", "CRYPTO / 0DAY"],
    clearance: "Ω-09",
    hue: "red",
  },
  {
    codename: "goddessofdemons",
    role: "CO-FOUNDER // INTELLIGENCE // ARCHIVE",
    status: "ACTIVE",
    bio: "Memory of the team. Knows every leak, every scam pattern, every alias.",
    skills: ["PATTERN / AI", "ARCHIVE OPS", "LINK ANALYSIS", "LEAK MAP"],
    clearance: "Ω-09",
    hue: "blue",
  },
  {
    codename: "DADDY",
    role: "INFILTRATION // SHADOW",
    status: "DEPLOYED",
    bio: "Walks into closed networks like they have an open door.",
    skills: ["PHISHING / OPS", "SOCIAL ENG", "ZERO_DAY DEPLOY", "EXFIL"],
    clearance: "Ω-08",
    hue: "red",
  },
  {
    codename: "WISHLIST",
    role: "SURVEILLANCE // EYE",
    status: "ACTIVE",
    bio: "Sees every camera, every CCTV node, every reflection in every photo.",
    skills: ["GEO_INT", "FACIAL / META", "IMAGE FORENSICS", "STREAM HIJACK"],
    clearance: "Ω-08",
    hue: "cyan",
  },
  {
    codename: "QUEOFMON",
    role: "AUTOMATION // SWARM",
    status: "STANDBY",
    bio: "Runs a thousand bots so the humans don't have to.",
    skills: ["BOTNET CTRL", "AUTOMATION", "TAKEDOWN / SPAM", "REPORTING"],
    clearance: "Ω-06",
    hue: "orange",
  },
];

const hueMap: Record<string, { ring: string; bg: string; text: string; glow: string }> = {
  red: { ring: "border-red-500/40", bg: "from-red-950/40", text: "text-red-300", glow: "shadow-[0_0_50px_-10px_rgba(255,60,60,0.6)]" },
  cyan: { ring: "border-cyan-400/40", bg: "from-cyan-950/40", text: "text-cyan-300", glow: "shadow-[0_0_50px_-10px_rgba(60,200,255,0.6)]" },
  blue: { ring: "border-blue-500/40", bg: "from-blue-950/40", text: "text-blue-300", glow: "shadow-[0_0_50px_-10px_rgba(80,140,255,0.6)]" },
  orange: { ring: "border-orange-400/40", bg: "from-orange-950/40", text: "text-orange-300", glow: "shadow-[0_0_50px_-10px_rgba(255,160,60,0.6)]" },
};

function MemberCard({ m, i }: { m: Member; i: number }) {
  const [hover, setHover] = useState(false);
  const h = hueMap[m.hue];
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: i * 0.08 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`group relative overflow-hidden border ${h.ring} bg-gradient-to-b ${h.bg} to-black p-4 transition-all ${hover ? h.glow : ""}`}
    >
      <div className="bg-grid-sm absolute inset-0 opacity-30" />
      <span className="absolute left-1 top-1 h-3 w-3 border-l border-t border-current opacity-60" />
      <span className="absolute right-1 top-1 h-3 w-3 border-r border-t border-current opacity-60" />
      <span className="absolute left-1 bottom-1 h-3 w-3 border-l border-b border-current opacity-60" />
      <span className="absolute right-1 bottom-1 h-3 w-3 border-r border-b border-current opacity-60" />

      <div className="relative aspect-[4/5] overflow-hidden border border-white/5 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,80,80,0.18),transparent_60%)]" />
        <img
          src={anon}
          alt={`${m.codename} operative`}
          loading="lazy"
          width={1024}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover grayscale contrast-125"
          style={{
            filter: `grayscale(1) contrast(1.25) brightness(0.9) hue-rotate(${m.hue === "red" ? "320deg" : m.hue === "cyan" ? "160deg" : m.hue === "blue" ? "200deg" : "20deg"})`,
            mixBlendMode: "luminosity",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-color"
          style={{
            background:
              m.hue === "red"
                ? "radial-gradient(ellipse at 50% 40%, rgba(255,60,60,0.6), transparent 70%)"
                : m.hue === "cyan"
                ? "radial-gradient(ellipse at 50% 40%, rgba(80,220,255,0.55), transparent 70%)"
                : m.hue === "blue"
                ? "radial-gradient(ellipse at 50% 40%, rgba(100,150,255,0.55), transparent 70%)"
                : "radial-gradient(ellipse at 50% 40%, rgba(255,180,80,0.55), transparent 70%)",
          }}
        />
        <div className="holo-shimmer absolute inset-0" />
        <div className="scanlines absolute inset-0" />
        <motion.div
          animate={hover ? { y: ["-100%", "100%"] } : { y: "-100%" }}
          transition={{ duration: 1.2, repeat: hover ? Infinity : 0 }}
          className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-red-400/40 to-transparent"
          style={{ background: `linear-gradient(to bottom, transparent, ${m.hue === "red" ? "rgba(255,80,80,0.5)" : m.hue === "cyan" ? "rgba(80,220,255,0.5)" : m.hue === "blue" ? "rgba(100,150,255,0.5)" : "rgba(255,180,80,0.5)"}, transparent)` }}
        />
        <div className="absolute left-2 top-2 font-mono text-[8px] uppercase tracking-widest text-white/60">ID_{String(i + 1).padStart(3, "0")}</div>
        <div className="absolute right-2 top-2 flex items-center gap-1 font-mono text-[8px] uppercase tracking-widest text-white/60">
          <span className={`h-1.5 w-1.5 ${m.status === "ACTIVE" ? "bg-green-400" : m.status === "DEPLOYED" ? "bg-red-400" : "bg-yellow-400"} animate-pulse`} />
          {m.status}
        </div>
        <div className="absolute bottom-2 right-2 font-mono text-[8px] uppercase tracking-widest text-white/40">CLR / {m.clearance}</div>
      </div>

      <div className="mt-4 space-y-2">
        <div className={`font-display text-2xl font-black ${h.text}`}>
          <span className="glitch" data-text={m.codename}>{m.codename}</span>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">{m.role}</div>
        <p className="font-mono text-xs leading-relaxed text-white/60">{m.bio}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {m.skills.map((s) => (
            <span key={s} className="border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-white/60">
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function TeamSection() {
  return (
    <section className="relative overflow-hidden bg-black py-32">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-400/70">// chapter 03 — operatives</div>
            <h2 className="mt-3 font-display text-[clamp(34px,5vw,68px)] font-black leading-tight text-white">
              TEAM <span className="text-glow-red text-red-400">FUTURE</span>
              <br />
              <span className="text-glow-cyan text-cyan-300">CLASSIFIED FILES.</span>
            </h2>
          </div>
          <div className="cyber-border bg-black/60 p-3 font-mono text-[10px] uppercase tracking-widest text-white/60">
            <div>access_level : Ω-09</div>
            <div className="text-red-400/80">disclosure of identities punishable by digital erasure</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {MEMBERS.map((m, i) => (
            <MemberCard key={m.codename} m={m} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
