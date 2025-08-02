"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  User,
  Package,
  Heart,
  Truck,
  CheckCircle,
  Search,
  Bell,
  Gift,
  TrendingUp,
  Zap,
  Wifi,
  WifiOff
} from "lucide-react";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider, useCart } from "@/components/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import CustomerNavbar from "@/components/CustomerNavbar";

// Loyalty Points Context (simplified for dashboard)
const useLoyalty = () => {
  const [points, setPoints] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('loyaltyPoints') || '0');
    }
    return 0;
  });

  const addPoints = (amount: number) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    if (typeof window !== 'undefined') {
      localStorage.setItem('loyaltyPoints', newPoints.toString());
    }
  };

  const redeemPoints = (amount: number) => {
    if (points >= amount) {
      const newPoints = points - amount;
      setPoints(newPoints);
      if (typeof window !== 'undefined') {
        localStorage.setItem('loyaltyPoints', newPoints.toString());
      }
      return true;
    }
    return false;
  };

  return { points, addPoints, redeemPoints };
};

// All vendors from home page
const mamambogaVendors = [
  {
    id: "fresh-harvest",
    name: "Fresh Harvest",
    location: "Westlands Market • 8 years",
    rating: 4.8,
    reviews: 127,
    deliveryTime: "20-30 min",
    minOrder: "KSh 200",
    image: "/grace-wanjiku.jpg",
    phone: "+254 700 123 456",
    description: "I love serving my community with fresh vegetables at fair prices!",
    isFavorite: true,
    specialties: ["Fresh Vegetables", "Herbs"],
    isOpen: true
  },
  {
    id: "green-valley",
    name: "Green Valley",
    location: "Kibera Market • 12 years",
    rating: 4.9,
    reviews: 203,
    deliveryTime: "25-35 min",
    minOrder: "KSh 150",
    image: "/jane-njeri.jpg",
    phone: "+254 700 234 567",
    description: "Fresh vegetables every morning, straight from the farm!",
    isFavorite: false,
    specialties: ["Spinach", "Carrots", "Eggplant"],
    isOpen: true
  },
  {
    id: "sunrise-market",
    name: "Sunrise Market",
    location: "Kawangware • 6 years",
    rating: 4.7,
    reviews: 89,
    deliveryTime: "22-32 min",
    minOrder: "KSh 300",
    image: "/mary-akinyi.jpg",
    phone: "+254 700 345 678",
    description: "Quality produce at fair prices, that's my promise!",
    isFavorite: true,
    specialties: ["Cabbage", "Tomatoes", "Potatoes"],
    isOpen: true
  },
  {
    id: "wambuis-greens",
    name: "Wambui's Greens",
    location: "1.1 km • 4.7★",
    rating: 4.7,
    reviews: 156,
    deliveryTime: "15-25 min",
    minOrder: "KSh 180",
    image: "/placeholder.svg",
    phone: "+254 700 456 789",
    description: "Traditional greens and organic produce.",
    isFavorite: false,
    specialties: ["Traditional Greens", "Organic"],
    isOpen: true
  },
  {
    id: "fruit-basket",
    name: "Fruit Basket",
    location: "1.5 km • 4.5★",
    rating: 4.5,
    reviews: 98,
    deliveryTime: "18-28 min",
    minOrder: "KSh 250",
    image: "/placeholder.svg",
    phone: "+254 700 567 890",
    description: "Fresh fruits and juices for your family.",
    isFavorite: false,
    specialties: ["Fresh Fruits", "Juices"],
    isOpen: true
  },
  {
    id: "organic-hub",
    name: "Organic Hub",
    location: "2.0 km • 4.8★",
    rating: 4.8,
    reviews: 203,
    deliveryTime: "25-35 min",
    minOrder: "KSh 350",
    image: "/placeholder.svg",
    phone: "+254 700 678 901",
    description: "Organic veggies and herbs delivered.",
    isFavorite: true,
    specialties: ["Organic Veggies", "Herbs"],
    isOpen: true
  },
  {
    id: "roots-tubers",
    name: "Roots & Tubers",
    location: "2.3 km • 4.4★",
    rating: 4.4,
    reviews: 87,
    deliveryTime: "20-30 min",
    minOrder: "KSh 200",
    image: "/placeholder.svg",
    phone: "+254 700 789 012",
    description: "Best tubers and roots in town.",
    isFavorite: false,
    specialties: ["Tubers", "Roots"],
    isOpen: true
  },
  {
    id: "salad-stop",
    name: "Salad Stop",
    location: "1.8 km • 4.6★",
    rating: 4.6,
    reviews: 134,
    deliveryTime: "15-25 min",
    minOrder: "KSh 220",
    image: "/placeholder.svg",
    phone: "+254 700 890 123",
    description: "Fresh salads and veggies every day.",
    isFavorite: false,
    specialties: ["Salads", "Fresh Veggies"],
    isOpen: true
  }
];

