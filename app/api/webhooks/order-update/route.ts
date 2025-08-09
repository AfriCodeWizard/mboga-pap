import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { order_id, status, user_id, notification_type } = body

    if (!order_id || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get order details
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        customer:users!orders_customer_id_fkey(id, full_name, email, phone),
        vendor:users!orders_vendor_id_fkey(id, full_name, email, phone),
        delivery:deliveries(rider_id)
      `)
      .eq('id', order_id)
      .single()

    if (orderError) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      )
    }

    // Create notification based on status
    let notificationMessage = ''
    let notificationType = 'order_update'

    switch (status) {
      case 'confirmed':
        notificationMessage = `Your order #${order_id.slice(0, 8)} has been confirmed by the vendor`
        break
      case 'preparing':
        notificationMessage = `Your order #${order_id.slice(0, 8)} is being prepared`
        break
      case 'ready':
        notificationMessage = `Your order #${order_id.slice(0, 8)} is ready for pickup`
        break
      case 'assigned':
        notificationMessage = `A rider has been assigned to your order #${order_id.slice(0, 8)}`
        break
      case 'picked_up':
        notificationMessage = `Your order #${order_id.slice(0, 8)} has been picked up and is on the way`
        break
      case 'delivered':
        notificationMessage = `Your order #${order_id.slice(0, 8)} has been delivered`
        notificationType = 'order_delivered'
        break
      case 'cancelled':
        notificationMessage = `Your order #${order_id.slice(0, 8)} has been cancelled`
        notificationType = 'order_cancelled'
        break
      default:
        notificationMessage = `Your order #${order_id.slice(0, 8)} status has been updated to ${status}`
    }

    // Send real-time notification to customer
    if (order.customer) {
      await supabaseAdmin
        .from('notifications')
        .insert({
          user_id: order.customer.id,
          title: 'Order Update',
          message: notificationMessage,
          type: notificationType,
          order_id: order_id,
          is_read: false
        })
    }

    // Send notification to vendor if needed
    if (['confirmed', 'cancelled'].includes(status) && order.vendor) {
      const vendorMessage = status === 'confirmed' 
        ? `New order #${order_id.slice(0, 8)} received`
        : `Order #${order_id.slice(0, 8)} has been cancelled`

      await supabaseAdmin
        .from('notifications')
        .insert({
          user_id: order.vendor.id,
          title: 'Order Update',
          message: vendorMessage,
          type: notificationType,
          order_id: order_id,
          is_read: false
        })
    }

    // Send notification to rider if assigned
    if (order.delivery?.rider_id && ['assigned', 'picked_up', 'delivered'].includes(status)) {
      let riderMessage = ''
      switch (status) {
        case 'assigned':
          riderMessage = `You have been assigned to deliver order #${order_id.slice(0, 8)}`
          break
        case 'picked_up':
          riderMessage = `Order #${order_id.slice(0, 8)} picked up successfully`
          break
        case 'delivered':
          riderMessage = `Order #${order_id.slice(0, 8)} delivered successfully`
          break
      }

      await supabaseAdmin
        .from('notifications')
        .insert({
          user_id: order.delivery.rider_id,
          title: 'Delivery Update',
          message: riderMessage,
          type: notificationType,
          order_id: order_id,
          is_read: false
        })
    }

    // Trigger additional actions based on status
    if (status === 'delivered') {
      // Update rider stats
      if (order.delivery?.rider_id) {
        await supabaseAdmin
          .from('rider_profiles')
          .update({ 
            total_deliveries: supabaseAdmin.sql`total_deliveries + 1` 
          })
          .eq('user_id', order.delivery.rider_id)
      }

      // Update payment status
      await supabaseAdmin
        .from('payments')
        .update({ status: 'completed' })
        .eq('order_id', order_id)
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully'
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
} 