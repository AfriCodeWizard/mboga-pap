import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('user_id')
    const unreadOnly = searchParams.get('unread') === 'true'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    // First, check if the notifications table exists
    const { data: tableExists, error: tableCheckError } = await supabaseAdmin
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_name', 'notifications')
      .eq('table_schema', 'public')
      .single()

    if (tableCheckError || !tableExists) {
      // Table doesn't exist yet, return empty response
      return NextResponse.json({
        success: true,
        notifications: [],
        unreadCount: 0,
        pagination: {
          limit,
          offset,
          hasMore: false
        },
        message: 'Notifications table not yet created'
      })
    }

    let query = supabaseAdmin
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (unreadOnly) {
      query = query.eq('is_read', false)
    }

    query = query.range(offset, offset + limit - 1)

    const { data: notifications, error } = await query

    if (error) {
      console.error('Notifications query error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch notifications' },
        { status: 500 }
      )
    }

    // Get unread count
    const { count: unreadCount } = await supabaseAdmin
      .from('notifications')
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .eq('is_read', false)

    return NextResponse.json({
      success: true,
      notifications: notifications || [],
      unreadCount: unreadCount || 0,
      pagination: {
        limit,
        offset,
        hasMore: (notifications?.length || 0) === limit
      }
    })

  } catch (error) {
    console.error('Get notifications error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { notification_id, user_id, mark_all_read } = body

    // Check if notifications table exists
    const { data: tableExists, error: tableCheckError } = await supabaseAdmin
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_name', 'notifications')
      .eq('table_schema', 'public')
      .single()

    if (tableCheckError || !tableExists) {
      return NextResponse.json({
        success: true,
        message: 'Notifications table not yet created'
      })
    }

    if (mark_all_read && user_id) {
      // Mark all notifications as read for user
      const { error } = await supabaseAdmin
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user_id)
        .eq('is_read', false)

      if (error) {
        console.error('Mark all read error:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to mark notifications as read' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'All notifications marked as read'
      })
    }

    if (notification_id) {
      // Mark specific notification as read
      const { error } = await supabaseAdmin
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notification_id)

      if (error) {
        console.error('Mark single read error:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to mark notification as read' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Notification marked as read'
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Update notifications error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update notifications' },
      { status: 500 }
    )
  }
} 