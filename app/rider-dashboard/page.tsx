"use client"

import { useState, useEffect } from "react"
import { MapPin, Clock, DollarSign, Star, Navigation, Phone, CheckCircle, CreditCard, Camera, Save, User, Truck, HelpCircle, Settings, Zap, TrendingUp, Award, Target, Activity, Bike, AlertCircle, CheckCircle2, XCircle, Play, Pause, RotateCcw, Shield, Heart, Gift, Sparkles, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

const availableDeliveries = [
  {
    id: "DEL-001",
    vendor: "Mama Grace Vegetables",
    customer: "John Doe",
    pickupAddress: "Westlands Market, Nairobi",
    deliveryAddress: "Kilimani, Nairobi",
    distance: "3.2 km",
    earnings: "KSh 150",
    estimatedTime: "25 mins",
    items: ["Tomatoes (2kg)", "Onions (1kg)", "Spinach (1 bunch)"],
    priority: "high",
    bonus: "KSh 20 bonus for quick delivery"
  },
  {
    id: "DEL-002",
    vendor: "Kiprotich Fresh Produce",
    customer: "Sarah Kim",
    pickupAddress: "Kawangware Market, Nairobi",
    deliveryAddress: "Lavington, Nairobi",
    distance: "4.1 km",
    earnings: "KSh 180",
    estimatedTime: "30 mins",
    items: ["Carrots (2kg)", "Potatoes (3kg)", "Cabbage (1 head)"],
    priority: "normal",
    bonus: null
  },
]

const activeDeliveries = [
  {
    id: "DEL-003",
    vendor: "Njeri's Market",
    customer: "Mike Johnson",
    pickupAddress: "Githurai Market, Nairobi",
    deliveryAddress: "Kasarani, Nairobi",
    distance: "2.8 km",
    earnings: "KSh 140",
    status: "Picked Up",
    customerPhone: "+254 700 123 456",
    progress: 75,
    timeRemaining: "12 mins"
  },
]

const achievements = [
  { id: 1, title: "Speed Demon", description: "Complete 10 deliveries under 20 mins", icon: Zap, progress: 8, target: 10, reward: "KSh 500" },
  { id: 2, title: "Customer Favorite", description: "Get 50 5-star ratings", icon: Star, progress: 42, target: 50, reward: "KSh 1,000" },
  { id: 3, title: "Weekend Warrior", description: "Work 5 weekends in a row", icon: Award, progress: 3, target: 5, reward: "KSh 2,000" },
]

export default function RiderDashboard() {
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [riderProfile, setRiderProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [paymentRequest, setPaymentRequest] = useState({
    amount: "",
    bankName: "M-Pesa",
    phoneNumber: "",
    accountName: "",
  })

  // Profile modal state
  const [profileOpen, setProfileOpen] = useState(false)
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [motorbikeInfoOpen, setMotorbikeInfoOpen] = useState(false);
  const [motorbike, setMotorbike] = useState({
    make: "",
    model: "",
    color: "",
    plate: "",
  });

  const router = useRouter();
  const { toast } = useToast();
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

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
            name: userProfileData.full_name || user.email?.split('@')[0] || 'User',
            email: user.email || '',
            phone: userProfileData.phone || '',
            address: userProfileData.address || '',
          })

          // Update payment request with user data
          setPaymentRequest(prev => ({
            ...prev,
            phoneNumber: userProfileData.phone || '',
            accountName: userProfileData.full_name || user.email?.split('@')[0] || 'User',
          }))
        }

        // Get rider-specific profile
        const { data: riderProfileData, error: riderError } = await supabase
          .from('rider_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (riderError) {
          console.error('Error fetching rider profile:', riderError)
        } else {
          setRiderProfile(riderProfileData)
          
          // Update motorbike info with rider data
          setMotorbike({
            make: riderProfileData.vehicle_type || 'Motorcycle',
            model: '2022',
            color: 'Red',
            plate: riderProfileData.vehicle_number || 'N/A',
          })
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-[color:var(--color-accent)]/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[color:var(--color-primary)] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your rider dashboard...</p>
        </div>
      </div>
    )
  }

  // Redirect if no user
  if (!user) {
    return null
  }

  const handleAcceptDelivery = (delivery: any) => {
    setToastMsg(`🚀 Delivery ${delivery.id} accepted! You're on your way!`);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }

  const handleRequestPayment = () => {
    console.log("Requesting payment:", paymentRequest)
    setToastMsg(`💰 Payment request of KSh ${paymentRequest.amount} submitted!`);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
    setIsPaymentModalOpen(false)
    setPaymentRequest({ ...paymentRequest, amount: "" })
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

  const handleNavigate = (address: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`);
  };
  
  const handleCallCustomer = (phone: string) => {
    window.open(`tel:${phone}`);
  };
  
  const handleMarkDelivered = (deliveryId: string) => {
    setToastMsg(`✅ Delivery ${deliveryId} completed! Great job!`);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    setToastMsg(isOnline ? "🔴 You're now offline" : "🟢 You're now online and ready for deliveries!");
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-[color:var(--color-accent)]/10">
        {/* Header */}
        <header className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[color:var(--color:var(--color-primary)] to-[color:var(--color-primary)] rounded-xl flex items-center justify-center transform rotate-12 shadow-lg border-2 border-[color:var(--color-accent)]">
                    <span className="text-[color:var(--color-accent)] font-bold text-lg transform -rotate-12">🥬</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-primary)] bg-clip-text text-transparent">
                      Mboga Pap
                    </span>
                    <p className="text-xs text-gray-500 -mt-1">Fresh And Fast 🏍️</p>
                  </div>
                </div>
                <Badge className="bg-blue-500 text-white">Rider Dashboard</Badge>
              </div>

              <div className="flex items-center space-x-4">
                {/* Online Status Toggle */}
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-medium text-gray-700">{isOnline ? 'Online' : 'Offline'}</span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={toggleOnlineStatus}
                    className={`${isOnline ? 'border-green-500 text-green-600 hover:bg-green-50' : 'border-red-500 text-red-600 hover:bg-red-50'}`}
                  >
                    {isOnline ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-[color:var(--color-primary)]">
                    {userProfile?.full_name || user.email?.split('@')[0] || 'Rider'}
                  </p>
                  <p className="text-xs text-gray-600">Bodaboda Rider</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" alt="Rider" />
                        <AvatarFallback>
                          {(userProfile?.full_name || user.email?.split('@')[0] || 'R').charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-[color:var(--color-accent)]/95 border-2 border-[color:var(--color-primary)] shadow-lg backdrop-blur-sm" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal bg-[color:var(--color-primary)] text-white">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {userProfile?.full_name || user.email?.split('@')[0] || 'Rider'}
                        </p>
                        <p className="text-xs leading-none text-white/80">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setProfileOpen(true)} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]">
                      <User className="h-4 w-4 mr-2 text-[color:var(--color-primary)]" /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSettingsOpen(true)} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]">
                      <Settings className="h-4 w-4 mr-2 text-[color:var(--color-primary)]" /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setMotorbikeInfoOpen(true)} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]">
                      <Bike className="h-4 w-4 mr-2 text-[color:var(--color-primary)]" /> Vehicle Info
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/rider-dashboard/earnings")} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]"> 
                      <DollarSign className="h-4 w-4 mr-2 text-[color:var(--color-primary)]" /> Earnings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/help")} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]"> 
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

        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Deliveries</p>
                    <p className="text-3xl font-bold text-green-700">8</p>
                    <p className="text-xs text-green-600">+2 from yesterday</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Earnings</p>
                    <p className="text-3xl font-bold text-blue-700">KSh 1,200</p>
                    <p className="text-xs text-blue-600">+15% from yesterday</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Delivery Time</p>
                    <p className="text-3xl font-bold text-purple-700">22 min</p>
                    <p className="text-xs text-purple-600">-3 min improvement</p>
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
                    <p className="text-3xl font-bold text-yellow-700">4.9</p>
                    <p className="text-xs text-yellow-600">+0.2 this week</p>
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
                    <Gift className="h-5 w-5 text-orange-600" />
                    <h3 className="text-lg font-semibold text-orange-800">Available for Payout</h3>
                  </div>
                  <p className="text-4xl font-bold text-[color:var(--color-primary)] mb-1">KSh 3,450</p>
                  <p className="text-sm text-gray-600">From completed deliveries this week</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-xs text-green-600">+12% from last week</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Sparkles className="h-4 w-4 text-blue-600" />
                      <span className="text-xs text-blue-600">Eligible for bonus</span>
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
                        <DialogTitle className="flex items-center space-x-2">
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
                            max="3450"
                          />
                          <p className="text-xs text-gray-500 mt-1">Maximum: KSh 3,450</p>
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
                            className="flex-1 bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)]/90"
                            disabled={!paymentRequest.amount || Number(paymentRequest.amount) > 3450}
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

          {/* Achievements Section */}
          <Card className="mb-6 border-2 border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[color:var(--color-primary)] flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Achievements & Rewards</span>
              </CardTitle>
              <CardDescription>Complete challenges to earn bonuses and rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="border rounded-lg p-4 bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[color:var(--color-primary)] to-[color:var(--color-accent)] rounded-lg flex items-center justify-center">
                        <achievement.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{achievement.progress}/{achievement.target}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent)] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Reward</span>
                        <Badge className="bg-green-100 text-green-800 text-xs">{achievement.reward}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="mb-6 border-2 border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[color:var(--color-primary)]">Transaction History</CardTitle>
              <CardDescription>Recent payout requests and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-semibold">Date</th>
                      <th className="px-4 py-3 text-left font-semibold">Amount</th>
                      <th className="px-4 py-3 text-left font-semibold">Status</th>
                      <th className="px-4 py-3 text-left font-semibold">Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: "2024-01-16", amount: "KSh 3,450", status: "Pending", ref: "PAY-002" },
                      { date: "2024-01-15", amount: "KSh 2,800", status: "Paid", ref: "PAY-004" },
                    ].map((tx) => (
                      <tr key={tx.ref} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">{tx.date}</td>
                        <td className="px-4 py-3 font-medium">{tx.amount}</td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            tx.status === 'Paid' ? 'bg-green-100 text-green-700' : tx.status === 'Approved' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{tx.ref}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Enhanced Available Deliveries */}
            <Card className="border-2 border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[color:var(--color-primary)] flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Available Deliveries</span>
                </CardTitle>
                <CardDescription>Accept deliveries near your location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableDeliveries.map((delivery) => (
                    <div key={delivery.id} className={`border rounded-lg p-4 transition-all duration-300 hover:shadow-lg ${
                      delivery.priority === 'high' ? 'border-orange-300 bg-orange-50' : 'border-gray-200 bg-white'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                          <p className="font-medium">{delivery.id}</p>
                            {delivery.priority === 'high' && (
                              <Badge className="bg-orange-500 text-white text-xs">Priority</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{delivery.vendor}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[color:var(--color-accent)]">{delivery.earnings}</p>
                          <p className="text-xs text-gray-500">
                            {delivery.distance} • {delivery.estimatedTime}
                          </p>
                          {delivery.bonus && (
                            <p className="text-xs text-green-600 font-medium">{delivery.bonus}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-[color:var(--color-accent)] mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Pickup</p>
                            <p className="text-xs text-gray-600">{delivery.pickupAddress}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-red-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Delivery</p>
                            <p className="text-xs text-gray-600">{delivery.deliveryAddress}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm font-medium mb-1">Items:</p>
                        <p className="text-xs text-gray-600">{delivery.items.join(", ")}</p>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-[color:var(--color-accent)] to-[color:var(--color-primary)] hover:from-[color:var(--color-primary)] hover:to-[color:var(--color-accent)] text-white transition-all duration-300"
                          onClick={() => handleAcceptDelivery(delivery)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept Delivery
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delivery Details - {delivery.id}</DialogTitle>
                              <DialogDescription>Complete delivery information</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Vendor Information</h4>
                                <p className="text-sm">{delivery.vendor}</p>
                                <p className="text-xs text-gray-600">{delivery.pickupAddress}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Customer Information</h4>
                                <p className="text-sm">{delivery.customer}</p>
                                <p className="text-xs text-gray-600">{delivery.deliveryAddress}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Order Items</h4>
                                <ul className="text-sm space-y-1">
                                  {delivery.items.map((item, index) => (
                                    <li key={index} className="text-gray-600">
                                      • {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="flex justify-between items-center pt-4 border-t">
                                <div>
                                  <p className="text-sm text-gray-600">Estimated Earnings</p>
                                  <p className="font-bold text-[color:var(--color-accent)]">{delivery.earnings}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Distance & Time</p>
                                  <p className="font-medium">
                                    {delivery.distance} • {delivery.estimatedTime}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Active Deliveries */}
            <Card className="border-2 border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[color:var(--color-primary)] flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Active Deliveries</span>
                </CardTitle>
                <CardDescription>Your current delivery assignments</CardDescription>
              </CardHeader>
              <CardContent>
                {activeDeliveries.length > 0 ? (
                  <div className="space-y-4">
                    {activeDeliveries.map((delivery) => (
                      <div key={delivery.id} className="border rounded-lg p-4 bg-gradient-to-br from-[color:var(--color-primary)]/5 to-[color:var(--color-accent)]/10">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-medium">{delivery.id}</p>
                            <p className="text-sm text-gray-600">{delivery.vendor}</p>
                          </div>
                          <Badge className="bg-[color:var(--color-primary)] text-white">{delivery.status}</Badge>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Delivery Progress</span>
                            <span className="font-medium">{delivery.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent)] h-2 rounded-full transition-all duration-500"
                              style={{ width: `${delivery.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Estimated time remaining: {delivery.timeRemaining}</p>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-[color:var(--color-accent)] mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">From</p>
                              <p className="text-xs text-gray-600">{delivery.pickupAddress}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-red-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">To</p>
                              <p className="text-xs text-gray-600">{delivery.deliveryAddress}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white" onClick={() => handleNavigate(delivery.deliveryAddress)}>
                            <Navigation className="h-4 w-4 mr-1" />
                            Navigate
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleCallCustomer(delivery.customerPhone)}>
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white" onClick={() => handleMarkDelivered(delivery.id)}>
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Complete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 font-medium">No active deliveries</p>
                    <p className="text-sm text-gray-500">Accept a delivery to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Earnings Summary */}
          <Card className="mt-6 border-2 border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[color:var(--color-primary)] flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Weekly Performance Summary</span>
              </CardTitle>
              <CardDescription>Your performance this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <p className="text-3xl font-bold text-green-700">KSh 8,400</p>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-xs text-green-600 mt-1">+18% from last week</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <p className="text-3xl font-bold text-blue-700">42</p>
                  <p className="text-sm text-gray-600">Deliveries Completed</p>
                  <p className="text-xs text-blue-600 mt-1">+5 from last week</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <p className="text-3xl font-bold text-purple-700">4.9</p>
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <p className="text-xs text-purple-600 mt-1">+0.2 improvement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Modal (read-only) */}
        <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-[color:var(--color-primary)]" />
                <span>Profile</span>
              </DialogTitle>
              <DialogDescription>Your profile details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <div className="px-3 py-2 bg-gray-100 rounded">{profile.name}</div>
              </div>
              <div>
                <Label>Email</Label>
                <div className="px-3 py-2 bg-gray-100 rounded">{profile.email}</div>
              </div>
              <div>
                <Label>Phone Number</Label>
                <div className="px-3 py-2 bg-gray-100 rounded">{profile.phone}</div>
              </div>
              <div>
                <Label>Address</Label>
                <div className="px-3 py-2 bg-gray-100 rounded">{profile.address}</div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Settings Modal (editable) */}
        <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-gray-600" />
                <span>Settings</span>
              </DialogTitle>
              <DialogDescription>Edit your profile details</DialogDescription>
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
              <Button onClick={() => { setSettingsOpen(false); alert('Profile updated!') }} className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/90">
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Motorbike Info Modal */}
        <Dialog open={motorbikeInfoOpen} onOpenChange={setMotorbikeInfoOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Bike className="h-5 w-5 text-[color:var(--color-primary)]" />
                <span>Motorbike Information</span>
              </DialogTitle>
              <DialogDescription>Manage your motorbike details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="make">Make</Label>
                <Input id="make" value={motorbike.make} onChange={e => setMotorbike({ ...motorbike, make: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Input id="model" value={motorbike.model} onChange={e => setMotorbike({ ...motorbike, model: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Input id="color" value={motorbike.color} onChange={e => setMotorbike({ ...motorbike, color: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="plate">Plate Number</Label>
                <Input id="plate" value={motorbike.plate} onChange={e => setMotorbike({ ...motorbike, plate: e.target.value })} />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={() => { setMotorbikeInfoOpen(false); alert('Motorbike information updated!') }} className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/90">
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Enhanced Toast Notification */}
        {toastMsg && toastVisible && (
          <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent)] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 animate-fade-in transition-all duration-500 max-w-sm">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <span className="font-medium">{toastMsg}</span>
          </div>
        )}
      </div>
  )
}

