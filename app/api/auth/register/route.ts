import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  full_name: z.string().min(2),
  phone: z.string().optional(),
  role: z.enum(['customer', 'vendor', 'rider']),
  address: z.string().optional(),
  city: z.string().default('Nairobi'),
  country: z.string().default('Kenya')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: validatedData.email,
      password: validatedData.password,
      email_confirm: true,
      user_metadata: {
        full_name: validatedData.full_name,
        role: validatedData.role
      }
    })

    if (authError) {
      return NextResponse.json(
        { success: false, error: authError.message },
        { status: 400 }
      )
    }

    // Create user profile in our database
    const { error: profileError } = await supabaseAdmin
      .from('users')
      .insert({
        id: authData.user.id,
        email: validatedData.email,
        phone: validatedData.phone,
        full_name: validatedData.full_name,
        role: validatedData.role,
        address: validatedData.address,
        city: validatedData.city,
        country: validatedData.country
      })

    if (profileError) {
      // Clean up auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json(
        { success: false, error: 'Failed to create user profile' },
        { status: 500 }
      )
    }

    // Create role-specific profiles
    if (validatedData.role === 'vendor') {
      await supabaseAdmin.from('vendors').insert({
        user_id: authData.user.id,
        business_name: validatedData.full_name,
        description: '',
        is_online: false,
        rating: 0,
        total_orders: 0
      })
    } else if (validatedData.role === 'rider') {
      await supabaseAdmin.from('rider_profiles').insert({
        user_id: authData.user.id,
        vehicle_type: 'motorcycle',
        vehicle_number: '',
        is_available: false,
        current_location: null,
        total_deliveries: 0,
        rating: 0
      })
    }

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: authData.user.id,
        email: validatedData.email,
        full_name: validatedData.full_name,
        role: validatedData.role
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'Invalid request data' },
      { status: 400 }
    )
  }
} 