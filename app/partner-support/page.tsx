"use client"

import Link from "next/link"
import { ArrowLeft, Headset, Mail, Phone, MessageSquare, BookOpen, Users, Award, Target, Clock, CheckCircle, Star, Shield, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PartnerSupportPage() {
  return (
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
            <Headset className="h-10 w-10 text-[color:var(--color-primary)]" />
          </div>
          <h1 className="text-4xl font-bold text-[color:var(--color-primary)] mb-4">Partner Support</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help our vendors and riders succeed. Get the support you need to grow your business with Mbonga Pap
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
              Whether you're a vendor looking to expand your reach or a rider building your delivery business, 
              our dedicated support team is here to help you succeed. We provide comprehensive assistance, 
              training resources, and ongoing support to ensure your growth and success on our platform.
            </p>
          </CardContent>
        </Card>

        {/* Support Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-[color:var(--color-primary)]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-2">Live Chat Support</h3>
                  <p className="text-gray-600 mb-3">Get immediate assistance from our support agents. Available 24/7 for urgent matters.</p>
                  <Button className="bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent)] hover:from-[color:var(--color-accent)] hover:to-[color:var(--color-primary)] text-white">
                    <MessageSquare className="mr-2 h-4 w-4" /> Start Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-[color:var(--color-accent)]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-2">Email Support</h3>
                  <p className="text-gray-600 mb-3">Send us detailed inquiries and we'll respond within 24 hours.</p>
                  <Link href="mailto:support@mbongapap.co.ke" passHref>
                    <Button variant="outline" className="border-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)]/10">
                      <Mail className="mr-2 h-4 w-4" /> Email Us
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-[color:var(--color-primary)]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-2">Phone Support</h3>
                  <p className="text-gray-600 mb-3">Speak directly with a support representative during business hours.</p>
                  <Link href="tel:+254700123456" passHref>
                    <Button variant="outline" className="border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/10">
                      <Phone className="mr-2 h-4 w-4" /> Call Us
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-[color:var(--color-accent)]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-2">Help Center</h3>
                  <p className="text-gray-600 mb-3">Browse our comprehensive knowledge base and FAQs.</p>
                  <Link href="/help" passHref>
                    <Button variant="outline" className="border-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)]/10">
                      <BookOpen className="mr-2 h-4 w-4" /> Browse Articles
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <Card className="mb-12 bg-gradient-to-r from-[color:var(--color-primary)]/5 to-[color:var(--color-accent)]/5 border-[color:var(--color-primary)]/20">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[color:var(--color-primary)] mb-4">Support by the Numbers</h2>
              <p className="text-gray-600">Our commitment to your success</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-8 w-8 text-[color:var(--color-primary)]" />
                </div>
                <p className="text-2xl font-bold text-[color:var(--color-primary)]">24/7</p>
                <p className="text-sm text-gray-600">Support Available</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-8 w-8 text-[color:var(--color-accent)]" />
                </div>
                <p className="text-2xl font-bold text-[color:var(--color-primary)]">98%</p>
                <p className="text-sm text-gray-600">Satisfaction Rate</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-8 w-8 text-[color:var(--color-primary)]" />
                </div>
                <p className="text-2xl font-bold text-[color:var(--color-primary)]">4.9</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-[color:var(--color-accent)]" />
                </div>
                <p className="text-2xl font-bold text-[color:var(--color-primary)]">500+</p>
                <p className="text-sm text-gray-600">Partners Supported</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Partner Benefits */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-[color:var(--color-primary)] text-center">Why Choose Our Support?</CardTitle>
            <CardDescription className="text-center">Comprehensive assistance designed for your success</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-[color:var(--color-primary)]" />
                </div>
                <h3 className="font-semibold text-[color:var(--color-primary)] mb-2">Expert Guidance</h3>
                <p className="text-sm text-gray-600">Get advice from experienced professionals who understand your business needs.</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-[color:var(--color-accent)]" />
                </div>
                <h3 className="font-semibold text-[color:var(--color-primary)] mb-2">Growth Support</h3>
                <p className="text-sm text-gray-600">Access resources and tools to help scale your business effectively.</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-[color:var(--color-primary)]" />
                </div>
                <h3 className="font-semibold text-[color:var(--color-primary)] mb-2">Recognition</h3>
                <p className="text-sm text-gray-600">Earn rewards and recognition for your outstanding performance.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent)] text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join our community of successful partners and start growing your business today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" passHref>
                <Button size="lg" className="bg-white text-[color:var(--color-primary)] hover:bg-gray-100">
                  Become a Partner
                </Button>
              </Link>
              <Link href="/contact" passHref>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[color:var(--color-primary)]">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
