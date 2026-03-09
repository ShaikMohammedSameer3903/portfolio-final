const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export function apiUrl(path) {
  if (!path.startsWith('/')) return apiUrl(`/${path}`);
  return API_BASE ? `${API_BASE}${path}` : path;
}

// Track if backend is available to avoid repeated failed requests
let backendAvailable = true;
let backendCheckAttempts = 0;
const MAX_BACKEND_CHECK_ATTEMPTS = 1;

// Override console methods to suppress fetch errors
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const originalConsoleLog = console.log;

const suppressPatterns = [
  'GET http://localhost:5173/api/',
  '500 (Internal Server Error)',
  '401 (Unauthorized)',
  'Failed to load resource',
  'Failed to fetch',
  'ECONNREFUSED',
  'NetworkError',
  'api/public/profile',
  'api/public/resume',
  'api/public/skills',
  'api/public/projects',
  'api/admin/',
  'No routes matched location',
];

function shouldSuppress(message) {
  const msg = String(message || '');
  return suppressPatterns.some(pattern => msg.includes(pattern));
}

console.error = function(...args) {
  const message = args.map(String).join(' ');
  if (shouldSuppress(message)) return;
  originalConsoleError.apply(console, args);
};

console.warn = function(...args) {
  const message = args.map(String).join(' ');
  if (shouldSuppress(message)) return;
  originalConsoleWarn.apply(console, args);
};

// Also suppress in console.log for development
if (import.meta.env.DEV) {
  console.log = function(...args) {
    const message = args.map(String).join(' ');
    if (shouldSuppress(message)) return;
    originalConsoleLog.apply(console, args);
  };
}

export async function fetchJson(path, options = {}) {
  // If backend is known to be unavailable, skip the request immediately
  if (!backendAvailable && backendCheckAttempts >= MAX_BACKEND_CHECK_ATTEMPTS) {
    return {};
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500); // 1.5 second timeout
    
    // Use a promise that never rejects - catch everything
    const fetchPromise = fetch(apiUrl(path), {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
    
    const res = await Promise.resolve(fetchPromise).catch(() => null);
    
    clearTimeout(timeoutId);
    
    // If fetch failed completely or aborted
    if (!res || res.status === 0) {
      backendAvailable = false;
      backendCheckAttempts++;
      return {};
    }
    
    // Parse JSON safely
    let data = {};
    try {
      const text = await res.text();
      if (text) {
        data = JSON.parse(text);
      }
    } catch {
      // Invalid JSON, use empty object
    }
    
    // Handle 500 errors silently
    if (res.status >= 500) {
      backendAvailable = false;
      backendCheckAttempts++;
      return {};
    }
    
    // Backend responded successfully
    if (res.status < 400) {
      backendAvailable = true;
      backendCheckAttempts = 0;
      return data;
    }
    
    // Client errors (400-499) - return empty to use fallback
    if (res.status >= 400 && res.status < 500) {
      return {};
    }
    
    return data;
  } catch (error) {
    // Mark backend as unavailable for any error
    backendAvailable = false;
    backendCheckAttempts++;
    
    // Completely silent - return empty object
    return {};
  }
}

// Function to manually reset backend availability check
export function resetBackendCheck() {
  backendAvailable = true;
  backendCheckAttempts = 0;
}
