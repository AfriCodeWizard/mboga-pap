"use client"

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { CartProvider } from '@/components/CartContext'

export default function ClientLayoutWithConditionalNavbar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideNavbar = [
    '/dashboard',
    '/admin',
    '/vendor-dashboard',
    '/rider-dashboard',
    '/vendors', // Add this line to hide global navbar for vendor pages
  ].some((route) => pathname.startsWith(route))
  return (
    <CartProvider>
      {!hideNavbar && <Navbar />}
      {children}
      <ScrollToTopButton />
    </CartProvider>
  )
} 