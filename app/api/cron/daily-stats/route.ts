import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Verify cron secret (you should set this in your environment)
    const authHeader = request.headers.get('authorization')
    const expectedSecret = process.env.CRON_SECRET || 'mboga-pap-cron-2025'
    
    if (authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    // Get daily statistics
    const { data: dailyOrders, error: ordersError } = await supabaseAdmin
      .from('orders')
      .select('id, total_amount, status, created_at')
      .gte('created_at', yesterday.toISOString())
      .lt('created_at', today.toISOString())

    if (ordersError) {
      console.error('Error fetching daily orders:', ordersError)
    }

    // Calculate daily stats
    const totalOrders = dailyOrders?.length || 0
    const totalRevenue = dailyOrders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0
    const completedOrders = dailyOrders?.filter(order => order.status === 'delivered').length || 0
    const cancelledOrders = dailyOrders?.filter(order => order.status === 'cancelled').length || 0

    // Get active vendors count
    const { count: activeVendors } = await supabaseAdmin
      .from('vendors')
      .select('id', { count: 'exact' })
      .eq('is_online', true)

    // Get active riders count
    const { count: activeRiders } = await supabaseAdmin
      .from('rider_profiles')
      .select('id', { count: 'exact' })
      .eq('is_available', true)

    // Update vendor ratings (average of recent reviews)
    const { data: vendorRatings, error: ratingsError } = await supabaseAdmin
      .from('reviews')
      .select(`
        vendor_id,
        rating,
        created_at
      `)
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // Last 30 days

    if (!ratingsError && vendorRatings) {
      const vendorRatingMap = new Map()
      
      vendorRatings.forEach(review => {
        if (!vendorRatingMap.has(review.vendor_id)) {
          vendorRatingMap.set(review.vendor_id, [])
        }
        vendorRatingMap.get(review.vendor_id).push(review.rating)
      })

      // Update each vendor's average rating
      for (const [vendorId, ratings] of vendorRatingMap) {
        const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
        
        await supabaseAdmin
          .from('vendors')
          .update({ rating: Math.round(averageRating * 100) / 100 })
          .eq('id', vendorId)
      }
    }

    // Clean up old notifications (older than 30 days)
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

    // Log daily stats
    console.log('Daily Stats:', {
      date: yesterday.toISOString().split('T')[0],
      totalOrders,
      totalRevenue,
      completedOrders,
      cancelledOrders,
      activeVendors: activeVendors || 0,
      activeRiders: activeRiders || 0
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
        activeVendors: activeVendors || 0,
        activeRiders: activeRiders || 0
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