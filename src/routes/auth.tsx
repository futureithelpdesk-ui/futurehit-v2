import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

createFileRoute
export default function Auth()

export const Route = createFileRoute('/auth')({
  component: AuthPage,
})

function AuthPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      toast.error('Login failed: ' + error.message)
      return
    }
    toast.success('Welcome back!')
    navigate({ to: '/' })
  }

  const handleGoogle = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/' },
    })
    if (error) {
      setLoading(false)
      toast.error('Google sign-in failed: ' + error.message)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#04050a] px-6">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.15),transparent_60%)]" />
      
      <form onSubmit={handleLogin} className="relative z-10 w-full max-w-md border border-red-500/30 bg-black/60 p-8 backdrop-blur-sm">
        <h1 className="font-display text-3xl font-black uppercase text-white">
          ACCESS<span className="text-red-500">_</span>
        </h1>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.4em] text-red-400/70">
          restricted :: ops_console
        </p>
        
        <div className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b-2 border-white/20 bg-transparent px-2 py-3 font-mono text-white focus:border-red-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b-2 border-white/20 bg-transparent px-2 py-3 font-mono text-white focus:border-red-500 focus:outline-none"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full border-2 border-red-500/60 bg-red-500/10 py-3 font-display text-sm uppercase tracking-[0.3em] text-red-300 hover:bg-red-500/20 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        
        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="mt-3 w-full border border-white/30 py-3 font-mono text-xs uppercase tracking-[0.3em] text-white hover:bg-white/10 disabled:opacity-50"
        >
          Sign in with Google
        </button>
        
        <Link to="/" className="mt-6 block text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white">
          ← back home
        </Link>
      </form>
    </div>
  )
}
