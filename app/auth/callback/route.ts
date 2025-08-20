import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const role = requestUrl.searchParams.get('role')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')

  console.log('🔐 Auth callback triggered with:', { 
    code: !!code, 
    role, 
    error, 
    errorDescription,
    pathname: requestUrl.pathname 
  })

  // Handle OAuth errors
  if (error) {
    console.error('❌ OAuth error in callback:', { error, errorDescription })
    return NextResponse.redirect(new URL(`/signup?error=oauth_error&message=${encodeURIComponent(errorDescription || error)}`, requestUrl.origin))
  }

  if (!code) {
    console.log('❌ No auth code provided, redirecting to signup')
    return NextResponse.redirect(new URL('/signup?error=no_code', requestUrl.origin))
  }

  const supabase = createRouteHandlerClient({ cookies })
  
  try {
    console.log('🔄 Exchanging code for session...')
    
    // Exchange the code for a session
    const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (sessionError) {
      console.error('❌ Session exchange error:', sessionError)
      return NextResponse.redirect(new URL(`/signup?error=session_error&message=${encodeURIComponent(sessionError.message)}`, requestUrl.origin))
    }

    if (!sessionData.session) {
      console.error('❌ No session returned from exchange')
      return NextResponse.redirect(new URL('/signup?error=no_session', requestUrl.origin))
    }

    console.log('✅ Session created successfully')
    
    // Get the user data
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.error('❌ User fetch error:', userError)
      return NextResponse.redirect(new URL(`/signup?error=user_fetch_error&message=${encodeURIComponent(userError?.message || 'User not found')}`, requestUrl.origin))
    }
    
    console.log('✅ User authenticated:', { 
      id: user.id, 
      email: user.email, 
      emailConfirmed: user.email_confirmed_at,
      roleFromParams: role,
      metadata: user.user_metadata 
    })
    
    // Check if user profile already exists
    const { data: existingUser, error: profileCheckError } = await supabase
      .from('users')
      .select('id, role, email')
      .eq('id', user.id)
      .single()

    let userRole = role // Use role from URL params for new users

    if (profileCheckError) {
      if (profileCheckError.code === 'PGRST116') {
        // User profile doesn't exist - this is expected for new users
        console.log('🆕 New user - no profile exists yet')
      } else {
        console.error('❌ Profile check error:', profileCheckError)
        return NextResponse.redirect(new URL(`/signup?error=profile_check_error&message=${encodeURIComponent(profileCheckError.message)}`, requestUrl.origin))
      }
    }

    if (!existingUser) {
      // This is a new user - create profile
      if (!userRole) {
        console.error('❌ No role provided for new user')
        return NextResponse.redirect(new URL('/signup?error=no_role_provided', requestUrl.origin))
      }

      console.log('🆕 Creating new user profile with role:', userRole)
      
      // Create user profile
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || 'User',
          role: userRole,
          phone: user.user_metadata?.phone || '',
          address: user.user_metadata?.address || '',
          city: user.user_metadata?.city || 'Nairobi',
          country: user.user_metadata?.country || 'Kenya',
          is_active: true
        })

      if (profileError) {
        console.error('❌ Profile creation error:', profileError)
        return NextResponse.redirect(new URL(`/signup?error=profile_creation_failed&message=${encodeURIComponent(profileError.message)}`, requestUrl.origin))
      }

      console.log('✅ User profile created successfully')

      // Create role-specific profiles
      try {
        if (userRole === 'vendor') {
          console.log('🏪 Creating vendor profile...')
          const { error: vendorError } = await supabase.from('vendors').insert({
            user_id: user.id,
            business_name: user.user_metadata?.full_name || user.user_metadata?.name || 'Vendor',
            business_description: '',
            location: user.user_metadata?.address || 'Nairobi',
            years_in_business: 0,
            rating: 0,
            total_ratings: 0,
            is_verified: false,
            is_online: false
          })
          
          if (vendorError) {
            console.error('⚠️ Vendor profile creation error:', vendorError)
          } else {
            console.log('✅ Vendor profile created successfully')
          }
        } else if (userRole === 'rider') {
          console.log('🏍️ Creating rider profile...')
          const { error: riderError } = await supabase.from('rider_profiles').insert({
            user_id: user.id,
            vehicle_type: user.user_metadata?.vehicle_type || 'motorcycle',
            license_number: user.user_metadata?.license_number || '',
            is_online: false,
            total_deliveries: 0,
            total_earnings: 0,
            rating: 0,
            is_verified: false
          })
          
          if (riderError) {
            console.error('⚠️ Rider profile creation error:', riderError)
          } else {
            console.log('✅ Rider profile created successfully')
          }
        } else if (userRole === 'customer') {
          console.log('🛒 Creating customer profile...')
          const { error: customerError } = await supabase.from('customers').insert({
            user_id: user.id,
            first_name: user.user_metadata?.full_name?.split(' ')[0] || user.user_metadata?.name?.split(' ')[0] || 'Customer',
            last_name: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || user.user_metadata?.name?.split(' ').slice(1).join(' ') || 'User',
            phone: user.user_metadata?.phone || '',
            address: user.user_metadata?.address || '',
            city: user.user_metadata?.city || 'Nairobi',
            country: user.user_metadata?.country || 'Kenya'
          })
          
          if (customerError) {
            console.error('⚠️ Customer profile creation error:', customerError)
          } else {
            console.log('✅ Customer profile created successfully')
          }
        }
      } catch (roleProfileError) {
        console.error('⚠️ Role-specific profile creation failed:', roleProfileError)
        // Don't fail the entire process for role-specific profile errors
      }
    } else {
      // This is an existing user - use their existing role
      console.log('✅ User profile already exists with role:', existingUser.role)
      userRole = existingUser.role
    }
    
    // Determine redirect URL based on role
    let redirectUrl = '/dashboard' // Default
    
    switch (userRole) {
      case 'vendor':
        redirectUrl = '/vendor-dashboard'
        break
      case 'rider':
        redirectUrl = '/rider-dashboard'
        break
      case 'admin':
        redirectUrl = '/admin'
        break
      default:
        redirectUrl = '/dashboard'
    }
    
    console.log('🔄 Redirecting to:', redirectUrl, 'for role:', userRole)
    
    // Use a more reliable redirect method
    const finalUrl = new URL(redirectUrl, requestUrl.origin)
    finalUrl.searchParams.set('verified', 'true')
    
    return NextResponse.redirect(finalUrl)
    
  } catch (error) {
    console.error('❌ Unexpected error in auth callback:', error)
    return NextResponse.redirect(new URL(`/signup?error=unexpected_error&message=${encodeURIComponent(error instanceof Error ? error.message : 'Unknown error')}`, requestUrl.origin))
  }
} 