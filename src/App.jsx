import { useState } from 'react'
import './App.css'

function App() {
    const [breakLength, setBreakLength] = useState(5)
    const [sessionLength, setSessionLength] = useState(25)
    const [timeLeft, setTimeLeft] = useState(25 * 60)
    const [isRunning, setIsRunning] = useState(false)
    const [isSession, setIsSession] = useState(true)
  
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${minutes < 10 ? '0' + minutes : minutes}:${secs < 10 ? '0' + secs : secs}`
    }


  return (
    <div id="clock">
      <h1>25 + 5 Clock</h1>

      <div className="controls">
        <div id="break-controls">
          <h2 id="break-label">Duração do Intervalo</h2>
          <button id="break-decrement">-</button>
          <span id="break-length">5</span>
          <button id="break-increment">+</button>
        </div>

        <div id="session-controls">
          <h2 id="session-label">Duração da Sessão</h2>
          <button id="session-decrement">-</button>
          <span id="session-length">25</span>
          <button id="session-increment">+</button>
        </div>

        <div id="timer-controls">
          <h2 id="timer-label">Sessão</h2>
          <h1 id="time-left">25:00</h1>
          <button id="start_stop">Iniciar / Pausar</button>
          <button id="reset">Reiniciar</button>
          <audio
            id="beep"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            type="audio/wav"
          ></audio>
        </div>
      </div>
    </div>
  )
}

export default App
