import { useState } from 'react'
import { supabase } from './lib/supabase'
import { Toaster, toast } from 'sonner'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      toast.error('Login failed: ' + error.message)
      return
    }
    setUser(data.user)
    toast.success('Welcome back!')
  }

  const handleGoogle = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    })
    setLoading(false)
    if (error) toast.error('Google login failed: ' + error.message)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    toast.success('Logged out')
  }

  if (user) {
    return (
      <div className="container">
        <h1>🔥 FUTURE HELPDESK</h1>
        <p>Welcome, {user.email}!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>🔥 FUTURE HELPDESK</h1>
      <p>Login to access the console</p>
      
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      
      <button onClick={handleGoogle} disabled={loading}>
        Sign in with Google
      </button>
      
      <Toaster />
    </div>
  )
}

export default App
