import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import '../styles/UniversalToggle.css';

export default function UniversalToggle({ handleUniversalToggle, isAllOn }) {
  const toggleRef = useRef(null);

  useEffect(() => {
    if (isAllOn && toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y }
      });
    }
  }, [isAllOn]);

  return (
    <div className="glass-wrap toggle-container">
      <div className="glass-shadow"></div>
      <div className="glass-panel toggle-panel">

        <h2 className="ut-title">Interactive Light Controls</h2>
        <p className="ut-desc">
          Control all main house lights with a single action. Switch position and light color indicate state.
        </p>
        
        <div className="main-toggle-wrapper" ref={toggleRef}>
          <input 
            type="checkbox" 
            className="main-toggle" 
            checked={isAllOn}
            onChange={handleUniversalToggle}
            aria-label="Universal Light Toggle"
          />
        </div>

      </div>
    </div>
  );
}
