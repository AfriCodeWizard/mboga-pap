"use client"

import { useState } from "react"
import { Search, MapPin, Star, Clock, ShoppingCart, Bell, Truck, Phone, Navigation, CheckCircle, Camera, Save, User, Settings, Package, TrendingUp, Heart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import VendorList, { Vendor } from "@/components/VendorList";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider, useCart } from "@/components/CartContext";
import { useLoyalty } from "@/components/LoyaltyContext";
import { AnimatePresence, motion } from "framer-motion";
import CustomerNavbar from "@/components/CustomerNavbar";
import LoyaltyPointsDisplay from "@/components/LoyaltyPointsDisplay";

const mamambogaVendors = [
  {
    id: "mama-grace-wanjiku",
    name: "Mama Grace Wanjiku",
    rating: 4.8,
    deliveryTime: "20-30 min",
    distance: "0.5 km",
    image: "/grace-wanjiku.jpg",
    specialties: ["Fresh Vegetables", "Herbs"],
    isOpen: true,
  },
  {
    id: "mama-jane-njeri",
    name: "Mama Jane Njeri",
    rating: 4.9,
    deliveryTime: "25-35 min",
    distance: "0.8 km",
    image: "/jane-njeri.jpg",
    specialties: ["Spinach", "Carrots", "Eggplant"],
    isOpen: true,
  },
  {
    id: "mama-mary-akinyi",
    name: "Mama Mary Akinyi",
    rating: 4.7,
    deliveryTime: "22-32 min",
    distance: "1.2 km",
    image: "/mary-akinyi.jpg",
    specialties: ["Cabbage", "Tomatoes", "Potatoes"],
    isOpen: true,
  },
  {
    id: "wambuis-greens",
    name: "Wambui's Greens",
    rating: 4.7,
    deliveryTime: "18-28 min",
    distance: "1.1 km",
    image: "/placeholder.svg",
    specialties: ["Traditional Greens", "Organic"],
    isOpen: true,
  },
  {
    id: "fruit-basket",
    name: "Fruit Basket",
    rating: 4.5,
    deliveryTime: "22-32 min",
    distance: "1.5 km",
    image: "/placeholder.svg",
    specialties: ["Fresh Fruits", "Juices"],
    isOpen: true,
  },
  {
    id: "organic-hub",
    name: "Organic Hub",
    rating: 4.8,
    deliveryTime: "20-30 min",
    distance: "2.0 km",
    image: "/placeholder.svg",
    specialties: ["Organic Veggies", "Herbs"],
    isOpen: true,
  },
  {
    id: "roots-tubers",
    name: "Roots & Tubers",
    rating: 4.4,
    deliveryTime: "30-40 min",
    distance: "2.3 km",
    image: "/placeholder.svg",
    specialties: ["Tubers", "Roots"],
    isOpen: true,
  },
  {
    id: "salad-stop",
    name: "Salad Stop",
    rating: 4.6,
    deliveryTime: "17-27 min",
    distance: "1.8 km",
    image: "/placeholder.svg",
    specialties: ["Salads", "Fresh Veggies"],
    isOpen: true,
  },
];

const recentOrders = [
  {
    id: 1,
    vendor: "Mama Grace Vegetables",
    items: ["Tomatoes", "Onions", "Spinach"],
    total: "KSh 450",
    status: "Delivered",
    date: "2 hours ago",
  },
  {
    id: 2,
    vendor: "Kiprotich Fresh Produce",
    items: ["Carrots", "Potatoes", "Cabbage"],
    total: "KSh 320",
    status: "In Transit",
    date: "1 day ago",
  },
]

