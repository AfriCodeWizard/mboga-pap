-- Check if tables exist and create them if they don't
-- This script should be run in your Supabase SQL editor

-- Check if users table exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') THEN
        -- Create users table
        CREATE TABLE public.users (
            id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            full_name TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'customer',
            avatar_url TEXT,
            address TEXT,
            city TEXT DEFAULT 'Nairobi',
            country TEXT DEFAULT 'Kenya',
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Create index
        CREATE INDEX idx_users_email ON public.users(email);
        CREATE INDEX idx_users_role ON public.users(role);
        
        -- Enable RLS
        ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
        
        -- Create RLS policies
        CREATE POLICY "Users can view their own profile" ON public.users FOR SELECT USING (auth.uid() = id);
        CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
        CREATE POLICY "Allow auth callback to create user profiles" ON public.users FOR INSERT WITH CHECK (true);
        
        RAISE NOTICE 'Users table created successfully';
    ELSE
        RAISE NOTICE 'Users table already exists';
    END IF;
END $$;

-- Check if vendors table exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'vendors') THEN
        -- Create vendors table
        CREATE TABLE public.vendors (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
            business_name TEXT NOT NULL,
            description TEXT,
            address TEXT,
            phone TEXT,
            email TEXT,
            is_online BOOLEAN DEFAULT false,
            rating DECIMAL(3, 2) DEFAULT 0,
            total_orders INTEGER DEFAULT 0,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Create index
        CREATE INDEX idx_vendors_user_id ON public.vendors(user_id);
        CREATE INDEX idx_vendors_online ON public.vendors(is_online);
        
        -- Enable RLS
        ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
        
        -- Create RLS policies
        CREATE POLICY "Vendors are viewable by all" ON public.vendors FOR SELECT USING (true);
        CREATE POLICY "Vendors can update their own profile" ON public.vendors FOR UPDATE USING (auth.uid() = user_id);
        CREATE POLICY "Allow auth callback to create vendor profiles" ON public.vendors FOR INSERT WITH CHECK (true);
        
        RAISE NOTICE 'Vendors table created successfully';
    ELSE
        RAISE NOTICE 'Vendors table already exists';
    END IF;
END $$;

-- Check if rider_profiles table exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'rider_profiles') THEN
        -- Create rider_profiles table
        CREATE TABLE public.rider_profiles (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
            vehicle_type TEXT DEFAULT 'motorcycle',
            vehicle_number TEXT,
            is_available BOOLEAN DEFAULT false,
            total_deliveries INTEGER DEFAULT 0,
            rating DECIMAL(3, 2) DEFAULT 0,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Enable RLS
        ALTER TABLE public.rider_profiles ENABLE ROW LEVEL SECURITY;
        
        -- Create RLS policies
        CREATE POLICY "Rider profiles are viewable by all" ON public.rider_profiles FOR SELECT USING (true);
        CREATE POLICY "Riders can update their own profile" ON public.rider_profiles FOR UPDATE USING (auth.uid() = user_id);
        CREATE POLICY "Allow auth callback to create rider profiles" ON public.rider_profiles FOR INSERT WITH CHECK (true);
        
        RAISE NOTICE 'Rider profiles table created successfully';
    ELSE
        RAISE NOTICE 'Rider profiles table already exists';
    END IF;
END $$;

-- Check current tables
SELECT table_name, table_schema 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
