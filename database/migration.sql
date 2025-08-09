-- Migration script to add missing features to existing Mboga Pap database
-- Run this in your Supabase SQL editor

-- 1. Add missing ENUM types (if they don't exist)
DO $$ BEGIN
    CREATE TYPE notification_type AS ENUM ('order_update', 'order_delivered', 'order_cancelled', 'payment_received', 'system_alert');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Add notifications table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type notification_type DEFAULT 'order_update',
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Add missing indexes (if they don't exist)
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(is_read);

-- 4. Check and add missing columns to vendors table
DO $$ 
BEGIN
    -- Check if category_id column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendors' AND column_name = 'category_id') THEN
        ALTER TABLE public.vendors ADD COLUMN category_id UUID REFERENCES public.categories(id);
    END IF;
    
    -- Check if total_orders column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendors' AND column_name = 'total_orders') THEN
        ALTER TABLE public.vendors ADD COLUMN total_orders INTEGER DEFAULT 0;
    END IF;
    
    -- Check if is_online column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendors' AND column_name = 'is_online') THEN
        ALTER TABLE public.vendors ADD COLUMN is_online BOOLEAN DEFAULT false;
    END IF;
    
    -- Check if rating column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendors' AND column_name = 'rating') THEN
        ALTER TABLE public.vendors ADD COLUMN rating DECIMAL(3, 2) DEFAULT 0;
    END IF;
END $$;

-- 5. Check and add missing columns to products table
DO $$ 
BEGIN
    -- Check if is_available column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'is_available') THEN
        ALTER TABLE public.products ADD COLUMN is_available BOOLEAN DEFAULT true;
    END IF;
    
    -- Check if stock_quantity column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'stock_quantity') THEN
        ALTER TABLE public.products ADD COLUMN stock_quantity INTEGER DEFAULT 0;
    END IF;
END $$;

-- 6. Add missing indexes (only if columns exist)
DO $$ 
BEGIN
    -- Only create index if is_online column exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendors' AND column_name = 'is_online') THEN
        CREATE INDEX IF NOT EXISTS idx_vendors_online ON public.vendors(is_online);
    END IF;
    
    -- Only create index if is_available column exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'is_available') THEN
        CREATE INDEX IF NOT EXISTS idx_products_available ON public.products(is_available);
    END IF;
END $$;

-- 7. Add missing triggers (if they don't exist)
DO $$ BEGIN
    CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON public.notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 8. Enable Row Level Security on notifications (if not already enabled)
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 9. Add RLS policies for notifications (if they don't exist)
DO $$ BEGIN
    CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
    CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 10. Update existing vendors to have default values (only if columns exist)
DO $$ 
BEGIN
    -- Update is_online if column exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendors' AND column_name = 'is_online') THEN
        UPDATE public.vendors SET is_online = COALESCE(is_online, false) WHERE is_online IS NULL;
    END IF;
    
    -- Update rating if column exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendors' AND column_name = 'rating') THEN
        UPDATE public.vendors SET rating = COALESCE(rating, 0) WHERE rating IS NULL;
    END IF;
    
    -- Update total_orders if column exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendors' AND column_name = 'total_orders') THEN
        UPDATE public.vendors SET total_orders = COALESCE(total_orders, 0) WHERE total_orders IS NULL;
    END IF;
END $$;

-- 11. Update existing products to have default values (only if columns exist)
DO $$ 
BEGIN
    -- Update is_available if column exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'is_available') THEN
        UPDATE public.products SET is_available = COALESCE(is_available, true) WHERE is_available IS NULL;
    END IF;
    
    -- Update stock_quantity if column exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'stock_quantity') THEN
        UPDATE public.products SET stock_quantity = COALESCE(stock_quantity, 0) WHERE stock_quantity IS NULL;
    END IF;
END $$;

-- 12. Verify migration
SELECT 
    'Migration completed successfully' as status,
    (SELECT COUNT(*) FROM public.notifications) as notifications_count,
    (SELECT COUNT(*) FROM public.vendors) as total_vendors,
    (SELECT COUNT(*) FROM public.products) as total_products; 