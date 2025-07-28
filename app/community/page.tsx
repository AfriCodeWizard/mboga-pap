"use client"

import Link from "next/link"
import { ArrowLeft, Users, Heart, Handshake, MessageCircle, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Head from "next/head";

export default function CommunityGuidelinesPage() {
  return (
    <>
      <Head>
        <title>Community Guidelines | Mbonga Pap!</title>
        <meta name="description" content="Read the community guidelines for Mbonga Pap! to ensure a safe, respectful, and thriving environment for everyone." />
        <meta property="og:title" content="Community Guidelines | Mbonga Pap!" />
        <meta property="og:description" content="Read the community guidelines for Mbonga Pap! to ensure a safe, respectful, and thriving environment for everyone." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mbongapap.co.ke/community" />
        <meta property="og:image" content="/placeholder.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Community Guidelines | Mbonga Pap!" />
        <meta name="twitter:description" content="Read the community guidelines for Mbonga Pap! to ensure a safe, respectful, and thriving environment for everyone." />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          {/* Back to Home */}
          <div className="mb-8">
            <Link href="/" passHref>
              <Button variant="ghost" className="text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)]">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-10 w-10 text-[color:var(--color-primary)]" />
            </div>
            <h1 className="text-4xl font-bold text-[color:var(--color-primary)] mb-4">Community Guidelines</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fostering a safe, respectful, and thriving environment for everyone.
            </p>
          </div>

          {/* Core Values */}
          <Card className="mb-10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[color:var(--color-primary)] mb-4">Our Core Values</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-[color:var(--color-primary)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[color:var(--color-primary)] mb-2">Respect</h3>
                  <p className="text-gray-600">Treat everyone with kindness and dignity.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-[color:var(--color-accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[color:var(--color-primary)] mb-2">Integrity</h3>
                  <p className="text-gray-600">Be honest and transparent in all your interactions.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Handshake className="h-8 w-8 text-[color:var(--color-primary)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[color:var(--color-primary)] mb-2">Collaboration</h3>
                  <p className="text-gray-600">Work together to build a stronger community.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="mb-10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[color:var(--color-primary)] mb-4">Guidelines for All Users</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
                <li><span className="font-semibold">Be Respectful:</span> No harassment, hate speech, discrimination, or bullying of any kind.</li>
                <li><span className="font-semibold">Be Honest:</span> Provide accurate information in your profiles, listings, and reviews.</li>
                <li><span className="font-semibold">Communicate Clearly:</span> Use clear and polite language in all communications.</li>
                <li><span className="font-semibold">Ensure Safety:</span> Prioritize safety in all interactions, especially during deliveries.</li>
                <li><span className="font-semibold">Report Concerns:</span> If you see something, say something. Report any violations or suspicious activity.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Report a Violation CTA */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-[color:var(--color-accent)]/10 to-[color:var(--color-primary)]/10 border-[color:var(--color-accent)]/20 inline-block">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-[color:var(--color-primary)] mb-4">Report a Violation</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Help us maintain a safe community. If you encounter any behavior that violates these guidelines, please report it.
                </p>
                <Link href="/contact" passHref>
                  <Button className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/90 text-lg px-8 py-3 shadow-lg">
                    <MessageCircle className="mr-2 h-5 w-5" /> Report an Issue
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
