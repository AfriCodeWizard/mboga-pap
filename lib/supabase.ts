import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Check if required environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window === 'undefined') {
    // Server-side: log warning but don't crash
    console.warn('Missing Supabase environment variables. Client-side features may not work properly.')
  }
}

if (!supabaseServiceKey) {
  if (typeof window === 'undefined') {
    // Server-side: log warning but don't crash
    console.warn('Missing Supabase service role key. Admin operations may not work properly.')
  }
}

// Create clients with fallbacks for build time
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Service role client for server-side operations
export const supabaseAdmin = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseServiceKey || 'placeholder-service-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
) 