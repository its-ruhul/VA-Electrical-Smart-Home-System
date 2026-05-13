# Smart Home System Project Documentation

This document provides a comprehensive overview of the Smart Home System project, detailing its components, functions, modules, communication protocols, and code structure. It is designed to serve as a complete guide for understanding the project's architecture and answering potential questions from instructors or judges.

---

## 1. Functions and Components

The React frontend is divided into several reusable components to ensure a clean and modular architecture. 

### **Components**
*   **`App` (`App.jsx`)**: The main parent component that holds the application's state (`isConnected`, `room1Light`, `room2Light`). It coordinates interactions between the user interface and the ESP32 hardware.
*   **`NavBar` (`NavBar.jsx`)**: Displays the top navigation bar, which includes the project logo, title, real-time connection status, and a live clock.
*   **`FloorPlan` (`FloorPlan.jsx`)**: A visual representation of the home layout containing interactive sections for the **Living Room** and **Bedroom**. Users can click on specific rooms to toggle their individual lights.
*   **`UniversalToggle` (`UniversalToggle.jsx`)**: A master switch component that allows the user to turn all house lights on or off simultaneously. It also triggers a celebratory confetti animation when both lights are switched on.
*   **`AuroraBackground` (`AuroraBackground.jsx`)**: A decorative component that wraps the application and provides a dynamic, colorful aurora-style background gradient.

### **Key Functions (Frontend)**
*   **`toggleLED(ledId, status)`** *(in App.jsx)*: An asynchronous function responsible for communicating with the ESP32 hardware. It takes the target LED ID (1 or 2) and the desired status ('on' or 'off') and sends an HTTP GET request to the ESP32's IP address.
*   **`handleRoom1Toggle(newState)` / `handleRoom2Toggle(newState)`** *(in App.jsx)*: State updater functions that change the visual state of the specific room in the UI and subsequently call `toggleLED` to change the physical hardware state.
*   **`handleUniversalToggle(e)`** *(in App.jsx)*: A handler attached to the master switch. It reads the checkbox value and simultaneously updates the states for both rooms.

---

## 2. Modules and External Libraries

The project leverages several modern libraries to streamline development and enhance the user interface.

### **Frontend Dependencies (`package.json`)**
*   **`react` / `react-dom`**: The core framework for building the user interface.
*   **`vite`**: A fast, modern build tool and development server used to serve and bundle the React application.
*   **`dayjs`**: A lightweight date library used in the `NavBar` component to display the current time and update it every second.
*   **`lucide-react`**: An icon library used to render the clean, vector-based `Home` icon in the navigation bar.
*   **`canvas-confetti`**: An animation library used in the `UniversalToggle` component to create a celebratory confetti burst effect when all lights are turned on.

### **Backend Libraries (Arduino/ESP32)**
*   **`WiFi.h`**: A core ESP32 library used to connect the microcontroller to the local Wi-Fi network.
*   **`WebServer.h`**: Allows the ESP32 to act as a lightweight HTTP server, listening for incoming requests from the React frontend.

---

## 3. Communication Request to the ESP32

When a user interacts with the web interface to toggle a light, the React frontend must communicate that action to the ESP32. This is achieved through a standard HTTP GET request.

**The Request Structure:**
*   **Endpoint URL:** `http://172.16.29.246/led?id=X&state=Y`
*   **Method:** `GET`
*   **Parameters:**
    *   `id`: Represents the specific hardware component to target (`1` for Living Room / Pin 2, `2` for Bedroom / Pin 4).
    *   `state`: Represents the desired action (`on` or `off`).

**Step-by-Step Flow:**
1.  The user clicks a room or the universal toggle.
2.  The `toggleLED` function is invoked in React, building the URL (e.g., `http://172.16.29.246/led?id=1&state=on`).
3.  The browser's `fetch` API sends this GET request across the local network to the ESP32. It uses `mode: 'cors'` to indicate that it is a Cross-Origin request.
4.  The ESP32 receives the request, parses the `id` and `state`, and changes the electrical state of the corresponding GPIO pin (`HIGH` or `LOW`).
5.  The ESP32 replies with a standard `200 OK` HTTP status and a success message, which the frontend receives and logs.

