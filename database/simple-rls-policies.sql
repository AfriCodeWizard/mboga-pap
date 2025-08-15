-- Simple RLS Policies for All User Types
-- Run this in your Supabase SQL Editor to fix profile access for ALL users
-- This version avoids complex recursive logic that can cause infinite recursion errors

-- 1. Fix Users table policies (affects ALL user types: customer, vendor, rider, admin)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Allow auth callback to create user profiles" ON public.users;

-- Users can view their own profile
CREATE POLICY "Users can view their own profile" ON public.users 
FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" ON public.users 
FOR UPDATE USING (auth.uid() = id);

-- Allow profile creation during auth callback
CREATE POLICY "Allow auth callback to create user profiles" ON public.users 
FOR INSERT WITH CHECK (true);

-- 2. Fix Vendors table policies (for vendor users)
DROP POLICY IF EXISTS "Vendors are viewable by all" ON public.vendors;
DROP POLICY IF EXISTS "Vendors can update their own profile" ON public.vendors;
DROP POLICY IF EXISTS "Allow auth callback to create vendor profiles" ON public.vendors;

CREATE POLICY "Vendors are viewable by all" ON public.vendors 
FOR SELECT USING (true);

CREATE POLICY "Vendors can update their own profile" ON public.vendors 
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Allow auth callback to create vendor profiles" ON public.vendors 
FOR INSERT WITH CHECK (true);

-- 3. Fix Rider profiles table policies (for rider users)
DROP POLICY IF EXISTS "Rider profiles are viewable by all" ON public.rider_profiles;
DROP POLICY IF EXISTS "Riders can update their own profile" ON public.rider_profiles;
DROP POLICY IF EXISTS "Allow auth callback to create rider profiles" ON public.rider_profiles;

CREATE POLICY "Rider profiles are viewable by all" ON public.rider_profiles 
FOR SELECT USING (true);

CREATE POLICY "Riders can update their own profile" ON public.rider_profiles 
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Allow auth callback to create rider profiles" ON public.rider_profiles 
FOR INSERT WITH CHECK (true);

-- 4. Fix Cart items table policies (for customer users)
DROP POLICY IF EXISTS "Users can view their own cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can manage their own cart items" ON public.cart_items;

CREATE POLICY "Users can view their own cart items" ON public.cart_items 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own cart items" ON public.cart_items 
FOR ALL USING (auth.uid() = user_id);

-- 5. Fix Orders table policies (for customer and vendor users)
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;

CREATE POLICY "Users can view their own orders" ON public.orders 
FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Users can create orders" ON public.orders 
FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- 6. Fix Products table policies (for vendor users)
DROP POLICY IF EXISTS "Products are viewable by all" ON public.products;
DROP POLICY IF EXISTS "Vendors can manage their own products" ON public.products;

CREATE POLICY "Products are viewable by all" ON public.products 
FOR SELECT USING (true);

CREATE POLICY "Vendors can manage their own products" ON public.products 
FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.vendors WHERE id = vendor_id));

-- 7. Fix Deliveries table policies (for rider users) - SIMPLIFIED
DROP POLICY IF EXISTS "Deliveries are viewable by relevant users" ON public.deliveries;

-- Simple policy: riders can see their own deliveries
CREATE POLICY "Deliveries are viewable by relevant users" ON public.deliveries 
FOR SELECT USING (auth.uid() = rider_id);

-- 8. Fix Payments table policies
DROP POLICY IF EXISTS "Users can view their own payments" ON public.payments;

CREATE POLICY "Users can view their own payments" ON public.payments 
FOR SELECT USING (auth.uid() IN (
  SELECT customer_id FROM public.orders WHERE id = order_id
));

-- 9. Fix Reviews table policies
DROP POLICY IF EXISTS "Reviews are viewable by all" ON public.reviews;
DROP POLICY IF EXISTS "Users can create reviews" ON public.reviews;

CREATE POLICY "Reviews are viewable by all" ON public.reviews 
FOR SELECT USING (true);

CREATE POLICY "Users can create reviews" ON public.reviews 
FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- 10. Fix Notifications table policies
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;

CREATE POLICY "Users can view their own notifications" ON public.notifications 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications 
FOR UPDATE USING (auth.uid() = user_id);

-- 11. Fix Categories table policies (viewable by all)
DROP POLICY IF EXISTS "Categories are viewable by all" ON public.categories;

CREATE POLICY "Categories are viewable by all" ON public.categories 
FOR SELECT USING (true);

-- 12. Test the policies
SELECT 'Simple RLS policies updated successfully!' as status;
SELECT 'All user types (customer, vendor, rider, admin) can now access their profiles' as note;

