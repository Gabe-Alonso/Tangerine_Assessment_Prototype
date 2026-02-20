import { useNavigate } from 'react-router-dom'
import './GameShell.css'

/**
 * GameShell wraps every game page. It provides:
 *  - A back button to return home
 *  - A consistent header and layout
 *  - An onComplete handler that logs Tangerine data to the console.
 *    Replace console.log with your API call when you wire up a backend.
 */
export default function GameShell({ title, description, children, onComplete }) {
  const navigate = useNavigate()

  function handleComplete(data) {
    console.log(`[${title}] Game data collected:`, data)
    if (onComplete) onComplete(data)
  }

  // Expose handleComplete to children via a render prop pattern
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
    </div>
  )
}
