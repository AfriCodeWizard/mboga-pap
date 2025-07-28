import Link from "next/link"
import { ArrowLeft, Shield, Lock, PhoneCall, AmbulanceIcon as FirstAid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 via-green-100 to-yellow-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl bg-white p-8 rounded-lg shadow-xl">
        <div className="mb-8">
          <Link href="/" passHref>
            <Button variant="ghost" className="text-green-600 hover:text-green-700">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">Safety at Mbonga Pap!</h1>
        <p className="text-xl text-gray-600 text-center mb-8">
          Your safety is our top priority. Learn how we keep you safe.
        </p>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Your Safety</h2>
          <p className="text-gray-700 leading-relaxed">
            At Mbonga Pap!, we are dedicated to creating a safe and secure environment for all our users – customers,
            MamaMbogas, and riders. We continuously implement and update our safety measures to ensure peace of mind
            with every interaction and delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 flex items-center space-x-4">
              <Shield className="h-10 w-10 text-green-500" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Secure Transactions</h3>
                <p className="text-gray-600">
                  All payments are processed securely to protect your financial information.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 flex items-center space-x-4">
              <Lock className="h-10 w-10 text-orange-500" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Data Privacy</h3>
                <p className="text-gray-600">
                  Your personal data is encrypted and protected according to our Privacy Policy.
                </p>
                <Link href="/privacy" className="text-green-600 hover:underline text-sm mt-2 block">
                  Read Privacy Policy &rarr;
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 flex items-center space-x-4">
              <PhoneCall className="h-10 w-10 text-blue-500" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">24/7 Support</h3>
                <p className="text-gray-600">Our support team is available around the clock for any safety concerns.</p>
                <Link href="/contact" className="text-green-600 hover:underline text-sm mt-2 block">
                  Contact Support &rarr;
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 flex items-center space-x-4">
              <FirstAid className="h-10 w-10 text-red-500" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Emergency Assistance</h3>
                <p className="text-gray-600">Protocols in place for immediate response in case of emergencies.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety Tips for Users</h2>
          <p className="text-lg text-gray-700 mb-6">Follow these simple guidelines to ensure a safe experience:</p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 text-left inline-block">
            <li>Always verify your order details before confirming.</li>
            <li>Communicate through the app for all order-related queries.</li>
            <li>Report any suspicious activity or inappropriate behavior immediately.</li>
            <li>For riders: always wear appropriate safety gear and follow traffic rules.</li>
            <li>For vendors: ensure your produce is fresh and handled hygienically.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
