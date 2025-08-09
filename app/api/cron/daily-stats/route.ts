import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Defer imports to runtime to avoid build-time issues
    const { supabaseAdmin, isAdminAvailable } = await import('@/lib/supabase')

    // Check if admin client is available
    if (!isAdminAvailable() || !supabaseAdmin) {
      console.error('Supabase admin client not available')
      return NextResponse.json(
        { success: false, error: 'Admin client not configured' },
        { status: 500 }
      )
    }

    // Verify cron secret (you should set this in your environment)
    const authHeader = request.headers.get('authorization')
    const expectedSecret = process.env.CRON_SECRET || 'mboga-pap-cron-2025'
    
    if (authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if required tables exist by doing a simple count query
    try {
      await supabaseAdmin.from('orders').select('id').limit(1)
    } catch (error) {
      console.error('Orders table not accessible:', error)
      return NextResponse.json(
        { success: false, error: 'Required database tables not accessible' },
        { status: 500 }
      )
    }

    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    let totalOrders = 0
    let totalRevenue = 0
    let completedOrders = 0
    let cancelledOrders = 0
    let activeVendors = 0
    let activeRiders = 0

    // Get daily statistics - wrapped in try-catch
    try {
      const { data: dailyOrders, error: ordersError } = await supabaseAdmin
        .from('orders')
        .select('id, total_amount, status, created_at')
        .gte('created_at', yesterday.toISOString())
        .lt('created_at', today.toISOString())

      if (ordersError) {
        console.error('Error fetching daily orders:', ordersError)
      } else if (dailyOrders) {
        // Calculate daily stats with proper type safety
        totalOrders = dailyOrders.length
        totalRevenue = dailyOrders.reduce((sum, order) => {
          const amount = typeof order.total_amount === 'string' ? parseFloat(order.total_amount) : order.total_amount
          return sum + (isNaN(amount) ? 0 : amount)
        }, 0)
        completedOrders = dailyOrders.filter(order => order.status === 'delivered').length
        cancelledOrders = dailyOrders.filter(order => order.status === 'cancelled').length
      }
    } catch (error) {
      console.error('Error processing orders:', error)
    }

    // Get active vendors count - wrapped in try-catch
    try {
      const { count: vendorsCount, error: vendorsError } = await supabaseAdmin
        .from('vendors')
        .select('id', { count: 'exact' })
        .eq('is_online', true)

      if (vendorsError) {
        console.error('Error fetching active vendors:', vendorsError)
      } else {
        activeVendors = vendorsCount || 0
      }
    } catch (error) {
      console.error('Error processing vendors:', error)
    }

    // Get active riders count - wrapped in try-catch
    try {
      const { count: ridersCount, error: ridersError } = await supabaseAdmin
        .from('rider_profiles')
        .select('id', { count: 'exact' })
        .eq('is_available', true)

      if (ridersError) {
        console.error('Error fetching active riders:', ridersError)
      } else {
        activeRiders = ridersCount || 0
      }
    } catch (error) {
      console.error('Error processing riders:', error)
    }

    // Update vendor ratings - wrapped in try-catch
    try {
      const { data: vendorRatings, error: ratingsError } = await supabaseAdmin
        .from('reviews')
        .select(`
          vendor_id,
          rating,
          created_at
        `)
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // Last 30 days

      if (!ratingsError && vendorRatings && vendorRatings.length > 0) {
        const vendorRatingMap = new Map<string, number[]>()
        
        vendorRatings.forEach(review => {
          if (review.vendor_id && typeof review.rating === 'number') {
            if (!vendorRatingMap.has(review.vendor_id)) {
              vendorRatingMap.set(review.vendor_id, [])
            }
            vendorRatingMap.get(review.vendor_id)!.push(review.rating)
          }
        })

        // Update each vendor's average rating
        for (const [vendorId, ratings] of vendorRatingMap) {
          if (ratings.length > 0) {
            const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
            
            const { error: updateError } = await supabaseAdmin
              .from('vendors')
              .update({ rating: Math.round(averageRating * 100) / 100 })
              .eq('id', vendorId)

            if (updateError) {
              console.error(`Error updating vendor ${vendorId} rating:`, updateError)
            }
          }
        }
      }
    } catch (error) {
      console.error('Error processing vendor ratings:', error)
    }

    // Clean up old notifications - wrapped in try-catch
    try {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const { error: cleanupError } = await supabaseAdmin
        .from('notifications')
        .delete()
        .lt('created_at', thirtyDaysAgo.toISOString())
        .eq('is_read', true)

      if (cleanupError) {
        console.error('Error cleaning up old notifications:', cleanupError)
      }
    } catch (error) {
      console.error('Error cleaning up notifications:', error)
    }

    // Log daily stats
    console.log('Daily Stats:', {
      date: yesterday.toISOString().split('T')[0],
      totalOrders,
      totalRevenue,
      completedOrders,
      cancelledOrders,
      activeVendors,
      activeRiders
    })

    return NextResponse.json({
      success: true,
      message: 'Daily stats processed successfully',
      stats: {
        date: yesterday.toISOString().split('T')[0],
        totalOrders,
        totalRevenue,
        completedOrders,
        cancelledOrders,
        activeVendors,
        activeRiders
      }
    })

  } catch (error) {
    console.error('Daily stats cron error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process daily stats' },
      { status: 500 }
    )
  }
}

// Add a GET method for health checks during build
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Daily stats cron endpoint is available',
    method: 'POST',
    requiresAuth: true
  })
} 