import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wrsctddishgwflfbnfcx.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indyc2N0ZGRpc2hnd2ZsZmJuZmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1OTY0NTgsImV4cCI6MjA5OTE3MjQ1OH0.-r7Aha9CiPNC-r4ztqNnN3JVsQTdbupBnSuUPW_TKpg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
