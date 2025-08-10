-- Test database connection and basic operations
-- Run this in your Supabase SQL editor to verify everything is working

-- Test 1: Check if we can access auth.users
SELECT COUNT(*) as auth_users_count FROM auth.users;

-- Test 2: Check if public.users table exists and is accessible
SELECT COUNT(*) as public_users_count FROM public.users;

-- Test 3: Check if vendors table exists and is accessible
SELECT COUNT(*) as vendors_count FROM public.vendors;

-- Test 4: Check if rider_profiles table exists and is accessible
SELECT COUNT(*) as rider_profiles_count FROM public.rider_profiles;

-- Test 5: Check table structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'vendors', 'rider_profiles')
ORDER BY table_name, ordinal_position;

-- Test 6: Check RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN ('users', 'vendors', 'rider_profiles')
ORDER BY tablename, policyname;

-- Test 7: Check foreign key constraints
SELECT 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
AND tc.table_schema = 'public'
AND tc.table_name IN ('users', 'vendors', 'rider_profiles');
