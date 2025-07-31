"use client"

import Head from "next/head"
import Link from "next/link"
import { ArrowLeft, Newspaper, Megaphone, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PressPage() {
  return (
    <>
      <Head>
        <title>Press & Media | Mboga Pap!</title>
        <meta name="description" content="Read the latest news, press releases, and media mentions about Mboga Pap! Download our media kit and contact our press team." />
        <meta property="og:title" content="Press & Media | Mboga Pap!" />
        <meta property="og:description" content="Read the latest news, press releases, and media mentions about Mboga Pap! Download our media kit and contact our press team." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mbongapap.co.ke/press" />
        <meta property="og:image" content="/placeholder.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Press & Media | Mboga Pap!" />
        <meta name="twitter:description" content="Read the latest news, press releases, and media mentions about Mboga Pap! Download our media kit and contact our press team." />
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
            <h1 className="text-4xl font-bold text-[color:var(--color-primary)] mb-4">Press & Media</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Latest news, press releases, and media mentions about Mboga Pap!
            </p>
          </div>

          {/* Press Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Newspaper className="h-6 w-6 text-[color:var(--color-primary)]" />
                  <span>Press Releases</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Official announcements and updates from Mboga Pap!</p>
                <Link href="/press/releases" className="text-[color:var(--color-accent)] hover:underline text-sm font-medium">
                  View All Releases →
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Megaphone className="h-6 w-6 text-[color:var(--color-accent)]" />
                  <span>Media Mentions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">See what the media is saying about our impact and growth.</p>
                <Link href="/press/mentions" className="text-[color:var(--color-accent)] hover:underline text-sm font-medium">
                  Read Articles →
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Award className="h-6 w-6 text-blue-500" />
                  <span>Awards & Recognition</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Our achievements and milestones in the community and tech space.</p>
                <Link href="/press/awards" className="text-[color:var(--color-accent)] hover:underline text-sm font-medium">
                  Discover More →
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <img src="/placeholder.svg?height=40&width=40" alt="Media Kit" className="h-6 w-6" />
                  <span>Media Kit</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Download our brand assets, logos, and company information.</p>
                <Link href="/press/media-kit" className="text-[color:var(--color-accent)] hover:underline text-sm font-medium">
                  Download Kit →
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Press Inquiries CTA */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-[color:var(--color-accent)]/10 to-[color:var(--color-primary)]/10 border-[color:var(--color-accent)]/20 inline-block">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-[color:var(--color-primary)] mb-4">Press Inquiries</h2>
                <p className="text-lg text-gray-700 mb-6">
                  For media inquiries, interviews, or partnership opportunities, please contact our press team.
                </p>
                <Link href="mailto:press@mbongapap.co.ke" passHref>
                  <Button className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/90 text-lg px-8 py-3 shadow-lg">
                    Contact Press
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
