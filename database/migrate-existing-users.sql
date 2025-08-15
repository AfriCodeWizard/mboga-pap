-- MIGRATE EXISTING USERS SCRIPT
-- This script will create profiles for existing Supabase Auth users
-- Run this AFTER running the emergency-rls-fix.sql script

-- Step 1: Check what users exist in auth.users but not in public.users
SELECT 
  'Users in Auth but missing from public.users:' as status,
  COUNT(*) as count
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL;

-- Step 2: Create user profiles for existing auth users
-- Note: This will create profiles with default 'customer' role
-- You can manually update the role later if needed

INSERT INTO public.users (
  id,
  email,
  full_name,
  role,
  phone,
  address,
  city,
  country,
  created_at,
  updated_at
)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', 
            au.raw_user_meta_data->>'name', 
            'User') as full_name,
  COALESCE(au.raw_user_meta_data->>'role', 'customer')::user_role as role,
  COALESCE(au.raw_user_meta_data->>'phone', '') as phone,
  COALESCE(au.raw_user_meta_data->>'address', '') as address,
  'Nairobi' as city,
  'Kenya' as country,
  au.created_at,
  au.updated_at
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL
  AND au.email_confirmed_at IS NOT NULL; -- Only confirmed users

-- 3. Create role-specific profiles for existing users
-- For vendors
INSERT INTO public.vendors (
  user_id,
  business_name,
  description,
  is_online,
  rating,
  total_orders,
  created_at,
  updated_at
)
SELECT 
  u.id,
  COALESCE(u.full_name, 'Vendor') as business_name,
  '' as description,
  false as is_online,
  0 as rating,
  0 as total_orders,
  u.created_at,
  u.updated_at
FROM public.users u
LEFT JOIN public.vendors v ON u.id = v.user_id
WHERE u.role = 'vendor'::user_role
  AND v.user_id IS NULL;

-- For riders
INSERT INTO public.rider_profiles (
  user_id,
  vehicle_type,
  vehicle_number,
  is_available,
  total_deliveries,
  rating,
  created_at,
  updated_at
)
SELECT 
  u.id,
  'motorcycle' as vehicle_type,
  '' as vehicle_number,
  false as is_available,
  0 as total_deliveries,
  0 as rating,
  u.created_at,
  u.updated_at
FROM public.users u
LEFT JOIN public.rider_profiles rp ON u.id = rp.user_id
WHERE u.role = 'rider'::user_role
  AND rp.user_id IS NULL;

-- For customers
INSERT INTO public.customers (
  user_id,
  first_name,
  last_name,
  phone,
  address,
  city,
  country,
  created_at,
  updated_at
)
SELECT 
  u.id,
  COALESCE(SPLIT_PART(u.full_name, ' ', 1), 'Customer') as first_name,
  COALESCE(SUBSTRING(u.full_name FROM POSITION(' ' IN u.full_name) + 1), 'User') as last_name,
  u.phone,
  u.address,
  u.city,
  u.country,
  u.created_at,
  u.updated_at
FROM public.users u
LEFT JOIN public.customers c ON u.id = c.user_id
WHERE u.role = 'customer'::user_role
  AND c.user_id IS NULL;

-- Step 4: Show migration results
SELECT 
  'Migration completed!' as status,
  COUNT(*) as total_users_in_public
FROM public.users;

SELECT 
  'Vendor profiles created:' as status,
  COUNT(*) as count
FROM public.vendors;

SELECT 
  'Rider profiles created:' as status,
  COUNT(*) as count
FROM public.rider_profiles;

SELECT 
  'Customer profiles created:' as status,
  COUNT(*) as count
FROM public.customers;

-- Step 5: Show users that can now log in
SELECT 
  'Users ready for login:' as status,
  u.email,
  u.role,
  CASE 
    WHEN u.role = 'vendor'::user_role AND v.id IS NOT NULL THEN '✅ Vendor profile ready'
    WHEN u.role = 'rider'::user_role AND rp.id IS NOT NULL THEN '✅ Rider profile ready'
    WHEN u.role = 'customer'::user_role THEN '✅ Customer profile ready'
    ELSE '❌ Profile missing'
  END as profile_status
FROM public.users u
LEFT JOIN public.vendors v ON u.id = v.user_id
LEFT JOIN public.rider_profiles rp ON u.id = rp.user_id
ORDER BY u.created_at DESC;
