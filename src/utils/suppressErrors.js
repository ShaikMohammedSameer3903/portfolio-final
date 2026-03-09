// Global error suppression for network/fetch errors
if (typeof window !== 'undefined') {
  // Suppress unhandled promise rejections from fetch
  window.addEventListener('unhandledrejection', (event) => {
    const reason = String(event.reason || '')
    if (
      reason.includes('Failed to fetch') ||
      reason.includes('NetworkError') ||
      reason.includes('500') ||
      reason.includes('api/public/')
    ) {
      event.preventDefault()
      return false
    }
  })

  // Suppress console errors for network issues
  const originalConsoleError = console.error
  const originalConsoleWarn = console.warn

  const suppressPatterns = [
    'Failed to load resource',
    '500 (Internal Server Error)',
    '401 (Unauthorized)',
    'GET http://localhost:5173/api/',
    'api/public/profile',
    'api/public/resume',
    'api/public/skills',
    'api/public/projects',
    'api/admin/',
    'Failed to fetch',
    'ECONNREFUSED',
    'NetworkError',
    'No routes matched location',
  ]

  function shouldSuppress(args) {
    const message = args.map(String).join(' ')
    return suppressPatterns.some(pattern => message.includes(pattern))
  }

  console.error = function(...args) {
    if (shouldSuppress(args)) return
    originalConsoleError.apply(console, args)
  }

  console.warn = function(...args) {
    if (shouldSuppress(args)) return
    originalConsoleWarn.apply(console, args)
  }
}

export {}

