#!/usr/bin/env node

/**
 * URL Configuration Test Script
 * Tests that URLs are being generated correctly for production
 */

require('dotenv').config({ path: '.env.local' })

const { getAuthCallbackUrl, getBaseUrl } = require('../lib/auth-config.ts')

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

function testUrlConfiguration() {
  logHeader('URL CONFIGURATION TEST')
  
  // Test environment variables
  logInfo('Environment Variables:')
  logInfo(`NODE_ENV: ${process.env.NODE_ENV}`)
  logInfo(`NEXT_PUBLIC_APP_URL: ${process.env.NEXT_PUBLIC_APP_URL}`)
  logInfo(`VERCEL_URL: ${process.env.VERCEL_URL}`)
  
  // Test URL generation
  logInfo('\nGenerated URLs:')
  
  try {
    const baseUrl = getBaseUrl()
    logInfo(`Base URL: ${baseUrl}`)
    
    const callbackUrl = getAuthCallbackUrl('rider')
    logInfo(`Auth Callback URL (rider): ${callbackUrl}`)
    
    const customerCallbackUrl = getAuthCallbackUrl('customer')
    logInfo(`Auth Callback URL (customer): ${customerCallbackUrl}`)
    
    const vendorCallbackUrl = getAuthCallbackUrl('vendor')
    logInfo(`Auth Callback URL (vendor): ${vendorCallbackUrl}`)
    
    // Check for localhost in production
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL_URL) {
      if (baseUrl.includes('localhost')) {
        logError('❌ Base URL contains localhost in production!')
        logError('This will cause email verification links to fail.')
      } else {
        logSuccess('✅ Base URL is correctly configured for production')
      }
      
      if (callbackUrl.includes('localhost')) {
        logError('❌ Callback URL contains localhost in production!')
        logError('Email verification links will redirect to localhost.')
      } else {
        logSuccess('✅ Callback URLs are correctly configured for production')
      }
    } else {
      logInfo('✅ Development environment - localhost URLs are expected')
    }
    
  } catch (error) {
    logError(`Error testing URL configuration: ${error.message}`)
  }
  
  // Instructions for fixing
  logHeader('HOW TO FIX LOCALHOST URL ISSUE')
  logWarning('The issue is in your Supabase Auth settings, not the code!')
  logInfo('Follow these steps:')
  logInfo('1. Go to https://supabase.com/dashboard')
  logInfo('2. Select your project')
  logInfo('3. Go to Authentication → URL Configuration')
  logInfo('4. Update Site URL to: https://mbogapap.vercel.app')
  logInfo('5. Add these Redirect URLs:')
  logInfo('   - https://mbogapap.vercel.app/auth/callback')
  logInfo('   - https://mbogapap.vercel.app/auth/verify')
  logInfo('   - https://mbogapap.vercel.app/login')
  logInfo('   - https://mbogapap.vercel.app/signup')
  logInfo('6. Save the changes')
  logInfo('7. Test with a new signup')
  
  logWarning('\nIMPORTANT:')
  logWarning('- Existing email verification links will still use old URLs')
  logWarning('- New signups will use the updated URLs')
  logWarning('- You may need to resend verification emails for existing users')
  
  logSuccess('\nURL configuration test completed!')
}

// Run the test
testUrlConfiguration()
