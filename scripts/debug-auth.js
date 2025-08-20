#!/usr/bin/env node

/**
 * Authentication Debug Script
 * Tests the complete authentication flow and identifies issues
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

async function debugAuthFlow() {
  logHeader('AUTHENTICATION DEBUG SCRIPT')
  
  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    logError('Missing Supabase environment variables')
    logInfo('Please check your .env.local file')
    return
  }
  
  logSuccess('Environment variables found')
  
  // Create Supabase clients
  const supabase = createClient(supabaseUrl, supabaseKey)
  const adminSupabase = serviceKey ? createClient(supabaseUrl, serviceKey) : null
  
  logSuccess('Supabase clients created')
  
  // Test 1: Check existing users and their roles
  logStep('Testing existing users and role assignment...')
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, email, role, created_at')
      .order('created_at', { ascending: false })
      .limit(10)
    
    if (error) {
      logError(`Failed to fetch users: ${error.message}`)
    } else {
      logSuccess(`Found ${users.length} users in database`)
      if (users.length > 0) {
        logInfo('Recent users:')
        users.forEach(user => {
          log(`  - ${user.email} (${user.role}) - ${user.created_at}`, 'blue')
        })
      }
    }
  } catch (error) {
    logError(`User fetch failed: ${error.message}`)
  }
  
  // Test 2: Check role-specific tables
  logStep('Testing role-specific table access...')
  const roleTables = ['customers', 'vendors', 'rider_profiles']
  
  for (const table of roleTables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(3)
      
      if (error) {
        logWarning(`Table ${table} access failed: ${error.message}`)
      } else {
        logSuccess(`Table ${table}: ${data.length} records`)
      }
    } catch (error) {
      logError(`Table ${table} test failed: ${error.message}`)
    }
  }
  
  // Test 3: Create test user with specific role (if service key available)
  if (adminSupabase) {
    logStep('Testing user creation with role assignment...')
    try {
      const testEmail = `test-rider-${Date.now()}@example.com`
      const testPassword = 'TestPassword123!'
      
      // Create user with rider role
      const { data: userData, error: createError } = await adminSupabase.auth.admin.createUser({
        email: testEmail,
        password: testPassword,
        email_confirm: true,
        user_metadata: {
          full_name: 'Test Rider User',
          role: 'rider',
          vehicle_type: 'motorcycle',
          license_number: 'TEST123'
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
            full_name: 'Test Rider User',
            role: 'rider',
            phone: '+254700000000',
            address: 'Nairobi, Kenya',
            city: 'Nairobi',
            country: 'Kenya',
            is_active: true
          })
        
        if (profileError) {
          logError(`Profile creation failed: ${profileError.message}`)
        } else {
          logSuccess('User profile created with rider role')
        }
        
        // Create rider profile
        const { error: riderError } = await adminSupabase
          .from('rider_profiles')
          .insert({
            user_id: userData.user.id,
            vehicle_type: 'motorcycle',
            vehicle_number: 'TEST123',
            is_available: true,
            rating: 0,
            total_deliveries: 0
          })
        
        if (riderError) {
          logError(`Rider profile creation failed: ${riderError.message}`)
        } else {
          logSuccess('Rider profile created successfully')
        }
        
        // Test login with the created user
        logStep('Testing login with created rider user...')
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
          logInfo(`Metadata role: ${loginData.user.user_metadata?.role}`)
          
          // Check user profile
          const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('role')
            .eq('id', loginData.user.id)
            .single()
          
          if (profileError) {
            logError(`Profile fetch failed: ${profileError.message}`)
          } else {
            logSuccess(`Database role: ${profile.role}`)
            
            if (profile.role === 'rider') {
              logSuccess('✅ Role assignment is working correctly!')
            } else {
              logError(`❌ Role mismatch! Expected: rider, Got: ${profile.role}`)
            }
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
      logError(`User creation test failed: ${error.message}`)
    }
  } else {
    logWarning('Service role key not available - skipping user creation test')
  }
  
  // Test 4: Check auth configuration
  logStep('Testing auth configuration...')
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
  
  // Test 5: Check URL configuration
  logStep('Testing URL configuration...')
  const isDev = process.env.NODE_ENV === 'development'
  const baseUrl = isDev ? 'http://localhost:3000' : 'https://mbogapap.vercel.app'
  
  logInfo(`Environment: ${isDev ? 'Development' : 'Production'}`)
  logInfo(`Base URL: ${baseUrl}`)
  logInfo(`Auth callback URL: ${baseUrl}/auth/callback`)
  
  // Final Summary
  logHeader('DEBUG COMPLETE')
  logInfo('Issues to check:')
  logInfo('1. Verify Supabase Auth settings in dashboard')
  logInfo('2. Check Site URL and Redirect URLs')
  logInfo('3. Ensure email confirmation is enabled')
  logInfo('4. Verify database tables exist with correct schemas')
  logInfo('5. Check RLS policies for role-specific tables')
  
  logWarning('Common issues:')
  logWarning('- Role not being saved in user_metadata during signup')
  logWarning('- Auth callback not receiving role parameter')
  logWarning('- Database constraints preventing role-specific profile creation')
  logWarning('- Session cookies not being cleared properly')
  
  logSuccess('Debug script completed!')
}

// Run the debug
debugAuthFlow().catch(error => {
  logError(`Debug failed with error: ${error.message}`)
  process.exit(1)
})