const activeOrder = {
  id: "ORD-1004",
  vendor: "Mama Grace Vegetables",
  rider: "Peter Ochieng",
  items: ["Sukuma Wiki (2 bunches)", "Tomatoes (1kg)", "Onions (500g)"],
  total: "KSh 280",
  status: "Out for Delivery",
  estimatedArrival: "15 mins",
  riderPhone: "+254 700 123 456",
  riderLocation: "Westlands, 2km away",
  orderProgress: [
    { step: "Order Placed", time: "10:30 AM", completed: true },
    { step: "Vendor Confirmed", time: "10:32 AM", completed: true },
    { step: "Order Prepared", time: "10:45 AM", completed: true },
    { step: "Rider Picked Up", time: "11:00 AM", completed: true },
    { step: "Out for Delivery", time: "11:05 AM", completed: true },
    { step: "Delivered", time: "11:20 AM", completed: false },
  ],
}

export default function CustomerDashboard() {
  return (
    <CustomerDashboardContent />
  );
}

// Move the main dashboard content to a new component so useCart can be used inside it
function CustomerDashboardContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false)
  // Profile modal state
  const [profileOpen, setProfileOpen] = useState(false)
  const [profile, setProfile] = useState({
    name: "Jane Customer",
    email: "customer@demo.com",
    phone: "+254 700 111 222",
    address: "Nairobi, Kenya",
  })
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mpesa, setMpesa] = useState({ number: "", name: "" });
  const router = useRouter();
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { points } = useLoyalty();
  
  // Example items for each vendor (replace with real data/fetch in future)
  const vendorItems: { [vendorId: number]: any[] } = {
    1: [
      { id: 1, name: "Tomatoes", price: "80", image: "/placeholder.svg", description: "Fresh, juicy tomatoes." },
      { id: 2, name: "Onions", price: "60", image: "/placeholder.svg", description: "Red onions, per kg." },
      { id: 3, name: "Spinach", price: "40", image: "/placeholder.svg", description: "Leafy green spinach." },
    ],
    2: [
      { id: 4, name: "Carrots", price: "50", image: "/placeholder.svg", description: "Crunchy carrots." },
      { id: 5, name: "Potatoes", price: "70", image: "/placeholder.svg", description: "Organic potatoes." },
      { id: 6, name: "Cabbage", price: "45", image: "/placeholder.svg", description: "Fresh cabbage." },
    ],
    3: [
      { id: 7, name: "Local Vegetables", price: "90", image: "/placeholder.svg", description: "Assorted local veggies." },
      { id: 8, name: "Spices", price: "120", image: "/placeholder.svg", description: "Aromatic spices." },
    ],
  };
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [cartPreviewOpen, setCartPreviewOpen] = useState(false);
  const cartTotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const { addToCart } = useCart();
  
  // Quick action categories with search terms
  const quickCategories = [
    { name: "Fresh Vegetables", emoji: "🥬", searchTerm: "vegetables spinach sukuma", color: "from-green-50 to-green-100" },
    { name: "Root Vegetables", emoji: "🥕", searchTerm: "potatoes carrots onions", color: "from-orange-50 to-orange-100" },
    { name: "Grains & Cereals", emoji: "🌾", searchTerm: "rice maize beans", color: "from-yellow-50 to-yellow-100" },
    { name: "Herbs & Spices", emoji: "🌿", searchTerm: "herbs spices", color: "from-purple-50 to-purple-100" },
  ];

  const handleLogout = () => {
    window.location.href = "/";
  };
  const handleTrackOrder = () => {
    setIsTrackingModalOpen(true);
  };
  const handleCallRider = () => {
    window.open(`tel:${activeOrder.riderPhone}`, '_self');
  };
  
  // Handle quick category selection
  const handleQuickCategorySelect = (category: any) => {
    setSelectedCategory(category.name);
    setSearchQuery(category.searchTerm);
  };

  // Clear category selection
  const handleClearCategory = () => {
    setSelectedCategory("");
    setSearchQuery("");
  };

  const [plan, setPlan] = useState<'free' | 'paid'>(typeof window !== 'undefined' && localStorage.getItem('plan') === 'paid' ? 'paid' : 'free');
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  // Save plan to localStorage
  const handleUpgrade = () => {
    setPlan('paid');
    if (typeof window !== 'undefined') {
      localStorage.setItem('plan', 'paid');
    }
    setShowSubscriptionDialog(false);
    alert('Subscription upgraded! Enjoy unlimited orders.');
  };

  // Filter vendors based on search query and selected category
  const filteredVendors = mamambogaVendors.filter(vendor =>
    (searchQuery === "" || 
     vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     vendor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) &&
    (selectedCategory === "" || 
     vendor.specialties.some(s => s.toLowerCase().includes(selectedCategory.toLowerCase())))
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNavbar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[color:var(--color-primary)] mb-2">Welcome back, Jane!</h1>
          <p className="text-gray-600">What would you like to order today?</p>
        </div>

        {/* Search Section */}
        <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[color:var(--color-primary)]" />
              <Input
                placeholder="Search for vegetables, herbs, or vendors..."
                className="pl-12 pr-4 py-3 text-lg border-[color:var(--color-primary)] focus:border-[color:var(--color-accent)] focus:ring-2 focus:ring-[color:var(--color-accent)]/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {selectedCategory && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearCategory}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  Clear
                </Button>
              )}
            </div>
            {selectedCategory && (
              <div className="mt-3 flex items-center space-x-2">
                <Badge className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)]">
                  {selectedCategory}
                </Badge>
                <span className="text-sm text-gray-600">Active filter</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Delivery Section - Redesigned */}
        <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8 bg-gradient-to-r from-[color:var(--color-primary)]/5 to-[color:var(--color-accent)]/5">
              <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-[color:var(--color-primary)]">
              <Truck className="h-6 w-6 text-[color:var(--color-primary)]" />
              <span className="text-xl">Active Delivery</span>
              <Badge className="bg-[color:var(--color-primary)] text-white ml-auto animate-pulse">Live</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Order Info - Enhanced */}
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <h3 className="font-bold text-lg text-[color:var(--color-accent)] mb-3">{activeOrder.id}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Vendor:</span>
                      <span className="font-medium text-[color:var(--color-primary)]">{activeOrder.vendor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Rider:</span>
                      <span className="font-medium">{activeOrder.rider}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">ETA:</span>
                      <span className="font-medium text-[color:var(--color-accent)]">{activeOrder.estimatedArrival}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-bold text-[color:var(--color-primary)]">{activeOrder.total}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <p className="text-sm font-medium mb-3 text-[color:var(--color-primary)]">Order Items:</p>
                  <div className="space-y-2">
                    {activeOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[color:var(--color-accent)] rounded-full"></div>
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions for Active Delivery */}
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <p className="text-sm font-medium mb-3 text-[color:var(--color-primary)]">Quick Actions</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/10 transition-colors duration-200"
                      onClick={handleCallRider}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call Rider
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/10 transition-colors duration-200"
                      onClick={() => window.open(`https://wa.me/${activeOrder.riderPhone.replace('+', '')}?text=Hi ${activeOrder.rider}, I have a question about my delivery ${activeOrder.id}`, '_blank')}
                    >
                      <span className="text-lg mr-1">💬</span>
                      WhatsApp
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/10 transition-colors duration-200"
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeOrder.riderLocation)}`, '_blank')}
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      View Map
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/10 transition-colors duration-200"
                      onClick={() => {
                        navigator.clipboard.writeText(activeOrder.id);
                        alert('Order ID copied to clipboard!');
                      }}
                    >
                      <span className="text-lg mr-1">📋</span>
                      Copy ID
                    </Button>
                  </div>
                </div>
              </div>

              {/* Progress Bar - Enhanced */}
              <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-[color:var(--color-primary)]">Delivery Progress</h4>
                    <Badge className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)]">
                      {activeOrder.orderProgress.filter(p => p.completed).length}/{activeOrder.orderProgress.length} Steps
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    {activeOrder.orderProgress.map((progress, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          progress.completed 
                            ? 'bg-[color:var(--color-accent)] border-[color:var(--color-accent)]' 
                            : 'bg-gray-100 border-gray-300'
                        }`}>
                          {progress.completed ? (
                            <CheckCircle className="h-5 w-5 text-[color:var(--color-primary)]" />
                          ) : (
                            <span className="text-sm text-gray-600 font-medium">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${progress.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {progress.step}
                          </p>
                          <p className="text-sm text-gray-400">{progress.time}</p>
                        </div>
                        {progress.completed && (
                          <Badge className="bg-green-100 text-green-700 text-xs">Completed</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real-time Updates Section */}
                <div className="bg-white p-4 rounded-lg border shadow-sm mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-[color:var(--color-primary)]">Real-time Updates</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600">Live</span>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Rider Location:</span>
                      <span className="font-medium">{activeOrder.riderLocation}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Last Update:</span>
                      <span className="font-medium">2 minutes ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Delivery Speed:</span>
                      <span className="font-medium text-green-600">On Time</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button 
                className="flex-1 bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/90 text-white transition-colors duration-200"
                onClick={() => {
                  // Simulate marking delivery as received
                  alert('Thank you! Your delivery has been marked as received. Please rate your experience.');
                }}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Received
                              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/10 transition-colors duration-200"
                onClick={() => {
                  // Simulate reporting an issue
                  alert('Issue reported. Our support team will contact you shortly.');
                }}
              >
                <span className="text-lg mr-2">⚠️</span>
                Report Issue
                    </Button>
                </div>
              </CardContent>
            </Card>

        {/* Quick Actions - Now Functional */}
        <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8">
          <CardHeader>
            <CardTitle className="text-[color:var(--color-primary)]">Quick Actions</CardTitle>
            <CardDescription>Browse by category or search for specific items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickCategories.map((category) => (
                <Card 
                  key={category.name}
                  className={`cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 ${
                    selectedCategory === category.name 
                      ? 'border-[color:var(--color-accent)] shadow-lg' 
                      : 'border-transparent hover:border-[color:var(--color-accent)]/30'
                  }`}
                  onClick={() => handleQuickCategorySelect(category)}
                >
                  <CardContent className={`p-6 text-center bg-gradient-to-br ${category.color}`}>
                    <div className="w-16 h-16 bg-white/80 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <span className="text-3xl">{category.emoji}</span>
                  </div>
                    <p className="font-medium text-[color:var(--color-primary)]">{category.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedCategory === category.name ? 'Selected' : 'Browse selection'}
                    </p>
                </CardContent>
              </Card>
              ))}
            </div>
            {selectedCategory && (
              <div className="mt-4 text-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleClearCategory}
                  className="border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/10"
                >
                  Clear Selection
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Nearby Vendors */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">Nearby Mamambogas</h2>
                <Badge className="bg-[color:var(--color-primary)] text-white">
                  {filteredVendors.length} vendors available
                </Badge>
              </div>
              {filteredVendors.length > 0 ? (
              <VendorList
                  vendors={filteredVendors}
                fromDashboard={true}
              />
              ) : (
                <Card className="border-2 border-gray-200 shadow-md">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No vendors found</h3>
                    <p className="text-gray-600 mb-4">
                      {selectedCategory 
                        ? `No vendors found for "${selectedCategory}"` 
                        : `No vendors match "${searchQuery}"`
                      }
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={handleClearCategory}
                      className="border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/10"
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Loyalty Points */}
            <LoyaltyPointsDisplay />

            {/* Subscription Status */}
            <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[color:var(--color-primary)]">
                  <Zap className="h-5 w-5 text-[color:var(--color-accent)]" />
                  <span>Your Plan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <Badge className={`${plan === 'paid' ? 'bg-[color:var(--color-primary)]' : 'bg-gray-400'} text-white px-4 py-2 text-sm`}>
                    {plan === 'paid' ? 'Premium Plan' : 'Free Tier'}
                  </Badge>
                  <p className="text-sm text-gray-600">
                    {plan === 'paid' ? 'Unlimited orders with priority support' : 'Limited orders per month'}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/10 transition-colors duration-200"
                    onClick={() => setShowSubscriptionDialog(true)}
                  >
                    Manage Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[color:var(--color-primary)]">
                  <Package className="h-5 w-5 text-[color:var(--color-primary)]" />
                  <span>Recent Orders</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border-b pb-4 last:border-b-0 border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{order.vendor}</h4>
                      <Badge
                        variant={order.status === "Delivered" ? "default" : "secondary"}
                        className={order.status === "Delivered" ? "bg-[color:var(--color-primary)] text-white" : "bg-[color:var(--color-accent)] text-[color:var(--color-primary)]"}
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{order.items.join(", ")}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium">{order.total}</span>
                      <span className="text-gray-500">{order.date}</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/10 transition-colors duration-200">
                  View All Orders
                </Button>
              </CardContent>
            </Card>

            {/* Quick Reorder */}
            <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[color:var(--color-primary)]">
                  <Heart className="h-5 w-5 text-[color:var(--color-accent)]" />
                  <span>Quick Reorder</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Reorder your favorite items with one click</p>
                <Button className="w-full bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/90 text-white transition-colors duration-200">
                  <Package className="h-4 w-4 mr-2" />
                  Reorder Last Purchase
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Profile Modal */}
        <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-[color:var(--color-primary)]" />
                <span>Profile</span>
              </DialogTitle>
              <DialogDescription>Manage your personal information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={profile.address} onChange={e => setProfile({ ...profile, address: e.target.value })} />
              </div>
              <div className="flex items-center space-x-2">
                <Button className="flex-1">
                  <Camera className="h-4 w-4 mr-2" /> Upload Photo
                </Button>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={() => { setProfileOpen(false); alert('Profile updated!') }} className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/90 transition-colors duration-200">
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Settings Modal */}
        <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-[color:var(--color-primary)]" />
                <span>Settings</span>
              </DialogTitle>
              <DialogDescription>Manage your payment information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="mpesaNumber">M-Pesa Number</Label>
                <Input id="mpesaNumber" value={mpesa.number} onChange={e => setMpesa({ ...mpesa, number: e.target.value })} placeholder="e.g. 07XXXXXXXX" />
              </div>
              <div>
                <Label htmlFor="mpesaName">M-Pesa Name</Label>
                <Input id="mpesaName" value={mpesa.name} onChange={e => setMpesa({ ...mpesa, name: e.target.value })} placeholder="e.g. Jane Customer" />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={() => { setSettingsOpen(false); alert('Settings updated!') }} className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/90 transition-colors duration-200">
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Subscription Dialog */}
        <Dialog open={showSubscriptionDialog} onOpenChange={setShowSubscriptionDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Manage Subscription</DialogTitle>
              <DialogDescription>
                {plan === 'paid'
                  ? 'You are on the Premium plan. Enjoy unlimited orders!'
                  : 'Upgrade to Premium for unlimited orders and exclusive benefits.'}
              </DialogDescription>
            </DialogHeader>
            {plan === 'free' ? (
              <div className="space-y-4">
                <div className="bg-[color:var(--color-accent)]/10 p-4 rounded-lg text-center">
                  <h3 className="text-lg font-bold mb-2 text-[color:var(--color-primary)]">Premium Plan</h3>
                  <p className="mb-2">Unlimited orders, priority support, and more.</p>
                  <p className="text-2xl font-bold text-[color:var(--color-primary)] mb-2">KSh 500/month</p>
                </div>
                <Button className="w-full bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/90 text-white transition-colors duration-200" onClick={handleUpgrade}>
                  Upgrade & Pay with M-Pesa
                </Button>
              </div>
            ) : (
              <div className="text-center text-[color:var(--color-primary)] font-semibold py-4">
                You are already subscribed to Premium.
              </div>
            )}
          </DialogContent>
        </Dialog>
        
        <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
      </div>
    </div>
  );
}
