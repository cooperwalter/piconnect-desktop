mod commands;

use commands::{open_auth_webview, open_ssh_terminal, open_vnc_client, open_sftp_client};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            open_auth_webview,
            open_ssh_terminal,
            open_vnc_client,
            open_sftp_client
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
