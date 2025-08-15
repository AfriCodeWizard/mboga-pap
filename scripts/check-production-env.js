#!/usr/bin/env node

/**
 * Production Environment Variables Checker
 * Run this script to verify your production environment variables
 */

console.log('🔍 Checking Production Environment Variables...\n')

// Check if we're in production
const isProduction = process.env.NODE_ENV === 'production'
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
console.log(`Is Production: ${isProduction}\n`)

// Check Supabase variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('📋 Supabase Configuration:')
console.log(`  NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✅ SET' : '❌ MISSING'}`)
if (supabaseUrl) {
  console.log(`    Value: ${supabaseUrl.substring(0, 30)}...`)
}

console.log(`  NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✅ SET' : '❌ MISSING'}`)
if (supabaseAnonKey) {
  console.log(`    Value: ${supabaseAnonKey.substring(0, 30)}...`)
}

console.log(`  SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceKey ? '✅ SET' : '❌ MISSING'}`)
if (supabaseServiceKey) {
  console.log(`    Value: ${supabaseServiceKey.substring(0, 30)}...`)
}

// Check other important variables
const appUrl = process.env.NEXT_PUBLIC_APP_URL
const cronSecret = process.env.CRON_SECRET

console.log('\n📋 Application Configuration:')
console.log(`  NEXT_PUBLIC_APP_URL: ${appUrl ? '✅ SET' : '❌ MISSING'}`)
if (appUrl) console.log(`    Value: ${appUrl}`)

console.log(`  CRON_SECRET: ${cronSecret ? '✅ SET' : '❌ MISSING'}`)

// Summary
console.log('\n📊 Summary:')
const requiredVars = [supabaseUrl, supabaseAnonKey]
const optionalVars = [supabaseServiceKey, appUrl, cronSecret]

const requiredCount = requiredVars.filter(Boolean).length
const optionalCount = optionalVars.filter(Boolean).length

console.log(`  Required Variables: ${requiredCount}/2 ${requiredCount === 2 ? '✅' : '❌'}`)
console.log(`  Optional Variables: ${optionalCount}/3 ${optionalCount > 0 ? '✅' : '⚠️'}`)

if (requiredCount < 2) {
  console.log('\n❌ CRITICAL: Missing required Supabase environment variables!')
  console.log('   This will cause authentication and database operations to fail.')
  console.log('\n🔧 To fix this:')
  console.log('   1. Go to your Vercel project dashboard')
  console.log('   2. Navigate to Settings > Environment Variables')
  console.log('   3. Add the missing variables:')
  console.log('      - NEXT_PUBLIC_SUPABASE_URL')
  console.log('      - NEXT_PUBLIC_SUPABASE_ANON_KEY')
  console.log('   4. Redeploy your application')
} else {
  console.log('\n✅ All required environment variables are set!')
  console.log('   Your application should work properly.')
}

// Additional checks for production
if (isProduction) {
  console.log('\n🚀 Production Deployment Checks:')
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.log('   ❌ Supabase variables missing - authentication will fail')
  } else {
    console.log('   ✅ Supabase variables present - authentication should work')
  }
  
  if (!appUrl) {
    console.log('   ⚠️  APP_URL not set - some redirects may not work properly')
  } else {
    console.log('   ✅ APP_URL set - redirects should work properly')
  }
}

console.log('\n📝 Note: NEXT_PUBLIC_ variables are exposed to the client-side')
console.log('   SUPABASE_SERVICE_ROLE_KEY is server-side only and more secure')
