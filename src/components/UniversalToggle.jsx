import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import '../styles/UniversalToggle.css';

export default function UniversalToggle({ handleUniversalToggle, isAllOn }) {
  const toggleRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isAllOn && toggleRef.current && canvasRef.current) {
      const myConfetti = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true
      });
      
      const rect = toggleRef.current.getBoundingClientRect();
      const canvasRect = canvasRef.current.getBoundingClientRect();
      
      const x = (rect.left + rect.width / 2 - canvasRect.left) / canvasRect.width;
      const y = (rect.top + rect.height / 2 - canvasRect.top) / canvasRect.height;
      
      myConfetti({
        particleCount: 150,
        spread: 60,
        origin: { x, y }
      });
    }
  }, [isAllOn]);

  return (
    <div className="glass-wrap toggle-container">
      <div className="glass-shadow"></div>
      <div className="glass-panel toggle-panel">
        
        {/* Canvas for confetti positioned between background and toggle button */}
        <canvas 
          ref={canvasRef} 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 5
          }}
        />
        
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
