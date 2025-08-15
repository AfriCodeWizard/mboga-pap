"use client"

import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase'

export default function SessionDebug() {
  const [sessionInfo, setSessionInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const supabase = getSupabaseClient()
        if (!supabase) {
          setSessionInfo({ error: 'No Supabase client' })
          setLoading(false)
          return
        }

        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          setSessionInfo({ error: error.message })
        } else {
          setSessionInfo({
            hasSession: !!session,
            userId: session?.user?.id,
            email: session?.user?.email,
            role: session?.user?.user_metadata?.role,
            expiresAt: session?.expires_at
          })
        }
      } catch (err) {
        setSessionInfo({ error: err instanceof Error ? err.message : 'Unknown error' })
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Listen for auth changes
    const supabase = getSupabaseClient()
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state change:', event, session)
        if (session) {
          setSessionInfo({
            hasSession: true,
            userId: session.user.id,
            email: session.user.email,
            role: session.user.user_metadata?.role,
            expiresAt: session.expires_at
          })
        } else {
          setSessionInfo({ hasSession: false })
        }
      })

      return () => subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return <div className="p-4 bg-blue-50 text-blue-800 rounded">Checking session...</div>
  }

  return (
    <div className="p-4 bg-gray-50 text-gray-800 rounded text-sm">
      <h3 className="font-bold mb-2">Session Debug Info:</h3>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(sessionInfo, null, 2)}
      </pre>
    </div>
  )
}
