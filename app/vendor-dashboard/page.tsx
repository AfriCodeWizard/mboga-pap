"use client"

import { useState, useEffect } from "react"
import { Plus, Package, TrendingUp, Clock, Star, Edit, Trash2, Eye, DollarSign, CreditCard, User, Settings, BarChart3, HelpCircle, MapPin, Phone, Mail, Camera, Save, Download, Calendar, Target, Award, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

const products = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    price: "KSh 80/kg",
    stock: 25,
    category: "Vegetables",
    status: "In Stock",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    name: "Red Onions",
    price: "KSh 60/kg",
    stock: 0,
    category: "Vegetables",
    status: "Out of Stock",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    name: "Spinach",
    price: "KSh 40/bunch",
    stock: 15,
    category: "Leafy Greens",
    status: "In Stock",
    image: "/placeholder.svg?height=50&width=50",
  },
]

export default function VendorDashboard() {
  const [selectedTab, setSelectedTab] = useState("dashboard")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [vendorProfile, setVendorProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState([
  {
    id: "ORD-001",
    customer: "John Doe",
    items: ["Tomatoes (2kg)", "Onions (1kg)"],
    total: "KSh 220",
    status: "Pending",
    time: "10 mins ago",
  },
  {
    id: "ORD-002",
    customer: "Sarah Kim",
    items: ["Spinach (3 bunches)", "Carrots (1kg)"],
    total: "KSh 180",
    status: "Preparing",
    time: "25 mins ago",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    items: ["Tomatoes (1kg)", "Spinach (2 bunches)"],
    total: "KSh 160",
    status: "Ready",
    time: "1 hour ago",
  },
  ])
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  })
  const [paymentRequest, setPaymentRequest] = useState({
    amount: "",
    bankName: "Equity Bank",
    accountNumber: "",
    accountName: "",
    phoneNumber: "",
  })
  
  // Profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    businessLicense: "",
    yearsInBusiness: "",
  })
  
  // Shop settings state
  const [shopSettings, setShopSettings] = useState({
    shopName: "",
    description: "",
    location: "",
    openingHours: "06:00-18:00",
    deliveryRadius: "5",
    autoAcceptOrders: true,
    notifications: true,
    language: "English",
    paymentMethod: "Bank",
    bankName: "Equity Bank",
    accountNumber: "",
    accountName: "",
    mpesaNumber: "",
    mpesaName: "",
  })

  // Modal state for dropdown features
  const [profileOpen, setProfileOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [analyticsOpen, setAnalyticsOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const supabase = getSupabaseClient()
        if (!supabase) {
          console.error('Supabase client not available')
          router.push('/login')
          return
        }

        // Get current user session
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user) {
          console.error('No authenticated user found:', userError)
          router.push('/login')
          return
        }

        setUser(user)

        // Get user profile from users table
        const { data: userProfileData, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileError) {
          console.error('Error fetching user profile:', profileError)
        } else {
          setUserProfile(userProfileData)
          
          // Update profile state with real user data
          setProfile({
            name: userProfileData.full_name || user.email?.split('@')[0] || 'Vendor',
            email: user.email || '',
            phone: userProfileData.phone || '',
            address: userProfileData.address || '',
            bio: userProfileData.bio || 'Quality products from local vendors',
            businessLicense: userProfileData.business_license || 'N/A',
            yearsInBusiness: userProfileData.years_in_business || '1',
          })

          // Update payment request with user data
          setPaymentRequest(prev => ({
            ...prev,
            accountName: userProfileData.full_name || user.email?.split('@')[0] || 'Vendor',
            phoneNumber: userProfileData.phone || '',
          }))
        }

        // Get vendor-specific profile
        const { data: vendorProfileData, error: vendorError } = await supabase
          .from('vendors')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (vendorError) {
          console.error('Error fetching vendor profile:', vendorError)
        } else {
          setVendorProfile(vendorProfileData)
          
          // Update shop settings with vendor data
          setShopSettings(prev => ({
            ...prev,
            shopName: vendorProfileData.business_name || userProfileData?.full_name || 'My Business',
            description: vendorProfileData.description || 'Quality products from local vendors',
            location: vendorProfileData.location || userProfileData?.address || 'Nairobi, Kenya',
            accountName: vendorProfileData.business_name || userProfileData?.full_name || 'Vendor',
          }))
        }

      } catch (error) {
        console.error('Error fetching user data:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-[color:var(--color-accent)]/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[color:var(--color-primary)] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your vendor dashboard...</p>
        </div>
      </div>
    )
  }

  // Redirect if no user
  if (!user) {
    return null
  }

  const handleAddProduct = () => {
    // Handle adding new product
    console.log("Adding product:", newProduct)
    setIsAddProductOpen(false)
    setNewProduct({ name: "", price: "", stock: "", category: "", description: "" })
  }

  const handleRequestPayment = () => {
    console.log("Requesting payment:", paymentRequest)
    alert(`Payment request of KSh ${paymentRequest.amount} submitted successfully!`)
    setIsPaymentModalOpen(false)
    setPaymentRequest({ ...paymentRequest, amount: "" })
  }

  const handleProfileUpdate = () => {
    console.log("Profile updated:", profile)
    alert("Profile updated successfully!")
  }
  
  const handleShopSettingsUpdate = () => {
    console.log("Shop settings updated:", shopSettings)
    alert("Shop settings updated successfully!")
  }
  
  const handleLogout = async () => {
    try {
      const supabase = getSupabaseClient()
      if (supabase) {
        await supabase.auth.signOut()
        
        // Clear demo user cookies if they exist
        if (typeof document !== 'undefined') {
          document.cookie = 'demo-user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
          document.cookie = 'demo-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        }
        
        toast({
          title: "Logged out successfully",
          description: "You have been logged out of your account.",
        })
        
        // Redirect to home page
        router.push('/')
      }
    } catch (error) {
      console.error('Logout error:', error)
      toast({
        title: "Logout failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleMarkReady = (orderId: string) => {
    console.log("Marking order as ready:", orderId)
    setOrders((prevOrders: any[]) => 
      prevOrders.map((order: any) => 
        order.id === orderId 
          ? { ...order, status: "Ready" }
          : order
      )
    )
    alert(`Order ${orderId} marked as ready!`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[color:var(--color-primary)] to-[color:var(--color-primary)] rounded-xl flex items-center justify-center transform rotate-12 shadow-lg border-2 border-[color:var(--color-accent)]">
                  <span className="text-[color:var(--color-accent)] font-bold text-lg transform -rotate-12">🥬</span>
                </div>
                <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-primary)] bg-clip-text text-transparent">
                    Mboga Pap
                  </span>
                  <p className="text-xs text-gray-500 -mt-1">Fresh And Fast 🏍️</p>
                </div>
                <Badge className="bg-orange-500 text-white text-xs">Vendor Dashboard</Badge>
              </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">
                  {shopSettings.shopName || userProfile?.full_name || 'My Business'}
                </p>
                <p className="text-xs text-gray-600">
                  {shopSettings.location || userProfile?.address || 'Nairobi, Kenya'}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt="Vendor" />
                      <AvatarFallback>
                        {(userProfile?.full_name || user.email?.split('@')[0] || 'V').charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[color:var(--color-accent)]/95 border-2 border-[color:var(--color-primary)] shadow-lg backdrop-blur-sm" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal bg-[color:var(--color-primary)] text-white">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userProfile?.full_name || user.email?.split('@')[0] || 'Vendor'}
                      </p>
                      <p className="text-xs leading-none text-white/80">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setProfileOpen(true)} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]">
                    <User className="h-4 w-4 mr-2 text-[color:var(--color-primary)]" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSettingsOpen(true)} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]">
                    <Settings className="h-4 w-4 mr-2 text-[color:var(--color-primary)]" /> Shop Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setAnalyticsOpen(true)} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]">
                    <BarChart3 className="h-4 w-4 mr-2 text-[color:var(--color-primary)]" /> Analytics
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setHelpOpen(true)} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]">
                    <HelpCircle className="h-4 w-4 mr-2 text-[color:var(--color-primary)]" /> Help
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]">Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Orders</p>
                  <p className="text-3xl font-bold text-green-700">12</p>
                  <p className="text-xs text-green-600">+3 from yesterday</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-3xl font-bold text-blue-700">KSh 2,450</p>
                  <p className="text-xs text-blue-600">+22% from yesterday</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <div>
                  <p className="text-sm font-medium text-gray-600">Prep Time</p>
                  <p className="text-3xl font-bold text-purple-700">15 min</p>
                  <p className="text-xs text-purple-600">-2 min improvement</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rating</p>
                  <p className="text-3xl font-bold text-yellow-700">4.8</p>
                  <p className="text-xs text-yellow-600">+0.1 this week</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Star className="h-6 w-6 text-white fill-current" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Payment Request Section */}
        <Card className="mb-6 bg-gradient-to-r from-orange-50 via-yellow-50 to-green-50 border-2 border-orange-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
                  <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="h-5 w-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-orange-800">Available for Payout</h3>
                </div>
                <p className="text-4xl font-bold text-[color:var(--color-primary)] mb-1">KSh 8,750</p>
                    <p className="text-sm text-gray-600">From completed orders this week</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-green-600">+18% from last week</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                    <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
                      <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                      <DollarSign className="h-4 w-4 mr-2" />
                          Request Payment
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2 text-[color:var(--color-primary)]">
                      <DollarSign className="h-5 w-5 text-[color:var(--color-accent)]" />
                            <span>Request Payment</span>
                          </DialogTitle>
                          <DialogDescription>
                      Request a payout to your M-Pesa account
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="amount">Amount (KSh)</Label>
                            <Input
                              id="amount"
                              type="number"
                              placeholder="Enter amount"
                              value={paymentRequest.amount}
                              onChange={(e) => setPaymentRequest({ ...paymentRequest, amount: e.target.value })}
                              max="8750"
                            />
                            <p className="text-xs text-gray-500 mt-1">Maximum: KSh 8,750</p>
                          </div>
                    
                          <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-3">M-Pesa Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                          <span className="text-gray-600">Provider:</span>
                          <span>{paymentRequest.bankName}</span>
                                </div>
                                <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span>{paymentRequest.phoneNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Name:</span>
                          <span>{paymentRequest.accountName}</span>
                                </div>
                              </div>
                                </div>
                    
                          <div className="flex space-x-3">
                            <Button 
                              onClick={handleRequestPayment}
                        className="flex-1 bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)]/90 text-[color:var(--color-primary)]"
                              disabled={!paymentRequest.amount || Number(paymentRequest.amount) > 8750}
                            >
                              Submit Request
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setIsPaymentModalOpen(false)}
                              className="flex-1"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                </div>
                </div>
              </CardContent>
            </Card>

        {/* Main Dashboard Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Orders - Primary Section */}
              <div className="lg:col-span-2">
            <Card className="border-2 border-gray-200 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div>
                    <CardTitle className="text-[color:var(--color-primary)] text-lg">Recent Orders</CardTitle>
                      <CardDescription>Manage your incoming orders</CardDescription>
                  </div>
                  <Badge className="bg-[color:var(--color-primary)] text-white border-[color:var(--color-primary)]">
                    {orders.filter(o => o.status === "Pending" || o.status === "Preparing").length} Active
                  </Badge>
                    </div>
                  </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-3">
                      {orders.map((order) => (
                    <div key={order.id} className="border-b border-gray-100 last:border-b-0 p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="font-semibold text-[color:var(--color-primary)]">{order.id}</p>
                              <Badge
                                className={
                                  order.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                    : order.status === "Preparing"
                                    ? "bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] border-[color:var(--color-primary)]/20"
                                    : "bg-green-100 text-green-700 border-green-200"
                                }
                              >
                                {order.status}
                              </Badge>
                            </div>
                          <p className="text-sm text-gray-600 mb-1">{order.customer}</p>
                          <p className="text-sm text-gray-500">{order.items.join(", ")}</p>
                          <p className="font-semibold text-[color:var(--color-primary)] mt-1">{order.total}</p>
                          </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{order.time}</p>
                          </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                            {order.status === "Pending" && (
                          <Button size="sm" className="bg-[color:var(--color-accent)] hover:bg-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] transition-all duration-300">
                                Accept Order
                              </Button>
                            )}
                            {order.status === "Preparing" && (
                          <Button 
                            size="sm" 
                            className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:text-[color:var(--color-primary)] font-medium transition-all duration-300"
                            onClick={() => handleMarkReady(order.id)}
                          >
                                Mark Ready
                              </Button>
                            )}
                        <Button size="sm" variant="outline" className="hover:bg-[color:var(--color-primary)]/10 hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)] transition-colors duration-200">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

          {/* Inventory Management - Sidebar */}
          <div className="space-y-6">
            <Card className="border-2 border-gray-200 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
              <div>
                    <CardTitle className="text-[color:var(--color-primary)] text-lg">Inventory</CardTitle>
                      <CardDescription>Manage your products</CardDescription>
                    </div>
                    <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                      <DialogTrigger asChild>
                      <Button size="sm" className="bg-[color:var(--color-accent)] hover:bg-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] transition-all duration-300">
                          <Plus className="h-4 w-4 mr-1" />
                        Add
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Product</DialogTitle>
                          <DialogDescription>Add a new product to your inventory</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                              id="name"
                              value={newProduct.name}
                              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                              placeholder="e.g., Fresh Tomatoes"
                            />
                          </div>
                          <div>
                            <Label htmlFor="price">Price</Label>
                            <Input
                              id="price"
                              value={newProduct.price}
                              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                              placeholder="e.g., KSh 80/kg"
                            />
                          </div>
                          <div>
                            <Label htmlFor="stock">Stock Quantity</Label>
                            <Input
                              id="stock"
                              type="number"
                              value={newProduct.stock}
                              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                              placeholder="e.g., 25"
                            />
                          </div>
                          <div>
                            <Label htmlFor="category">Category</Label>
                            <Input
                              id="category"
                              value={newProduct.category}
                              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                              placeholder="e.g., Vegetables"
                            />
                          </div>
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={newProduct.description}
                              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                              placeholder="Product description..."
                            />
                          </div>
                        <div className="flex space-x-3 pt-4">
                          <Button 
                            onClick={handleAddProduct}
                            className="flex-1 bg-[color:var(--color-accent)] hover:bg-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] transition-all duration-300"
                          >
                            Add Product
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setIsAddProductOpen(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                </div>
                  </CardHeader>
              <CardContent className="p-0">
                    <div className="space-y-3">
                      {products.map((product) => (
                    <div key={product.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{product.name}</p>
                            <p className="text-xs text-gray-600">{product.price}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge
                            variant="default"
                            className={product.stock > 0 ? 'bg-green-600' : 'bg-red-600 text-white'}
                              >
                                {product.status}
                              </Badge>
                              <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

            {/* Transaction History */}
            <Card className="border-2 border-gray-200 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-[color:var(--color-primary)] text-lg">Transaction History</CardTitle>
                <CardDescription>Recent payout activities</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-3">
                  {[
                    { date: "2024-01-16", amount: "KSh 8,750", status: "Pending", ref: "PAY-001" },
                    { date: "2024-01-15", amount: "KSh 5,200", status: "Approved", ref: "PAY-003" },
                    { date: "2024-01-14", amount: "KSh 4,000", status: "Paid", ref: "PAY-000" },
                  ].map((tx) => (
                    <div key={tx.ref} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div>
                        <p className="font-medium text-sm">{tx.ref}</p>
                        <p className="text-xs text-gray-500">{tx.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm text-[color:var(--color-primary)]">{tx.amount}</p>
                        <Badge
                          className={
                            tx.status === 'Paid' ? 'bg-green-100 text-green-700 border-green-200' : 
                            tx.status === 'Approved' ? 'bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] border-[color:var(--color-primary)]/20' : 
                            'bg-yellow-100 text-yellow-700 border-yellow-200'
                          }
                        >
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
              </div>
            </div>
          </div>

      {/* Profile Modal */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-[color:var(--color-primary)]" />
              <span>Profile Settings</span>
            </DialogTitle>
            <DialogDescription>Manage your personal and business information</DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="address">Business Address</Label>
                <Input id="address" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="bio">Business Bio</Label>
                <Textarea id="bio" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} rows={3} />
              </div>
              <div>
                <Label htmlFor="license">Business License</Label>
                <Input id="license" value={profile.businessLicense} onChange={(e) => setProfile({ ...profile, businessLicense: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="years">Years in Business</Label>
                <Input id="years" value={profile.yearsInBusiness} onChange={(e) => setProfile({ ...profile, yearsInBusiness: e.target.value })} />
              </div>
              <div className="flex items-center space-x-2">
                <Button className="flex-1">
                  <Camera className="h-4 w-4 mr-2" /> Upload Photo
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button onClick={handleProfileUpdate} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Shop Settings Modal */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-[color:var(--color-primary)]" />
              <span>Shop Settings</span>
            </DialogTitle>
            <DialogDescription>Configure your shop preferences and operations</DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="shopName">Shop Name</Label>
                <Input id="shopName" value={shopSettings.shopName} onChange={(e) => setShopSettings({ ...shopSettings, shopName: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="shopDescription">Shop Description</Label>
                <Textarea id="shopDescription" value={shopSettings.description} onChange={(e) => setShopSettings({ ...shopSettings, description: e.target.value })} rows={3} />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={shopSettings.location} onChange={(e) => setShopSettings({ ...shopSettings, location: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="hours">Opening Hours</Label>
                <Input id="hours" value={shopSettings.openingHours} onChange={(e) => setShopSettings({ ...shopSettings, openingHours: e.target.value })} placeholder="e.g., 06:00-18:00" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="radius">Delivery Radius (km)</Label>
                <Select value={shopSettings.deliveryRadius} onValueChange={(value) => setShopSettings({ ...shopSettings, deliveryRadius: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 km</SelectItem>
                    <SelectItem value="5">5 km</SelectItem>
                    <SelectItem value="10">10 km</SelectItem>
                    <SelectItem value="15">15 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={shopSettings.language} onValueChange={(value) => setShopSettings({ ...shopSettings, language: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Swahili">Swahili</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoAccept">Auto-accept Orders</Label>
                    <p className="text-sm text-gray-600">Automatically accept incoming orders</p>
                  </div>
                  <Switch id="autoAccept" checked={shopSettings.autoAcceptOrders} onCheckedChange={(checked) => setShopSettings({ ...shopSettings, autoAcceptOrders: checked })} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications">Push Notifications</Label>
                    <p className="text-sm text-gray-600">Receive order notifications</p>
                  </div>
                  <Switch id="notifications" checked={shopSettings.notifications} onCheckedChange={(checked) => setShopSettings({ ...shopSettings, notifications: checked })} />
                </div>
              </div>
              {/* Payment Information */}
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select value={shopSettings.paymentMethod} onValueChange={value => setShopSettings({ ...shopSettings, paymentMethod: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bank">Bank</SelectItem>
                    <SelectItem value="Mpesa">M-Pesa</SelectItem>
                  </SelectContent>
                </Select>
                {shopSettings.paymentMethod === "Bank" && (
                  <div className="space-y-2 mt-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input id="bankName" value={shopSettings.bankName} onChange={e => setShopSettings({ ...shopSettings, bankName: e.target.value })} />
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input id="accountNumber" value={shopSettings.accountNumber} onChange={e => setShopSettings({ ...shopSettings, accountNumber: e.target.value })} />
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input id="accountName" value={shopSettings.accountName} onChange={e => setShopSettings({ ...shopSettings, accountName: e.target.value })} />
                  </div>
                )}
                {shopSettings.paymentMethod === "Mpesa" && (
                  <div className="space-y-2 mt-2">
                    <Label htmlFor="mpesaNumber">M-Pesa Number</Label>
                    <Input id="mpesaNumber" value={shopSettings.mpesaNumber} onChange={e => setShopSettings({ ...shopSettings, mpesaNumber: e.target.value })} />
                    <Label htmlFor="mpesaName">M-Pesa Name</Label>
                    <Input id="mpesaName" value={shopSettings.mpesaName} onChange={e => setShopSettings({ ...shopSettings, mpesaName: e.target.value })} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button onClick={handleShopSettingsUpdate} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" /> Save Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Analytics Modal */}
      <Dialog open={analyticsOpen} onOpenChange={setAnalyticsOpen}>
        <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-[color:var(--color-primary)]" />
              <span>Analytics</span>
            </DialogTitle>
            <DialogDescription>View your shop's performance and insights</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Sales</p>
                    <p className="text-2xl font-bold text-[color:var(--color-primary)]">KSh 45,600</p>
                    <p className="text-xs text-gray-500">+12% from last month</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-[color:var(--color-primary)]" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Orders Completed</p>
                    <p className="text-2xl font-bold text-[color:var(--color-primary)]">156</p>
                    <p className="text-xs text-gray-500">+8% from last month</p>
                  </div>
                  <Package className="h-8 w-8 text-[color:var(--color-primary)]" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Customer Rating</p>
                    <p className="text-2xl font-bold text-[color:var(--color-primary)]">4.8</p>
                    <p className="text-xs text-gray-500">+0.2 from last month</p>
                  </div>
                  <Star className="h-8 w-8 text-[color:var(--color-primary)]" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-[color:var(--color-primary)]" />
                  <span>Sales Trend</span>
                </CardTitle>
                <CardDescription>Monthly sales performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Sales chart will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-[color:var(--color-primary)]" />
                  <span>Top Products</span>
                </CardTitle>
                <CardDescription>Best performing products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Fresh Tomatoes", sales: 45, revenue: "KSh 3,600" },
                    { name: "Spinach", sales: 38, revenue: "KSh 1,520" },
                    { name: "Red Onions", sales: 32, revenue: "KSh 1,920" },
                    { name: "Carrots", sales: 28, revenue: "KSh 1,400" },
                  ].map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sales} units sold</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[color:var(--color-primary)]">{product.revenue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-[color:var(--color-primary)]" />
                <span>Performance Insights</span>
              </CardTitle>
              <CardDescription>Key metrics and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-[color:var(--color-primary)]">Strengths</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[color:var(--color-primary)] rounded-full"></div>
                      <span>Excellent customer ratings (4.8/5)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[color:var(--color-primary)] rounded-full"></div>
                      <span>Fast order preparation (15 min avg)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[color:var(--color-primary)] rounded-full"></div>
                      <span>High order completion rate (98%)</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-orange-600">Recommendations</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Add more product photos to increase sales</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Consider expanding delivery radius</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Offer bundle deals to increase order value</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>

      {/* Help Modal */}
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <HelpCircle className="h-5 w-5 text-[color:var(--color-primary)]" />
              <span>Help & Support</span>
            </DialogTitle>
            <DialogDescription>Get help with your vendor account and operations</DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Quick Actions</h4>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" /> Download User Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" /> Schedule Training Session
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" /> Contact Support
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Contact Information</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span>+254 700 123 456</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <span>support@mbongapap.co.ke</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <span>Nairobi, Kenya</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold mb-4">Frequently Asked Questions</h4>
            <div className="space-y-4">
              {[
                {
                  question: "How do I update my product inventory?",
                  answer: "Go to the Dashboard tab and use the 'Add Product' button in the Inventory section to add new products or edit existing ones."
                },
                {
                  question: "How do I request a payout?",
                  answer: "Use the 'Request Payment' button on the Dashboard to submit a payout request. Payments are processed within 2-3 business days."
                },
                {
                  question: "What should I do if I can't fulfill an order?",
                  answer: "Contact customer support immediately and mark the order as 'Cannot Fulfill' in your order management section."
                },
                {
                  question: "How do I change my shop settings?",
                  answer: "Use the Shop Settings modal in the avatar menu to update your shop information, delivery radius, and other preferences."
                }
              ].map((faq, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h5 className="font-medium mb-2 text-[color:var(--color-primary)]">{faq.question}</h5>
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
