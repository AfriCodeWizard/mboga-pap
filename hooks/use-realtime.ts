import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase'
import { RealtimeChannel } from '@supabase/supabase-js'

interface UseRealtimeOptions {
  table: string
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*'
  filter?: string
  userId?: string
}

export function useRealtime<T = any>(options: UseRealtimeOptions) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [channel, setChannel] = useState<RealtimeChannel | null>(null)

  useEffect(() => {
    let mounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        const supabase = getSupabaseClient()
        if (!supabase) {
          throw new Error('Supabase client not available')
        }
        
        let query = supabase.from(options.table).select('*')

        if (options.filter) {
          query = query.eq(options.filter, options.userId)
        }

        const { data: initialData, error } = await query

        if (error) {
          throw error
        }

        if (mounted) {
          setData(initialData || [])
          setError(null)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'An error occurred')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    // Set up real-time subscription
    const setupSubscription = () => {
      const supabase = getSupabaseClient()
      if (!supabase) {
        console.warn('Supabase client not available for real-time subscription')
        return
      }
      
      let subscriptionQuery = supabase
        .channel(`${options.table}_changes`)
        .on(
          'postgres_changes',
          {
            event: options.event || '*',
            schema: 'public',
            table: options.table,
            filter: options.filter ? `${options.filter}=eq.${options.userId}` : undefined
          },
          (payload) => {
            if (!mounted) return

            setData((currentData) => {
              switch (payload.eventType) {
                case 'INSERT':
                  return [...currentData, payload.new as T]
                case 'UPDATE':
                  return currentData.map((item: any) =>
                    item.id === payload.new.id ? payload.new : item
                  )
                case 'DELETE':
                  return currentData.filter((item: any) => item.id !== payload.old.id)
                default:
                  return currentData
              }
            })
          }
        )
        .subscribe()

      setChannel(subscriptionQuery)
    }

    setupSubscription()

    return () => {
      mounted = false
      if (channel) {
        const supabase = getSupabaseClient()
        if (supabase) {
          supabase.removeChannel(channel)
        }
      }
    }
  }, [options.table, options.event, options.filter, options.userId])

  return { data, loading, error }
}

// Specialized hooks for common use cases
export function useOrders(userId?: string) {
  return useRealtime({
    table: 'orders',
    filter: 'customer_id',
    userId
  })
}

export function useNotifications(userId?: string) {
  return useRealtime({
    table: 'notifications',
    filter: 'user_id',
    userId
  })
}

export function useVendorProducts(vendorId?: string) {
  return useRealtime({
    table: 'products',
    filter: 'vendor_id',
    userId: vendorId
  })
}

export function useCartItems(userId?: string) {
  return useRealtime({
    table: 'cart_items',
    filter: 'user_id',
    userId
  })
} 