/**
 * API Discovery Helper
 * 
 * Use this in browser DevTools console at https://connect.raspberrypi.com
 * to intercept and log API calls for documentation
 * 
 * Usage:
 * 1. Open connect.raspberrypi.com in browser
 * 2. Open DevTools console
 * 3. Paste and run: await import('./ApiDiscovery.js').then(m => m.startApiDiscovery())
 * 4. Interact with the UI (login, list devices, connect, etc.)
 * 5. Check console for logged API calls
 * 6. Run: getDiscoveredEndpoints() to see summary
 */

interface ApiCall {
  timestamp: Date;
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: any;
  response?: any;
  status?: number;
}

const discoveredCalls: ApiCall[] = [];

/**
 * Intercept fetch calls to log API interactions
 */
export function startApiDiscovery() {
  const originalFetch = window.fetch;
  
  window.fetch = async (...args) => {
    const [resource, options] = args;
    const url = typeof resource === 'string' ? resource : resource.url;
    const method = options?.method || 'GET';
    
    const call: ApiCall = {
      timestamp: new Date(),
      method,
      url,
      headers: options?.headers as Record<string, string> || {},
      body: options?.body,
    };
    
    console.log(`[API Discovery] ${method} ${url}`, {
      headers: call.headers,
      body: call.body,
    });
    
    try {
      const response = await originalFetch(...args);
      const clonedResponse = response.clone();
      
      call.status = response.status;
      
      try {
        call.response = await clonedResponse.json();
      } catch {
        call.response = await clonedResponse.text();
      }
      
      console.log(`[API Discovery] Response ${response.status}`, call.response);
      
      discoveredCalls.push(call);
      return response;
    } catch (error) {
      console.error(`[API Discovery] Error`, error);
      throw error;
    }
  };
  
  console.log('[API Discovery] Started! All fetch calls will be logged.');
  console.log('Run getDiscoveredEndpoints() to see summary');
}

/**
 * Get summary of discovered API endpoints
 */
export function getDiscoveredEndpoints() {
  const summary: Record<string, { method: string; example: ApiCall }> = {};
  
  discoveredCalls.forEach(call => {
    const key = `${call.method} ${call.url}`;
    if (!summary[key]) {
      summary[key] = {
        method: call.method,
        example: call,
      };
    }
  });
  
  console.log('=== Discovered API Endpoints ===');
  Object.entries(summary).forEach(([key, { method, example }]) => {
    console.log(`\n${method} ${example.url}`);
    console.log('  Headers:', example.headers);
    if (example.body) console.log('  Body:', example.body);
    console.log('  Status:', example.status);
    console.log('  Response:', example.response);
  });
  
  return summary;
}

/**
 * Export discovered calls as JSON for documentation
 */
export function exportDiscovery() {
  const data = {
    discoveredAt: new Date().toISOString(),
    calls: discoveredCalls,
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'piconnect-api-discovery.json';
  a.click();
  URL.revokeObjectURL(url);
  
  console.log('API discovery exported!');
}

// Make functions available globally for console use
if (typeof window !== 'undefined') {
  (window as any).startApiDiscovery = startApiDiscovery;
  (window as any).getDiscoveredEndpoints = getDiscoveredEndpoints;
  (window as any).exportDiscovery = exportDiscovery;
}
