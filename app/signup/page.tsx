"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, MapPin, Phone, Mail, User, Store, Truck, Users, CheckCircle, Star, Zap, Shield, Award, Bike, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

type UserRole = "customer" | "vendor" | "rider"

export default function SignUpPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    agreeToTerms: false,
    // Vendor specific
    shopName: "",
    businessLicense: "",
    // Rider specific
    vehicleType: "",
    licenseNumber: "",
  })

  // Debug logging
  console.log('Current selectedRole:', selectedRole)
  console.log('Form data:', formData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }))
  }

  const validateForm = () => {
    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return false
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole) {
      alert("Please select your role first")
      return
    }

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Create user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: `${formData.firstName} ${formData.lastName}`,
            role: selectedRole,
            phone: formData.phone,
            address: formData.address
          }
        }
      })

      if (authError) {
        throw authError
      }

      if (authData.user) {
        // Create user profile in our database
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: formData.email,
            phone: formData.phone,
            full_name: `${formData.firstName} ${formData.lastName}`,
            role: selectedRole,
            address: formData.address,
            city: 'Nairobi',
            country: 'Kenya'
          })

        if (profileError) {
          console.error('Profile creation error:', profileError)
        }

        // Create role-specific profiles
        if (selectedRole === 'vendor') {
          await supabase.from('vendors').insert({
            user_id: authData.user.id,
            business_name: formData.shopName || `${formData.firstName} ${formData.lastName}`,
            description: '',
            is_online: false,
            rating: 0,
            total_orders: 0
          })
        } else if (selectedRole === 'rider') {
          await supabase.from('rider_profiles').insert({
            user_id: authData.user.id,
            vehicle_type: formData.vehicleType || 'motorcycle',
            vehicle_number: formData.licenseNumber || '',
            is_available: false,
            current_location: null,
            total_deliveries: 0,
            rating: 0
          })
        }

        alert(`Account created successfully as ${selectedRole}! Please check your email to verify your account.`)
        router.push('/signin')
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      alert(error.message || 'Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGmailSignUp = async () => {
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
      console.error('Gmail signup error:', error)
      alert(error.message || 'Failed to sign up with Gmail. Please try again.')
      setIsLoading(false)
    }
  }

  const roleOptions = [
    {
      id: "customer" as UserRole,
      title: "Customer",
      titleSw: "Mteja",
      description: "Order fresh groceries from local vendors",
      descriptionSw: "Agiza mboga safi kutoka kwa wachuuzi wa mitaani",
      icon: Users,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      hoverBorderColor: "hover:border-green-400",
      benefits: ["Free delivery on first order", "Exclusive member discounts", "Priority customer support"],
      earnings: "Free delivery available",
      earningsColor: "bg-green-100 text-green-800"
    },
    {
      id: "vendor" as UserRole,
      title: "Vendor",
      titleSw: "Mchuuzi",
      description: "Sell your fresh produce to customers",
      descriptionSw: "Uza mazao yako safi kwa wateja",
      icon: Store,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      borderColor: "border-orange-200",
      hoverBorderColor: "hover:border-orange-400",
      benefits: ["Reach more customers", "Easy inventory management", "Secure payments"],
      earnings: "Earn KSh 30,000+/month",
      earningsColor: "bg-orange-100 text-orange-800"
    },
    {
      id: "rider" as UserRole,
      title: "Rider (Bodaboda)",
      titleSw: "Dereva (Bodaboda)",
      description: "Deliver groceries and earn income",
      descriptionSw: "Peleka mboga na upate kipato",
      icon: Bike,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      hoverBorderColor: "hover:border-blue-400",
      benefits: ["Flexible working hours", "Competitive pay rates", "Weekly payments"],
      earnings: "Earn KSh 50,000+/month",
      earningsColor: "bg-blue-100 text-blue-800"
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[color:var(--color-primary)]/5 via-white to-[color:var(--color-accent)]/5">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {!selectedRole ? (
            // Role Selection Step
            <div className="text-center mb-8 md:mb-12">
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-[color:var(--color-primary)] mb-4">
                  Join Mboga Pap
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-2">
                  Choose how you'd like to be part of our community
                </p>
                <p className="text-lg text-gray-500">
                  Fresh groceries, real connections, endless possibilities
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 md:gap-10">
                {roleOptions.map((role) => (
                  <Card
                    key={role.id}
                    className={`cursor-pointer border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl group relative overflow-hidden ${
                      selectedRole === role.id 
                        ? "border-[color:var(--color-primary)] shadow-xl ring-4 ring-[color:var(--color-primary)]/20" 
                        : `${role.borderColor} ${role.hoverBorderColor} hover:shadow-xl`
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <CardContent className={`p-8 text-center bg-gradient-to-br ${role.bgColor} relative z-10`}>
                      {/* Selection indicator */}
                      {selectedRole === role.id && (
                        <div className="absolute top-4 right-4">
                          <div className="w-8 h-8 bg-[color:var(--color-primary)] rounded-full flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      )}
                      
                      <div
                        className={`w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${role.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <role.icon className="h-10 w-10 md:h-12 md:w-12 text-white" />
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">{role.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 italic">{role.titleSw}</p>
                      <p className="text-base md:text-lg text-gray-700 mb-6">{role.description}</p>
                      <p className="text-sm text-gray-600 italic mb-6">{role.descriptionSw}</p>

                      {/* Benefits */}
                      <div className="space-y-3 mb-6">
                        {role.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center space-x-2 justify-start">
                            <Star className="h-4 w-4 text-[color:var(--color-accent)] fill-current flex-shrink-0" />
                            <span className="text-sm text-gray-700 text-left">{benefit}</span>
                          </div>
                        ))}
                      </div>

                      <Badge className={`${role.earningsColor} text-sm font-semibold px-4 py-2`}>
                        {role.earnings}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Trust indicators */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-[color:var(--color-accent)]/20 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-[color:var(--color-primary)]" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-[color:var(--color-primary)]">Secure & Safe</p>
                    <p className="text-sm text-gray-600">Your data is protected</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-[color:var(--color-accent)]/20 rounded-xl flex items-center justify-center">
                    <Zap className="h-6 w-6 text-[color:var(--color-primary)]" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-[color:var(--color-primary)]">Fast Setup</p>
                    <p className="text-sm text-gray-600">Get started in minutes</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-[color:var(--color-accent)]/20 rounded-xl flex items-center justify-center">
                    <Award className="h-6 w-6 text-[color:var(--color-primary)]" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-[color:var(--color-primary)]">Trusted Platform</p>
                    <p className="text-sm text-gray-600">Join thousands of users</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Registration Form Step
            <div className="max-w-2xl mx-auto">
              <Card className="border-2 border-[color:var(--color-primary)]/20 shadow-xl">
                <CardHeader className="text-center bg-gradient-to-r from-[color:var(--color-primary)]/5 to-[color:var(--color-accent)]/5">
                  <div className="flex items-center justify-center mb-6">
                    <Button 
                      variant="ghost" 
                      onClick={() => setSelectedRole(null)} 
                      className="mr-4 hover:bg-[color:var(--color-accent)]/20"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${roleOptions.find((r) => r.id === selectedRole)?.color} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      {roleOptions.find((r) => r.id === selectedRole)?.icon &&
                        React.createElement(roleOptions.find((r) => r.id === selectedRole)?.icon, {
                          className: "h-8 w-8 text-white",
                        })}
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-bold text-[color:var(--color-primary)]">
                    Create Your {roleOptions.find((r) => r.id === selectedRole)?.title} Account
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Join Mboga Pap as a {selectedRole} and start your journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {/* Debug Section - Remove this after fixing */}
                  <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Debug Info:</h4>
                    <p className="text-sm text-yellow-700">Selected Role: {selectedRole || 'None'}</p>
                    <p className="text-sm text-yellow-700">Form Step: {selectedRole ? 'Registration Form' : 'Role Selection'}</p>
                  </div>

                  {/* Gmail Sign Up Button */}
                  <div className="mb-6">
                    <Button
                      type="button"
                      onClick={handleGmailSignUp}
                      disabled={isLoading}
                      className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 transition-all duration-300"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Continue with Gmail
                    </Button>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="firstName" className="text-[color:var(--color-primary)] font-semibold">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-[color:var(--color-primary)]" />
                          <Input
                            id="firstName"
                            name="firstName"
                            placeholder="John"
                            className="pl-12 py-3 border-2 border-gray-200 focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="lastName" className="text-[color:var(--color-primary)] font-semibold">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          className="py-3 border-2 border-gray-200 focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

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
                      <div className="relative border-2 border-red-500 p-2 rounded-lg bg-red-50">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-[color:var(--color-primary)]" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
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

                    <div className="space-y-3">
                      <Label htmlFor="confirmPassword" className="text-[color:var(--color-primary)] font-semibold">Confirm Password</Label>
                      <div className="relative border-2 border-red-500 p-2 rounded-lg bg-red-50">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-[color:var(--color-primary)]" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="pl-12 pr-12 py-3 border-2 border-gray-200 focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-gray-100"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-[color:var(--color-primary)] font-semibold">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-[color:var(--color-primary)]" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+254 700 000 000"
                          className="pl-12 py-3 border-2 border-gray-200 focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="address" className="text-[color:var(--color-primary)] font-semibold">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-[color:var(--color-primary)]" />
                        <Input
                          id="address"
                          name="address"
                          placeholder="Nairobi, Kenya"
                          className="pl-12 py-3 border-2 border-gray-200 focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Role-specific fields */}
                    {selectedRole === "vendor" && (
                      <div className="space-y-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <h3 className="font-semibold text-orange-800">Vendor Information</h3>
                        <div className="space-y-3">
                          <Label htmlFor="shopName" className="text-orange-800 font-semibold">Shop Name</Label>
                          <Input
                            id="shopName"
                            name="shopName"
                            placeholder="Your shop name"
                            className="py-3 border-2 border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                            value={formData.shopName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="businessLicense" className="text-orange-800 font-semibold">Business License (Optional)</Label>
                          <Input
                            id="businessLicense"
                            name="businessLicense"
                            placeholder="Business license number"
                            className="py-3 border-2 border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                            value={formData.businessLicense}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    )}

                    {selectedRole === "rider" && (
                      <div className="space-y-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h3 className="font-semibold text-blue-800">Rider Information</h3>
                        <div className="space-y-3">
                          <Label htmlFor="vehicleType" className="text-blue-800 font-semibold">Vehicle Type</Label>
                          <Input
                            id="vehicleType"
                            name="vehicleType"
                            placeholder="Motorcycle, Bicycle, etc."
                            className="py-3 border-2 border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                            value={formData.vehicleType}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="licenseNumber" className="text-blue-800 font-semibold">License Number (Optional)</Label>
                          <Input
                            id="licenseNumber"
                            name="licenseNumber"
                            placeholder="Driver's license number"
                            className="py-3 border-2 border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                            value={formData.licenseNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={handleCheckboxChange}
                        className="border-2 border-[color:var(--color-primary)]"
                      />
                      <Label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                        I agree to the{" "}
                        <Link href="/terms" className="text-[color:var(--color-primary)] hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-[color:var(--color-primary)] hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:text-[color:var(--color-primary)] transition-all duration-300 py-3 text-lg font-semibold"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                          Creating Account...
                        </>
                      ) : (
                        `Create ${selectedRole} Account`
                      )}
                    </Button>

                    <div className="text-center">
                      <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link href="/signin" className="text-[color:var(--color-primary)] hover:underline font-semibold">
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
