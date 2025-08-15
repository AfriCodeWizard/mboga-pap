import { NextResponse } from 'next/server'

export async function GET() {
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT_SET',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT_SET',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT_SET',
    NODE_ENV: process.env.NODE_ENV || 'NOT_SET',
    // Check if the .env.local file is being read
    hasEnvLocal: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'YES' : 'NO'
  }
  
  return NextResponse.json({
    message: 'Environment variables test',
    envVars,
    timestamp: new Date().toISOString()
  })
}


