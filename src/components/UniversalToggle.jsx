import '../styles/UniversalToggle.css';

export default function UniversalToggle({ handleUniversalToggle, isAllOn }) {
  return (
    <div className="glass-wrap toggle-container">
      <div className="glass-shadow"></div>
      <div className="glass-panel toggle-panel">
        
        {/* Noodle Animation SVG */}
        <svg 
          className={`noodles-container ${isAllOn ? 'active' : ''}`}
          viewBox="0 0 300 300"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Noodle 1 */}
          <path className="noodle-path" stroke="#FF6B6B" strokeWidth="8" d="M 150 150 Q 100 50 50 100 T 10 20" />
          {/* Noodle 2 */}
          <path className="noodle-path" stroke="#4ECDC4" strokeWidth="6" d="M 150 150 Q 200 50 250 100 T 290 80" />
          {/* Noodle 3 */}
          <path className="noodle-path" stroke="#FFE66D" strokeWidth="10" d="M 150 150 Q 80 200 50 250 T 20 280" />
           {/* Noodle 4 */}
           <path className="noodle-path" stroke="#A8E6CF" strokeWidth="7" d="M 150 150 Q 220 200 250 250 T 280 290" />
        </svg>

        <h2 className="ut-title">Interactive Light Controls</h2>
        <p className="ut-desc">
          Control all main house lights with a single action. Switch position and light color indicate state.
        </p>
        
        <div className="main-toggle-wrapper">
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
