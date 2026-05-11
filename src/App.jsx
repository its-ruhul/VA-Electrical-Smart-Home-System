import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import FloorPlan from './components/FloorPlan';
import UniversalToggle from './components/UniversalToggle';
import { AuroraBackground } from './components/AuroraBackground';
import './index.css';

// Function to control LEDs from React
const toggleLED = async (ledId, status) => {
  const esp32IP = "http://172.16.29.246"; 

  try {
    const response = await fetch(`${esp32IP}/led?id=${ledId}&state=${status}`, {
      method: 'GET',
      mode: 'cors',
    });

    if (response.ok) {
      console.log(`Successfully turned ${status} LED ${ledId}`);
    } else {
      console.error("ESP32 received the request but returned an error.");
    }
  } catch (error) {
    console.error("Network error: Could not reach the ESP32.", error);
  }
};

function App() {
  const [isConnected, setIsConnected] = useState(true);
  const [room1Light, setRoom1Light] = useState(false);
  const [room2Light, setRoom2Light] = useState(false);

  // Derived state to check if both are on
  const isAllOn = room1Light && room2Light;

  const handleRoom1Toggle = (newState) => {
    setRoom1Light(newState);
    toggleLED(1, newState ? 'on' : 'off');
  };

  const handleRoom2Toggle = (newState) => {
    setRoom2Light(newState);
    toggleLED(2, newState ? 'on' : 'off');
  };

  const handleUniversalToggle = (e) => {
    const newVal = e.target.checked;
    handleRoom1Toggle(newVal);
    handleRoom2Toggle(newVal);
  };

  // Simulate occasionally disconnecting/reconnecting purely as a UI element (optional)
  useEffect(() => {
    // Keeping it constantly connected for demo, but can be updated.
    setIsConnected(true);
  }, []);

  return (
    <AuroraBackground>
      <div className="app-container">
        <NavBar isConnected={isConnected} />
        
        <main className="main-content">
          <FloorPlan 
            room1Light={room1Light} 
            setRoom1Light={handleRoom1Toggle}
            room2Light={room2Light}
            setRoom2Light={handleRoom2Toggle}
          />
          <UniversalToggle 
            handleUniversalToggle={handleUniversalToggle}
            isAllOn={isAllOn}
          />
        </main>
      </div>
    </AuroraBackground>
  );
}

export default App;
