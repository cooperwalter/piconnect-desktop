# Raspberry Pi Connect API

## Overview
The Raspberry Pi Connect API is **not publicly documented**. These endpoints were discovered via browser DevTools while using the web interface at https://connect.raspberrypi.com.

## Authentication
**TODO:** Discover auth mechanism
- Session cookies?
- Bearer token?
- OAuth flow?

## Endpoints (To Be Discovered)

### User Info
```
GET /api/user (?)
Authorization: Bearer <token>
```

### List Devices
```
GET /api/devices (?)
Authorization: Bearer <token>
```

### Device Details
```
GET /api/devices/:id (?)
Authorization: Bearer <token>
```

### SSH Session
```
POST /api/devices/:id/ssh (?)
Authorization: Bearer <token>
```

### VNC Session
```
POST /api/devices/:id/vnc (?)
Authorization: Bearer <token>
```

### SFTP Session
```
POST /api/devices/:id/sftp (?)
Authorization: Bearer <token>
```

## Discovery Process

### Method 1: Manual Network Tab Inspection
1. Open https://connect.raspberrypi.com in browser
2. Open DevTools Network tab
3. Log in and interact with the UI
4. Observe API calls (XHR/Fetch requests)
5. Document endpoints, headers, request/response formats
6. Test discovered endpoints with curl/Postman
7. Implement in WebviewPiConnectAdapter

### Method 2: Automated Discovery Tool (Recommended)
We've built an API discovery helper that intercepts fetch calls:

1. Open https://connect.raspberrypi.com in browser
2. Open DevTools console
3. Build the project in dev mode:
   ```bash
   npm run dev
   ```
4. In the console, paste:
   ```javascript
   // Load and start the discovery tool
   await import('http://localhost:5173/src/adapters/piconnect/ApiDiscovery.ts')
     .then(m => m.startApiDiscovery());
   ```
5. Interact with Pi Connect (login, list devices, connect, etc.)
6. All API calls will be logged automatically
7. View summary:
   ```javascript
   getDiscoveredEndpoints()
   ```
8. Export to file:
   ```javascript
   exportDiscovery()
   ```

The discovery tool captures:
- Request method, URL, headers, body
- Response status, headers, body
- Timestamp for each call

This makes it easy to document all endpoints and implement the adapter.

## Notes
- The web interface may use WebSocket for real-time updates
- Session management may involve refresh tokens
- CORS may require cookie-based auth instead of Bearer tokens
