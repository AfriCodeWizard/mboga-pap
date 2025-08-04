// Database Types
export type UserRole = 'customer' | 'vendor' | 'rider' | 'admin'
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'delivered' | 'cancelled'
export type DeliveryStatus = 'assigned' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled'
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
export type PaymentMethod = 'mpesa' | 'card' | 'cash'

// User Types
export interface User {
  id: string
  email: string
  phone?: string
  full_name: string
  role: UserRole
  avatar_url?: string
  address?: string
  city?: string
  country?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Vendor Types
export interface Vendor {
  id: string
  user_id: string
  business_name: string
  business_description?: string
  location: string
  latitude?: number
  longitude?: number
  years_in_business: number
  rating: number
  total_ratings: number
  specialties?: string[]
  operating_hours?: any
  is_verified: boolean
  is_online: boolean
  created_at: string
  updated_at: string
}

// Category Types
export interface Category {
  id: string
  name: string
  description?: string
  icon?: string
  is_active: boolean
  created_at: string
}

// Product Types
export interface Product {
  id: string
  vendor_id: string
  category_id?: string
  name: string
  description?: string
  price: number
  original_price?: number
  unit: string
  stock_quantity: number
  min_order_quantity: number
  max_order_quantity?: number
  images?: string[]
  is_organic: boolean
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

// Order Types
export interface Order {
  id: string
  customer_id: string
  vendor_id: string
  order_number: string
  status: OrderStatus
  subtotal: number
  delivery_fee: number
  total_amount: number
  delivery_address: string
  delivery_instructions?: string
  estimated_delivery_time?: string
  actual_delivery_time?: string
  created_at: string
  updated_at: string
}

// Order Item Types
export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
  total_price: number
  notes?: string
  created_at: string
}

// Delivery Types
export interface Delivery {
  id: string
  order_id: string
  rider_id?: string
  status: DeliveryStatus
  pickup_address: string
  delivery_address: string
  distance_km?: number
  estimated_duration_minutes?: number
  actual_duration_minutes?: number
  pickup_time?: string
  delivery_time?: string
  rider_earnings?: number
  created_at: string
  updated_at: string
}

// Payment Types
export interface Payment {
  id: string
  order_id: string
  amount: number
  method: PaymentMethod
  status: PaymentStatus
  transaction_id?: string
  mpesa_phone?: string
  mpesa_reference?: string
  processed_at?: string
  created_at: string
  updated_at: string
}

// Review Types
export interface Review {
  id: string
  order_id: string
  customer_id: string
  vendor_id?: string
  rider_id?: string
  rating: number
  comment?: string
  review_type: 'vendor' | 'rider' | 'product'
  created_at: string
}

// Rider Profile Types
export interface RiderProfile {
  id: string
  user_id: string
  vehicle_type: string
  vehicle_make?: string
  vehicle_model?: string
  vehicle_color?: string
  license_plate?: string
  license_number?: string
  is_online: boolean
  current_location_lat?: number
  current_location_lng?: number
  total_deliveries: number
  total_earnings: number
  rating: number
  is_verified: boolean
  created_at: string
  updated_at: string
}

// Cart Item Types
export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  updated_at: string
}

// Extended Types with Relations
export interface VendorWithUser extends Vendor {
  user: User
}

export interface ProductWithVendor extends Product {
  vendor: Vendor
  category?: Category
}

export interface OrderWithItems extends Order {
  order_items: OrderItem[]
  vendor: Vendor
  customer: User
  delivery?: Delivery
  payment?: Payment
}

export interface DeliveryWithRider extends Delivery {
  rider?: User
  order: Order
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: string
  details?: any
}

// Form Types
export interface SignupFormData {
  email: string
  password: string
  full_name: string
  phone?: string
  role: UserRole
  agreeToTerms: boolean
}

export interface LoginFormData {
  email: string
  password: string
}

// Cart Types
export interface CartProduct extends Product {
  quantity: number
  total_price: number
}

// Search and Filter Types
export interface ProductFilters {
  category?: string
  vendor?: string
  min_price?: number
  max_price?: number
  organic_only?: boolean
  featured_only?: boolean
  search?: string
}

export interface VendorFilters {
  location?: string
  verified_only?: boolean
  online_only?: boolean
  min_rating?: number
  specialties?: string[]
} 