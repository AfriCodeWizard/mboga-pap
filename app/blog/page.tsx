"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Head from "next/head";

export default function BlogPage() {
  const blogPosts = [
    {
      title: "The Rise of MamaMbogas: Empowering Local Economies",
      date: "July 10, 2024",
      category: "Community",
      excerpt: "Discover how local vegetable vendors are transforming urban food supply chains with Mbonga Pap!.",
      href: "/blog/post-1",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Farm to Fork: Ensuring Freshness with Every Delivery",
      date: "June 25, 2024",
      category: "Food & Health",
      excerpt:
        "Learn about our rigorous quality checks and fast delivery process that brings farm-fresh produce to your door.",
      href: "/blog/post-2",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Meet Our Riders: The Heroes of Urban Delivery",
      date: "June 15, 2024",
      category: "Logistics",
      excerpt: "A spotlight on the dedicated bodaboda riders who make fast and reliable deliveries possible.",
      href: "/blog/post-3",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <>
      <Head>
        <title>Mbonga Pap! Blog - Community, Fresh Food, and Stories</title>
        <meta name="description" content="Read the latest stories, tips, and news from the Mbonga Pap! community. Discover how local vendors, riders, and customers are making a difference." />
        <meta property="og:title" content="Mbonga Pap! Blog - Community, Fresh Food, and Stories" />
        <meta property="og:description" content="Read the latest stories, tips, and news from the Mbonga Pap! community. Discover how local vendors, riders, and customers are making a difference." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mbongapap.co.ke/blog" />
        <meta property="og:image" content="/placeholder.jpg" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
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
            <h1 className="text-4xl font-bold text-[color:var(--color-primary)] mb-4">Our Blog</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Insights, stories, and updates from the Mbonga Pap! community.
            </p>
          </div>

          {/* Blog Posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 group hover:scale-105">
                <Link href={post.href} passHref>
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                    <Tag className="h-4 w-4 ml-4 mr-1" />
                    <span>{post.category}</span>
                  </div>
                  <Link href={post.href} passHref>
                    <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-2 hover:text-[color:var(--color-accent)] transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <Link href={post.href} passHref>
                    <Button variant="link" className="p-0 h-auto text-[color:var(--color-accent)] hover:text-[color:var(--color-primary)]">
                      Read More →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-[color:var(--color-accent)]/10 to-[color:var(--color-primary)]/10 border-[color:var(--color-accent)]/20 inline-block">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-[color:var(--color-primary)] mb-4">Stay Updated</h2>
                <p className="text-lg text-gray-700 mb-6">Subscribe to our newsletter for the latest news and articles.</p>
                <div className="flex justify-center">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]"
                  />
                  <Button className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)] rounded-l-none">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
