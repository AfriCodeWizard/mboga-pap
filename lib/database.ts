import { supabase } from './supabase'
import { 
  Vendor, 
  Product, 
  Category, 
  Order, 
  User, 
  ProductWithVendor, 
  VendorWithUser,
  ProductFilters,
  VendorFilters,
  ApiResponse 
} from './types'

// Category Services
export const categoryService = {
  async getAll(): Promise<ApiResponse<Category[]>> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: 'Failed to fetch categories',
        details: error 
      }
    }
  },

  async getById(id: string): Promise<ApiResponse<Category>> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: 'Failed to fetch category',
        details: error 
      }
    }
  }
}

// Vendor Services
export const vendorService = {
  async getAll(filters?: VendorFilters): Promise<ApiResponse<VendorWithUser[]>> {
    try {
      let query = supabase
        .from('vendors')
        .select(`
          *,
          user:users(id, full_name, email, phone, avatar_url)
        `)
        .eq('is_online', true)

      if (filters?.verified_only) {
        query = query.eq('is_verified', true)
      }

      if (filters?.min_rating) {
        query = query.gte('rating', filters.min_rating)
      }

      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`)
      }

      const { data, error } = await query.order('rating', { ascending: false })

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: 'Failed to fetch vendors',
        details: error 
      }
    }
  },

  async getById(id: string): Promise<ApiResponse<VendorWithUser>> {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select(`
          *,
          user:users(id, full_name, email, phone, avatar_url)
        `)
        .eq('id', id)
        .single()

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: 'Failed to fetch vendor',
        details: error 
      }
    }
  },

  async getByUserId(userId: string): Promise<ApiResponse<Vendor>> {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: 'Failed to fetch vendor profile',
        details: error 
      }
    }
  }
}

// Product Services
export const productService = {
  async getAll(filters?: ProductFilters): Promise<ApiResponse<ProductWithVendor[]>> {
    try {
      let query = supabase
        .from('products')
        .select(`
          *,
          vendor:vendors(*),
          category:categories(*)
        `)
        .eq('is_active', true)

      if (filters?.category) {
        query = query.eq('category_id', filters.category)
      }

      if (filters?.vendor) {
        query = query.eq('vendor_id', filters.vendor)
      }

      if (filters?.min_price) {
        query = query.gte('price', filters.min_price)
      }

      if (filters?.max_price) {
        query = query.lte('price', filters.max_price)
      }

      if (filters?.organic_only) {
        query = query.eq('is_organic', true)
      }

      if (filters?.featured_only) {
        query = query.eq('is_featured', true)
      }

      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: 'Failed to fetch products',
        details: error 
      }
    }
  },

  async getById(id: string): Promise<ApiResponse<ProductWithVendor>> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          vendor:vendors(*),
          category:categories(*)
        `)
        .eq('id', id)
        .single()

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: 'Failed to fetch product',
        details: error 
      }
    }
  },

  async getByVendor(vendorId: string): Promise<ApiResponse<Product[]>> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('vendor_id', vendorId)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: 'Failed to fetch vendor products',
        details: error 
      }
    }
  }
}

// User Services
export const userService = {
  async getById(id: string): Promise<ApiResponse<User>> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: 'Failed to fetch user',
        details: error 
      }
    }
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return { success: false, error: 'No authenticated user' }
      }

      return await this.getById(user.id)
    } catch (error) {
      return { 
        success: false, 
        error: 'Failed to fetch current user',
        details: error 
      }
    }
  }
}

// Order Services
export const orderService = {
  async getByCustomer(customerId: string): Promise<ApiResponse<Order[]>> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: 'Failed to fetch customer orders',
        details: error 
      }
    }
  },

  async getByVendor(vendorId: string): Promise<ApiResponse<Order[]>> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('vendor_id', vendorId)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: 'Failed to fetch vendor orders',
        details: error 
      }
    }
  },

  async getById(id: string): Promise<ApiResponse<Order>> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: 'Failed to fetch order',
        details: error 
      }
    }
  }
} 