import { useState } from 'react'
import Navbar from './components/Navbar'
import Rooms from './components/Rooms'
import ControlPanel from './components/ControlPanel'
import './index.css'

function App() {
  const [lights, setLights] = useState({ room1: true, room2: true })

  const toggleAll = (state) => {
    setLights({ room1: state, room2: state })
  }

  const toggleRoom1 = () => setLights(prev => ({...prev, room1: !prev.room1}))
  const toggleRoom2 = () => setLights(prev => ({...prev, room2: !prev.room2}))

  return (
    <>
      <div className="wave-background"></div>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Rooms lights={lights} toggleRoom1={toggleRoom1} toggleRoom2={toggleRoom2} />
          <ControlPanel lights={lights} toggleAll={toggleAll} />
        </div>
      </div>
    </>
  )
}

export default App
