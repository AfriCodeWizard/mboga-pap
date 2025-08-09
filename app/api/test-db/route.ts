import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, isAdminAvailable } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    if (!isAdminAvailable()) {
      return NextResponse.json(
        { success: false, error: 'Admin client not configured' },
        { status: 500 }
      )
    }

    // Test basic connection
    const { data, error } = await supabaseAdmin!.from('orders').select('count').limit(1)
    
    if (error) {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed',
        details: error.message
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Unexpected error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 