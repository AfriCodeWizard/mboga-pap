"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Globe } from "lucide-react"
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
      vendors: "Mamambogas",
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
  const { cart, removeFromCart, clearCart } = useCart();
  const cartTotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const { toast } = useToast();
  const t = content[language]

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "sw" : "en"))
  }

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[color:var(--color-primary)] to-[color:var(--color-primary)] rounded-xl flex items-center justify-center transform rotate-12 shadow-lg group-hover:scale-105 transition-transform border-2 border-[color:var(--color-accent)]">
            <span className="text-[color:var(--color-accent)] font-bold text-lg transform -rotate-12">🥬</span>
          </div>
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-primary)] bg-clip-text text-transparent">
              Mbonga Pap
            </span>
            <p className="text-xs text-gray-500 -mt-1">Fresh And Fast 🏍️</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/#jinsi-inavyofanya" className="nav-link text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] font-bold transition-colors">
            {t.header.howItWorks}
          </Link>
          <Link href="/#bei" className="nav-link text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] font-bold transition-colors">
            {t.header.pricing}
          </Link>
          <Link href="/#mamambogas" className="nav-link text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] font-bold transition-colors">
            {t.header.vendors}
          </Link>
          <Link href="/#riders" className="nav-link text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] font-bold transition-colors">
            {t.header.riders}
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          {/* SW Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center space-x-2 text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] transition-colors font-bold"
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
              <span className="ml-2 text-[color:var(--color-primary)] font-semibold text-sm hidden sm:inline group-hover:text-[color:var(--color-accent)]">KSh {cartTotal.toFixed(0)}</span>
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
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-brandgreen to-green-600 hover:from-brandgreen hover:to-green-700 shadow-lg">
              {t.header.getStarted}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
} 