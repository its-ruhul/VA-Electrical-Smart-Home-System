import houseBg from '../assets/House-design.png';

const Rooms = ({ lights, toggleRoom1, toggleRoom2 }) => {
    const ToggleLightRoom1 = () => {
        toggleRoom1();
    };

    const ToggleLightRoom2 = () => {
        toggleRoom2();
    };

    return (
        <div className="rooms-container">
            <div 
                className={`room room2 liquid-glass bouncy-hover ${lights.room2 ? 'light-on' : 'light-off'}`} 
                onClick={ToggleLightRoom2}
            >
                <div className="room-bg" style={{backgroundImage: `url(${houseBg})`}}></div>
                <div className="room-overlay"></div>
            </div>
            
            <div 
                className={`room room1 liquid-glass bouncy-hover ${lights.room1 ? 'light-on' : 'light-off'}`} 
                onClick={ToggleLightRoom1}
            >
                <div className="room-bg" style={{backgroundImage: `url(${houseBg})`}}></div>
                <div className="room-overlay"></div>
            </div>
        </div>
    )
}
export default Rooms
