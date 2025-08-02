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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Generic credentials for demo purposes
    const validCredentials = [
      { email: "customer@demo.com", password: "demo123", role: "customer" },
      { email: "vendor@demo.com", password: "demo123", role: "vendor" },
      { email: "rider@demo.com", password: "demo123", role: "rider" },
      { email: "admin@demo.com", password: "demo123", role: "admin" },
    ]

    const user = validCredentials.find((cred) => cred.email === formData.email && cred.password === formData.password)

    if (user) {
      // Redirect based on role
      switch (user.role) {
        case "customer":
          router.push("/dashboard")
          break
        case "vendor":
          router.push("/vendor-dashboard")
          break
        case "rider":
          router.push("/rider-dashboard")
          break
        case "admin":
          router.push("/admin")
          break
      }
    } else {
      setError("Invalid credentials. Try: customer@demo.com / demo123");
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
                      />
                      <Label htmlFor="remember" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Link href="/forgot-password" className="text-sm text-[color:var(--color-primary)] hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full transition-all duration-300">
                    Sign In
                  </Button>
                </form>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 mb-2">Demo Credentials:</p>
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
                    <Button variant="outline" className="w-full bg-transparent border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-green-50">
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
                    <Button variant="outline" className="w-full bg-transparent border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-green-50">
                      <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
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
