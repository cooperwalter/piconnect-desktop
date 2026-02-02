# PiConnect Desktop

Cross-platform desktop client for Raspberry Pi Connect.

## Goals (MVP)
- Sign in to Raspberry Pi Connect (https://connect.raspberrypi.com)
- List devices
- Actions per device:
  - Open SSH session (system terminal)
  - Open screen sharing / VNC
  - File transfer (SFTP)

## Tech
- Planned: **Tauri** (Rust backend + web UI) for macOS/Linux/Windows.

## Dev notes
To build Tauri on Linux we’ll need Rust + system libraries (WebKitGTK/GTK).
This repo will include setup instructions once scaffolded.
