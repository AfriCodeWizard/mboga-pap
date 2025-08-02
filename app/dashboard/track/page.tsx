"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone,
  Search,
  RefreshCw
} from "lucide-react";
import CustomerNavbar from "@/components/CustomerNavbar";
import { motion, AnimatePresence } from "framer-motion";

// Sample order data for logged-in users
const sampleOrders = [
  {
    id: "MP20240712-12345",
    status: "In Transit",
          vendor: "Fresh Harvest",
    items: ["Tomatoes (2kg)", "Spinach (1 bunch)", "Carrots (1kg)"],
    total: "KSh 850",
    orderDate: "July 12, 2024, 10:00 AM",
    estimatedDelivery: "11:00 AM - 11:30 AM",
    rider: "Peter Omondi",
    riderPhone: "+254 700 123 456",
    currentLocation: "Westlands Area",
    progress: 75,
    timeline: [
      {
        step: "Order Placed",
        time: "July 12, 2024, 10:00 AM",
        completed: true,
        icon: CheckCircle
      },
      {
        step: "Packed by Vendor",
        time: "July 12, 2024, 10:15 AM",
        completed: true,
        icon: Package
      },
      {
        step: "Out for Delivery",
        time: "July 12, 2024, 10:30 AM",
        completed: true,
        icon: Truck
      },
      {
        step: "Delivered",
        time: "Awaiting delivery confirmation",
        completed: false,
        icon: CheckCircle
      }
    ]
  },
  {
    id: "MP20240712-12346",
    status: "Preparing",
          vendor: "Green Valley",
    items: ["Cabbage (1 head)", "Potatoes (3kg)"],
    total: "KSh 650",
    orderDate: "July 12, 2024, 09:30 AM",
    estimatedDelivery: "11:30 AM - 12:00 PM",
    rider: "John Kiprop",
    riderPhone: "+254 700 234 567",
    currentLocation: "Kibera Market",
    progress: 30,
    timeline: [
      {
        step: "Order Placed",
        time: "July 12, 2024, 09:30 AM",
        completed: true,
        icon: CheckCircle
      },
      {
        step: "Packed by Vendor",
        time: "In progress",
        completed: false,
        icon: Package
      },
      {
        step: "Out for Delivery",
        time: "Awaiting pickup",
        completed: false,
        icon: Truck
      },
      {
        step: "Delivered",
        time: "Awaiting delivery confirmation",
        completed: false,
        icon: CheckCircle
      }
    ]
  }
];

export default function DashboardTrackOrderPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleCallRider = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const filteredOrders = sampleOrders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.vendor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNavbar />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/dashboard')}
            className="mb-4 text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-[color:var(--color-primary)] mb-2">Track Your Orders</h1>
          <p className="text-gray-600">Monitor your active deliveries in real-time</p>
        </div>

        {/* Search and Refresh */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[color:var(--color-primary)] h-4 w-4" />
            <Input
              placeholder="Search by order ID or vendor name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20"
            />
          </div>
          <Button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] hover:text-black text-white"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Real-time Status */}
        <Card className="mb-6 border-2 border-[color:var(--color-primary)]/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 font-medium">Live Updates</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-[color:var(--color-primary)]" />
                  <span className="text-[color:var(--color-primary)]">Real-time Tracking</span>
                </div>
              </div>
              <div className="text-gray-500">
                Last updated: {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-2 border-[color:var(--color-primary)]/20 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => setSelectedOrder(order)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg text-[color:var(--color-primary)]">{order.id}</CardTitle>
                      <p className="text-sm text-gray-600">{order.vendor}</p>
                    </div>
                    <Badge className={`${
                      order.status === "In Transit" 
                        ? "bg-[color:var(--color-accent)] text-[color:var(--color-primary)]" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Items:</p>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-1 text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 text-[color:var(--color-primary)]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total: <span className="font-medium">{order.total}</span></span>
                    <span className="text-gray-600">ETA: {order.estimatedDelivery}</span>
                  </div>

                  {order.status === "In Transit" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Progress:</span>
                        <span className="font-medium">{order.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div 
                          className="bg-[color:var(--color-primary)] h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${order.progress}%` }}
                          transition={{ duration: 0.5 }}
                        ></motion.div>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{order.currentLocation}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                      }}
                    >
                      View Details
                    </Button>
                    {order.status === "In Transit" && (
                      <Button 
                        size="sm"
                        className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] hover:text-black text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCallRider(order.riderPhone);
                        }}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call Rider
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-[color:var(--color-primary)] mb-2">No orders found</h3>
            <p className="text-gray-600">Try adjusting your search terms or check your order history</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-[color:var(--color-primary)]">{selectedOrder.id}</CardTitle>
                    <p className="text-gray-600">{selectedOrder.vendor}</p>
                  </div>
                  <Badge className={`${
                    selectedOrder.status === "In Transit" 
                      ? "bg-[color:var(--color-accent)] text-[color:var(--color-primary)]" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {selectedOrder.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Order Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-[color:var(--color-primary)] mb-3">Order Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Order Date:</span>
                        <p className="font-medium">{selectedOrder.orderDate}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Amount:</span>
                        <p className="font-medium">{selectedOrder.total}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Estimated Delivery:</span>
                        <p className="font-medium">{selectedOrder.estimatedDelivery}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Rider:</span>
                        <p className="font-medium">{selectedOrder.rider}</p>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div>
                    <h3 className="text-lg font-semibold text-[color:var(--color-primary)] mb-3">Items</h3>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                          <CheckCircle className="h-4 w-4 text-[color:var(--color-primary)]" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h3 className="text-lg font-semibold text-[color:var(--color-primary)] mb-3">Order Timeline</h3>
                    <div className="space-y-4">
                      {selectedOrder.timeline.map((step: any, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.completed 
                              ? 'bg-[color:var(--color-primary)] text-white' 
                              : 'bg-gray-200 text-gray-500'
                          }`}>
                            <step.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                              {step.step}
                            </p>
                            <p className="text-sm text-gray-600">{step.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white"
                      onClick={() => setSelectedOrder(null)}
                    >
                      Close
                    </Button>
                    {selectedOrder.status === "In Transit" && (
                      <Button 
                        className="flex-1 bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] hover:text-black text-white"
                        onClick={() => handleCallRider(selectedOrder.riderPhone)}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Rider
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 