const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase connection...')
  
  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  console.log('📋 Environment check:')
  console.log('  - NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
  console.log('  - NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Set' : '❌ Missing')
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing required environment variables!')
    console.log('\n📝 To fix this:')
    console.log('1. Create a .env.local file in your project root')
    console.log('2. Add your Supabase credentials:')
    console.log('   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url')
    console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key')
    return
  }
  
  try {
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey)
    console.log('✅ Supabase client created successfully')
    
    // Test basic connection
    console.log('🔌 Testing basic connection...')
    const { data, error } = await supabase.from('users').select('count').limit(1)
    
    if (error) {
      console.error('❌ Database connection failed:', error.message)
      console.log('\n🔧 Possible issues:')
      console.log('1. Database is not accessible')
      console.log('2. RLS policies are blocking access')
      console.log('3. Table "users" does not exist')
      return
    }
    
    console.log('✅ Database connection successful!')
    console.log('✅ Users table is accessible')
    
    // Test auth
    console.log('🔐 Testing authentication...')
    const { data: authData, error: authError } = await supabase.auth.getSession()
    
    if (authError) {
      console.error('❌ Auth test failed:', authError.message)
    } else {
      console.log('✅ Authentication service is working')
      console.log('  - Current session:', authData.session ? 'Active' : 'None')
    }
    
    console.log('\n🎉 Supabase is properly configured and working!')
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
    console.error('Stack:', error.stack)
  }
}

// Run the test
testSupabaseConnection()
