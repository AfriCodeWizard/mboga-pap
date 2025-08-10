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
  // TEMPORARY: Hardcode values to test if client creation works
  const url = 'https://xdjyshmyeivebsrmrayj.supabase.co'
  const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkanlzaG15ZWl2ZWJzcm1yYXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMDQ2NzAsImV4cCI6MjA2OTg4MDY3MH0.B8qmQTcGKO3F3-BB19V36cTT6HUllN4S6LLaE7KbtCk'
  const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkanlzaG15ZWl2ZWJzcm1yYXlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDMwNDY3MCwiZXhwIjoyMDY5ODgwNjcwfQ.dbqMB49qQmYFuXhCWts89rUFmkahX0-FeZ26R-YYz6U'

  console.log('Debug: Environment config (HARDCODED):', {
    url: !!url,
    anonKey: !!anonKey,
    serviceKey: !!serviceKey
  })

  return { url, anonKey, serviceKey }
}


