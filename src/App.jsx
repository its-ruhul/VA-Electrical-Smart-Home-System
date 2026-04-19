import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import FloorPlan from './components/FloorPlan';
import UniversalToggle from './components/UniversalToggle';
import './index.css';

function App() {
  const [isConnected, setIsConnected] = useState(true);
  const [room1Light, setRoom1Light] = useState(false);
  const [room2Light, setRoom2Light] = useState(false);

  // Derived state to check if both are on
  const isAllOn = room1Light && room2Light;

  const handleUniversalToggle = (e) => {
    const newVal = e.target.checked;
    setRoom1Light(newVal);
    setRoom2Light(newVal);
  };

  // Simulate occasionally disconnecting/reconnecting purely as a UI element (optional)
  useEffect(() => {
    // Keeping it constantly connected for demo, but can be updated.
    setIsConnected(true);
  }, []);

  return (

    <div className="app-container">
      <NavBar isConnected={isConnected} />

      <main className="main-content">
        <FloorPlan
          room1Light={room1Light}
          setRoom1Light={setRoom1Light}
          room2Light={room2Light}
          setRoom2Light={setRoom2Light}
        />
        <UniversalToggle
          handleUniversalToggle={handleUniversalToggle}
          isAllOn={isAllOn}
        />
      </main>
    </div>
  );
}

export default App;
