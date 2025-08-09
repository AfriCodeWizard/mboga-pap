#!/usr/bin/env node

// Simple script to check environment variables
require('dotenv').config({ path: '.env.local' })

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
]

console.log('🔍 Checking environment variables...\n')

let allGood = true

requiredVars.forEach(varName => {
  const value = process.env[varName]
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`)
  } else {
    console.log(`❌ ${varName}: MISSING`)
    allGood = false
  }
})

console.log('\n' + (allGood ? '🎉 All environment variables are set!' : '⚠️  Some environment variables are missing!'))

if (!allGood) {
  console.log('\nPlease check your .env.local file and ensure all required variables are set.')
  process.exit(1)
} 