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

  function handleBreakIncrement() {
    if (breakLength < 60) setBreakLength(breakLength + 1)
  }
  function handleBreakDecrement() {
    if (breakLength > 1) setBreakLength(breakLength - 1)
  }

  function handleSessionIncrement() {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1)
      if (!isRunning) setTimeLeft((sessionLength + 1) * 60)
    }
  }
  function handleSessionDecrement() {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1)
      if (!isRunning) setTimeLeft((sessionLength - 1) * 60)
    }
  }

  return (
    <div id="clock">
      <h1>25 + 5 Clock</h1>

      <div className="controls">
        <div id="break-controls">
          <h2 id="break-label">Duração do Intervalo</h2>
          <button id="break-decrement" onClick={handleBreakDecrement}>-</button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={handleBreakIncrement}>+</button>
        </div>

        <div id="session-controls">
          <h2 id="session-label">Duração da Sessão</h2>
          <button id="session-decrement" onClick={handleSessionDecrement}>-</button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={handleSessionIncrement}>+</button>
        </div>

        <div id="timer-controls">
          <h2 id="timer-label">{isSession ? 'Sessão' : 'Intervalo'}</h2>
          <h1 id="time-left">{formatTime(timeLeft)}</h1>
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
