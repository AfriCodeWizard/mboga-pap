import { config } from 'dotenv'
import path from 'path'

// Load environment variables from .env.local (development only)
if (process.env.NODE_ENV === 'development') {
  config({ path: path.join(process.cwd(), '.env.local') })
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Use the correct property name for Next.js 15
  serverExternalPackages: ['@supabase/supabase-js'],
  // Ensure environment variables are available at build time
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },
}

export default nextConfig
