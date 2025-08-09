import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET order details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        customer:users!orders_customer_id_fkey(id, full_name, email, phone),
        vendor:users!orders_vendor_id_fkey(id, full_name, email, phone),
        items:order_items(
          *,
          product:products(id, name, description, image)
        ),
        payment:payments(*),
        delivery:deliveries(*)
      `)
      .eq('id', params.id)
      .single()

    if (error) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      order
    })

  } catch (error) {
    console.error('Get order error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

// PATCH update order status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, rider_id } = body

    if (!status) {
      return NextResponse.json(
        { success: false, error: 'Status is required' },
        { status: 400 }
      )
    }

    const updateData: any = { status }

    // If assigning a rider, create delivery record
    if (rider_id && status === 'assigned') {
      const { error: deliveryError } = await supabaseAdmin
        .from('deliveries')
        .insert({
          order_id: params.id,
          rider_id,
          status: 'assigned',
          pickup_time: new Date().toISOString()
        })

      if (deliveryError) {
        return NextResponse.json(
          { success: false, error: 'Failed to assign rider' },
          { status: 500 }
        )
      }
    }

    // Update order status
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to update order' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Order updated successfully',
      order
    })

  } catch (error) {
    console.error('Update order error:', error)
    return NextResponse.json(
      { success: false, error: 'Invalid request data' },
      { status: 400 }
    )
  }
} 