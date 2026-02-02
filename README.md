# PiConnect Desktop

Cross-platform desktop client for Raspberry Pi Connect.

## Features (MVP)
- 🔐 Sign in to Raspberry Pi Connect (https://connect.raspberrypi.com)
- 📱 List connected devices
- 🖥️ Open SSH sessions (system terminal)
- 📺 Screen sharing / VNC
- 📁 File transfer (SFTP)

## Tech Stack
- **Frontend:** TypeScript + Vite
- **Backend:** Tauri v2 (Rust)
- **Platforms:** Linux, macOS, Windows

## Architecture
Clean architecture with domain-driven design:
- `src/domain/` - Core business logic (device models, auth)
- `src/adapters/` - External integrations (Pi Connect API, webview auth)
- `src/ui/` - User interface components
- `src-tauri/` - Rust backend (Tauri commands, system integration)

## Development

### Prerequisites
- Node.js 18+
- Rust 1.70+
- Linux: WebKitGTK, GTK3, libayatana-appindicator3, etc. (see Tauri docs)

### Setup
```bash
npm install
cargo build --manifest-path=src-tauri/Cargo.toml
```

### Run
```bash
npm run tauri dev
```

### Build
```bash
npm run tauri build
```

### Test
```bash
npm test                    # Frontend tests
cargo test --manifest-path=src-tauri/Cargo.toml  # Backend tests
```

## Pi Connect API
The Raspberry Pi Connect API is not publicly documented. This app uses:
- Webview-based login to capture session cookies/tokens
- Reverse-engineered endpoints (discovered via browser DevTools)
- See `docs/api.md` for endpoint documentation

## Project Status
- [x] Tauri scaffold
- [ ] Domain models (Device, Session, Auth)
- [ ] Webview auth adapter
- [ ] Device list UI
- [ ] SSH integration
- [ ] VNC integration
- [ ] SFTP integration
- [ ] Tests (unit + integration)
- [ ] CI/CD

## Contributing
This is currently a personal project for Cooper's use. PRs welcome once MVP is stable.

## License
MIT (TBD)
