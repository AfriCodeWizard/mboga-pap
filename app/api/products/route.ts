import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  category_id: z.string().uuid(),
  vendor_id: z.string().uuid(),
  image: z.string().url().optional(),
  is_available: z.boolean().default(true),
  stock_quantity: z.number().int().min(0).default(0)
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const vendorId = searchParams.get('vendor_id')
    const categoryId = searchParams.get('category_id')
    const search = searchParams.get('search')
    const available = searchParams.get('available')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabaseAdmin
      .from('products')
      .select(`
        *,
        category:categories(name, icon),
        vendor:vendors(business_name, rating)
      `)

    // Apply filters
    if (vendorId) {
      query = query.eq('vendor_id', vendorId)
    }

    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    if (available === 'true') {
      query = query.eq('is_available', true)
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1).order('created_at', { ascending: false })

    const { data: products, error } = await query

    if (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch products' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      products
    })

  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = productSchema.parse(body)

    const { data: product, error } = await supabaseAdmin
      .from('products')
      .insert(validatedData)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to create product' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product
    })

  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { success: false, error: 'Invalid request data' },
      { status: 400 }
    )
  }
} 