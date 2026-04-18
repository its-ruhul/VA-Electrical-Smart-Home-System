import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Home } from 'lucide-react';
import '../styles/NavBar.css';

export default function NavBar({ isConnected }) {
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(dayjs());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-wrap navbar-container">
      <div className="glass-shadow"></div>
      <div className="glass-panel navbar-panel">
        <div className="nav-left">
          <Home className="logo" size={32} />
          <h1 className="site-name">Smart Home Interface</h1>
        </div>
        <div className="nav-right">
          <div className="status-indicator">
            <div className={`status-dot ${isConnected ? 'connected' : ''}`}></div>
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
          <div className="time-display">
            {time.format('HH:mm:ss')}
          </div>
        </div>
      </div>
    </div>
  );
}
