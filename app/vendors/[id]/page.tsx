"use client"

import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Search, Star, Clock, MapPin, Phone, Heart, Filter, SortAsc, SortDesc, Package, Truck, Users, Award, Shield, Zap } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button as UIButton } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import CustomerNavbar from "@/components/CustomerNavbar";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import Head from "next/head";

const mamambogaVendors = [
  {
    id: "fresh-harvest-mama",
    name: "Fresh Harvest Mama",
    rating: 4.8,
    deliveryTime: "20-30 min",
    distance: "0.5 km",
    image: "/grace-wanjiku.jpg",
    specialties: ["Fresh Vegetables", "Herbs"],
    isOpen: true,
  },
  {
    id: "green-valley-mama",
    name: "Green Valley Mama",
    rating: 4.9,
    deliveryTime: "25-35 min",
    distance: "0.8 km",
    image: "/jane-njeri.jpg",
    specialties: ["Spinach", "Carrots", "Eggplant"],
    isOpen: true,
  },
  {
    id: "sunrise-market-mama",
    name: "Sunrise Market Mama",
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

const vendorItems: { [vendorId: string]: any[] } = {
  "fresh-harvest-mama": [
    { id: 1, name: "Tomatoes", price: "80", image: "/placeholder.svg", description: "Fresh, juicy tomatoes." },
    { id: 2, name: "Onions", price: "60", image: "/placeholder.svg", description: "Red onions, per kg." },
    { id: 3, name: "Spinach", price: "40", image: "/placeholder.svg", description: "Leafy green spinach." },
    { id: 9, name: "Kale (Sukuma Wiki)", price: "35", image: "/placeholder.svg", description: "Locally grown kale, per bunch." },
    { id: 10, name: "Eggplant", price: "70", image: "/placeholder.svg", description: "Purple eggplants, per piece." },
    { id: 11, name: "Green Peppers", price: "90", image: "/placeholder.svg", description: "Crisp green bell peppers." },
    { id: 12, name: "Coriander (Dhania)", price: "20", image: "/placeholder.svg", description: "Fresh coriander, per bunch." },
    { id: 13, name: "Garlic", price: "120", image: "/placeholder.svg", description: "Aromatic garlic bulbs." },
  ],
  "green-valley-mama": [
    { id: 4, name: "Carrots", price: "50", image: "/placeholder.svg", description: "Crunchy carrots." },
    { id: 5, name: "Potatoes", price: "70", image: "/placeholder.svg", description: "Organic potatoes." },
    { id: 6, name: "Cabbage", price: "45", image: "/placeholder.svg", description: "Fresh cabbage." },
    { id: 14, name: "Sweet Potatoes", price: "80", image: "/placeholder.svg", description: "Sweet potatoes, per kg." },
    { id: 15, name: "Beetroot", price: "60", image: "/placeholder.svg", description: "Nutritious beetroot, per piece." },
    { id: 16, name: "Pumpkin", price: "100", image: "/placeholder.svg", description: "Locally grown pumpkin, per slice." },
    { id: 17, name: "French Beans", price: "90", image: "/placeholder.svg", description: "Tender French beans." },
    { id: 18, name: "Avocado", price: "50", image: "/placeholder.svg", description: "Ripe avocado, per piece." },
  ],
  "sunrise-market-mama": [
    { id: 7, name: "Local Vegetables", price: "90", image: "/placeholder.svg", description: "Assorted local veggies." },
    { id: 8, name: "Spices", price: "120", image: "/placeholder.svg", description: "Aromatic spices." },
    { id: 19, name: "Arrowroots (Nduma)", price: "110", image: "/placeholder.svg", description: "Arrowroots, per kg." },
    { id: 20, name: "Bananas", price: "60", image: "/placeholder.svg", description: "Sweet bananas, per bunch." },
    { id: 21, name: "Mangoes", price: "100", image: "/placeholder.svg", description: "Juicy mangoes, per piece." },
    { id: 22, name: "Pineapple", price: "120", image: "/placeholder.svg", description: "Fresh pineapple, per piece." },
    { id: 23, name: "Passion Fruit", price: "80", image: "/placeholder.svg", description: "Tangy passion fruits, per kg." },
    { id: 24, name: "Lettuce", price: "70", image: "/placeholder.svg", description: "Crisp lettuce heads." },
  ],
  "wambuis-greens": [
    { id: 25, name: "Sukuma Wiki", price: "30", image: "/placeholder.svg", description: "Fresh sukuma wiki, per bunch." },
    { id: 26, name: "Managu", price: "50", image: "/placeholder.svg", description: "Traditional managu greens." },
    { id: 27, name: "Terere", price: "40", image: "/placeholder.svg", description: "Nutritious terere leaves." },
    { id: 28, name: "Pumpkin Leaves", price: "35", image: "/placeholder.svg", description: "Tender pumpkin leaves." },
    { id: 29, name: "Mito", price: "45", image: "/placeholder.svg", description: "Local mito greens." },
    { id: 30, name: "Dodo", price: "30", image: "/placeholder.svg", description: "Fresh dodo leaves." },
    { id: 31, name: "Cabbage", price: "50", image: "/placeholder.svg", description: "Crisp cabbage heads." },
    { id: 32, name: "Spinach", price: "40", image: "/placeholder.svg", description: "Leafy spinach." },
  ],
  "fruit-basket": [
    { id: 33, name: "Bananas", price: "60", image: "/placeholder.svg", description: "Sweet bananas, per bunch." },
    { id: 34, name: "Mangoes", price: "100", image: "/placeholder.svg", description: "Juicy mangoes, per piece." },
    { id: 35, name: "Oranges", price: "80", image: "/placeholder.svg", description: "Fresh oranges, per piece." },
    { id: 36, name: "Pineapple", price: "120", image: "/placeholder.svg", description: "Ripe pineapple, per piece." },
    { id: 37, name: "Watermelon", price: "90", image: "/placeholder.svg", description: "Refreshing watermelon slices." },
    { id: 38, name: "Avocado", price: "50", image: "/placeholder.svg", description: "Creamy avocado, per piece." },
    { id: 39, name: "Passion Fruit Juice", price: "70", image: "/placeholder.svg", description: "Fresh passion fruit juice." },
    { id: 40, name: "Mango Juice", price: "80", image: "/placeholder.svg", description: "Sweet mango juice." },
  ],
  "organic-hub": [
    { id: 41, name: "Organic Tomatoes", price: "90", image: "/placeholder.svg", description: "Organic, pesticide-free tomatoes." },
    { id: 42, name: "Organic Carrots", price: "60", image: "/placeholder.svg", description: "Crunchy organic carrots." },
    { id: 43, name: "Organic Spinach", price: "50", image: "/placeholder.svg", description: "Leafy organic spinach." },
    { id: 44, name: "Organic Kale", price: "45", image: "/placeholder.svg", description: "Fresh organic kale." },
    { id: 45, name: "Organic Potatoes", price: "80", image: "/placeholder.svg", description: "Nutritious organic potatoes." },
    { id: 46, name: "Organic Beetroot", price: "70", image: "/placeholder.svg", description: "Healthy organic beetroot." },
    { id: 47, name: "Organic Herbs Mix", price: "100", image: "/placeholder.svg", description: "Assorted organic herbs." },
    { id: 48, name: "Organic Cabbage", price: "60", image: "/placeholder.svg", description: "Crisp organic cabbage." },
  ],
  "roots-tubers": [
    { id: 49, name: "Arrowroots (Nduma)", price: "110", image: "/placeholder.svg", description: "Fresh arrowroots, per kg." },
    { id: 50, name: "Sweet Potatoes", price: "80", image: "/placeholder.svg", description: "Sweet potatoes, per kg." },
    { id: 51, name: "Cassava", price: "70", image: "/placeholder.svg", description: "Cassava tubers, per kg." },
    { id: 52, name: "Yams", price: "120", image: "/placeholder.svg", description: "Nutritious yams, per kg." },
    { id: 53, name: "Irish Potatoes", price: "90", image: "/placeholder.svg", description: "Fresh Irish potatoes." },
    { id: 54, name: "Carrots", price: "50", image: "/placeholder.svg", description: "Crunchy carrots." },
    { id: 55, name: "Beetroot", price: "60", image: "/placeholder.svg", description: "Healthy beetroot." },
    { id: 56, name: "Pumpkin", price: "100", image: "/placeholder.svg", description: "Locally grown pumpkin." },
  ],
  "salad-stop": [
    { id: 57, name: "Lettuce", price: "70", image: "/placeholder.svg", description: "Crisp lettuce heads." },
    { id: 58, name: "Cucumber", price: "60", image: "/placeholder.svg", description: "Fresh cucumbers." },
    { id: 59, name: "Tomatoes", price: "80", image: "/placeholder.svg", description: "Juicy tomatoes." },
    { id: 60, name: "Carrots", price: "50", image: "/placeholder.svg", description: "Crunchy carrots." },
    { id: 61, name: "Mixed Salad Pack", price: "120", image: "/placeholder.svg", description: "Ready-to-eat salad mix." },
    { id: 62, name: "Pineapple", price: "120", image: "/placeholder.svg", description: "Sweet pineapple, per piece." },
    { id: 63, name: "Mangoes", price: "100", image: "/placeholder.svg", description: "Juicy mangoes, per piece." },
    { id: 64, name: "Avocado", price: "50", image: "/placeholder.svg", description: "Ripe avocado, per piece." },
  ],
};

export default function VendorItemsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const vendorId = params.id;
  const vendor = mamambogaVendors.find((v) => v.id === vendorId);
  const items = vendorItems[vendorId] || [];
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantities, setQuantities] = useState<{ [itemId: number]: number }>({});
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showVendorInfo, setShowVendorInfo] = useState(false);
  const router = useRouter();
  const fromDashboard = searchParams.get('from') === 'dashboard';

  // Categories based on vendor specialties and items
  const categories = ["All", ...new Set(items.map(item => {
    if (item.name.toLowerCase().includes('tomato') || item.name.toLowerCase().includes('onion') || item.name.toLowerCase().includes('spinach')) return "Vegetables";
    if (item.name.toLowerCase().includes('potato') || item.name.toLowerCase().includes('carrot') || item.name.toLowerCase().includes('cassava')) return "Root Vegetables";
    if (item.name.toLowerCase().includes('banana') || item.name.toLowerCase().includes('mango') || item.name.toLowerCase().includes('pineapple')) return "Fruits";
    if (item.name.toLowerCase().includes('herb') || item.name.toLowerCase().includes('spice') || item.name.toLowerCase().includes('garlic')) return "Herbs & Spices";
    if (item.name.toLowerCase().includes('organic')) return "Organic";
    return "Other";
  }))];

  if (!vendor) return <div className="p-8">Vendor not found.</div>;

  const handleQuantityChange = (itemId: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + delta),
    }));
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      vendorId: vendor.id,
      vendorName: vendor.name,
      itemId: item.id,
      name: item.name,
      price: item.price,
      quantity: quantities[item.id] || 1,
      image: item.image,
    });
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
      variant: "default",
    });
  };

  const toggleFavorite = (itemId: number) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getItemCategory = (item: any) => {
    if (item.name.toLowerCase().includes('tomato') || item.name.toLowerCase().includes('onion') || item.name.toLowerCase().includes('spinach')) return "Vegetables";
    if (item.name.toLowerCase().includes('potato') || item.name.toLowerCase().includes('carrot') || item.name.toLowerCase().includes('cassava')) return "Root Vegetables";
    if (item.name.toLowerCase().includes('banana') || item.name.toLowerCase().includes('mango') || item.name.toLowerCase().includes('pineapple')) return "Fruits";
    if (item.name.toLowerCase().includes('herb') || item.name.toLowerCase().includes('spice') || item.name.toLowerCase().includes('garlic')) return "Herbs & Spices";
    if (item.name.toLowerCase().includes('organic')) return "Organic";
    return "Other";
  };

  const filteredAndSortedItems = items
    .filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || getItemCategory(item) === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "price":
          comparison = parseFloat(a.price) - parseFloat(b.price);
          break;
        case "popularity":
          comparison = (favorites.includes(b.id) ? 1 : 0) - (favorites.includes(a.id) ? 1 : 0);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const cartItemCount = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  return (
    <>
      <Head>
        <title>{vendor ? `${vendor.name} | Mboga Pap!` : 'Vendor | Mboga Pap!'}</title>
        <meta name="description" content={vendor ? `Order fresh produce from ${vendor.name} on Mboga Pap! See available items, prices, and specialties.` : 'Order fresh produce from local vendors on Mboga Pap!'} />
        <meta property="og:title" content={vendor ? `${vendor.name} | Mboga Pap!` : 'Vendor | Mboga Pap!'} />
        <meta property="og:description" content={vendor ? `Order fresh produce from ${vendor.name} on Mboga Pap! See available items, prices, and specialties.` : 'Order fresh produce from local vendors on Mboga Pap!'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://mbogapap.co.ke/vendors/${vendorId}`} />
        <meta property="og:image" content={vendor?.image || '/placeholder.jpg'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={vendor ? `${vendor.name} | Mboga Pap!` : 'Vendor | Mboga Pap!'} />
        <meta name="twitter:description" content={vendor ? `Order fresh produce from ${vendor.name} on Mboga Pap! See available items, prices, and specialties.` : 'Order fresh produce from local vendors on Mboga Pap!'} />
      </Head>
      {fromDashboard ? <CustomerNavbar /> : <Navbar />}
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {/* Back Button */}
        <button
            className="flex items-center mb-6 text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] font-medium transition-colors"
          onClick={() => router.push(fromDashboard ? "/dashboard" : "/")}
        >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {fromDashboard ? "Back to Dashboard" : "Back to Home"}
        </button>

          {/* Enhanced Vendor Header */}
          <Card className="mb-8 bg-gradient-to-r from-[color:var(--color-primary)]/5 to-[color:var(--color-accent)]/10 border-2 border-[color:var(--color-primary)]/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                {/* Vendor Image and Basic Info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={vendor.image} 
                      alt={vendor.name} 
                      className="w-20 h-20 rounded-xl object-cover border-4 border-white shadow-lg" 
                    />
                    <div className="absolute -top-2 -right-2 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-[color:var(--color-primary)] mb-1">
                      {vendor.name}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        {vendor.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-[color:var(--color-accent)]" />
                        {vendor.deliveryTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-[color:var(--color-primary)]" />
                        {vendor.distance}
                      </span>
            </div>
                    <div className="flex flex-wrap gap-2">
                      {vendor.specialties.map((specialty, i) => (
                        <Badge key={i} className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)] text-xs">
                          {specialty}
                        </Badge>
              ))}
            </div>
          </div>
        </div>

                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-3 ml-auto">
                  <Button 
                    variant="outline" 
                    className="border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/10"
                    onClick={() => setShowVendorInfo(!showVendorInfo)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    {showVendorInfo ? "Hide Info" : "Vendor Info"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/10"
                    onClick={() => window.open(`tel:+254700123456`, '_self')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Vendor
                  </Button>
                </div>
              </div>

              {/* Expanded Vendor Info */}
              {showVendorInfo && (
                <div className="mt-6 pt-6 border-t border-[color:var(--color-primary)]/20">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[color:var(--color-accent)]/20 rounded-lg flex items-center justify-center">
                        <Award className="h-5 w-5 text-[color:var(--color-primary)]" />
                      </div>
                      <div>
                        <p className="font-medium text-[color:var(--color-primary)]">Quality Rating</p>
                        <p className="text-sm text-gray-600">4.8/5 based on 156 reviews</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[color:var(--color-accent)]/20 rounded-lg flex items-center justify-center">
                        <Truck className="h-5 w-5 text-[color:var(--color-primary)]" />
                      </div>
                      <div>
                        <p className="font-medium text-[color:var(--color-primary)]">Fast Delivery</p>
                        <p className="text-sm text-gray-600">Average {vendor.deliveryTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[color:var(--color-accent)]/20 rounded-lg flex items-center justify-center">
                        <Shield className="h-5 w-5 text-[color:var(--color-primary)]" />
                      </div>
                      <div>
                        <p className="font-medium text-[color:var(--color-primary)]">Trusted Vendor</p>
                        <p className="text-sm text-gray-600">Verified & Reliable</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Search and Filter Section */}
          <div className="mb-6 space-y-4">
        {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
                placeholder="Search for items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20"
          />
        </div>

            {/* Category and Sort Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    className={selectedCategory === category 
                      ? "bg-[color:var(--color-primary)] text-white" 
                      : "border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)]/10"
                    }
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

                             {/* Sort Dropdown */}
               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <Button variant="outline" size="sm" className="ml-auto border-[color:var(--color-primary)] text-[color:var(--color-primary)] bg-white hover:bg-gray-50">
                     <SortAsc className="h-4 w-4 mr-2" />
                     Sort by {sortBy === "name" ? "Name" : sortBy === "price" ? "Price" : "Popularity"}
                     {sortOrder === "asc" ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                   </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent className="bg-[color:var(--color-accent)]/95 border-2 border-[color:var(--color-primary)] shadow-lg backdrop-blur-sm">
                   <DropdownMenuLabel className="bg-[color:var(--color-primary)] text-white font-semibold">Sort Options</DropdownMenuLabel>
                   <DropdownMenuSeparator />
                   <DropdownMenuItem onClick={() => { setSortBy("name"); setSortOrder("asc"); }} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]">
                     Name A-Z
                   </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => { setSortBy("name"); setSortOrder("desc"); }} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]">
                     Name Z-A
                   </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => { setSortBy("price"); setSortOrder("asc"); }} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]">
                     Price Low to High
                   </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => { setSortBy("price"); setSortOrder("desc"); }} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]">
                     Price High to Low
                   </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => { setSortBy("popularity"); setSortOrder("desc"); }} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]">
                     Most Popular
                   </DropdownMenuItem>
                 </DropdownMenuContent>
               </DropdownMenu>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[color:var(--color-primary)]">
              {filteredAndSortedItems.length} items found
            </h2>
            {cartItemCount > 0 && (
              <Badge className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)]">
                {cartItemCount} items in cart
              </Badge>
            )}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-[color:var(--color-accent)]/30 overflow-hidden">
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-8 h-8 p-0 bg-white/80 hover:bg-white rounded-full"
                        onClick={() => toggleFavorite(item.id)}
                      >
                        <Heart 
                          className={`h-4 w-4 ${favorites.includes(item.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
                        />
                      </Button>
                    </div>
                    {getItemCategory(item) !== "Other" && (
                      <Badge className="absolute top-3 left-3 bg-[color:var(--color-primary)] text-white text-xs">
                        {getItemCategory(item)}
                      </Badge>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-[color:var(--color-primary)] mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-[color:var(--color-accent)]">
                        KSh {item.price}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        In Stock
                      </Badge>
                    </div>

                    {/* Quantity and Add to Cart */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          -
                        </Button>
                        <span className="px-3 py-1 font-medium min-w-[2rem] text-center">
                          {quantities[item.id] || 1}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          +
                        </Button>
                      </div>
                  <Button
                    size="sm"
                    className="ml-auto bg-[color:var(--color-accent)] hover:bg-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] shadow"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
                  </Button>
                </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredAndSortedItems.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600 mb-4">
                  {search ? `No items match "${search}"` : `No items in "${selectedCategory}" category`}
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => { setSearch(""); setSelectedCategory("All"); }}
                  className="border-[color:var(--color-primary)] text-[color:var(--color-primary)]"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
} 