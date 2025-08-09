import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'

const orderItemSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.number().positive(),
  unit_price: z.number().positive()
})

const createOrderSchema = z.object({
  vendor_id: z.string().uuid(),
  customer_id: z.string().uuid(),
  items: z.array(orderItemSchema).min(1),
  delivery_address: z.string(),
  delivery_instructions: z.string().optional(),
  payment_method: z.enum(['cash', 'mpesa', 'card']).default('cash')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createOrderSchema.parse(body)

    // Calculate order total
    const orderTotal = validatedData.items.reduce(
      (total, item) => total + (item.quantity * item.unit_price),
      0
    )

    // Create order with transaction
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        customer_id: validatedData.customer_id,
        vendor_id: validatedData.vendor_id,
        total_amount: orderTotal,
        delivery_address: validatedData.delivery_address,
        delivery_instructions: validatedData.delivery_instructions,
        payment_method: validatedData.payment_method,
        status: 'pending'
      })
      .select()
      .single()

    if (orderError) {
      return NextResponse.json(
        { success: false, error: 'Failed to create order' },
        { status: 500 }
      )
    }

    // Create order items
    const orderItems = validatedData.items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.quantity * item.unit_price
    }))

    const { error: itemsError } = await supabaseAdmin
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      // Clean up order if items creation fails
      await supabaseAdmin.from('orders').delete().eq('id', order.id)
      return NextResponse.json(
        { success: false, error: 'Failed to create order items' },
        { status: 500 }
      )
    }

    // Create payment record
    const { error: paymentError } = await supabaseAdmin
      .from('payments')
      .insert({
        order_id: order.id,
        amount: orderTotal,
        method: validatedData.payment_method,
        status: 'pending'
      })

    if (paymentError) {
      console.error('Payment creation error:', paymentError)
      // Don't fail the order for payment creation error
    }

    // Update vendor stats
    await supabaseAdmin
      .from('vendors')
      .update({ 
        total_orders: supabaseAdmin.sql`total_orders + 1` 
      })
      .eq('user_id', validatedData.vendor_id)

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      order: {
        id: order.id,
        total_amount: orderTotal,
        status: order.status,
        created_at: order.created_at
      }
    })

  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Invalid request data' },
      { status: 400 }
    )
  }
} 