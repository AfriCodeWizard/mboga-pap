"use client"

import { useEffect } from 'react'

export default function GoogleAnalytics() {
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Load Google Analytics script
      const script = document.createElement('script')
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'
      script.async = true
      document.head.appendChild(script)

      // Initialize gtag
      window.dataLayer = window.dataLayer || []
      function gtag(...args: any[]) {
        window.dataLayer.push(args)
      }
      gtag('js', new Date())
      gtag('config', 'GA_MEASUREMENT_ID')

      // Cleanup
      return () => {
        document.head.removeChild(script)
      }
    }
  }, [])

  return null
}
