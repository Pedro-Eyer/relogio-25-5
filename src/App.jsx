import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isSession, setIsSession] = useState(true)
  const intervalRef = useRef(null)

  // Função para resetar tudo ao estado inicial
  function handleReset() {
    clearInterval(intervalRef.current)  
    intervalRef.current = null          
  
    setIsRunning(false)                 
    setBreakLength(5)                  
    setSessionLength(25)              
    setTimeLeft(25 * 60)               
    setIsSession(true)                
  
    const audio = document.getElementById('beep')
    audio.pause()
    audio.currentTime = 0
  }
  
  // Função para iniciar ou pausar o timer
  function handleStartStop() {
    if (isRunning) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setIsRunning(false)
    } else {
      setIsRunning(true)
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    }
  }

  // Formata o tempo em mm:ss
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes < 10 ? '0' + minutes : minutes}:${secs < 10 ? '0' + secs : secs}`
  }

  // Incremento e decremento do break
  function handleBreakIncrement() {
    if (breakLength < 60) setBreakLength(breakLength + 1)
  }
  function handleBreakDecrement() {
    if (breakLength > 1) setBreakLength(breakLength - 1)
  }

  // Incremento e decremento da sessão
  function handleSessionIncrement() {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1)
      if (!isRunning && isSession) setTimeLeft((sessionLength + 1) * 60)
    }
  }
  function handleSessionDecrement() {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1)
      if (!isRunning && isSession) setTimeLeft((sessionLength - 1) * 60)
    }
  }

  // useEffect que monitora o tempo restante e alterna sessão/intervalo quando chegar a 0
  useEffect(() => {
    if (timeLeft < 0) {
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

  // Limpar intervalo quando componente desmontar para evitar vazamento de memória
  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

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
          <button id="start_stop" onClick={handleStartStop}>Iniciar / Pausar</button>
          <button id="reset" onClick={handleReset}>Reiniciar</button>
          <audio
            id="beep"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            type="audio/wav"
            preload="auto"
          ></audio>
        </div>
      </div>
    </div>
  )
}

export default App
