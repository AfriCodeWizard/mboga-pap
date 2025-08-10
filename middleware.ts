import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  const { data: { session } } = await supabase.auth.getSession()

  // Handle auth callback route
  if (req.nextUrl.pathname.startsWith('/auth/callback')) {
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
