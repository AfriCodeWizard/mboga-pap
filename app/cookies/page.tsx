import Head from "next/head"
import Link from "next/link"
import { ArrowLeft, Cookie, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CookiesPage() {
  return (
    <>
      <Head>
        <title>Cookie Policy | Mbonga Pap!</title>
        <meta name="description" content="Learn how Mbonga Pap! uses cookies to enhance your experience. Read about essential, analytical, and marketing cookies, and your choices." />
        <meta property="og:title" content="Cookie Policy | Mbonga Pap!" />
        <meta property="og:description" content="Learn how Mbonga Pap! uses cookies to enhance your experience. Read about essential, analytical, and marketing cookies, and your choices." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mbongapap.co.ke/cookies" />
        <meta property="og:image" content="/placeholder.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cookie Policy | Mbonga Pap!" />
        <meta name="twitter:description" content="Learn how Mbonga Pap! uses cookies to enhance your experience. Read about essential, analytical, and marketing cookies, and your choices." />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-orange-100 via-green-100 to-yellow-100 py-12">
        <div className="container mx-auto px-4 max-w-3xl bg-white p-8 rounded-lg shadow-xl">
          <div className="mb-8">
            <Link href="/" passHref>
              <Button variant="ghost" className="text-green-600 hover:text-green-700">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">Cookie Policy</h1>
          <p className="text-xl text-gray-600 text-center mb-8">
            Understanding how we use cookies to enhance your experience.
          </p>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What are Cookies?</h2>
            <p className="text-gray-700 leading-relaxed">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website.
              They are widely used to make websites work more efficiently, as well as to provide information to the owners
              of the site. Cookies enable us to remember your preferences, analyze site performance, and provide you with
              a more personalized experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex items-center space-x-4">
                <Cookie className="h-10 w-10 text-green-500" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Essential Cookies</h3>
                  <p className="text-gray-600">
                    Necessary for the website to function and cannot be switched off in our systems.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex items-center space-x-4">
                <Cookie className="h-10 w-10 text-orange-500" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Analytical Cookies</h3>
                  <p className="text-gray-600">
                    Help us understand how visitors interact with the website by collecting and reporting information
                    anonymously.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex items-center space-x-4">
                <Cookie className="h-10 w-10 text-blue-500" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Marketing Cookies</h3>
                  <p className="text-gray-600">
                    Used to track visitors across websites. The intention is to display ads that are relevant and engaging
                    for the individual user.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex items-center space-x-4">
                <Settings className="h-10 w-10 text-purple-500" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Your Choices</h3>
                  <p className="text-gray-600">You can manage your cookie preferences through your browser settings.</p>
                  <Link href="/privacy" className="text-green-600 hover:underline text-sm mt-2 block">
                    Learn More in Privacy Policy &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need More Information?</h2>
            <p className="text-lg text-gray-700 mb-6">
              If you have any questions about our use of cookies, please contact us.
            </p>
            <Link href="/contact" passHref>
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-lg px-8 py-3 shadow-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
