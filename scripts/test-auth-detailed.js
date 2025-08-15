#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

async function testAuthDetailed() {
  console.log('=== Detailed Authentication Test ===\n')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  console.log('Environment variables:')
  console.log('URL:', supabaseUrl ? 'SET' : 'NOT_SET')
  console.log('Key:', supabaseKey ? 'SET' : 'NOT_SET')
  console.log('')
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Missing environment variables')
    return
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    console.log('✅ Supabase client created successfully')
    
    // Test basic auth access
    console.log('\n--- Testing auth.getUser() ---')
    const { data: { user }, error } = await supabase.auth.getUser()
    
    console.log('User data:', user ? 'Present' : 'None')
    console.log('Error:', error ? error.message : 'None')
    console.log('Error code:', error ? error.status : 'None')
    
    if (error) {
      console.log('\n--- Error Details ---')
      console.log('Error message:', error.message)
      console.log('Error status:', error.status)
      console.log('Error name:', error.name)
      console.log('Full error:', JSON.stringify(error, null, 2))
      
      // Check if this is expected behavior
      if (error.message.includes('JWT') || error.message.includes('token')) {
        console.log('\n✅ This is expected - no JWT token provided')
        console.log('Authentication system is working correctly')
      } else {
        console.log('\n❌ Unexpected error - authentication may not be configured properly')
      }
    } else {
      console.log('\n✅ Authentication working - user found')
    }
    
    // Test auth settings
    console.log('\n--- Testing auth settings ---')
    try {
      const { data: settings, error: settingsError } = await supabase.auth.getSession()
      console.log('Session data:', settings ? 'Present' : 'None')
      console.log('Settings error:', settingsError ? settingsError.message : 'None')
    } catch (settingsError) {
      console.log('Settings error:', settingsError.message)
    }
    
  } catch (error) {
    console.log('❌ Client creation failed:', error.message)
  }
}

testAuthDetailed().catch(console.error)


