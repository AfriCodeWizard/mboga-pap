# Fix for All User Account Creation Issues (Customer, Vendor, Rider, Admin)

## Problem Summary
When trying to create any account (customer, vendor, rider, or admin), users get the error:
```
Error: Profile fetch error: {}
```

## Root Causes Identified
1. **Auth Callback URL Mismatch**: The signup page was using hardcoded production URLs instead of environment-aware URLs
2. **RLS Policy Issues**: Row Level Security policies were too restrictive, preventing users from reading their own profiles
3. **Profile Creation Failure**: The auth callback was not being triggered due to URL mismatch, so user profiles were never created

## Solutions Implemented

### 1. Fixed Auth Callback URLs
- **Before**: Hardcoded `https://mbogapap.vercel.app/auth/callback`
- **After**: Environment-aware URLs using `lib/auth-config.ts`
  - Development: `http://localhost:3000/auth/callback`
  - Production: `https://mbogapap.vercel.app/auth/callback`

### 2. Created Environment-Aware Configuration
```typescript
// lib/auth-config.ts
export const getAuthCallbackUrl = (role?: string) => {
  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/auth/callback'
    : 'https://mbogapap.vercel.app/auth/callback'
  return role ? `${baseUrl}?role=${role}` : baseUrl
}
```

### 3. Fixed RLS Policies for ALL User Types
The database RLS policies were preventing users from reading their own profiles. This fix covers:
- **Customers**: Can access cart items, orders, payments, reviews, notifications
- **Vendors**: Can access products, orders, payments, reviews, notifications  
- **Riders**: Can access delivery information, notifications
- **Admins**: Can access all data (via service role)

Run this comprehensive SQL in your Supabase SQL Editor:

```sql
-- database/fix-rls-policies.sql
-- This fixes profile access for ALL user types
```

## Steps to Fix

### Step 1: Update Supabase Project Settings
1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Add these redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://mbogapap.vercel.app/auth/callback`

### Step 2: Run RLS Policy Fix
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy and paste the contents of `database/fix-rls-policies.sql`
3. Run the script

### Step 3: Test the Fix
1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/signup`
3. Test account creation for ALL user types:
   - **Customer account**: Should work and redirect to customer dashboard
   - **Vendor account**: Should work and redirect to vendor dashboard  
   - **Rider account**: Should work and redirect to rider dashboard
   - **Admin account**: Should work and redirect to admin dashboard
4. Check your email and click the confirmation link
5. Try logging in with each account type to ensure profile access works

## What Was Fixed

### ✅ Signup Flow (ALL User Types)
- Auth callback URLs now work in both development and production
- Role parameter is properly passed to the auth callback
- User profiles are created during email confirmation for customers, vendors, riders, and admins

### ✅ Login Flow (ALL User Types)
- All users can now read their own profiles
- Role-based routing works correctly for all user types
- No more "Profile fetch error: {}" for any user type

### ✅ RLS Policies (Comprehensive Coverage)
- **Customers**: Can access cart items, orders, payments, reviews, notifications
- **Vendors**: Can access products, orders, payments, reviews, notifications
- **Riders**: Can access delivery information, notifications
- **Admins**: Can access all data (via service role)
- Auth callback can create profiles for all user types
- Proper security maintained for all tables

## Verification

After applying the fixes, run:
```bash
npm run verify-setup
```

This should show all checks passing, including authentication system accessibility.

## Next Steps

1. **Test Account Creation**: Create accounts for ALL user types to verify the fix
2. **Test Login**: Login with each account type to ensure profile access works
3. **Test Role Routing**: Verify each user type is redirected to the appropriate dashboard
4. **Test Data Access**: Ensure each user type can access their relevant data
5. **Monitor Logs**: Check browser console and Supabase logs for any remaining issues

## Troubleshooting

If you still encounter issues:

1. **Check Supabase Logs**: Look for auth callback errors in the Supabase dashboard
2. **Verify Environment Variables**: Ensure `.env.local` has correct Supabase credentials
3. **Clear Browser Cache**: Clear cookies and local storage
4. **Check Email Confirmation**: Ensure the confirmation email link works correctly

The fix addresses the core authentication flow issues and should resolve account creation problems for ALL user types (customer, vendor, rider, admin) completely.
