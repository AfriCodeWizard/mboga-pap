"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Globe, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import CartDrawer from "@/components/CartDrawer"
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/hooks/use-toast";

const content = {
  en: {
    header: {
      howItWorks: "How It Works",
      pricing: "Pricing",
      vendors: "Vendors",
      riders: "Riders",
      login: "Login",
      getStarted: "Get Started",
    },
  },
  sw: {
    header: {
      howItWorks: "Jinsi Inavyofanya",
      pricing: "Bei",
              vendors: "Vendors",
      riders: "Madereva",
      login: "Ingia",
      getStarted: "Anza Sasa",
    },
  },
}

export default function Navbar() {
  const [language, setLanguage] = useState<"en" | "sw">("en")
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const [cartPreviewOpen, setCartPreviewOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, removeFromCart, clearCart } = useCart();
  const cartTotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const { toast } = useToast();
  const t = content[language]

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "sw" : "en"))
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between relative">
        {/* Logo Container - Independent and Fixed */}
        <div className="flex-shrink-0" style={{ width: '130px', height: '56px', display: 'flex', alignItems: 'center' }}>
          <Link href="/" className="flex items-center">
            <img 
              src="/mbogapap-logo-crop.png" 
              alt="Mboga Pap logo" 
              className="object-contain"
              style={{ height: '130px', width: '130px' }}
            />
          </Link>
        </div>

        {/* Desktop Navigation - Centered and Independent */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 flex-1 justify-center">
          <Link href="/#jinsi-inavyofanya" className="nav-link text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] font-bold transition-colors whitespace-nowrap">
            {t.header.howItWorks}
          </Link>
          <Link href="/#bei" className="nav-link text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] font-bold transition-colors whitespace-nowrap">
            {t.header.pricing}
          </Link>
          <Link href="/#vendors" className="nav-link text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] font-bold transition-colors whitespace-nowrap">
            {t.header.vendors}
          </Link>
          <Link href="/#riders" className="nav-link text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] font-bold transition-colors whitespace-nowrap">
            {t.header.riders}
          </Link>
        </nav>

        {/* Desktop Actions - Right Side and Independent */}
        <div className="hidden md:flex items-center space-x-3 flex-shrink-0" style={{ minWidth: '200px', justifyContent: 'flex-end' }}>
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center space-x-2 text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] transition-colors font-bold whitespace-nowrap"
          >
            <Globe className="h-4 w-4" />
            <span className="font-medium">{language === "en" ? "SW" : "EN"}</span>
          </Button>
          
          {/* Cart Icon/Modal */}
          <div className="relative">
            <Button variant="ghost" className="relative p-2 text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] group" onClick={() => setCartPreviewOpen((v) => !v)} aria-label="Open cart">
              <ShoppingCart className="h-6 w-6 text-[color:var(--color-primary)] group-hover:text-[color:var(--color-accent)]" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[color:var(--color-accent)] text-black text-xs rounded-full px-1.5 py-0.5 font-bold">
                  {cart.length}
                </span>
              )}
              <span className="ml-2 text-[color:var(--color-primary)] font-semibold text-sm hidden lg:inline group-hover:text-[color:var(--color-accent)]">KSh {cartTotal.toFixed(0)}</span>
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
                        <Button className="w-full bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] hover:text-black text-white" onClick={() => {/* handle guest checkout */}}>
                          Checkout as Guest
                        </Button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Login Button */}
          <Link href="/login">
            <Button variant="ghost" className="font-bold text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] transition-all duration-300">
              {t.header.login}
            </Button>
          </Link>
          
          {/* Get Started Button */}
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-brandgreen to-green-600 hover:from-brandgreen hover:to-green-700 shadow-lg">
              {t.header.getStarted}
            </Button>
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center space-x-1">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="p-2 text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] transition-colors min-w-[40px]"
          >
            <Globe className="h-4 w-4" />
          </Button>
          
          {/* Cart Icon */}
          <div className="relative">
            <Button variant="ghost" className="relative p-2 text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] min-w-[40px]" onClick={() => setCartPreviewOpen((v) => !v)} aria-label="Open cart">
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
                        <Button size="sm" className="w-full bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] hover:text-black text-white" onClick={() => {/* handle guest checkout */}}>
                          Checkout as Guest
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
            className="p-2 text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] transition-colors min-w-[40px]"
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
              {/* Mobile Navigation Links */}
              <nav className="flex flex-col space-y-3">
                <Link 
                  href="/#jinsi-inavyofanya" 
                  className="nav-link text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] font-bold transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.header.howItWorks}
                </Link>
                <Link 
                  href="/#bei" 
                  className="nav-link text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] font-bold transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.header.pricing}
                </Link>
                <Link 
                  href="/#vendors" 
                  className="nav-link text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] font-bold transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.header.vendors}
                </Link>
                <Link 
                  href="/#riders" 
                  className="nav-link text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] font-bold transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.header.riders}
                </Link>
              </nav>
              
              {/* Mobile Action Buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full font-bold text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] transition-all duration-300">
                    {t.header.login}
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-brandgreen to-green-600 hover:from-brandgreen hover:to-green-700 shadow-lg">
                    {t.header.getStarted}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 
