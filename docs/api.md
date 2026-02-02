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
1. Open https://connect.raspberrypi.com in browser
2. Open DevTools Network tab
3. Log in and interact with the UI
4. Observe API calls (XHR/Fetch requests)
5. Document endpoints, headers, request/response formats
6. Test discovered endpoints with curl/Postman
7. Implement in WebviewPiConnectAdapter

## Notes
- The web interface may use WebSocket for real-time updates
- Session management may involve refresh tokens
- CORS may require cookie-based auth instead of Bearer tokens
