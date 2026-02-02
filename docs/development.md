# Development Guide

## Prerequisites

### System Dependencies
#### Linux (Debian/Ubuntu)
```bash
sudo apt update
sudo apt install -y \
  libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev \
  libgtk-3-dev
```

#### macOS
```bash
# Install Xcode Command Line Tools
xcode-select --install
```

#### Windows
- Install Visual Studio 2022 with C++ build tools
- Install WebView2 runtime (usually pre-installed on Windows 11)

### Node.js & Rust
- Node.js 18+ (recommend using nvm)
- Rust 1.70+ (install via https://rustup.rs)

## Setup

```bash
# Clone and install dependencies
git clone https://github.com/cooperwalter/piconnect-desktop.git
cd piconnect-desktop
npm install

# Build Rust backend
cargo build --manifest-path=src-tauri/Cargo.toml
```

## Development

### Run dev mode
```bash
npm run tauri dev
```

This starts:
- Vite dev server on http://localhost:5173
- Tauri app window with hot reload

### Run tests
```bash
npm test
```

### Build for production
```bash
npm run tauri build
```

Outputs to `src-tauri/target/release/bundle/`

## Project Structure

```
piconnect-desktop/
├── src/                      # Frontend (TypeScript)
│   ├── domain/              # Domain models (Device, Auth, Session)
│   ├── adapters/            # External integrations
│   │   ├── piconnect/       # Pi Connect API adapter
│   │   └── PiConnectAdapter.ts
│   ├── tauri/               # Tauri command bindings
│   ├── ui/                  # UI components and screens
│   ├── main.ts              # Entry point
│   └── styles.css
├── src-tauri/               # Backend (Rust)
│   ├── src/
│   │   ├── commands.rs      # Tauri commands
│   │   ├── lib.rs           # App setup
│   │   └── main.rs          # Binary entry
│   ├── Cargo.toml
│   └── tauri.conf.json      # Tauri configuration
├── docs/                    # Documentation
├── index.html
├── package.json
└── vite.config.ts
```

## Architecture

### Clean Architecture Layers
1. **Domain** - Core business logic, no external dependencies
2. **Adapters** - External integrations (API, filesystem, system)
3. **UI** - User interface components

### Data Flow
```
User → UI → App Controller → Adapter → External Service
                  ↓
              Domain Models
```

## Debugging

### Frontend
- Use browser DevTools in Tauri window: `Ctrl+Shift+I` / `Cmd+Option+I`
- Console logs appear in terminal running `npm run tauri dev`

### Backend (Rust)
- Add `dbg!()` macros in Rust code
- Output appears in terminal
- Use `RUST_LOG=debug npm run tauri dev` for verbose logging

## Testing Strategy

- **Unit tests** for domain models and adapters
- **Integration tests** for UI + Tauri command interaction
- **Manual tests** for system integration (SSH/VNC/SFTP launches)

## API Discovery

See [api.md](./api.md) for instructions on discovering Pi Connect endpoints.

## Common Issues

### "webkit2gtk not found"
Install system dependencies (see Prerequisites above)

### Rust compilation fails
```bash
rustup update
cargo clean --manifest-path=src-tauri/Cargo.toml
```

### Tauri window blank
Check browser console for errors. Likely a build/import issue.

## Contributing

1. Create feature branch from `main`
2. Make changes with tests
3. Commit with descriptive messages
4. Push and create PR
5. CI must pass (build + tests)
