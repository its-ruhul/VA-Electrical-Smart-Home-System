import '../styles/FloorPlan.css';

export default function FloorPlan({ room1Light, setRoom1Light, room2Light, setRoom2Light }) {
  return (
    <div className="glass-wrap floorplan-container">
      <div className="glass-shadow"></div>
      <div className="glass-panel floorplan-panel">
        <h2 className="fp-title">Home Layout</h2>
        
        <div className="house-layout">
          <div 
            className="room room-1" 
            onClick={() => setRoom1Light(!room1Light)}
            role="button"
            aria-label="Toggle Room 1 Light"
          >
            <div className={`room-darkness ${room1Light ? 'light-on' : ''}`}></div>
            <span className="room-label">Living Room</span>
          </div>
          
          <div 
            className="room room-2" 
            onClick={() => setRoom2Light(!room2Light)}
            role="button"
            aria-label="Toggle Room 2 Light"
          >
            <div className={`room-darkness ${room2Light ? 'light-on' : ''}`}></div>
            <span className="room-label">Bedroom</span>
          </div>
        </div>
      </div>
    </div>
  );
}
