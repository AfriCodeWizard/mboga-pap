"use client"

import Head from "next/head"
import Link from "next/link"
import { ArrowLeft, Bike, DollarSign, Map, Shield, Users, Award, Target, Clock, Phone, Mail, MessageSquare, CheckCircle, TrendingUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RiderResourcesPage() {
  return (
    <>
      <Head>
        <title>Rider Resources | Mbonga Pap!</title>
        <meta name="description" content="Find all the information and resources you need to be a successful Mbonga Pap! rider. Guides, payments, safety, and support." />
        <meta property="og:title" content="Rider Resources | Mbonga Pap!" />
        <meta property="og:description" content="Find all the information and resources you need to be a successful Mbonga Pap! rider. Guides, payments, safety, and support." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mbongapap.co.ke/rider-resources" />
        <meta property="og:image" content="/placeholder.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rider Resources | Mbonga Pap!" />
        <meta name="twitter:description" content="Find all the information and resources you need to be a successful Mbonga Pap! rider. Guides, payments, safety, and support." />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Back to Home Link */}
          <div className="mb-8">
            <Link href="/" passHref>
              <Button variant="ghost" className="text-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]/80 hover:bg-[color:var(--color-primary)]/10">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bike className="h-10 w-10 text-[color:var(--color-primary)]" />
            </div>
            <h1 className="text-4xl font-bold text-[color:var(--color-primary)] mb-4">Rider Resources</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to succeed as a Mbonga Pap rider. Guides, tools, and support to help you thrive.
            </p>
          </div>

          {/* Mission Section */}
          <Card className="mb-12 bg-gradient-to-r from-[color:var(--color-primary)]/5 to-[color:var(--color-accent)]/5 border-[color:var(--color-primary)]/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Target className="h-16 w-16 text-[color:var(--color-primary)] mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-[color:var(--color-primary)] mb-4">Your Success is Our Priority</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                As a Mbonga Pap rider, you're not just delivering groceries – you're connecting communities, 
                supporting local businesses, and building a sustainable future. We provide comprehensive resources, 
                training, and support to ensure your success and growth in our platform.
          </p>
            </CardContent>
          </Card>

          {/* Resource Categories */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center">
                    <Bike className="h-6 w-6 text-[color:var(--color-primary)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-2">Getting Started Guide</h3>
                    <p className="text-gray-600 mb-3">A comprehensive guide to signing up, completing your first delivery, and maximizing your earnings.</p>
                  <Link
                    href="/rider-resources/getting-started"
                      className="text-[color:var(--color-accent)] hover:underline text-sm font-medium"
                  >
                      Read Guide →
                  </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-[color:var(--color-accent)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-2">Earnings & Payments</h3>
                    <p className="text-gray-600 mb-3">Understand how much you can earn, payment schedules, and how to request payouts.</p>
                    <Link href="/rider-resources/payments" className="text-[color:var(--color-accent)] hover:underline text-sm font-medium">
                      Learn More →
                  </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center">
                    <Map className="h-6 w-6 text-[color:var(--color-primary)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-2">Navigation & App Usage</h3>
                    <p className="text-gray-600 mb-3">Master the rider app, optimize your routes, and deliver efficiently.</p>
                    <Link href="/rider-resources/app-usage" className="text-[color:var(--color-accent)] hover:underline text-sm font-medium">
                      Explore Tips →
                  </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-[color:var(--color-accent)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-2">Safety & Support</h3>
                    <p className="text-gray-600 mb-3">Important safety guidelines and how to get help when you need it.</p>
                    <Link href="/partner-support" className="text-[color:var(--color-accent)] hover:underline text-sm font-medium">
                      Get Support →
                  </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Section */}
          <Card className="mb-12 bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-primary)] text-white">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Rider Success Stories</h2>
                <p className="text-lg opacity-90">Join thousands of successful riders earning with Mbonga Pap</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[color:var(--color-accent)] mb-2">500+</div>
                  <div className="text-sm opacity-90">Active Riders</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[color:var(--color-accent)] mb-2">KSh 25K</div>
                  <div className="text-sm opacity-90">Avg. Monthly Earnings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[color:var(--color-accent)] mb-2">4.9★</div>
                  <div className="text-sm opacity-90">Customer Rating</div>
                </div>
          <div className="text-center">
                  <div className="text-3xl font-bold text-[color:var(--color-accent)] mb-2">98%</div>
                  <div className="text-sm opacity-90">On-Time Delivery</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Support Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-[color:var(--color-primary)]" />
                </div>
                <h3 className="text-lg font-semibold text-[color:var(--color-primary)] mb-2">Call Support</h3>
                <p className="text-gray-600 text-sm mb-3">Speak directly with our rider support team</p>
                <p className="text-[color:var(--color-accent)] font-medium">+254 700 123 456</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-[color:var(--color-accent)]" />
                </div>
                <h3 className="text-lg font-semibold text-[color:var(--color-primary)] mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm mb-3">Get detailed assistance via email</p>
                <p className="text-[color:var(--color-accent)] font-medium">riders@mbongapap.co.ke</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-[color:var(--color-primary)]" />
                </div>
                <h3 className="text-lg font-semibold text-[color:var(--color-primary)] mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm mb-3">Chat with support in real-time</p>
                <p className="text-[color:var(--color-accent)] font-medium">Available 24/7</p>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-[color:var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-2">Flexible Earnings</h3>
                <p className="text-gray-600">
                  Work on your own schedule and earn based on your performance. The more you deliver, the more you earn.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-[color:var(--color-accent)]" />
                </div>
                <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-2">Achievement Rewards</h3>
                <p className="text-gray-600">
                  Complete challenges and earn bonuses. Our gamified system rewards consistent performance and excellence.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-[color:var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-2">Community Support</h3>
                <p className="text-gray-600">
                  Join our rider community for tips, support, and networking opportunities with fellow riders.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-[color:var(--color-primary)]/5 to-[color:var(--color-accent)]/5 border-[color:var(--color-primary)]/20">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-[color:var(--color-primary)]" />
              </div>
              <h2 className="text-3xl font-bold text-[color:var(--color-primary)] mb-4">Ready to Start Earning?</h2>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                Join our team of dedicated riders and make a difference in your community while building a sustainable income!
            </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?role=rider" passHref>
                  <Button className="bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent)] hover:from-[color:var(--color-accent)] hover:to-[color:var(--color-primary)] text-white text-lg px-8 py-3 shadow-lg transition-all duration-300">
                Become a Rider
              </Button>
            </Link>
                <Link href="/help" passHref>
                  <Button variant="outline" className="border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white text-lg px-8 py-3 transition-all duration-300">
                    Get Help
                  </Button>
                </Link>
          </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
