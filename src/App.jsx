import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isSession, setIsSession] = useState(true)
  const [isConfiguring, setIsConfiguring] = useState(true)
  const intervalRef = useRef(null)

  // Atualiza timeLeft quando sessionLength muda e timer não está rodando
  useEffect(() => {
    if (!isRunning && isConfiguring) {
      setTimeLeft(sessionLength * 60)
      setIsSession(true)
    }
  }, [sessionLength, isRunning, isConfiguring])

  // Alterna entre sessão e intervalo e toca som quando timeLeft chega a zero
  useEffect(() => {
    if (timeLeft === 0) {
      const audio = document.getElementById('beep')
      audio.play()

      if (isSession) {
        setIsSession(false)
        setTimeLeft(breakLength * 60)
      } else {
        setIsSession(true)
        setTimeLeft(sessionLength * 60)
      }
    }
  }, [timeLeft, isSession, breakLength, sessionLength])

  // Limpa intervalo ao desmontar componente
  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  function handleStartConfig() {
    setIsConfiguring(false)
    setTimeLeft(sessionLength * 60)
    setIsSession(true)
  }

  function handleBackToConfig() {
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setIsRunning(false)
    setIsConfiguring(true)
  }

  function handleReset() {
    clearInterval(intervalRef.current)
    intervalRef.current = null

    setIsRunning(false)
    setBreakLength(5)
    setSessionLength(25)
    setTimeLeft(25 * 60)
    setIsSession(true)
    setIsConfiguring(true)

    const audio = document.getElementById('beep')
    audio.pause()
    audio.currentTime = 0
  }

  function handleStartStop() {
    if (isRunning) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setIsRunning(false)
    } else {
      setIsRunning(true)
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => (prev === 0 ? 0 : prev - 1))
      }, 1000)
    }
  }

  // Controles de break, só permite mudar se não estiver rodando e na configuração
  function handleBreakIncrement() {
    if (!isRunning && isConfiguring && breakLength < 60) setBreakLength(breakLength + 1)
  }
  function handleBreakDecrement() {
    if (!isRunning && isConfiguring && breakLength > 1) setBreakLength(breakLength - 1)
  }

  // Controles de sessão, só permite mudar se não estiver rodando e na configuração
  function handleSessionIncrement() {
    if (!isRunning && isConfiguring && sessionLength < 60) setSessionLength(sessionLength + 1)
  }
  function handleSessionDecrement() {
    if (!isRunning && isConfiguring && sessionLength > 1) setSessionLength(sessionLength - 1)
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes < 10 ? '0' + minutes : minutes}:${secs < 10 ? '0' + secs : secs}`
  }

  return (
    <div id="clock">
      <h1>25 + 5 Clock</h1>

      {isConfiguring ? (
        <div className="config-screen">
          <div id="break-controls">
            <h2 id="break-label">Duração do Intervalo</h2>
            <div className="controls-row">
              <button id="break-decrement" className="small-btn" onClick={handleBreakDecrement}>-</button>
              <span id="break-length">{breakLength}</span>
              <button id="break-increment" className="small-btn" onClick={handleBreakIncrement}>+</button>
            </div>
          </div>

          <div id="session-controls">
            <h2 id="session-label">Duração da Sessão</h2>
            <div className="controls-row">
              <button id="session-decrement" className="small-btn" onClick={handleSessionDecrement}>-</button>
              <span id="session-length">{sessionLength}</span>
              <button id="session-increment" className="small-btn" onClick={handleSessionIncrement}>+</button>
            </div>
          </div>

          <button id="start_config" onClick={handleStartConfig}>Começar</button>
        </div>
      ) : (
        <div className="timer-screen">
          <h2 id="timer-label">{isSession ? 'Sessão' : 'Intervalo'}</h2>
          <h1 id="time-left">{formatTime(timeLeft)}</h1>
          <button id="start_stop" onClick={handleStartStop}>{isRunning ? 'Pausar' : 'Iniciar'}</button>
          <button id="reset" onClick={handleReset}>Reiniciar</button>
          <button id="config" onClick={handleBackToConfig}>Configurar</button>

          <audio
            id="beep"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            type="audio/wav"
            preload="auto"
          ></audio>
        </div>
      )}
    </div>
  )
}

export default App
