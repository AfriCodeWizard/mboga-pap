"use client"

import Link from "next/link"
import { Sparkles, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Head from "next/head";

export default function OurStoryPage() {
  return (
    <>
      <Head>
        <title>Our Story | Mbonga Pap!</title>
        <meta name="description" content="Discover the journey of Mbonga Pap! From a simple idea to a thriving, community-driven platform connecting customers, vendors, and riders in Nairobi." />
        <meta property="og:title" content="Our Story | Mbonga Pap!" />
        <meta property="og:description" content="Discover the journey of Mbonga Pap! From a simple idea to a thriving, community-driven platform connecting customers, vendors, and riders in Nairobi." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mbongapap.co.ke/story" />
        <meta property="og:image" content="/placeholder.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Story | Mbonga Pap!" />
        <meta name="twitter:description" content="Discover the journey of Mbonga Pap! From a simple idea to a thriving, community-driven platform connecting customers, vendors, and riders in Nairobi." />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          {/* Back to Home */}
          <div className="mb-8">
            <Link href="/" className="underline text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] transition-colors">← Back to Home</Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[color:var(--color-primary)] mb-4">Our Story</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">How Mbonga Pap started and grew.</p>
          </div>

          {/* Story Timeline */}
          <Card className="mb-10">
            <CardContent>
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row items-center md:space-x-8">
                  <div className="md:w-1/3 mb-6 md:mb-0 text-center">
                    <Sparkles className="h-16 w-16 text-[color:var(--color-primary)] mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">The Genesis (2022)</h2>
                  </div>
                  <div className="md:w-2/3 text-gray-700 leading-relaxed">
                    Mbonga Pap was born from a simple observation: the incredible dedication of local MamaMbogas and the
                    growing demand for convenient access to fresh produce in urban areas. Our founder, a Nairobi resident,
                    noticed the challenges both vendors and customers faced – limited reach for vendors and time constraints
                    for customers. The idea was simple: bridge this gap with technology.
                  </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse items-center md:space-x-reverse md:space-x-8">
                  <div className="md:w-1/3 mb-6 md:mb-0 text-center">
                    <Sparkles className="h-16 w-16 text-[color:var(--color-accent)] mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">Building & Growing (2023)</h2>
                  </div>
                  <div className="md:w-2/3 text-gray-700 leading-relaxed">
                    We started with a small team, a big vision, and a lot of passion. Our initial focus was on building a
                    user-friendly platform that respected the traditional market experience while adding the convenience of
                    online ordering and fast delivery. We partnered with a few pioneering MamaMbogas and bodaboda riders,
                    learning and iterating based on their invaluable feedback. Word-of-mouth spread, and our community began
                    to grow.
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:space-x-8">
                  <div className="md:w-1/3 mb-6 md:mb-0 text-center">
                    <Heart className="h-16 w-16 text-[color:var(--color-primary)] mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">The Future (Today & Beyond)</h2>
                  </div>
                  <div className="md:w-2/3 text-gray-700 leading-relaxed">
                    Today, Mbonga Pap is a thriving ecosystem connecting thousands of customers with hundreds of MamaMbogas
                    and riders across Nairobi. We are constantly innovating, aiming to expand our reach, introduce new
                    features, and continue empowering local economies. Our heart remains in the community, and we are
                    dedicated to making fresh, local groceries accessible to everyone, while creating sustainable livelihoods.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-[color:var(--color-accent)]/10 to-[color:var(--color-primary)]/10 border-[color:var(--color-accent)]/20 inline-block">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-[color:var(--color-primary)] mb-4">Join Our Journey</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Be a part of our growing community. Whether you're a customer, vendor, or rider, there's a place for you!
                </p>
                <Link href="/signup" passHref>
                  <Button className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/90 text-lg px-8 py-3 shadow-lg">
                    Get Started Today
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
