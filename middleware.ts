import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Check if Supabase environment variables are available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables in middleware')
    
    // In production, we might want to continue without middleware
    if (process.env.NODE_ENV === 'production') {
      console.warn('Production: Skipping middleware due to missing env vars')
      return supabaseResponse
    }
    
    // In development, we can be more strict
    return supabaseResponse
  }

  // Refresh session if expired - required for Server Components
  const { data: { session } } = await supabase.auth.getSession()

  // Handle auth callback route
  if (request.nextUrl.pathname.startsWith('/auth/callback')) {
    return supabaseResponse
  }

  // Skip middleware for login and signup pages to prevent redirect loops
  if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') {
    return supabaseResponse
  }

  // Check for demo user cookie or session indicator
  const demoUserCookie = request.cookies.get('demo-user')
  const isDemoUser = demoUserCookie?.value === 'true'

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/vendor-dashboard', '/rider-dashboard', '/admin']
  const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))

  // Prioritize real user sessions over demo accounts
  if (isProtectedRoute && !session && !isDemoUser) {
    // Redirect to login if trying to access protected route without session or demo user
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If user has a real session, clear any demo cookies to prevent conflicts
  if (session && isDemoUser) {
    console.log('🔐 Real user session detected, clearing demo cookies')
    const response = NextResponse.next({
      request,
    })
    
    // Clear demo cookies
    response.cookies.set('demo-user', '', { maxAge: 0 })
    response.cookies.set('demo-role', '', { maxAge: 0 })
    
    return response
  }

  // If user is authenticated and trying to access login/signup, redirect to appropriate dashboard
  if (session && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
    // Get user role from session metadata or redirect to default dashboard
    const userRole = session.user.user_metadata?.role || 'customer'
    const dashboardUrl = userRole === 'vendor' ? '/vendor-dashboard' : 
                        userRole === 'rider' ? '/rider-dashboard' : 
                        '/dashboard'
    
    return NextResponse.redirect(new URL(dashboardUrl, request.url))
  }

  return supabaseResponse
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
