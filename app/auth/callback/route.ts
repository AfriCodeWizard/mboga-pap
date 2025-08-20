import { createServerClient } from '@supabase/ssr'
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
    const errorUrl = new URL('/login', request.url)
    errorUrl.searchParams.set('error', error)
    if (errorDescription) {
      errorUrl.searchParams.set('error_description', errorDescription)
    }
    return NextResponse.redirect(errorUrl)
  }

  // Handle email verification
  if (code) {
    try {
      const cookieStore = await cookies()
      
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) =>
                  cookieStore.set(name, value, options)
                )
              } catch {
                // The `setAll` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
              }
            },
          },
        }
      )

      // Exchange the code for a session
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('❌ Code exchange error:', exchangeError)
        const errorUrl = new URL('/login', request.url)
        errorUrl.searchParams.set('error', 'code_exchange_failed')
        errorUrl.searchParams.set('error_description', exchangeError.message)
        return NextResponse.redirect(errorUrl)
      }

      if (!data.session) {
        console.error('❌ No session after code exchange')
        const errorUrl = new URL('/login', request.url)
        errorUrl.searchParams.set('error', 'no_session')
        return NextResponse.redirect(errorUrl)
      }

      console.log('✅ Session created successfully for user:', data.session.user.email)

      // Check if user profile exists
      const { data: existingUser, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.session.user.id)
        .single()

      if (userError && userError.code !== 'PGRST116') {
        console.error('❌ Error checking user profile:', userError)
      }

      // Create user profile if it doesn't exist
      if (!existingUser) {
        console.log('🆕 Creating new user profile for:', data.session.user.email)
        
        const userRole = role || data.session.user.user_metadata?.role || 'customer'
        
        // Create main user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.session.user.id,
            email: data.session.user.email!,
            full_name: data.session.user.user_metadata?.full_name || data.session.user.email?.split('@')[0] || 'User',
            role: userRole,
            phone: data.session.user.phone || '+254700000000',
            address: 'Nairobi, Kenya',
            city: 'Nairobi',
            country: 'Kenya',
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })

        if (profileError) {
          console.error('❌ Error creating user profile:', profileError)
        } else {
          console.log('✅ User profile created successfully')
        }

        // Create role-specific profile
        try {
          if (userRole === 'customer') {
            const { error: customerError } = await supabase
              .from('customers')
              .insert({
                user_id: data.session.user.id,
                loyalty_points: 0,
                total_orders: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })
            
            if (customerError) {
              console.error('❌ Error creating customer profile:', customerError)
            } else {
              console.log('✅ Customer profile created')
            }
          } else if (userRole === 'vendor') {
            const { error: vendorError } = await supabase
              .from('vendors')
              .insert({
                user_id: data.session.user.id,
                business_name: data.session.user.user_metadata?.business_name || 'My Business',
                business_type: 'grocery',
                is_verified: false,
                rating: 0,
                total_orders: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })
            
            if (vendorError) {
              console.error('❌ Error creating vendor profile:', vendorError)
            } else {
              console.log('✅ Vendor profile created')
            }
          } else if (userRole === 'rider') {
            const { error: riderError } = await supabase
              .from('rider_profiles')
              .insert({
                user_id: data.session.user.id,
                vehicle_type: 'motorcycle',
                vehicle_number: 'N/A',
                is_available: true,
                rating: 0,
                total_deliveries: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })
            
            if (riderError) {
              console.error('❌ Error creating rider profile:', riderError)
            } else {
              console.log('✅ Rider profile created')
            }
          }
        } catch (roleError) {
          console.error('❌ Error creating role-specific profile:', roleError)
        }
      } else {
        console.log('✅ User profile already exists')
      }

      // Redirect to appropriate dashboard based on role
      const userRole = existingUser?.role || role || data.session.user.user_metadata?.role || 'customer'
      let redirectUrl: string

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

      console.log('🔄 Redirecting to dashboard:', redirectUrl)
      return NextResponse.redirect(new URL(redirectUrl, request.url))

    } catch (error) {
      console.error('❌ Unexpected error in auth callback:', error)
      const errorUrl = new URL('/login', request.url)
      errorUrl.searchParams.set('error', 'unexpected_error')
      return NextResponse.redirect(errorUrl)
    }
  }

  // No code provided, redirect to login
  console.log('⚠️ No code provided in auth callback')
  return NextResponse.redirect(new URL('/login', request.url))
} 