"use client"

import Head from "next/head"
import Link from "next/link"
import { Store, DollarSign, BarChart2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VendorResourcesPage() {
  return (
    <>
      <Head>
        <title>Vendor Resources | Mboga Pap!</title>
        <meta name="description" content="Everything you need to succeed as a MamaMboga on Mboga Pap! Guides, payments, marketing tips, and community support." />
        <meta property="og:title" content="Vendor Resources | Mboga Pap!" />
        <meta property="og:description" content="Everything you need to succeed as a MamaMboga on Mboga Pap! Guides, payments, marketing tips, and community support." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mbongapap.co.ke/vendor-resources" />
        <meta property="og:image" content="/placeholder.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vendor Resources | Mboga Pap!" />
        <meta name="twitter:description" content="Everything you need to succeed as a MamaMboga on Mboga Pap! Guides, payments, marketing tips, and community support." />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          {/* Back to Home */}
          <div className="mb-8">
            <Link href="/" className="underline text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] transition-colors">← Back to Home</Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[color:var(--color-primary)] mb-4">Vendor Resources</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Resources and guides for vendors.</p>
          </div>

          {/* Resource Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Store className="h-6 w-6 text-[color:var(--color-primary)]" />
                  <span>Getting Started Guide</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">A step-by-step guide to setting up your vendor profile and store.</p>
                <Link href="/vendor-resources/getting-started" className="text-[color:var(--color-primary)] hover:underline text-sm font-medium mt-2 block">
                  Read Guide →
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <DollarSign className="h-6 w-6 text-[color:var(--color-accent)]" />
                  <span>Payment & Earnings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Understand how you get paid, commission rates, and payment schedules.</p>
                <Link href="/vendor-resources/payments" className="text-[color:var(--color-primary)] hover:underline text-sm font-medium mt-2 block">
                  Learn More →
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <BarChart2 className="h-6 w-6 text-blue-500" />
                  <span>Sales & Marketing Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Strategies to boost your sales and attract more customers.</p>
                <Link href="/vendor-resources/marketing" className="text-[color:var(--color-primary)] hover:underline text-sm font-medium mt-2 block">
                  Explore Tips →
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Users className="h-6 w-6 text-[color:var(--color-primary)]" />
                  <span>Community & Support</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Connect with other vendors and get support from our team.</p>
                <Link href="/partner-support" className="text-[color:var(--color-primary)] hover:underline text-sm font-medium mt-2 block">
                  Get Support →
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-[color:var(--color-accent)]/10 to-[color:var(--color-primary)]/10 border-[color:var(--color-accent)]/20 inline-block">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-[color:var(--color-primary)] mb-4">Ready to Grow Your Business?</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Join our thriving community of local vendors and reach more customers today!
                </p>
                <Link href="/signup?role=vendor" passHref>
                  <Button className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/90 text-lg px-8 py-3 shadow-lg">
                    Become a Vendor
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
