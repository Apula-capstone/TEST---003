# RTSP WebRTC Gateway Setup

The **APULA WEB** application uses [webrtc-streamer](https://github.com/mpromonet/webrtc-streamer) to bridge RTSP camera feeds to the browser via WebRTC. This allows for low-latency streaming without requiring browser plugins.

## Prerequisites

1.  **Download webrtc-streamer**:
    *   Go to the [webrtc-streamer releases page](https://github.com/mpromonet/webrtc-streamer/releases).
    *   Download the binary appropriate for your operating system (e.g., `webrtc-streamer-v0.8.6-Windows-AMD64-Release.tar.gz` for Windows).
    *   Extract the downloaded archive.

## Running the Gateway (Option B - Recommended)

To avoid port conflicts with other local services, we recommend running the gateway on port **8001**.

1.  Open a terminal or command prompt.
2.  Navigate to the directory where you extracted `webrtc-streamer`.
3.  Run the executable with the port argument:
    *   **Windows**: 
        ```powershell
        webrtc-streamer.exe -H 0.0.0.0:8001
        ```
    *   **Mac/Linux**: 
        ```bash
        ./webrtc-streamer -H 0.0.0.0:8001
        ```

## Configuration

The app is now pre-configured to look for the gateway at `http://localhost:8001` via the `.env.local` file.

If you need to change this later:
1.  Edit `.env.local` in the project root.
2.  Update the `VITE_WEBRTC_GATEWAY` variable.

## Troubleshooting

### Error: 404 Not Found
**Symptoms:** The app says "404 Not Found" or "Failed to load resource".
**Cause:** 
1.  **Port Conflict:** Another service (Python, PHP, Java) is already running on port 8000.
2.  **Wrong Directory:** You might be running the streamer from a location where it can't find its assets (though the API usually works).

**Fix:**
1.  **Check Port 8000**: Open `http://localhost:8000` in your browser. You should see the `webrtc-streamer` interface. If you see something else (like a generic directory listing or a different app), you have a conflict.
2.  **Change Port**: Run the streamer on a different port (e.g., 8001):
    ```bash
    webrtc-streamer.exe -H 0.0.0.0:8001
    ```
3.  **Update App Config**:
    Create a `.env.local` file in the project root and add:
    ```
    VITE_WEBRTC_GATEWAY=http://localhost:8001
    ```

### Connection Refused
**Cause:** The streamer is not running at all.
**Fix:** Ensure the terminal window running `webrtc-streamer` is open and shows no errors.

### No Video / Spinning Loading Icon
**Cause:** 
- The RTSP URL is incorrect.
- The camera stream is not H.264 encoded (webrtc-streamer works best with H.264).
- Network firewall blocks the connection.
