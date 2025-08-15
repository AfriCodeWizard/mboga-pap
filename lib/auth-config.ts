// Auth configuration for different environments
export const getAuthRedirectUrl = (path: string = '/auth/callback') => {
  // In development, use localhost
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:3000${path}`
  }
  
  // In production, use the production URL
  return `https://mbogapap.vercel.app${path}`
}

export const getAuthCallbackUrl = (role?: string) => {
  const baseUrl = getAuthRedirectUrl('/auth/callback')
  return role ? `${baseUrl}?role=${role}` : baseUrl
}

