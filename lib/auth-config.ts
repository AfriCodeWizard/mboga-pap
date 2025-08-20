// Auth configuration for different environments
export const getAuthRedirectUrl = (path: string = '/auth/callback') => {
  // Check for production environment variables first
  const productionUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL
  
  // In production, use the production URL
  if (process.env.NODE_ENV === 'production' || productionUrl) {
    const baseUrl = productionUrl ? `https://${productionUrl}` : 'https://mbogapap.vercel.app'
    return `${baseUrl}${path}`
  }
  
  // In development, use localhost
  return `http://localhost:3000${path}`
}

export const getAuthCallbackUrl = (role?: string) => {
  const baseUrl = getAuthRedirectUrl('/auth/callback')
  return role ? `${baseUrl}?role=${role}` : baseUrl
}

export const getVerificationUrl = () => {
  return getAuthRedirectUrl('/auth/verify')
}

export const getLoginUrl = () => {
  return getAuthRedirectUrl('/login')
}

export const getSignupUrl = () => {
  return getAuthRedirectUrl('/signup')
}

// Helper function to get the correct base URL for email templates
export const getBaseUrl = () => {
  const productionUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL
  
  if (process.env.NODE_ENV === 'production' || productionUrl) {
    return productionUrl ? `https://${productionUrl}` : 'https://mbogapap.vercel.app'
  }
  
  return 'http://localhost:3000'
}

