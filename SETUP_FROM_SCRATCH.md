# Complete Setup Guide - Starting from Scratch

## Overview
This guide will help you recreate your entire Supabase backend from scratch after deleting the existing instance.

## Prerequisites
- Node.js 18+ installed
- Git repository cloned
- Basic understanding of Supabase

## Step 1: Create New Supabase Project

### 1.1 Go to Supabase Dashboard
1. Visit [supabase.com](https://supabase.com)
2. Sign in with your account
3. Click "New Project"

### 1.2 Project Configuration
- **Organization**: Select your organization
- **Name**: `mboga-pap` (or your preferred name)
- **Database Password**: Create a strong password (save this!)
- **Region**: Choose closest to your users (e.g., `us-east-1` for US)
- **Pricing Plan**: Free tier is sufficient for development

### 1.3 Wait for Setup
- Project creation takes 2-5 minutes
- You'll receive an email when ready

## Step 2: Get Project Credentials

### 2.1 Access Project Settings
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://abcdefghijklmnop.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...`)

### 2.2 Create Environment File
Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your_new_project_url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_new_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_new_service_role_key_here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Cron Job Configuration
CRON_SECRET=mboga-pap-cron-2025

# Optional: External Services
# MPESA_API_KEY=your_mpesa_api_key_here
# MPESA_API_SECRET=your_mpesa_api_secret_here
# GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

## Step 3: Set Up Database Schema

### 3.1 Access SQL Editor
1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**

### 3.2 Run Complete Setup Script
1. Copy the entire content of `database/complete-setup.sql`
2. Paste into the SQL Editor
3. Click **Run** button
4. Wait for completion (should take 1-2 minutes)

### 3.3 Verify Setup
You should see:
- `Complete database setup completed successfully!`
- `categories_count: 10`
- `Database is ready for authentication and data!`

## Step 4: Configure Authentication

### 4.1 Auth Settings
1. Go to **Authentication** → **Settings**
2. Configure these settings:

**Site URL**: `http://localhost:3000` (for development)

**Redirect URLs** (add these):
```
http://localhost:3000/auth/callback
http://localhost:3000/dashboard
http://localhost:3000/vendor-dashboard
http://localhost:3000/rider-dashboard
```

### 4.2 Email Templates (Optional)
1. Go to **Authentication** → **Email Templates**
2. Customize confirmation and reset emails
3. Update branding and content

### 4.3 OAuth Providers (Optional)
1. Go to **Authentication** → **Providers**
2. Enable Google, GitHub, or other providers
3. Add redirect URLs for each provider

## Step 5: Test Your Setup

### 5.1 Start Development Server
```bash
npm run dev
```

### 5.2 Test Environment Variables
Visit: `http://localhost:3000/api/test-env`
Should show all environment variables as "SET"

### 5.3 Test Database Connection
Visit: `http://localhost:3000/api/test-db`
Should show successful database connection

### 5.4 Test Authentication Flow
1. Go to `/signup`
2. Create a test account
3. Verify email confirmation works
4. Test login and dashboard access

## Step 6: Production Deployment

### 6.1 Update Environment Variables
When deploying to production, update `.env.local`:

```bash
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 6.2 Update Supabase Settings
1. **Site URL**: `https://your-domain.com`
2. **Redirect URLs**: Update with production URLs
3. **CORS Origins**: Add your production domain

### 6.3 Deploy
```bash
npm run build
# Deploy to your hosting platform (Vercel, Netlify, etc.)
```

## Troubleshooting

### Common Issues

#### 1. "Supabase client not available"
- Check `.env.local` file exists
- Verify environment variable names are correct
- Restart development server completely

#### 2. "Missing environment variables in middleware"
- Ensure `.env.local` is in project root
- Check variable names match exactly
- Restart development server

#### 3. "Database connection failed"
- Verify Supabase project is active
- Check service role key is correct
- Ensure database schema was created

#### 4. "Authentication callback errors"
- Check redirect URLs in Supabase settings
- Verify role parameter is being passed
- Check browser console for errors

### Debug Commands

```bash
# Check environment variables
npm run check-env

# Test build process
npm run build-safe

# Check database health
curl http://localhost:3000/api/health
```

## Verification Checklist

- [ ] New Supabase project created
- [ ] Environment variables configured
- [ ] Database schema created successfully
- [ ] Authentication settings configured
- [ ] Redirect URLs set correctly
- [ ] Development server starts without errors
- [ ] Environment variables are loaded
- [ ] Database connection works
- [ ] User registration works
- [ ] Email confirmation works
- [ ] Login and dashboard access works
- [ ] Role-based routing works

## Next Steps

After completing this setup:

1. **Test all user flows** (customer, vendor, rider)
2. **Add sample data** for testing
3. **Configure email templates** for production
4. **Set up monitoring** and logging
5. **Test OAuth providers** if enabled
6. **Deploy to production** when ready

## Support

If you encounter issues:

1. Check the browser console for errors
2. Verify Supabase dashboard logs
3. Check environment variable loading
4. Ensure database schema is complete
5. Verify authentication settings

Your backend should now be fully functional with proper authentication, database schema, and all the features described in your documentation!
