"use client"

import { useState } from "react";
import { ShoppingCart, User, Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function CustomerNavbar() {
  const router = useRouter();
  const { cart, removeFromCart, clearCart } = useCart();
  const [cartPreviewOpen, setCartPreviewOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartTotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const { toast } = useToast();

  const handleLogout = () => {
    window.location.href = "/";
  };

  const handleCheckout = () => {
    // Simulate M-Pesa prompt
    toast({
      title: "M-Pesa Payment Initiated",
      description: "Please complete the payment on your phone.",
      variant: "default",
    });
    setCartPreviewOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 text-[color:var(--color-primary)] font-bold text-lg sm:text-xl">
          <span className="text-[color:var(--color-accent)] font-bold text-sm sm:text-lg transform -rotate-12" aria-label="Mboga Pap logo">🥬</span>
          <span className="hidden sm:inline">Mboga Pap</span>
          <span className="sm:hidden">Mboga Pap</span>
        </Link>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Cart Icon & Preview */}
          <div className="relative">
            <Button variant="ghost" className="relative p-2 hover:bg-[color:var(--color-accent)] hover:text-black" onClick={() => setCartPreviewOpen((v) => !v)}>
              <ShoppingCart className="h-6 w-6 text-[color:var(--color-primary)]" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[color:var(--color-accent)] text-black text-xs rounded-full px-1.5 py-0.5 font-bold">
                  {cart.length}
                </span>
              )}
              <span className="ml-2 text-[color:var(--color-primary)] font-semibold text-sm hidden sm:inline">KSh {cartTotal.toFixed(0)}</span>
            </Button>
            <AnimatePresence>
              {cartPreviewOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border overflow-hidden"
                >
                  <div className="p-4 border-b font-bold text-lg flex items-center">
                    <ShoppingCart className="h-5 w-5 text-[color:var(--color-primary)] mr-2" /> Cart
                  </div>
                  <div className="overflow-y-auto divide-y" style={{ maxHeight: '13.5rem' }}>
                    {cart.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">Your cart is empty.</div>
                    ) : (
                      cart.map((item) => (
                        <div key={item.itemId} className="flex items-center justify-between p-4">
                          <div>
                            <div className="font-semibold">{item.name}</div>
                            <div className="text-xs text-gray-500">x{item.quantity} @ KSh {item.price}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[color:var(--color-primary)] font-bold">KSh {(parseFloat(item.price) * item.quantity).toFixed(0)}</span>
                            <Button size="icon" variant="ghost" onClick={() => removeFromCart(item.itemId, item.vendorId)}>
                              ×
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {cart.length > 0 && (
                    <>
                      <div className="p-4 border-t flex justify-between items-center">
                        <span className="font-semibold">Subtotal</span>
                        <span className="text-[color:var(--color-primary)] font-bold">KSh {cartTotal.toFixed(0)}</span>
                      </div>
                      <div className="p-4 border-t flex flex-col gap-2">
                        <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50" onClick={clearCart}>
                          Clear Cart
                        </Button>
                        <Button className="w-full bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] hover:text-black text-white" onClick={handleCheckout}>
                          Checkout with M-Pesa
                        </Button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* User Info */}
          <div className="text-right">
            <p className="text-sm font-medium">Jane Customer</p>
            <p className="text-xs text-gray-600">Customer</p>
          </div>
          
          {/* Avatar & Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="Customer" />
                  <AvatarFallback>JC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[color:var(--color-accent)]/95 border-2 border-[color:var(--color-primary)] shadow-lg backdrop-blur-sm" align="end" forceMount>
              <DropdownMenuLabel className="font-normal bg-[color:var(--color-primary)] text-white">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Jane Customer</p>
                  <p className="text-xs leading-none text-white/80">customer@demo.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setProfileOpen(true)} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]">
                <User className="h-4 w-4 mr-2 text-[color:var(--color-primary)]" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/dashboard/order-history")} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]"> 
                <ShoppingCart className="h-4 w-4 mr-2 text-[color:var(--color-primary)]" /> Order History
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSettingsOpen(true)} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]">
                <Settings className="h-4 w-4 mr-2 text-[color:var(--color-primary)]" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/help")} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]">Help</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="hover:bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center space-x-2">
          {/* Cart Icon */}
          <div className="relative">
            <Button variant="ghost" className="relative p-2 hover:bg-[color:var(--color-accent)] hover:text-black" onClick={() => setCartPreviewOpen((v) => !v)}>
              <ShoppingCart className="h-5 w-5 text-[color:var(--color-primary)]" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[color:var(--color-accent)] text-black text-xs rounded-full px-1.5 py-0.5 font-bold">
                  {cart.length}
                </span>
              )}
            </Button>
            <AnimatePresence>
              {cartPreviewOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-50 border overflow-hidden"
                >
                  <div className="p-3 border-b font-bold text-base flex items-center">
                    <ShoppingCart className="h-4 w-4 text-[color:var(--color-primary)] mr-2" /> Cart
                  </div>
                  <div className="overflow-y-auto divide-y" style={{ maxHeight: '12rem' }}>
                    {cart.length === 0 ? (
                      <div className="p-3 text-center text-gray-500 text-sm">Your cart is empty.</div>
                    ) : (
                      cart.map((item) => (
                        <div key={item.itemId} className="flex items-center justify-between p-3">
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm truncate">{item.name}</div>
                            <div className="text-xs text-gray-500">x{item.quantity} @ KSh {item.price}</div>
                          </div>
                          <div className="flex items-center space-x-2 ml-2">
                            <span className="text-[color:var(--color-primary)] font-bold text-sm">KSh {(parseFloat(item.price) * item.quantity).toFixed(0)}</span>
                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => removeFromCart(item.itemId, item.vendorId)}>
                              ×
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {cart.length > 0 && (
                    <>
                      <div className="p-3 border-t flex justify-between items-center">
                        <span className="font-semibold text-sm">Subtotal</span>
                        <span className="text-[color:var(--color-primary)] font-bold text-sm">KSh {cartTotal.toFixed(0)}</span>
                      </div>
                      <div className="p-3 border-t flex flex-col gap-2">
                        <Button variant="outline" size="sm" className="w-full text-red-600 border-red-200 hover:bg-red-50" onClick={clearCart}>
                          Clear Cart
                        </Button>
                        <Button size="sm" className="w-full bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] hover:text-black text-white" onClick={handleCheckout}>
                          Checkout with M-Pesa
                        </Button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="p-2 text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* User Info */}
              <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-user.jpg" alt="Customer" />
                  <AvatarFallback>JC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Jane Customer</p>
                  <p className="text-xs text-gray-600">customer@demo.com</p>
                </div>
              </div>
              
              {/* Mobile Menu Items */}
              <div className="flex flex-col space-y-3">
                <Button 
                  variant="ghost" 
                  className="justify-start text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/10"
                  onClick={() => {
                    setProfileOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="h-4 w-4 mr-3" /> Profile
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/10"
                  onClick={() => {
                    router.push("/dashboard/order-history");
                    setMobileMenuOpen(false);
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-3" /> Order History
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/10"
                  onClick={() => {
                    setSettingsOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Settings className="h-4 w-4 mr-3" /> Settings
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/10"
                  onClick={() => {
                    router.push("/help");
                    setMobileMenuOpen(false);
                  }}
                >
                  Help
                </Button>
              </div>
              
              {/* Logout Button */}
              <div className="pt-3 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Log out
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 