// Real-time delivery updates with live tracking
const DashboardContent = () => {
  const router = useRouter();
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);
  const { points, addPoints, redeemPoints } = useLoyalty();
  
  // Real-time delivery state
  const [activeDeliveries, setActiveDeliveries] = useState([
    {
      id: "DEL-001",
      vendor: "Fresh Harvest",
      status: "On the way",
      estimatedTime: "15 mins",
      progress: 75,
      items: ["Tomatoes (2kg)", "Spinach (1 bunch)", "Carrots (1kg)"],
      rider: "Peter Ochieng",
      riderPhone: "+254 700 123 456",
      lastUpdate: new Date(),
      location: "Westlands Roundabout",
      eta: new Date(Date.now() + 15 * 60 * 1000)
    },
    {
      id: "DEL-002", 
      vendor: "Green Valley",
      status: "Preparing",
      estimatedTime: "25 mins",
      progress: 30,
      items: ["Cabbage (1 head)", "Potatoes (3kg)"],
      rider: "John Kiprop",
      riderPhone: "+254 700 234 567",
      lastUpdate: new Date(),
      location: "Kibera Market",
      eta: new Date(Date.now() + 25 * 60 * 1000)
    }
  ]);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      // Update delivery progress in real-time
      setActiveDeliveries(prev => prev.map(delivery => {
        if (delivery.status === "On the way") {
          const timeDiff = delivery.eta.getTime() - Date.now();
          const newProgress = Math.max(0, Math.min(95, 100 - (timeDiff / (25 * 60 * 1000)) * 100));
          
          // Update location based on progress
          let newLocation = delivery.location;
          if (newProgress > 80) newLocation = "Almost there!";
          else if (newProgress > 60) newLocation = "Westlands Area";
          else if (newProgress > 40) newLocation = "On the road";
          
          return {
            ...delivery,
            progress: Math.round(newProgress),
            location: newLocation,
            estimatedTime: Math.max(1, Math.ceil(timeDiff / (60 * 1000))) + " mins"
          };
        }
        return delivery;
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Simulate real-time notifications
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      const randomEvents = [
        { type: 'delivery', message: 'Your order is being prepared!', icon: '🍅' },
        { type: 'loyalty', message: `You earned 5 points! Total: ${points + 5}`, icon: '⭐' },
        { type: 'vendor', message: 'New vendor available in your area!', icon: '🥬' }
      ];
      
      const randomEvent = randomEvents[Math.floor(Math.random() * randomEvents.length)];
      
      setNotifications(prev => [
        ...prev.slice(-2), // Keep only last 3 notifications
        {
          id: Date.now(),
          ...randomEvent,
          timestamp: new Date()
        }
      ]);
    }, 60000); // New notification every minute

    return () => clearInterval(notificationInterval);
  }, [points]);

  const handleVendorClick = (vendorId: string) => {
    window.location.href = `/vendors/${vendorId}?from=dashboard`;
  };

  const handleCallRider = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleRedeemPoints = () => {
    if (points >= 50) {
      const success = redeemPoints(50);
      if (success) {
        setNotifications(prev => [...prev, {
          id: Date.now(),
          type: 'loyalty',
          message: 'Successfully redeemed 50 points for KSh 50 discount!',
          icon: '🎉',
          timestamp: new Date()
        }]);
      }
    }
  };

  const filteredVendors = mamambogaVendors.filter(vendor =>
     vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNavbar />
      
      {/* Real-time Status Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {isOnline ? (
                <Wifi className="h-4 w-4 text-green-500" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
              <span className={isOnline ? "text-green-600" : "text-red-600"}>
                {isOnline ? "Live Updates" : "Offline Mode"}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4 text-[color:var(--color-primary)]" />
              <span className="text-[color:var(--color-primary)]">Real-time Tracking</span>
            </div>
          </div>
          <div className="text-gray-500">
            Last updated: {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[color:var(--color-primary)] mb-2">Welcome back, Jane!</h1>
          <p className="text-gray-600">Discover fresh vegetables from local vendors</p>
        </div>

        {/* Loyalty Points Display */}
        <Card className="mb-6 border-2 border-[color:var(--color-primary)]/20 shadow-lg bg-gradient-to-r from-[color:var(--color-primary)]/5 to-[color:var(--color-accent)]/5">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[color:var(--color-accent)] to-[color:var(--color-primary)] rounded-full flex items-center justify-center shadow-lg">
                  <Star className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[color:var(--color-primary)]">Loyalty Points</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Earn 1 point for every KSh 10 spent</p>
            </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
                <div className="text-center sm:text-right">
                  <div className="text-xl sm:text-2xl font-bold text-[color:var(--color-primary)] bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent)] bg-clip-text text-transparent">
                    {points}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button 
                      variant="outline"
                      size="sm" 
                    className="border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-primary)] text-xs sm:text-sm"
                    onClick={() => router.push('/dashboard/loyalty')}
                    >
                    View History
                    </Button>
                    <Button 
                      size="sm" 
                    className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-primary)] text-[color:var(--color-accent)] text-xs sm:text-sm shadow-lg"
                    onClick={handleRedeemPoints}
                    disabled={points < 50}
                  >
                    Redeem (50 pts)
                    </Button>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 sm:mt-6">
              <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
                <span>Next reward at 100 points</span>
                <span>{Math.min(points, 100)}/100</span>
                </div>
              <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                <div 
                  className="bg-gradient-to-r from-[color:var(--color-accent)] to-[color:var(--color-primary)] h-2 sm:h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min((points / 100) * 100, 100)}%` }}
                ></div>
                  </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Notifications */}
        <AnimatePresence>
          {notifications.length > 0 && (
            <div className="mb-6 space-y-2">
              {notifications.slice(-3).map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  className="bg-white border-l-4 border-[color:var(--color-primary)] p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{notification.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[color:var(--color-primary)]">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {notification.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                    >
                      ×
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Search Section */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[color:var(--color-primary)] h-4 w-4" />
            <Input
              placeholder="Search vendors, locations, or specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20"
            />
            </div>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Deliveries with Real-time Updates */}
            <Card className="border-2 border-[color:var(--color-primary)]/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-[color:var(--color-primary)]" />
                  <span>Active Deliveries</span>
                  <Badge className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)] text-xs">
                    LIVE
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Real-time updates on your orders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeDeliveries.map((delivery) => (
                  <motion.div 
                    key={delivery.id} 
                    className="border rounded-lg p-3 bg-[color:var(--color-primary)]/5"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 10 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{delivery.vendor}</span>
                      <Badge className={`text-xs ${
                        delivery.status === "On the way" ? "bg-[color:var(--color-accent)] text-[color:var(--color-primary)]" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {delivery.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Estimated arrival:</span>
                        <span className="font-medium">{delivery.estimatedTime}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div 
                          className="bg-[color:var(--color-primary)] h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${delivery.progress}%` }}
                          transition={{ duration: 0.5 }}
                        ></motion.div>
                      </div>
                      <div className="text-xs text-gray-600">
                        <div className="font-medium mb-1">Current Location:</div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-[color:var(--color-primary)]" />
                          <span>{delivery.location}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600">
                        <div className="font-medium mb-1">Items:</div>
                        <div className="space-y-1">
                          {delivery.items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-1">
                              <CheckCircle className="h-3 w-3 text-[color:var(--color-primary)]" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Rider: {delivery.rider}</span>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-6 text-xs border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white"
                          onClick={() => handleCallRider(delivery.riderPhone)}
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                      </div>
                      <div className="text-xs text-gray-500 text-center">
                        Last updated: {delivery.lastUpdate.toLocaleTimeString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {activeDeliveries.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    <Truck className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No active deliveries</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Subscription Status */}
            <Card className="border-2 border-[color:var(--color-primary)]/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-[color:var(--color-primary)]" />
                  <span>Subscription Status</span>
                </CardTitle>
                <CardDescription>
                  Manage your subscription and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Current Plan</span>
                    <Badge className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)]">Premium</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Next Billing</span>
                    <span className="text-sm text-gray-600">March 15, 2024</span>
                  </div>
                  <Button variant="outline" className="w-full border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white">
                    Manage Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-2 border-[color:var(--color-primary)]/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-[color:var(--color-primary)]" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>
                  Access your most used features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-primary)]"
                  onClick={() => router.push('/dashboard/track')}
                >
                  Track Order
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-primary)]"
                  onClick={() => router.push('/dashboard/order-history')}
                >
                  Order History
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-primary)]"
                  onClick={() => setCartDrawerOpen(true)}
                >
                  View Cart
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-primary)]"
                  onClick={() => router.push('/dashboard/loyalty')}
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Loyalty Rewards
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Vendors Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[color:var(--color-primary)] mb-2">Nearby Vendors</h2>
              <p className="text-gray-600">Find fresh vegetables from trusted local vendors</p>
        </div>
        
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-2 border-[color:var(--color-primary)]/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={vendor.image} alt={vendor.name} />
                            <AvatarFallback className="bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)]">
                              {vendor.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
              <div>
                            <CardTitle className="text-lg group-hover:text-[color:var(--color-primary)] transition-colors">
                              {vendor.name}
                            </CardTitle>
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                              <MapPin className="h-3 w-3" />
                              <span>{vendor.location}</span>
              </div>
              </div>
              </div>
                        <div className="flex flex-col items-end space-y-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`p-1 ${vendor.isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                          >
                            <Heart className="h-4 w-4" />
                </Button>
                          <Badge className={`text-xs ${vendor.isOpen ? 'bg-[color:var(--color-accent)] text-[color:var(--color-primary)]' : 'bg-red-100 text-red-800'}`}>
                            {vendor.isOpen ? 'Open' : 'Closed'}
                          </Badge>
              </div>
            </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{vendor.rating}</span>
                          <span className="text-gray-500">({vendor.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Clock className="h-3 w-3" />
                          <span>{vendor.deliveryTime}</span>
                        </div>
            </div>
                      
                      <p className="text-sm text-gray-600">{vendor.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {vendor.specialties.map((specialty) => (
                          <Badge key={specialty} className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)] text-xs">
                            {specialty}
                          </Badge>
                        ))}
              </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Min Order: <span className="font-medium">{vendor.minOrder}</span></span>
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Phone className="h-3 w-3" />
                          <span>{vendor.phone}</span>
              </div>
            </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          className="flex-1 bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-primary)] text-[color:var(--color-accent)]"
                          onClick={() => handleVendorClick(vendor.id)}
                          disabled={!vendor.isOpen}
                        >
                          Order Now
              </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {filteredVendors.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-[color:var(--color-primary)] mb-2">No vendors found</h3>
                <p className="text-gray-600">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
    </div>
  );
};

export default function DashboardPage() {
  return (
    <CartProvider>
      <DashboardContent />
    </CartProvider>
  );
}
