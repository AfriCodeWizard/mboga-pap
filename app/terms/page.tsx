"use client"

import Link from "next/link"
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Scale, Users, Shield, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Head from "next/head";

export default function TermsOfServicePage() {
  return (
    <>
      <Head>
        <title>Terms of Service | Mbonga Pap!</title>
        <meta name="description" content="Read the terms of service for Mbonga Pap! to understand your rights and responsibilities when using our platform." />
        <meta property="og:title" content="Terms of Service | Mbonga Pap!" />
        <meta property="og:description" content="Read the terms of service for Mbonga Pap! to understand your rights and responsibilities when using our platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mbongapap.co.ke/terms" />
        <meta property="og:image" content="/placeholder.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms of Service | Mbonga Pap!" />
        <meta name="twitter:description" content="Read the terms of service for Mbonga Pap! to understand your rights and responsibilities when using our platform." />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Scale className="h-10 w-10 text-[color:var(--color-primary)]" />
            </div>
            <h1 className="text-4xl font-bold text-[color:var(--color-primary)] mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Understanding your rights and responsibilities when using our platform.
            </p>
          </div>

          {/* Terms Content */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-6">
                  Welcome to Mbonga Pap! These Terms of Service ("Terms") govern your use of the Mbonga Pap! mobile application
                  and website (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these
                  Terms. If you do not agree to these Terms, please do not use the Services.
                </p>

                <div className="space-y-8">
                  <section>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-[color:var(--color-primary)]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">1. Acceptance of Terms</h2>
                    </div>
                    <p className="text-gray-700 mb-4">
                      By creating an account, accessing, or using the Services, you affirm that you are at least 18 years old and
                      are legally capable of entering into this agreement. If you are accessing or using the Services on behalf of a
                      company or other legal entity, you represent that you have the authority to bind such entity to these Terms.
                    </p>
                  </section>

                  <section>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-[color:var(--color-accent)]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">2. Changes to Terms</h2>
                    </div>
                    <p className="text-gray-700 mb-4">
                      We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new
                      Terms on this page and updating the "Last Updated" date. Your continued use of the Services after any such
                      changes constitutes your acceptance of the new Terms.
                    </p>
                  </section>

                  <section>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-[color:var(--color-primary)]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">3. User Accounts</h2>
                    </div>
                    <p className="text-gray-700 mb-4">
                      To access certain features of the Services, you may be required to create an account. You agree to provide
                      accurate, current, and complete information during the registration process and to update such information to
                      keep it accurate, current, and complete. You are responsible for safeguarding your password and for any
                      activities or actions under your account.
                    </p>
                  </section>

                  <section>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-[color:var(--color-accent)]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">4. Prohibited Conduct</h2>
                    </div>
                    <p className="text-gray-700 mb-4">You agree not to engage in any of the following prohibited activities:</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <Card className="border-red-200 bg-red-50">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2 text-lg text-red-700">
                            <AlertTriangle className="h-5 w-5" />
                            <span>Illegal Activities</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-red-600 text-sm">
                            Using the Services for any illegal purpose or in violation of any local, state, national, or international law.
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-red-200 bg-red-50">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2 text-lg text-red-700">
                            <AlertTriangle className="h-5 w-5" />
                            <span>Impersonation</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-red-600 text-sm">
                            Impersonating any person or entity, or falsely stating or otherwise misrepresenting your affiliation with a person or entity.
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-red-200 bg-red-50">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2 text-lg text-red-700">
                            <AlertTriangle className="h-5 w-5" />
                            <span>Service Interference</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-red-600 text-sm">
                            Interfering with or disrupting the integrity or performance of the Services or data contained therein.
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-red-200 bg-red-50">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2 text-lg text-red-700">
                            <AlertTriangle className="h-5 w-5" />
                            <span>Unauthorized Access</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-red-600 text-sm">
                            Attempting to gain unauthorized access to the Services or its related systems or networks.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center">
                        <Shield className="h-5 w-5 text-[color:var(--color-primary)]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">5. Disclaimers</h2>
                    </div>
                    <p className="text-gray-700 mb-4">
                      The Services are provided "as is" and "as available" without any warranties of any kind, either express or
                      implied, including, but not limited to, implied warranties of merchantability, fitness for a particular
                      purpose, or non-infringement. We do not warrant that the Services will be uninterrupted, error-free, or
                      secure.
                    </p>
                  </section>

                  <section>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center">
                        <Scale className="h-5 w-5 text-[color:var(--color-accent)]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">6. Limitation of Liability</h2>
                    </div>
                    <p className="text-gray-700 mb-4">
                      To the fullest extent permitted by applicable law, Mbonga Pap! shall not be liable for any indirect,
                      incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred
                      directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a)
                      your access to or use of or inability to access or use the Services; (b) any conduct or content of any third
                      party on the Services; or (c) unauthorized access, use, or alteration of your transmissions or content.
                    </p>
                  </section>

                  <section>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-[color:var(--color-primary)]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">7. Governing Law</h2>
                    </div>
                    <p className="text-gray-700 mb-4">
                      These Terms shall be governed and construed in accordance with the laws of Kenya, without regard to its
                      conflict of law provisions.
                    </p>
                  </section>

                  <section>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-[color:var(--color-accent)]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">8. Contact Us</h2>
                    </div>
                    <p className="text-gray-700 mb-4">If you have any questions about these Terms, please contact us at:</p>
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
                <h2 className="text-2xl font-bold text-[color:var(--color-primary)] mb-4">Questions About Terms?</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Our team is here to help you understand our terms and conditions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" passHref>
                    <Button className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/90 text-lg px-8 py-3 shadow-lg">
                      Contact Us
                    </Button>
                  </Link>
                  <Link href="/privacy" passHref>
                    <Button variant="outline" className="border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white text-lg px-8 py-3">
                      View Privacy Policy
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
