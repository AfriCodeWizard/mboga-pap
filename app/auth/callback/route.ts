import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const role = requestUrl.searchParams.get('role')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
    
    // Get the user data
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      // If this is a new user from OAuth, create their profile
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single()

      if (!existingUser) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || user.user_metadata?.name || 'User',
            role: role || 'customer',
            phone: user.user_metadata?.phone || '',
            address: user.user_metadata?.address || '',
            city: 'Nairobi',
            country: 'Kenya'
          })

        if (profileError) {
          console.error('Profile creation error:', profileError)
        }

        // Create role-specific profiles
        if (role === 'vendor') {
          await supabase.from('vendors').insert({
            user_id: user.id,
            business_name: user.user_metadata?.full_name || user.user_metadata?.name || 'Vendor',
            description: '',
            is_online: false,
            rating: 0,
            total_orders: 0
          })
        } else if (role === 'rider') {
          await supabase.from('rider_profiles').insert({
            user_id: user.id,
            vehicle_type: 'motorcycle',
            vehicle_number: '',
            is_available: false,
            current_location: null,
            total_deliveries: 0,
            rating: 0
          })
        }
      }
    }
  }

  // Redirect to appropriate dashboard based on role
  const redirectUrl = role === 'vendor' ? '/vendor-dashboard' : 
                     role === 'rider' ? '/rider-dashboard' : 
                     '/dashboard'
  
  return NextResponse.redirect(new URL(redirectUrl, requestUrl.origin))
} 