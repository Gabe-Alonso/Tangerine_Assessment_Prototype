import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './GameShell.css'

function pct(n, d) {
  if (!d) return '—'
  return Math.round((n / d) * 100) + '%'
}

export default function GameShell({ title, description, children, onComplete }) {
  const navigate = useNavigate()
  const [result, setResult] = useState(null)

  function handleComplete(data) {
    console.log(`[${title}] Game data collected:`, data)
    setResult(data)
    if (onComplete) onComplete(data)
  }

  return (
    <div className="game-shell">
      <header className="game-shell__header">
        <button className="game-shell__back" onClick={() => navigate('/')}>
          ← Back
        </button>
        <div className="game-shell__title-group">
          <h1 className="game-shell__title">{title}</h1>
          {description && <p className="game-shell__description">{description}</p>}
        </div>
      </header>

      <main className="game-shell__content">
        {typeof children === 'function' ? children({ onComplete: handleComplete }) : children}
      </main>

      {result && (
        <div className="game-result">
          <h2 className="game-result__heading">Results</h2>
          <div className="game-result__grid">
            <div className="game-result__stat">
              <span className="game-result__value">{result.attempted ?? '—'}</span>
              <span className="game-result__label">Attempted</span>
            </div>
            <div className="game-result__stat">
              <span className="game-result__value game-result__value--correct">{result.correct ?? '—'}</span>
              <span className="game-result__label">Correct</span>
            </div>
            <div className="game-result__stat">
              <span className="game-result__value game-result__value--incorrect">{result.incorrect ?? '—'}</span>
              <span className="game-result__label">Incorrect</span>
            </div>
            <div className="game-result__stat">
              <span className="game-result__value">{pct(result.correct, result.attempted)}</span>
              <span className="game-result__label">% Correct of attempted</span>
            </div>
            <div className="game-result__stat">
              <span className="game-result__value">{pct(result.correct, result.total)}</span>
              <span className="game-result__label">% Correct of total</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
