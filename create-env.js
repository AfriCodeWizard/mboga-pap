const fs = require('fs');
const path = require('path');

const envContent = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ussydbxhxbeowqzcwfwx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzc3lkYnhoeGJlb3dxemN3Znd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNzQ0MTYsImV4cCI6MjA3MDc1MDQxNn0.2qbzfIWkRaF6rH4xJHvpl9KK_7MdSfcRN-8cUrzbQaw
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzc3lkYnhoeGJlb3dxemN3Znd4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTE3NDQxNiwiZXhwIjoyMDcwNzUwNDE2fQ.LkqR861TSpMHCojUScljhYpV6TnuUb7qTZLH7OE6ecA

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Cron Job Configuration
CRON_SECRET=mboga-pap-cron-2025

# Optional: External Services
# MPESA_API_KEY=your_mpesa_api_key_here
# MPESA_API_SECRET=your_mpesa_api_secret_here
# GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
`;

try {
  fs.writeFileSync('.env.local', envContent, 'utf8');
  console.log('✅ .env.local file created successfully!');
  console.log('File path:', path.resolve('.env.local'));
  console.log('File size:', fs.statSync('.env.local').size, 'bytes');
} catch (error) {
  console.error('❌ Error creating .env.local:', error.message);
}


