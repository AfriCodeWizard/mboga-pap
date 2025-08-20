import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabaseConfig } from './env'

// Server-side Supabase client for API routes and Server Components
export const createServerSupabaseClient = () => {
  const cookieStore = cookies()
  const config = getSupabaseConfig()
  
  if (!config.url || !config.anonKey) {
    console.warn('Supabase environment variables not available.')
    return null
  }
  
  try {
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
  } catch (error) {
    console.error('Error creating server Supabase client:', error)
    return null
  }
}

// Server-side admin client for API routes
export const createServerAdminClient = () => {
  const cookieStore = cookies()
  const config = getSupabaseConfig()
  
  if (!config.url || !config.serviceKey) {
    console.warn('Missing Supabase service role key.')
    return null
  }
  
  try {
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
  } catch (error) {
    console.error('Error creating server admin client:', error)
    return null
  }
}

// Helper functions
export const getServerSupabaseClient = () => createServerSupabaseClient()
export const getServerAdminClient = () => createServerAdminClient()
