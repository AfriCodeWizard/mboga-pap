# Authentication Setup Guide

## Issues Fixed

1. **Demo Account Override**: Removed hardcoded demo credentials that were overriding real authentication
2. **Role Parameter Missing**: Fixed OAuth and email confirmation URLs to properly pass the role parameter
3. **Auth Callback Logic**: Fixed profile creation order and variable scoping issues
4. **Session Management**: Added proper middleware for authentication state management

## Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xdjyshmyeivebsrmrayj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkanlzaG15ZWl2ZWJzcm1yYXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMDQ2NzAsImV4cCI6MjA2OTg4MDY3MH0.B8qmQTcGKO3F3-BB19V36cTT6HUllN4S6LLaE7KbtCk
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkanlzaG15ZWl2ZWJzcm1yYXlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDMwNDY3MCwiZXhwIjoyMDY5ODgwNjcwfQ.dbqMB49qQmYFuXhCWts89rUFmkahX0-FeZ26R-YYz6U
```

## Supabase Project Settings

1. **Site URL**: Set to `https://mbogapap.vercel.app`
2. **Redirect URLs**: Add the following:
   - `https://mbogapap.vercel.app/auth/callback`
   - `https://mbogapap.vercel.app/dashboard`
   - `https://mbogapap.vercel.app/vendor-dashboard`
   - `https://mbogapap.vercel.app/rider-dashboard`

## Database Setup

Run these SQL scripts in your Supabase SQL Editor:

### 1. Check Tables (`database/check-tables.sql`)
```sql
-- This script checks if core tables exist and creates them if not
-- Run this first to ensure your database structure is correct
```

### 2. Test Connection (`database/test-connection.sql`)
```sql
-- This script tests your database connection and RLS policies
-- Run this to verify everything is working
```

## Testing the Fix

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Create a new vendor account**:
   - Go to `/signup`
   - Select "Vendor" role
   - Fill in the form
   - Check your email for confirmation link

3. **Click the confirmation link**:
   - Should redirect to `/vendor-dashboard`
   - Check browser console for any errors
   - Verify user and vendor profiles are created in Supabase

4. **Test OAuth signup**:
   - Try signing up with Google/GitHub
   - Should redirect to auth callback with role parameter
   - Should create proper profiles

## Troubleshooting

### Still getting "Supabase client not available"?
- Check that `.env.local` file exists and has correct values
- Restart your development server
- Check browser console for environment variable loading

### Getting "either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables or supabaseUrl and supabaseKey are required!"?
- This error occurs when the middleware can't access environment variables
- Ensure you have created the `.env.local` file with the exact values shown above
- **Completely restart your development server** (stop it completely, then run `npm run dev` again)
- The middleware now has better error handling and will skip authentication if variables are missing

### Profile creation still failing?
- Run the database setup scripts in Supabase
- Check RLS policies are correctly set
- Verify the auth callback route is accessible

### OAuth redirects not working?
- Check Supabase project settings for correct redirect URLs
- Ensure the role parameter is being passed in the OAuth flow
- Check browser console for any redirect errors

## Key Changes Made

1. **`app/login/page.tsx`**: Implemented proper Supabase authentication with demo fallback
2. **`app/auth/callback/route.ts`**: Fixed profile creation logic and role handling
3. **`app/signup/page.tsx`**: Fixed redirect URLs to include role parameter
4. **`lib/supabase.ts`**: Removed hardcoded redirectTo to prevent conflicts
5. **`lib/env.ts`**: Improved environment variable loading with fallbacks
6. **`middleware.ts`**: Added authentication middleware for proper route protection with improved environment variable handling
7. **`lib/env.ts`**: Added server-side environment variable loaders for middleware compatibility

## Next Steps

After setting up the environment variables and running the database scripts:

1. Test account creation with email confirmation
2. Test OAuth signup with Google/GitHub
3. Verify profiles are created in the database
4. Test login and dashboard access for different roles

If you encounter any issues, check the browser console and Supabase logs for detailed error messages.
