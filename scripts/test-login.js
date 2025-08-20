#!/usr/bin/env node

/**
 * Simple Login Test Script
 * Tests the authentication flow with existing users
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

async function testLogin() {
  logHeader('LOGIN FUNCTIONALITY TEST')
  
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
  
  // Test 1: Check if there are any users in the database
  logInfo('Testing database connection and user count...')
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, email, role')
      .limit(5)
    
    if (error) {
      logError(`Database query failed: ${error.message}`)
      return
    }
    
    logSuccess(`Found ${users.length} users in database`)
    if (users.length > 0) {
      logInfo('Sample users:')
      users.forEach(user => {
        log(`  - ${user.email} (${user.role})`, 'blue')
      })
    }
  } catch (error) {
    logError(`Database test failed: ${error.message}`)
    return
  }
  
  // Test 2: Try to authenticate with a test user (if service key available)
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (serviceKey) {
    logInfo('Testing user authentication...')
    try {
      const adminSupabase = createClient(supabaseUrl, serviceKey)
      
      // Create a test user
      const testEmail = `test-login-${Date.now()}@example.com`
      const testPassword = 'TestPassword123!'
      
      const { data: userData, error: createError } = await adminSupabase.auth.admin.createUser({
        email: testEmail,
        password: testPassword,
        email_confirm: true,
        user_metadata: {
          full_name: 'Test Login User',
          role: 'customer'
        }
      })
      
      if (createError) {
        logError(`User creation failed: ${createError.message}`)
      } else {
        logSuccess(`Test user created: ${testEmail}`)
        
        // Create user profile
        const { error: profileError } = await adminSupabase
          .from('users')
          .insert({
            id: userData.user.id,
            email: testEmail,
            full_name: 'Test Login User',
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
        
        // Test login with the created user
        logInfo('Testing login with created user...')
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email: testEmail,
          password: testPassword
        })
        
        if (loginError) {
          logError(`Login failed: ${loginError.message}`)
        } else {
          logSuccess('Login successful!')
          logInfo(`User ID: ${loginData.user.id}`)
          logInfo(`Email: ${loginData.user.email}`)
          
          // Test getting user profile
          const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('role')
            .eq('id', loginData.user.id)
            .single()
          
          if (profileError) {
            logWarning(`Profile fetch failed: ${profileError.message}`)
          } else {
            logSuccess(`User role: ${profile.role}`)
          }
          
          // Sign out
          await supabase.auth.signOut()
          logInfo('User signed out')
        }
        
        // Clean up test user
        await adminSupabase.auth.admin.deleteUser(userData.user.id)
        logInfo('Test user cleaned up')
      }
    } catch (error) {
      logError(`Authentication test failed: ${error.message}`)
    }
  } else {
    logWarning('Service role key not available - skipping authentication test')
  }
  
  // Test 3: Check auth configuration
  logInfo('Checking auth configuration...')
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      logError(`Auth configuration error: ${error.message}`)
    } else {
      logSuccess('Auth configuration is working')
      if (data.session) {
        logInfo('Active session found')
      } else {
        logInfo('No active session (expected)')
      }
    }
  } catch (error) {
    logError(`Auth test failed: ${error.message}`)
  }
  
  // Final Summary
  logHeader('LOGIN TEST COMPLETE')
  logInfo('Next steps for manual testing:')
  logInfo('1. Go to your application login page')
  logInfo('2. Try logging in with existing user credentials')
  logInfo('3. Check if you are redirected to the correct dashboard')
  logInfo('4. Test logout functionality')
  logInfo('5. Test demo user login (customer@demo.com / demo123)')
  
  logWarning('IMPORTANT CHECKS:')
  logWarning('- Ensure your Supabase Auth settings are configured correctly')
  logWarning('- Check that email confirmation is enabled if required')
  logWarning('- Verify Site URL and Redirect URLs in Supabase Auth settings')
  logWarning('- Ensure all database tables exist with correct schemas')
  
  logSuccess('Login functionality test completed!')
}

// Run the test
testLogin().catch(error => {
  logError(`Test failed with error: ${error.message}`)
  process.exit(1)
})
