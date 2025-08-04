import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Test query to get categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(5)

    if (categoriesError) {
      return NextResponse.json({ error: 'Categories query failed', details: categoriesError }, { status: 500 })
    }

    // Test query to get vendors
    const { data: vendors, error: vendorsError } = await supabase
      .from('vendors')
      .select('*')
      .limit(5)

    if (vendorsError) {
      return NextResponse.json({ error: 'Vendors query failed', details: vendorsError }, { status: 500 })
    }

    // Test query to get products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(5)

    if (productsError) {
      return NextResponse.json({ error: 'Products query failed', details: productsError }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      data: {
        categories: categories?.length || 0,
        vendors: vendors?.length || 0,
        products: products?.length || 0,
        sample: {
          categories: categories?.slice(0, 3),
          vendors: vendors?.slice(0, 3),
          products: products?.slice(0, 3)
        }
      }
    })

  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({ 
      error: 'Database connection failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
} 