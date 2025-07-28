"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, MessageSquare, Send, Clock, Users, CheckCircle, Headset } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000)
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

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
          <h1 className="text-4xl font-bold text-[color:var(--color-primary)] mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have questions, feedback, or need support, 
            our team is here to help you with all things fresh and fast delivery.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-200">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-[color:var(--color-primary)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[color:var(--color-primary)]">Email Us</h3>
              <p className="text-gray-600 mb-2">hello@mbongapap.co.ke</p>
              <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-200">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[color:var(--color-accent)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-[color:var(--color-accent)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[color:var(--color-primary)]">Call Us</h3>
              <p className="text-gray-600 mb-2">+254 700 123 456</p>
              <p className="text-sm text-gray-500">Mon-Fri, 8AM-6PM EAT</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-200">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[color:var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-[color:var(--color-primary)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[color:var(--color-primary)]">Visit Us</h3>
              <p className="text-gray-600 mb-2">Nairobi, Kenya</p>
              <p className="text-sm text-gray-500">Main office location</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <Card className="border-2 border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-[color:var(--color-primary)]">
                <MessageSquare className="h-5 w-5" />
                <span>Send Us a Message</span>
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-600 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700">
                        Full Name *
                      </Label>
                      <Input 
                        id="name" 
                        name="name"
                        type="text" 
                        placeholder="John Doe" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700">
                        Email Address *
                      </Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        placeholder="john.doe@example.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-gray-700">
                      Subject *
                    </Label>
                    <Input 
                      id="subject" 
                      name="subject"
                      type="text" 
                      placeholder="How can we help you?" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="mt-1" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-gray-700">
                      Message *
                    </Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      placeholder="Tell us more about your inquiry..." 
                      rows={5} 
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="mt-1" 
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:text-[color:var(--color-primary)] transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> 
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="space-y-6">
            <Card className="border-2 border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[color:var(--color-primary)]">
                  <Clock className="h-5 w-5" />
                  <span>Business Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[color:var(--color-primary)]">
                  <Users className="h-5 w-5" />
                  <span>Support Team</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">Customer Support</p>
                    <p className="text-sm text-gray-600">For order issues and general inquiries</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Technical Support</p>
                    <p className="text-sm text-gray-600">For app and website issues</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Business Inquiries</p>
                    <p className="text-sm text-gray-600">For partnerships and collaborations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[color:var(--color-primary)]/5 border-[color:var(--color-primary)]/20 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 text-[color:var(--color-primary)]">Need Immediate Help?</h3>
                <p className="text-gray-700 mb-4">
                  For urgent delivery issues or order problems, please call our support line directly.
                </p>
                <Button className="w-full bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:text-[color:var(--color-primary)] transition-all duration-300">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Support Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <Card className="border-2 border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-[color:var(--color-primary)]">Our Location</CardTitle>
            <CardDescription>
              Visit our main office in Nairobi, Kenya
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg border-2 border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8180000000004!2d36.817223!3d-1.286389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b2979242!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nairobi, Kenya Map Location"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
