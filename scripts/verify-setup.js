#!/usr/bin/env node

/**
 * Verification script for Mboga Pap backend setup
 * Run this after completing the setup to verify everything works
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

async function verifyEnvironmentVariables() {
  logHeader('Verifying Environment Variables')
  
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY'
  ]
  
  const optionalVars = [
    'NEXT_PUBLIC_APP_URL',
    'CRON_SECRET'
  ]
  
  let allRequired = true
  
  for (const varName of requiredVars) {
    const value = process.env[varName]
    if (value) {
      logSuccess(`${varName}: SET`)
      if (varName.includes('URL')) {
        logInfo(`  Value: ${value}`)
      } else if (varName.includes('KEY')) {
        logInfo(`  Value: ${value.substring(0, 20)}...`)
      }
    } else {
      logError(`${varName}: NOT SET`)
      allRequired = false
    }
  }
  
  log('\nOptional Variables:')
  for (const varName of optionalVars) {
    const value = process.env[varName]
    if (value) {
      logSuccess(`${varName}: SET`)
    } else {
      logWarning(`${varName}: NOT SET (optional)`)
    }
  }
  
  return allRequired
}

async function verifySupabaseConnection() {
  logHeader('Verifying Supabase Connection')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    logError('Missing Supabase credentials')
    return false
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Test basic connection
    const { data, error } = await supabase.from('categories').select('count').limit(1)
    
    if (error) {
      logError(`Database connection failed: ${error.message}`)
      return false
    }
    
    logSuccess('Supabase connection successful')
    return true
    
  } catch (error) {
    logError(`Connection error: ${error.message}`)
    return false
  }
}

async function verifyDatabaseSchema() {
  logHeader('Verifying Database Schema')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    logError('Missing Supabase credentials')
    return false
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Check if core tables exist
    const tables = [
      'users',
      'categories',
      'vendors',
      'products',
      'orders',
      'order_items',
      'deliveries',
      'payments',
      'reviews',
      'rider_profiles',
      'cart_items',
      'notifications'
    ]
    
    let allTablesExist = true
    
    for (const tableName of tables) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('count')
          .limit(1)
        
        if (error) {
          logError(`Table ${tableName}: ${error.message}`)
          allTablesExist = false
        } else {
          logSuccess(`Table ${tableName}: EXISTS`)
        }
      } catch (error) {
        logError(`Table ${tableName}: ${error.message}`)
        allTablesExist = false
      }
    }
    
    // Check categories data
    try {
      const { data: categories, error } = await supabase
        .from('categories')
        .select('name')
        .limit(5)
      
      if (error) {
        logError(`Categories query failed: ${error.message}`)
      } else if (categories && categories.length > 0) {
        logSuccess(`Categories loaded: ${categories.length} found`)
        logInfo(`Sample categories: ${categories.map(c => c.name).join(', ')}`)
      } else {
        logWarning('No categories found - schema may not be fully set up')
      }
    } catch (error) {
      logError(`Categories check failed: ${error.message}`)
    }
    
    return allTablesExist
    
  } catch (error) {
    logError(`Schema verification failed: ${error.message}`)
    return false
  }
}

async function verifyAuthentication() {
  logHeader('Verifying Authentication Setup')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    logError('Missing Supabase credentials')
    return false
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Check if auth is accessible
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error && (error.message.includes('JWT') || error.message.includes('Auth session missing') || error.message.includes('token'))) {
      // This is expected for unauthenticated requests
      logSuccess('Authentication system accessible')
      return true
    } else if (error) {
      logError(`Authentication check failed: ${error.message}`)
      return false
    } else {
      logSuccess('Authentication system accessible')
      return true
    }
    
  } catch (error) {
    logError(`Authentication verification failed: ${error.message}`)
    return false
  }
}

async function runVerification() {
  logHeader('Mboga Pap Backend Setup Verification')
  logInfo('Running comprehensive verification...\n')
  
  const results = {
    env: false,
    connection: false,
    schema: false,
    auth: false
  }
  
  // Verify environment variables
  results.env = await verifyEnvironmentVariables()
  
  if (!results.env) {
    logError('\n❌ Environment variables are not properly configured!')
    logError('Please create .env.local file with required Supabase credentials.')
    process.exit(1)
  }
  
  // Verify Supabase connection
  results.connection = await verifySupabaseConnection()
  
  if (!results.connection) {
    logError('\n❌ Cannot connect to Supabase!')
    logError('Please check your credentials and project status.')
    process.exit(1)
  }
  
  // Verify database schema
  results.schema = await verifyDatabaseSchema()
  
  // Verify authentication
  results.auth = await verifyAuthentication()
  
  // Summary
  logHeader('Verification Summary')
  
  const totalChecks = Object.keys(results).length
  const passedChecks = Object.values(results).filter(Boolean).length
  
  log(`\nTotal Checks: ${totalChecks}`)
  log(`Passed: ${passedChecks}`, passedChecks === totalChecks ? 'green' : 'yellow')
  log(`Failed: ${totalChecks - passedChecks}`, passedChecks === totalChecks ? 'green' : 'red')
  
  if (passedChecks === totalChecks) {
    log('\n🎉 All checks passed! Your backend is ready to use.', 'green')
    log('\nNext steps:', 'bright')
    log('1. Start your development server: npm run dev')
    log('2. Test user registration at /signup')
    log('3. Test authentication flow')
    log('4. Verify role-based routing works')
  } else {
    log('\n⚠️  Some checks failed. Please review the errors above.', 'yellow')
    log('\nTroubleshooting tips:', 'bright')
    log('1. Check your .env.local file')
    log('2. Verify Supabase project is active')
    log('3. Run database/complete-setup.sql in Supabase SQL Editor')
    log('4. Check Supabase authentication settings')
  }
  
  log('\nFor detailed setup instructions, see SETUP_FROM_SCRATCH.md', 'cyan')
}

// Run verification if this script is executed directly
if (require.main === module) {
  runVerification().catch(error => {
    logError(`\nVerification failed with error: ${error.message}`)
    process.exit(1)
  })
}

module.exports = {
  verifyEnvironmentVariables,
  verifySupabaseConnection,
  verifyDatabaseSchema,
  verifyAuthentication,
  runVerification
}
