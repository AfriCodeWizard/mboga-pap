"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter, useSearchParams } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase"
import { getAuthCallbackUrl } from "@/lib/auth-config"

function LoginContent() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for existing session on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const supabase = getSupabaseClient()
        if (!supabase) {
          setIsCheckingSession(false)
          return
        }

        // Clear any demo user cookies first
        if (typeof document !== 'undefined') {
          document.cookie = 'demo-user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
          document.cookie = 'demo-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        }

        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session check error:', error)
          setIsCheckingSession(false)
          return
        }

        if (session?.user) {
          console.log('✅ User already authenticated:', session.user.email)
          
          // Get user role and redirect
          const { data: profile } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single()

          const userRole = profile?.role || 'customer'
          const redirectUrl = userRole === 'vendor' ? '/vendor-dashboard' : 
                             userRole === 'rider' ? '/rider-dashboard' : 
                             userRole === 'admin' ? '/admin' : '/dashboard'
          
          console.log('🔄 Redirecting authenticated user to:', redirectUrl)
          router.replace(redirectUrl)
          return
        }

        setIsCheckingSession(false)
      } catch (error) {
        console.error('Session check failed:', error)
        setIsCheckingSession(false)
      }
    }

    checkSession()
  }, [router])

  // Function to set demo user cookie
  const setDemoUserCookie = (role: string) => {
    if (typeof document !== 'undefined') {
      document.cookie = `demo-user=true; path=/; max-age=3600` // 1 hour expiry
      document.cookie = `demo-role=${role}; path=/; max-age=3600`
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Check for demo credentials first
    const validCredentials = [
      { email: "customer@demo.com", password: "demo123", role: "customer" },
      { email: "vendor@demo.com", password: "demo123", role: "vendor" },
      { email: "rider@demo.com", password: "demo123", role: "rider" },
      { email: "admin@demo.com", password: "demo123", role: "admin" },
    ]

    const demoUser = validCredentials.find((cred) => 
      cred.email === formData.email && cred.password === formData.password
    )

    if (demoUser) {
      console.log('🎭 Demo login detected for role:', demoUser.role)
      
      // Set demo user cookie for middleware
      setDemoUserCookie(demoUser.role)
      
      // Handle demo login with router.push for better navigation
      try {
        switch (demoUser.role) {
          case "customer":
            console.log('🔄 Redirecting to customer dashboard')
            await router.push("/dashboard")
            break
          case "vendor":
            console.log('🔄 Redirecting to vendor dashboard')
            await router.push("/vendor-dashboard")
            break
          case "rider":
            console.log('🔄 Redirecting to rider dashboard')
            await router.push("/rider-dashboard")
            break
          case "admin":
            console.log('🔄 Redirecting to admin dashboard')
            await router.push("/admin")
            break
        }
        return
      } catch (error) {
        console.error('Demo login redirect error:', error)
        // Fallback to window.location if router fails
        window.location.href = demoUser.role === 'vendor' ? '/vendor-dashboard' : 
                              demoUser.role === 'rider' ? '/rider-dashboard' : 
                              demoUser.role === 'admin' ? '/admin' : '/dashboard'
      }
    }

    // If not demo, try Supabase authentication
    try {
      console.log('🔐 Attempting Supabase authentication for:', formData.email)
      
      const supabase = getSupabaseClient()
      if (!supabase) {
        console.error('❌ Supabase client not available')
        setError('Authentication service not available. Please check your connection.')
        return
      }

      console.log('✅ Supabase client created successfully')

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (authError) {
        console.error('❌ Supabase auth failed:', authError.message)
        console.error('❌ Auth error details:', {
          message: authError.message,
          status: authError.status,
          name: authError.name
        })
        
        // Provide more helpful error messages
        if (authError.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials.')
        } else if (authError.message.includes('Email not confirmed')) {
          setError('Please check your email and click the verification link before logging in.')
        } else if (authError.message.includes('Too many requests')) {
          setError('Too many login attempts. Please wait a moment and try again.')
        } else {
          setError(authError.message || "Invalid credentials")
        }
        return
      }

      // Supabase authentication successful
      if (data.user) {
        console.log('✅ Supabase auth successful for user:', data.user.id, data.user.email)
        console.log('✅ User metadata:', data.user.user_metadata)
        
        // Get user role from the database
        let { data: profile, error: profileError } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single()

        console.log('🔍 Profile fetch result:', { profile, profileError })

        // If profile doesn't exist, create one with default role
        if (profileError && profileError.code === 'PGRST116') {
          console.log('🆕 User profile not found, creating default profile...')
          
          try {
            // Create a default user profile with 'customer' role
            const { error: createError } = await supabase
              .from('users')
              .insert({
                id: data.user.id,
                email: data.user.email,
                full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || 'User',
                role: 'customer', // Default role
                phone: data.user.user_metadata?.phone || '',
                address: data.user.user_metadata?.address || '',
                city: 'Nairobi',
                country: 'Kenya',
                is_active: true
              })

            if (createError) {
              console.error('❌ Failed to create user profile:', createError)
              // Continue with default role
              profile = { role: 'customer' }
            } else {
              console.log('✅ User profile created successfully')
              profile = { role: 'customer' }
              
              // Also create customer profile
              const { error: customerError } = await supabase.from('customers').insert({
                user_id: data.user.id,
                first_name: data.user.user_metadata?.full_name?.split(' ')[0] || data.user.user_metadata?.name?.split(' ')[0] || 'Customer',
                last_name: data.user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || data.user.user_metadata?.name?.split(' ').slice(1).join(' ') || 'User',
                phone: data.user.user_metadata?.phone || '',
                address: data.user.user_metadata?.address || '',
                city: data.user.user_metadata?.city || 'Nairobi',
                country: data.user.user_metadata?.country || 'Kenya'
              })
              
              if (customerError) {
                console.error('❌ Customer profile creation error:', customerError)
              } else {
                console.log('✅ Customer profile created successfully')
              }
            }
          } catch (createErr) {
            console.error('❌ Error creating user profile:', createErr)
            // Continue with default role
            profile = { role: 'customer' }
          }
        } else if (profileError) {
          console.error('❌ Profile fetch error:', profileError)
          console.error('❌ Profile error details:', {
            message: profileError.message,
            code: profileError.code,
            details: profileError.details
          })
          
          // Check if it's a connection issue
          if (profileError.message.includes('fetch') || profileError.message.includes('network')) {
            setError('Database connection error. Please try again.')
            return
          }
          
          // Default to customer dashboard if profile not found
          console.log('🔄 Redirecting to customer dashboard (fallback)')
          window.location.href = "/dashboard"
          return
        }

        if (!profile) {
          console.log('🔄 No profile data, using default customer role')
          profile = { role: 'customer' }
        }

        console.log('🎯 User role detected:', profile.role, 'Type:', typeof profile.role)

        // Redirect based on user role - handle both string and ENUM types
        const userRole = String(profile.role).toLowerCase()
        console.log('🔄 Normalized role:', userRole)
        
        // Use router.push for better navigation
        let redirectUrl = "/dashboard" // Default
        
        switch (userRole) {
          case "customer":
            redirectUrl = "/dashboard"
            break
          case "vendor":
            redirectUrl = "/vendor-dashboard"
            break
          case "rider":
            redirectUrl = "/rider-dashboard"
            break
          case "admin":
            redirectUrl = "/admin"
            break
          default:
            redirectUrl = "/dashboard"
        }
        
        console.log('🔄 Redirecting to:', redirectUrl, 'for role:', userRole)
        
        // Use router.push for better navigation
        try {
          await router.push(redirectUrl)
        } catch (routerError) {
          console.error('Router push failed, using window.location:', routerError)
          window.location.href = redirectUrl
        }
      } else {
        console.error('❌ No user data returned from Supabase')
        setError('Authentication failed. Please try again.')
      }
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message || 'An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithOAuth = async (provider: 'google' | 'github') => {
    try {
      const supabase = getSupabaseClient()
      if (!supabase) {
        setError('Authentication service not available')
        return
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: getAuthCallbackUrl()
        }
      })

      if (error) {
        setError(error.message)
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during OAuth sign in')
    }
  }

  // Show loading while checking session
  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          {/* Login Card */}
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-[color:var(--color-primary)]">
                Welcome Back!
              </CardTitle>
              <CardDescription>
                Sign in to your Mboga Pap! account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))
                      }
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[color:var(--color-primary)] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-dark)] text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</h3>
                <div className="text-xs text-blue-700 space-y-1">
                  <p><strong>Customer:</strong> customer@demo.com / demo123</p>
                  <p><strong>Vendor:</strong> vendor@demo.com / demo123</p>
                  <p><strong>Rider:</strong> rider@demo.com / demo123</p>
                  <p><strong>Admin:</strong> admin@demo.com / demo123</p>
                </div>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* OAuth Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => signInWithOAuth('google')}
                  className="flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Google</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => signInWithOAuth('github')}
                  className="flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </Button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-[color:var(--color-primary)] hover:underline font-medium"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading login page...</p>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}

