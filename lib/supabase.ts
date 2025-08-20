import { createBrowserClient } from '@supabase/ssr'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabaseConfig } from './env'

// Global variables to store the singleton instances
let supabaseClient: ReturnType<typeof createBrowserClient> | null = null
let supabaseAdminClient: ReturnType<typeof createBrowserClient> | null = null

// Create browser client (for client-side)
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
    
    return createBrowserClient(config.url, config.anonKey)
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
    return createBrowserClient(config.url, config.serviceKey)
  } catch (error) {
    console.error('Error creating Supabase admin client:', error)
    return null
  }
}

// Singleton getter functions
export const getSupabaseClient = () => {
  if (typeof window === 'undefined') {
    // Server-side: create server client
    const cookieStore = cookies()
    const config = getSupabaseConfig()
    
    if (!config.url || !config.anonKey) {
      return null
    }
    
    return createServerClient(config.url, config.anonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    })
  }
  
  // Client-side: use singleton
  if (!supabaseClient) {
    supabaseClient = createSupabaseClient()
  }
  
  return supabaseClient
}

export const getAdminClient = () => {
  if (typeof window === 'undefined') {
    // Server-side: create server client with service key
    const cookieStore = cookies()
    const config = getSupabaseConfig()
    
    if (!config.url || !config.serviceKey) {
      return null
    }
    
    return createServerClient(config.url, config.serviceKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    })
  }
  
  // Client-side: use singleton
  if (!supabaseAdminClient) {
    supabaseAdminClient = createSupabaseAdminClient()
  }
  
  return supabaseAdminClient
}

// Clean exports for direct use (only for client-side)
export const supabase = typeof window !== 'undefined' ? getSupabaseClient() : null
export const supabaseAdmin = typeof window !== 'undefined' ? getAdminClient() : null

// Helper functions
export const isAdminAvailable = () => !!getAdminClient()
export const isClientAvailable = () => !!getSupabaseClient()

// Function to reset clients (useful for testing or re-initialization)
export const resetClients = () => {
  supabaseClient = null
  supabaseAdminClient = null
} 