"use client"

import Head from "next/head"
import Link from "next/link"
import { ArrowLeft, Search, Lightbulb, BookOpen, MessageSquare, HelpCircle, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HelpCenterPage() {
  return (
    <>
      <Head>
        <title>Help Center | Mboga Pap!</title>
        <meta name="description" content="Find answers to your questions and get support at the Mboga Pap! Help Center. Browse FAQs, guides, and contact support." />
        <meta property="og:title" content="Help Center | Mboga Pap!" />
        <meta property="og:description" content="Find answers to your questions and get support at the Mboga Pap! Help Center. Browse FAQs, guides, and contact support." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mbogapap.co.ke/help" />
        <meta property="og:image" content="/placeholder.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Help Center | Mboga Pap!" />
        <meta name="twitter:description" content="Get help with your Mboga Pap! account. Find answers to common questions, contact support, and access helpful resources." />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="h-10 w-10 text-[color:var(--color-primary)]" />
            </div>
            <h1 className="text-4xl font-bold text-[color:var(--color-primary)] mb-4">Help Center</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              How can we assist you today? Find answers to your questions and get the support you need.
            </p>
          </div>

          {/* Search Section */}
          <Card className="mb-12 bg-gradient-to-r from-[color:var(--color-primary)]/5 to-[color:var(--color-accent)]/5 border-[color:var(--color-primary)]/20">
            <CardContent className="p-8">
              <div className="relative max-w-2xl mx-auto">
                <Input
                  type="search"
                  placeholder="Search for articles, FAQs, or topics..."
                  className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-[color:var(--color-primary)]/20 focus:border-[color:var(--color-primary)] transition-colors text-lg"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[color:var(--color-primary)] h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          {/* Help Categories */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-[color:var(--color-primary)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-2">Getting Started</h3>
                    <p className="text-gray-600 mb-3">Learn how to sign up, place orders, and manage your account.</p>
                    <Link href="/help/getting-started" className="text-[color:var(--color-accent)] hover:underline text-sm font-medium">
                      View Articles →
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
                    <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-2">FAQs</h3>
                    <p className="text-gray-600 mb-3">Find answers to frequently asked questions about our services.</p>
                    <Link href="/help/faqs" className="text-[color:var(--color-accent)] hover:underline text-sm font-medium">
                      View FAQs →
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Support Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-[color:var(--color-primary)]" />
                </div>
                <h3 className="text-lg font-semibold text-[color:var(--color-primary)] mb-2">Call Support</h3>
                <p className="text-gray-600 text-sm mb-3">Speak directly with our support team</p>
                <p className="text-[color:var(--color-accent)] font-medium">+254 700 123 456</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-[color:var(--color-accent)]" />
                </div>
                <h3 className="text-lg font-semibold text-[color:var(--color-primary)] mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm mb-3">Send us a detailed message</p>
                <p className="text-[color:var(--color-accent)] font-medium">hello@mbogapap.co.ke</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-[color:var(--color-primary)]" />
                </div>
                <h3 className="text-lg font-semibold text-[color:var(--color-primary)] mb-2">Response Time</h3>
                <p className="text-gray-600 text-sm mb-3">We typically respond within</p>
                <p className="text-[color:var(--color-accent)] font-medium">2-4 hours</p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-[color:var(--color-accent)]/10 to-[color:var(--color-primary)]/10 border-[color:var(--color-accent)]/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-[color:var(--color-primary)] mb-4">Still Need Help?</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Our support team is ready to assist you. Reach out to us directly for personalized help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" passHref>
                    <Button className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/90 text-lg px-8 py-3 shadow-lg">
                      <MessageSquare className="mr-2 h-5 w-5" /> Contact Support
                    </Button>
                  </Link>
                  <Link href="/partner-support" passHref>
                    <Button variant="outline" className="border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white text-lg px-8 py-3">
                      Partner Support
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
