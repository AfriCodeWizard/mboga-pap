"use client"

import { useState, useEffect, useRef } from "react"
import { Users, Package, Truck, TrendingUp, AlertCircle, CheckCircle, XCircle, Eye, DollarSign, Clock, UserCheck, Menu, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Head from "next/head";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const platformStats = {
  totalUsers: 1247,
  totalVendors: 89,
  totalRiders: 156,
  totalOrders: 3421,
  monthlyRevenue: 456000, // Changed to KSh
  activeOrders: 23,
}

const pendingVendors = [
  {
    id: 1,
    name: "Mary Wanjiku",
    shopName: "Wanjiku Fresh Produce",
    location: "Kibera, Nairobi",
    phone: "+254 700 123 456",
    joinDate: "2024-01-15",
    status: "Pending",
  },
  {
    id: 2,
    name: "James Mwangi",
    shopName: "Mwangi Vegetables",
    location: "Eastleigh, Nairobi",
    phone: "+254 700 789 012",
    joinDate: "2024-01-14",
    status: "Pending",
  },
]

const pendingRiders = [
  {
    id: 1,
    name: "David Kiprop",
    phone: "+254 700 345 678",
    license: "DL123456789",
    location: "Kasarani, Nairobi",
    joinDate: "2024-01-16",
    status: "Pending",
  },
  {
    id: 2,
    name: "Samuel Ochieng",
    phone: "+254 700 901 234",
    license: "DL987654321",
    location: "Embakasi, Nairobi",
    joinDate: "2024-01-15",
    status: "Pending",
  },
]

const recentOrders = [
  {
    id: "ORD-1001",
    customer: "John Doe",
    vendor: "Mama Grace Vegetables",
    rider: "Peter Ochieng",
    total: "KSh 450",
    status: "Delivered",
    date: "2024-01-16",
  },
  {
    id: "ORD-1002",
    customer: "Sarah Kim",
    vendor: "Kiprotich Fresh Produce",
    rider: "Michael Wanjiku",
    total: "KSh 320",
    status: "In Transit",
    date: "2024-01-16",
  },
  {
    id: "ORD-1003",
    customer: "Mike Johnson",
    vendor: "Njeri's Market",
    rider: "David Kiprop",
    total: "KSh 280",
    status: "Preparing",
    date: "2024-01-16",
  },
]

const payoutRequests = [
  {
    id: "PAY-001",
            requester: "Fresh Harvest",
    type: "Vendor",
    amount: "KSh 8,750",
    bankDetails: "Equity Bank - 1234567890",
    requestDate: "2024-01-16",
    status: "Pending",
    phone: "+254 700 123 456",
  },
  {
    id: "PAY-002",
    requester: "Peter Ochieng",
    type: "Rider",
    amount: "KSh 3,450",
    bankDetails: "M-Pesa - +254 700 123 456",
    requestDate: "2024-01-16",
    status: "Pending",
    phone: "+254 700 123 456",
  },
  {
    id: "PAY-003",
    requester: "Kiprotich Fresh Produce",
    type: "Vendor",
    amount: "KSh 5,200",
    bankDetails: "Cooperative Bank - 0987654321",
    requestDate: "2024-01-15",
    status: "Approved",
    phone: "+254 700 789 012",
  },
  {
    id: "PAY-004",
    requester: "David Kiprop",
    type: "Rider",
    amount: "KSh 2,800",
    bankDetails: "M-Pesa - +254 700 345 678",
    requestDate: "2024-01-15",
    status: "Paid",
    phone: "+254 700 345 678",
  },
]

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  // Close drawer on outside click
  useEffect(() => {
    if (!drawerOpen) return;
    function handleClick(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setDrawerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [drawerOpen]);

  const handleApproveVendor = (vendorId: number) => {
    console.log("Approving vendor:", vendorId)
    // Handle vendor approval
  }

  const handleRejectVendor = (vendorId: number) => {
    console.log("Rejecting vendor:", vendorId)
    // Handle vendor rejection
  }

  const handleApproveRider = (riderId: number) => {
    console.log("Approving rider:", riderId)
    // Handle rider approval
  }

  const handleRejectRider = (riderId: number) => {
    console.log("Rejecting rider:", riderId)
    // Handle rider rejection
  }

  const handleApprovePayout = (payoutId: string) => {
    console.log("Approving payout:", payoutId)
    alert(`Payout ${payoutId} approved successfully!`)
    // Handle payout approval
  }

  const handleRejectPayout = (payoutId: string) => {
    console.log("Rejecting payout:", payoutId)
    alert(`Payout ${payoutId} rejected!`)
    // Handle payout rejection
  }

  const handleMarkAsPaid = (payoutId: string) => {
    console.log("Marking payout as paid:", payoutId)
    alert(`Payout ${payoutId} marked as paid!`)
    // Handle marking as paid
  }

  const handlePreparingOrder = (orderId: string) => {
    console.log("Marking order as preparing:", orderId)
    alert(`Order ${orderId} marked as preparing!`)
    // Handle marking as preparing
  }

  const handleLogout = () => {
    // Clear demo user cookies if they exist
    if (typeof document !== 'undefined') {
      document.cookie = 'demo-user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      document.cookie = 'demo-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
    // Handle logout logic
    window.location.href = "/"
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Mboga Pap!</title>
        <meta name="description" content="Admin dashboard for managing vendors, riders, and platform analytics on Mboga Pap!" />
        <meta property="og:title" content="Admin Dashboard - Mboga Pap!" />
        <meta property="og:description" content="Admin dashboard for managing vendors, riders, and platform analytics on Mboga Pap!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mbongapap.co.ke/admin" />
        <meta property="og:image" content="/placeholder.jpg" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        {/* Sticky Header */}
        <header className="bg-white border-b sticky top-0 z-30">
          <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Hamburger for mobile */}
              <button className="md:hidden mr-2 p-2 rounded hover:bg-gray-100 min-w-[48px] min-h-[48px] flex items-center justify-center" onClick={() => setDrawerOpen(true)}>
                <Menu className="h-6 w-6" />
              </button>
              {/* Logo Container - Independent and Fixed */}
                             <div className="flex-shrink-0" style={{ width: '130px', height: '56px', display: 'flex', alignItems: 'center' }}>
                <div className="flex items-center">
                  <img 
                    src="/mbogapap-logo-crop.png" 
                    alt="Mboga Pap logo" 
                    className="object-contain"
                    style={{ height: '130px', width: '130px' }}
                  />
                </div>
              </div>
              <Badge className="bg-[color:var(--color-primary)] text-[color:var(--color-accent)] text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5">Admin Dashboard</Badge>
            </div>
            {/* ... existing profile dropdown ... */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs sm:text-sm font-medium">Admin User</p>
                <p className="text-[10px] sm:text-xs text-gray-600">Platform Administrator</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-12 w-12 sm:h-8 sm:w-8 rounded-full min-w-[48px] min-h-[48px] flex items-center justify-center">
                    <Avatar className="h-8 w-8 sm:h-8 sm:w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Admin User</p>
                      <p className="text-xs leading-none text-muted-foreground">admin@demo.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2 text-[color:var(--color-primary)]" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2 text-gray-600" /> Platform Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <TrendingUp className="h-4 w-4 mr-2 text-[color:var(--color-accent)]" /> Reports
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <AlertCircle className="h-4 w-4 mr-2 text-[color:var(--color-primary)]" /> Help
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        {/* Mobile Drawer */}
        {drawerOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div ref={drawerRef} className="w-64 max-w-[80vw] bg-white h-full shadow-lg p-4 flex flex-col space-y-2 animate-slideInLeft">
              <button className="self-end mb-4 p-1 min-w-[48px] min-h-[48px] text-2xl" onClick={() => setDrawerOpen(false)}>&times;</button>
              <button className={`w-full text-left px-4 py-3 rounded-lg font-medium min-h-[48px] ${selectedTab === 'overview' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`} onClick={() => { setSelectedTab('overview'); setDrawerOpen(false); }}>Overview</button>
              <button className={`w-full text-left px-4 py-3 rounded-lg font-medium min-h-[48px] ${selectedTab === 'analytics' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`} onClick={() => { setSelectedTab('analytics'); setDrawerOpen(false); }}>Analytics</button>
              <button className={`w-full text-left px-4 py-3 rounded-lg font-medium min-h-[48px] ${selectedTab === 'vendors' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`} onClick={() => { setSelectedTab('vendors'); setDrawerOpen(false); }}>Vendors</button>
              <button className={`w-full text-left px-4 py-3 rounded-lg font-medium min-h-[48px] ${selectedTab === 'riders' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`} onClick={() => { setSelectedTab('riders'); setDrawerOpen(false); }}>Riders</button>
              <button className={`w-full text-left px-4 py-3 rounded-lg font-medium min-h-[48px] ${selectedTab === 'orders' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`} onClick={() => { setSelectedTab('orders'); setDrawerOpen(false); }}>Orders</button>
              <button className={`w-full text-left px-4 py-3 rounded-lg font-medium min-h-[48px] ${selectedTab === 'payouts' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`} onClick={() => { setSelectedTab('payouts'); setDrawerOpen(false); }}>Payouts</button>
              <button className={`w-full text-left px-4 py-3 rounded-lg font-medium min-h-[48px] ${selectedTab === 'transactions' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`} onClick={() => { setSelectedTab('transactions'); setDrawerOpen(false); }}>Transaction History</button>
            </div>
            <div className="flex-1 bg-black bg-opacity-30" onClick={() => setDrawerOpen(false)}></div>
          </div>
        )}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar for desktop */}
          <nav className="hidden md:block w-56 bg-white border-r min-h-screen pt-8 px-2 lg:px-4">
            <ul className="space-y-2">
              <li><button className={`w-full text-left px-4 py-3 rounded-lg font-medium min-h-[48px] ${selectedTab === 'overview' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`} onClick={() => setSelectedTab('overview')}>Overview</button></li>
              <li><button className={`w-full text-left px-4 py-3 rounded-lg font-medium min-h-[48px] ${selectedTab === 'analytics' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`} onClick={() => setSelectedTab('analytics')}>Analytics</button></li>
              <li><button className={`w-full text-left px-4 py-3 rounded-lg font-medium min-h-[48px] ${selectedTab === 'vendors' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`} onClick={() => setSelectedTab('vendors')}>Vendors</button></li>
              <li><button className={`w-full text-left px-4 py-3 rounded-lg font-medium min-h-[48px] ${selectedTab === 'riders' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`} onClick={() => setSelectedTab('riders')}>Riders</button></li>
              <li><button className={`w-full text-left px-4 py-3 rounded-lg font-medium min-h-[48px] ${selectedTab === 'orders' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`} onClick={() => setSelectedTab('orders')}>Orders</button></li>
              <li><button className={`w-full text-left px-4 py-3 rounded-lg font-medium min-h-[48px] ${selectedTab === 'payouts' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`} onClick={() => setSelectedTab('payouts')}>Payouts</button></li>
              <li><button className={`w-full text-left px-4 py-3 rounded-lg font-medium min-h-[48px] ${selectedTab === 'transactions' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`} onClick={() => setSelectedTab('transactions')}>Transaction History</button></li>
            </ul>
          </nav>
          {/* Main content area */}
          <div className="flex-1 min-w-0">
            <div className="container mx-auto px-1 sm:px-2 md:px-4 py-4 sm:py-6">
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                {/* Tab contents remain unchanged */}

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="space-y-6">
                  <Card className="w-full border-2 border-gray-200 shadow-md">
                    <CardHeader>
                      <CardTitle>Platform Analytics</CardTitle>
                      <CardDescription>Key trends and metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Orders Trend Line Chart */}
                        <div>
                          <h3 className="font-semibold mb-2">Orders Trend (Last 7 Days)</h3>
                          <Line
                            data={{
                              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                              datasets: [
                                {
                                  label: 'Orders',
                                  data: [50, 75, 60, 90, 120, 80, 100],
                                  borderColor: 'rgb(34,197,94)',
                                  backgroundColor: 'rgba(34,197,94,0.2)',
                                  tension: 0.4,
                                },
                              ],
                            }}
                            options={{
                              responsive: true,
                              plugins: {
                                legend: { display: false },
                                title: { display: false },
                              },
                              scales: {
                                y: { beginAtZero: true },
                              },
                            }}
                          />
                        </div>
                        {/* Revenue Bar Chart */}
                        <div>
                          <h3 className="font-semibold mb-2">Revenue Trend (Last 7 Days)</h3>
                          <Bar
                            data={{
                              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                              datasets: [
                                {
                                  label: 'Revenue (KSh)',
                                  data: [12000, 18000, 15000, 20000, 25000, 17000, 22000],
                                  backgroundColor: 'rgba(168,85,247,0.7)',
                                },
                              ],
                            }}
                            options={{
                              responsive: true,
                              plugins: {
                                legend: { display: false },
                                title: { display: false },
                              },
                              scales: {
                                y: { beginAtZero: true },
                              },
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="overview" className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="w-full border-2 border-gray-200 shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total Users</p>
                            <p className="text-2xl font-bold">{platformStats.totalUsers.toLocaleString()}</p>
                          </div>
                          <Users className="h-8 w-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="w-full border-2 border-gray-200 shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Active Vendors</p>
                            <p className="text-2xl font-bold">{platformStats.totalVendors}</p>
                          </div>
                          <Package className="h-8 w-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="w-full border-2 border-gray-200 shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Active Riders</p>
                            <p className="text-2xl font-bold">{platformStats.totalRiders}</p>
                          </div>
                          <Truck className="h-8 w-8 text-orange-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="w-full border-2 border-gray-200 shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                            <p className="text-2xl font-bold">KSh {platformStats.monthlyRevenue.toLocaleString()}</p>
                          </div>
                          <TrendingUp className="h-8 w-8 text-purple-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Activity */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <Card className="w-full border-2 border-gray-200 shadow-md">
                      <CardHeader>
                        <CardTitle className="text-[color:var(--color-primary)]">Recent Orders</CardTitle>
                        <CardDescription>Latest platform activity</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentOrders.slice(0, 5).map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium text-sm">{order.id}</p>
                                <p className="text-xs text-gray-600">
                                  {order.customer} → {order.vendor}
                                </p>
                              </div>
                              <div className="text-right">
                                <Badge
                                  variant={
                                    order.status === "Delivered"
                                      ? "default"
                                      : order.status === "In Transit"
                                        ? "secondary"
                                        : "outline"
                                  }
                                  className={
                                    order.status === "Delivered"
                                      ? "bg-green-600"
                                      : order.status === "In Transit"
                                        ? "bg-blue-500"
                                        : "bg-yellow-500"
                                  }
                                >
                                  {order.status}
                                </Badge>
                                <p className="text-xs text-gray-500 mt-1">{order.total}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="w-full border-2 border-gray-200 shadow-md">
                      <CardHeader>
                        <CardTitle>Pending Approvals</CardTitle>
                        <CardDescription>Items requiring your attention</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
                            <div className="flex items-center space-x-3">
                              <AlertCircle className="h-5 w-5 text-yellow-600" />
                              <div>
                                <p className="text-sm font-medium">Vendor Applications</p>
                                <p className="text-xs text-gray-600">{pendingVendors.length} pending</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Review
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg bg-blue-50">
                            <div className="flex items-center space-x-3">
                              <AlertCircle className="h-5 w-5 text-blue-600" />
                              <div>
                                <p className="text-sm font-medium">Rider Applications</p>
                                <p className="text-xs text-gray-600">{pendingRiders.length} pending</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Review
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="vendors" className="space-y-6">
                  <div className="flex flex-col space-y-6 w-full">
                    <Card className="w-full border-2 border-gray-200 shadow-md">
                      <CardHeader>
                        <CardTitle>Vendor Management</CardTitle>
                        <CardDescription>Manage vendor applications and accounts</CardDescription>
                      </CardHeader>
                      <CardContent className="p-2 sm:p-6 w-full">
                        <div className="overflow-x-auto w-full">
                          <Table className="w-full">
                            <TableHeader>
                              <TableRow>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Vendor</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Shop Name</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Location</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Join Date</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Status</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {pendingVendors.map((vendor) => (
                                <TableRow key={vendor.id}>
                                  <TableCell>
                                    <div>
                                      <p className="font-medium">{vendor.name}</p>
                                      <p className="text-sm text-gray-600">{vendor.phone}</p>
                                    </div>
                                  </TableCell>
                                  <TableCell>{vendor.shopName}</TableCell>
                                  <TableCell>{vendor.location}</TableCell>
                                  <TableCell>{vendor.joinDate}</TableCell>
                                  <TableCell>
                                    <Badge variant="secondary" className="bg-yellow-500">
                                      {vendor.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex space-x-2">
                                      <Button size="sm" variant="outline">
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        className="bg-green-600 hover:bg-green-700"
                                        onClick={() => handleApproveVendor(vendor.id)}
                                      >
                                        <CheckCircle className="h-4 w-4" />
                                      </Button>
                                      <Button size="sm" variant="destructive" onClick={() => handleRejectVendor(vendor.id)}>
                                        <XCircle className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="riders" className="space-y-6">
                  <div className="flex flex-col space-y-6 w-full">
                    <Card className="w-full border-2 border-gray-200 shadow-md">
                      <CardHeader>
                        <CardTitle>Rider Management</CardTitle>
                        <CardDescription>Manage rider applications and accounts</CardDescription>
                      </CardHeader>
                      <CardContent className="p-2 sm:p-6 w-full">
                        <div className="overflow-x-auto w-full">
                          <Table className="w-full">
                            <TableHeader>
                              <TableRow>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Rider</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">License</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Location</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Join Date</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Status</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {pendingRiders.map((rider) => (
                                <TableRow key={rider.id}>
                                  <TableCell>
                                    <div>
                                      <p className="font-medium">{rider.name}</p>
                                      <p className="text-sm text-gray-600">{rider.phone}</p>
                                    </div>
                                  </TableCell>
                                  <TableCell>{rider.license}</TableCell>
                                  <TableCell>{rider.location}</TableCell>
                                  <TableCell>{rider.joinDate}</TableCell>
                                  <TableCell>
                                    <Badge variant="secondary" className="bg-yellow-500">
                                      {rider.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex space-x-2">
                                      <Button size="sm" variant="outline">
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        className="bg-green-600 hover:bg-green-700"
                                        onClick={() => handleApproveRider(rider.id)}
                                      >
                                        <CheckCircle className="h-4 w-4" />
                                      </Button>
                                      <Button size="sm" variant="destructive" onClick={() => handleRejectRider(rider.id)}>
                                        <XCircle className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="orders" className="space-y-6">
                  <div className="flex flex-col space-y-6 w-full">
                    <Card className="w-full border-2 border-gray-200 shadow-md">
                      <CardHeader>
                        <CardTitle>Order Management</CardTitle>
                        <CardDescription>Monitor and manage platform orders</CardDescription>
                      </CardHeader>
                      <CardContent className="p-2 sm:p-6 w-full">
                        <div className="overflow-x-auto w-full">
                          <Table className="w-full">
                            <TableHeader>
                              <TableRow>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Order ID</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Customer</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Vendor</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Rider</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Total</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Status</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Date</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {recentOrders.map((order) => (
                                <TableRow key={order.id}>
                                  <TableCell className="font-medium">{order.id}</TableCell>
                                  <TableCell>{order.customer}</TableCell>
                                  <TableCell>{order.vendor}</TableCell>
                                  <TableCell>{order.rider}</TableCell>
                                  <TableCell>{order.total}</TableCell>
                                  <TableCell>
                                    <Badge
                                      variant={
                                        order.status === "Delivered"
                                          ? "default"
                                          : order.status === "In Transit"
                                            ? "secondary"
                                            : "outline"
                                      }
                                      className={
                                        order.status === "Delivered"
                                          ? "bg-green-600"
                                          : order.status === "In Transit"
                                            ? "bg-blue-500"
                                            : "bg-yellow-500"
                                      }
                                    >
                                      {order.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>{order.date}</TableCell>
                                  <TableCell>
                                    <Button size="sm" variant="outline">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="payouts" className="space-y-6">
                  {/* Payout Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <Card className="w-full border-2 border-gray-200 shadow-md">
                      <CardContent className="p-2 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                            <p className="text-2xl font-bold text-yellow-600">
                              {payoutRequests.filter(p => p.status === "Pending").length}
                            </p>
                          </div>
                          <Clock className="h-8 w-8 text-yellow-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="w-full border-2 border-gray-200 shadow-md">
                      <CardContent className="p-2 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Approved Today</p>
                            <p className="text-2xl font-bold text-green-600">
                              {payoutRequests.filter(p => p.status === "Approved").length}
                            </p>
                          </div>
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="w-full border-2 border-gray-200 shadow-md">
                      <CardContent className="p-2 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total Paid</p>
                            <p className="text-2xl font-bold text-blue-600">
                              {payoutRequests.filter(p => p.status === "Paid").length}
                            </p>
                          </div>
                          <DollarSign className="h-8 w-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Payout Requests Table */}
                  <div className="flex flex-col space-y-6 w-full">
                    <Card className="w-full border-2 border-gray-200 shadow-md">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <DollarSign className="h-5 w-5 text-green-600" />
                          <span>Payout Requests</span>
                        </CardTitle>
                        <CardDescription>Manage vendor and rider payout requests</CardDescription>
                      </CardHeader>
                      <CardContent className="p-2 sm:p-6 w-full">
                        <div className="overflow-x-auto w-full">
                          <Table className="w-full">
                            <TableHeader>
                              <TableRow>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Request ID</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Requester</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Type</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Amount</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Bank Details</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Date</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Status</TableHead>
                                <TableHead className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {payoutRequests.map((request) => (
                                <TableRow key={request.id}>
                                  <TableCell className="font-medium">{request.id}</TableCell>
                                  <TableCell>
                                    <div>
                                      <p className="font-medium">{request.requester}</p>
                                      <p className="text-sm text-gray-500">{request.phone}</p>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge className={request.type === "Vendor" ? "bg-blue-600" : "bg-orange-600"}>
                                      {request.type}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="font-bold text-green-600">{request.amount}</TableCell>
                                  <TableCell className="text-sm text-gray-600">{request.bankDetails}</TableCell>
                                  <TableCell>{request.requestDate}</TableCell>
                                  <TableCell>
                                    <Badge
                                      className={
                                        request.status === "Pending"
                                          ? "bg-yellow-500"
                                          : request.status === "Approved"
                                          ? "bg-green-600"
                                          : "bg-blue-600"
                                      }
                                    >
                                      {request.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex space-x-2">
                                      {request.status === "Pending" && (
                                        <>
                                          <Button
                                            size="sm"
                                            className="bg-green-600 hover:bg-green-700"
                                            onClick={() => handleApprovePayout(request.id)}
                                          >
                                            <CheckCircle className="h-4 w-4 mr-1" />
                                            Approve
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            className="border-red-500 text-red-600 hover:bg-red-50"
                                            onClick={() => handleRejectPayout(request.id)}
                                          >
                                            <XCircle className="h-4 w-4 mr-1" />
                                            Reject
                                          </Button>
                                        </>
                                      )}
                                      {request.status === "Approved" && (
                                        <Button
                                          size="sm"
                                          className="bg-blue-600 hover:bg-blue-700"
                                          onClick={() => handleMarkAsPaid(request.id)}
                                        >
                                          <DollarSign className="h-4 w-4 mr-1" />
                                          Mark Paid
                                        </Button>
                                      )}
                                      <Button size="sm" variant="ghost">
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="transactions" className="space-y-6">
                  <div className="flex flex-col space-y-6 w-full">
                    <Card className="w-full border-2 border-gray-200 shadow-md">
                      <CardHeader>
                        <CardTitle>Transaction History</CardTitle>
                        <CardDescription>All vendor and rider payout activities</CardDescription>
                      </CardHeader>
                      <CardContent className="p-2 sm:p-6 w-full">
                        <div className="overflow-x-auto w-full">
                          <table className="w-full text-xs sm:text-sm">
                            <thead>
                              <tr>
                                <th className="px-2 py-1 sm:px-4 sm:py-2 text-left">Date</th>
                                <th className="px-2 py-1 sm:px-4 sm:py-2 text-left">User</th>
                                <th className="px-2 py-1 sm:px-4 sm:py-2 text-left">Type</th>
                                <th className="px-2 py-1 sm:px-4 sm:py-2 text-left">Amount</th>
                                <th className="px-2 py-1 sm:px-4 sm:py-2 text-left">Status</th>
                                <th className="px-2 py-1 sm:px-4 sm:py-2 text-left">Reference</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { date: "2024-01-16", user: "Fresh Harvest", type: "Vendor", amount: "KSh 8,750", status: "Pending", ref: "PAY-001" },
                                { date: "2024-01-16", user: "Peter Ochieng", type: "Rider", amount: "KSh 3,450", status: "Pending", ref: "PAY-002" },
                                { date: "2024-01-15", user: "Kiprotich Fresh Produce", type: "Vendor", amount: "KSh 5,200", status: "Approved", ref: "PAY-003" },
                                { date: "2024-01-15", user: "David Kiprop", type: "Rider", amount: "KSh 2,800", status: "Paid", ref: "PAY-004" },
                                { date: "2024-01-14", user: "Fresh Harvest", type: "Vendor", amount: "KSh 4,000", status: "Paid", ref: "PAY-000" },
                              ].map((tx) => (
                                <tr key={tx.ref}>
                                  <td className="px-2 py-1 sm:px-4 sm:py-2">{tx.date}</td>
                                  <td className="px-2 py-1 sm:px-4 sm:py-2">{tx.user}</td>
                                  <td className="px-2 py-1 sm:px-4 sm:py-2">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                      tx.type === 'Vendor' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                    }`}>
                                      {tx.type}
                                    </span>
                                  </td>
                                  <td className="px-2 py-1 sm:px-4 sm:py-2">{tx.amount}</td>
                                  <td className="px-2 py-1 sm:px-4 sm:py-2">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                      tx.status === 'Paid' ? 'bg-green-100 text-green-700' : tx.status === 'Approved' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                      {tx.status}
                                    </span>
                                  </td>
                                  <td className="px-2 py-1 sm:px-4 sm:py-2">{tx.ref}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


