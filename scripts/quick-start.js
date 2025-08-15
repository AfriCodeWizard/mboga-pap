#!/usr/bin/env node

/**
 * Quick Start Script for Mboga Pap Backend
 * This script will guide you through the setup process
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
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

function logStep(step, message) {
  log(`\n${step}. ${message}`, 'blue')
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

function checkFileExists(filePath) {
  return fs.existsSync(path.join(process.cwd(), filePath))
}

function createEnvFile() {
  logStep('1', 'Creating .env.local file')
  
  if (checkFileExists('.env.local')) {
    logWarning('.env.local already exists')
    return true
  }
  
  const envContent = `# Supabase Configuration
# Replace these with your NEW Supabase project credentials
NEXT_PUBLIC_SUPABASE_URL=your_new_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_new_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_new_supabase_service_role_key_here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Cron Job Configuration
CRON_SECRET=mboga-pap-cron-2025

# Optional: External Services
# MPESA_API_KEY=your_mpesa_api_key_here
# MPESA_API_SECRET=your_mpesa_api_secret_here
# GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
`
  
  try {
    fs.writeFileSync('.env.local', envContent)
    logSuccess('.env.local file created successfully')
    logWarning('⚠️  IMPORTANT: You need to edit this file with your actual Supabase credentials!')
    return true
  } catch (error) {
    logError(`Failed to create .env.local: ${error.message}`)
    return false
  }
}

function checkDependencies() {
  logStep('2', 'Checking dependencies')
  
  try {
    // Check if node_modules exists
    if (!checkFileExists('node_modules')) {
      logWarning('node_modules not found. Installing dependencies...')
      execSync('npm install', { stdio: 'inherit' })
      logSuccess('Dependencies installed successfully')
    } else {
      logSuccess('Dependencies already installed')
    }
    return true
  } catch (error) {
    logError(`Failed to install dependencies: ${error.message}`)
    return false
  }
}

function showNextSteps() {
  logHeader('Next Steps')
  
  logInfo('To complete your setup, follow these steps:')
  
  log('\n📋 Setup Checklist:', 'bright')
  log('1. Create a new Supabase project at https://supabase.com')
  log('2. Get your project URL and API keys from Settings → API')
  log('3. Edit .env.local with your actual Supabase credentials')
  log('4. Run the database setup script in Supabase SQL Editor')
  log('5. Configure authentication settings in Supabase')
  log('6. Test your setup with: npm run verify-setup')
  
  log('\n🔧 Database Setup:', 'bright')
  log('1. Go to your Supabase dashboard → SQL Editor')
  log('2. Copy the content of database/complete-setup.sql')
  log('3. Paste and run it in the SQL Editor')
  log('4. Wait for completion (1-2 minutes)')
  
  log('\n🔐 Authentication Setup:', 'bright')
  log('1. Go to Authentication → Settings in Supabase')
  log('2. Set Site URL to: http://localhost:3000')
  log('3. Add these Redirect URLs:')
  log('   - http://localhost:3000/auth/callback')
  log('   - http://localhost:3000/dashboard')
  log('   - http://localhost:3000/vendor-dashboard')
  log('   - http://localhost:3000/rider-dashboard')
  
  log('\n🧪 Testing:', 'bright')
  log('1. Start development server: npm run dev')
  log('2. Verify setup: npm run verify-setup')
  log('3. Test registration: http://localhost:3000/signup')
  log('4. Test authentication flow')
  
  log('\n📚 Documentation:', 'bright')
  log('• Complete setup guide: SETUP_FROM_SCRATCH.md')
  log('• Backend documentation: BACKEND.md')
  log('• Authentication setup: AUTHENTICATION_SETUP.md')
  
  log('\n🚀 Ready to start?', 'bright')
  log('Run: npm run verify-setup (after setting up Supabase)')
}

function runQuickStart() {
  logHeader('Mboga Pap Backend - Quick Start')
  logInfo('This script will help you get started with your backend setup\n')
  
  // Check if we're in the right directory
  if (!checkFileExists('package.json')) {
    logError('package.json not found. Please run this script from your project root.')
    process.exit(1)
  }
  
  // Create .env.local file
  if (!createEnvFile()) {
    logError('Failed to create environment file')
    process.exit(1)
  }
  
  // Check dependencies
  if (!checkDependencies()) {
    logError('Failed to check/install dependencies')
    process.exit(1)
  }
  
  // Show next steps
  showNextSteps()
  
  logHeader('Setup Complete!')
  logSuccess('Your project is ready for configuration')
  logInfo('Follow the steps above to complete your Supabase setup')
}

// Run quick start if this script is executed directly
if (require.main === module) {
  runQuickStart().catch(error => {
    logError(`\nQuick start failed with error: ${error.message}`)
    process.exit(1)
  })
}

module.exports = {
  createEnvFile,
  checkDependencies,
  showNextSteps,
  runQuickStart
}
