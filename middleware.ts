import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Check if Supabase environment variables are available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables in middleware')
    console.error('Available env vars:', {
      NEXT_PUBLIC_SUPABASE_URL: !!supabaseUrl,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!supabaseAnonKey,
      NODE_ENV: process.env.NODE_ENV
    })
    
    // In production, if environment variables are missing, skip middleware and continue
    // This prevents the app from crashing completely
    if (process.env.NODE_ENV === 'production') {
      console.warn('Production: Skipping middleware due to missing env vars')
      return NextResponse.next()
    }
    
    // In development, we can be more strict
    return NextResponse.next()
  }

  const res = NextResponse.next()
  
  try {
    const supabase = createMiddlewareClient({ req, res }, {
      supabaseUrl,
      supabaseKey: supabaseAnonKey,
    })

    // Refresh session if expired - required for Server Components
    const { data: { session } } = await supabase.auth.getSession()

    // Handle auth callback route
    if (req.nextUrl.pathname.startsWith('/auth/callback')) {
      return res
    }

    // Skip middleware for login and signup pages to prevent redirect loops
    if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup') {
      return res
    }

    // Protected routes that require authentication
    const protectedRoutes = ['/dashboard', '/vendor-dashboard', '/rider-dashboard', '/admin']
    const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))

    if (isProtectedRoute && !session) {
      // Redirect to login if trying to access protected route without session
      const redirectUrl = new URL('/login', req.url)
      redirectUrl.searchParams.set('redirect', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // If user is authenticated and trying to access login/signup, redirect to appropriate dashboard
    if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup')) {
      // Get user role from session metadata or redirect to default dashboard
      const userRole = session.user.user_metadata?.role || 'customer'
      const dashboardUrl = userRole === 'vendor' ? '/vendor-dashboard' : 
                          userRole === 'rider' ? '/rider-dashboard' : 
                          '/dashboard'
      
      return NextResponse.redirect(new URL(dashboardUrl, req.url))
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    // If there's an error, continue without middleware
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