---

## 4. Explanation of `arduino_code/arduino_code.ino`

The Arduino script transforms the ESP32 microcontroller into a smart home server. Here is a breakdown of how it works:

1.  **Network Setup (`setup()`)**:
    *   It initializes the GPIO pins (2 and 4) as output pins for the LEDs and sets them to `LOW` (OFF) by default.
    *   It connects to the designated Wi-Fi network (`STAFF`) using the provided credentials.
    *   Once connected, it prints its assigned local IP address to the Serial Monitor. This IP (`172.16.29.246`) is what the React code uses to find the ESP32.
2.  **Server Initialization**:
    *   It starts an HTTP server on port 80.
    *   It defines a "route" (`server.on("/led", HTTP_GET, handleLEDCommand)`). This tells the ESP32: *Whenever someone visits the `/led` URL, run the `handleLEDCommand` function.*
3.  **Handling Requests (`handleLEDCommand()`)**:
    *   **CORS Header**: The very first thing this function does is send `server.sendHeader("Access-Control-Allow-Origin", "*");`. This is crucial. Because the React website and the ESP32 are on different IP addresses/ports, the browser will block communication for security reasons unless the ESP32 explicitly permits it with this header.
    *   **Validation**: It checks if the `id` and `state` parameters exist in the URL. If not, it returns a `400 Bad Request`.
    *   **Execution**: It maps `id=1` to Pin 2, and `id=2` to Pin 4. It maps `state=on` to `HIGH` (sending voltage to the LED) and `state=off` to `LOW` (cutting voltage).
    *   **Action**: It uses `digitalWrite()` to physically change the LED state and returns a `200 OK` response.
4.  **Main Loop (`loop()`)**:
    *   It continuously runs `server.handleClient()`, which keeps the ESP32 listening for new incoming HTTP traffic.

---

## 5. Potential Instructor/Judge Questions

Here are some technical questions that might be asked about this project, along with their answers:

**Q: What is CORS and why did you need to handle it in this project?**
**A:** CORS stands for Cross-Origin Resource Sharing. Browsers have a security feature that prevents a website (origin A, like `localhost:5173` or a GitHub Pages URL) from making requests to a different server (origin B, like the ESP32's IP `172.16.29.246`) unless origin B explicitly says it's okay. By adding `server.sendHeader("Access-Control-Allow-Origin", "*");` in the Arduino code, we tell the browser it is safe to allow the React app to communicate with the ESP32.

**Q: How do the frontend and hardware find each other?**
**A:** Both devices must be connected to the exact same local Wi-Fi network. The ESP32 is assigned a local IP address by the router (in this case, `172.16.29.246`). We hardcoded this IP address into the React app's `fetch` request so the frontend knows exactly where to send the commands.

**Q: What happens if the ESP32 gets disconnected or its IP address changes?**
**A:** If the ESP32 disconnects, the frontend's `fetch` request will fail and fall into the `catch (error)` block, printing a network error to the console. If the router reassigns the ESP32 a new IP address (which happens sometimes with DHCP), the React code will need to be updated with the new IP, or the router would need to be configured to assign a static IP to the ESP32's MAC address.

**Q: What design pattern did you use for the UI?**
**A:** The UI uses a **Glassmorphism** design language. This is achieved using semi-transparent backgrounds with a backdrop blur (`backdrop-filter: blur()`), subtle white borders, and soft shadows. This creates a frosted-glass effect that sits cleanly on top of the colorful, animated Aurora background.

**Q: How does the "Universal Toggle" know when to show the confetti?**
**A:** The `App.jsx` component calculates a derived state variable: `const isAllOn = room1Light && room2Light;`. This boolean is passed down to the `UniversalToggle` component as a prop. A `useEffect` hook in `UniversalToggle` watches `isAllOn`; the moment it becomes `true`, it triggers the `canvas-confetti` library to fire the animation.
