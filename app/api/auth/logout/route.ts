import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase client not available' },
        { status: 500 }
      )
    }
    
    // Sign out the user from Supabase
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Logout error:', error)
      return NextResponse.json(
        { error: 'Failed to logout' },
        { status: 500 }
      )
    }

    // Create response with success message
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    )

    // Clear all possible auth cookies
    const cookiesToDelete = [
      'sb-access-token',
      'sb-refresh-token',
      'sb-auth-token',
      'supabase-auth-token',
      'demo-user',
      'demo-role',
      'auth-token',
      'session',
      'user-session'
    ]

    cookiesToDelete.forEach(cookieName => {
      response.cookies.delete(cookieName)
    })

    // Set additional headers to prevent caching
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    console.log('✅ Logout successful - all cookies and sessions cleared')
    
    return response
  } catch (error) {
    console.error('Logout API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

