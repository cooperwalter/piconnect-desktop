/**
 * PiConnect Desktop - Main Entry Point
 */
import "./styles.css";
import { App } from "./ui/App.js";

const app = new App();

// UI Elements
const loginBtn = document.getElementById("login-btn") as HTMLButtonElement;
const devicesList = document.getElementById("devices-list") as HTMLDivElement;
const loginScreen = document.getElementById("login-screen") as HTMLDivElement;
const devicesScreen = document.getElementById("devices-screen") as HTMLDivElement;

// Initial state
loginScreen.style.display = "flex";
devicesScreen.style.display = "none";

// Login handler
loginBtn.addEventListener("click", async () => {
  try {
    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";
    await app.login();
    showDevicesScreen();
  } catch (error) {
    console.error("Login failed:", error);
    alert(`Login failed: ${error}`);
    loginBtn.disabled = false;
    loginBtn.textContent = "Login with Pi Connect";
  }
});

function showDevicesScreen() {
  loginScreen.style.display = "none";
  devicesScreen.style.display = "block";
  renderDevices();
}

function renderDevices() {
  const devices = app.getDevices();
  devicesList.innerHTML = "";

  if (devices.length === 0) {
    devicesList.innerHTML = "<p>No devices found</p>";
    return;
  }

  devices.forEach((device) => {
    const card = document.createElement("div");
    card.className = "device-card";
    card.innerHTML = `
      <h3>${device.name}</h3>
      <p>${device.hostname}</p>
      <p class="status ${device.online ? 'online' : 'offline'}">
        ${device.online ? "● Online" : "○ Offline"}
      </p>
      <div class="actions">
        <button data-device-id="${device.id}" data-action="ssh" ${!device.online ? 'disabled' : ''}>SSH</button>
        <button data-device-id="${device.id}" data-action="vnc" ${!device.online ? 'disabled' : ''}>VNC</button>
        <button data-device-id="${device.id}" data-action="sftp" ${!device.online ? 'disabled' : ''}>SFTP</button>
      </div>
    `;
    devicesList.appendChild(card);
  });

  // Attach action handlers
  document.querySelectorAll(".actions button").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const target = e.target as HTMLButtonElement;
      const deviceId = target.dataset.deviceId!;
      const action = target.dataset.action!;
      
      try {
        target.disabled = true;
        if (action === "ssh") await app.openSSH(deviceId);
        if (action === "vnc") await app.openVNC(deviceId);
        if (action === "sftp") await app.openSFTP(deviceId);
      } catch (error) {
        console.error(`${action} failed:`, error);
        alert(`Failed to open ${action.toUpperCase()}: ${error}`);
      } finally {
        target.disabled = false;
      }
    });
  });
}
