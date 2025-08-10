import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const role = requestUrl.searchParams.get('role')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    
    try {
      // Exchange the code for a session
      const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
      if (sessionError) {
        console.error('Session exchange error:', sessionError)
        return NextResponse.redirect(new URL('/signup?error=session_error', requestUrl.origin))
      }
      
      // Get the user data
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        console.error('User fetch error:', userError)
        return NextResponse.redirect(new URL('/signup?error=user_fetch_error', requestUrl.origin))
      }
      
      console.log('User authenticated:', user.id, 'Role:', role)
      
      // Check if user profile already exists
      const { data: existingUser, error: profileCheckError } = await supabase
        .from('users')
        .select('id, role')
        .eq('id', user.id)
        .single()

      if (profileCheckError && profileCheckError.code !== 'PGRST116') {
        console.error('Profile check error:', profileCheckError)
        return NextResponse.redirect(new URL('/signup?error=profile_check_error', requestUrl.origin))
      }

      if (!existingUser) {
        // This is a new user - role parameter is required
        if (!role) {
          console.error('No role provided for new user')
          return NextResponse.redirect(new URL('/signup?error=no_role_provided', requestUrl.origin))
        }

        console.log('Creating new user profile...')
        
        // Create user profile FIRST
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || user.user_metadata?.name || 'User',
            role: role,
            phone: user.user_metadata?.phone || '',
            address: user.user_metadata?.address || '',
            city: 'Nairobi',
            country: 'Kenya'
          })

        if (profileError) {
          console.error('Profile creation error:', profileError)
          return NextResponse.redirect(new URL('/signup?error=profile_creation_failed', requestUrl.origin))
        }

        console.log('User profile created successfully')

        // Now create role-specific profiles AFTER user profile is created
        if (role === 'vendor') {
          console.log('Creating vendor profile...')
          const { error: vendorError } = await supabase.from('vendors').insert({
            user_id: user.id,
            business_name: user.user_metadata?.full_name || user.user_metadata?.name || 'Vendor',
            description: '',
            is_online: false,
            rating: 0,
            total_orders: 0
          })
          
          if (vendorError) {
            console.error('Vendor profile creation error:', vendorError)
            // Don't fail the entire process, just log the error
          } else {
            console.log('Vendor profile created successfully')
          }
        } else if (role === 'rider') {
          console.log('Creating rider profile...')
          const { error: riderError } = await supabase.from('rider_profiles').insert({
            user_id: user.id,
            vehicle_type: 'motorcycle',
            vehicle_number: '',
            is_available: false,
            current_location: null,
            total_deliveries: 0,
            rating: 0
          })
          
          if (riderError) {
            console.error('Rider profile creation error:', riderError)
            // Don't fail the entire process, just log the error
          } else {
            console.log('Rider profile created successfully')
          }
        }
      } else {
        // This is an existing user - use their existing role
        console.log('User profile already exists with role:', existingUser.role)
        role = existingUser.role
      }
      
    } catch (error) {
      console.error('Unexpected error in auth callback:', error)
      return NextResponse.redirect(new URL('/signup?error=unexpected_error', requestUrl.origin))
    }
  }

  // Redirect to appropriate dashboard based on role
  const redirectUrl = role === 'vendor' ? '/vendor-dashboard' : 
                     role === 'rider' ? '/rider-dashboard' : 
                     '/dashboard'
  
  console.log('Redirecting to:', redirectUrl)
  return NextResponse.redirect(new URL(redirectUrl, requestUrl.origin))
} 