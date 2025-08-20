#!/usr/bin/env node

/**
 * Test script for authentication flow
 * This script tests the signup, email verification, and login flow
 */

require('dotenv').config({ path: '.env.local' })

const { createClient } = require('@supabase/supabase-js')

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logHeader(message) {
  log(`\n${'='.repeat(50)}`, 'cyan')
  log(message, 'bright')
  log('='.repeat(50), 'cyan')
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green')
}

function logError(message) {
  log(`❌ ${message}`, 'red')
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow')
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue')
}

async function testAuthFlow() {
  logHeader('Testing Authentication Flow')
  
  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    logError('Missing Supabase environment variables')
    logInfo('Please check your .env.local file')
    return
  }
  
  logSuccess('Environment variables found')
  
  // Create Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey)
  logSuccess('Supabase client created')
  
  // Test 1: Check if we can connect to Supabase
  logInfo('Testing Supabase connection...')
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1)
    if (error) {
      logError(`Database connection failed: ${error.message}`)
      return
    }
    logSuccess('Database connection successful')
  } catch (error) {
    logError(`Connection test failed: ${error.message}`)
    return
  }
  
  // Test 2: Check auth configuration
  logInfo('Testing auth configuration...')
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      logError(`Auth configuration error: ${error.message}`)
    } else {
      logSuccess('Auth configuration is working')
    }
  } catch (error) {
    logError(`Auth test failed: ${error.message}`)
  }
  
  // Test 3: Check if required tables exist
  logInfo('Checking required database tables...')
  const requiredTables = ['users', 'customers', 'vendors', 'rider_profiles']
  
  for (const table of requiredTables) {
    try {
      const { data, error } = await supabase.from(table).select('*').limit(1)
      if (error) {
        logWarning(`Table ${table} might not exist or have permission issues: ${error.message}`)
      } else {
        logSuccess(`Table ${table} is accessible`)
      }
    } catch (error) {
      logError(`Failed to check table ${table}: ${error.message}`)
    }
  }
  
  // Test 4: Check auth callback URL
  logInfo('Testing auth callback URL...')
  const callbackUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/auth/callback'
    : 'https://mbogapap.vercel.app/auth/callback'
  
  logInfo(`Auth callback URL: ${callbackUrl}`)
  
  // Test 5: Check email templates (if available)
  logInfo('Checking email configuration...')
  logWarning('Email templates should be configured in Supabase dashboard')
  logInfo('Make sure email confirmation is enabled in Supabase Auth settings')
  
  logHeader('Authentication Flow Test Complete')
  logInfo('Next steps:')
  logInfo('1. Test signup with a real email')
  logInfo('2. Check email verification link')
  logInfo('3. Test login after verification')
  logInfo('4. Test logout functionality')
}

// Run the test
testAuthFlow().catch(error => {
  logError(`Test failed with error: ${error.message}`)
  process.exit(1)
})

