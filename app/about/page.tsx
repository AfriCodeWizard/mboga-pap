"use client"

import Link from "next/link"
import { ArrowLeft, Users, Leaf, Handshake, Award, Target, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Head from "next/head";

export default function AboutUsPage() {
  return (
    <>
      <Head>
        <title>About Mbonga Pap! - Our Mission & Community</title>
        <meta name="description" content="Learn about Mbonga Pap! and our mission to connect communities through fresh, local groceries and empower small businesses." />
        <meta property="og:title" content="About Mbonga Pap! - Our Mission & Community" />
        <meta property="og:description" content="Learn about Mbonga Pap! and our mission to connect communities through fresh, local groceries and empower small businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mbongapap.co.ke/about" />
        <meta property="og:image" content="/placeholder.jpg" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[color:var(--color-primary)] mb-4">About Mbonga Pap!</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connecting communities through fresh, local groceries and empowering small businesses across Kenya.
            </p>
          </div>

          {/* Mission Section */}
          <Card className="mb-12 bg-gradient-to-r from-[color:var(--color-primary)]/5 to-[color:var(--color-accent)]/5 border-[color:var(--color-primary)]/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Target className="h-16 w-16 text-[color:var(--color-primary)] mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-[color:var(--color-primary)] mb-4">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                At Mbonga Pap!, our mission is to empower local "MamaMbogas" (vegetable vendors) by providing them with a
                digital platform to reach more customers, while offering urban dwellers convenient access to fresh,
                farm-to-table produce. We believe in fostering strong community ties, supporting small businesses, and
                promoting healthy eating habits across Kenya.
              </p>
            </CardContent>
          </Card>

          {/* Values Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-[color:var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-2">Community Focus</h3>
                <p className="text-gray-600">
                  We build bridges between local vendors, riders, and customers, strengthening the fabric of our
                  communities.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-[color:var(--color-accent)]" />
                </div>
                <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-2">Fresh & Local</h3>
                <p className="text-gray-600">
                  Committed to delivering the freshest produce directly from local markets to your doorstep.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="h-8 w-8 text-[color:var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-2">Empowering Small Businesses</h3>
                <p className="text-gray-600">
                  Providing tools and opportunities for MamaMbogas to thrive in the digital age.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats Section */}
          <Card className="mb-12 bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-primary)] text-white">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
                <p className="text-lg opacity-90">Building stronger communities through technology and local partnerships</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[color:var(--color-accent)] mb-2">2,500+</div>
                  <div className="text-sm opacity-90">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[color:var(--color-accent)] mb-2">150+</div>
                  <div className="text-sm opacity-90">Local Vendors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[color:var(--color-accent)] mb-2">200+</div>
                  <div className="text-sm opacity-90">Active Riders</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[color:var(--color-accent)] mb-2">15,000+</div>
                  <div className="text-sm opacity-90">Deliveries Made</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-[color:var(--color-accent)]/10 to-[color:var(--color-primary)]/10 border-[color:var(--color-accent)]/20">
              <CardContent className="p-8">
                <Heart className="h-16 w-16 text-[color:var(--color-primary)] mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[color:var(--color-primary)] mb-4">Join Our Story</h2>
                <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                  Learn more about our journey, from a simple idea to a thriving platform that's transforming how communities access fresh food.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/story" passHref>
                    <Button className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/90 text-lg px-8 py-3 shadow-lg">
                      Read Our Story
                    </Button>
                  </Link>
                  <Link href="/contact" passHref>
                    <Button variant="outline" className="border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white text-lg px-8 py-3">
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
