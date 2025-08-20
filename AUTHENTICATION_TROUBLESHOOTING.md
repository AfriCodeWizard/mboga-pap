# Authentication Troubleshooting Guide

## Overview
This guide helps you troubleshoot common authentication issues in the Mboga Pap application.

## Quick Fixes

### 1. Email Verification Link Infinite Loading

**Problem**: User clicks email verification link but page loads indefinitely.

**Solutions**:
- ✅ **Fixed**: Updated auth callback route with better error handling
- ✅ **Fixed**: Added proper session management
- ✅ **Fixed**: Improved redirect logic

**Manual Check**:
1. Check browser console for errors
2. Verify Supabase environment variables are set
3. Ensure auth callback URL is correct in Supabase settings

### 2. Login Page Getting Stuck

**Problem**: User tries to login but gets stuck on login page.

**Solutions**:
- ✅ **Fixed**: Simplified login logic
- ✅ **Fixed**: Better error handling
- ✅ **Fixed**: Improved redirect mechanism

**Manual Check**:
1. Check if user profile exists in database
2. Verify user role is correctly set
3. Check browser console for authentication errors

### 3. User Profile Creation Issues

**Problem**: Users are created but profiles are not properly set up.

**Solutions**:
- ✅ **Fixed**: Enhanced auth callback to create profiles properly
- ✅ **Fixed**: Added role-specific profile creation
- ✅ **Fixed**: Better error handling for profile creation

**Manual Check**:
1. Check `users` table for user records
2. Verify role-specific tables (`customers`, `vendors`, `rider_profiles`)
3. Ensure user metadata contains role information

### 4. Logout Not Working

**Problem**: Users can't log out properly.

**Solutions**:
- ✅ **Fixed**: Created logout API route
- ✅ **Fixed**: Enhanced navbar logout function
- ✅ **Fixed**: Added cookie cleanup

**Manual Check**:
1. Test logout button functionality
2. Verify session is cleared
3. Check if user is redirected to home page

## Environment Variables

### Required Variables
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Optional Variables
```bash
NEXT_PUBLIC_APP_URL=your_app_url
CRON_SECRET=your_cron_secret
```

## Supabase Configuration

### 1. Auth Settings
- **Site URL**: `http://localhost:3000` (dev) or `https://mbogapap.vercel.app` (prod)
- **Redirect URLs**: 
  - `http://localhost:3000/auth/callback`
  - `https://mbogapap.vercel.app/auth/callback`
- **Email Confirmation**: Must be enabled

### 2. Email Templates
Configure email templates in Supabase Auth settings:
- **Confirmation Email**: Should include verification link
- **Reset Password**: Should include reset link

### 3. Database Tables
Ensure these tables exist with correct schemas:
- `users` - Main user profiles
- `customers` - Customer-specific data
- `vendors` - Vendor-specific data
- `rider_profiles` - Rider-specific data

## Testing Commands

### Run Comprehensive Test
```bash
node scripts/test-auth-complete.js
```

### Run Basic Test
```bash
node scripts/test-auth-flow.js
```

### Check Environment
```bash
npm run check-env
```

## Common Error Messages

### "Supabase client not available"
**Solution**: Check environment variables in `.env.local`

### "Email not confirmed"
**Solution**: User needs to click email verification link

### "Invalid login credentials"
**Solution**: Check email/password or verify account exists

### "Profile creation failed"
**Solution**: Check database permissions and table schemas

### "Session exchange error"
**Solution**: Check auth callback URL configuration

## Manual Testing Steps

### 1. Test Signup Flow
1. Go to `/signup`
2. Select a role (customer/vendor/rider)
3. Fill in registration form
4. Submit and check for success message
5. Check email for verification link

### 2. Test Email Verification
1. Click verification link in email
2. Should redirect to appropriate dashboard
3. Check if user profile is created in database

### 3. Test Login Flow
1. Go to `/login`
2. Enter credentials
3. Should redirect to appropriate dashboard
4. Check if session is maintained

### 4. Test Logout Flow
1. Click logout button
2. Should clear session and redirect to home
3. Try accessing protected routes (should redirect to login)

### 5. Test Demo Users
Use these demo credentials:
- Customer: `customer@demo.com` / `demo123`
- Vendor: `vendor@demo.com` / `demo123`
- Rider: `rider@demo.com` / `demo123`
- Admin: `admin@demo.com` / `demo123`

## Debug Mode

### Enable Debug Logging
Add to your `.env.local`:
```bash
DEBUG=true
```

### Check Browser Console
Look for these log messages:
- `🔐 Auth callback triggered`
- `✅ Session created successfully`
- `🆕 Creating new user profile`
- `🔄 Redirecting to dashboard`

### Check Network Tab
Monitor these requests:
- `/auth/callback` - Email verification
- `/api/auth/logout` - Logout process
- Supabase auth endpoints

## Database Schema Issues

### Check Table Structure
```sql
-- Check users table
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users';

-- Check if user exists
SELECT * FROM users WHERE email = 'user@example.com';

-- Check role-specific tables
SELECT * FROM customers WHERE user_id = 'user_id';
SELECT * FROM vendors WHERE user_id = 'user_id';
SELECT * FROM rider_profiles WHERE user_id = 'user_id';
```

### Common Schema Issues
1. **Missing columns**: Ensure all required columns exist
2. **Wrong data types**: Check column types match expected values
3. **Foreign key constraints**: Verify relationships are correct
4. **Permissions**: Ensure RLS policies allow necessary operations

## Performance Issues

### Slow Authentication
1. Check Supabase connection
2. Monitor database query performance
3. Verify environment variables are loaded quickly

### Memory Leaks
1. Check for unclosed Supabase connections
2. Monitor session cleanup
3. Verify proper component unmounting

## Security Considerations

### Environment Variables
- Never commit `.env.local` to version control
- Use different keys for development and production
- Rotate keys regularly

### Session Management
- Sessions expire automatically
- Logout clears all session data
- Demo users have limited session duration

### Data Protection
- User passwords are hashed by Supabase
- Sensitive data is encrypted
- RLS policies protect user data

## Getting Help

### Check Logs
1. Browser console for client-side errors
2. Network tab for request/response issues
3. Supabase dashboard for server-side logs

### Common Resources
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)

### Support
If issues persist:
1. Run the comprehensive test script
2. Check this troubleshooting guide
3. Review Supabase dashboard settings
4. Check environment variables
5. Verify database schema

## Recent Fixes Applied

### ✅ Auth Callback Route
- Improved error handling
- Better session management
- Enhanced profile creation
- Fixed redirect logic

### ✅ Login Page
- Simplified authentication flow
- Better error messages
- Improved redirect handling
- Enhanced profile creation for new users

### ✅ Signup Page
- Added role-specific metadata
- Better email confirmation handling
- Improved error messages
- Fixed redirect logic

### ✅ Logout Functionality
- Created dedicated logout API
- Enhanced navbar logout
- Added cookie cleanup
- Improved session management

### ✅ Verification Page
- Created dedicated verification page
- Better user experience
- Proper error handling
- Success state management

All authentication issues should now be resolved. If you encounter any problems, follow this troubleshooting guide or run the test scripts to identify the issue.
