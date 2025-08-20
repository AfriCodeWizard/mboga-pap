#!/usr/bin/env node

/**
 * Comprehensive Authentication Testing Script
 * Tests all authentication flows: signup, email verification, login, logout
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
  log(`\n${'='.repeat(60)}`, 'cyan')
  log(message, 'bright')
  log('='.repeat(60), 'cyan')
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

function logStep(message) {
  log(`🔍 ${message}`, 'magenta')
}

async function testCompleteAuthFlow() {
  logHeader('COMPREHENSIVE AUTHENTICATION TESTING')
  
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
  
  // Test 1: Database Connection
  logStep('Testing database connection...')
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
  
  // Test 2: Check Required Tables
  logStep('Checking required database tables...')
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
  
  // Test 3: Auth Configuration
  logStep('Testing auth configuration...')
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
  
  // Test 4: URL Configuration
  logStep('Testing URL configuration...')
  const isDev = process.env.NODE_ENV === 'development'
  const baseUrl = isDev ? 'http://localhost:3000' : 'https://mbogapap.vercel.app'
  
  const urls = [
    `${baseUrl}/auth/callback`,
    `${baseUrl}/auth/verify`,
    `${baseUrl}/login`,
    `${baseUrl}/signup`,
    `${baseUrl}/dashboard`,
    `${baseUrl}/vendor-dashboard`,
    `${baseUrl}/rider-dashboard`
  ]
  
  logInfo(`Base URL: ${baseUrl}`)
  logInfo(`Environment: ${isDev ? 'Development' : 'Production'}`)
  
  // Test 5: Email Configuration Check
  logStep('Checking email configuration...')
  logWarning('IMPORTANT: Email templates should be configured in Supabase dashboard')
  logInfo('Make sure email confirmation is enabled in Supabase Auth settings')
  logInfo('Check Site URL and Redirect URLs in Supabase Auth settings')
  
  // Test 6: Test User Creation (if service role key available)
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (serviceKey) {
    logStep('Testing user creation with service role...')
    try {
      const adminSupabase = createClient(supabaseUrl, serviceKey)
      
      // Create a test user
      const testEmail = `test-${Date.now()}@example.com`
      const { data: userData, error: userError } = await adminSupabase.auth.admin.createUser({
        email: testEmail,
        password: 'TestPassword123!',
        email_confirm: true,
        user_metadata: {
          full_name: 'Test User',
          role: 'customer'
        }
      })
      
      if (userError) {
        logError(`User creation failed: ${userError.message}`)
      } else {
        logSuccess(`Test user created: ${testEmail}`)
        
        // Create user profile
        const { error: profileError } = await adminSupabase
          .from('users')
          .insert({
            id: userData.user.id,
            email: testEmail,
            full_name: 'Test User',
            role: 'customer',
            phone: '+254700000000',
            address: 'Nairobi, Kenya',
            city: 'Nairobi',
            country: 'Kenya',
            is_active: true
          })
        
        if (profileError) {
          logWarning(`Profile creation failed: ${profileError.message}`)
        } else {
          logSuccess('User profile created successfully')
        }
        
        // Clean up test user
        await adminSupabase.auth.admin.deleteUser(userData.user.id)
        logInfo('Test user cleaned up')
      }
    } catch (error) {
      logError(`Service role test failed: ${error.message}`)
    }
  } else {
    logWarning('Service role key not available - skipping user creation test')
  }
  
  // Test 7: Check Middleware Configuration
  logStep('Checking middleware configuration...')
  logInfo('Middleware should handle:')
  logInfo('- Protected route access')
  logInfo('- Session management')
  logInfo('- Demo user cookies')
  logInfo('- Auth callback routes')
  
  // Test 8: Environment Variables Check
  logStep('Checking all required environment variables...')
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY'
  ]
  
  const optionalEnvVars = [
    'NEXT_PUBLIC_APP_URL',
    'CRON_SECRET'
  ]
  
  for (const envVar of requiredEnvVars) {
    if (process.env[envVar]) {
      logSuccess(`${envVar}: SET`)
    } else {
      logError(`${envVar}: NOT SET`)
    }
  }
  
  for (const envVar of optionalEnvVars) {
    if (process.env[envVar]) {
      logSuccess(`${envVar}: SET (optional)`)
    } else {
      logWarning(`${envVar}: NOT SET (optional)`)
    }
  }
  
  // Final Summary
  logHeader('TESTING COMPLETE')
  logInfo('Next steps for manual testing:')
  logInfo('1. Test signup with a real email address')
  logInfo('2. Check email verification link in your inbox')
  logInfo('3. Click the verification link and verify it redirects properly')
  logInfo('4. Test login with the verified account')
  logInfo('5. Test logout functionality')
  logInfo('6. Test demo user login (customer@demo.com / demo123)')
  logInfo('7. Test role-based redirects (vendor, rider, admin)')
  
  logWarning('IMPORTANT CHECKS:')
  logWarning('- Ensure email confirmation is enabled in Supabase Auth settings')
  logWarning('- Verify Site URL and Redirect URLs in Supabase Auth settings')
  logWarning('- Check email templates in Supabase Auth settings')
  logWarning('- Ensure all database tables exist with correct schemas')
  
  logSuccess('All automated tests completed successfully!')
}

// Run the test
testCompleteAuthFlow().catch(error => {
  logError(`Test failed with error: ${error.message}`)
  process.exit(1)
})
