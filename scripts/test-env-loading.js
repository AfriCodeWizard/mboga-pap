#!/usr/bin/env node

/**
 * Test script to verify environment variable loading
 */

require('dotenv').config({ path: '.env.local' })

console.log('=== Environment Variable Test ===')
console.log('')

console.log('Direct process.env access:')
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT_SET')
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT_SET')
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT_SET')
console.log('')

console.log('Values (first 50 chars):')
console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 50) || 'NOT_SET')
console.log('ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 50) || 'NOT_SET')
console.log('SERVICE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 50) || 'NOT_SET')
console.log('')

console.log('Current working directory:', process.cwd())
console.log('.env.local exists:', require('fs').existsSync('.env.local'))
console.log('')

if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.log('✅ Environment variables are loaded correctly!')
} else {
  console.log('❌ Environment variables are NOT loaded correctly!')
  console.log('')
  console.log('Troubleshooting:')
  console.log('1. Make sure .env.local file exists in project root')
  console.log('2. Make sure .env.local has correct variable names')
  console.log('3. Try restarting the development server')
  console.log('4. Check for any typos in variable names')
}


