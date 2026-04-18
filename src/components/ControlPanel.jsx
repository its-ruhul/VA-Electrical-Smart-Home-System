const ControlPanel = ({ lights, toggleAll }) => {
    // True if both are on, otherwise off (for the toggle switch visual)
    const isAllOn = lights.room1 && lights.room2;

    const handleToggle = () => {
        toggleAll(!isAllOn);
    };

    return (
        <div className="control-panel liquid-glass bouncy-hover">
            <p className="instruction-text">Click on the rooms to toggle the lights on and off</p>
            <div className="toggle-container">
                <span className="toggle-label">Toggle all lights:</span>
                <button 
                    className={`delight-toggle ${isAllOn ? 'active' : ''}`} 
                    onClick={handleToggle}
                    aria-label="Toggle all lights"
                >
                    <div className="toggle-knob"></div>
                    <div className="toggle-ripple"></div>
                </button>
            </div>
        </div>
    )
}
export default ControlPanel
