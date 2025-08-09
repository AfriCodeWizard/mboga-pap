# Troubleshooting Deployment Issues

## Build Error: Failed to collect page data for /api/auth/register

This error typically occurs when the build process tries to access environment variables or external services that aren't available during build time.

### Quick Fixes

1. **Check Environment Variables**
   ```bash
   npm run check-env
   ```

2. **Use Safe Build Script**
   ```bash
   npm run build-safe
   ```

3. **Verify .env.local File**
   Make sure you have a `.env.local` file in your project root with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

### Common Issues

1. **Missing Environment Variables**
   - The build process can't access environment variables that aren't set
   - Solution: Ensure all required variables are in `.env.local`

2. **API Routes Executing During Build**
   - Next.js tries to pre-render API routes during build
   - Solution: Use dynamic imports and proper error handling

3. **Supabase Client Initialization**
   - Supabase client might be initialized with invalid credentials
   - Solution: Add fallback values and proper error handling

### Debugging Steps

1. **Check Health Endpoint**
   ```bash
   curl http://localhost:3000/api/health
   ```

2. **Verify Supabase Connection**
   ```bash
   curl http://localhost:3000/api/test-db
   ```

3. **Check Build Logs**
   ```bash
   npm run build 2>&1 | tee build.log
   ```

### Prevention

1. **Always use `npm run build-safe` for production builds**
2. **Keep environment variables up to date**
3. **Test API routes locally before building**
4. **Use proper error handling in API routes**

### Environment Variable Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Your Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Your Supabase service role key |

### Getting Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the Project URL and anon/public key
4. For service role key, use the `service_role` key (keep this secret!) 