# Bluetooth Troubleshooting Guide: "Connects then Disconnects Immediately"

This document outlines the troubleshooting process for a common Bluetooth issue on Linux where devices connect and then immediately disconnect, often accompanied by "profile unavailable" errors.

---

## Symptom

A Bluetooth audio device (e.g., "E-3511") successfully pairs but immediately disconnects after attempting to connect, making it unusable.

## Initial Diagnosis & Observations

1.  **Bluetooth Service Status (`journalctl -u bluetooth.service`)**:
    *   Initial logs showed `a2dp-sink profile connect failed for ...: Protocol not available` and `Failed to set mode`.
    *   Restarting the `bluetooth.service` cleared these initial errors, but the connection issue persisted.

2.  **Audio Server Identification (`pactl info`)**:
    *   The system was identified as using `PipeWire (on PipeWire 1.0.7)` as its audio server, not PulseAudio directly. This indicated that Bluetooth audio routing would go through PipeWire.

3.  **PipeWire Session Manager Status (`systemctl --user status pipewire-media-session.service`)**:
    *   The `pipewire-media-session.service` was found to be `masked` and `inactive (dead)`. This service is crucial for PipeWire to manage audio profiles.
    *   **Action**: Installed `pipewire-media-session` package (`sudo apt-get install pipewire-media-session`), unmasked and started the service (`systemctl --user unmask --now pipewire-media-session.service` and `systemctl --user restart pipewire.service pipewire-pulse.service pipewire-media-session.service`). This made the session manager active.

4.  **Bluetooth Adapter Identification (`lsusb`)**:
    *   Identified the Bluetooth adapter as `Intel Corp. Bluetooth 9460/9560`.

5.  **Kernel Messages (`sudo dmesg | grep -i bluetooth`)**:
    *   Showed a warning: `HCI LE Coded PHY feature bit is set, but its usage is not supported.` This indicated a potential firmware/kernel compatibility issue, but wasn't the direct cause of the disconnects.

## Attempted Fixes (and why they didn't fully resolve the issue)

1.  **Disable Bluetooth/Wi-Fi Coexistence (`options iwlwifi bt_coex_active=N`)**:
    *   **Action**: Created `/etc/modprobe.d/iwlwifi-opt.conf` with `options iwlwifi bt_coex_active=N` to disable a feature that can cause conflicts between Intel Wi-Fi and Bluetooth on combined chips.
    *   **Result**: The option was successfully applied (`cat /sys/module/iwlwifi/parameters/bt_coex_active` confirmed `N`), but the connection issue persisted.

2.  **Disable USB Power Management for Bluetooth Adapter**:
    *   **Action**: Found the USB device path for the Intel Bluetooth adapter (`/sys/bus/usb/devices/1-14`) and changed its power control from `auto` to `on` (`echo 'on' | sudo tee /sys/bus/usb/devices/1-14/power/control`).
    *   **Result**: This was a temporary change. While aggressive power saving *can* cause disconnects, it was not the primary issue in this case, and the problem still occurred. The user chose not to make this change permanent, which is fine, as the root cause was elsewhere.

## Root Cause Discovery & Resolution

1.  **`bluetoothctl` Error**:
    *   Attempting to connect via `bluetoothctl` revealed the error: `Failed to connect: org.bluez.Error.Failed br-connection-profile-unavailable`. This was the most direct clue. It meant that even though PipeWire and Bluetooth services were running, the necessary audio profiles (like A2DP) were not being properly exposed or recognized.

2.  **Missing PipeWire Bluetooth Plugins (`libspa-0.2-bluetooth`)**:
    *   **Diagnosis**: Checked if `libspa-0.2-bluetooth` package was installed (`dpkg -l | grep libspa-0.2-bluetooth`). It was not. This package provides the essential PipeWire plugins for Bluetooth audio codec and profile support, allowing PipeWire to correctly interface with BlueZ.
    *   **Action**: Installed the missing package (`sudo apt-get install libspa-0.2-bluetooth`).
    *   **Action**: Restarted all PipeWire services again (`systemctl --user restart pipewire.service pipewire-pulse.service pipewire-media-session.service`) to ensure the newly installed plugins were loaded.

---

## Conclusion

The primary issue causing Bluetooth devices to connect and immediately disconnect with "profile unavailable" errors was the absence of the `libspa-0.2-bluetooth` package, which provides critical PipeWire plugins for Bluetooth audio support. Once installed and PipeWire services restarted, the Bluetooth audio connection functioned correctly.

The troubleshooting process involved identifying the correct audio server (PipeWire), ensuring its session manager was active, and systematically eliminating other potential causes like Wi-Fi coexistence issues and aggressive power management. The specific error message from `bluetoothctl` (`br-connection-profile-unavailable`) was key to pinpointing the missing PipeWire plugins as the root cause.
