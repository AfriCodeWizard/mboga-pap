"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, MapPin, Phone, Mail, User, Store, Truck, Users, CheckCircle, Star, Zap, Shield, Award, Bike } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import Head from "next/head"

type UserRole = "customer" | "vendor" | "rider"

export default function SignUpPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole) {
      alert("Please select your role first")
      return
    }
    // Handle form submission
    console.log("Form submitted:", { role: selectedRole, ...formData })
    alert(`Account created successfully as ${selectedRole}!`)
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
      title: "Vendor (MamaMboga)",
      titleSw: "Mchuuzi (MamaMboga)",
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
    <>
      <Head>
        <title>Sign Up - Mboga Pap!</title>
        <meta name="description" content="Create your Mboga Pap! account to shop, sell, or deliver fresh groceries in your community." />
        <meta property="og:title" content="Sign Up - Mboga Pap!" />
        <meta property="og:description" content="Create your Mboga Pap! account to shop, sell, or deliver fresh groceries in your community." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mbongapap.co.ke/signup" />
        <meta property="og:image" content="/placeholder.jpg" />
      </Head>
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
                        <Label htmlFor="address" className="text-[color:var(--color-primary)] font-semibold">
                          {selectedRole === "customer" ? "Delivery Address" : "Business Address"}
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-5 w-5 text-[color:var(--color-primary)]" />
                          <Input
                            id="address"
                            name="address"
                            placeholder={
                              selectedRole === "customer" ? "Enter your delivery address" : "Enter your business address"
                            }
                            className="pl-12 py-3 border-2 border-gray-200 focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <Button type="button" variant="outline" size="sm" className="w-full bg-[color:var(--color-accent)]/10 border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/20">
                          <MapPin className="h-4 w-4 mr-2" />
                          Use Current Location
                        </Button>
                      </div>

                      {/* Vendor-specific fields */}
                      {selectedRole === "vendor" && (
                        <>
                          <div className="space-y-3">
                            <Label htmlFor="shopName" className="text-[color:var(--color-primary)] font-semibold">Shop Name</Label>
                            <div className="relative">
                              <Store className="absolute left-3 top-3 h-5 w-5 text-[color:var(--color-primary)]" />
                              <Input
                                id="shopName"
                                name="shopName"
                                placeholder="Mama Grace Vegetables"
                                className="pl-12 py-3 border-2 border-gray-200 focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20"
                                value={formData.shopName}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="businessLicense" className="text-[color:var(--color-primary)] font-semibold">Business License (Optional)</Label>
                            <Input
                              id="businessLicense"
                              name="businessLicense"
                              placeholder="Business license number"
                              className="py-3 border-2 border-gray-200 focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20"
                              value={formData.businessLicense}
                              onChange={handleInputChange}
                            />
                          </div>
                        </>
                      )}

                      {/* Rider-specific fields */}
                      {selectedRole === "rider" && (
                        <>
                          <div className="space-y-3">
                            <Label htmlFor="vehicleType" className="text-[color:var(--color-primary)] font-semibold">Vehicle Type</Label>
                            <div className="relative">
                              <Bike className="absolute left-3 top-3 h-5 w-5 text-[color:var(--color-primary)]" />
                              <Input
                                id="vehicleType"
                                name="vehicleType"
                                placeholder="Motorcycle/Bicycle"
                                className="pl-12 py-3 border-2 border-gray-200 focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20"
                                value={formData.vehicleType}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="licenseNumber" className="text-[color:var(--color-primary)] font-semibold">Driving License Number</Label>
                            <Input
                              id="licenseNumber"
                              name="licenseNumber"
                              placeholder="DL123456789"
                              className="py-3 border-2 border-gray-200 focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20"
                              value={formData.licenseNumber}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </>
                      )}

                      <div className="flex items-center space-x-3 p-4 bg-[color:var(--color-accent)]/10 rounded-lg border border-[color:var(--color-primary)]/20">
                        <Checkbox
                          id="terms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                          }
                          className="border-[color:var(--color-primary)] data-[state=checked]:bg-[color:var(--color-primary)] w-4 h-4 sm:w-5 sm:h-5"
                        />
                        <Label htmlFor="terms" className="text-sm text-gray-700">
                          I agree to the{" "}
                          <Link href="/terms" className="text-[color:var(--color-primary)] hover:underline font-medium">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-[color:var(--color-primary)] hover:underline font-medium">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent)] hover:from-[color:var(--color-accent)] hover:to-[color:var(--color-primary)] text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={!formData.agreeToTerms}
                      >
                        Create {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Account
                      </Button>
                    </form>

                    <div className="mt-8 text-center">
                      <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[color:var(--color-primary)] hover:underline font-medium">
                          Sign in
                        </Link>
                      </p>
                    </div>

                    <div className="mt-8">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white text-gray-500">Or continue with</span>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-[color:var(--color-primary)]/30 transition-colors">
                          <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
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
                        <Button variant="outline" className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-[color:var(--color-primary)]/30 transition-colors">
                          <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                          Facebook
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
