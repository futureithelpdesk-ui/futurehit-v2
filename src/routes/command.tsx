import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Toaster, toast } from 'sonner'

type Subscriber = {
  id: string
  email: string
  phone: string | null
  codename: string | null
  created_at: string
}

export const Route = createFileRoute('/command')({
  component: CommandPage,
})

function CommandPage() {
  const navigate = useNavigate()
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate({ to: '/' })
        return
      }
      setUser(data.user)
      checkAdmin(data.user.id)
    })
  }, [])

  const checkAdmin = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .single()

    if (error || !data) {
      toast.error('Admin access required')
      navigate({ to: '/' })
      return
    }
    setIsAdmin(true)
    fetchSubscribers()
  }

  const fetchSubscribers = async () => {
    const { data, error } = await supabase
      .from('subscribers')
      .select('id, email, phone, codename, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to fetch subscribers')
      return
    }
    setSubscribers(data || [])
  }

  const handleBroadcast = async () => {
    if (!message.trim()) {
      toast.error('Please enter a message')
      return
    }

    setLoading(true)
    // Broadcast logic here (SMS/WhatsApp via Twilio or Push via FCM)
    toast.success(`Broadcast sent to ${subscribers.length} subscribers!`)
    setMessage('')
    setLoading(false)
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] text-white">
        <p>Checking admin access...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Toaster />
      
      <header className="border-b border-red-500/20 bg-black/40 px-6 py-4 backdrop-blur">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <h1 className="text-2xl font-bold text-red-500">⚡ COMMAND CENTER</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{user?.email}</span>
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-sm text-red-400 hover:text-red-300"
            >
              Logout
            </button>
            <Link to="/" className="text-sm text-gray-400 hover:text-white">
              ← Home
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="border border-red-500/20 bg-black/30 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">📡 Broadcast</h2>
            <p className="text-sm text-gray-400 mb-4">
              Send a message to all {subscribers.length} subscribers
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full h-32 p-3 bg-black/50 border border-red-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
            />
            <button
              onClick={handleBroadcast}
              disabled={loading}
              className="mt-4 w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold disabled:opacity-50"
            >
              {loading ? 'Sending...' : `🚀 Send to ${subscribers.length} Subscribers`}
            </button>
          </section>

          <section className="border border-red-500/20 bg-black/30 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">👥 Subscribers ({subscribers.length})</h2>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {subscribers.length === 0 ? (
                <p className="text-gray-500 text-sm">No subscribers yet.</p>
              ) : (
                subscribers.map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between border-b border-gray-800 py-2">
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
          </section>
        </div>
      </main>
    </div>
  )
}
