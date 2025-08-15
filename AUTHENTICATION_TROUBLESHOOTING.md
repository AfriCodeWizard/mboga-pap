# Authentication Troubleshooting Guide

## Current Issues Identified

1. **Email verification not being sent**
2. **User records not being created in database**
3. **"Wrong credentials" error after signup**

## Step-by-Step Fix Process

### Step 1: Verify Supabase Project Configuration

1. **Go to your Supabase Dashboard** (https://supabase.com/dashboard)
2. **Select your project**
3. **Go to Authentication > Settings**
4. **Check the following:**

   - **Site URL**: Should be `http://localhost:3000` (for development)
   - **Redirect URLs**: Should include `http://localhost:3000/auth/callback`
   - **Email Templates**: Ensure email confirmation is enabled
   - **SMTP Settings**: Check if SMTP is configured (optional but recommended)

### Step 2: Run Database Schema Setup

1. **Go to SQL Editor in Supabase Dashboard**
2. **Run the `database/ensure-schema.sql` script**
3. **This will create all necessary tables and policies**

### Step 3: Test Database Connection

1. **Run the `database/test-connection.sql` script**
2. **Check if all tables exist and are accessible**
3. **Verify RLS policies are in place**

### Step 4: Check Environment Variables

Ensure your `.env.local` file contains:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xdjyshmyeivebsrmrayj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkanlzaG15ZWl2ZWJzcm1yYXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMDQ2NzAsImV4cCI6MjA2OTg4MDY3MH0.B8qmQTcGKO3F3-BB19V36cTT6HUllN4S6LLaE7KbtCk
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkanlzaG15ZWl2ZWJzcm1yYXlqIiwicnNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDMwNDY3MCwiZXhwIjoyMDY5ODgwNjcwfQ.dbqMB49qQmYFuXhCWts89rUFmkahX0-FeZ26R-YYz6U
```

### Step 5: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

### Step 6: Test the Signup Flow

1. **Open browser console** (F12)
2. **Try to sign up with a new email**
3. **Check console logs for any errors**
4. **Check network tab for failed requests**

## Common Issues and Solutions

### Issue 1: "Email verification not sent"

**Possible Causes:**
- Supabase email service not configured
- SMTP settings missing
- Email templates disabled

**Solutions:**
1. Check Supabase Authentication > Settings > Email Templates
2. Enable "Confirm signup" email template
3. Configure SMTP if needed (optional)

### Issue 2: "User record not created"

**Possible Causes:**
- Database tables don't exist
- RLS policies blocking inserts
- Foreign key constraint violations

**Solutions:**
1. Run the `ensure-schema.sql` script
2. Check RLS policies are correct
3. Verify table structure

### Issue 3: "Wrong credentials error"

**Possible Causes:**
- User profile not created in `public.users` table
- Auth callback failed
- Database connection issues

**Solutions:**
1. Check if user exists in `auth.users` (Supabase internal)
2. Check if user profile exists in `public.users`
3. Run the test connection script

## Debugging Steps

### Check Console Logs

Look for these messages in the browser console:
- `"Starting signup process for role: ..."`
- `"Signup successful, user created: ..."`
- Any error messages

### Check Network Tab

Look for:
- Failed requests to Supabase
- Error responses from auth endpoints
- Database operation failures

### Check Supabase Dashboard

1. **Authentication > Users**: See if users are being created
2. **Table Editor**: Check if records exist in `public.users`
3. **Logs**: Check for any error messages

## Testing the Fix

After applying all fixes:

1. **Clear browser cache and cookies**
2. **Try signing up with a new email**
3. **Check if verification email is received**
4. **Click the verification link**
5. **Try signing in**
6. **Check if user profile was created**

## If Issues Persist

1. **Check Supabase project status** (https://status.supabase.com)
2. **Verify your project is not in maintenance mode**
3. **Check if you've hit any rate limits**
4. **Contact Supabase support if needed**

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
