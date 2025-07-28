"use client"

import Head from "next/head"
import Link from "next/link"
import { Briefcase, Users, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CareersPage() {
  return (
    <>
      <Head>
        <title>Careers at Mbonga Pap!</title>
        <meta name="description" content="Join the Mbonga Pap! team and help us build a better future for local communities. See open positions and learn about our culture." />
        <meta property="og:title" content="Careers at Mbonga Pap!" />
        <meta property="og:description" content="Join the Mbonga Pap! team and help us build a better future for local communities. See open positions and learn about our culture." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mbongapap.co.ke/careers" />
        <meta property="og:image" content="/placeholder.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Careers at Mbonga Pap!" />
        <meta name="twitter:description" content="Join the Mbonga Pap! team and help us build a better future for local communities. See open positions and learn about our culture." />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          {/* Back to Home */}
          <div className="mb-8">
            <Link href="/" className="underline text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] transition-colors">← Back to Home</Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[color:var(--color-primary)] mb-4">Careers at Mbonga Pap!</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our passionate team and help us build a better future for local communities.
            </p>
          </div>

          {/* Why Work With Us */}
          <Card className="mb-10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[color:var(--color-primary)] mb-4">Why Work With Us?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-[color:var(--color-primary)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[color:var(--color-primary)] mb-2">Impactful Work</h3>
                  <p className="text-gray-600">Contribute directly to empowering local businesses and improving lives.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="h-8 w-8 text-[color:var(--color-accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[color:var(--color-primary)] mb-2">Innovation & Growth</h3>
                  <p className="text-gray-600">Work in a dynamic environment that encourages creativity and professional development.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-8 w-8 text-[color:var(--color-primary)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[color:var(--color-primary)] mb-2">Vibrant Culture</h3>
                  <p className="text-gray-600">Be part of a supportive and collaborative team that values diversity and inclusion.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Openings */}
          <Card className="mb-10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[color:var(--color-primary)] mb-4">Current Openings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-[color:var(--color-primary)]">Software Engineer (Frontend)</h3>
                      <p className="text-gray-600">Nairobi, Kenya • Full-time</p>
                    </div>
                    <Link href="/careers/software-engineer-frontend" passHref>
                      <Button
                        variant="outline"
                        className="text-[color:var(--color-primary)] border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/10 bg-transparent"
                      >
                        Apply
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-[color:var(--color-primary)]">Operations Manager</h3>
                      <p className="text-gray-600">Nairobi, Kenya • Full-time</p>
                    </div>
                    <Link href="/careers/operations-manager" passHref>
                      <Button
                        variant="outline"
                        className="text-[color:var(--color-primary)] border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/10 bg-transparent"
                      >
                        Apply
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-[color:var(--color-accent)]/10 to-[color:var(--color-primary)]/10 border-[color:var(--color-accent)]/20 inline-block">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-[color:var(--color-primary)] mb-4">Don't See Your Role?</h2>
                <p className="text-lg text-gray-700 mb-6">We're always looking for passionate people. Reach out and tell us how you can make a difference!</p>
                <Link href="/contact" className="underline text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] transition-colors text-lg font-medium">Contact Us</Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
