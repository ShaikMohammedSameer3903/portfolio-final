// Silent fetch wrapper that suppresses all errors
let backendHealthChecked = false;
let backendHealthy = false;

export async function silentFetch(path, options = {}) {
  // Quick health check on first request
  if (!backendHealthChecked) {
    backendHealthChecked = true;
    try {
      const healthCheck = await fetch('/health', { 
        method: 'GET',
        signal: AbortSignal.timeout(2000) 
      }).catch(() => null);
      backendHealthy = healthCheck && healthCheck.ok;
    } catch {
      backendHealthy = false;
    }
  }

  // If backend is not healthy, don't even try
  if (!backendHealthy) {
    return { ok: false, status: 0, data: {} };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const response = await fetch(path, {
      ...options,
      signal: controller.signal,
    }).catch(() => {
      backendHealthy = false;
      return { ok: false, status: 0 };
    });

    clearTimeout(timeoutId);

    if (!response || !response.ok) {
      if (response && response.status >= 500) {
        backendHealthy = false;
      }
      return { ok: false, status: response?.status || 0, data: {} };
    }

    const data = await response.json().catch(() => ({}));
    return { ok: true, status: response.status, data };
  } catch {
    backendHealthy = false;
    return { ok: false, status: 0, data: {} };
  }
}

