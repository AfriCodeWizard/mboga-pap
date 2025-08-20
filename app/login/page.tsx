"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Head from "next/head";
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase"
import { getAuthCallbackUrl } from "@/lib/auth-config"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [error, setError] = useState("");
  const router = useRouter();

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

  return (
    <>
      <Head>
        <title>Login - Mboga Pap!</title>
        <meta name="description" content="Sign in to your Mboga Pap! account to order fresh groceries, manage your shop, or deliver as a rider." />
        <meta property="og:title" content="Login - Mboga Pap!" />
        <meta property="og:description" content="Sign in to your Mboga Pap! account to order fresh groceries, manage your shop, or deliver as a rider." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mbongapap.co.ke/login" />
        <meta property="og:image" content="/placeholder.jpg" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-md mx-auto">
            {/* Under Construction Disclaimer */}
            <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded shadow text-center font-semibold">
              🚧 This page is under construction. Some features may not work as expected.
            </div>
            <Card className="border border-[color:var(--color-primary)] bg-gradient-to-br from-green-50 to-white shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-[color:var(--color-primary)]">Welcome Back</CardTitle>
                <CardDescription>Sign in to your Mboga Pap! account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-2 text-sm font-medium">
                      {error}
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] focus:ring-opacity-50 rounded p-1"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))
                        }
                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                      />
                      <Label htmlFor="remember" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Link href="/forgot-password" className="text-sm text-[color:var(--color-primary)] hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full transition-all duration-300" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 mb-2">Demo Credentials (for testing):</p>
                  <div className="text-xs text-blue-600 space-y-1">
                    <p>Customer: customer@demo.com / demo123</p>
                    <p>Vendor: vendor@demo.com / demo123</p>
                    <p>Rider: rider@demo.com / demo123</p>
                    <p>Admin: admin@demo.com / demo123</p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-[color:var(--color-primary)] hover:underline font-medium">
                      Sign up
                    </Link>
                  </p>
                </div>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-purple-500" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button 
                      type="button"
                      variant="outline" 
                      className="w-full bg-transparent border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-green-50"
                      onClick={() => signInWithOAuth('google')}
                    >
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
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
                      Google
                    </Button>
                    <Button 
                      type="button"
                      variant="outline" 
                      className="w-full bg-transparent border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-green-50"
                      onClick={() => signInWithOAuth('github')}
                    >
                      <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

