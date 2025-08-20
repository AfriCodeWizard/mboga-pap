import { createBrowserClient } from '@supabase/ssr'
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

// Singleton getter functions (client-side only)
export const getSupabaseClient = () => {
  // Client-side: use singleton
  if (!supabaseClient) {
    supabaseClient = createSupabaseClient()
  }
  
  return supabaseClient
}

export const getAdminClient = () => {
  // Client-side: use singleton
  if (!supabaseAdminClient) {
    supabaseAdminClient = createSupabaseAdminClient()
  }
  
  return supabaseAdminClient
}

// Clean exports for direct use (client-side only)
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