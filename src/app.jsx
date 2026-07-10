import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { Toaster, toast } from 'sonner'

function App() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [subscribers, setSubscribers] = useState([])
  const [message, setMessage] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  // Check auth on load
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user)
        checkAdmin(data.user.id)
        fetchSubscribers()
      }
    })
  }, [])

  const checkAdmin = async (userId) => {
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .single()
    setIsAdmin(!!data)
  }

  const fetchSubscribers = async () => {
    const { data } = await supabase
      .from('subscribers')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setSubscribers(data)
  }

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    let error
    if (isSignUp) {
      const result = await supabase.auth.signUp({ email, password })
      error = result.error
      if (!error) toast.success('Account created! Please verify your email.')
    } else {
      const result = await supabase.auth.signInWithPassword({ email, password })
      error = result.error
      if (!error) {
        toast.success('Welcome back!')
        setUser(result.data.user)
        checkAdmin(result.data.user.id)
        fetchSubscribers()
      }
    }
    if (error) toast.error(error.message)
    setLoading(false)
  }

  const handleGoogle = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    })
    if (error) toast.error(error.message)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsAdmin(false)
    toast.success('Logged out')
  }

  const handleBroadcast = async () => {
    if (!message.trim()) {
      toast.error('Please enter a message')
      return
    }
    setLoading(true)
    toast.success(`Broadcast sent to ${subscribers.length} subscribers!`)
    setMessage('')
    setLoading(false)
  }

  // If not logged in -> show login
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
        <Toaster />
        <div className="w-full max-w-md border border-red-500/30 bg-black/60 p-8 rounded-lg">
          <h1 className="text-3xl font-bold text-white text-center">
            {isSignUp ? 'JOIN' : 'ACCESS'} <span className="text-red-500">_</span>
          </h1>
          <p className="text-center text-gray-400 text-sm mt-1">
            {isSignUp ? 'Create your account' : 'Sign in to continue'}
          </p>
          <form onSubmit={handleAuth} className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-black/50 border border-white/10 rounded text-white"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-black/50 border border-white/10 rounded text-white"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 hover:bg-red-700 rounded font-bold disabled:opacity-50"
            >
              {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full mt-3 py-3 bg-blue-600 hover:bg-blue-700 rounded font-bold"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full mt-4 text-sm text-gray-400 hover:text-white"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Join"}
          </button>
        </div>
      </div>
    )
  }

  // Logged in but not admin -> show user dashboard
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] p-4">
        <Toaster />
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center border-b border-red-500/20 py-4">
            <h1 className="text-2xl font-bold text-red-500">👋 Hello, {user.email}</h1>
            <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300">
              Logout
            </button>
          </div>
          <div className="mt-8 p-6 border border-red-500/20 rounded-lg bg-black/30">
            <p className="text-gray-400">You are logged in but don't have admin access.</p>
            <p className="text-sm text-gray-500 mt-2">Contact the admin to get access.</p>
          </div>
        </div>
      </div>
    )
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-[#0a0a0f] p-4">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center border-b border-red-500/20 py-4 mb-8">
          <h1 className="text-2xl font-bold text-red-500">⚡ COMMAND CENTER</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{user.email}</span>
            <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300">
              Logout
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Broadcast */}
          <div className="border border-red-500/20 bg-black/30 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">📡 Broadcast</h2>
            <p className="text-sm text-gray-400 mb-4">
              Send to {subscribers.length} subscribers
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full h-32 p-3 bg-black/50 border border-red-500/20 rounded text-white"
            />
            <button
              onClick={handleBroadcast}
              disabled={loading}
              className="w-full mt-4 py-3 bg-red-600 hover:bg-red-700 rounded font-bold"
            >
              {loading ? 'Sending...' : `🚀 Send to ${subscribers.length}`}
            </button>
          </div>

          {/* Subscribers */}
          <div className="border border-red-500/20 bg-black/30 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">👥 Subscribers ({subscribers.length})</h2>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {subscribers.length === 0 ? (
                <p className="text-gray-500">No subscribers yet.</p>
              ) : (
                subscribers.map((sub) => (
                  <div key={sub.id} className="flex justify-between border-b border-gray-800 py-2">
                    <div>
                      <p className="font-medium">{sub.email}</p>
                      <p className="text-sm text-gray-400">
                        {sub.codename || 'Anonymous'} • {sub.phone || 'No phone'}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(sub.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
