#!/usr/bin/env node

// Build script that checks environment variables first
require('dotenv').config({ path: '.env.local' })

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
]

console.log('🔍 Checking environment variables before build...\n')

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

if (!allGood) {
  console.log('\n⚠️  Build cannot proceed - missing environment variables!')
  console.log('Please check your .env.local file and ensure all required variables are set.')
  process.exit(1)
}

console.log('\n🎉 Environment variables are set! Proceeding with build...\n')

// Run the actual build command
const { execSync } = require('child_process')
try {
  execSync('next build', { stdio: 'inherit' })
  console.log('\n✅ Build completed successfully!')
} catch (error) {
  console.error('\n❌ Build failed!')
  process.exit(1)
} 