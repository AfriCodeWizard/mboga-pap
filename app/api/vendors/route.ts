import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'rating'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabaseAdmin
      .from('vendors')
      .select(`
        *,
        user:users(id, full_name, email, phone, avatar_url),
        products:products(id, name, category_id, price, is_available)
      `)
      .eq('is_online', true)

    // Apply category filter
    if (category && category !== 'all') {
      query = query.eq('category_id', category)
    }

    // Apply search filter
    if (search) {
      query = query.or(`business_name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // Apply sorting
    if (sortBy === 'name') {
      query = query.order('business_name', { ascending: sortOrder === 'asc' })
    } else if (sortBy === 'rating') {
      query = query.order('rating', { ascending: sortOrder === 'asc' })
    } else if (sortBy === 'orders') {
      query = query.order('total_orders', { ascending: sortOrder === 'asc' })
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data: vendors, error } = await query

    if (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch vendors' },
        { status: 500 }
      )
    }

    // Get total count for pagination
    let countQuery = supabaseAdmin
      .from('vendors')
      .select('id', { count: 'exact' })
      .eq('is_online', true)

    if (category && category !== 'all') {
      countQuery = countQuery.eq('category_id', category)
    }

    if (search) {
      countQuery = countQuery.or(`business_name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const { count } = await countQuery

    return NextResponse.json({
      success: true,
      vendors,
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit
      }
    })

  } catch (error) {
    console.error('Get vendors error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch vendors' },
      { status: 500 }
    )
  }
} 