"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Users, Store, Bike } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

type UserRole = "customer" | "vendor" | "rider"

export default function SignInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        throw error
      }

      if (data.user) {
        // Redirect based on user role
        const userRole = data.user.user_metadata?.role || 'customer'
        if (userRole === 'vendor') {
          router.push('/vendor-dashboard')
        } else if (userRole === 'rider') {
          router.push('/rider-dashboard')
        } else {
          router.push('/dashboard')
        }
      }
    } catch (error: any) {
      console.error('Signin error:', error)
      alert(error.message || 'Failed to sign in. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGmailSignIn = async () => {
    if (!selectedRole) {
      alert("Please select your role first")
      return
    }

    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?role=${selectedRole}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      console.error('Gmail signin error:', error)
      alert(error.message || 'Failed to sign in with Gmail. Please try again.')
      setIsLoading(false)
    }
  }

  const roleOptions = [
    {
      id: "customer" as UserRole,
      title: "Customer",
      icon: Users,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      hoverBorderColor: "hover:border-green-400",
    },
    {
      id: "vendor" as UserRole,
      title: "Vendor",
      icon: Store,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      borderColor: "border-orange-200",
      hoverBorderColor: "hover:border-orange-400",
    },
    {
      id: "rider" as UserRole,
      title: "Rider",
      icon: Bike,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      hoverBorderColor: "hover:border-blue-400",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[color:var(--color-primary)]/5 via-white to-[color:var(--color-accent)]/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-2 border-[color:var(--color-primary)]/20 shadow-xl">
          <CardHeader className="text-center bg-gradient-to-r from-[color:var(--color-primary)]/5 to-[color:var(--color-accent)]/5">
            <div className="mb-4">
              <Link href="/" className="inline-flex items-center text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </div>
            <CardTitle className="text-3xl font-bold text-[color:var(--color-primary)]">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-lg">
              Sign in to your Mboga Pap account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {/* Gmail Sign In Button */}
            <div className="mb-6">
              <Button
                type="button"
                onClick={handleGmailSignIn}
                disabled={isLoading || !selectedRole}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 transition-all duration-300"
              >
                <Mail className="h-5 w-5 mr-2" />
                Continue with Gmail
              </Button>
            </div>

            {/* Role Selection for Gmail */}
            <div className="mb-6">
              <Label className="text-sm text-gray-600 mb-3 block">Select your role for Gmail sign in:</Label>
              <div className="grid grid-cols-3 gap-3">
                {roleOptions.map((role) => (
                  <Button
                    key={role.id}
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedRole(role.id)}
                    className={`h-16 flex flex-col items-center justify-center p-2 transition-all duration-200 ${
                      selectedRole === role.id 
                        ? `border-2 border-[color:var(--color-primary)] bg-[color:var(--color-primary)]/10` 
                        : `${role.borderColor} ${role.hoverBorderColor}`
                    }`}
                  >
                    <role.icon className={`h-5 w-5 mb-1 ${
                      selectedRole === role.id ? 'text-[color:var(--color-primary)]' : 'text-gray-600'
                    }`} />
                    <span className={`text-xs font-medium ${
                      selectedRole === role.id ? 'text-[color:var(--color-primary)]' : 'text-gray-600'
                    }`}>
                      {role.title}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-[color:var(--color-primary)] font-semibold">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-[color:var(--color-primary)]" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="pl-12 py-3 border-2 border-gray-200 focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-[color:var(--color-primary)] font-semibold">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-[color:var(--color-primary)]" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-12 pr-12 py-3 border-2 border-gray-200 focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-gray-100"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))}
                    className="border-2 border-[color:var(--color-primary)]"
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-700">
                    Remember me
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-[color:var(--color-primary)] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:text-[color:var(--color-primary)] transition-all duration-300 py-3 text-lg font-semibold"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-[color:var(--color-primary)] hover:underline font-semibold">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 