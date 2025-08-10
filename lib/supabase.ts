import { createClient } from '@supabase/supabase-js'
import { getSupabaseConfig } from './env'

// Function to create Supabase client with retry logic
const createSupabaseClient = (): any => {
  const config = getSupabaseConfig()
  
  if (!config.url || !config.anonKey) {
    console.warn('Supabase environment variables not available yet. Client will be created when needed.', {
      url: !!config.url,
      anonKey: !!config.anonKey
    })
    return null
  }
  
  try {
    console.log('Debug: Creating Supabase client with:', { url: config.url.substring(0, 20) + '...', anonKey: config.anonKey.substring(0, 20) + '...' })
    return createClient(config.url, config.anonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
        redirectTo: 'https://mbogapap.vercel.app/dashboard'
      }
    })
  } catch (error) {
    console.error('Error creating Supabase client:', error)
    return null
  }
}

// Function to create admin client
const createAdminClient = (): any => {
  const config = getSupabaseConfig()
  
  if (!config.url || !config.serviceKey) {
    console.warn('Missing Supabase service role key. Admin operations may not work properly.')
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

// Lazy client creation - only create when accessed
let _supabase: any = null
let _supabaseAdmin: any = null

// Getter for supabase client
export const getSupabaseClient = (): any => {
  if (!_supabase) {
    _supabase = createSupabaseClient()
  }
  
  if (!_supabase) {
    console.warn('Supabase client not available. Please check your environment variables.')
    // Try to create a new client as a fallback
    _supabase = createSupabaseClient()
    if (!_supabase) {
      return null
    }
  }
  
  return _supabase
}

// Getter for admin client
export const getAdminClient = (): any => {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createAdminClient()
  }
  
  if (!_supabaseAdmin) {
    console.warn('Supabase admin client not available. Please check your environment variables.')
    return null
  }
  
  return _supabaseAdmin
}

// Legacy exports for backward compatibility (but now lazy)
export const supabase = new Proxy({}, {
  get(target, prop) {
    const client = getSupabaseClient()
    if (!client) {
      console.warn('Supabase client not available. Please check your environment variables.')
      return () => Promise.reject(new Error('Supabase client not available'))
    }
    return client[prop]
  }
})

export const supabaseAdmin = new Proxy({}, {
  get(target, prop) {
    const client = getAdminClient()
    if (!client) {
      console.warn('Supabase admin client not available. Please check your environment variables.')
      return () => Promise.reject(new Error('Supabase admin client not available'))
    }
    return client[prop]
  }
})

// Helper function to check if admin client is available
export const isAdminAvailable = () => !!getAdminClient()

// Helper function to check if regular client is available
export const isClientAvailable = () => !!getSupabaseClient()

// Function to initialize clients (useful for retrying)
export const initializeClients = () => {
  const newSupabase = createSupabaseClient()
  const newSupabaseAdmin = createAdminClient()
  
  if (newSupabase) {
    _supabase = newSupabase
  }
  if (newSupabaseAdmin) {
    _supabaseAdmin = newSupabaseAdmin
  }
  
  return { supabase: _supabase, supabaseAdmin: _supabaseAdmin }
} 