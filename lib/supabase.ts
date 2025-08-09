import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Check if required environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing required Supabase environment variables:')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓ Set' : '✗ Missing')
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✓ Set' : '✗ Missing')
  
  if (typeof window !== 'undefined') {
    // Client-side: throw error to prevent silent failures
    throw new Error('Supabase configuration is missing. Please check your environment variables.')
  }
}

if (!supabaseServiceKey) {
  console.warn('Missing Supabase service role key. Admin operations may not work properly.')
}

// Create clients - only create if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
) : null

// Service role client for server-side operations
export const supabaseAdmin = supabaseUrl && supabaseServiceKey ? createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
) : null

// Helper function to check if admin client is available
export const isAdminAvailable = () => !!supabaseAdmin

// Helper function to check if regular client is available
export const isClientAvailable = () => !!supabase 