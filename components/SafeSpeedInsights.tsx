'use client'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { useEffect, useState } from 'react'

export default function SafeSpeedInsights() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Check if we're in production and if Speed Insights should load
    const isProduction = process.env.NODE_ENV === 'production'
    const isVercel = typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')
    
    // Check if ad blocker might be active (common indicators)
    const hasAdBlocker = typeof window !== 'undefined' && (
      window.adsbygoogle === undefined ||
      window.google_tag_manager === undefined ||
      window.ga === undefined
    )
    
    if (isProduction && isVercel && !hasAdBlocker) {
      // Try to load Speed Insights
      setShouldLoad(true)
    } else if (hasAdBlocker) {
      console.log('Ad blocker detected, skipping Speed Insights to prevent errors')
      setShouldLoad(false)
    }
  }, [])

  // If there was an error or we shouldn't load, don't render
  if (hasError || !shouldLoad) {
    return null
  }

  try {
    return <SpeedInsights />
  } catch (error) {
    console.warn('Speed Insights failed to load:', error)
    setHasError(true)
    return null
  }
}
