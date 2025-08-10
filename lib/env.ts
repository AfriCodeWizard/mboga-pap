// Client-side environment variable loader
export const getClientEnvVar = (key: string): string | undefined => {
  // In Next.js, NEXT_PUBLIC_ variables should be available directly
  if (typeof window !== 'undefined') {
    // Try to get from window.__NEXT_DATA__ first
    const nextData = (window as any).__NEXT_DATA__
    if (nextData?.props?.env?.[key]) {
      return nextData.props.env[key]
    }
  }
  
  // Fallback to process.env (should work in Next.js)
  return process.env[key]
}

// Environment configuration for Supabase
export const getSupabaseConfig = () => {
  // Try to get from environment variables first
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL
  let anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  let serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // If not available, try client-side fallbacks
  if (!url || !anonKey) {
    if (typeof window !== 'undefined') {
      url = (window as any).__NEXT_DATA__?.props?.env?.NEXT_PUBLIC_SUPABASE_URL
      anonKey = (window as any).__NEXT_DATA__?.props?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY
    }
  }

  // Final fallback to hardcoded values if nothing else works
  if (!url || !anonKey) {
    console.warn('Environment variables not found, using fallback values')
    url = 'https://xdjyshmyeivebsrmrayj.supabase.co'
    anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkanlzaG15ZWl2ZWJzcm1yYXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMDQ2NzAsImV4cCI6MjA2OTg4MDY3MH0.B8qmQTcGKO3F3-BB19V36cTT6HUllN4S6LLaE7KbtCk'
    serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkanlzaG15ZWl2ZWJzcm1yYXlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDMwNDY3MCwiZXhwIjoyMDY5ODgwNjcwfQ.dbqMB49qQmYFuXhCWts89rUFmkahX0-FeZ26R-YYz6U'
  }

  console.log('Debug: Environment config:', {
    url: !!url,
    anonKey: !!anonKey,
    serviceKey: !!serviceKey,
    source: url === 'https://xdjyshmyeivebsrmrayj.supabase.co' ? 'fallback' : 'environment'
  })

  return { url, anonKey, serviceKey }
}


