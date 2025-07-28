import Link from "next/link"
import { ArrowLeft, Package, Truck, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 via-green-100 to-yellow-100 py-12">
      <div className="container mx-auto px-4 max-w-2xl bg-white p-8 rounded-lg shadow-xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-[color:var(--color-primary)] hover:underline font-semibold mb-8">
            <ArrowLeft className="mr-2 h-4 w-4 text-[color:var(--color-primary)]" /> Back to Home
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-[color:var(--color-primary)] text-center mb-4">Track Your Order</h1>
        <p className="text-xl text-gray-600 text-center mb-8">Enter your order ID to get real-time updates.</p>

        <div className="space-y-4 mb-12">
          <div>
            <Label htmlFor="order-id" className="text-lg font-medium text-gray-700">
              Order ID
            </Label>
            <Input
              id="order-id"
              type="text"
              placeholder="e.g., MP20240712-12345"
              className="mt-2 w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 transition-colors"
            />
          </div>
          <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-lg px-8 py-3 shadow-lg">
            Track Order
          </Button>
        </div>

        <Card className="shadow-lg border-2 border-green-200">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-[color:var(--color-primary)] mb-4">Order Status: In Transit</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">Order Placed</p>
                  <p className="text-sm text-gray-600">July 12, 2024, 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center">
                <Package className="h-6 w-6 text-green-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">Packed by Vendor</p>
                  <p className="text-sm text-gray-600">July 12, 2024, 10:15 AM</p>
                </div>
              </div>
              <div className="flex items-center">
                <Truck className="h-6 w-6 text-blue-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">Out for Delivery</p>
                  <p className="text-sm text-gray-600">July 12, 2024, 10:30 AM - Rider: Peter Omondi</p>
                </div>
              </div>
              <div className="flex items-center opacity-50">
                <CheckCircle className="h-6 w-6 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">Delivered</p>
                  <p className="text-sm text-gray-600">Awaiting delivery confirmation</p>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-6">Estimated Delivery: 11:00 AM - 11:30 AM</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
