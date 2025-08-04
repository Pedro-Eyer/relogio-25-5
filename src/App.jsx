import { useState } from 'react'
import './App.css'

function App() {
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
