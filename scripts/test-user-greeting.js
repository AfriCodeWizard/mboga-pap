#!/usr/bin/env node

/**
 * Test User Greeting Script
 * Tests the user greeting functionality in the dashboard
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

// Helper function to get user's first name (same as in dashboard)
function getUserFirstName(user) {
  if (!user) return 'there';
  
  // Try to get first name from user metadata
  const fullName = user.user_metadata?.full_name || user.user_metadata?.name || '';
  if (fullName) {
    const firstName = fullName.split(' ')[0];
    return firstName;
  }
  
  // Fallback to email prefix
  const email = user.email || '';
  if (email) {
    const emailPrefix = email.split('@')[0];
    return emailPrefix;
  }
  
  return 'there';
}

async function testUserGreeting() {
  logHeader('TEST USER GREETING FUNCTIONALITY')
  
  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !serviceKey) {
    logError('Missing Supabase environment variables')
    logInfo('Please check your .env.local file')
    return
  }
  
  logSuccess('Environment variables found')
  
  // Create admin Supabase client
  const adminSupabase = createClient(supabaseUrl, serviceKey)
  logSuccess('Admin Supabase client created')
  
  try {
    // Get all users
    logInfo('Fetching all users...')
    const { data: users, error } = await adminSupabase.auth.admin.listUsers()
    
    if (error) {
      logError(`Failed to fetch users: ${error.message}`)
      return
    }
    
    logSuccess(`Found ${users.users.length} users`)
    
    // Test greeting for each user
    logInfo('\nTesting user greetings:')
    users.users.forEach((user, index) => {
      const firstName = getUserFirstName(user)
      const email = user.email || 'No email'
      const fullName = user.user_metadata?.full_name || user.user_metadata?.name || 'No name'
      
      logInfo(`User ${index + 1}:`)
      logInfo(`  Email: ${email}`)
      logInfo(`  Full Name: ${fullName}`)
      logInfo(`  First Name: ${firstName}`)
      logInfo(`  Greeting: "Welcome back, ${firstName}!"`)
      logInfo('')
    })
    
    // Test specific user if provided
    const testEmail = process.argv[2]
    if (testEmail) {
      logInfo(`\nTesting specific user: ${testEmail}`)
      const testUser = users.users.find(user => user.email === testEmail)
      
      if (testUser) {
        const firstName = getUserFirstName(testUser)
        logSuccess(`Found user: ${testUser.user_metadata?.full_name || testUser.email}`)
        logSuccess(`Greeting: "Welcome back, ${firstName}!"`)
      } else {
        logWarning(`User with email ${testEmail} not found`)
      }
    }
    
    logInfo('\nGreeting logic test cases:')
    
    // Test case 1: User with full name
    const testUser1 = {
      email: 'john.doe@example.com',
      user_metadata: { full_name: 'John Doe' }
    }
    const firstName1 = getUserFirstName(testUser1)
    logInfo(`Test 1 - Full name "John Doe": ${firstName1}`)
    
    // Test case 2: User with only email
    const testUser2 = {
      email: 'jane.smith@example.com',
      user_metadata: {}
    }
    const firstName2 = getUserFirstName(testUser2)
    logInfo(`Test 2 - Email only "jane.smith@example.com": ${firstName2}`)
    
    // Test case 3: User with no data
    const testUser3 = null
    const firstName3 = getUserFirstName(testUser3)
    logInfo(`Test 3 - No user data: ${firstName3}`)
    
    // Test case 4: User with name in different field
    const testUser4 = {
      email: 'peter@example.com',
      user_metadata: { name: 'Peter Johnson' }
    }
    const firstName4 = getUserFirstName(testUser4)
    logInfo(`Test 4 - Name field "Peter Johnson": ${firstName4}`)
    
  } catch (error) {
    logError(`Script failed: ${error.message}`)
  }
  
  logSuccess('\nUser greeting test completed!')
}

// Run the test
testUserGreeting().catch(error => {
  logError(`Script failed with error: ${error.message}`)
  process.exit(1)
})
