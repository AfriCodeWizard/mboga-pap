import { createClient } from '@supabase/supabase-js'
import { getSupabaseConfig } from './env'

// Global variables to store the singleton instances
let supabaseClient: ReturnType<typeof createClient> | null = null
let supabaseAdminClient: ReturnType<typeof createClient> | null = null

// Create a proper singleton pattern
const createSupabaseClient = () => {
  const config = getSupabaseConfig()
  
  if (!config.url || !config.anonKey) {
    console.warn('Supabase environment variables not available yet.')
    return null
  }
  
  try {
    console.log('Debug: Creating Supabase client with:', { 
      url: config.url.substring(0, 20) + '...', 
      anonKey: config.anonKey.substring(0, 20) + '...' 
    })
    
    return createClient(config.url, config.anonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      }
    })
  } catch (error) {
    console.error('Error creating Supabase client:', error)
    return null
  }
}

const createSupabaseAdminClient = () => {
  const config = getSupabaseConfig()
  
  if (!config.url || !config.serviceKey) {
    console.warn('Missing Supabase service role key.')
    return null
  }
  
  try {
    return createClient(config.url, config.serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  } catch (error) {
    console.error('Error creating Supabase admin client:', error)
    return null
  }
}

// Singleton getter functions
export const getSupabaseClient = () => {
  if (typeof window === 'undefined') {
    // Server-side: always create new instance
    return createSupabaseClient()
  }
  
  // Client-side: use singleton
  if (!supabaseClient) {
    supabaseClient = createSupabaseClient()
  }
  
  return supabaseClient
}

export const getAdminClient = () => {
  if (typeof window === 'undefined') {
    // Server-side: always create new instance
    return createSupabaseAdminClient()
  }
  
  // Client-side: use singleton
  if (!supabaseAdminClient) {
    supabaseAdminClient = createSupabaseAdminClient()
  }
  
  return supabaseAdminClient
}

// Clean exports for direct use
export const supabase = getSupabaseClient()
export const supabaseAdmin = getAdminClient()

// Helper functions
export const isAdminAvailable = () => !!getAdminClient()
export const isClientAvailable = () => !!getSupabaseClient()

// Function to reset clients (useful for testing or re-initialization)
export const resetClients = () => {
  supabaseClient = null
  supabaseAdminClient = null
} 