#!/usr/bin/env node

/**
 * Fix Existing Users Script
 * Helps fix users who have localhost URLs in their verification emails
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

async function fixExistingUsers() {
  logHeader('FIX EXISTING USERS WITH LOCALHOST URLS')
  
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
    
    // Filter users who need email confirmation
    const unconfirmedUsers = users.users.filter(user => !user.email_confirmed_at)
    
    if (unconfirmedUsers.length === 0) {
      logInfo('No users need email confirmation')
      return
    }
    
    logInfo(`Found ${unconfirmedUsers.length} users who need email confirmation`)
    
    // Show users who need confirmation
    logInfo('\nUsers needing email confirmation:')
    unconfirmedUsers.forEach(user => {
      log(`  - ${user.email} (${user.user_metadata?.role || 'unknown role'})`, 'blue')
    })
    
    // Ask for confirmation
    logWarning('\n⚠️  WARNING: This will resend confirmation emails to all unconfirmed users!')
    logInfo('This will override any existing confirmation emails.')
    
    // For now, just show what would be done
    logInfo('\nTo fix these users, you can:')
    logInfo('1. Update Supabase Auth settings (recommended)')
    logInfo('2. Manually resend confirmation emails')
    logInfo('3. Use the admin panel to confirm users manually')
    
    // Option to resend emails (commented out for safety)
    /*
    logInfo('\nWould you like to resend confirmation emails? (y/N)')
    // In a real implementation, you would prompt for confirmation here
    
    for (const user of unconfirmedUsers) {
      try {
        const { error: resendError } = await adminSupabase.auth.admin.resend({
          type: 'signup',
          email: user.email
        })
        
        if (resendError) {
          logError(`Failed to resend email to ${user.email}: ${resendError.message}`)
        } else {
          logSuccess(`Resent confirmation email to ${user.email}`)
        }
      } catch (error) {
        logError(`Error resending email to ${user.email}: ${error.message}`)
      }
    }
    */
    
    logInfo('\nManual steps to fix:')
    logInfo('1. Go to Supabase Dashboard → Authentication → Users')
    logInfo('2. Find users who need confirmation')
    logInfo('3. Click "Confirm" for each user')
    logInfo('4. Or resend confirmation emails from the dashboard')
    
  } catch (error) {
    logError(`Script failed: ${error.message}`)
  }
  
  logSuccess('Script completed!')
}

// Run the fix
fixExistingUsers().catch(error => {
  logError(`Script failed with error: ${error.message}`)
  process.exit(1)
})
