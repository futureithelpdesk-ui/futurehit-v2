import { useEffect, useState } from "react";
import { BootSequence } from "@/components/cyber/BootSequence";
import { SmoothScroll } from "@/components/cyber/SmoothScroll";
import { TopHUD, BottomHUD } from "@/components/cyber/HUD";
import { HeroSection } from "@/components/cyber/HeroSection";
import { LegendSection } from "@/components/cyber/LegendSection";
import { FutureIntroSection } from "@/components/cyber/FutureIntroSection";
import { FutureSection } from "@/components/cyber/FutureSection";
import { TeamSection } from "@/components/cyber/TeamSection";
import { OperationsSection } from "@/components/cyber/OperationsSection";
import { VictimSection } from "@/components/cyber/VictimSection";
import { UndergroundSection } from "@/components/cyber/UndergroundSection";
import { TalkToFutureSection } from "@/components/cyber/TalkToFutureSection";
import { StatsSection } from "@/components/cyber/StatsSection";
import { GlitchTransition } from "@/components/cyber/GlitchTransition";
import { EndingSection } from "@/components/cyber/EndingSection";
import { CinematicIntro } from "@/components/cyber/CinematicIntro";
import skullImg from "@/assets/skull.jpg";
import anonImg from "@/assets/anon.jpg";
import teamImg from "@/assets/team.jpg";

function Index()
export default function Home()

function Index() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (!booted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [booted]);

  return (
    <main className="relative min-h-screen bg-black text-white">
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
      {booted && <SmoothScroll />}
      {booted && <GlitchTransition />}
      <TopHUD />
      <HeroSection />
      <CinematicIntro
        chapter="chapter 01 — the legend"
        title="LEGEND"
        caption="// the internet never forgets — unless we force it to"
        image={skullImg}
        glyph="∞"
        accent="red"
      />
      <LegendSection />
      <FutureIntroSection />
      <FutureSection />
      <CinematicIntro
        chapter="chapter 03 — operatives"
        title="TEAM"
        caption="// five ghosts. one signal. zero faces."
        image={anonImg}
        glyph="Ω"
        accent="cyan"
      />
      <TeamSection />
      <CinematicIntro
        chapter="chapter 04 — operations"
        title="OPS"
        caption="// silent strikes across the dark net"
        image={teamImg}
        glyph="◊"
        accent="orange"
      />
      <OperationsSection />
      <CinematicIntro
        chapter="chapter 05 — victims"
        title="SAVED"
        caption="// we pulled them back from the void"
        image={anonImg}
        glyph="✚"
        accent="blue"
      />
      <VictimSection />
      <CinematicIntro
        chapter="chapter 06 — underground"
        title="DEEP"
        caption="// forum 0xFE — whispers in the dark"
        image={skullImg}
        glyph="§"
        accent="red"
      />
      <UndergroundSection />
      <CinematicIntro
        chapter="chapter 07 — direct contact"
        title="CONTACT"
        caption="// open a secure line with FUTURE"
        image={teamImg}
        glyph="⌖"
        accent="red"
      />
      <TalkToFutureSection />
      <CinematicIntro
        chapter="chapter 08 — telemetry"
        title="STATS"
        caption="// every number is a life rewritten"
        image={anonImg}
        glyph="Σ"
        accent="orange"
      />
      <StatsSection />
      <CinematicIntro
        chapter="chapter 09 — transmission ends"
        title="END"
        caption="// signal terminated — until next contact"
        image={skullImg}
        glyph="✕"
        accent="red"
      />
      <EndingSection />
      <BottomHUD />
    </main>
  );
}
