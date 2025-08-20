"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingCart, User, Settings, Menu, X, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { useCart } from "@/components/CartContext"
import { useLoyalty } from "@/components/LoyaltyContext"
import { useToast } from "@/hooks/use-toast"
import { getSupabaseClient } from "@/lib/supabase"

export default function CustomerNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { cart } = useCart()
  const { points } = useLoyalty()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const supabase = getSupabaseClient()
        if (supabase) {
          const { data: { user } } = await supabase.auth.getUser()
          setUser(user)
        }
      } catch (error) {
        console.error('Error checking user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [])

  const handleLogout = async () => {
    try {
      const supabase = getSupabaseClient()
      if (supabase) {
        await supabase.auth.signOut()
        
        // Clear demo user cookies
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

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => router.push('/')}
              className="text-2xl font-bold text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] transition-colors"
            >
              Mboga Pap
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-gray-700 hover:text-[color:var(--color-primary)] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </button>
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Loyalty Points */}
            <div className="hidden sm:flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">{points} pts</span>
            </div>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => {
                // Open cart drawer instead of redirecting
                const event = new CustomEvent('openCartDrawer');
                window.dispatchEvent(event);
              }}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-[color:var(--color-accent)] text-[color:var(--color-primary)] font-bold">
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            {!isLoading && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name || 'User'} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.user_metadata?.full_name || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email || 'user@example.com'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/dashboard/order-history')}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    <span>Order History</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/dashboard/loyalty')}>
                    <Star className="mr-2 h-4 w-4" />
                    <span>Loyalty Points</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <span className="text-red-600">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  router.push('/dashboard')
                  setIsMenuOpen(false)
                }}
                className="text-gray-700 hover:text-[color:var(--color-primary)] block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  router.push('/dashboard')
                  setIsMenuOpen(false)
                }}
                className="text-gray-700 hover:text-[color:var(--color-primary)] block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  handleLogout()
                  setIsMenuOpen(false)
                }}
                className="text-red-600 hover:text-red-800 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 