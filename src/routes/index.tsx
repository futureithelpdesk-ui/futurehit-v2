import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#04050a]">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.15),transparent_60%)]" />
      
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-400/70">
          // classified // intelligence_division
        </div>
        
        <h1 className="mt-6 font-display text-[clamp(48px,10vw,120px)] font-black text-white text-glow-red">
          <span className="glitch" data-text="TEAM FUTURE">TEAM FUTURE</span>
        </h1>
        
        <p className="mt-4 max-w-2xl font-mono text-sm text-white/60">
          We don't hack people. We protect them from the internet.
        </p>
        
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/auth"
            className="border-2 border-red-500/60 bg-red-500/10 px-8 py-3 font-display text-sm uppercase tracking-[0.3em] text-red-300 hover:bg-red-500/20"
          >
            Access Console
          </Link>
          <Link
            to="/auth"
            className="border border-white/30 px-8 py-3 font-display text-sm uppercase tracking-[0.3em] text-white hover:bg-white/10"
          >
            Join The Ghosts
          </Link>
        </div>
      </div>
      
      <div className="scanlines pointer-events-none absolute inset-0" />
      <div className="vignette pointer-events-none absolute inset-0" />
    </div>
  )
}
