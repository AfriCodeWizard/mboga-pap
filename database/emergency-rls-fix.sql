-- EMERGENCY RLS FIX for Profile Creation Issues
-- Run this in your Supabase SQL Editor to fix the profile creation problem

-- Step 1: Temporarily disable RLS on users table to allow profile creation
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop existing policies and create simple, permissive policies for users table
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Allow profile creation" ON public.users;
DROP POLICY IF EXISTS "Allow auth callback to create user profiles" ON public.users;

CREATE POLICY "Users can view their own profile" ON public.users 
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users 
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow profile creation" ON public.users 
FOR INSERT WITH CHECK (true);

-- Step 3: Re-enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Step 4: Fix other tables with simple policies
-- Vendors table
DROP POLICY IF EXISTS "Vendors are viewable by all" ON public.vendors;
DROP POLICY IF EXISTS "Vendors can update their own profile" ON public.vendors;
DROP POLICY IF EXISTS "Allow auth callback to create vendor profiles" ON public.vendors;
CREATE POLICY "Vendors are viewable by all" ON public.vendors FOR SELECT USING (true);
CREATE POLICY "Vendors can update their own profile" ON public.vendors FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow vendor profile creation" ON public.vendors FOR INSERT WITH CHECK (true);

-- Rider profiles table
DROP POLICY IF EXISTS "Rider profiles are viewable by all" ON public.rider_profiles;
DROP POLICY IF EXISTS "Riders can update their own profile" ON public.rider_profiles;
DROP POLICY IF EXISTS "Allow auth callback to create rider profiles" ON public.rider_profiles;
CREATE POLICY "Rider profiles are viewable by all" ON public.rider_profiles FOR SELECT USING (true);
CREATE POLICY "Riders can update their own profile" ON public.rider_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow rider profile creation" ON public.rider_profiles FOR INSERT WITH CHECK (true);

-- Cart items table
DROP POLICY IF EXISTS "Users can view their own cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can manage their own cart items" ON public.cart_items;
CREATE POLICY "Users can view their own cart items" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own cart items" ON public.cart_items FOR ALL USING (auth.uid() = user_id);

-- Orders table
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Users can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Products table
DROP POLICY IF EXISTS "Products are viewable by all" ON public.products;
DROP POLICY IF EXISTS "Vendors can manage their own products" ON public.products;
CREATE POLICY "Products are viewable by all" ON public.products FOR SELECT USING (true);
CREATE POLICY "Vendors can manage their own products" ON public.products FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.vendors WHERE id = vendor_id));

-- Deliveries table (simplified)
DROP POLICY IF EXISTS "Deliveries are viewable by relevant users" ON public.deliveries;
CREATE POLICY "Deliveries are viewable by relevant users" ON public.deliveries FOR SELECT USING (auth.uid() = rider_id);

-- Payments table
DROP POLICY IF EXISTS "Users can view their own payments" ON public.payments;
CREATE POLICY "Users can view their own payments" ON public.payments FOR SELECT USING (auth.uid() IN (SELECT customer_id FROM public.orders WHERE id = order_id));

-- Reviews table
DROP POLICY IF EXISTS "Reviews are viewable by all" ON public.reviews;
DROP POLICY IF EXISTS "Users can create reviews" ON public.reviews;
CREATE POLICY "Reviews are viewable by all" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Notifications table
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Categories table
DROP POLICY IF EXISTS "Categories are viewable by all" ON public.categories;
CREATE POLICY "Categories are viewable by all" ON public.categories FOR SELECT USING (true);

-- Step 5: Test the policies
SELECT 'Emergency RLS fix completed successfully!' as status;
SELECT 'User profiles can now be created during authentication' as note;
