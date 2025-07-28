"use client"

import Link from "next/link"
import { ArrowLeft, Shield, Lock, Eye, FileText, User, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Head from "next/head";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Mbonga Pap!</title>
        <meta name="description" content="Read the privacy policy for Mbonga Pap! to learn how we collect, use, and protect your information." />
        <meta property="og:title" content="Privacy Policy | Mbonga Pap!" />
        <meta property="og:description" content="Read the privacy policy for Mbonga Pap! to learn how we collect, use, and protect your information." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mbongapap.co.ke/privacy" />
        <meta property="og:image" content="/placeholder.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy | Mbonga Pap!" />
        <meta name="twitter:description" content="Read the privacy policy for Mbonga Pap! to learn how we collect, use, and protect your information." />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-10 w-10 text-[color:var(--color-primary)]" />
            </div>
            <h1 className="text-4xl font-bold text-[color:var(--color-primary)] mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </div>

          {/* Policy Content */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-6">
                  At Mbonga Pap!, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your information when you visit our mobile application (the "App") and our website
                  (collectively, the "Services"). Please read this privacy policy carefully. If you do not agree with the terms
                  of this privacy policy, please do not access the Services.
                </p>

                <div className="space-y-8">
                  <section>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-[color:var(--color-primary)]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">1. Information We Collect</h2>
                    </div>
                    <p className="text-gray-700 mb-4">
                      We may collect information about you in a variety of ways. The information we may collect via the Services
                      depends on the content and materials you use, and includes:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <Card className="border-[color:var(--color-primary)]/20">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2 text-lg">
                            <User className="h-5 w-5 text-[color:var(--color-primary)]" />
                            <span>Personal Data</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-sm">
                            Demographic and other personally identifiable information (such as your name, email address, phone number,
                            delivery address, and payment information) that you voluntarily give to us when you register with the App or
                            website, or when you choose to participate in various activities related to the Services.
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-[color:var(--color-primary)]/20">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2 text-lg">
                            <Eye className="h-5 w-5 text-[color:var(--color-primary)]" />
                            <span>Derivative Data</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-sm">
                            Information our servers automatically collect when you access the Services, such as your IP address, your
                            browser type, your operating system, your access times, and the pages you have viewed directly before and
                            after accessing the Services.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center">
                        <Lock className="h-5 w-5 text-[color:var(--color-accent)]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">2. Use of Your Information</h2>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Having accurate information about you permits us to provide you with a smooth, efficient, and customized
                      experience. Specifically, we may use information collected about you via the Services to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>Create and manage your account.</li>
                      <li>Deliver products and services to you.</li>
                      <li>Process payments and refunds.</li>
                      <li>Enable user-to-user communications.</li>
                      <li>Request feedback and contact you about your use of the Services.</li>
                      <li>Resolve disputes and troubleshoot problems.</li>
                      <li>Respond to product and customer service requests.</li>
                    </ul>
                  </section>

                  <section>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center">
                        <Shield className="h-5 w-5 text-[color:var(--color-primary)]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">3. Security of Your Information</h2>
                    </div>
                    <p className="text-gray-700 mb-4">
                      We use administrative, technical, and physical security measures to help protect your personal information.
                      While we have taken reasonable steps to secure the personal information you provide to us, please be aware
                      that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission
                      can be guaranteed against any interception or other type of misuse.
                    </p>
                  </section>

                  <section>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-[color:var(--color-accent)]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">4. Contact Us</h2>
                    </div>
                    <p className="text-gray-700 mb-4">
                      If you have questions or comments about this Privacy Policy, please contact us at:
                    </p>
                    <div className="bg-[color:var(--color-primary)]/5 p-4 rounded-lg border border-[color:var(--color-primary)]/20">
                      <p className="text-[color:var(--color-primary)] font-medium">Email: hello@mbongapap.co.ke</p>
                    </div>
                  </section>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-[color:var(--color-accent)]/10 to-[color:var(--color-primary)]/10 border-[color:var(--color-accent)]/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-[color:var(--color-primary)] mb-4">Questions About Privacy?</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Our team is here to help you understand how we protect your data and privacy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" passHref>
                    <Button className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/90 text-lg px-8 py-3 shadow-lg">
                      Contact Us
                    </Button>
                  </Link>
                  <Link href="/terms" passHref>
                    <Button variant="outline" className="border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white text-lg px-8 py-3">
                      View Terms of Service
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
